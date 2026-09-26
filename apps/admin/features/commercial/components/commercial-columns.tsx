"use client"

import type { DataTableColumnDef } from "@blak/ui/components/data-table"

export const serviceColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "service", header: "Service" },
  { id: "market", header: "Market" },
  { id: "category", header: "Category" },
  { id: "status", header: "Status" },
  { id: "actions", header: "" },
]

export const pricingColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "rule", header: "Pricing Rule" },
  { id: "service", header: "Service" },
  { id: "market", header: "Market" },
  { id: "baseFare", header: "Base Fare" },
  { id: "status", header: "Status" },
  { id: "actions", header: "" },
]

export const taxFeeColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "name", header: "Tax / Fee" },
  { id: "market", header: "Market" },
  { id: "type", header: "Type" },
  { id: "amount", header: "Amount" },
  { id: "status", header: "Status" },
  { id: "actions", header: "" },
]

export const promotionColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "promotion", header: "Promotion" },
  { id: "code", header: "Code" },
  { id: "market", header: "Market" },
  { id: "validity", header: "Validity" },
  { id: "status", header: "Status" },
  { id: "actions", header: "" },
]
