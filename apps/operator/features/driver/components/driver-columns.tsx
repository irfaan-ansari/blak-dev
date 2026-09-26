"use client"

import Link from "next/link"
import type { DriverWithVehicle } from "../driver.type"
import type { DataTableColumnDef } from "@blak/ui/components/data-table"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import { Button } from "@blak/ui/components/button"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "../driver.const"

export const driverColumns: DataTableColumnDef<DriverWithVehicle>[] = [
  {
    accessorKey: "name",
    header: "Driver",
    cell: ({ row }) => (
      <Link
        className="inline-block py-2 font-semibold hover:underline"
        href={`/drivers/${row.original.id}`}
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) =>
      row.original.phoneNumber ? (
        <CopyButton value={row.original.phoneNumber} />
      ) : (
        "—"
      ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <CopyButton value={row.original.email} />,
  },
  {
    id: "vehicle",
    header: "Vehicle",
    cell: ({ row }) => {
      const vehicle = row.original.vehicle
      if (!vehicle)
        return <span className="text-muted-foreground">Unassigned</span>

      return (
        <div className="grid gap-1 py-2">
          <Link
            className="font-semibold hover:underline"
            href={`/vehicles/${vehicle.id}`}
          >
            {vehicle.make} {vehicle.model}
          </Link>
          <span className="text-xs text-muted-foreground">
            {vehicle.licensePlate}
          </span>
        </div>
      )
    },
  },
  {
    id: "status",
    header: "Account Status",
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.banned ? "BANNED" : "ACTIVE"}
        statusMap={STATUS_MAP}
      />
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`/drivers/${row.original.id}`}
            aria-label={`View details for ${row.original.name}`}
          >
            View details
          </Link>
        </Button>
      </div>
    ),
  },
]
