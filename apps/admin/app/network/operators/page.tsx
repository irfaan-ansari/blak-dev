import React from "react"
import { ChevronDown, ListFilter, Plus } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { OperatorClient } from "@/features/network/operator/components/operator-client"

const OperatorsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Operators</h1>
        <Button variant="outline" size="lg" suffix={<ChevronDown />}>
          Status
        </Button>
        <Button variant="outline" size="lg" prefix={<ListFilter />}>
          Sort By
        </Button>
      </div>
      <OperatorClient />
    </div>
  )
}

export default OperatorsPage
