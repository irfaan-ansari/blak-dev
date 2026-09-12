import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { Prisma, prisma } from "@blak/db"
import { getR2Url } from "@/lib/r2"
import { AppError } from "@blak/utils"

const vehicles = new Hono<AppContext>()
  .get("/", async (c) => {
    const { q, status, cat, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const where: Prisma.VehicleWhereInput = {
      ...(q && {
        OR: [
          { make: { contains: q, mode: "insensitive" } },
          { model: { contains: q, mode: "insensitive" } },
          { trim: { contains: q, mode: "insensitive" } },
          { interiorColor: { contains: q, mode: "insensitive" } },
          { exteriorColor: { contains: q, mode: "insensitive" } },
          { engine: { contains: q, mode: "insensitive" } },
          { licensePlate: { contains: q, mode: "insensitive" } },
          { registrationNumber: { contains: q, mode: "insensitive" } },
          { vin: { contains: q, mode: "insensitive" } },
          {
            organization: {
              name: { contains: q, mode: "insensitive" },
            },
          },
          {
            driver: {
              name: { contains: q, mode: "insensitive" },
            },
          },
        ],
      }),
    }

    if (rest.organization) {
      where.organizationId = rest.organization
    }
    const [results, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        include: {
          organization: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take,
        skip,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.vehicle.count({ where }),
    ])

    const pageCount = Math.ceil(total / take)

    return c.json({
      data: results,
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
      include: {
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
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
