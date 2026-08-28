import { Hono } from "hono"
import { prisma } from "@blak/db"
import type { OrgContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"

const router = new Hono<OrgContext>()
  .get("/", async (c) => {
    const user = c.get("user")
    const session = c.get("session")
    const { activeOrganizationId } = session

    const { q, status, cat, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const [results, total] = await Promise.all([
      prisma.organization.findMany({
        where: {
          type: "OPERATOR",
          members: {
            some: {
              id: user.id,
            },
          },
        },
        take,
        skip,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.organization.count({
        where: {
          members: {
            some: {
              id: user?.id,
            },
          },
        },
      }),
    ])

    const transformed = results.map((res) => ({
      ...res,
      active: res.id === (activeOrganizationId as string),
    }))

    const pageCount = Math.ceil(total / take)

    return c.json({
      data: transformed,
      pagination: {
        page,
        pageSize: take,
        pageCount,
        total,
      },
    })
  })
  .get("/active", async (c) => {
    const session = c.get("session")
    const { activeOrganizationId } = session

    const result = await prisma.organization.findUnique({
      where: { id: activeOrganizationId as string },
    })

    return c.json({
      success: true,
      data: result,
    })
  })

export default router
