import { VehicleClient } from "@/features/operation/vehicle/components/vehicle-client"
import React from "react"

const VehiclesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-xl font-bold">Vehicles</div>
      </div>
      <VehicleClient />
    </div>
  )
}

export default VehiclesPage
