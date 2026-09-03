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
    label: "Front",
    name: "FRONT",
  },
  {
    label: "Drivers Side Exterior",
    name: "DRIVERS_SIDE_EXTERIOR",
  },
  {
    label: "Rear",
    name: "REAR",
  },
  {
    label: "Passenger Side Exterior",
    name: "PASSENGER_SIDE_EXTERIOR",
  },
  {
    label: "Driver Side Interior Front",
    name: "DRIVER_SIDE_INTERIOR_FRONT",
  },
  {
    label: "Driver Side Interior Rear",
    name: "DRIVER_SIDE_INTERIOR_REAR",
  },
  {
    label: "Third Row Interior",
    name: "THIRD_ROW_INTERIOR",
  },
  {
    label: "Trunk/Cargo Interior",
    name: "TRUNK_CARGO_INTERIOR",
  },
  {
    label: "Passenger Side Interior Rear",
    name: "PASSENGER_SIDE_INTERIOR_REAR",
  },
  {
    label: "Passenger Side Interior Front",
    name: "PASSENGER_SIDE_INTERIOR_FRONT",
  },
] as const
