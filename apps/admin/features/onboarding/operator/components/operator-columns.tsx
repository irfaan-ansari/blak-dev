"use client"

import Link from "next/link"
import { Button } from "@blak/ui/components/button"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import type { DataTableColumnDef } from "@blak/ui/components/data-table"
import { pluralize } from "@blak/utils/string"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "../operator.const"
import type { OperatorApplication } from "../operator.type"
import { OperatorAction } from "./operator-action"

export const operatorApplicationColumns: DataTableColumnDef<OperatorApplication>[] =
  [
    {
      id: "business",
      header: "Business",
      cell: ({ row }) => {
        const application = row.original.application

        return (
          <div className="grid gap-1 py-2">
            <Link
              href={`/onboarding/operators/${row.original.id}`}
              className="font-semibold hover:underline"
            >
              {application?.legalBusinessName ?? "Untitled application"}
            </Link>
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
      id: "vehicles",
      header: "Vehicles",
      cell: ({ row }) => {
        const vehicleCount = row.original.application?.vehicleCount ?? 0

        return `${vehicleCount} ${pluralize(vehicleCount, "Vehicle")}`
      },
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
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/onboarding/operators/${row.original.id}`}>View</Link>
          </Button>
          <OperatorAction data={row.original} />
        </div>
      ),
    },
  ]
