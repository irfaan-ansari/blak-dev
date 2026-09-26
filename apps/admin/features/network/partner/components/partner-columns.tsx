"use client"

import { CopyButton } from "@blak/ui/components/blak/copy-button"
import type { DataTableColumnDef } from "@blak/ui/components/data-table"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "@/features/network/operator/operator.const"
import type { Partner } from "../partner.type"

export const partnerColumns: DataTableColumnDef<Partner>[] = [
  {
    id: "partner",
    header: "Partner",
    cell: ({ row }) => (
      <div className="grid gap-1 py-2">
        <span className="font-semibold">{row.original.name}</span>
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
    accessorKey: "contactName",
    header: "Primary Contact",
    cell: ({ row }) => row.original.contactName || "-",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} statusMap={STATUS_MAP} />
    ),
  },
]
