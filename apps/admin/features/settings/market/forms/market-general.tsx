import React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { ChevronDown } from "lucide-react"
import { Input } from "@blak/ui/components/input"
import { Button } from "@blak/ui/components/button"
import { Controller, useFormContext } from "react-hook-form"
import { Field, FieldGroup, FieldLabel } from "@blak/ui/components/field"

import { CountrySelector } from "../components/country-selector"
import { CurrencySelector } from "../components/currency-selector"
import { MarketFormValues } from "../market.schema"

export const MarketGeneral = () => {
  const form = useFormContext<MarketFormValues>()

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" {...field} />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="country"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="country">Region</FieldLabel>
                <CountrySelector
                  selected={field.value.id}
                  onSelectedChange={(value) => {
                    field.onChange({ id: value.id, name: value.name })
                    form.setValue("currency", {
                      id: value.currency.id,
                      code: value.currency.code,
                      symbol: value.currency.symbol,
                    })
                  }}
                >
                  <Button
                    id="country"
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <span>{field.value?.name || "Select country"}</span>
                    <ChevronDown className="ml-auto self-center" />
                  </Button>
                </CountrySelector>
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="currency"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Currency</FieldLabel>
                <CurrencySelector
                  selected={field.value.id}
                  onSelectedChange={(value) => {
                    field.onChange({
                      id: value.id,
                      code: value.code,
                      symbol: value.symbol,
                    })
                  }}
                >
                  <Button
                    id={field.name}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <span>
                      {`${field.value?.code} - ${field.value?.symbol}` ||
                        "Select currency"}
                    </span>
                    <ChevronDown className="ml-auto self-center" />
                  </Button>
                </CurrencySelector>
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
