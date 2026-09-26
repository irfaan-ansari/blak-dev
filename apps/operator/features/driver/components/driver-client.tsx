"use client"

import { DataTable } from "@blak/ui/components/data-table"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { useDrivers } from "../driver.data"
import { driverColumns } from "./driver-columns"

export const DriverClient = () => {
  const { searchParams } = useRouterStuff()
  const requestedPage = Number(searchParams.get("page") ?? 1)
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const { data, isPending, isError, error } = useDrivers(page)

  return (
    <div className="space-y-6">
      <DataTable
        columns={driverColumns}
        data={data?.data ?? []}
        getRowId={(driver) => driver.id}
        isLoading={isPending}
        empty={{
          title: "No drivers found",
          description: "You don't have any drivers yet.",
        }}
        error={{ isError, title: error?.message, description: error?.details }}
        pagination={
          data?.pagination && data.pagination.total > 0
            ? {
                page: data.pagination.page,
                limit: data.pagination.pageSize,
                total: data.pagination.total,
                totalPages: data.pagination.pageCount,
              }
            : undefined
        }
      />
    </div>
  )
}
