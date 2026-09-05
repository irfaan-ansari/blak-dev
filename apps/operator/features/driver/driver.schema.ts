import z from "zod"

export const driverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone is required"),
})

export type DriverFormValues = z.infer<typeof driverSchema>

const driverDocSchema = z.object({
  requirementId: z.string(),
  label: z.string(),
  name: z.string(),
  mime: z.string(),
  size: z.number(),
  storageKey: z.string(),
  url: z.string(),
})

export const driverCreateSchema = z.object({
  data: driverSchema,
})
