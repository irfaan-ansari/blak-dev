import React from "react"
import Link from "next/link"
import { Button } from "@blak/ui/components/button"
import { CloudUpload, Plus } from "lucide-react"
import VehicleClient from "@/features/vehicle/components/vehicle-client"
import { VehicleImportDialog } from "@/features/vehicle/components/vehicle-import-dialog"

const VehiclesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-xl font-bold">Vehicles</div>

        <VehicleImportDialog>
          <Button size="sm">
            <CloudUpload />
            Import
          </Button>
        </VehicleImportDialog>

        <Button size="sm" asChild>
          <Link href="/vehicles/new">
            <Plus />
            Add New
          </Link>
        </Button>
      </div>
      <VehicleClient />
    </div>
  )
}

export default VehiclesPage
