export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination
}
