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

import { Input } from "@blak/ui/components/input"

import { useTranslations } from "next-intl"
import { PartnerSchema } from "../../partner.schema"
import { PhoneInput } from "@blak/ui/components/phone-input"

export const FormContact = () => {
  const t = useTranslations("partner.form")
  const form = useFormContext<PartnerSchema>()

  return (
    <FieldGroup>
      <Controller
        name="contactName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{t(`fullName.label`)}</FieldLabel>

            <Input
              {...field}
              id={field.name}
              placeholder={t(`fullName.placeholder`)}
              autoComplete="name"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="contactTitle"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>{t(`position.label`)}</FieldLabel>

            <Input
              {...field}
              id={field.name}
              placeholder={t(`position.placeholder`)}
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="contactEmail"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {t(`businessEmail.label`)}
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              type="email"
              placeholder={t(`businessEmail.placeholder`)}
              autoComplete="email"
              aria-invalid={fieldState.invalid}
            />

            <FieldDescription>
              {t(`businessEmail.description`)}
            </FieldDescription>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="contactPhone"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              {t(`phoneNumber.label`)}
            </FieldLabel>

            <PhoneInput
              {...field}
              id={field.name}
              value={field.value}
              onChange={field.onChange}
              placeholder={t(`phoneNumber.placeholder`)}
              aria-invalid={fieldState.invalid}
            />

            <FieldDescription>{t(`phoneNumber.description`)}</FieldDescription>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
