"use client"

import React from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@blak/ui/components/button"
import type { User } from "@blak/db"

import { resendEmails } from "./action"

const BATCH_SIZE = 5

export const Trigger = ({ users }: { users: User[] }) => {
  const [loading, setLoading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [failed, setFailed] = React.useState<string[]>([])

  const onClick = async () => {
    if (loading) return

    if (!users.length) {
      toast.error("No users found")
      return
    }

    setLoading(true)
    setProgress(0)
    setFailed([])

    const failedIds: string[] = []

    try {
      for (let i = 0; i < users.length; i += BATCH_SIZE) {
        const batch = users.slice(i, i + BATCH_SIZE)

        try {
          const result = await resendEmails(
            batch.map((user) => ({
              id: user.id,
              email: user.email,
            }))
          )

          failedIds.push(...result.failed)
        } catch (error) {
          // The entire Server Action request failed
          failedIds.push(...batch.map((user) => user.id))

          console.error("Batch failed:", error)
        }

        setProgress(Math.min(i + batch.length, users.length))
      }

      setFailed(failedIds)

      const sentCount = users.length - failedIds.length

      if (failedIds.length === 0) {
        toast.success(`${sentCount} emails sent successfully`)
      } else {
        toast.warning(`${sentCount} sent, ${failedIds.length} failed`)
      }
    } catch (error) {
      console.error(error)

      toast.error("Something went wrong while sending emails")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        prefix={<Plus />}
        onClick={onClick}
        disabled={loading || !users.length}
      >
        {loading
          ? `Sending ${progress}/${users.length}`
          : `Resend email ${users.length}`}
      </Button>

      {!loading && failed.length > 0 && (
        <span className="text-sm text-destructive">{failed.length} failed</span>
      )}
    </div>
  )
}
