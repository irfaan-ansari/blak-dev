import { cn } from "@blak/ui/lib/utils"
import { Skeleton } from "@blak/ui/components//skeleton"

type QueryStateProps = {
  isPending: boolean
  isError: boolean
  error?: Error | null
  isEmpty?: boolean
  children: React.ReactNode
  className?: string
}

export function QueryState({
  isPending,
  isError,
  isEmpty,
  error,
  className,
  children,
}: QueryStateProps) {
  if (isPending) {
    return (
      <div className={cn("space-y-1", className)}>
        <Skeleton className="h-9" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        Failed to load.
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        No Result Found.
      </div>
    )
  }

  return children
}
