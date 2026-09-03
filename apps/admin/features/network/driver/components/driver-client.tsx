"use client"

import React from "react"

import { QueryBoundary } from "@/components/query-boundry"
import { DriverCard } from "./driver-card"
import { useDrivers } from "../driver.data"

export const DriverClient = () => {
  const query = useDrivers()
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
