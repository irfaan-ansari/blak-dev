"use client"

import type { DataTableColumnDef } from "@blak/ui/components/data-table"

export const passengerColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "passenger", header: "Passenger" },
  { id: "contact", header: "Phone / Email" },
  { id: "bookings", header: "Bookings" },
  { id: "lastTrip", header: "Last Trip" },
  { id: "status", header: "Status" },
  { id: "actions", header: "" },
]
