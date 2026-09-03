"use client"

import React from "react"
import { MarketCard } from "./market-card"
import { useMarkets } from "../market.data"
import { QueryBoundary } from "@/components/query-boundry"
import { Pagination } from "@blak/ui/components/blak/pagination"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"

export const MarketClient = () => {
  const { queryParams } = useRouterStuff()
  const query = useMarkets()

  return (
    <QueryBoundary query={query} isEmpty={query.data?.data.length === 0}>
      {(data) => (
        <>
          <div className="space-y-2">
            {data.data.map((market) => (
              <MarketCard key={market.id} data={market} />
            ))}
          </div>
          <Pagination
            page={data?.pagination.page}
            pageSize={data?.pagination.pageSize}
            pageCount={data?.pagination.pageCount}
            total={data?.pagination.total}
            onPageChange={(page) =>
              queryParams({ set: { page: page.toString() } })
            }
          />
        </>
      )}
    </QueryBoundary>
  )
}
