import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"

const operators = new Hono<AppContext>().get("/", async (c) => {
  const { q, status, cat, ...rest } = c.req.query()
  const { page, take, skip } = parsePagination(rest)

  const [partners, total] = await Promise.all([
    prisma.organization.findMany({
      where: {
        type: "OPERATOR",
      },
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.organization.count({
      where: {
        type: "OPERATOR",
      },
    }),
  ])

  const data = partners.map(({ metadata, ...partner }) => {
    let jsonMetadata = {}
    try {
      jsonMetadata = JSON.parse(metadata!)
    } catch (error) {}
    return {
      ...partner,
      metadata: jsonMetadata,
    }
  })

  const totalPages = Math.ceil(total / take)

  return c.json({
    data: data,
    pagination: {
      page,
      limit: take,
      total,
      totalPages,
    },
  })
})

export default operators
