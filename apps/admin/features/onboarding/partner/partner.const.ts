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
    label: "Submitted",
    icon: CircleDashed,
    className: "text-primary-foreground bg-blue-500 border-blue-600",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    icon: ClockFading,
    className: "text-primary-foreground bg-yellow-500 border-yellow-600",
  },
  INFO_REQUIRED: {
    label: "Info Required",
    icon: Info,
    className: "text-primary-foreground bg-orange-500 border-orange-600",
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
  SUBMITTED: [
    {
      label: "Approve",
      variant: "ghost",
      icon: BadgeCheck,
      action: "approve",
    },
    {
      label: "Request information",
      variant: "ghost",
      icon: Info,
      action: "request_information",
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
