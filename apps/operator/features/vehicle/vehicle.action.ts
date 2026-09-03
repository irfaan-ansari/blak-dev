"use server"

import { withPermission } from "@/lib/safe-action"
import { vehicleCreateSchema } from "./vehicle.schema"
import { prisma } from "@blak/db"

export const createVehicle = withPermission({ app: ["operator"] })
  .inputSchema(vehicleCreateSchema)
  .action(async ({ ctx, clientInput }) => {
    const { images, ...rest } = clientInput.data

    const organizationId = ctx.session.activeOrganizationId!

    const files = await prisma.file.createManyAndReturn({
      data: images.map(({ label, ...rest }) => ({ ...rest })),
    })

    const vehicle = await prisma.vehicle.create({
      data: {
        ...rest,
        year: Number(rest.year),
        status: "PENDING_APPROVAL",
        registrationExpiry: new Date(
          `${rest.registrationExpiry}T00:00:00.000Z`
        ),
        organizationId,
      },
    })

    await prisma.entityAttachment.createMany({
      data: files.map((file) => ({
        entityId: vehicle.id,
        entityType: "VEHICLE",
        label:
          images.find((img) => img.storageKey === file.storageKey)?.label ??
          "Vehicle Image",
        name: "Vehicle Image",
        fileId: file.id,
      })),
    })

    return { success: true, id: vehicle.id }
  })
