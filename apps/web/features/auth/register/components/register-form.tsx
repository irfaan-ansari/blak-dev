"use client"

import { Button } from "@blak/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@blak/ui/components/card"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { registerSchema, type RegisterValue } from "../register.schema"
import {
  ArrowRight,
  CircleUser,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Lock,
  LockKeyhole,
  Mail,
  Smartphone,
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
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { toast } from "sonner"

import { Alert, AlertTitle } from "@blak/ui/components/alert"
import { registerUser } from "../register.action"

export const RegisterForm = () => {
  const { searchParamsObj, getQueryString, router } = useRouterStuff()

  const { accountType, callbackURL } = searchParamsObj

  const [showPassword, setShowPassword] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      role: "user",
      password: "",
      confirmPassword: "",
    },
  })

  const formError = form.formState.errors.root?.message

  const handleSubmit = async (values: RegisterValue) => {
    const { data, serverError } = await registerUser({
      data: { ...values, role: accountType ?? "user" },
    })

    if (serverError) {
      form.setError("root", {
        message: serverError.message ?? "Login failed. Please try again",
      })
      toast.error(serverError.message ?? "Login failed. Please try again")
    } else {
      if(callbackURL){
    router.replace(callbackURL)}
    }
  }
  return (
    <form
      className="w-full max-w-xl"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Card className="py-12">
        <CardHeader className="flex justify-center">
          <Image src="/logo/logo.png" alt="BLAK" width={120} height={40} />
        </CardHeader>
        <CardHeader className="px-12 text-center">
          <CardDescription>
            Create your BLAK {accountType} account
          </CardDescription>
        </CardHeader>

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
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <CircleUser />
                    </InputGroupAddon>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      placeholder="John"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Smartphone />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        placeholder="1 1234 456 789"
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
            </div>
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
                      <LockKeyhole />
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
                "Register"
              )}
            </Button>
          </FieldGroup>
        </CardContent>
        <CardFooter className="px-12">
          <Button
            className="w-full shadow-none hover:no-underline"
            type="button"
            variant="link"
          >
            <span className="text-muted-foreground">
              Already have an account?
            </span>
            <Link
              href={`/auth/signin${getQueryString()}`}
              className="hover:underline"
            >
              Sign in
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
