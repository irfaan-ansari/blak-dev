"use client"

import { DataTable } from "@blak/ui/components/data-table"
import { usePartnerApplications } from "../partner.data"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { partnerApplicationColumns } from "./partner-columns"

export const PartnerClient = () => {
  const { searchParamsObj } = useRouterStuff()
  const query = usePartnerApplications(searchParamsObj)
  const pagination = query.data?.pagination

  return (
    <DataTable
      columns={partnerApplicationColumns}
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
        title: "No partner applications found",
        description: "There are no partner applications to review.",
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
