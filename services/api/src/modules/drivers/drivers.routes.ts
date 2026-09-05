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

    const result = await prisma.user.findFirst({
      where: { id },
    })
    if (!result) throw new AppError("NOT_FOUND")

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
      data: { ...result, documents: docsWithUrl },
    })
  })

export default drivers
