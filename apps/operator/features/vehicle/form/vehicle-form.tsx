"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@blak/ui/components/input"
import { Button } from "@blak/ui/components/button"

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
} from "@blak/ui/components/field"

import { toast } from "sonner"
import { createVehicle } from "../vehicle.action"
import { REQUIRED_IMAGES } from "../vehicle.const"
import { useQueryClient } from "@tanstack/react-query"
import { uploadFiles } from "@/lib/api-client/upload-file"
import { vehicleSchema, type VehicleFormValues } from "../vehicle.schema"
import { UploadField } from "@/features/shared/components/upload-field"
import { AppDrawerClose } from "@blak/ui/components/blak/app-drawer"

export function VehicleForm({ onSuccess }: { onSuccess: () => void }) {
  const queryClient = useQueryClient()

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      year: "",
      make: "",
      model: "",
      trim: "",
      engine: "",
      interiorColor: "",
      exteriorColor: "",
      licensePlate: "",
      registrationNumber: "",
      status: "ACTIVE",
      vin: "",
      registrationExpiry: "",
      category: "LUXURY_SEDAN",
      images: REQUIRED_IMAGES.map((img) => ({
        label: img.label,
        file: undefined,
      })),
    },
  })

  const images = useFieldArray({ control: form.control, name: "images" })

  /*
   * Submit
   */
  const onSubmit = async (values: VehicleFormValues) => {
    const { images, ...payload } = values
    const { serverError, data } = await createVehicle({
      data: {
        ...payload,
      },
    })

    if (serverError) {
      toast.error(serverError.message)
      return
    }

    const uploads = images.map(({ file, label }) => ({
      file: file as File,
      meta: {
        ref: "VEHICLE",
        refId: data?.id!,
        field: label,
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
    <FormProvider {...form}>
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
                    aria-invalid={fieldState.invalid}
                    max={new Date().getFullYear() + 1}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="make"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="sm:col-span-2">
                  <FieldLabel>Make</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Mercedes-Benz"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="model"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Model</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="S-Class"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="trim"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Trim level</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Trim level"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="exteriorColor"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Exterior color</FieldLabel>

                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Obsidian Black"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="interiorColor"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Interior color</FieldLabel>

                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Obsidian Black"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LUXURY_SEDAN">Luxury Sedan</SelectItem>
                      <SelectItem value="LUXURY_SUV">Luxury SUV</SelectItem>
                      <SelectItem value="LIMOUSINE">Limousine</SelectItem>
                      <SelectItem value="EXECUTIVE_VAN">
                        Executive Van
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="licensePlate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>License plate</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter license plate"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                    <span className="ml-1 text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>

                  <Input
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Enter registration number"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                    <span className="ml-1 text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>

                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter VIN"
                    maxLength={17}
                    className="uppercase"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="engine"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Engine</FieldLabel>

                  <Input
                    aria-invalid={fieldState.invalid}
                    {...field}
                    placeholder="Engine"
                    maxLength={17}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="registrationExpiry"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="sm:col-span-2">
                  <FieldLabel>
                    Registration expiry
                    <span className="ml-1 text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>

                  <Input
                    aria-invalid={fieldState.invalid}
                    {...field}
                    type="date"
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {images.fields.map((field, index) => (
              <UploadField
                key={field.id}
                label={field.label}
                name={`images.${index}.file`}
                className="sm:col-span-2"
              />
            ))}
          </FieldGroup>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <AppDrawerClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </Button>
          </AppDrawerClose>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Uploading & creating..."
              : "Add vehicle"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
