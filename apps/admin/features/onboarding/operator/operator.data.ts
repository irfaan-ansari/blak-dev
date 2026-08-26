import { PaginatedResponse } from "@/features/shared/shared.type"
import { useQuery } from "@tanstack/react-query"
import { OperatorApplication } from "./operator.type"
import { apiClient } from "@/lib/api-client"
import { AppError } from "@blak/utils/error"

export const useOperatorApplications = () => {
  return useQuery<PaginatedResponse<OperatorApplication>, AppError>({
    queryKey: ["operator-applications"],
    queryFn: () => apiClient.get("/application/operators"),
  })
}
