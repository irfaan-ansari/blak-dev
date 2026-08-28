import { Button } from "@blak/ui/components/button"
import { LucideIcon } from "lucide-react"

export interface Pagination {
  page: number
  pageSize: number
  total: number
  pageCount: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination
}

export interface StatusConfig {
  label: string
  icon?: LucideIcon
  className: string
}

export interface StatusActionConfig {
  label: string
  variant?: React.ComponentProps<typeof Button>["variant"]
  icon?: LucideIcon
  action: string
}
