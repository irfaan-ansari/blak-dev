import React from "react"
import { toast } from "sonner"
import { Button } from "@blak/ui/components/button"
import { useQueryClient } from "@tanstack/react-query"
import { Tooltip } from "@blak/ui/components/blak/tooltip"
import { Operator, OperatorStatus } from "../operator.type"
import { CircleCheck, CircleX, Mail, Pencil } from "lucide-react"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"
import { sendReminder, updateOperatorStatus } from "../operator.action"

export const OperatorAction = ({ data }: { data: Operator }) => {
  const { open } = useAppDialog()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = React.useState(false)

  const handleAction = (action: OperatorStatus) => {
    switch (action) {
      case "ACTIVE":
        open({
          variant: "success",
          title: "Approve Documents",
          description:
            "Confirm that the submitted documents have been reviewed and approved. The operator account will be activated.",
          action: {
            label: "Approve Documents",
            onClick: async () => {
              const { serverError } = await updateOperatorStatus({
                id: data.id,
                data: { status: action },
              })
              if (serverError) {
                toast.error(serverError.message)
              } else {
                toast.success("Documents approved successfully")
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
          title: "Reject Documents",
          description:
            "Reject the submitted documents. The operator will need to address the issues and resubmit them for review.",
          action: {
            label: "Reject Documents",
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

  const handleReminder = () => {
    open({
      variant: "success",
      title: "Send Account Reminder",
      description:
        "Send a reminder email to the operator with instructions to complete their account setup.",
      action: {
        label: "Send Reminder",
        onClick: async () => {
          const { serverError } = await sendReminder({
            id: data.id,
          })

          if (serverError) {
            toast.error(serverError.message)
          } else {
            toast.success("Reminder sent successfully")
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
  }

  if (data.status === "INVITED") {
    return (
      <Button variant="invert" size="sm" onClick={handleReminder}>
        <Mail /> Send Reminder
      </Button>
    )
  }

  return (
    <DropDrawer
      open={isOpen}
      setOpen={setIsOpen}
      trigger={
        <Button
          variant="invert"

          disabled={data.status !== "PENDING_APPROVAL"}
          size="sm"
        >
          <Pencil className="size-3.5" /> Action
        </Button>
      }
    >
      {data.status === "PENDING_APPROVAL" && (
        <>
          <Button
            variant="ghost"
            className="justify-start shadow-none"
            size="lg"
            onClick={() => handleAction("ACTIVE")}
          >
            <CircleCheck />
            Approve Documents
          </Button>
          <Button
            variant="destructive"
            className="justify-start shadow-none"
            size="lg"
            onClick={() => handleAction("SUSPENDED")}
          >
            <CircleX />
            Reject Documents
          </Button>
        </>
      )}
    </DropDrawer>
  )
}
