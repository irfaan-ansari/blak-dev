"use client"
import React from "react"
import { useVehicles } from "../vehicle.data"
import { QueryBoundary } from "@/components/query-boundry"
import { VehicleCard } from "./vehicle-card"

export const VehicleClient = () => {
  const query = useVehicles()
  return (
    <QueryBoundary query={query}>
      {(data) => (
        <div className="space-y-2">
          {data.data?.map((vehicle) => (
            <VehicleCard key={vehicle.id} data={vehicle} />
          ))}
        </div>
      )}
    </QueryBoundary>
  )
}
