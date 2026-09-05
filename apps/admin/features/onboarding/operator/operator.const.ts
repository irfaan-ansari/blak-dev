import { BadgeCheck, CircleDashed, CircleSlash } from "lucide-react"

import { StatusActionConfig, StatusConfig } from "@/features/shared/shared.type"
import { ApplicationStatus } from "@/features/onboarding/application.type"

export const STATUS_MAP: Record<ApplicationStatus, StatusConfig> = {
  PENDING_APPROVAL: {
    label: "Under Review",
    icon: CircleDashed,
    className: "text-primary-foreground! bg-yellow-200! border-yellow-300!",
  },

  APPROVED: {
    label: "Approved",
    icon: BadgeCheck,
    className: "text-primary-foreground bg-lime-300 border-lime-400",
  },
  REJECTED: {
    label: "Rejected",
    icon: CircleSlash,
    className: "text-primary-foreground bg-red-300 border-red-400",
  },
} as const

export const AVAILABLE_ACTIONS: Partial<
  Record<ApplicationStatus, StatusActionConfig[]>
> = {
  PENDING_APPROVAL: [
    {
      label: "Approve",
      variant: "ghost",
      icon: BadgeCheck,
      action: "approve",
    },
    {
      label: "Reject",
      variant: "destructive",
      icon: CircleSlash,
      action: "reject",
    },
  ],
} as const
