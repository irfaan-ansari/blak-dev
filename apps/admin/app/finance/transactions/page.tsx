import { EmptyTablePage } from "@/features/shared/components/empty-table-page"
import { transactionColumns } from "@/features/finance/components/finance-columns"

const TransactionsPage = () => (
  <EmptyTablePage
    title="Transactions"
    columns={transactionColumns}
    emptyTitle="No transactions found"
    emptyDescription="Payments, adjustments, and ledger activity will appear here."
  />
)

export default TransactionsPage
