type PaginationQuery = {
  page?: string | number
  limit?: string | number
}

const DEFAULT_LIMIT = 24

export function parsePagination({ page, limit }: PaginationQuery) {
  const pageNum = Math.max(Number(page) || 1, 1)
  const take = Math.min(Number(limit) || DEFAULT_LIMIT, DEFAULT_LIMIT)
  const skip = (pageNum - 1) * take

  return { page: pageNum, take, skip }
}
