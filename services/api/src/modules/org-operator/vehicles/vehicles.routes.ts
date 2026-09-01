import { Hono } from "hono"
import { prisma } from "@blak/db"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { getR2Url } from "@/lib/r2"

const vehicles = new Hono<AppContext>().get("/", async (c) => {
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

  const objs = await prisma.document.findMany({
    where: {
      entity: "VEHICLE",
      entityId: {
        in: results.map((r) => r.id),
      },
    },
  })

  const documents = await Promise.all(
    objs.map(async ({ size, ...obj }) => ({
      ...obj,
      url: await getR2Url(obj.storageKey),
    }))
  )

  const imagesByVehicle = documents.reduce<Record<string, typeof documents>>(
    (acc, image) => {
      ;(acc[image.entityId] ??= []).push(image)
      return acc
    },
    {}
  )

  const data = results.map((vehicle) => ({
    ...vehicle,
    images: imagesByVehicle[vehicle.id] ?? [],
  }))

  const pageCount = Math.ceil(total / take)

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

export default vehicles
