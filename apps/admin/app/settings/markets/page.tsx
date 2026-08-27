import React from "react"
import { ChevronDown, ListFilter, Plus } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { MarketClient } from "@/features/settings/market/components/market-client"

const MarketsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">
          Manage BLAK's operating markets, coverage, and availability.
        </h1>
        <Button variant="outline" size="sm" suffix={<ChevronDown />}>
          Filter by Status
        </Button>
        <Button variant="outline" size="sm" prefix={<ListFilter />}>
          Sort By
        </Button>
      </div>
      <MarketClient />
    </div>
  )
}

export default MarketsPage
