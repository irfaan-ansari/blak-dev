import React from "react"
import { AcceptInvitationCard } from "@/features/auth/accept-invitation/components/accept-invitation-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accept Invitation",
  description: "Accept your invitation and join BLAK.",
  robots: {
    index: false,
    follow: false,
  },
}

const AcceptInvitationPage = () => {
  return <AcceptInvitationCard />
}

export default AcceptInvitationPage
