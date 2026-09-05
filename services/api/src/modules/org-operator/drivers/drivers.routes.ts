import { Hono } from "hono"
import type { OrgContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"
import { getR2Url } from "@/lib/r2"
import { AppError } from "@blak/utils/error"

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

    const docs = await prisma.file.findMany({
      where: {
        ref: "DRIVER",
        refId: {
          in: results.map((user) => user.id),
        },
      },
    })

    const docsWithUrl = await Promise.all(
      docs.map(async ({ storageKey, ...file }) => ({
        ...file,
        size: Number(file.size),
        url: await getR2Url(storageKey),
      }))
    )

    const docsByDriver = docsWithUrl.reduce<
      Record<string, (typeof docsWithUrl)[number][]>
    >((acc, file) => {
      if (!file.refId) return acc

      ;(acc[file.refId] ??= []).push(file)

      return acc
    }, {})

    const records = results.map((user) => ({
      ...user,
      documents: docsByDriver[user.id] ?? [],
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

    const docsWithUrl = await Promise.all(
      docs.map(async ({ storageKey, ...file }) => ({
        ...file,
        size: Number(file.size),
        url: await getR2Url(storageKey),
      }))
    )

    return c.json({
      success: true,
      data: { ...user, documents: docsWithUrl },
    })
  })

export default drivers
