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

import {
  ArrowRight,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Lock,
  Mail,
} from "lucide-react"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@blak/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blak/ui/components/input-group"
import Link from "next/link"
import Image from "next/image"
import { authClient } from "@blak/auth/client"
import { toast } from "sonner"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"

import {
  createPasswordSchema,
  type CreatePasswordValues,
} from "../create-password.schema"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"

export const CreatePasswordForm = () => {
  const { open } = useAppDialog()
  const { searchParamsObj, getQueryString, router } = useRouterStuff()
  const { token } = searchParamsObj

  const [showPassword, setShowPassword] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = async (values: CreatePasswordValues) => {
    const { data, error } = await authClient.resetPassword({
      newPassword: values.confirmPassword,
      token,
    })

    if (error) {
      toast.error(error.message)
    } else {
      open({
        variant: "success",
        title: "Password updated",
        description: "Your password has been successfully created.",
        action: {
          label: "Sign in",
          onClick: () => router.replace("/auth/signin"),
        },
      })
    }
  }

  return (
    <form
      className="w-full max-w-lg"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Card className="py-12">
        <CardHeader className="flex justify-center">
          <Image src="/logo/logo.png" alt="BLAK" width={120} height={40} />
        </CardHeader>

        <CardHeader className="px-12 text-center">
          <CardDescription>
            Create a new password for your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-12">
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Lock />
                    </InputGroupAddon>

                    <InputGroupInput
                      {...field}
                      id={field.name}
                      placeholder="xxxx"
                      aria-invalid={fieldState.invalid}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <Lock />
                    </InputGroupAddon>

                    <InputGroupInput
                      {...field}
                      id={field.name}
                      placeholder="xxxx"
                      aria-invalid={fieldState.invalid}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
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
                "Create Password"
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
      </Card>
    </form>
  )
}
