"use client"

import React from "react"
import { CardContent, CardFooter } from "@blak/ui/components/card"
import { Button } from "@blak/ui/components/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { signinSchema, type SigninValue } from "../signin.schema"
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
import { Alert, AlertTitle } from "@blak/ui/components/alert"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { REDIRECT_MAP } from "@blak/utils"
import { AuthCardWrapper } from "@/features/shared/components/auth-card-wrapper"

export const SigninForm = () => {
  const { searchParamsObj, getQueryString } = useRouterStuff()
  const { callbackURL } = searchParamsObj

  const [showPassword, setShowPassword] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const formError = form.formState.errors.root?.message

  const handleSubmit = async (values: SigninValue) => {
    const { error, data } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: callbackURL,
    })

    if (error) {
      form.setError("root", {
        message: error.message ?? "Login failed. Please try again",
      })
      toast.error(error.message ?? "Login failed. Please try again")
    } else {
      let URL = data.url

      if (!URL) {
        URL =
          REDIRECT_MAP[data.user.role as keyof typeof REDIRECT_MAP] ??
          REDIRECT_MAP.user
      }
      console.log(URL)
      window.location.href = URL!
    }
  }

  return (
    <form
      className="w-full max-w-lg"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <AuthCardWrapper title="Continue to your BLAK account">
        {formError && (
          <CardContent className="px-12">
            <Alert variant="destructive">
              <Info />
              <AlertTitle>{formError}</AlertTitle>
            </Alert>
          </CardContent>
        )}

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
                  <Link
                    href="/auth/forgot-password"
                    className="text-muted-foreground hover:text-foreground hover:underline"
                  >
                    Forgot Password?
                  </Link>
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
                "Sign in"
              )}
            </Button>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col gap-3 px-12">
          <div className="mb-3 w-full text-center">
            <div className="relative after:absolute after:inset-0 after:top-1/2 after:h-px after:translate-y-1/2 after:bg-border">
              <span className="relative z-1 bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="w-full justify-between"
            suffix={<ArrowRight />}
          >
            Signin with OTP
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
