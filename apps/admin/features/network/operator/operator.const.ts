import { OperatorStatus } from "./operator.type"
import { StatusConfig } from "@/features/shared/shared.type"

export const STATUS_MAP: Record<OperatorStatus, StatusConfig> = {
  ONBOARDING: {
    label: "Invited",
    className: "border-sky-600 bg-sky-600 text-white",
  },
  INVITED: {
    label: "Invited",
    className: "border-sky-600 bg-sky-600 text-white",
  },
  ACCOUNT_CREATED: {
    label: "Account Created",
    className: "border-violet-600 bg-violet-600 text-white",
  },
  PENDING_APPROVAL: {
    label: "Documents Submitted",
    className: "border-indigo-600 bg-indigo-600 text-white",
  },
  ACTIVE: {
    label: "Active",
    className: "border-emerald-600 bg-emerald-600 text-white",
  },
  SUSPENDED: {
    label: "Rejected",
    className: "border-rose-600 bg-rose-600 text-white",
  },
  INACTIVE: {
    label: "Inactive",
    className: "border-slate-600 bg-slate-600 text-white",
  },
} as const
