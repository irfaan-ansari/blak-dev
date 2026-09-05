"use client"

import React from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { Button } from "@blak/ui/components/button"
import { useAccount } from "@/features/account/account.data"

const ACTIVE_BANNER_KEY = "blak-active-account-banner-dismissed"

export const OnboardingStatus = () => {
  const { data: account } = useAccount()
  const [showActiveBanner, setShowActiveBanner] = React.useState(false)

  const status = account?.data?.status

  React.useEffect(() => {
    if (status !== "ACTIVE") return

    const dismissed = localStorage.getItem(ACTIVE_BANNER_KEY)

    setShowActiveBanner(dismissed !== "true")
  }, [status])

  const dismissActiveBanner = () => {
    localStorage.setItem(ACTIVE_BANNER_KEY, "true")
    setShowActiveBanner(false)
  }

  if (!account?.data) return null

  if (status === "PENDING_APPROVAL") {
    return (
      <div className="border-b bg-yellow-500/10 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-base font-bold">Your account is under review</p>

            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              We’re reviewing your submitted information. In the meantime, you
              can continue setting up your account by adding your drivers and
              vehicles.
            </p>
          </div>
          <Button
            size="sm"
            className="bg-foreground text-muted hover:bg-foreground hover:text-muted"
            asChild
          >
            <Link href="/drivers">Add Driver</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-foreground text-muted hover:bg-foreground hover:text-muted"
          >
            <Link href="/vehicles">Add Vehicle</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (status === "ONBOARDING") {
    return (
      <div className="border-b bg-yellow-500/10 px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-base font-bold">Complete onboarding</p>

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

  if (status === "ACTIVE" && showActiveBanner) {
    return (
      <div className="border-b bg-green-500/10 px-4 py-3 lg:px-6">
        <div className="relative flex items-center gap-4 pr-6">
          <div className="flex-1">
            <p className="text-base font-bold">
              Your account has been approved
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Your BLAK operator account is now active. Continue managing your
              drivers, vehicles, and account information from your portal.
            </p>
          </div>

          <Button
            size="sm"
            asChild
            className="bg-foreground text-muted hover:bg-foreground hover:text-muted"
          >
            <Link href="/drivers">Add Driver</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-foreground text-muted hover:bg-foreground hover:text-muted"
          >
            <Link href="/vehicles">Add Vehicle</Link>
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={dismissActiveBanner}
            aria-label="Dismiss notification"
            className="absolute top-1/2 -right-4 -translate-y-1/2"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
    )
  }

  return null
}
