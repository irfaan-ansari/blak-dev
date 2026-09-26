"use client"

import { DataTable } from "@blak/ui/components/data-table"
import { useVehicles } from "../vehicle.data"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { vehicleColumns } from "./vehicle-columns"

export const VehicleClient = () => {
  const { searchParamsObj } = useRouterStuff()
  const query = useVehicles(searchParamsObj)
  const pagination = query.data?.pagination

  return (
    <DataTable
      columns={vehicleColumns}
      data={query.data?.data ?? []}
      getRowId={(vehicle) => vehicle.id}
      isLoading={query.isPending}
      error={{
        isError: query.isError,
        title: query.error?.message,
        description: query.error?.details,
      }}
      empty={{
        isEmpty: query.data?.data.length === 0,
        title: "No vehicles found",
        description: "There are no vehicles to display.",
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
