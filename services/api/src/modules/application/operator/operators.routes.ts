import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"

const operators = new Hono<AppContext>().get("/", async (c) => {
  const { q, status, cat, ...rest } = c.req.query()
  const { page, take, skip } = parsePagination(rest)

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where: {
        type: "OPERATOR",
      },
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        operatorApplication: true,
      },
    }),
    prisma.application.count({
      where: {
        type: "OPERATOR",
      },
    }),
  ])

  const data = applications.map(({ operatorApplication, ...application }) => ({
    ...application,
    application: operatorApplication,
  }))
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

export default operators
