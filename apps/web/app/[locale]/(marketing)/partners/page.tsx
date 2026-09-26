import React from "react"
import { getTranslations } from "next-intl/server"
import { PartnerHero } from "@/features/partner/components/partner-hero"
import { PartnerFormSection } from "@/features/partner/components/partner-form-section"
import { PartnerMarquee } from "@/features/partner/components/partner-marquee"
import { PartnerCTA } from "@/features/partner/components/partner-cta"
import { PartnerBenifits } from "@/features/partner/components/partner-benifits"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join the BLAK Partner Network",
  description:
    "Partner with BLAK to provide your guests and clients with reliable premium ground transportation backed by trusted operators and professional chauffeurs.",
}
const PartnersPage = async () => {
  const t = await getTranslations("partner.form")
  return (
    <React.Fragment>
      <PartnerHero />
      <PartnerMarquee />
      <PartnerBenifits />
      <PartnerCTA />
      <PartnerFormSection />
    </React.Fragment>
  )
}

export default PartnersPage
