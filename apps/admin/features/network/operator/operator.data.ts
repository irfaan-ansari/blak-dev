import { Operator } from "./operator.type"
import { useQuery } from "@tanstack/react-query"

import { PaginatedResponse } from "@/features/shared/shared.type"
import { apiClient } from "@/lib/api-client"
import { AppError } from "@blak/utils"

export const useOperators = () => {
  return useQuery<PaginatedResponse<Operator>, AppError>({
    queryKey: ["operators"],
    queryFn: () => apiClient.get("/operators"),
  })
}
