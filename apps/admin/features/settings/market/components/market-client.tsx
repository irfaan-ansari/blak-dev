import React from "react"
import { MarketCard } from "./market-card"

export const MarketClient = () => {
  return (
    <div className="space-y-2">
      {[...Array(10)].map((_, i) => (
        <MarketCard key={i} />
      ))}
    </div>
  )
}
