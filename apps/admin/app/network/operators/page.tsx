"use client"
import React from "react"
import { ChevronDown, ListFilter } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { OperatorClient } from "@/features/network/operator/components/operator-client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@blak/ui/components/select"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"

const OperatorsPage = () => {
  const { queryParams, searchParamsObj } = useRouterStuff()
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Operators</h1>

        <Select
          defaultValue={searchParamsObj.status || ""}
          onValueChange={(value) => {
            queryParams({ set: { status: value } })
          }}
        >
          <SelectTrigger className="w-full max-w-24">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="ONBOARDING">Invited</SelectItem>
            <SelectItem value="PENDING_APPROVAL">
              Documents Submitted
            </SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="lg" prefix={<ListFilter />}>
          Sort By
        </Button>
      </div>
      <OperatorClient />
    </div>
  )
}

export default OperatorsPage
