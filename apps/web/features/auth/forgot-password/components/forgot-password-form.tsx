"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@blak/ui/components/card"
import { Button } from "@blak/ui/components/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import { ArrowRight, Loader2, Mail } from "lucide-react"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@blak/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@blak/ui/components/input-group"
import Link from "next/link"
import Image from "next/image"
import { authClient } from "@blak/auth/client"
import { toast } from "sonner"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"

import {
  forgotPasswordFormSchema,
  type ForgotPasswordFormValues,
} from "../forgot-password-form.schema"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"
import { AuthCardWrapper } from "@/features/shared/components/auth-card-wrapper"

export const ForgotPasswordForm = () => {
  const { open } = useAppDialog()
  const { getQueryString, router } = useRouterStuff()

  const form = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    const { data, error } = await authClient.requestPasswordReset({
      email: values.email,
    })

    if (error) {
      toast.error(error.message)
    } else {
      open({
        variant: "success",
        title: "Reset link sent",
        description: "Check your email for the reset link.",
        action: {
          label: "Done",
        },
      })
    }
  }

  return (
    <form
      className="w-full max-w-lg"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <AuthCardWrapper title="Enter your email address and we'll send you a link to reset your password.">
        <CardContent className="px-12">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      placeholder="yourname@email.com"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              className="w-full justify-between"
              suffix={<ArrowRight />}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col gap-3 px-12">
          <div className="mb-3 w-full text-center">
            <div className="relative after:absolute after:inset-0 after:top-1/2 after:h-px after:translate-y-1/2 after:bg-border">
              <span className="relative z-1 bg-card px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="w-full justify-between"
            suffix={<ArrowRight />}
            asChild
          >
            <Link href="/auth/signin">Back to Sign in</Link>
          </Button>
          <Button
            className="w-full shadow-none hover:no-underline"
            type="button"
            variant="link"
          >
            <span className="text-muted-foreground">Dont have an account?</span>
            <Link
              href={`/auth/register${getQueryString()}`}
              className="hover:underline"
            >
              Register
            </Link>
          </Button>
        </CardFooter>
      </AuthCardWrapper>
    </form>
  )
}
