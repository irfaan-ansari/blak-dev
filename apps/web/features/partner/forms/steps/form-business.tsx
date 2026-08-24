import React from "react"
import { useFormContext } from "react-hook-form"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@blak/ui/components/field"

import { Controller } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blak/ui/components/select"
import { Input } from "@blak/ui/components/input"

import { BUSINESS_TYPES } from "../form.const"

import { useTranslations } from "next-intl"
import { PartnerSchema } from "../../partner.schema"
import { PhoneInput } from "@blak/ui/components/phone-input"

export const FormBusiness = () => {
  const t = useTranslations("partner.form")
  const form = useFormContext<PartnerSchema>()

  return (
    <FieldGroup>
      <Controller
        name="legalBusinessName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {t("businessName.label")}
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              placeholder={t("businessName.placeholder")}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="operatingName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {t("businessName.label")}
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              placeholder={t("businessName.placeholder")}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="businessType"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{t("businessType.label")}</FieldLabel>

            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger aria-invalid={fieldState.invalid}>
                <SelectValue placeholder={t("businessType.placeholder")} />
              </SelectTrigger>

              <SelectContent>
                {BUSINESS_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FieldDescription>{t("businessType.description")}</FieldDescription>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Controller
          name="businessPhone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                {t("phoneNumber.label")}
              </FieldLabel>
              <PhoneInput
                {...field}
                id={field.name}
                value={field.value}
                onChange={field.onChange}
                placeholder={t(`phoneNumber.placeholder`)}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="businessEmail"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                {t("businessEmail.label")}
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder={t("businessEmail.placeholder")}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Controller
        name="website"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{t("website.label")}</FieldLabel>

            <Input
              {...field}
              id={field.name}
              type="url"
              placeholder={t("website.placeholder")}
              aria-invalid={fieldState.invalid}
            />

            <FieldDescription>{t("website.description")}</FieldDescription>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
