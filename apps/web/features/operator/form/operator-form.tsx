"use client"
import React from "react"
import { API_URL } from "@/lib/API"
import { useTranslations } from "next-intl"
import { Button } from "@blak/ui/components/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { ArrowRight, Loader2 } from "lucide-react"
import {
  ApiResponse,
  OperatorFormValues,
  operatorSchema,
} from "../operator.schema"
import { StepWrapper } from "@/features/shared/components/form-step-wrapper"
import { INITIAL_VALUES } from "./form.const"
import { STEPS } from "./form.steps"
import { useRouter } from "@/i18n/navigation"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"
import { createOperator, updateOperator } from "../operator.action"

const SUBMIT_STEP = STEPS.length - 1

export const OperatorForm = ({
  values,
}: {
  values: ApiResponse["data"] | null
}) => {
  const commonT = useTranslations("common")
  const t = useTranslations("operator.form")
  const router = useRouter()
  const { open } = useAppDialog()
  const [active, setActive] = React.useState(0)
  const [pending, setPending] = React.useState(false)

  // default values
  const defaultValues = values
    ? (() => {
        const { application } = values

        return {
          legalBusinessName: application.legalBusinessName,
          operatingName: application.operatingName ?? "",
          businessType: application.businessType,
          website: application.website ?? "",
          businessEmail: application.businessEmail,
          businessPhone: application.businessPhone,
          address: application.address,
          city: application.city,
          state: application.state,
          pincode: application.pincode,
          country: application.country,

          contactName: values.contactName,
          contactTitle: values.contactTitle,
          contactEmail: values.contactEmail,
          contactPhone: values.contactPhone,

          commerciallyLicensedInsured: application.commerciallyLicensedInsured,
          operatesLuxurySedansSuvs: application.operatesLuxurySedansSuvs,
          operatingMarkets: application.operatingMarkets,

          yearsInOperation: String(application.yearsInOperation),
          vehicleCount: String(application.vehicleCount),
          chauffeurCount: String(application.chauffeurCount),

          serviceTypes: application.serviceTypes,
        }
      })()
    : INITIAL_VALUES

  const form = useForm({
    defaultValues,
    resolver: zodResolver(operatorSchema),
    mode: "onTouched",
  })

  async function onSubmit(formValues: OperatorFormValues) {
    setPending(true)

    try {
      let result: Awaited<ReturnType<typeof updateOperator>> | null = null
      if (values) {
        result = await updateOperator(values.id, formValues)
      } else {
        ;[, result] = await Promise.all([
          fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
              formType: "operator-v2",
              ...formValues,
            }),
          }),
          createOperator(formValues),
        ])
      }

      if (!result?.success) {
        throw new Error("Failed")
      }

      open({
        variant: "success",
        title: "Application received.",
        description:
          "Thank you for your interest in joining the BLAK Operator Network. Our team will review your application and contact you shortly.",
        action: {
          label: "Done",
          onClick: () => router.push("/"),
        },
      })
      form.reset()
      setActive(0)
    } catch (error) {
      console.log("submit failed - operator-form:", error)
      open({
        variant: "warning",
        title: "Unable to submit your request.",
        description:
          "Something went wrong while submitting your request. Please try again.",
        action: {
          label: "Okay",
        },
      })
    } finally {
      setPending(false)
    }
  }

  const handleNext = async () => {
    const step = STEPS[active]

    if (!step) return

    const fields = Object.keys(
      step.schema.shape
    ) as (keyof OperatorFormValues)[]

    const valid = await form.trigger(fields)

    if (!valid) return

    setActive((current) => current + 1)
  }
  console.log(form.formState.errors)
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (e) => console.log("error", e))}
        className="relative grid gap-6 rounded-2xl bg-muted/30 p-8 shadow-[1px_-1px_0px_0px_#ffffff20] lg:p-12"
      >
        {STEPS.map((step, i) => {
          if (i !== active) return null

          return (
            <div key={step.key}>
              <StepWrapper
                title={t(`steps.${step.key}.title`)}
                description={t(`steps.${step.key}.description`)}
              >
                <step.component />
              </StepWrapper>
            </div>
          )
        })}

        {active === SUBMIT_STEP ? (
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {commonT("actions.loading")}
              </>
            ) : (
              <>
                {commonT("actions.submit")} <ArrowRight />
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              handleNext()
            }}
            className="w-full"
          >
            {commonT("actions.continue")} <ArrowRight />
          </Button>
        )}
        <div className="flex items-center justify-center gap-1">
          {[...Array(SUBMIT_STEP + 1)].map((_, i) => (
            <Button
              key={i}
              type="button"
              className="h-1 w-4 rounded-full bg-primary"
            />
          ))}
        </div>
      </form>
    </FormProvider>
  )
}
