import * as React from "react"
import { cn } from "@blak/ui/lib/utils"
import { Badge } from "@blak/ui/components/badge"

import { StatusConfig } from "../shared.type"

export type StatusBadgeMap<K extends string = string> = Record<K, StatusConfig>

export interface StatusBadgeProps<K extends string> {
  status: K
  statusMap: StatusBadgeMap<K>
  showIcon?: boolean
  className?: string
}

export function StatusBadge<K extends string>({
  status,
  statusMap,
  showIcon = true,
  className,
}: StatusBadgeProps<K>) {
  const config = statusMap[status]

  if (!config) {
    return (
      <Badge variant="outline" className={cn("h-7 px-2", className)}>
        {status}
      </Badge>
    )
  }

  const { label, icon: Icon, className: configClass } = config

  return (
    <Badge
      variant="outline"
      className={cn("h-7 px-2.5", configClass, className)}
    >
      {showIcon && Icon && <Icon className="size-3.5" />}
      {label}
    </Badge>
  )
}
