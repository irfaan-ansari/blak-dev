import { Operator, OperatorWithDocuments } from "./operator.type"
import { useQuery } from "@tanstack/react-query"

import { ApiResponse, PaginatedResponse } from "@/features/shared/shared.type"
import { apiClient } from "@/lib/api-client"
import { AppError } from "@blak/utils"

export const useOperators = (params?: Record<string, any>) => {
  return useQuery<PaginatedResponse<Operator>, AppError>({
    queryKey: ["operators", params],
    queryFn: () =>
      apiClient.get("/operators", {
        params,
      }),
  })
}
export const useOperator = (id: string) => {
  return useQuery<ApiResponse<OperatorWithDocuments>, AppError>({
    queryKey: ["operator", id],
    queryFn: () => apiClient.get(`/operators/${id}`),
  })
}
