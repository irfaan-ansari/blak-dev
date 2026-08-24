import React from "react"
import VehicleCard from "./vehicle-card"

const VehicleClient = () => {
  return (
    <div className="space-y-2">
      {[...Array(10)].map((_, i) => (
        <VehicleCard />
      ))}
    </div>
  )
}

export default VehicleClient
