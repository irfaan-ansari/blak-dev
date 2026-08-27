import { Hono } from "hono"
import type { OrgContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"

const drivers = new Hono<OrgContext>().get("/", async (c) => {
  const organizationId = c.get("organizationId")
  const { q, status, cat, ...rest } = c.req.query()
  const { page, take, skip } = parsePagination(rest)

  const [results, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        members: {
          some: {
            organizationId,
            role: "driver",
          },
        },
      },
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.user.count({
      where: {
        members: {
          some: {
            organizationId,
            role: "driver",
          },
        },
      },
    }),
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

export default drivers
