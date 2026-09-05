import { Hono } from "hono"
import type { OrgContext } from "@/middlewares"

import { prisma } from "@blak/db"

const analytics = new Hono<OrgContext>().get("/", async (c) => {
  const { q, status, cat, ...rest } = c.req.query()

  const [
    driverCount,
    vehicleCount,
    passengerCount,
    applicationCount,
    operatorCount,
    partnerCount,
  ] = await prisma.$transaction([
    prisma.user.count({
      where: {
        role: "driver",
      },
    }),
    prisma.user.count({
      where: {
        role: "user",
      },
    }),
    prisma.vehicle.count({}),
    prisma.application.count({
      where: {
        currentStatus: "PENDING_APPROVAL",
      },
    }),
    prisma.organization.count({
      where: {
        type: "OPERATOR",
      },
    }),
    prisma.organization.count({
      where: {
        type: "PARTNER",
      },
    }),
  ])

  return c.json({
    success: true,
    data: {
      driverCount,
      vehicleCount,
      passengerCount,
      applicationCount,
      operatorCount,
      partnerCount,
    },
  })
})

export { analytics }
