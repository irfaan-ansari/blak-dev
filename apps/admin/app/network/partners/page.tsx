import { PartnerClient } from "@/features/network/partner/components/partner-client"
import { Button } from "@blak/ui/components/button"
import { ChevronDown, ListFilter } from "lucide-react"
import React from "react"

const PartnersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Partners</h1>
        <Button variant="outline" size="lg" suffix={<ChevronDown />}>
          Status
        </Button>
        <Button variant="outline" size="lg" prefix={<ListFilter />}>
          Sort By
        </Button>
      </div>
      <PartnerClient />
    </div>
  )
}

export default PartnersPage
