import { EmptyTablePage } from "@/features/shared/components/empty-table-page"
import { invoiceColumns } from "@/features/finance/components/finance-columns"

const InvoicingPage = () => (
  <EmptyTablePage
    title="Invoicing"
    columns={invoiceColumns}
    emptyTitle="No invoices found"
    emptyDescription="Invoices and billing records will appear here."
  />
)

export default InvoicingPage
