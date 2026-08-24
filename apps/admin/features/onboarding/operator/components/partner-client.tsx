"use client"

import React from "react"
import {
  EmptyState,
  ErrorState,
  PageSkeleton,
} from "@blak/ui/components/blak/empty-state"
import { OperatorCard } from "./operator-card"
import { useOperatorApplications } from "../operator.data"

const OperatorClient = () => {
  const { data, isPending, isError, error } = useOperatorApplications()

  if (isPending) return <PageSkeleton />

  if (isError) return <ErrorState title={error.message} />

  if (data?.data?.length === 0)
    return <EmptyState title="No applications found." />

  return (
    <div className="space-y-3">
      {data?.data.map((app) => (
        <OperatorCard data={app} key={app.id} />
      ))}
    </div>
  )
}

export default OperatorClient
