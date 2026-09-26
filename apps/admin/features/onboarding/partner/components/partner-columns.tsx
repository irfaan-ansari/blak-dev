"use client"

import { CopyButton } from "@blak/ui/components/blak/copy-button"
import type { DataTableColumnDef } from "@blak/ui/components/data-table"
import { formatRelative } from "@blak/utils/format"
import { pluralize } from "@blak/utils/string"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "../partner.const"
import type { PartnerApplication } from "../partner.type"

export const partnerApplicationColumns: DataTableColumnDef<PartnerApplication>[] =
  [
    {
      id: "business",
      header: "Business",
      cell: ({ row }) => {
        const application = row.original.application
        const businessName = Array.isArray(application?.legalBusinessName)
          ? application?.legalBusinessName.join(", ")
          : application?.legalBusinessName

        return (
          <div className="grid gap-1 py-2">
            <span className="font-semibold">
              {businessName || "Untitled application"}
            </span>
            <span className="text-xs text-muted-foreground">
              {[application?.state, application?.country]
                .filter(Boolean)
                .join(", ") || "Location unavailable"}
            </span>
          </div>
        )
      },
    },
    {
      id: "contact",
      header: "Contact",
      cell: ({ row }) => (
        <div className="grid gap-1 py-2">
          <span className="font-medium">{row.original.contactName}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.contactTitle}
          </span>
        </div>
      ),
    },
    {
      id: "contactDetails",
      header: "Phone / Email",
      cell: ({ row }) => (
        <div className="grid gap-1 py-2">
          <CopyButton value={row.original.contactPhone} />
          <CopyButton value={row.original.contactEmail} />
        </div>
      ),
    },
    {
      id: "properties",
      header: "Properties",
      cell: ({ row }) => {
        const propertyCount = Number(
          row.original.application?.propertiesRooms ?? 0
        )

        return `${propertyCount} ${pluralize(propertyCount, "Property")}`
      },
    },
    {
      id: "submitted",
      header: "Submitted",
      cell: ({ row }) => formatRelative(row.original.createdAt),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge
          status={row.original.currentStatus}
          statusMap={STATUS_MAP}
        />
      ),
    },
  ]
