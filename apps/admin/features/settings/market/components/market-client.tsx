"use client"

import { DataTable } from "@blak/ui/components/data-table"
import { marketColumns } from "./market-columns"
import { useMarkets } from "../market.data"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"

export const MarketClient = () => {
  const { searchParams } = useRouterStuff()
  const requestedPage = Number(searchParams.get("page") ?? 1)
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1
  const { data, isPending, isError, error } = useMarkets(page)

  return (
    <DataTable
      columns={marketColumns}
      data={data?.data ?? []}
      getRowId={(market) => market.id}
      isLoading={isPending}
      error={{ isError, title: error?.message, description: error?.details }}
      empty={{
        title: "No markets found",
        description: "Add a market to get started.",
      }}
      pagination={
        data?.pagination
          ? {
              page: data.pagination.page,
              limit: data.pagination.pageSize,
              total: data.pagination.total,
              totalPages: data.pagination.pageCount,
            }
          : undefined
      }
    />
  )
}
