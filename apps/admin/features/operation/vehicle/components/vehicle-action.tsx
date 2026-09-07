"use client"
import React from "react"
import { Button } from "@blak/ui/components/button"
import { VehicleWithImages } from "../vehicle.type"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { VehicleStatus } from "@blak/db"
import { STATUS_MAP } from "../vehicle.const"
import { toast } from "sonner"
import { updateVehicleStatus } from "../vehicle.action"
import { useQueryClient } from "@tanstack/react-query"

const statuses: VehicleStatus[] = [
  "ACTIVE",
  "INACTIVE",
  "MAINTENANCE",
  "REJECTED",
  "PENDING_APPROVAL",
]

const VehicleAction = ({
  data,
  children,
}: {
  data: VehicleWithImages
  children: React.ReactNode
}) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = React.useState(false)

  const onStatusChange = async (status: VehicleStatus) => {
    const toastId = toast.loading("Updating status...")
    const { serverError } = await updateVehicleStatus({
      id: data.id,
      data: { status },
    })
    if (serverError) {
      toast.error(serverError.message, { id: toastId })
      return
    }

    toast.success("Status updated successfully", { id: toastId })
    queryClient.invalidateQueries({ queryKey: ["vehicles"] })
  }

  return (
    <DropDrawer open={open} setOpen={setOpen} trigger={children}>
      {statuses.map((status) => {
        const config = STATUS_MAP[status]
        const Icon = config.icon

        return (
          <Button
            key={status}
            variant="ghost"
            size="lg"
            className="justify-start gap-2"
            disabled={data.status === status}
            onClick={() => {
              onStatusChange(status)
              setOpen(false)
            }}
          >
            {Icon && <Icon className="size-4" />}
            {config.label}
          </Button>
        )
      })}
    </DropDrawer>
  )
}

export default VehicleAction
