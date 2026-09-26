"use client"

import { DataTable } from "@blak/ui/components/data-table"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { useVehicles } from "../vehicle.data"
import { vehicleColumns } from "./vehicle-columns"

const VehicleClient = () => {
  const { searchParams } = useRouterStuff()
  const requestedPage = Number(searchParams.get("page") ?? 1)
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const { data, isPending, isError, error } = useVehicles(page)

  return (
    <div className="space-y-6">
      <DataTable
        columns={vehicleColumns}
        data={data?.data ?? []}
        getRowId={(vehicle) => vehicle.id}
        isLoading={isPending}
        empty={{
          title: "No vehicles found",
          description: "You don't have any vehicles yet.",
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

export default VehicleClient
