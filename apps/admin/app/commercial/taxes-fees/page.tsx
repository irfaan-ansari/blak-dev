import { EmptyTablePage } from "@/features/shared/components/empty-table-page"
import { taxFeeColumns } from "@/features/commercial/components/commercial-columns"

const TaxesFeesPage = () => (
  <EmptyTablePage
    title="Taxes & Fees"
    columns={taxFeeColumns}
    emptyTitle="No taxes or fees configured"
    emptyDescription="Market taxes, surcharges, and service fees will appear here."
  />
)

export default TaxesFeesPage
