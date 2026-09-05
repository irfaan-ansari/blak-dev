"use client"

import * as React from "react"

import { Controller, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { CloudUpload } from "lucide-react"

import { Button } from "@blak/ui/components/button"
import { Input } from "@blak/ui/components/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blak/ui/components/select"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@blak/ui/components/field"

import { toast } from "sonner"
import { createVehicle } from "../vehicle.action"
import { REQUIRED_IMAGES } from "../vehicle.const"
import { useQueryClient } from "@tanstack/react-query"
import { uploadFiles } from "@/lib/api-client/upload-file"
import { vehicleSchema, type VehicleFormValues } from "../vehicle.schema"

export function VehicleForm({ onSuccess }: { onSuccess: () => void }) {
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

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      year: "",
      make: "",
      model: "",
      interiorColor: "",
      exteriorColor: "",
      licensePlate: "",
      registrationNumber: "",
      status: "ACTIVE",
      vin: "",
      registrationExpiry: "",
      category: "LUXURY_SEDAN",
    },
  })

  /*
   * Submit
   */
  const onSubmit = async (values: VehicleFormValues) => {
    const { serverError, data } = await createVehicle({
      data: {
        ...values,
      },
    })

    if (serverError) {
      toast.error(serverError.message)
      return
    }

    const uploads = Object.entries(files)
      .filter(([, value]) => value?.file instanceof File)
      .map(([name, value]) => ({
        file: value.file as File,
        meta: {
          ref: "VEHICLE",
          refId: data?.id!,
          field: name,
        },
      }))

    if (uploads.length) {
      await uploadFiles(uploads)
    }

    toast.success("Vehicle added.")

    form.reset()
    onSuccess()

    queryClient.invalidateQueries({
      queryKey: ["vehicles"],
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="-mx-4 no-scrollbar max-h-120 space-y-5 overflow-auto px-4">
        <FieldGroup className="grid sm:grid-cols-2">
          <Controller
            name="year"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="sm:col-span-2">
                <FieldLabel>Model year</FieldLabel>
                <Input
                  {...field}
                  placeholder="2025"
                  min={1900}
                  max={new Date().getFullYear() + 1}
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="make"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Make</FieldLabel>
                <Input {...field} placeholder="Mercedes-Benz" />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="model"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Model</FieldLabel>
                <Input {...field} placeholder="S-Class" />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="trim"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Trim level</FieldLabel>
                <Input {...field} placeholder="Trim level" />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="exteriorColor"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Exterior color</FieldLabel>

                <Input {...field} placeholder="Obsidian Black" />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="interiorColor"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Interior color</FieldLabel>

                <Input {...field} placeholder="Obsidian Black" />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="sm:col-span-2">
                <FieldLabel>Vehicle category</FieldLabel>

                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LUXURY_SEDAN">Luxury Sedan</SelectItem>
                    <SelectItem value="LUXURY_SUV">Luxury SUV</SelectItem>
                    <SelectItem value="LIMOUSINE">Limousine</SelectItem>
                    <SelectItem value="EXECUTIVE_VAN">Executive Van</SelectItem>
                  </SelectContent>
                </Select>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="licensePlate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>License plate</FieldLabel>
                <Input {...field} placeholder="Enter license plate" />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="registrationNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>
                  Registration number
                  <span className="ml-1 text-muted-foreground">(optional)</span>
                </FieldLabel>

                <Input {...field} placeholder="Enter registration number" />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="vin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>
                  VIN
                  <span className="ml-1 text-muted-foreground">(optional)</span>
                </FieldLabel>

                <Input
                  {...field}
                  placeholder="Enter VIN"
                  maxLength={17}
                  className="uppercase"
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="engine"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Engine</FieldLabel>

                <Input {...field} placeholder="Engine" maxLength={17} />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="registrationExpiry"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>
                  Registration expiry
                  <span className="ml-1 text-muted-foreground">(optional)</span>
                </FieldLabel>

                <Input {...field} type="date" />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {REQUIRED_IMAGES.map((field) => (
            <Field className="sm:col-span-2" key={field.name}>
              <FieldLegend className="mb-0" variant="label">
                {field.label}
              </FieldLegend>
              <FieldLabel
                htmlFor={field.name}
                className="relative flex h-28 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed hover:bg-secondary"
              >
                <div className="flex flex-col items-center justify-center">
                  {files[field.name]?.url ? (
                    <img
                      src={files[field.name]?.url}
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
                  id={field.name}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  className="sr-only"
                  name={field.name}
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file instanceof File) {
                      setFiles((prev) => ({
                        ...prev,
                        [field.name]: {
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
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={form.formState.isSubmitting}
          onClick={() => form.reset()}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? "Uploading & creating..."
            : "Add vehicle"}
        </Button>
      </div>
    </form>
  )
}
