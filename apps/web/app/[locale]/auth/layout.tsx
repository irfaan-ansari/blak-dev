import Image from "next/image"
import React from "react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center gap-8 py-16">
      {children}
    </section>
  )
}

export default AuthLayout
