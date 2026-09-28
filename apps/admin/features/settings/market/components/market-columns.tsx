"use client"

import type { DataTableColumnDef } from "@blak/ui/components/data-table"
import { Badge } from "@blak/ui/components/badge"
import { Button } from "@blak/ui/components/button"
import type { MarketWithRelations } from "../market.type"
import { MarketDialog } from "./market-dialog"

export const marketColumns: DataTableColumnDef<MarketWithRelations>[] = [
  {
    accessorKey: "name",
    header: "Market",
    cell: ({ row }) => (
      <span className="inline-block py-2 font-semibold">
        {row.original.name}
      </span>
    ),
  },
  { accessorKey: "iso2", header: "Code" },
  {
    id: "country",
    header: "Country",
    cell: ({ row }) => row.original.country.name,
  },
  {
    id: "currency",
    header: "Currency",
    cell: ({ row }) => row.original.currency.code,
  },
  {
    id: "phoneCode",
    header: "Phone Code",
    cell: ({ row }) => row.original.country.phoneCode,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={`h-7 px-3 font-bold ${row.original.status === "ACTIVE" ? "bg-emerald-600 text-white" : "bg-slate-600 text-white"}`}
      >
        {row.original.status === "ACTIVE" ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <MarketDialog
        id={row.original.id}
        values={{
          ...row.original,
          status: row.original.status as "ACTIVE" | "INACTIVE",
        }}
      >
        <Button
          variant="outline"
          size="sm"
          aria-label={`Edit ${row.original.name}`}
        >
          Edit
        </Button>
      </MarketDialog>
    ),
  },
]
