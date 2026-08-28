import React from "react"
import Link from "next/link"
import { ChevronDown, ListFilter, Plus } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { MarketClient } from "@/features/settings/market/components/market-client"

const MarketsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Markets</h1>
        <Button variant="outline" size="lg" suffix={<ChevronDown />}>
          Filter by Status
        </Button>
        <Button variant="outline" size="lg" prefix={<ListFilter />}>
          Sort By
        </Button>

        <Button size="lg" prefix={<Plus />} asChild>
          <Link href="/settings/markets/new">Add New</Link>
        </Button>
      </div>
      <MarketClient />
    </div>
  )
}

export default MarketsPage
