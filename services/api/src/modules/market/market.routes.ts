import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"

const markets = new Hono<AppContext>().get("/", async (c) => {
  const { q, status, cat, ...rest } = c.req.query()
  const { page, take, skip } = parsePagination(rest)

  const [data, total] = await Promise.all([
    prisma.market.findMany({
      include: {
        currency: true,
        country: true,
        complianceRequirements: {
          orderBy: { entityType: "asc" },
        },
      },
      take,
      skip,
      orderBy: { createdAt: "desc" },
    }),
    prisma.market.count(),
  ])

  const pageCount = Math.ceil(total / take)

  return c.json({
    data: data,
    pagination: {
      page,
      pageSize: take,
      pageCount,
      total,
    },
  })
})

export default markets
