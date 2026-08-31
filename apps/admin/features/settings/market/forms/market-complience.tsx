import React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@blak/ui/components/card"
import { Button } from "@blak/ui/components/button"
import { Input } from "@blak/ui/components/input"
import { Plus, Trash2 } from "lucide-react"
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
import { COMPLIANCE_ENTITY, COMPLIANCE_TYPE } from "../market.const"
import { Badge } from "@blak/ui/components/badge"

export const MarketComplience = () => {
  const form = useFormContext<MarketFormValues>()

  const { fields: compliances } = useFieldArray({
    control: form.control,
    name: "compliance",
  })

  return (
    <div className="space-y-4">
      {compliances.map((compliance, index) => (
        <ComplianceCard key={compliance.id} index={index} />
      ))}
    </div>
  )
}
function ComplianceCard({ index }: { index: number }) {
  const form = useFormContext<MarketFormValues>()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `compliance.${index}.requirments`,
  })

  const entityType = form.watch(`compliance.${index}.entityType`)

  return (
    <Card size="sm">
      <CardHeader>
        <Badge variant="info-light" className="h-7 px-2.5">
          {COMPLIANCE_ENTITY.find((ent) => ent.value === entityType)?.label}{" "}
          Compliance
        </Badge>
      </CardHeader>

      <CardContent>
        {fields.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No requirements added yet.
          </p>
        ) : (
          <Card size="sm">
            <CardContent>
              {fields.map((requirement, requirementIndex) => (
                <FieldGroup className="relative">
                  <Controller
                    key={requirement.id}
                    control={form.control}
                    name={`compliance.${index}.requirments.${requirementIndex}.name`}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <Input id={field.name} {...field} />
                      </Field>
                    )}
                  />
                  <Controller
                    key={requirement.id}
                    control={form.control}
                    name={`compliance.${index}.requirments.${requirementIndex}.label`}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Label</FieldLabel>
                        <Input id={field.name} {...field} />
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name={`compliance.${index}.requirments.${requirementIndex}.type`}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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

                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => remove(requirementIndex)}
                    className="absolute -top-2 right-0"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </FieldGroup>
              ))}
            </CardContent>
          </Card>
        )}
      </CardContent>

      <CardFooter>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          prefix={<Plus />}
          onClick={() =>
            append({
              name: "",
              label: "",
              type: "",
            })
          }
        >
          Add Requirement
        </Button>
      </CardFooter>
    </Card>
  )
}
