"use client"

import React from "react"
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
} from "@blak/ui/components/field"
import { Input } from "@blak/ui/components/input"
import { CloudUpload, Paperclip } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"

type UploadFieldProps = {
  name: string
  label: string
  className?: string
  accept?: string
}

export function UploadField({
  name,
  label,
  className,
  accept = ".pdf,.jpg,.jpeg,.png",
}: UploadFieldProps) {
  const form = useFormContext()
  const urlName = name.replace(/\.file$/, ".url")

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const file = field.value
        const existingUrl = form.getValues(urlName)
        const hasExistingFile =
          typeof existingUrl === "string" && existingUrl.length > 0

        return (
          <Field
            data-invalid={fieldState.invalid}
            className={`data-[invalid=true]:**:data-[slot=field-label]:border-destructive/50 data-[invalid=true]:**:data-[slot=field-label]:bg-destructive/5 ${className}`}
          >
            <FieldLegend variant="label" className="m-0">
              {label}
            </FieldLegend>

            <FieldLabel
              htmlFor={field.name}
              className="relative flex h-28 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed hover:bg-secondary/50"
            >
              <div className="flex flex-col items-center justify-center">
                <CloudUpload className="text-muted-foreground" />

                <span className="text-sm text-muted-foreground">
                  {file instanceof File
                    ? "Click to replace"
                    : hasExistingFile
                      ? "Click to replace existing file"
                      : "Click to upload"}
                </span>

                {(file instanceof File || hasExistingFile) && (
                  <span className="mt-2 inline-flex max-w-full items-center gap-2 text-sm text-muted-foreground">
                    <Paperclip className="size-3.5 shrink-0" />
                    <span className="truncate">
                      {file instanceof File ? file.name : "Existing file"}
                    </span>
                  </span>
                )}
              </div>

              <Input
                id={field.name}
                type="file"
                accept={accept}

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
