import { EmptyTablePage } from "@/features/shared/components/empty-table-page"
import { pricingColumns } from "@/features/commercial/components/commercial-columns"

const PricingPage = () => (
  <EmptyTablePage
    title="Pricing"
    columns={pricingColumns}
    emptyTitle="No pricing rules configured"
    emptyDescription="Fare rules, market pricing, and service rates will appear here."
  />
)

export default PricingPage
