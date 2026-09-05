import { z } from "zod"

export const complianceDocumentSchema = z.object({
  requirementId: z.string().min(1),
  file: z
    .instanceof(File, {
      message: "Document is required",
    })
    .nullable(),
})

export const complianceSchema = z.object({
  documents: z.array(complianceDocumentSchema),
})

export type ComplianceFormSchema = z.infer<typeof complianceSchema>

export const createComplianceRecordSchema = z.object({
  data: z
    .array(
      z.object({
        requirementId: z.string().min(1),
        fileId: z.string().min(1),
        expiresAt: z.coerce.date().optional(),
      })
    )
    .min(1),
})
