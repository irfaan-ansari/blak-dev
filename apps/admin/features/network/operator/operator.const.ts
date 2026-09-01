import {
  BadgeCheck,
  CircleDashed,
  CirclePause,
  CircleSlash,
  ClockFading,
} from "lucide-react"

import { StatusActionConfig, StatusConfig } from "@/features/shared/shared.type"
import { OperatorStatus } from "./operator.type"

export const STATUS_MAP: Record<OperatorStatus, StatusConfig> = {
  ONBOARDING: {
    label: "Pending Onboarding",
    icon: CircleDashed,
    className: "text-primary-foreground! bg-amber-200! border-amber-300!",
  },

  SUBMITTED: {
    label: "Submitted",
    icon: ClockFading,
    className: "text-primary-foreground bg-lime-300 border-lime-400",
  },
  ACTIVE: {
    label: "Active",
    icon: BadgeCheck,
    className: "text-primary-foreground bg-green-500 border-green-600",
  },

  SUSPENDED: {
    label: "Suspended",
    icon: CirclePause,
    className: "text-primary-foreground bg-red-500 border-red-600",
  },
  TERMINATED: {
    label: "Suspended",
    icon: CirclePause,
    className: "text-primary-foreground bg-red-500 border-red-600",
  },
  INACTIVE: {
    label: "Inactive",
    icon: CircleSlash,
    className: "text-primary-foreground bg-gray-500 border-gray-600",
  },
} as const

export const AVAILABLE_ACTIONS: Partial<
  Record<OperatorStatus, StatusActionConfig[]>
> = {
  SUBMITTED: [
    {
      label: "Activate",
      variant: "ghost",
      icon: BadgeCheck,
      action: "activate",
    },
    {
      label: "Decline",
      variant: "destructive",
      icon: CirclePause,
      action: "reject",
    },
  ],
  ACTIVE: [
    {
      label: "Suspend",
      variant: "destructive",
      icon: CirclePause,
      action: "suspend",
    },
  ],

  SUSPENDED: [
    {
      label: "Activate",
      variant: "ghost",
      icon: BadgeCheck,
      action: "reactivate",
    },
  ],
} as const
