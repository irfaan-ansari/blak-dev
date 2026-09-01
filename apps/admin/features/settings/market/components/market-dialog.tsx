"use client"

import {
  AppDrawer,
  AppDrawerContent,
  AppDrawerHeader,
  AppDrawerTitle,
  AppDrawerTrigger,
} from "@blak/ui/components/blak/app-drawer"
import React from "react"
import MarketForm from "../forms/market-form"
import { MarketFormValues } from "../market.schema"

export const MarketDialog = ({
  id,
  values,
  children,
}: {
  id?: string
  values?: MarketFormValues
  children: React.ReactNode
}) => {
  const [open, setOpen] = React.useState(false)
  return (
    <AppDrawer open={open} onOpenChange={setOpen}>
      <AppDrawerTrigger asChild>{children}</AppDrawerTrigger>
      <AppDrawerContent className="sm:max-w-2xl">
        <AppDrawerHeader>
          <AppDrawerTitle className="text-xl font-bold">
            {id ? "Edit Market" : "Add Market"}
          </AppDrawerTitle>
        </AppDrawerHeader>
        <MarketForm id={id} values={values} onSuccess={() => setOpen(false)} />
      </AppDrawerContent>
    </AppDrawer>
  )
}
