import { VehicleStatus } from "@blak/db"
import { StatusConfig } from "@/features/shared/shared.type"

export const STATUS_MAP: Record<VehicleStatus, StatusConfig> = {
  PENDING_APPROVAL: {
    label: "Under Review",
    className: "border-amber-500 bg-amber-400 text-amber-950",
  },

  DRIVER_ASSIGNED: {
    label: "Driver Assigned",
    className: "border-blue-600 bg-blue-600 text-white",
  },

  ACTIVE: {
    label: "Active",
    className: "border-emerald-600 bg-emerald-600 text-white",
  },

  REJECTED: {
    label: "Rejected",
    className: "border-rose-600 bg-rose-600 text-white",
  },

  INACTIVE: {
    label: "Inactive",
    className: "border-slate-600 bg-slate-600 text-white",
  },

  MAINTENANCE: {
    label: "Maintenance",
    className: "border-orange-600 bg-orange-600 text-white",
  },
}
