import { OperatorClient } from "@/features/network/operator/components/operator-client"
import { STATUS_MAP } from "@/features/network/operator/operator.const"
import { StatusFilter } from "@/features/shared/components/status-filter"

const operatorStatusOptions = Object.entries(STATUS_MAP).map(
  ([value, config]) => ({
    value,
    label: config.label,
  })
)

const OperatorsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Operators</h1>
        <StatusFilter options={operatorStatusOptions} />
      </div>
      <OperatorClient />
    </div>
  )
}

export default OperatorsPage
