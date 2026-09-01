import React from "react"
import { Button } from "@blak/ui/components/button"
import { ChevronDown, ListFilter, Plus } from "lucide-react"
import VehicleClient from "@/features/vehicle/components/vehicle-client"
import { VehicleDialog } from "@/features/vehicle/components/vehicle-dialog"

const VehiclesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-xl font-bold">Vehicles</div>
        <Button
          size="sm"
          variant="outline"
          className="bg-card! hover:bg-card/80"
        >
          Filter by Status
          <ChevronDown />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-card hover:bg-card/80"
        >
          Sort by
          <ListFilter />
        </Button>
        <VehicleDialog>
          <Button size="sm">
            <Plus />
            Add New
          </Button>
        </VehicleDialog>
      </div>
      <VehicleClient />
    </div>
  )
}

export default VehiclesPage
