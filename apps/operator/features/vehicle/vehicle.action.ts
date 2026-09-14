"use server"

import z from "zod"
import { AppError } from "@blak/utils"
import { withPermission } from "@/lib/safe-action"
import { vehicleCreateSchema } from "./vehicle.schema"
import { prisma, VehicleCategory, VehicleStatus } from "@blak/db"

// create
export const createVehicle = withPermission({ app: ["operator"] })
  .inputSchema(vehicleCreateSchema)
  .action(async ({ ctx, clientInput }) => {
    const { data } = clientInput

    const organizationId = ctx.session.activeOrganizationId!

    try {
      const vehicle = await prisma.vehicle.create({
        data: {
          ...data,
          status: data.status as VehicleStatus,
          category: data.category as VehicleCategory,
          year: Number(data.year ?? new Date().getFullYear()),
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
    } catch (error) {
      throw new AppError("INVALID_REQUEST", {
        message:
          "Unable to create vehicle. Please check the provided information.",
      })
    }
  })

// update
export const updateVehicle = withPermission({ app: ["operator"] })
  .inputSchema(
    z.object({
      id: z.string(),
      ...vehicleCreateSchema.shape,
    })
  )
  .action(async ({ ctx, clientInput }) => {
    const { data, id } = clientInput

    const existing = await prisma.vehicle.findFirst({
      where: { id },
    })

    if (!existing) throw new AppError("NOT_FOUND")

    try {
      const vehicle = await prisma.vehicle.update({
        where: { id },
        data: {
          ...data,
          status: data.status as VehicleStatus,
          category: data.category as VehicleCategory,
          year: Number(data.year ?? new Date().getFullYear()),
          registrationExpiry: new Date(
            `${data.registrationExpiry}T00:00:00.000Z`
          ),
        },
      })
      return { success: true, id: vehicle.id }
    } catch (error) {
      throw new AppError("INVALID_REQUEST", {
        message:
          "Unable to create vehicle. Please check the provided information.",
      })
    }
  })
