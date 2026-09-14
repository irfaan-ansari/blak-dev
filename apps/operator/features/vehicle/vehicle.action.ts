"use server"

import z from "zod"
import { AppError } from "@blak/utils"
import { withPermission } from "@/lib/safe-action"
import { vehicleCreateSchema, vehicleImportSchema } from "./vehicle.schema"
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
          "Unable to create vehicle. Check the license plate, VIN, or registration number.",
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
          "Unable to update vehicle. Check the license plate, VIN, or registration number.",
      })
    }
  })

export const importVehicles = withPermission({ app: ["operator"] })
  .inputSchema(vehicleImportSchema)
  .action(async ({ ctx, clientInput }) => {
    const { data } = clientInput
    const organizationId = ctx.session.activeOrganizationId!
    try {
      const result = await prisma.vehicle.createMany({
        data: data.map((vehicle) => ({
          organizationId,
          year: Number(vehicle.year),
          make: vehicle.make.trim(),
          model: vehicle.model.trim(),
          trim: vehicle.trim.trim(),
          interiorColor: vehicle.interiorColor.trim(),
          exteriorColor: vehicle.exteriorColor.trim(),
          engine: vehicle.engine.trim(),
          licensePlate: vehicle.licensePlate.trim(),
          registrationNumber: vehicle.registrationNumber?.trim() || null,
          vin: vehicle.vin?.trim() || null,
          registrationExpiry: vehicle.registrationExpiry
            ? new Date(`${vehicle.registrationExpiry}T00:00:00.000Z`)
            : null,
          category: VehicleCategory.LUXURY_SEDAN,
          status: VehicleStatus.PENDING_APPROVAL,
        })),
      })

      return {
        success: true,
        count: result.count,
      }
    } catch (error) {
      console.error(error)

      throw new AppError("INVALID_REQUEST", {
        message:
          "Unable to import vehicles. Please check the CSV data and try again.",
      })
    }
  })
