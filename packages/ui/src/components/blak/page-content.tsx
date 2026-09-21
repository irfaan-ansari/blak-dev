import React from "react"

import type { ReactNode } from "react"
import { cn } from "@blak/ui/lib/utils"
import { PageSkeleton } from "@blak/ui/components/blak/empty-state.js"

export const PageContent = ({
  className,
  children,
  loading = false,
}: {
  className?: string
  children?: React.ReactNode
  loading?: boolean
}) => {
  return (
    <div className={cn("w-full flex-1 space-y-6 px-3 py-6 lg:px-6", className)}>
      {loading ? <PageSkeleton /> : children}
    </div>
  )
}

export const GridWrapper = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "grid h-full grid-cols-1 place-content-start gap-4 @2xl/page-content:grid-cols-2 @5xl/page-content:grid-cols-3 @7xl/page-content:grid-cols-4",
        className
      )}
      {...props}
    />
  )
}
