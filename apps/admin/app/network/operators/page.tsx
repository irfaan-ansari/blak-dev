"use client"
import React from "react"
import { ListFilter } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { OperatorClient } from "@/features/network/operator/components/operator-client"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { STATUS_MAP } from "@/features/network/operator/operator.const"

const OperatorsPage = () => {
  const { queryParams, searchParamsObj } = useRouterStuff()
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Operators</h1>

        <DropDrawer
          trigger={
            <Button
              variant="outline"
              className="w-44 justify-start truncate"
              size="sm"
              prefix={<ListFilter />}
            >
              {STATUS_MAP[searchParamsObj.status as keyof typeof STATUS_MAP]
                ?.label ?? "All"}
            </Button>
          }
          className="*:justify-start"
        >
          <Button
            variant="ghost"
            onClick={() => queryParams({ set: { status: "" } })}
          >
            All
          </Button>
          <Button
            variant="ghost"
            onClick={() => queryParams({ set: { status: "ACTIVE" } })}
          >
            Active
          </Button>
          <Button
            variant="ghost"
            onClick={() => queryParams({ set: { status: "ONBOARDING" } })}
          >
            Invited
          </Button>
          <Button
            variant="ghost"
            onClick={() => queryParams({ set: { status: "ACCOUNT_CREATED" } })}
          >
            Account Created
          </Button>
          <Button
            variant="ghost"
            onClick={() => queryParams({ set: { status: "PENDING_APPROVAL" } })}
          >
            Documents Submitted
          </Button>
        </DropDrawer>

        <Button variant="outline" size="lg" prefix={<ListFilter />}>
          Sort By
        </Button>
      </div>
      <OperatorClient />
    </div>
  )
}

export default OperatorsPage
