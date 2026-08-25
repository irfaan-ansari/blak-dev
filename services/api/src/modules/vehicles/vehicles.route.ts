import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"

const vehicles = new Hono<AppContext>().get("/", async (c) => {
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

  const totalPages = Math.ceil(total / take)

  return c.json({
    data: results,
    pagination: {
      page,
      limit: take,
      total,
      totalPages,
    },
  })
})

export default vehicles
