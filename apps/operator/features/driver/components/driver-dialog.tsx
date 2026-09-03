"use client"

import {
  AppDrawer,
  AppDrawerContent,
  AppDrawerHeader,
  AppDrawerTitle,
  AppDrawerTrigger,
} from "@blak/ui/components/blak/app-drawer"
import React from "react"

import { useCompliance } from "@/features/compliance/compliance.data"

export const DriverDialog = ({ children }: { children: React.ReactNode }) => {
  const { data } = useCompliance("DRIVER")

  const [open, setOpen] = React.useState(false)

  return (
    <AppDrawer open={open} onOpenChange={setOpen}>
      <AppDrawerTrigger asChild>{children}</AppDrawerTrigger>
      <AppDrawerContent className="sm:max-w-2xl">
        <AppDrawerHeader>
          <AppDrawerTitle className="text-base font-bold">
            Add Driver
          </AppDrawerTitle>
        </AppDrawerHeader>
      </AppDrawerContent>
    </AppDrawer>
  )
}
