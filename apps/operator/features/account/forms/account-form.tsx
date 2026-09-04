"use client"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { accountFormSchema, type AccountFormValues } from "../account.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@blak/ui/components/field"
import { Input } from "@blak/ui/components/input"
import { Button } from "@blak/ui/components/button"
import { authClient } from "@blak/auth/client"
import { toast } from "sonner"

export const AccountForm = ({ values }: { values: AccountFormValues }) => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: values ?? {
      name: "",
      legalName: "",
      website: "",
      email: "",
      phoneNumber: "",
      registrationNo: "",
      taxId: "",
      contactName: "",
      contactTitle: "",
      contactEmail: "",
      contactPhone: "",
      metadata: {
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      },
    },
  })

  const onSubmit = async (values: AccountFormValues) => {
    const { data, error } = await authClient.organization.update({
      data: { ...values },
    })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Account information updated successfully")
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid gap-4 lg:grid-cols-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="lg:col-span-2">
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="legalName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Legal Name</FieldLabel>
                  <Input {...field} />
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
                  <Input type="email" {...field} />
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
                  <Input type="tel" {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="website"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Website</FieldLabel>
                  <Input
                    placeholder="https://example.com"
                    {...field}
                    value={field.value ?? ""}
                  />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="registrationNo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Registration Number</FieldLabel>
                  <Input {...field} value={field.value ?? ""} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="taxId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Tax ID</FieldLabel>
                  <Input {...field} value={field.value ?? ""} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="contactName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Contact Name</FieldLabel>
                  <Input {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="contactTitle"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Contact Title</FieldLabel>
                  <Input {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="contactEmail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Contact Email</FieldLabel>
                  <Input type="email" {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="contactPhone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Contact Phone</FieldLabel>
                  <Input type="tel" {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="metadata.address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="lg:col-span-2">
                  <FieldLabel>Address</FieldLabel>
                  <Input {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="metadata.city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="metadata.state"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>State / Province</FieldLabel>
                  <Input {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="metadata.pincode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Postal Code</FieldLabel>
                  <Input {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="metadata.country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Country</FieldLabel>
                  <Input {...field} />
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
