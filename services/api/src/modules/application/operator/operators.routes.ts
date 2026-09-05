import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { ApplicationStatus, Prisma, prisma } from "@blak/db"
import { AppError } from "@blak/utils/error"

const operators = new Hono<AppContext>()
  .get("/", async (c) => {
    const { q, status, cat, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const where: Prisma.ApplicationWhereInput = {
      type: "OPERATOR",
    }

    if (q) {
      where.OR = [
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
        {
          contactPhone: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          operatorApplication: {
            legalBusinessName: {
              contains: q,
              mode: "insensitive",
            },
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
      where.currentStatus = status as ApplicationStatus
    }

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
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

    const data = applications.map(
      ({ operatorApplication, ...application }) => ({
        ...application,
        application: operatorApplication,
      })
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
    const application = await prisma.application.findUnique({
      where: {
        id,
        type: "OPERATOR",
      },
      include: {
        operatorApplication: true,
      },
    })
    if (!application) {
      throw new AppError("NOT_FOUND")
    }

    const { operatorApplication, ...rest } = application

    return c.json({
      success: true,
      data: {
        ...rest,
        application: operatorApplication,
      },
    })
  })

export default operators
