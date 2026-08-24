"use client"

import React from "react"
import {
  EmptyState,
  ErrorState,
  PageSkeleton,
} from "@blak/ui/components/blak/empty-state"
import { PartnerCard } from "./partner-card"
import { usePartnerApplications } from "../partner.data"

const PartnerClient = () => {
  const { data, isPending, isError, error } = usePartnerApplications()

  if (isPending) return <PageSkeleton />

  if (isError) return <ErrorState title={error.message} />

  if (data?.data?.length === 0)
    return <EmptyState title="No applications found." />

  return (
    <div className="space-y-3">
      {data?.data.map((app) => (
        <PartnerCard data={app} key={app.id} />
      ))}
    </div>
  )
}

export default PartnerClient
