"use client"

import { ReactNode } from "react"
import { UseQueryResult } from "@tanstack/react-query"
import {
  EmptyState,
  ErrorState,
  PageSkeleton,
} from "@blak/ui/components/blak/empty-state"
import type { AppError } from "@blak/utils"

type QueryBoundaryProps<T> = {
  query: UseQueryResult<T>
  children: (data: T) => ReactNode
  fetchingFallback?: ReactNode
  emptyFallback?: ReactNode
  isEmpty?: boolean
  error?: (error: AppError) => ReactNode
  loadingOnFetching?: boolean
  pagination?: boolean
}

export function QueryBoundary<T>({
  query,
  children,
  fetchingFallback,
  isEmpty,
  error,
  loadingOnFetching = false,
  pagination = false,
}: QueryBoundaryProps<T>) {
  const fetchingComponent = fetchingFallback ?? <PageSkeleton />

  if (query.isPending || (loadingOnFetching && query.isFetching)) {
    return <>{fetchingComponent}</>
  }

  if (query.isError) {
    return (
      error?.(query.error as AppError) ?? (
        <ErrorState
          title={query.error?.message}
          description={(query.error as AppError)?.details}
        />
      )
    )
  }

  if (isEmpty) {
    return (
      <EmptyState
        title="No data found"
        description="There is nothing to display."
      />
    )
  }

  return <>{children(query.data)}</>
}
