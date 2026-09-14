import { Hono } from "hono"
import { API_URL } from "@/lib/utils"
import { AppError } from "@blak/utils"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { OrganizationStatus, Prisma, prisma } from "@blak/db"

const operators = new Hono<AppContext>()
  .get("/", async (c) => {
    const { q, status, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const where: Prisma.OrganizationWhereInput = {
      type: "OPERATOR",
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { legalName: { contains: q, mode: "insensitive" } },
          { slug: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
          { phoneNumber: { contains: q, mode: "insensitive" } },
          { website: { contains: q, mode: "insensitive" } },
          { registrationNo: { contains: q, mode: "insensitive" } },
          { taxId: { contains: q, mode: "insensitive" } },
          { contactName: { contains: q, mode: "insensitive" } },
          { contactTitle: { contains: q, mode: "insensitive" } },
          { contactEmail: { contains: q, mode: "insensitive" } },
          { contactPhone: { contains: q, mode: "insensitive" } },
        ],
      }),
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

    const [operators, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        take,
        include: {
          members: {
            select: { id: true },
            where: {
              role: "driver",
            },
          },
          vehicles: {
            select: { id: true },
          },
        },
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

    const data = operators.map(
      ({ metadata, members, vehicles, ...partner }) => {
        let jsonMetadata = {}
        try {
          jsonMetadata = JSON.parse(metadata!)
        } catch (error) {}

        return {
          ...partner,
          driverCount: members.length,
          vehicleCount: vehicles.length,
          metadata: jsonMetadata,
        }
      }
    )

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

    let jsonMetadata = {}

    try {
      jsonMetadata = JSON.parse(operator.metadata ?? "{}")
    } catch {
      jsonMetadata = {}
    }

    const docs = await prisma.file.findMany({
      where: {
        ref: "OPERATOR",
        refId: result.id,
      },
    })

    const filesWithUrl = docs.map((file) => ({
      ...file,
      size: Number(file.size),
      url: API_URL + `/v1/uploads/${file.id}`,
    }))

    return c.json({
      success: true,
      data: {
        ...result,
        metadata: jsonMetadata,
        vehicleCount: _count.vehicles,
        driverCount: _count.members,
        documents: filesWithUrl,
      },
    })
  })

export default operators
