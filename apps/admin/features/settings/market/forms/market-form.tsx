"use client"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { MarketGeneral } from "./market-general"
import { MarketComplience } from "./market-complience"
import { MarketPreview } from "./market-preview"

const MarketForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      iso2: "",
      countryId: "",
      stateIds: [] as string[],
      cityIds: [] as string[],
    },
  })

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="col-span-3 space-y-4 lg:col-span-2">
          <MarketGeneral />
          <MarketComplience />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <MarketPreview />
        </div>
      </div>
    </FormProvider>
  )
}

export default MarketForm
