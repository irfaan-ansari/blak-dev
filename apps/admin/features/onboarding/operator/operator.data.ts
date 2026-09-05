import { ApiResponse, PaginatedResponse } from "@/features/shared/shared.type"
import { useQuery } from "@tanstack/react-query"
import { OperatorApplication } from "./operator.type"
import { apiClient } from "@/lib/api-client"
import { AppError } from "@blak/utils/error"

export const useOperatorApplications = (params?: Record<string, any>) => {
  return useQuery<PaginatedResponse<OperatorApplication>, AppError>({
    queryKey: ["operator-applications", params],
    queryFn: () => apiClient.get("/application/operators", { params }),
  })
}
export const useOperatorApplication = (id: string) => {
  return useQuery<ApiResponse<OperatorApplication>, AppError>({
    queryKey: ["operator-application", id],
    queryFn: () => apiClient.get(`/application/operators/${id}`),
  })
}
