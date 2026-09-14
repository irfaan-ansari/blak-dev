"use client"

import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form"
import * as React from "react"
import { toast } from "sonner"
import { Input } from "@blak/ui/components/input"
import { Button } from "@blak/ui/components/button"
import {
  DEFAULT_VALUES,
  vehicleSchema,
  type VehicleFormValues,
} from "../vehicle.schema"
import { zodResolver } from "@hookform/resolvers/zod"

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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"

import { Loader2 } from "lucide-react"
import { createVehicle, updateVehicle } from "../vehicle.action"
import { useQueryClient } from "@tanstack/react-query"
import { uploadFiles } from "@/lib/api-client/upload-file"
import { UploadField } from "@/features/shared/components/upload-field"
import { useRouter } from "next/navigation"

export function VehicleForm({
  data,
  id,
}: {
  data?: VehicleFormValues
  id?: string
}) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: data ?? DEFAULT_VALUES,
  })

  const images = useFieldArray({ control: form.control, name: "images" })
  const documents = useFieldArray({ control: form.control, name: "documents" })

  /*
   * Submit
   */
  const onSubmit = async (values: VehicleFormValues) => {
    const { images, documents, ...payload } = values

    const result = id
      ? await updateVehicle({
          id,
          data: payload,
        })
      : await createVehicle({
          data: payload,
        })

    const { serverError, data } = result

    if (serverError) {
      toast.error(serverError.message)
      return
    }

    const uploads = [...images, ...documents]
      .filter(({ file }) => file instanceof File)
      .map(({ file, label }) => ({
        file,
        meta: {
          ref: "VEHICLE",
          refId: data!.id,
          field: label,
        },
      }))

    if (uploads.length > 0) {
      await uploadFiles(uploads)
    }

    toast.success(id ? "Vehicle updated." : "Vehicle added.")
    router.replace("/vehicles")
    form.reset()

    await queryClient.invalidateQueries({
      queryKey: ["vehicles"],
    })
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-6"
      >
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-base! font-semibold">
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid sm:grid-cols-2">
              <Controller
                name="year"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="sm:col-span-2">
                    <FieldLabel>Model year</FieldLabel>
                    <Input
                      {...field}
                      placeholder="2026"
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
                        <SelectItem value="LUXURY_SEDAN">
                          Luxury Sedan
                        </SelectItem>
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
            </FieldGroup>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-base! font-semibold">
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {documents.fields.map((field, index) => (
                <UploadField
                  key={field.id}
                  label={field.label}
                  name={`documents.${index}.file`}
                  className="sm:col-span-2"
                  accept=".pdf"
                />
              ))}
            </FieldGroup>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-base! font-semibold">Images</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {images.fields.map((field, index) => (
                <UploadField
                  key={field.id}
                  label={field.label}
                  name={`images.${index}.file`}
                  className="sm:col-span-2"
                  accept=".jpg,.jpeg,.png"
                />
              ))}
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            className="min-w-36"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : id ? (
              "Update vehicle"
            ) : (
              "Add vehicle"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
