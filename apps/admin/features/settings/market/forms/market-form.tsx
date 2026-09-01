"use client"

import React from "react"
import { toast } from "sonner"
import { MarketGeneral } from "./market-general"
import { Button } from "@blak/ui/components/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { MarketComplience } from "./market-complience"
import { FormProvider, useForm } from "react-hook-form"
import { marketSchema, type MarketFormValues } from "../market.schema"
import { createMarket, updateMarket } from "../market.action"
import { COMPLIANCE_ENTITIES, DEFAULT_VALUES } from "../market.const"

const MarketForm = ({
  id,
  values,
  onSuccess,
}: {
  id?: string
  values?: MarketFormValues
  onSuccess?: () => void
}) => {
  const form = useForm<MarketFormValues>({
    resolver: zodResolver(marketSchema),
    defaultValues: values || DEFAULT_VALUES,
  })

  const handleSubmit = async (values: MarketFormValues) => {
    const payload = {
      name: values.name,
      status: values.status,
      iso2: values.iso2,
      countryId: values.country.id,
      currencyId: values.currency.id,
      complianceRequirements: values.complianceRequirements,
    }

    if (id) {
      const { serverError, validationErrors } = await updateMarket({
        id,
        data: payload,
      })

      if (validationErrors) {
        toast.error("Validation failed")
      } else if (serverError) {
        console.log(serverError.message)
        toast.error(serverError.message)
      } else {
        toast.success("Market updated successfully")
        onSuccess?.()
      }
    } else {
      const { serverError, validationErrors } = await createMarket({
        data: payload,
      })

      if (validationErrors) {
        toast.error("Validation failed")
      } else if (serverError) {
        toast.error(serverError.message)
      } else {
        toast.success("Market created successfully")
        onSuccess?.()
      }
    }
  }

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <div className="-mx-4 no-scrollbar max-h-140 space-y-6 overflow-y-auto px-4">
          <MarketGeneral />
          <MarketComplience />
        </div>
        <div className="flex flex-col-reverse gap-2 *:min-w-28 sm:flex-row sm:justify-end">
          <Button variant="outline">Cancel</Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </FormProvider>
  )
}

export default MarketForm
