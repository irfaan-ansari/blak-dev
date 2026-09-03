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

  const pageCount = Math.ceil(total / take)

  const complianceRecords = await prisma.complianceRecord.findMany({
    where: {
      entityType: "DRIVER",
      entityId: {
        in: results.map((user) => user.id),
      },
    },
  })

  const complianceMap = new Map(
    complianceRecords.map((record) => [record.entityId, record])
  )

  const records = results.map((user) => ({
    ...user,
    compliance: complianceMap.get(user.id) ?? null,
  }))

  return c.json({
    data: records,
    pagination: {
      page,
      pageSize: take,
      pageCount,
      total,
    },
  })
})

export default drivers
