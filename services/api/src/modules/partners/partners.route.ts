import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"

const partners = new Hono<AppContext>().get("/", async (c) => {
  const { q, status, cat, ...rest } = c.req.query()
  const { page, take, skip } = parsePagination(rest)

  const [partners, total] = await Promise.all([
    prisma.organization.findMany({
      where: {
        type: "PARTNER",
      },
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.organization.count({
      where: {
        type: "PARTNER",
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

export default partners
