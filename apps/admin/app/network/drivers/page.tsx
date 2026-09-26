import React from "react"
import { DriverClient } from "@/features/network/driver/components/driver-client"

const DriversPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Drivers</h1>
      </div>
      <DriverClient />
    </div>
  )
}
export default DriversPage
