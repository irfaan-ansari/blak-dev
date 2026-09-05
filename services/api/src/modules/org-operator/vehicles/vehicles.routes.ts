import { Hono } from "hono"
import { prisma } from "@blak/db"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { getR2Url } from "@/lib/r2"
import { AppError } from "@blak/utils/error"

const vehicles = new Hono<AppContext>()
  .get("/", async (c) => {
    const organizationId = c.get("session").activeOrganizationId!
    const { q, status, cat, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const [results, total] = await Promise.all([
      prisma.vehicle.findMany({
        where: {
          organizationId,
        },
        take,
        skip,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.vehicle.count({
        where: {
          organizationId,
        },
      }),
    ])

    const pageCount = Math.ceil(total / take)

    const files = await prisma.file.findMany({
      where: {
        ref: "VEHICLE",
        refId: {
          in: results.map((r) => r.id),
        },
      },
    })

    const filesWithUrl = await Promise.all(
      files.map(async ({ storageKey, ...file }) => ({
        ...file,
        size: Number(file.size),
        url: await getR2Url(storageKey),
      }))
    )
    const imagesByVehicle = filesWithUrl.reduce<
      Record<string, (typeof filesWithUrl)[number][]>
    >((acc, file) => {
      if (!file.refId) return acc

      ;(acc[file.refId] ??= []).push(file)

      return acc
    }, {})

    const data = results.map((vehicle) => ({
      ...vehicle,
      images: imagesByVehicle[vehicle.id] ?? [],
    }))

    return c.json({
      data,
      pagination: {
        page,
        pageSize: take,
        pageCount,
        total,
      },
    })
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id")
    const organizationId = c.get("session").activeOrganizationId!

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id,
        organizationId,
      },
    })

    if (!vehicle) {
      throw new AppError("NOT_FOUND")
    }

    const files = await prisma.file.findMany({
      where: {
        ref: "VEHICLE",
        refId: id,
      },
    })

    const filesWithUrl = await Promise.all(
      files.map(async ({ storageKey, ...file }) => ({
        ...file,
        size: Number(file.size),
        url: await getR2Url(storageKey),
      }))
    )

    return c.json({
      success: true,
      data: { ...vehicle, images: filesWithUrl },
    })
  })

export default vehicles
