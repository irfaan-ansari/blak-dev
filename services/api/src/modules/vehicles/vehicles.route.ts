import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"
import { getR2Url } from "@/lib/r2"
import { AppError } from "@blak/utils"

const vehicles = new Hono<AppContext>()
  .get("/", async (c) => {
    const { q, status, cat, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const [results, total] = await Promise.all([
      prisma.vehicle.findMany({
        take,
        skip,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.vehicle.count(),
    ])

    const files = await prisma.file.findMany({
      where: {
        ref: "VEHICLE",
        refId: {
          in: results.map((r) => r.id),
        },
      },
    })

    const docsWithUrl = await Promise.all(
      files.map(async ({ storageKey, ...file }) => ({
        ...file,
        size: Number(file.size),
        url: await getR2Url(storageKey),
      }))
    )

    const vehicleImages = docsWithUrl.reduce<
      Record<string, (typeof docsWithUrl)[number][]>
    >((acc, file) => {
      if (!file.refId) return acc

      ;(acc[file.refId] ??= []).push(file)

      return acc
    }, {})

    const records = results.map((user) => ({
      ...user,
      images: vehicleImages[user.id] ?? [],
    }))

    const pageCount = Math.ceil(total / take)

    return c.json({
      data: records,
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

    const result = await prisma.vehicle.findFirst({
      where: { id },
    })

    if (!result) throw new AppError("NOT_FOUND")

    const docs = await prisma.file.findMany({
      where: {
        ref: "VEHICLE",
        refId: result.id,
      },
    })

    const images = await Promise.all(
      docs.map(async ({ storageKey, ...file }) => ({
        ...file,
        size: Number(file.size),
        url: await getR2Url(storageKey),
      }))
    )

    return c.json({
      success: true,
      data: { ...result, images },
    })
  })

export default vehicles
