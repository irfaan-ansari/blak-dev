import React from "react"
import { ForgotPasswordForm } from "@/features/auth/forgot-password/components/forgot-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset the password for your BLAK account.",
}

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />
}

export default ForgotPasswordPage
