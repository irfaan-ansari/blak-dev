import { VehicleClient } from "@/features/operation/vehicle/components/vehicle-client"
import { STATUS_MAP } from "@/features/operation/vehicle/vehicle.const"
import { StatusFilter } from "@/features/shared/components/status-filter"
import React from "react"

const vehicleStatusOptions = Object.entries(STATUS_MAP).map(
  ([value, config]) => ({
    value,
    label: config.label,
  })
)

const VehiclesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-xl font-bold">Vehicles</div>
        <StatusFilter options={vehicleStatusOptions} />
      </div>
      <VehicleClient />
    </div>
  )
}

export default VehiclesPage
