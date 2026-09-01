"use client"

import {
  AppDrawer,
  AppDrawerContent,
  AppDrawerHeader,
  AppDrawerTitle,
  AppDrawerTrigger,
} from "@blak/ui/components/blak/app-drawer"
import { Button } from "@blak/ui/components/button"
import { Field, FieldError, FieldLabel } from "@blak/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blak/ui/components/input-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { inviteDriver } from "../driver.action"
import { toast } from "sonner"

const schema = z.object({
  email: z.email("Enter valid email"),
})
type FormValues = z.infer<typeof schema>

export const DriverDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    const { serverError } = await inviteDriver({
      data: { email: values.email },
    })
    if (serverError) {
      toast.error(serverError.message)
    } else {
      toast.success("Invitation email sent.")
      form.reset()
      setOpen(false)
    }
  }

  return (
    <AppDrawer open={open} onOpenChange={setOpen}>
      <AppDrawerTrigger asChild>{children}</AppDrawerTrigger>
      <AppDrawerContent className="sm:max-w-xl">
        <AppDrawerHeader>
          <AppDrawerTitle className="text-xl font-bold">
            Invite Driver
          </AppDrawerTitle>
        </AppDrawerHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <Mail className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    placeholder="name@email.com"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Sending..." : "Invite"}
            </Button>
          </div>
        </form>
      </AppDrawerContent>
    </AppDrawer>
  )
}
