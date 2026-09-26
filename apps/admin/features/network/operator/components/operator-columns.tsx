"use client"

import Link from "next/link"
import { Button } from "@blak/ui/components/button"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import type { DataTableColumnDef } from "@blak/ui/components/data-table"
import { pluralize } from "@blak/utils/string"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "../operator.const"
import type { Operator } from "../operator.type"
import { OperatorAction } from "./operator-action"

export const operatorColumns: DataTableColumnDef<Operator>[] = [
  {
    id: "operator",
    header: "Operator",
    cell: ({ row }) => (
      <div className="grid gap-1 py-2">
        <Link
          href={`/network/operators/${row.original.id}`}
          className="font-semibold hover:underline"
        >
          {row.original.name}
        </Link>
        <span className="text-xs text-muted-foreground">
          {[row.original.metadata?.state, row.original.metadata?.country]
            .filter(Boolean)
            .join(", ") || "Location unavailable"}
        </span>
      </div>
    ),
  },
  {
    id: "contact",
    header: "Phone / Email",
    cell: ({ row }) => (
      <div className="grid gap-1 py-2">
        <CopyButton value={row.original.phoneNumber} />
        <CopyButton value={row.original.email} />
      </div>
    ),
  },
  {
    id: "drivers",
    header: "Drivers",
    cell: ({ row }) => {
      const count = row.original.driverCount ?? 0

      return `${count} ${pluralize(count, "Driver")}`
    },
  },
  {
    id: "vehicles",
    header: "Vehicles",
    cell: ({ row }) => {
      const count = row.original.vehicleCount ?? 0

      return `${count} ${pluralize(count, "Vehicle")}`
    },
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
          <Link href={`/network/operators/${row.original.id}`}>View</Link>
        </Button>
        <OperatorAction data={row.original} />
      </div>
    ),
  },
]
