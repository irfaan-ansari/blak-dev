import { Hono } from "hono"
import type { OrgContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"
import { AppError } from "@blak/utils"
import { getR2Url } from "@/lib/r2"

const drivers = new Hono<OrgContext>()
  .get("/", async (c) => {
    const { q, status, cat, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const [results, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          members: {
            some: {
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
  .get("/:id", async (c) => {
    const id = c.req.param("id")

    const result = await prisma.user.findFirst({
      where: { id },
    })
    if (!result) throw new AppError("NOT_FOUND")

    const complianceRecords = await prisma.complianceRecord.findMany({
      where: {
        entityType: "DRIVER",
        entityId: result.id,
      },
      include: {
        file: true,
      },
    })

    const records = await Promise.all(
      complianceRecords.map(async (attachment) => {
        const { file, label, value, status } = attachment
        if (!file) return { label, value, status }
        const { storageKey, ...rest } = file
        const url = await getR2Url(storageKey)
        return {
          ...rest,
          label,
          value,
          status,
          size: Number(rest.size),
          url,
        }
      })
    )

    return c.json({
      success: true,
      data: { ...result, documents: records },
    })
  })

export default drivers
