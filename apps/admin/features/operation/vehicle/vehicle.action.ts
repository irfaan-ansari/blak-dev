"use server"
import { prisma } from "@blak/db"
import { AppError } from "@blak/utils"
import { withPermission } from "@/lib/safe-action"
import { vehicleStatusSchema } from "./vehicle.schema"

export const updateVehicleStatus = withPermission({ app: ["admin"] })
  .inputSchema(vehicleStatusSchema)
  .action(async ({ ctx, clientInput }) => {
    const { id, data } = clientInput

    const exist = await prisma.vehicle.findUnique({
      where: {
        id,
      },
    })

    if (!exist) {
      throw new AppError("NOT_FOUND")
    }

    await prisma.vehicle.update({
      where: {
        id,
      },
      data: {
        status: data.status,
      },
    })

    return { id }
  })
