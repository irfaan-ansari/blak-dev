import React from "react"
import { toast } from "sonner"
import { Operator } from "../operator.type"
import { EllipsisVertical } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"
import { useQueryClient } from "@tanstack/react-query"
import { AVAILABLE_ACTIONS } from "../operator.const"
import { updateOperatorStatus } from "../operator.action"

export const OperatorAction = ({ data }: { data: Operator }) => {
  const { open } = useAppDialog()
  const [isOpen, setIsOpen] = React.useState(false)
  const queryClient = useQueryClient()

  const actions = AVAILABLE_ACTIONS[data.status] ?? []

  const handleAction = (action: string) => {
    switch (action) {
      case "activate":
        open({
          variant: "success",
          title: "Activate account",
          description:
            "This will activate the account and send an invitation email with instructions to access the platform.",
          action: {
            label: "Activate Account",
            onClick: async () => {
              const { serverError } = await updateOperatorStatus({
                id: data.id,
                action,
              })
              if (serverError) {
                toast.error(serverError.message)
              } else {
                toast.success("Approved and invitation sent.")
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
      case "reject":
        open({
          variant: "warning",
          title: "Decline submitted documents",
          description:
            "The submitted documents do not meet the review requirements. The operator will be notified and asked to provide updated documentation.",
          action: {
            label: "Yes, Decline",
            onClick: async () => {
              const { serverError } = await updateOperatorStatus({
                id: data.id,
                action,
              })
              if (serverError) {
                toast.error(serverError.message)
              } else {
                toast.success("Documents declined and notification email sent.")
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
