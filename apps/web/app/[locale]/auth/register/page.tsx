import React from "react"
import { RegisterForm } from "@/features/auth/register/components/register-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your BLAK account to get started.",
}
const RegisterPage = () => {
  return <RegisterForm />
}

export default RegisterPage
