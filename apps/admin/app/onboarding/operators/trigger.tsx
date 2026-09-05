"use client"

import React from "react"
import { Plus } from "lucide-react"

import { processOperatorApplication } from "@/features/onboarding/operator/operator.action"
import { Button } from "@blak/ui/components/button"
import { toast } from "sonner"

type TriggerProps = {
  data: {
    id: string
  }[]
}

const BATCH_SIZE = 5

export const Trigger = ({ data }: TriggerProps) => {
  const [loading, setLoading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [failed, setFailed] = React.useState<string[]>([])

  const onClick = async () => {
    if (loading) return

    if (!data?.length) {
      toast("No application found")
      return
    }
    setLoading(true)
    setProgress(0)
    setFailed([])

    const failedIds: string[] = []

    try {
      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE)

        const results = await Promise.allSettled(
          batch.map((item) =>
            processOperatorApplication({
              id: item.id,
              action: "approve",
            })
          )
        )

        results.forEach((result, index) => {
          const item = batch[index]

          if (result.status === "rejected" && item) {
            failedIds.push(item.id)
          }
        })

        setProgress(Math.min(i + batch.length, data.length))
      }

      setFailed(failedIds)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        prefix={<Plus />}
        onClick={onClick}
        disabled={loading || !data.length}
      >
        {loading
          ? `Processing ${progress}/${data.length}`
          : "Start Bulk Invite"}
      </Button>

      {!loading && failed.length > 0 && (
        <span className="text-sm text-destructive">{failed.length} failed</span>
      )}
    </div>
  )
}
