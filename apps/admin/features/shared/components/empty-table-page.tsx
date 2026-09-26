import { DataTable } from "@blak/ui/components/data-table"
import type { DataTableColumnDef } from "@blak/ui/components/data-table"

type EmptyTablePageProps = {
  title: string
  columns: DataTableColumnDef<{ id: string }>[]
  emptyTitle: string
  emptyDescription: string
}

export function EmptyTablePage({
  title,
  columns,
  emptyTitle,
  emptyDescription,
}: EmptyTablePageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">{title}</h1>
      </div>

      <DataTable
        columns={columns}
        data={[]}
        empty={{
          title: emptyTitle,
          description: emptyDescription,
        }}
      />
    </div>
  )
}
