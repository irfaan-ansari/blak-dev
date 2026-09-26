"use client"

import type { DataTableColumnDef } from "@blak/ui/components/data-table"

export const payoutColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "payout", header: "Payout" },
  { id: "recipient", header: "Recipient" },
  { id: "amount", header: "Amount" },
  { id: "scheduledAt", header: "Scheduled At" },
  { id: "status", header: "Status" },
  { id: "actions", header: "" },
]

export const invoiceColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "invoice", header: "Invoice" },
  { id: "account", header: "Account" },
  { id: "amount", header: "Amount" },
  { id: "dueDate", header: "Due Date" },
  { id: "status", header: "Status" },
  { id: "actions", header: "" },
]

export const transactionColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "transaction", header: "Transaction" },
  { id: "account", header: "Account" },
  { id: "type", header: "Type" },
  { id: "amount", header: "Amount" },
  { id: "processedAt", header: "Processed At" },
  { id: "status", header: "Status" },
]
