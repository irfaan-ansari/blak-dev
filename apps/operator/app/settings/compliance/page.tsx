"use client"

import React from "react"
import { PageSkeleton } from "@blak/ui/components/blak/empty-state"
import { useCompliance } from "@/features/compliance/compliance.data"
import { ComplianceForm } from "@/features/compliance/form/compliance-form"
import { useAccount } from "@/features/account/account.data"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"

const CompliancePage = () => {
  const { data: account } = useAccount()
  const { data, isPending } = useCompliance("OPERATOR")
  if (isPending) return <PageSkeleton />
  console.log(data)
  if (account?.data.status === "PENDING_APPROVAL")
    return (
      <Card size="sm" className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Documents submitted</CardTitle>
          <CardDescription>
            Thanks! We’ve received your documents. Our team will review them and
            get back to you once the review is complete.
          </CardDescription>
        </CardHeader>
      </Card>
    )

  return <ComplianceForm requirements={data?.data!} />
}

export default CompliancePage
