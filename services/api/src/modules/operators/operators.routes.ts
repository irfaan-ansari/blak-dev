import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"
import { prisma } from "@blak/db"
import { AppError } from "@blak/utils"
import { getR2Url } from "@/lib/r2"

const operators = new Hono<AppContext>()
  .get("/", async (c) => {
    const { q, status, cat, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const [partners, total] = await Promise.all([
      prisma.organization.findMany({
        where: {
          type: "OPERATOR",
        },
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
    })

    if (!result) {
      throw new AppError("NOT_FOUND")
    }

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
      data: { ...result, documents },
    })
  })

export default operators
