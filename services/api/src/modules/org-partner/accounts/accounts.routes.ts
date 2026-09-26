import { Hono } from "hono"
import { prisma } from "@blak/db"
import type { OrgContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"

const router = new Hono<OrgContext>()
  .get("/", async (c) => {
    const user = c.get("user")

    const organizationId = c.get("organizationId")

    const { q, status, cat, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const [results, total] = await Promise.all([
      prisma.organization.findMany({
        where: {
          type: "PARTNER",
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
      isActive: res.id === organizationId,
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
  .patch("/", async (c) => {
    const organizationId = c.get("organizationId")

    const [org, review] = await Promise.all([
      prisma.organization.update({
        where: { id: organizationId },
        data: {
          status: "UNDER_REVIEW",
        },
      }),
      prisma.review.create({
        data: {
          entityType: "OPERATOR",
          entityId: organizationId,
          status: "UNDER_REVIEW",
          reason: "Documents submitted by the operator.",
        },
      }),
    ])

    return c.json({
      success: true,
      data: org,
    })
  })

export default router
