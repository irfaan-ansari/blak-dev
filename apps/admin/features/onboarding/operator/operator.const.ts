import {
  BadgeCheck,
  CircleDashed,
  CircleMinus,
  CircleSlash,
  ClockFading,
  Info,
} from "lucide-react"

import { StatusActionConfig, StatusConfig } from "@/features/shared/shared.type"
import { ApplicationStatus } from "@/features/onboarding/application.type"

export const STATUS_MAP: Record<ApplicationStatus, StatusConfig> = {
  SUBMITTED: {
    label: "New",
    icon: CircleDashed,
    className: "text-primary-foreground! bg-yellow-200! border-yellow-300!",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    icon: ClockFading,
    className: "text-primary-foreground bg-yellow-500 border-yellow-600",
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
  INFO_REQUIRED: {
    label: "Withdrawn",
    icon: CircleMinus,
    className: "text-primary-foreground bg-violet-300 border-violet-400",
  },
} as const

export const AVAILABLE_ACTIONS: Partial<
  Record<ApplicationStatus, StatusActionConfig[]>
> = {
  SUBMITTED: [
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
  INFO_REQUIRED: [
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
