import { Card, CardDescription, CardHeader } from "@blak/ui/components/card"
import { cn } from "@blak/ui/lib/utils"
import Image from "next/image"
import React from "react"

export const AuthCardWrapper = ({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) => {
  return (
    <Card className={cn("py-12", className)}>
      <CardHeader className="flex justify-center">
        <Image
          src="/logo/logo-2.png"
          alt="BLAK"
          loading="eager"
          width={180}
          height={90}
        />
      </CardHeader>

      <CardHeader className="px-12 text-center">
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  )
}
