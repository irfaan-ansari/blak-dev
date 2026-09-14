"use client"

import React from "react"
import { Button } from "@blak/ui/components/button"
import { RIDE_STATUS } from "@/features/ride/ride.const"
import { Check, ChevronDown, ListFilter } from "lucide-react"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { EmptyState } from "@blak/ui/components/blak/empty-state"

const RidesPage = () => {
  const [open, setOpen] = React.useState(false)
  const { queryParams, searchParamsObj } = useRouterStuff()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-xl font-bold">Rides</div>
        <DropDrawer
          open={open}
          setOpen={setOpen}
          trigger={
            <Button size="sm" variant="outline">
              <ListFilter />
              {searchParamsObj?.status ?? (
                <span className="text-muted-foreground">Status</span>
              )}

              <ChevronDown className="text-muted-foreground" />
            </Button>
          }
        >
          {Object.entries(RIDE_STATUS).map(([key, value]) => (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => queryParams({ set: { status: key } })}
            >
              {value}

              {searchParamsObj.status === key && (
                <Check className="ml-auto text-muted-foreground" />
              )}
            </Button>
          ))}
        </DropDrawer>
      </div>
      <EmptyState
        title="No rides yet"
        description="Add your vehicles and drivers to get ready for BLAK trips. Your rides will appear here once assigned."
      />
    </div>
  )
}

export default RidesPage
