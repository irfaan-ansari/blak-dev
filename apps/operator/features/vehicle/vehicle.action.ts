"use server"
import { withPermission } from "@/lib/safe-action"
import { createVehicleSchema } from "./vehicle.schema"
import { prisma } from "@blak/db"

export const createVehicle = withPermission({ app: ["operator"] })
  .inputSchema(createVehicleSchema)
  .action(async ({ ctx, clientInput }) => {
    const { images, ...rest } = clientInput.data

    const organizationId = ctx.session.activeOrganizationId!

    const vehicle = await prisma.vehicle.create({
      data: {
        ...rest,
        registrationExpiry: new Date(
          `${rest.registrationExpiry}T00:00:00.000Z`
        ),
        organizationId,
      },
    })

    await prisma.document.createMany({
      data: images.map((img) => ({
        ...img,
        entity: "VEHICLE",
        entityId: vehicle.id,
        type: "IMAGE",
      })),
    })

    return { success: true, id: vehicle.id }
  })
