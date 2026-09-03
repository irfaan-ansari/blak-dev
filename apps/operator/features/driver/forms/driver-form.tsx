import React from "react"
import { toast } from "sonner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
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
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { uploadFile } from "@/lib/api-client/upload-file"
import { CloudUpload, Mail, Smartphone } from "lucide-react"
import { type DriverFormValues, driverSchema } from "../driver.schema"

export const DriverForm = ({
  requirements,
  onSuccess,
}: {
  requirements: ComplianceRequirement[]
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  const [files, setFiles] = React.useState<
    Record<
      string,
      {
        url: string | undefined
        file: File | undefined
      }
    >
  >({})

  const form = useForm({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  })

  const handleSubmit = async (values: DriverFormValues) => {
    try {
      const documents = await Promise.all(
        Object.entries(files).map(async ([requirementId, { file }]) => {
          if (!file) return null

          const uploaded = await uploadFile(file)

          const requirement = requirements.find(
            (req) => req.id === requirementId
          )

          if (!requirement) return null

          return {
            requirementId,
            label: requirement.label,
            ...uploaded,
          }
        })
      )

      const result = await createDriver({
        data: {
          documents: documents.filter((doc) => doc !== null),
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
        },
      })

      if (result?.serverError) {
        toast.error(result.serverError.message)
        return
      }
      queryClient.invalidateQueries({ queryKey: ["account"] })
      toast.success("Driver added successfully.")
    } catch (error) {
      console.error(error)

      toast.error(
        error instanceof Error ? error.message : "Failed to add driver"
      )
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <FieldGroup className="no-scrollbar grid max-h-120 overflow-auto sm:grid-cols-2">
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

        {requirements.map((field) => (
          <Field className="sm:col-span-2" key={field.id}>
            <FieldLegend className="mb-0" variant="label">
              {field.label}
            </FieldLegend>
            <FieldLabel
              htmlFor={field.id}
              className="relative flex h-28 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed hover:bg-secondary"
            >
              <div className="flex flex-col items-center justify-center">
                {files[field.id]?.url ? (
                  <img
                    src={files[field.id]?.url}
                    className="aspect-square h-26 w-full"
                  />
                ) : (
                  <>
                    <CloudUpload className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload
                    </span>
                  </>
                )}
              </div>

              <Input
                id={field.id}
                type="file"
                accept=".jpg,.jpeg,.png"
                className="sr-only"
                name={field.id}
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file instanceof File) {
                    setFiles((prev) => ({
                      ...prev,
                      [field.id]: {
                        url: URL.createObjectURL(file),
                        file,
                      },
                    }))
                  }
                }}
              />
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button
          type="submit"
          className="min-w-28"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  )
}
