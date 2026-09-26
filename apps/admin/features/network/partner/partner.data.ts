import { Partner } from "./partner.type"
import { useQuery } from "@tanstack/react-query"

import { PaginatedResponse } from "@/features/shared/shared.type"
import { apiClient } from "@/lib/api-client"
import { AppError } from "@blak/utils"

export const usePartners = (params?: Record<string, any>) => {
  return useQuery<PaginatedResponse<Partner>, AppError>({
    queryKey: ["partners", params],
    queryFn: () => apiClient.get("/partners", { params }),
  })
}
