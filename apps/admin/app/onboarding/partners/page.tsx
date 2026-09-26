import React from "react"

import { PartnerClient } from "@/features/onboarding/partner/components/partner-client"

const PartnerPage = () => {
  return (
    <React.Fragment>
      <h1 className="text-xl font-bold">Partner Applications</h1>

      <PartnerClient />
    </React.Fragment>
  )
}

export default PartnerPage
