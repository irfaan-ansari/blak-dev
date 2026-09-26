"use client"

import Link from "next/link"
import { Badge } from "@blak/ui/components/badge"
import { Button } from "@blak/ui/components/button"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import type { DataTableColumnDef } from "@blak/ui/components/data-table"
import type { Driver } from "../driver.type"

export const driverColumns: DataTableColumnDef<Driver>[] = [
  {
    id: "driver",
    header: "Driver",
    cell: ({ row }) => (
      <div className="grid gap-1 py-2">
        <Link
          href={`/network/drivers/${row.original.id}`}
          className="font-semibold hover:underline"
        >
          {row.original.name}
        </Link>
        {row.original.organization && (
          <Link
            href={`/network/operators/${row.original.organization.id}`}
            className="text-xs text-muted-foreground hover:text-foreground hover:underline"
          >
            {row.original.organization.name}
          </Link>
        )}
      </div>
    ),
  },
  {
    id: "contact",
    header: "Phone / Email",
    cell: ({ row }) => (
      <div className="grid gap-1 py-2">
        <CopyButton value={row.original.phoneNumber ?? ""} />
        <CopyButton value={row.original.email} />
      </div>
    ),
  },
  {
    id: "vehicle",
    header: "Vehicle",
    cell: ({ row }) => {
      const vehicle = row.original.vehicle

      if (!vehicle) {
        return <span className="text-muted-foreground">Unassigned</span>
      }

      return (
        <div className="grid gap-1 py-2">
          <Link
            href={`/operation/vehicles/${vehicle.id}`}
            className="font-medium hover:underline"
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
    header: "Status",
    cell: () => (
      <Badge className="h-6 bg-green-600 px-2 text-white">Active</Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/network/drivers/${row.original.id}`}>View details</Link>
        </Button>
      </div>
    ),
  },
]
