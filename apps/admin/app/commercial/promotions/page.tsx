import { EmptyTablePage } from "@/features/shared/components/empty-table-page"
import { promotionColumns } from "@/features/commercial/components/commercial-columns"

const PromotionsPage = () => (
  <EmptyTablePage
    title="Promotions"
    columns={promotionColumns}
    emptyTitle="No promotions configured"
    emptyDescription="Promotion codes and campaign rules will appear here."
  />
)

export default PromotionsPage
