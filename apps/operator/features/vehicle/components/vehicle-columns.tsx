"use client"

import Link from "next/link"
import type { DataTableColumnDef } from "@blak/ui/components/data-table"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { Button } from "@blak/ui/components/button"
import { STATUS_MAP } from "../vehicle.const"
import type { Vehicle } from "../vehicle.type"

export const vehicleColumns: DataTableColumnDef<Vehicle>[] = [
  {
    id: "vehicle",
    header: "Vehicle",
    cell: ({ row }) => (
      <div className="grid gap-1 py-2">
        <Link
          className="font-semibold hover:underline"
          href={`/vehicles/${row.original.id}`}
        >
          {row.original.make} {row.original.model}
        </Link>
        <span className="text-xs text-muted-foreground">
          {row.original.year} · {row.original.exteriorColor}
        </span>
      </div>
    ),
  },
  { accessorKey: "licensePlate", header: "License Plate" },
  {
    accessorKey: "registrationNumber",
    header: "Registration Number",
    cell: ({ row }) => row.original.registrationNumber || "—",
  },
  {
    accessorKey: "vin",
    header: "VIN",
    cell: ({ row }) => row.original.vin || "—",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} statusMap={STATUS_MAP} />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`/vehicles/${row.original.id}/edit`}
            aria-label={`Edit ${row.original.licensePlate}`}
          >
            Edit
          </Link>
        </Button>
      </div>
    ),
  },
]
