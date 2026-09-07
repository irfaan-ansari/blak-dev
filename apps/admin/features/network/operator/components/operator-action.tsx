import React from "react"
import { toast } from "sonner"
import { Operator, OperatorStatus } from "../operator.type"
import { Pencil } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"
import { useQueryClient } from "@tanstack/react-query"
import { STATUS_MAP } from "../operator.const"
import { updateOperatorStatus } from "../operator.action"

const actions = ["ACTIVE", "SUSPENDED"]

export const OperatorAction = ({ data }: { data: Operator }) => {
  const { open } = useAppDialog()
  const [isOpen, setIsOpen] = React.useState(false)
  const queryClient = useQueryClient()

  const handleAction = (action: OperatorStatus) => {
    switch (action) {
      case "ACTIVE":
        open({
          variant: "success",
          title: "Approve Operator",
          description: "This will change the operator status to Approved.",
          action: {
            label: "Approve",
            onClick: async () => {
              const { serverError } = await updateOperatorStatus({
                id: data.id,
                data: { status: action },
              })
              if (serverError) {
                toast.error(serverError.message)
              } else {
                toast.success("Approved successfully")
                queryClient.invalidateQueries({
                  queryKey: ["operators"],
                })
              }
            },
          },
          cancel: {
            label: "Cancel",
          },
        })
        return
      case "SUSPENDED":
        open({
          variant: "warning",
          title: "Reject Operator",
          description: "This will change the operator status to Rejected.",
          action: {
            label: "Reject",
            onClick: async () => {
              const { serverError } = await updateOperatorStatus({
                id: data.id,
                data: { status: action },
              })
              if (serverError) {
                toast.error(serverError.message)
              } else {
                toast.success("Rejected successfully")
                queryClient.invalidateQueries({
                  queryKey: ["operators"],
                })
              }
            },
          },
          cancel: {
            label: "Cancel",
          },
        })
        return
    }
  }

  return (
    <DropDrawer
      open={isOpen}
      setOpen={setIsOpen}
      trigger={
        <Button variant="invert" size="icon-sm">
          <Pencil />
        </Button>
      }
    >
      {actions.map((action) => {
        const statusConfig = STATUS_MAP[action as OperatorStatus]
        return (
          <Button
            onClick={() => handleAction(action as OperatorStatus)}
            variant="ghost"
            className="justify-start shadow-none"
            size="lg"
            key={action}
          >
            {statusConfig.icon && <statusConfig.icon />}
            {statusConfig.label}
          </Button>
        )
      })}
    </DropDrawer>
  )
}
