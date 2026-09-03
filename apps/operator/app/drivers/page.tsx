import React from "react"
import { Button } from "@blak/ui/components/button"
import { ChevronDown, ListFilter, Plus } from "lucide-react"

import { DriverDialog } from "@/features/driver/components/driver-dialog"
import { DriverClient } from "@/features/driver/components/driver-client"

const DriversPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-xl font-bold">Drivers</div>
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
        <DriverDialog>
          <Button size="sm">
            <Plus />
            Add New
          </Button>
        </DriverDialog>
      </div>
      <DriverClient />
    </div>
  )
}

export default DriversPage
