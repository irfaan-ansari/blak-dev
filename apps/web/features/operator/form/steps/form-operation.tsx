import { useTranslations } from "next-intl"
import { Controller, useFormContext } from "react-hook-form"
import { OperatorFormValues } from "../../operator.schema"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@blak/ui/components/field"
import { Input } from "@blak/ui/components/input"
import { OPERATING_MARKETS } from "../form.const"
import { Checkbox } from "@blak/ui/components/checkbox"

export const FormOperation = () => {
  const t = useTranslations("operator.form")
  const form = useFormContext<OperatorFormValues>()

  return (
    <FieldGroup>
      <Controller
        name="commerciallyLicensedInsured"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>
                    {t("commerciallyLicensedInsured.label")}
                  </FieldTitle>
                </FieldContent>

                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-border"
                />
              </Field>
            </FieldLabel>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="operatesLuxurySedansSuvs"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{t("operatesLuxurySedansSuvs.label")}</FieldTitle>
                </FieldContent>

                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-border"
                />
              </Field>
            </FieldLabel>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="operatingMarkets"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{t("operatingMarkets.label")}</FieldLabel>

            <div className="grid grid-cols-2 gap-2">
              {OPERATING_MARKETS.map((option) => {
                const checked = field.value.includes(option.value)

                return (
                  <FieldLabel key={option.value} htmlFor={option.value}>
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>{option.label}</FieldTitle>
                      </FieldContent>
                      <Checkbox
                        className="border-border"
                        id={option.value}
                        checked={checked}
                        onCheckedChange={(value) => {
                          if (value) {
                            field.onChange([...field.value, option.value])
                          } else {
                            field.onChange(
                              field.value.filter(
                                (item) => item !== option.value
                              )
                            )
                          }
                        }}
                      />
                    </Field>
                  </FieldLabel>
                )
              })}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="yearsInOperation"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {t("yearsInOperation.label")}
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              placeholder={t("yearsInOperation.placeholder")}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
