import { BadgeCheck, CircleDashed, CircleSlash } from "lucide-react"
import { StatusActionConfig, StatusConfig } from "@/features/shared/shared.type"
import { ApplicationStatus } from "@/features/onboarding/application.type"

export const STATUS_MAP: Record<ApplicationStatus, StatusConfig> = {
  PENDING_APPROVAL: {
    label: "Submitted",
    icon: CircleDashed,
    className: "text-primary-foreground bg-blue-500 border-blue-600",
  },

  APPROVED: {
    label: "Approved",
    icon: BadgeCheck,
    className: "text-primary-foreground bg-green-500 border-green-600",
  },
  REJECTED: {
    label: "Rejected",
    icon: CircleSlash,
    className: "text-primary-foreground bg-red-500 border-red-600",
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
