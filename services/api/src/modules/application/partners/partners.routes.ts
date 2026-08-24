import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"

const partners = new Hono<AppContext>().get("/", async (c) => {
  const { q, status, cat, ...rest } = c.req.query()
  const { page, take, skip } = parsePagination(rest)

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where: {
        type: "PARTNER",
      },
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        partnerApplication: true,
      },
    }),
    prisma.application.count({
      where: {
        type: "PARTNER",
      },
    }),
  ])

  const data = applications.map(({ partnerApplication, ...application }) => ({
    ...application,
    application: partnerApplication,
  }))

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

export default partners
