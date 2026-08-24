import { Operator } from "./operator.type"
import { useQuery } from "@tanstack/react-query"
import { apiClient, AppError } from "@blak/utils"
import { PaginatedResponse } from "@/features/shared/shared.type"

export const useOperators = () => {
  return useQuery<PaginatedResponse<Operator>, AppError>({
    queryKey: ["operators"],
    queryFn: () => apiClient.get("/v1/operators"),
  })
}
