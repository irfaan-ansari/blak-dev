"use client"

import React from "react"
import VehicleCard from "./vehicle-card"
import { useVehicles } from "../vehicle.data"
import {
  EmptyState,
  ErrorState,
  PageSkeleton,
} from "@blak/ui/components/blak/empty-state"

const VehicleClient = () => {
  const { data, isPending, isError, error } = useVehicles()

  if (isPending) return <PageSkeleton />

  if (isError) {
    return <ErrorState title={error.message} description={error.details} />
  }

  if (data?.data?.length === 0) {
    return (
      <EmptyState
        title="No vehicles found"
        description="You don't have any vehicles yet."
      />
    )
  }

  return (
    <div className="space-y-2">
      {[...Array(10)].map((_, i) => (
        <VehicleCard key={i} />
      ))}
    </div>
  )
}

export default VehicleClient
