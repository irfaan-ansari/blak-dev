import { VehicleStatus } from "@blak/db"
import {
  CircleCheck,
  CircleX,
  ClockFading,
  PauseCircle,
  Wrench,
} from "lucide-react"
import { StatusConfig } from "../shared/shared.type"

export const STATUS_MAP: Record<VehicleStatus, StatusConfig> = {
  PENDING_APPROVAL: {
    label: "Pending Approval",
    icon: ClockFading,
    className: "text-primary-foreground! bg-amber-200! border-amber-300!",
  },

  ACTIVE: {
    label: "Active",
    icon: CircleCheck,
    className: "text-primary-foreground! bg-green-500! border-green-600!",
  },

  REJECTED: {
    label: "Rejected",
    icon: CircleX,
    className: "text-primary-foreground! bg-red-500! border-red-600!",
  },

  INACTIVE: {
    label: "Inactive",
    icon: PauseCircle,
    className: "text-primary-foreground! bg-gray-200! border-gray-300!",
  },

  MAINTENANCE: {
    label: "Maintenance",
    icon: Wrench,
    className: "text-primary-foreground! bg-orange-500! border-orange-600!",
  },
}
