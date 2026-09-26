import React from "react"
import { OperatorClient } from "@/features/onboarding/operator/components/operator-client"

const OperatorsPage = async () => {
  return (
    <React.Fragment>
      <h1 className="text-xl font-bold">Operator Applications</h1>
      <OperatorClient />
    </React.Fragment>
  )
}

export default OperatorsPage
