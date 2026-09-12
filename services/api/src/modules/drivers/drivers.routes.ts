import { Hono } from "hono"
import type { OrgContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { Prisma, prisma } from "@blak/db"
import { AppError } from "@blak/utils"
import { getR2Url } from "@/lib/r2"

const drivers = new Hono<OrgContext>()
  .get("/", async (c) => {
    const { q, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const where: Prisma.UserWhereInput = {
      members: {
        some: {
          role: "driver",
          ...(rest.organization && {
            organizationId: rest.organization,
          }),
        },
      },
      ...(q && {
        OR: [
          { name: { contains: q.trim(), mode: "insensitive" } },
          { email: { contains: q.trim(), mode: "insensitive" } },
          { phoneNumber: { contains: q.trim(), mode: "insensitive" } },
        ],
      }),
    }
    const [results, total] = await Promise.all([
      prisma.user.findMany({
        where,
        take,
        skip,
        include: {
          members: {
            select: {
              organization: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
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

    const data = results.map(({ members, ...user }) => ({
      ...user,
      organization: members[0]?.organization ?? null,
    }))

    return c.json({
      data,
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
      include: {
        members: {
          select: {
            organization: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!result) throw new AppError("NOT_FOUND")

    const { members, ...rest } = result

    const data = {
      ...rest,
      organization: members[0]?.organization ?? null,
    }

    const docs = await prisma.file.findMany({
      where: {
        ref: "DRIVER",
        refId: result.id,
      },
    })

    const docsWithUrl = await Promise.all(
      docs.map(async ({ storageKey, ...file }) => ({
        ...file,
        size: Number(file.size),
        url: await getR2Url(storageKey),
      }))
    )

    return c.json({
      success: true,
      data: { ...data, documents: docsWithUrl },
    })
  })

export default drivers
