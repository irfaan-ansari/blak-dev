import React from "react"
import MarketForm from "@/features/settings/market/forms/market-form"

function NewMarketPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Create Markets</h1>
      </div>
      <MarketForm />
    </div>
  )
}

export default NewMarketPage
