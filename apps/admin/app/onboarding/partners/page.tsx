import React from "react"

import { Button } from "@blak/ui/components/button"
import { Plus } from "lucide-react"
import { PartnerClient } from "@/features/onboarding/partner/components/partner-client"

const PartnerPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Partner Applications</h1>
        <Button prefix={<Plus />}>Invite</Button>
      </div>
      <PartnerClient />
    </div>
  )
}

export default PartnerPage
