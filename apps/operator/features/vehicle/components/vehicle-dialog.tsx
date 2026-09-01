"use client"
import {
  AppDrawer,
  AppDrawerContent,
  AppDrawerHeader,
  AppDrawerTitle,
  AppDrawerTrigger,
} from "@blak/ui/components/blak/app-drawer"
import React from "react"
import { VehicleForm } from "../form/vehicle-form"

export const VehicleDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <AppDrawer open={open} onOpenChange={setOpen}>
      <AppDrawerTrigger asChild>{children}</AppDrawerTrigger>

      <AppDrawerContent className="sm:max-w-2xl">
        <AppDrawerHeader>
          <AppDrawerTitle className="text-xl font-bold">
            Add Vehicle
          </AppDrawerTitle>
        </AppDrawerHeader>
        <VehicleForm onSuccess={() => setOpen(false)} />
      </AppDrawerContent>
    </AppDrawer>
  )
}
