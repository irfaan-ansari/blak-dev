"use client"
import React from "react"

import { OperatorCard } from "./operator-card"
import { useOperators } from "../operator.data"
import { QueryBoundary } from "@/components/query-boundry"
import { Pagination } from "@blak/ui/components/blak/pagination"
// import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"

export const OperatorClient = () => {
  // const { queryParams } = useRouterStuff()
  const query = useOperators()

  return (
    <QueryBoundary query={query} isEmpty={query.data?.data?.length === 0}>
      {(data) => (
        <>
          <div className="space-y-2">
            {data?.data.map((app) => (
              <OperatorCard data={app} key={app.id} />
            ))}
          </div>
          <Pagination
            page={data?.pagination.page}
            pageSize={data?.pagination.pageSize}
            pageCount={data?.pagination.pageCount}
            total={data?.pagination.total}
            onPageChange={(page) => {
              // queryParams({ set: { page: page.toString() } })
            }}
          />
        </>
      )}
    </QueryBoundary>
  )
}
