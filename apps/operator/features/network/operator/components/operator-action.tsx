import React from "react"
import { toast } from "sonner"
import { Operator } from "../operator.type"
import { EllipsisVertical } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"
import { useQueryClient } from "@tanstack/react-query"
import { AVAILABLE_ACTIONS } from "../operator.const"

export const OperatorAction = ({ data }: { data: Operator }) => {
  const { open } = useAppDialog()
  const [isOpen, setIsOpen] = React.useState(false)
  const queryClient = useQueryClient()

  const actions = AVAILABLE_ACTIONS[data.status] ?? []

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
              //   const { serverError } = await processOperatorApplication({
              //     id: data.id,
              //     action,
              //   })
              //   if (serverError) {
              //     toast.error(serverError.message)
              //   } else {
              //     toast.success("Approved and invitation sent.")
              //     queryClient.invalidateQueries({
              //       queryKey: ["operator-applications"],
              //     })
              //   }
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
              //   const { serverError } = await processOperatorApplication({
              //     id: data.id,
              //     action,
              //   })
              //   if (serverError) {
              //     toast.error(serverError.message)
              //   } else {
              //     toast.success("Approved and invitation sent.")
              //     queryClient.invalidateQueries({
              //       queryKey: ["operator-applications"],
              //     })
              //   }
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
        <Button variant="outline" size="icon" disabled={!actions.length}>
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
