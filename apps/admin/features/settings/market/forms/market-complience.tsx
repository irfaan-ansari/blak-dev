import React from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@blak/ui/components/card"

import { Plus, Trash2 } from "lucide-react"

import { Input } from "@blak/ui/components/input"
import { Button } from "@blak/ui/components/button"

import { Controller, useFieldArray, useFormContext } from "react-hook-form"

import { MarketFormValues } from "../market.schema"

import { Field, FieldGroup, FieldLabel } from "@blak/ui/components/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blak/ui/components/select"

import { COMPLIANCE_TYPE } from "../market.const"
import { Badge } from "@blak/ui/components/badge"

type ComplianceName = "OPERATOR" | "DRIVER" | "PARTNER"

interface ComplianceCardProps {
  name: ComplianceName
  label: string
}

export const MarketComplience = () => {
  return (
    <div className="space-y-4">
      <ComplianceCard name="OPERATOR" label="Operator" />
      <ComplianceCard name="DRIVER" label="Driver" />
      <ComplianceCard name="PARTNER" label="Partner" />
    </div>
  )
}

function ComplianceCard({ name, label }: ComplianceCardProps) {
  const form = useFormContext<MarketFormValues>()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "complianceRequirements",
  })

  const requirements = fields
    .map((field, index) => ({
      field,
      index,
    }))
    .filter(({ field }) => field.entityType === name)

  return (
    <Card size="sm">
      <CardHeader>
        <Badge variant="info-light" className="h-7 px-2.5">
          {label} Compliance
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {requirements.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No compliance added yet.
          </p>
        ) : (
          requirements.map(({ field: requirement, index }) => (
            <Card size="sm" className="relative" key={requirement.id}>
              <CardContent>
                <FieldGroup>
                  <Controller
                    control={form.control}
                    name={`complianceRequirements.${index}.name`}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>

                        <Input
                          id={field.name}
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name={`complianceRequirements.${index}.label`}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Label</FieldLabel>

                        <Input
                          id={field.name}
                          {...field}
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name={`complianceRequirements.${index}.type`}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Type</FieldLabel>

                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>

                          <SelectContent position="item-aligned">
                            {COMPLIANCE_TYPE.map((comp) => (
                              <SelectItem key={comp.value} value={comp.value}>
                                {comp.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </FieldGroup>

                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="size-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-dashed"
          prefix={<Plus />}
          onClick={() =>
            append({
              entityType: name,
              name: "",
              label: "",
              type: "DOCUMENT",
              isRequired: true,
            })
          }
        >
          Add Compliance
        </Button>
      </CardFooter>
    </Card>
  )
}
