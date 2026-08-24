"use client"
import React from "react"
import { AppDialogProvider } from "@blak/ui/components/blak/app-dialog"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AppDialogProvider>{children}</AppDialogProvider>
    </QueryClientProvider>
  )
}
