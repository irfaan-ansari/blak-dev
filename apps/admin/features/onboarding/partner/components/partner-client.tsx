"use client"

import React from "react"
import { PartnerCard } from "./partner-card"
import { usePartnerApplications } from "../partner.data"
import { QueryBoundary } from "@/components/query-boundry"
import { Pagination } from "@blak/ui/components/blak/pagination"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"

export const PartnerClient = () => {
  const { queryParams } = useRouterStuff()
  const query = usePartnerApplications()

  return (
    <QueryBoundary query={query} isEmpty={query.data?.data.length === 0}>
      {(data) => (
        <>
          <div className="space-y-2">
            {data.data.map((app) => (
              <PartnerCard data={app} key={app.id} />
            ))}
          </div>
          <Pagination
            page={data?.pagination.page}
            pageSize={data?.pagination.pageSize}
            pageCount={data?.pagination.pageCount}
            total={data?.pagination.total}
            onPageChange={(page) => {
              queryParams({ set: { page: page.toString() } })
            }}
          />
        </>
      )}
    </QueryBoundary>
  )
}
