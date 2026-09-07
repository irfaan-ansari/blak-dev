import {
  BadgeCheck,
  CircleDashed,
  CirclePause,
  CircleSlash,
  ClockFading,
  XCircleIcon,
} from "lucide-react"

import { OperatorStatus } from "./operator.type"
import { StatusConfig } from "@/features/shared/shared.type"

export const STATUS_MAP: Record<OperatorStatus, StatusConfig> = {
  ONBOARDING: {
    label: "Pending Onboarding",
    icon: CircleDashed,
    className: "text-primary-foreground! bg-amber-100! border-amber-200/80",
  },
  PENDING_APPROVAL: {
    label: "Documents Submitted",
    icon: ClockFading,
    className: "text-primary-foreground! bg-sky-100! border-sky-200/80",
  },
  ACTIVE: {
    label: "Approved",
    icon: BadgeCheck,
    className: "text-primary-foreground bg-lime-200 border-lime-300",
  },
  SUSPENDED: {
    label: "Rejected",
    icon: XCircleIcon,
    className: "text-primary-foreground bg-red-500 border-red-600",
  },
  TERMINATED: {
    label: "Terminated",
    icon: CirclePause,
    className: "text-primary-foreground bg-red-500 border-red-600",
  },
  INACTIVE: {
    label: "Inactive",
    icon: CircleSlash,
    className: "text-primary-foreground bg-gray-500 border-gray-600",
  },
} as const
