
import React from "react"
import { Controller, useFormContext,FieldPath } from "react-hook-form"
import { CloudUpload, Paperclip } from "lucide-react"

import {
  Field,
  FieldError,

  FieldLabel,
  FieldLegend,
} from "@blak/ui/components/field"
import { Input } from "@blak/ui/components/input"
import { OnboardingFormSchema } from "../onboarding.schema"

type UploadFieldProps = {
  name: FieldPath<OnboardingFormSchema>
  label: string
}

export function UploadField({name, label}:UploadFieldProps) {
  const form = useFormContext<OnboardingFormSchema>()
  
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLegend variant="label" className="m-0">
            {label}
          </FieldLegend>

          <FieldLabel
            htmlFor={field.name}
            className="hover:bg-secondary relative flex h-28 items-center justify-center gap-2 rounded-xl border-2 border-dashed"
          >
            <div className="flex flex-col justify-center items-center">

            <CloudUpload className="text-muted-foreground" />

         
            <span className="text-muted-foreground text-sm">
              {field.value?.name ? "Click to replace": "Click to Upload"}
            </span>

               {field.value?.name && (
              <span className="text-muted-foreground mt-2 text-sm inline-flex gap-2 items-center">
                <Paperclip className="size-3.5"/>
                {field.value?.name}
              </span>
            )}
            </div>

            <Input
              id={field.name}
              type="file"
              className="sr-only"
              aria-invalid={fieldState.invalid}
              onChange={(e) =>
                field.onChange(e.target.files?.[0] ?? null)
              }
            />
          </FieldLabel>

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}
