import { EmptyTablePage } from "@/features/shared/components/empty-table-page"
import { serviceColumns } from "@/features/commercial/components/commercial-columns"

const ServicesPage = () => (
  <EmptyTablePage
    title="Services"
    columns={serviceColumns}
    emptyTitle="No services configured"
    emptyDescription="Service products and availability rules will appear here."
  />
)

export default ServicesPage
