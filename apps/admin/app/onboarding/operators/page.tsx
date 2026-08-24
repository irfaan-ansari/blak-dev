import React from "react"
import OperatorClient from "@/features/onboarding/operator/components/partner-client"
import { Button } from "@blak/ui/components/button"
import { Plus } from "lucide-react"

const OperatorsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Oprator Applications</h1>
        <Button prefix={<Plus />}>Invite Operator</Button>
      </div>
      <OperatorClient />
    </div>
  )
}

export default OperatorsPage
