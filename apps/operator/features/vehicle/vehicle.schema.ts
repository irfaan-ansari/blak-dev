import { z } from "zod"
import { REQUIRED_IMAGES } from "./vehicle.const"

const importRequiredString = z.preprocess(
  (value) => (value == null ? "" : String(value)),
  z.string()
)

const importOptionalString = z.preprocess(
  (value) => (value == null ? undefined : String(value)),
  z.string().optional()
)

const uploadSlotSchema = z
  .object({
    id: z.string().optional(),
    label: z.string(),
    file: z.instanceof(File).optional(),
    url: z.string().optional(),
  })
  .refine((value) => value.file instanceof File || Boolean(value.id || value.url), {
    message: "Required",
    path: ["file"],
  })

export const vehicleSchema = z.object({
  year: z.string().min(4, "Year is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  trim: z.string().min(1, "Trim level is required"),
  engine: z.string().min(1, "Engine number is required"),
  interiorColor: z.string().min(1, "Color is required"),
  exteriorColor: z.string().min(1, "Color is required"),
  licensePlate: z.string().min(1, "Plate number is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  vin: z.string().min(1, "VIN is required"),
  registrationExpiry: z.string().min(1, "Registration expiry is required"),
  category: z.string(),
  status: z.string(),
  documents: uploadSlotSchema.array(),
  images: uploadSlotSchema.array(),
})

export type VehicleFormValues = z.infer<typeof vehicleSchema>

export const vehicleCreateSchema = z.object({
  data: vehicleSchema.omit({ images: true, documents: true }),
})

export const DEFAULT_VALUES = {
  year: "",
  make: "",
  model: "",
  trim: "",
  engine: "",
  interiorColor: "",
  exteriorColor: "",
  licensePlate: "",
  registrationNumber: "",
  status: "ACTIVE",
  vin: "",
  registrationExpiry: "",
  category: "LUXURY_SEDAN",
  documents: [
    { id: undefined, label: "Vehicle Registration", file: undefined },
    { id: undefined, label: "Vehicle Insurance", file: undefined },
  ],
  images: REQUIRED_IMAGES.map((img) => ({
    id: undefined,
    label: img.label,
    file: undefined,
  })),
}

export const vehicleImportSchema = z.object({
  data: z.array(
    z.object({
      originalRowNumber: z.number().int().positive().optional(),
      year: importRequiredString,
      make: importRequiredString,
      model: importRequiredString,
      trim: importRequiredString,
      interiorColor: importRequiredString,
      exteriorColor: importRequiredString,
      engine: importRequiredString,
      licensePlate: importRequiredString,
      registrationNumber: importOptionalString,
      vin: importOptionalString,
      registrationExpiry: importOptionalString,
    })
  ),
})
