import { EmptyTablePage } from "@/features/shared/components/empty-table-page"
import { payoutColumns } from "@/features/finance/components/finance-columns"

const PayoutsPage = () => (
  <EmptyTablePage
    title="Payouts"
    columns={payoutColumns}
    emptyTitle="No payouts found"
    emptyDescription="Operator and partner payouts will appear here once processed."
  />
)

export default PayoutsPage
