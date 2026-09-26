import { cn } from "@blak/ui/lib/utils"
import { Badge } from "@blak/ui/components/badge"
import type { StatusConfig } from "../shared.type"

export type StatusBadgeMap<K extends string = string> = Record<K, StatusConfig>

export interface StatusBadgeProps<K extends string> {
  status: K
  statusMap: StatusBadgeMap<K>
  className?: string
}

export function StatusBadge<K extends string>({
  status,
  statusMap,
  className,
}: StatusBadgeProps<K>) {
  const config = statusMap[status]

  return (
    <Badge
      variant="outline"
      className={cn("h-6 px-2", config?.className, className)}
    >
      {config?.label ?? status}
    </Badge>
  )
}
