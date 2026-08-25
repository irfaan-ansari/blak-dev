"use client"

import React from "react"
import { redirect } from "next/navigation"

import { ErrorState, PageSkeleton } from "@blak/ui/components/blak/empty-state"

import OnboardingForm from "../form/onboarding-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { Info } from "lucide-react"
import { useAccount } from "@/features/account/account.data"

const OnboardingClient = () => {
  const { data, isPending, isError, error } = useAccount()

  if (isPending) {
    return <PageSkeleton />
  }

  if (isError) {
    return <ErrorState title={error.message} description={error.details} />
  }

  const account = data?.data

  if (!account) {
    return (
      <ErrorState
        title="Account not found"
        description="We couldn't find your active account."
      />
    )
  }

  switch (account.status) {
    case "ACTIVE":
      redirect("/dashboard")

    case "PENDING_ONBOARDING":
      return <OnboardingForm />

    case "UNDER_REVIEW":
      return (
        <Card size="sm" className="mx-auto max-w-md">
          <CardHeader className="flex flex-col items-center justify-center">
            <Avatar>
              <AvatarFallback>
                <Info className="text-primary" />
              </AvatarFallback>
            </Avatar>
          </CardHeader>

          <CardContent className="space-y-4 text-center">
            <CardTitle>Application Under Review</CardTitle>
            <CardDescription>
              Your onboarding documents have been submitted and are currently
              being reviewed by the BLAK compliance team.
            </CardDescription>

            <p className="mt-6 text-sm text-muted-foreground">
              We'll notify you once the review is complete or if any additional
              information is required.
            </p>
          </CardContent>
        </Card>
      )

    case "INACTIVE":
      return (
        <ErrorState
          title="Account is inactive"
          description="Your account is currently inactive. Please contact BLAK support if you believe this is a mistake."
        />
      )

    case "SUSPENDED":
      return (
        <ErrorState
          title="Account suspended"
          description="Your account has been suspended. Please contact BLAK support for more information."
        />
      )

    default:
      return (
        <ErrorState
          title="Unknown account status"
          description="We couldn't determine the current status of your account."
        />
      )
  }
}

export default OnboardingClient
