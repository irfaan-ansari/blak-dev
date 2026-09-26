import z from "zod"

export const driverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  phoneNumber: z.string().min(1, "Phone is required"),
  documents: z
    .object({
      requirementId: z.string(),
      file: z.instanceof(File, {
        message: "Document is required",
      }),
      label: z.string(),
    })
    .array(),
})

export type DriverFormValues = z.infer<typeof driverSchema>

export const driverCreateSchema = z.object({
  data: driverSchema.omit({ documents: true }),
})
