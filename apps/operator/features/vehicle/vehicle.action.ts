"use server"

import { withPermission } from "@/lib/safe-action"
import { vehicleCreateSchema } from "./vehicle.schema"
import { prisma } from "@blak/db"

export const createVehicle = withPermission({ app: ["operator"] })
  .inputSchema(vehicleCreateSchema)
  .action(async ({ ctx, clientInput }) => {
    const { data } = clientInput

    const organizationId = ctx.session.activeOrganizationId!

    const vehicle = await prisma.vehicle.create({
      data: {
        ...data,
        year: Number(data.year ?? new Date().getFullYear()),
        status: "PENDING_APPROVAL",
        registrationExpiry: new Date(
          `${data.registrationExpiry}T00:00:00.000Z`
        ),
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    })

    return { success: true, id: vehicle.id }
  })
