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
  DRIVER_ASSIGNED: {
    label: "Pending Approval",
    icon: ClockFading,
    className: "text-primary-foreground! bg-amber-200! border-amber-300!",
  },

  ACTIVE: {
    label: "Active",
    icon: CircleCheck,
    className: "text-primary-foreground! bg-lime-300! border-lime-400!",
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

export const REQUIRED_IMAGES = [
  {
    label: "Front View",
    name: "FRONT",
  },
  {
    label: "Rear View",
    name: "REAR",
  },
  {
    label: "Left Side",
    name: "LEFT_SIDE",
  },
  {
    label: "Right Side",
    name: "RIGHT_SIDE",
  },
  {
    label: "Front Three-Quarter View",
    name: "FRONT_THREE_QUARTER",
  },
  {
    label: "Front Interior",
    name: "FRONT_INTERIOR",
  },
  {
    label: "Rear Interior",
    name: "REAR_INTERIOR",
  },
  {
    label: "Trunk / Boot",
    name: "TRUNK",
  },
] as const
