import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"

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

export default vehicles
