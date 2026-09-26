"use client"

import Link from "next/link"
import { Button } from "@blak/ui/components/button"
import type { DataTableColumnDef } from "@blak/ui/components/data-table"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "../vehicle.const"
import type { Vehicle } from "../vehicle.type"
import VehicleAction from "./vehicle-action"

export const vehicleColumns: DataTableColumnDef<Vehicle>[] = [
  {
    id: "vehicle",
    header: "Vehicle",
    cell: ({ row }) => (
      <div className="grid gap-1 py-2">
        <Link
          href={`/operation/vehicles/${row.original.id}`}
          className="font-semibold hover:underline"
        >
          {row.original.make} {row.original.model}
        </Link>
        <span className="text-xs text-muted-foreground">
          {row.original.year} · {row.original.exteriorColor}
        </span>
      </div>
    ),
  },
  {
    id: "operator",
    header: "Operator",
    cell: ({ row }) => (
      <Link
        href={`/network/operators/${row.original.organization.id}`}
        className="font-medium hover:underline"
      >
        {row.original.organization.name}
      </Link>
    ),
  },
  { accessorKey: "licensePlate", header: "License Plate" },
  {
    accessorKey: "registrationNumber",
    header: "Registration Number",
    cell: ({ row }) => row.original.registrationNumber || "-",
  },
  {
    accessorKey: "vin",
    header: "VIN",
    cell: ({ row }) => row.original.vin || "-",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} statusMap={STATUS_MAP} />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/operation/vehicles/${row.original.id}`}>View</Link>
        </Button>
        <VehicleAction data={row.original}>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </VehicleAction>
      </div>
    ),
  },
]
