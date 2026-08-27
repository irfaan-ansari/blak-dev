import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"

const users = new Hono<AppContext>().get("/", async (c) => {
  const organizationId = c.get("session").activeOrganizationId!
  const { q, status, cat, ...rest } = c.req.query()
  const { page, take, skip } = parsePagination(rest)

  const [results, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        members: {
          some: {
            organizationId,
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

export default users
