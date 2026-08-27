"use client"
import React from "react"

import { Toaster } from "sonner"
import { TooltipProvider } from "@blak/ui/components/tooltip"
import { AppDialogProvider } from "@blak/ui/components/blak/app-dialog"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <TooltipProvider>
        <AppDialogProvider>{children}</AppDialogProvider>
      </TooltipProvider>
      <Toaster />
    </QueryProvider>
  )
}

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
