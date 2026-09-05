import React from "react"
import { SigninForm } from "@/features/auth/signin/components/signin-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your BLAK account.",
}
const SigninPage = () => {
  return <SigninForm />
}

export default SigninPage
