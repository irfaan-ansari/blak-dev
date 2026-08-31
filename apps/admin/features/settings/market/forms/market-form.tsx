"use client"

import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { MarketGeneral } from "./market-general"
import { MarketComplience } from "./market-complience"
import { MarketPreview } from "./market-preview"
import { marketSchema, type MarketFormValues } from "../market.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { COMPLIANCE_ENTITY } from "../market.const"

const MarketForm = () => {
  const form = useForm<MarketFormValues>({
    resolver: zodResolver(marketSchema),
    defaultValues: {
      name: "",
      iso2: "",
      country: {
        id: "",
        name: "",
      },
      currency: { id: "", code: "", symbol: "" },
      compliance: COMPLIANCE_ENTITY.map((entity) => ({
        entityType: entity.value,
        requirments: [],
      })),
    },
  })

  const handleSubmit = (values: MarketFormValues) => {
    console.log(values)
  }
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
