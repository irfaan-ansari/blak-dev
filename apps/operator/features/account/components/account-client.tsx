"use client"

import React from "react"
import { useAccount } from "../account.data"
import { PageSkeleton } from "@blak/ui/components/blak/empty-state"
import { AccountForm } from "../forms/account-form"

export const AccountClient = () => {
  const { data, isPending } = useAccount()

  if (isPending) {
    return <PageSkeleton />
  }
  const account = data?.data

  return (
    <div className="mx-auto max-w-4xl">
      {/* @ts-ignore */}
      <AccountForm values={account!} />
    </div>
  )
}
