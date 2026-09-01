import { z } from "zod"

export const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(4, "Year is required"),
  color: z.string().min(1, "Color is required"),
  plateNumber: z.string().min(1, "Plate number is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  vin: z.string().min(1, "VIN is required"),
  registrationExpiry: z.string().min(1, "Registration expiry is required"),
  category: z.enum([
    "LUXURY_SEDAN",
    "LUXURY_SUV",
    "LIMOUSINE",
    "EXECUTIVE_VAN",
  ]),

  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]),
  images: z.file().array(),
})

export type VehicleFormValues = z.infer<typeof vehicleSchema>

const vehicleImageSchema = z.object({
  fileName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  storageKey: z.string(),
  url: z.string(),
})

export const createVehicleSchema = z.object({
  data: z.object({
    make: z.string().trim().min(1),
    model: z.string().trim().min(1),
    year: z.number().int().min(1900),
    color: z.string().trim().min(1),

    plateNumber: z.string().trim().min(1),
    registrationNumber: z.string().trim().optional(),
    vin: z.string().trim().max(17).optional(),
    registrationExpiry: z.string().optional(),

    category: z.enum([
      "LUXURY_SEDAN",
      "LUXURY_SUV",
      "LIMOUSINE",
      "EXECUTIVE_VAN",
    ]),

    images: z.array(vehicleImageSchema).max(10),
  }),
})
