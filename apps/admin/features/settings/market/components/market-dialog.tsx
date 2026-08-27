"use client"

import React from "react"
import {
  AppDrawer,
  AppDrawerContent,
  AppDrawerHeader,
  AppDrawerTitle,
  AppDrawerTrigger,
} from "@blak/ui/components/blak/app-drawer"

export const MarketDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <AppDrawer open={open} onOpenChange={setOpen}>
      <AppDrawerTrigger asChild>{children}</AppDrawerTrigger>
      <AppDrawerContent className="sm:min-w-2xl">
        <AppDrawerHeader>
          <AppDrawerTitle className="text-xl font-bold">
            New Market
          </AppDrawerTitle>
        </AppDrawerHeader>
      </AppDrawerContent>
    </AppDrawer>
  )
}
