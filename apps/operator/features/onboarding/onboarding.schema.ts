import { z } from "zod"

export const onboardingSchema = z.object({
  businessLicense: z.file("This field is required."),
  taxCertificate: z.file("This field is required."),
  operatingLicense: z.file("This field is required."),
  insuranceCertificate: z.file("This field is required."),
})
export type OnboardingFormSchema = z.infer<typeof onboardingSchema>

const documentSchema = z.object({
  name: z.string(),
  fileName: z.string(),
  mimeType: z.string(),
  size: z.number().positive(),
  storageKey: z.string(),
  url: z.string(),
  category: z.string().optional(),
})

export const documentActionSchema = z.object({
  data: z.array(documentSchema),
})
