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
        mimeType: z.string().min(1),
        size: z.number().positive(),
        storageKey: z.string().min(1),
        url: z.string(),
        fileName: z.string(),
        category: z.string().optional(),
      })
    )
    .min(1),
})
