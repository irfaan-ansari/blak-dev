import React from "react"
import { EllipsisVertical } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { OperatorApplication } from "../operator.type"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"
import { AVAILABLE_ACTIONS } from "../operator.const"
import { processOperatorApplication } from "../operator.action"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const OperatorAction = ({ data }: { data: OperatorApplication }) => {
  const { open } = useAppDialog()
  const [isOpen, setIsOpen] = React.useState(false)
  const queryClient = useQueryClient()

  const actions = AVAILABLE_ACTIONS[data.currentStatus] ?? []

  const handleAction = (action: string) => {
    switch (action) {
      case "approve":
        open({
          variant: "success",
          title: "Approve application",
          description:
            "Approving this application will send an invitation email to the operator.",
          action: {
            label: "Yes, approve",
            onClick: async () => {
              const { serverError } = await processOperatorApplication({
                id: data.id,
                action,
              })
              if (serverError) {
                toast.error(serverError.message)
              } else {
                toast.success("Approved and invitation sent.")
                queryClient.invalidateQueries({
                  queryKey: ["operator-applications"],
                })
              }
            },
          },
          cancel: {
            label: "Cancel",
          },
        })
        return
      case "reject":
        open({
          variant: "warning",
          title: "Reject application",
          description:
            "Rejecting this application will send a notification email to the operator.",
          action: {
            label: "Yes, reject",
            onClick: async () => {
              const { serverError } = await processOperatorApplication({
                id: data.id,
                action,
              })
              if (serverError) {
                toast.error(serverError.message)
              } else {
                toast.success("Approved and invitation sent.")
                queryClient.invalidateQueries({
                  queryKey: ["operator-applications"],
                })
              }
            },
          },
          cancel: {
            label: "Cancel",
          },
        })
        return
      case "request_information":
        open({
          variant: "info",
          title: "Request information",
          description:
            "Rejecting this application will send a notification email to the operator.",
          action: {
            label: "Yes, reject",
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
        <Button variant="outline" size="icon">
          <EllipsisVertical />
        </Button>
      }
    >
      {actions.map((ac) => (
        <Button
          onClick={() => handleAction(ac.action)}
          variant={ac.variant}
          className="justify-start shadow-none"
          size="sm"
          key={ac.action}
        >
          {ac.icon && <ac.icon />}
          {ac.label}
        </Button>
      ))}
    </DropDrawer>
  )
}
