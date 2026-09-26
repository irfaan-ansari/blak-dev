import { StatusConfig } from "@/features/shared/shared.type"
import { ApplicationStatus } from "@/features/onboarding/application.type"

export const STATUS_MAP: Record<ApplicationStatus, StatusConfig> = {
  INVITED: {
    label: "Invited",
    className: "border-sky-600 bg-sky-600 text-white",
  },
  SUBMITTED: {
    label: "Submitted",
    className: "border-indigo-600 bg-indigo-600 text-white",
  },
  APPROVED: {
    label: "Approved",
    className: "border-emerald-600 bg-emerald-600 text-white",
  },
  REJECTED: {
    label: "Rejected",
    className: "border-rose-600 bg-rose-600 text-white",
  },
  PENDING_APPROVAL: {
    label: "New",
    className: "border-amber-500 bg-amber-400 text-amber-950",
  },
} as const
