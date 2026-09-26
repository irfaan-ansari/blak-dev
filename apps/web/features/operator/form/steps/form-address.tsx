import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@blak/ui/components/field"
import { Input } from "@blak/ui/components/input"
import { useTranslations } from "next-intl"
import { Controller, useFormContext } from "react-hook-form"
import { OperatorFormValues } from "../../operator.schema"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blak/ui/components/select"
import { COUNTRIES } from "@/features/shared/shared.const"
import { CountrySelector } from "@/features/shared/components/country-selector"
import { Button } from "@blak/ui/components/button"
import { ChevronDown } from "lucide-react"

export const FormAddress = () => {
  const t = useTranslations("operator.form")
  const form = useFormContext<OperatorFormValues>()

  return (
    <FieldGroup>
      <Controller
        name="address"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{t("address.label")}</FieldLabel>

            <Input
              {...field}
              id={field.name}
              placeholder={t("address.placeholder")}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="city"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{t("city.label")}</FieldLabel>

            <Input
              {...field}
              id={field.name}
              placeholder={t("city.placeholder")}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="state"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{t("state.label")}</FieldLabel>

            <Input
              {...field}
              id={field.name}
              placeholder={t("state.placeholder")}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="pincode"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{t("pincode.label")}</FieldLabel>

            <Input
              {...field}
              id={field.name}
              placeholder={t("pincode.placeholder")}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="country"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{t("country.label")}</FieldLabel>

            <CountrySelector
              selected={field.value}
              onSelectedChange={(value) => {
                field.onChange(value.name)
              }}
            >
              <Button
                id="country"
                className="w-full justify-start"
                variant="outline"
              >
                <span>{field.value || "Select country"}</span>
                <ChevronDown className="ml-auto self-center" />
              </Button>
            </CountrySelector>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
