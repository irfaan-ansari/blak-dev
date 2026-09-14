import { Hono } from "hono"
import { prisma } from "@blak/db"
import { API_URL } from "@/lib/utils"
import { AppError } from "@blak/utils/error"
import type { OrgContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"

const drivers = new Hono<OrgContext>()
  .get("/", async (c) => {
    const session = c.get("session")
    const { q, status, cat, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const [results, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          members: {
            some: {
              organizationId: session?.activeOrganizationId!,
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
              organizationId: session?.activeOrganizationId!,
              role: "driver",
            },
          },
        },
      }),
    ])

    const pageCount = Math.ceil(total / take)

    return c.json({
      data: results,
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
    const organizationId = c.get("organizationId")

    const user = await prisma.user.findUnique({
      where: {
        id,
        members: {
          some: {
            organizationId,
            role: "driver",
          },
        },
      },
    })

    if (!user) {
      throw new AppError("NOT_FOUND")
    }

    const docs = await prisma.file.findMany({
      where: {
        ref: "DRIVER",
        refId: id,
      },
    })

    const filesWithUrl = docs.map((file) => ({
      ...file,
      size: Number(file.size),
      url: API_URL + `/v1/uploads/${file.id}`,
    }))

    return c.json({
      success: true,
      data: { ...user, documents: filesWithUrl },
    })
  })

export default drivers
