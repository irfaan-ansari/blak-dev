"use client"

import type { DataTableColumnDef } from "@blak/ui/components/data-table"

export const bookingColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "booking", header: "Booking" },
  { id: "passenger", header: "Passenger" },
  { id: "pickup", header: "Pickup" },
  { id: "dropoff", header: "Drop-off" },
  { id: "scheduledAt", header: "Scheduled At" },
  { id: "operator", header: "Operator" },
  { id: "status", header: "Status" },
  { id: "actions", header: "" },
]
