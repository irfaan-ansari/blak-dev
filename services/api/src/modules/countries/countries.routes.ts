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
          _count: {
            select: {
              states: true,
            },
          },
        },
      }),
      prisma.country.count(),
    ])

    const countriesWithStateCount = countries.map(({ _count, ...rest }) => ({
      ...rest,
      stateCount: _count.states,
    }))

    const pageCount = Math.ceil(total / take)
    return c.json({
      success: true,
      data: countriesWithStateCount,
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
        include: {
          _count: {
            select: {
              cities: true,
            },
          },
        },
      }),
      prisma.state.count({
        where: {
          countryId,
        },
      }),
    ])

    const pageCount = Math.ceil(total / take)

    const statesWithCityCount = states.map(({ _count, ...rest }) => ({
      ...rest,
      cityCount: _count.cities,
    }))

    return c.json({
      success: true,
      data: statesWithCityCount,
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
