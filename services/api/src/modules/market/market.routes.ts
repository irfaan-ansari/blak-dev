import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"

const markets = new Hono<AppContext>().get("/", async (c) => {
  const { q, status, cat, ...rest } = c.req.query()
  const { page, take, skip } = parsePagination(rest)

  const [markets, total] = await Promise.all([
    prisma.market.findMany({
      include: {
        country: {
          include: {
            _count: { select: { states: true, cities: true } },
          },
        },
        currency: true,
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

  const data = markets.map(({ country, ...rest }) => {
    const { _count, ...countryRest } = country
    return {
      ...rest,
      country: {
        ...countryRest,
      },
      stateCount: _count.states,
      cityCount: _count.cities,
    }
  })

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
