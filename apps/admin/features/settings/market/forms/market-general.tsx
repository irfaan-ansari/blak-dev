import React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Input } from "@blak/ui/components/input"
import { Controller, useFormContext } from "react-hook-form"
import { Field, FieldGroup, FieldLabel } from "@blak/ui/components/field"
import { Button } from "@blak/ui/components/button"

import { ChevronDown, Globe } from "lucide-react"
import { CountrySelector } from "../components/country-selector"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"

export const MarketGeneral = () => {
  const form = useFormContext<{ name: string }>()

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
            name="name"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="name">Region</FieldLabel>
                <CountrySelector>
                  <Button
                    className="h-auto w-full items-start justify-start gap-2 py-2"
                    variant="outline"
                  >
                    <Avatar>
                      <AvatarFallback>
                        <Globe className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5 text-left">
                      <span>Country</span>
                      <span>Code</span>
                    </div>
                    <ChevronDown className="ml-auto self-center" />
                  </Button>
                </CountrySelector>
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
