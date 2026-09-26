"use client"

import type { DataTableColumnDef } from "@blak/ui/components/data-table"

// Header-only columns until ride records are connected to this page.
export const rideColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "ride", header: "Ride" },
  { id: "pickup", header: "Pickup" },
  { id: "dropoff", header: "Drop-off" },
  { id: "scheduledAt", header: "Scheduled At" },
  { id: "driver", header: "Driver" },
  { id: "vehicle", header: "Vehicle" },
  { id: "status", header: "Status" },
]
