"use client"

import { DataTable } from "@blak/ui/components/data-table"
import { usePartners } from "../partner.data"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { partnerColumns } from "./partner-columns"

export const PartnerClient = () => {
  const { searchParamsObj } = useRouterStuff()
  const query = usePartners(searchParamsObj)
  const pagination = query.data?.pagination

  return (
    <DataTable
      columns={partnerColumns}
      data={query.data?.data ?? []}
      getRowId={(partner) => partner.id}
      isLoading={query.isPending}
      error={{
        isError: query.isError,
        title: query.error?.message,
        description: query.error?.details,
      }}
      empty={{
        isEmpty: query.data?.data.length === 0,
        title: "No partners found",
        description: "There are no partners to display.",
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
