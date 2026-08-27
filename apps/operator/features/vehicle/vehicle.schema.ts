import { z } from "zod"

export const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Year is required"),
  color: z.string().min(1, "Color is required"),
  plateNumber: z.string().min(1, "Plate number is required"),
  registrationNumber: z.string().optional(),
  vin: z.string().optional(),
  registrationExpiry: z.string().optional(),
  category: z.string(),
  status: z.string(),
})

export type VehicleFormValues = z.infer<typeof vehicleSchema>
