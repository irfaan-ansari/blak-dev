import { Hono } from "hono"
import { prisma } from "@blak/db"
import type { AppContext } from "@/middlewares"
import { parsePagination } from "@/lib/parse-pagination"

const countries = new Hono<AppContext>()
  .get("/", async (c) => {
    const { q, status, cat, ...rest } = c.req.query()
    const { page, take, skip } = parsePagination(rest)

    const [countries, total] = await Promise.all([
      prisma.country.findMany({
        take,
        skip,
        include: {
          states: true,
        },
      }),
      prisma.country.count(),
    ])

    const pageCount = Math.ceil(total / take)
    return c.json({
      success: true,
      data: countries,
      pagination: {
        page,
        pageSize: take,
        pageCount,
        total,
      },
    })
  })
  .get("/:id/states", async (c) => {
    const countryId = c.req.param("id")
    const query = c.req.query()
    const { page, take, skip } = parsePagination(query)

    const [states, total] = await prisma.$transaction([
      prisma.state.findMany({
        where: {
          countryId,
        },
        take,
        skip,
      }),

      prisma.state.count({
        where: {
          countryId,
        },
      }),
    ])

    const pageCount = Math.ceil(total / take)

    return c.json({
      success: true,
      data: states,
      pagination: {
        page,
        pageSize: take,
        pageCount,
        total,
      },
    })
  })
  .get("/states/:id/cities", async (c) => {
    const stateId = c.req.param("id")
    const query = c.req.query()
    const { page, take, skip } = parsePagination(query)

    const [cities, total] = await prisma.$transaction([
      prisma.city.findMany({
        where: {
          stateId,
        },
        take,
        skip,
      }),
      prisma.city.count({
        where: {
          stateId,
        },
      }),
    ])

    const pageCount = Math.ceil(total / take)

    return c.json({
      success: true,
      data: cities,
      pagination: {
        page,
        pageSize: take,
        pageCount,
        total,
      },
    })
  })

export default countries
