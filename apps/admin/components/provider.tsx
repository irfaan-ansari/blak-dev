"use client"
import React from "react"
import { TooltipProvider } from "@blak/ui/components/tooltip"
import { AppDialogProvider } from "@blak/ui/components/blak/app-dialog"
import { ThemeProvider } from "./theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <TooltipProvider>
          <AppDialogProvider>{children}</AppDialogProvider>
        </TooltipProvider>
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  )
}

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
