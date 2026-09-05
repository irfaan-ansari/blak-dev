"use client"

import React from "react"

import { QueryBoundary } from "@/components/query-boundry"
import { DriverCard } from "./driver-card"
import { useDrivers } from "../driver.data"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"

export const DriverClient = () => {
  const { searchParamsObj } = useRouterStuff()
  const query = useDrivers(searchParamsObj)

  return (
    <QueryBoundary query={query} isEmpty={query.data?.data.length === 0}>
      {(data) => (
        <div className="space-y-2">
          {data.data?.map((driver) => (
            <DriverCard key={driver.id} data={driver} />
          ))}
        </div>
      )}
    </QueryBoundary>
  )
}
