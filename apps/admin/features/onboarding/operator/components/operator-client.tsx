"use client"

import { DataTable } from "@blak/ui/components/data-table"
import { useOperatorApplications } from "../operator.data"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { operatorApplicationColumns } from "./operator-columns"

export const OperatorClient = () => {
  const { searchParamsObj } = useRouterStuff()
  const query = useOperatorApplications(searchParamsObj)
  const pagination = query.data?.pagination

  return (
    <DataTable
      columns={operatorApplicationColumns}
      data={query.data?.data ?? []}
      getRowId={(application) => application.id}
      isLoading={query.isPending}
      error={{
        isError: query.isError,
        title: query.error?.message,
        description: query.error?.details,
      }}
      empty={{
        isEmpty: query.data?.data.length === 0,
        title: "No operator applications found",
        description: "There are no operator applications to review.",
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
