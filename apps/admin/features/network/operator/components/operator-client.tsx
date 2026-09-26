"use client"

import { DataTable } from "@blak/ui/components/data-table"
import { useOperators } from "../operator.data"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { operatorColumns } from "./operator-columns"

export const OperatorClient = () => {
  const { searchParamsObj } = useRouterStuff()
  const query = useOperators(searchParamsObj)
  const pagination = query.data?.pagination

  return (
    <DataTable
      columns={operatorColumns}
      data={query.data?.data ?? []}
      getRowId={(operator) => operator.id}
      isLoading={query.isPending}
      error={{
        isError: query.isError,
        title: query.error?.message,
        description: query.error?.details,
      }}
      empty={{
        isEmpty: query.data?.data.length === 0,
        title: "No operators found",
        description: "There are no operators to display.",
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
