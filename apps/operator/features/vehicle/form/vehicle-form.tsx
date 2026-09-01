"use client"

import * as React from "react"

import { Controller, useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { ImageIcon, Upload, X } from "lucide-react"

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
} from "@blak/ui/components/field"

import { vehicleSchema, type VehicleFormValues } from "../vehicle.schema"

import { createVehicle } from "../vehicle.action"
import { uploadFile } from "@/lib/api-client/upload-file"

export function VehicleForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [previews, setPreviews] = React.useState<string[]>([])

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      color: "",
      plateNumber: "",
      registrationNumber: "",
      status: "ACTIVE",
      vin: "",
      registrationExpiry: "",
      category: "LUXURY_SEDAN",
      images: [] as VehicleFormValues["images"],
    },
  })

  const images = form.watch("images")

  /*
   * Image previews
   */
  React.useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file))

    setPreviews(urls)

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [images])

  /*
   * Add images
   */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])

    if (!files.length) return

    const currentImages = form.getValues("images")

    const remaining = 10 - currentImages.length

    const newImages = [...currentImages, ...files.slice(0, remaining)]

    form.setValue("images", newImages, {
      shouldDirty: true,
      shouldValidate: true,
    })

    event.target.value = ""
  }

  /*
   * Remove image
   */
  const removeImage = (index: number) => {
    const currentImages = form.getValues("images")

    form.setValue(
      "images",
      currentImages.filter((_, i) => i !== index),
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    )
  }

  /*
   * Submit
   */
  const onSubmit = async (values: VehicleFormValues) => {
    try {
      setIsSubmitting(true)

      const uploadedImages = await Promise.all(values.images.map(uploadFile))

      const result = await createVehicle({
        data: {
          make: values.make,
          model: values.model,
          year: Number(values.year),
          color: values.color,
          plateNumber: values.plateNumber,
          registrationNumber: values.registrationNumber || undefined,
          vin: values.vin || undefined,
          registrationExpiry: values.registrationExpiry || undefined,
          category: values.category,
          images: uploadedImages,
        },
      })

      if (result?.serverError) {
        throw new Error(result.serverError.message)
      }

      form.reset()
      setPreviews([])

      onSuccess()
    } catch (error) {
      console.error("Failed to create vehicle", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    // @ts-ignore
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Vehicle Information */}

      <div className="no-scrollbar max-h-120 space-y-5 overflow-auto">
        <div className="space-y-5">
          <div>
            <h2 className="text-base font-semibold">Vehicle information</h2>
            <p className="text-sm text-muted-foreground">
              Enter the basic details of the vehicle.
            </p>
          </div>

          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="make"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Make</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Mercedes-Benz"
                    disabled={isSubmitting}
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
                    placeholder="S-Class"
                    disabled={isSubmitting}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="year"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Model year</FieldLabel>

                  <Input
                    {...field}
                    type="number"
                    placeholder="2025"
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    disabled={isSubmitting}
                  />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="color"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Exterior color</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Obsidian Black"
                    disabled={isSubmitting}
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
                <Field>
                  <FieldLabel>Vehicle category</FieldLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
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
          </FieldGroup>
        </div>

        {/* Identification */}

        <section className="space-y-5">
          <div>
            <h2 className="text-base font-semibold">Vehicle identification</h2>

            <p className="text-sm text-muted-foreground">
              Registration and identification information.
            </p>
          </div>

          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="plateNumber"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Registration plate</FieldLabel>

                  <Input
                    {...field}
                    placeholder="Enter registration plate"
                    disabled={isSubmitting}
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
                    {...field}
                    placeholder="Enter registration number"
                    disabled={isSubmitting}
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
                    placeholder="Enter VIN"
                    maxLength={17}
                    className="uppercase"
                    disabled={isSubmitting}
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
                <Field>
                  <FieldLabel>
                    Registration expiry
                    <span className="ml-1 text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>

                  <Input {...field} type="date" disabled={isSubmitting} />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </section>

        {/* Photos */}

        <section className="space-y-5">
          <div>
            <h2 className="text-base font-semibold">Vehicle photos</h2>

            <p className="text-sm text-muted-foreground">
              Add clear photos of the vehicle.
            </p>
          </div>

          <Field>
            <FieldLabel>Photos</FieldLabel>

            <div className="space-y-4">
              {images.length < 10 && (
                <label
                  htmlFor="vehicle-images"
                  className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed hover:bg-muted/50"
                >
                  <Upload className="mb-2 size-5 text-muted-foreground" />

                  <span className="text-sm font-medium">
                    Upload vehicle photos
                  </span>

                  <span className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG or WEBP · Up to 10 photos
                  </span>

                  <input
                    id="vehicle-images"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isSubmitting}
                  />
                </label>
              )}

              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {images.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                    >
                      {previews[index] ? (
                        <img
                          src={previews[index]}
                          alt={file.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <ImageIcon className="size-6 text-muted-foreground" />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        disabled={isSubmitting}
                        className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-background/90 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                      >
                        <X className="size-4" />
                      </button>

                      <div className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-2 py-1 text-xs text-white">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {images.length >= 10 && (
                <p className="text-xs text-muted-foreground">
                  Maximum of 10 photos reached.
                </p>
              )}
            </div>

            {form.formState.errors.images && (
              <FieldError errors={[form.formState.errors.images]} />
            )}
          </Field>
        </section>
      </div>
      {/* Actions */}

      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          onClick={() => form.reset()}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading & creating..." : "Add vehicle"}
        </Button>
      </div>
    </form>
  )
}
