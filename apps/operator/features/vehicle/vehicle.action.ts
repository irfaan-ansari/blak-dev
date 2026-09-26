"use server"

import z from "zod"
import { AppError } from "@blak/utils"
import { withPermission } from "@/lib/safe-action"
import { vehicleCreateSchema, vehicleImportSchema } from "./vehicle.schema"
import { prisma, VehicleCategory, VehicleStatus } from "@blak/db"

const parseDateOnly = (value?: string | null) => {
  if (!value?.trim()) return null
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!match) return null
  const date = new Date(
    Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  )
  return date.getUTCFullYear() === Number(match[1]) &&
    date.getUTCMonth() === Number(match[2]) - 1 &&
    date.getUTCDate() === Number(match[3])
    ? date
    : null
}

// create
export const createVehicle = withPermission({ app: ["operator"] })
  .inputSchema(vehicleCreateSchema)
  .action(async ({ ctx, clientInput }) => {
    const { data } = clientInput

    const organizationId = ctx.session.activeOrganizationId!

    const vehicle = await prisma.vehicle.create({
      data: {
        ...data,
        status: data.status as VehicleStatus,
        category: data.category as VehicleCategory,
        year: Number(data.year ?? new Date().getFullYear()),
        registrationExpiry: parseDateOnly(data.registrationExpiry),
        organization: {
          connect: {
            id: organizationId,
          },
        },
      },
    })
    return { success: true, id: vehicle.id }
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

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        ...data,
        status: data.status as VehicleStatus,
        category: data.category as VehicleCategory,
        year: Number(data.year ?? new Date().getFullYear()),
        registrationExpiry: parseDateOnly(data.registrationExpiry),
      },
    })

    return { success: true, id: vehicle.id }
  })

export const importVehicles = withPermission({ app: ["operator"] })
  .inputSchema(vehicleImportSchema)
  .action(async ({ ctx, clientInput }) => {
    const { data } = clientInput
    const organizationId = ctx.session.activeOrganizationId!
    const imported: number[] = []
    const errors: Array<{ row: number; message: string }> = []

    for (const [index, vehicle] of data.entries()) {
      const year = Number(vehicle.year)
      const required = [
        vehicle.make,
        vehicle.model,
        vehicle.trim,
        vehicle.interiorColor,
        vehicle.exteriorColor,
        vehicle.engine,
        vehicle.licensePlate,
      ]
      if (
        !Number.isInteger(year) ||
        year < 1900 ||
        year > 2200 ||
        required.some((value) => !value.trim())
      ) {
        errors.push({
          row: index + 2,
          message: "Missing required fields or invalid year.",
        })
        continue
      }
      try {
        const registrationExpiry = parseDateOnly(vehicle.registrationExpiry)
        if (vehicle.registrationExpiry?.trim() && !registrationExpiry) {
          errors.push({
            row: index + 2,
            message:
              "Registration expiry must use YYYY-MM-DD and be a valid date.",
          })
          continue
        }
        await prisma.vehicle.create({
          data: {
            organizationId,
            year,
            make: vehicle.make.trim(),
            model: vehicle.model.trim(),
            trim: vehicle.trim.trim(),
            interiorColor: vehicle.interiorColor.trim(),
            exteriorColor: vehicle.exteriorColor.trim(),
            engine: vehicle.engine.trim(),
            licensePlate: vehicle.licensePlate.trim(),
            registrationNumber: vehicle.registrationNumber?.trim() || null,
            vin: vehicle.vin?.trim() || null,
            registrationExpiry,
            category: VehicleCategory.LUXURY_SEDAN,
            status: VehicleStatus.PENDING_APPROVAL,
          },
        })
        imported.push(index + 2)
      } catch (error) {
        console.error(error)
        errors.push({
          row: index + 2,
          message:
            "Duplicate or invalid vehicle details (plate, VIN, or registration number).",
        })
      }
    }

    return {
      success: errors.length === 0,
      count: imported.length,
      imported,
      errors,
    }
  })
