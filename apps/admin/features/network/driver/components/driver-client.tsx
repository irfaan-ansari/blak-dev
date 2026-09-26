"use client"

import { DataTable } from "@blak/ui/components/data-table"
import { useDrivers } from "../driver.data"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { driverColumns } from "./driver-columns"

export const DriverClient = () => {
  const { searchParamsObj } = useRouterStuff()
  const query = useDrivers(searchParamsObj)
  const pagination = query.data?.pagination

  return (
    <DataTable
      columns={driverColumns}
      data={query.data?.data ?? []}
      getRowId={(driver) => driver.id}
      isLoading={query.isPending}
      error={{
        isError: query.isError,
        title: query.error?.message,
        description: query.error?.details,
      }}
      empty={{
        isEmpty: query.data?.data.length === 0,
        title: "No drivers found",
        description: "There are no drivers to display.",
      }}
      pagination={
        pagination && {
          page: pagination.page,
          limit: pagination.pageSize,
          total: pagination.total,
          totalPages: pagination.pageCount,
        }
      }
    />
  )
}
