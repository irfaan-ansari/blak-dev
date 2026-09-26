"use client"

import React from "react"
import {
  tableFeatures,
  useTable,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table"
import { Skeleton } from "@blak/ui/components/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@blak/ui/components/table"
import { EmptyState, ErrorState } from "@blak/ui/components/blak/empty-state"
import { Pagination } from "@blak/ui/components/blak/pagination"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"

export const dataTableFeatures = tableFeatures({})
export type DataTableFeatures = typeof dataTableFeatures
export type DataTableColumnDef<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData
>

export type DataTablePagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

type DataTableProps<TData extends RowData> = {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  pagination?: DataTablePagination | undefined
  getRowId?: (row: TData) => string
  empty?: {
    isEmpty?: boolean
    title: string | undefined
    description?: string | undefined
  }
  error?: {
    isError: boolean
    title: string | undefined
    description?: string | undefined
  }
  isLoading?: boolean
  className?: string
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  pagination,
  getRowId,
  empty,
  error,
  isLoading = false,
  className,
}: DataTableProps<TData>) {
  const { queryParams } = useRouterStuff()
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    getRowId,
  })

  const rows = table.getRowModel().rows

  return (
    <React.Fragment>
      <div className="h-full">
        <Table className={className}>
          <TableHeader className="bg-neutral-100">
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id} className="hover:bg-transparent">
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 border-b-2 border-primary/50 px-3 py-4 text-xs font-semibold tracking-wide uppercase"
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index} className="hover:bg-transparent">
                  {columns.map((_, columnIndex) => (
                    <TableCell key={columnIndex} className="py-4">
                      <Skeleton className="h-5 w-3/4" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : error?.isError ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="p-0">
                  <ErrorState
                    title={error.title ?? "Unable to load data"}
                    description={error.description ?? "Please try again."}
                  />
                </TableCell>
              </TableRow>
            ) : rows.length && !empty?.isEmpty ? (
              rows.map((row) => (
                <TableRow key={row.id} className="relative hover:bg-muted/50">
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3">
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-sm text-muted-foreground"
                >
                  <EmptyState
                    title={empty?.title ?? "No results found."}
                    description={
                      empty?.description ??
                      "Try adjusting your search or filters."
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {pagination && !isLoading && !error?.isError && (
            <TableFooter>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={table.getAllLeafColumns().length}
                  className="p-0"
                >
                  <Pagination
                    className="static m-0 max-w-none rounded-none border-0 bg-transparent font-normal shadow-none backdrop-blur-none"
                    page={pagination.page}
                    total={pagination.total}
                    pageSize={pagination.limit}
                    pageCount={pagination.totalPages}
                    onPageChange={(page) =>
                      queryParams({
                        set: { page: String(page) },
                        scroll: false,
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </React.Fragment>
  )
}
