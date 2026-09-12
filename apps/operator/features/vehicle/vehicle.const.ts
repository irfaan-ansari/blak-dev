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
    label: "Under Review",
    icon: ClockFading,
    className: "text-primary-foreground! bg-amber-100! border-amber-200!",
  },
  DRIVER_ASSIGNED: {
    label: "Driver Assigned",
    icon: ClockFading,
    className: "text-primary-foreground! bg-amber-200! border-amber-300!",
  },
  ACTIVE: {
    label: "Active",
    icon: CircleCheck,
    className: "text-primary-foreground! bg-lime-100! border-lime-200!",
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
  { label: "Front" },
  { label: "Drivers Side Exterior" },
  { label: "Rear" },
  { label: "Passenger Side Exterior" },
  { label: "Driver Side Interior Front" },
  { label: "Driver Side Interior Rear" },
  { label: "Third Row Interior" },
  { label: "Trunk/Cargo Interior" },
  { label: "Passenger Side Interior Rear" },
  { label: "Passenger Side Interior Front" },
]
