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
import { DriverForm } from "../forms/driver-form"

export const DriverDialog = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = useCompliance("DRIVER")
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
        {isPending ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <DriverForm
            requirements={data?.data!}
            onSuccess={() => setOpen(false)}
          />
        )}
      </AppDrawerContent>
    </AppDrawer>
  )
}
