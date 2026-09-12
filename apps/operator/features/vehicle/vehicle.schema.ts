import { z } from "zod"

export const vehicleSchema = z.object({
  year: z.string().min(4, "Year is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  trim: z.string().min(1, "Trim level is required"),
  engine: z.string().min(1, "Engine number is required"),
  interiorColor: z.string().min(1, "Color is required"),
  exteriorColor: z.string().min(1, "Color is required"),
  licensePlate: z.string().min(1, "Plate number is required"),
  registrationNumber: z.string().optional(),
  vin: z.string().min(1, "VIN is required"),
  registrationExpiry: z.string().min(1, "Registration expiry is required"),
  category: z.enum([
    "LUXURY_SEDAN",
    "LUXURY_SUV",
    "LIMOUSINE",
    "EXECUTIVE_VAN",
  ]),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  images: z
    .object({
      label: z.string(),
      file: z.instanceof(File, {
        message: "Image is required",
      }),
    })
    .array(),
})

export type VehicleFormValues = z.infer<typeof vehicleSchema>

export const vehicleCreateSchema = z.object({
  data: vehicleSchema.omit({ images: true }),
})
