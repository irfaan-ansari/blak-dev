import React from "react"

import { ChevronDown } from "lucide-react"
import { Input } from "@blak/ui/components/input"
import { Button } from "@blak/ui/components/button"
import { Controller, useFormContext } from "react-hook-form"
import { Field, FieldGroup, FieldLabel } from "@blak/ui/components/field"

import { CountrySelector } from "../components/country-selector"
import { CurrencySelector } from "../components/currency-selector"
import { MarketFormValues } from "../market.schema"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blak/ui/components/select"

export const MarketGeneral = () => {
  const form = useFormContext<MarketFormValues>()

  return (
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
                form.setValue("iso2", value.iso2)
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
      <Controller
        control={form.control}
        name="status"
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )}
      />
    </FieldGroup>
  )
}
