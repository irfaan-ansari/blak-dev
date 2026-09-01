"use client"

import React from "react"
import { Controller, useFormContext } from "react-hook-form"

import { CloudUpload, Paperclip } from "lucide-react"

import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
} from "@blak/ui/components/field"

import { Input } from "@blak/ui/components/input"

import { ComplianceFormSchema } from "../compliance.schema"

type UploadFieldProps = {
  name: `documents.${number}.file`
  label: string
}

export function UploadField({ name, label }: UploadFieldProps) {
  const form = useFormContext<ComplianceFormSchema>()

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const file = field.value

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLegend variant="label" className="m-0">
              {label}
            </FieldLegend>

            <FieldLabel
              htmlFor={field.name}
              className="relative flex h-28 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed hover:bg-secondary"
            >
              <div className="flex flex-col items-center justify-center">
                <CloudUpload className="text-muted-foreground" />

                <span className="text-sm text-muted-foreground">
                  {file instanceof File
                    ? "Click to replace"
                    : "Click to upload"}
                </span>

                {file instanceof File && (
                  <span className="mt-2 inline-flex max-w-full items-center gap-2 text-sm text-muted-foreground">
                    <Paperclip className="size-3.5 shrink-0" />

                    <span className="max-w-[300px] truncate">{file.name}</span>
                  </span>
                )}
              </div>

              <Input
                id={field.name}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="sr-only"
                aria-invalid={fieldState.invalid}
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null

                  field.onChange(file)
                }}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            </FieldLabel>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
