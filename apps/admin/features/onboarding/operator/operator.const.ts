import { StatusConfig } from "@/features/shared/shared.type"
import { CircleCheck, CircleDashed, XCircle } from "lucide-react"
import { ApplicationStatus } from "@/features/onboarding/application.type"

export const STATUS_MAP: Record<ApplicationStatus, StatusConfig> = {
  APPROVED: {
    label: "Approved",
    icon: CircleCheck,
    className: "text-primary-foreground bg-lime-300 border-lime-400",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    className: "text-primary-foreground bg-red-300 border-red-400",
  },
  PENDING_APPROVAL: {
    label: "New",
    icon: CircleDashed,
    className: "text-primary-foreground! bg-yellow-200! border-yellow-300!",
  },
} as const
