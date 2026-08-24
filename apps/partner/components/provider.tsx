import React from "react"
import { TooltipProvider } from "@blak/ui/components/tooltip"
import { AppDialogProvider } from "@blak/ui/components/blak/app-dialog"
import { ThemeProvider } from "./theme-provider"

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <AppDialogProvider>{children}</AppDialogProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default AppProvider
