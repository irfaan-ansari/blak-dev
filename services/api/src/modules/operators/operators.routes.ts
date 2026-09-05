import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { OrganizationStatus, Prisma, prisma } from "@blak/db"
import { AppError } from "@blak/utils"
import { getR2Url } from "@/lib/r2"

const operators = new Hono<AppContext>()
  .get("/", async (c) => {
    const { q, status, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const where: Prisma.OrganizationWhereInput = {
      type: "OPERATOR",
    }

    if (q) {
      where.OR = [
        {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          phoneNumber: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          contactName: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          contactEmail: {
            contains: q,
            mode: "insensitive",
          },
        },
      ]
    }

    if (status) {
      where.status = status as OrganizationStatus
    }

    const [partners, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        take,
        skip,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.organization.count({
        where: {
          type: "OPERATOR",
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
  .get("/:id", async (c) => {
    const id = c.req.param("id")
    const result = await prisma.organization.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            vehicles: true,
            members: {
              where: {
                role: "driver",
              },
            },
          },
        },
      },
    })

    if (!result) {
      throw new AppError("NOT_FOUND")
    }
    const { _count, ...operator } = result

    const docs = await prisma.file.findMany({
      where: {
        ref: "OPERATOR",
        refId: result.id,
      },
    })

    const documents = await Promise.all(
      docs.map(async ({ storageKey, ...file }) => ({
        ...file,
        size: Number(file.size),
        url: await getR2Url(storageKey),
      }))
    )

    return c.json({
      success: true,
      data: {
        ...result,
        vehicleCount: _count.vehicles,
        driverCount: _count.members,
        documents,
      },
    })
  })

export default operators
