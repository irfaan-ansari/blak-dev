import { Hono } from "hono"
import type { OrgContext } from "@/middlewares"

import { prisma } from "@blak/db"

const analytics = new Hono<OrgContext>().get("/", async (c) => {
  const organizationId = c.get("organizationId")
  const { q, status, cat, ...rest } = c.req.query()

  const [driverCount, vehicleCount] = await prisma.$transaction([
    prisma.user.count({
      where: {
        members: {
          some: {
            organizationId,
            role: "driver",
          },
        },
      },
    }),
    prisma.vehicle.count({
      where: {
        organizationId,
      },
    }),
  ])

  return c.json({
    success: true,
    data: { driverCount, vehicleCount, rideCount: 0 },
  })
})

export { analytics }
