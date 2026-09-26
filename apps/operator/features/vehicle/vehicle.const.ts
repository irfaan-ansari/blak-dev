import { VehicleStatus } from "@blak/db"
import { StatusConfig } from "../shared/shared.type"

export const STATUS_MAP: Record<VehicleStatus, StatusConfig> = {
  PENDING_APPROVAL: {
    label: "Under Review",
    className: "bg-amber-400 text-amber-950",
  },

  DRIVER_ASSIGNED: {
    label: "Driver Assigned",
    className: "bg-blue-600 text-white",
  },
  ACTIVE: {
    label: "Active",
    className: "bg-emerald-600 text-white",
  },

  REJECTED: {
    label: "Rejected",
    className: "bg-rose-600 text-white",
  },

  INACTIVE: {
    label: "Inactive",
    className: "bg-slate-600 text-white",
  },

  MAINTENANCE: {
    label: "Maintenance",
    className: "bg-orange-500 text-orange-950",
  },
}
export const REQUIRED_IMAGES = [
  { label: "Front View" },
  { label: "Drivers Side Exterior" },
  { label: "Rear View" },
  { label: "Passenger Side Exterior" },
  { label: "Driver Side Interior Front" },
  { label: "Driver Side Interior Rear" },
  { label: "Third Row Interior" },
  { label: "Trunk/Cargo Interior" },
  { label: "Passenger Side Interior Rear" },
  { label: "Passenger Side Interior Front" },
]
