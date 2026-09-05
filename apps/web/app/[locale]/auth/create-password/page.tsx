import React from "react"
import { CreatePasswordForm } from "@/features/auth/create-password/components/create-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Password",
  description: "Create a secure password for your BLAK account.",
  robots: {
    index: false,
    follow: false,
  },
}

const CreatePasswordPage = () => {
  return <CreatePasswordForm />
}

export default CreatePasswordPage
