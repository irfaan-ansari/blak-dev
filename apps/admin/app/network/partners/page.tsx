import { PartnerClient } from "@/features/network/partner/components/partner-client"
import { StatusFilter } from "@/features/shared/components/status-filter"
import React from "react"

const partnerStatusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Invited", value: "INVITED" },
  { label: "Account Created", value: "ACCOUNT_CREATED" },
  { label: "Documents Submitted", value: "PENDING_APPROVAL" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Suspended", value: "SUSPENDED" },
]

const PartnersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Partners</h1>
        <StatusFilter options={partnerStatusOptions} />
      </div>
      <PartnerClient />
    </div>
  )
}

export default PartnersPage
