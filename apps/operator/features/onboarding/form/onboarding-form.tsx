"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { FieldGroup } from "@blak/ui/components/field"
import React from "react"

import { FormProvider, useForm } from "react-hook-form"
import { UploadField } from "./upload-field"
import { zodResolver } from "@hookform/resolvers/zod"
import { OnboardingFormSchema, onboardingSchema } from "../onboarding.schema"
import { Button } from "@blak/ui/components/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { uploadDocuments } from "../onboarding.action"
import { toast } from "sonner"

const OnboardingForm = () => {
  const form = useForm<OnboardingFormSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      businessLicense: undefined,
      taxCertificate: undefined,
      operatingLicense: undefined,
      insuranceCertificate: undefined,
    },
  })
  const handleSubmit = async (values: OnboardingFormSchema) => {
    try {
      const documents = await Promise.all(
        Object.entries(values)
          .filter(([, file]) => file instanceof File)
          .map(async ([category, file]) => {
            const presignResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/v1/uploads/presign`,
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  filename: file.name,
                  contentType: file.type,
                }),
              }
            )

            if (!presignResponse.ok) {
              throw new Error(`Failed to prepare upload for ${file.name}`)
            }

            const presignResult: {
              data: {
                uploadUrl: string
                key: string
                url: string
              }
            } = await presignResponse.json()

            const uploadResponse = await fetch(presignResult.data.uploadUrl, {
              method: "PUT",
              headers: {
                "Content-Type": file.type,
              },
              body: file,
            })

            if (!uploadResponse.ok) {
              throw new Error(`Failed to upload ${file.name}`)
            }

            return {
              fileName: file.name,
              mimeType: file.type,
              size: file.size,
              storageKey: presignResult.data.key,
              url: presignResult.data.key,
              category: category.toUpperCase(),
              name: file.name,
            }
          })
      )

      const result = await uploadDocuments({
        data: documents,
      })

      if (result?.serverError) {
        toast.error(result.serverError.message)
        return
      }
      toast.success("Documents submitted.")
    } catch (error) {
      console.error(error)

      toast.error(
        error instanceof Error ? error.message : "Failed to upload documents"
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>
          Provide required documents to start operating with BLAK.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <UploadField name="businessLicense" label="Business License *" />
              <UploadField name="taxCertificate" label="Tax Certificate *" />
              <UploadField
                name="operatingLicense"
                label="Operating License *"
              />
              <UploadField
                name="insuranceCertificate"
                label="Insurance Certificate *"
              />

              <Button
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
            </FieldGroup>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default OnboardingForm
