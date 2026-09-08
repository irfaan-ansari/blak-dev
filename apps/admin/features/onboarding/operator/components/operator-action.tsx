import React from "react"
import { Pencil } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { OperatorApplication } from "../operator.type"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"

import { processOperatorApplication } from "../operator.action"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { STATUS_MAP } from "../operator.const"
import { ApplicationStatus } from "@blak/db"

const ACTION_OPTIONS = [
  { value: "APPROVED", label: "Approve" },
  { value: "REJECTED", label: "Reject" },
] as const

export const OperatorAction = ({ data }: { data: OperatorApplication }) => {
  const { open } = useAppDialog()
  const [isOpen, setIsOpen] = React.useState(false)
  const queryClient = useQueryClient()

  const handleAction = (action: ApplicationStatus) => {
    switch (action) {
      case "APPROVED":
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
      case "REJECTED":
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
                toast.success("Application rejected.")
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

      case "PENDING_APPROVAL":
        // Handle rejected status
        break
    }
  }

  return (
    <DropDrawer
      open={isOpen}
      setOpen={setIsOpen}
      trigger={
        <Button
          variant="invert"
          size="icon-sm"
          disabled={data.currentStatus !== "PENDING_APPROVAL"}
        >
          <Pencil className="size-3.5" />
        </Button>
      }
      className="md:max-w-40"
    >
      {data.currentStatus === "PENDING_APPROVAL"
        ? ACTION_OPTIONS.map(({ value, label }) => {
            const map = STATUS_MAP[value as ApplicationStatus]
            return (
              <Button
                onClick={() => handleAction(value as ApplicationStatus)}
                variant="ghost"
                size="lg"
                className="justify-start"
              >
                {map.icon && <map.icon />}
                {label}
              </Button>
            )
          })
        : null}
    </DropDrawer>
  )
}
