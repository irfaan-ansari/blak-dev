import { Button } from "@blak/ui/components/button"
import { cn } from "@blak/ui/lib/utils"

interface PaginationProps {
  page: number
  pageSize: number
  pageCount: number
  total: number
  onPageChange: (page: number) => void
  className?: string
}

export const Pagination = ({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
  className,
}: PaginationProps) => {
  const start = total === 0 ? 0 : Math.min((page - 1) * pageSize + 1, total)
  const end = Math.min(page * pageSize, total)

  return (
    <div
      className={cn(
        "sticky bottom-4 z-2 mx-auto mt-auto flex min-h-16 w-full max-w-2xl items-center justify-between rounded-lg border-2 bg-background p-3 text-sm text-muted-foreground shadow-lg backdrop-blur-2xl",
        className
      )}
    >
      <span>
        Showing {start}–{end} of {total}
      </span>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Number(page) + 1)}
          disabled={page >= pageCount || pageCount === 0}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
