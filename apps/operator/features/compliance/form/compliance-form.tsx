"use client"

import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Loader2 } from "lucide-react"
import { toast } from "sonner"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"

import { FieldGroup } from "@blak/ui/components/field"
import { Button } from "@blak/ui/components/button"

import { UploadField } from "./upload-field"

import { ComplianceFormSchema, complianceSchema } from "../compliance.schema"
import { Compliance } from "../compliance.type"
import { createComplianceRecord } from "../compliance.action"
import { useQueryClient } from "@tanstack/react-query"
import { authClient } from "@blak/auth/client"
import { uploadFiles } from "@/lib/api-client/upload-file"

type ComplianceFormProps = {
  requirements: Compliance[]
}

export const ComplianceForm = ({ requirements }: ComplianceFormProps) => {
  const queryClient = useQueryClient()
  const { data: session } = authClient.useSession()
  const form = useForm<ComplianceFormSchema>({
    resolver: zodResolver(complianceSchema),

    defaultValues: {
      documents: requirements.map((requirement) => ({
        requirementId: requirement.id,
        file: null,
      })),
    },
  })

  const handleSubmit = async (values: ComplianceFormSchema) => {
    try {
      const organizationId = session?.session.activeOrganizationId!

      const uploadItems = values.documents
        .filter(
          (document): document is typeof document & { file: File } =>
            document.file instanceof File
        )
        .map(({ file, requirementId }) => {
          const requirement = requirements.find(
            (item) => item.id === requirementId
          )

          if (!requirement) {
            throw new Error(`Requirement not found: ${requirementId}`)
          }

          return {
            requirementId,
            file,
            meta: {
              ref: "OPERATOR",
              refId: organizationId,
              field: requirement.label,
            },
          }
        })

      const response = await uploadFiles(
        uploadItems.map(({ file, meta }) => ({
          file,
          meta,
        }))
      )

      const uploadedFiles = response.data

      const records = uploadItems.map((item, index) => ({
        requirementId: item.requirementId,
        // @ts-expect-error - uploadedFiles is unknown
        fileId: uploadedFiles[index].id,
      }))

      await createComplianceRecord({ data: records })

      queryClient.invalidateQueries({ queryKey: ["account"] })
      toast.success("Documents submitted successfully.")
    } catch (error) {
      console.error(error)

      toast.error(
        error instanceof Error ? error.message : "Failed to upload documents"
      )
    }
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Compliance</CardTitle>
        <CardDescription>
          Provide the required documents to start operating with BLAK.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              {requirements.map((requirement, index) => {
                const record = requirement.record
                const document = record?.document

                return (
                  <UploadField
                    key={requirement.id}
                    name={`documents.${index}.file`}
                    label={requirement.label}
                  />
                )
              })}
              <div className="text-right">
                <Button
                  type="submit"
                  className="justify-between"
                  disabled={form.formState.isSubmitting}
                  suffix={<ArrowRight />}
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}
