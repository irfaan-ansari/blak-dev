"use client"

import React from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@blak/ui/components/button"
import { authClient } from "@blak/auth/client"

const BATCH_SIZE = 5

export const Trigger = ({ data }: any) => {
  const filtered = data.filter(
    (d: any) => d.user.email !== "admin@rideblak.com"
  )

  const [loading, setLoading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [failed, setFailed] = React.useState<string[]>([])

  const onClick = async () => {
    if (loading) return

    if (!filtered.length) {
      toast("No applications found")
      return
    }

    setLoading(true)
    setProgress(0)
    setFailed([])

    const failedIds: string[] = []

    try {
      for (let i = 0; i < filtered.length; i += BATCH_SIZE) {
        const batch = filtered.slice(i, i + BATCH_SIZE)

        const results = await Promise.allSettled(
          batch.map(async (item: any) => {
            console.log(item.user.email)

            const result = await authClient.requestPasswordReset({
              email: item.user.email,
            })

            if (result.error) {
              throw new Error(result.error.message)
            }

            return result
          })
        )

        results.forEach((result, index) => {
          const item = batch[index]

          if (result.status === "rejected" && item) {
            failedIds.push(item.id)
          }
        })

        setProgress(Math.min(i + batch.length, filtered.length))
      }

      setFailed(failedIds)

      if (failedIds.length) {
        toast.error(
          `${failedIds.length} email${failedIds.length > 1 ? "s" : ""} failed to send`
        )
      } else {
        toast.success("Emails sent successfully")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        prefix={<Plus />}
        onClick={onClick}
        disabled={loading || !filtered.length}
      >
        {loading
          ? `Sending ${progress}/${filtered.length}`
          : `Resend email ${filtered.length}`}
      </Button>

      {!loading && failed.length > 0 && (
        <span className="text-sm text-destructive">{failed.length} failed</span>
      )}
    </div>
  )
}
