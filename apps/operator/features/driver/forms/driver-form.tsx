import React from "react"
import { toast } from "sonner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@blak/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blak/ui/components/input-group"
import { createDriver } from "../driver.action"
import { ComplianceRequirement } from "@blak/db"
import { Input } from "@blak/ui/components/input"
import { Button } from "@blak/ui/components/button"
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { uploadFiles } from "@/lib/api-client/upload-file"
import { Mail, Smartphone } from "lucide-react"
import { type DriverFormValues, driverSchema } from "../driver.schema"
import { UploadField } from "@/features/shared/components/upload-field"
import { createComplianceRecord } from "@/features/compliance/compliance.action"
import { AppDrawerClose } from "@blak/ui/components/blak/app-drawer"

export const DriverForm = ({
  requirements,
  onSuccess,
}: {
  requirements: ComplianceRequirement[]
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      documents: requirements.map((requirement) => ({
        requirementId: requirement.id,
        label: requirement.label,
        file: undefined,
      })),
    },
  })

  const documents = useFieldArray({
    control: form.control,
    name: "documents",
  })

  const handleSubmit = async (values: DriverFormValues) => {
    try {
      const result = await createDriver({
        data: {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
        },
      })

      if (result?.serverError) {
        toast.error(result.serverError.message)
        return
      }

      const uploadItems = values.documents
        .filter(
          (document): document is typeof document & { file: File } =>
            document.file instanceof File
        )
        .map(({ file, requirementId, label }) => {
          return {
            requirementId,
            file,
            meta: {
              ref: "DRIVER",
              refId: result?.data?.id,
              field: label,
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

      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      })

      toast.success("Driver added successfully.")
      onSuccess?.()
    } catch (error) {
      console.error(error)

      toast.error(
        error instanceof Error ? error.message : "Failed to add driver"
      )
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FieldGroup className="-mx-1 no-scrollbar grid max-h-120 overflow-auto px-1 sm:grid-cols-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="sm:col-span-2">
                <FieldLabel>Name</FieldLabel>
                <Input placeholder="John Doe" {...field} />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <Smartphone />
                  </InputGroupAddon>
                  <InputGroupInput placeholder="(555) 123-4567" {...field} />
                </InputGroup>
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                  <InputGroupInput placeholder="name@email.com" {...field} />
                </InputGroup>
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />

          {documents.fields.map((requirement, index) => {
            return (
              <UploadField
                key={requirement.id}
                name={`documents.${index}.file`}
                label={requirement.label}
                className="sm:col-span-2"
              />
            )
          })}
        </FieldGroup>
        <div className="flex justify-end gap-3">
          <AppDrawerClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </AppDrawerClose>
          <Button
            type="submit"
            className="min-w-28"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
