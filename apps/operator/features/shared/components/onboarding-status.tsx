"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@blak/ui/components/button"
import { useAccount } from "@/features/account/account.data"

export const OnboardingStatus = () => {
  const { data: account } = useAccount()

  if (!account?.data) return null

  const { status } = account.data

  if (status === "PENDING_APPROVAL") {
    return (
      <div className="border-b bg-yellow-500/10 px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-base font-bold">Your account is under review</p>

            <p className="mt-1 text-sm text-muted-foreground">
              We’re reviewing your submitted information. You’ll be notified
              once your account has been approved.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (status === "ONBOARDING") {
    return (
      <div className="border-b bg-yellow-500/10 px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-base font-bold">Complete your onboarding</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Finish the remaining steps to complete your account setup.
            </p>
          </div>

          <Button asChild>
            <Link href="/settings/compliance">Complete onboarding</Link>
          </Button>
        </div>
      </div>
    )
  }

  return null
}
