"use client"

import React from "react"
import {
  AppDrawer,
  AppDrawerContent,
  AppDrawerHeader,
  AppDrawerTitle,
  AppDrawerTrigger,
} from "@blak/ui/components/blak/app-drawer"
import { CountrySelector } from "./country-selector"
import { Button } from "@blak/ui/components/button"

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
        <CountrySelector>
          <Button>Country</Button>
        </CountrySelector>
      </AppDrawerContent>
    </AppDrawer>
  )
}
