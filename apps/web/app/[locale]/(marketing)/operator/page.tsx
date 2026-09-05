import React from "react"

import { getTranslations } from "next-intl/server"

import { OperatorHero } from "@/features/operator/components/operator-hero"
import { WhoCanApply } from "@/features/operator/components/who-can-apply"
import { OperatorCTA } from "@/features/operator/components/operator-cta"
import { OperatorFormSection } from "@/features/operator/components/operator-form-section"
import { OperatorProcess } from "@/features/operator/components/operator-process"
import { OperatorMarque } from "@/features/operator/components/operator-marque"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join the BLAK Operator Network",
  description:
    "Join the BLAK Operator Network and connect your chauffeur business to premium transportation opportunities while operating under a consistent service standard.",
}

const OperatorPage = async () => {
  const t = await getTranslations("operator.form")
  return (
    <React.Fragment>
      <OperatorHero />
      <OperatorMarque />
      <WhoCanApply />
      <OperatorProcess />
      <OperatorFormSection />
      <OperatorCTA />
    </React.Fragment>
  )
}

export default OperatorPage
