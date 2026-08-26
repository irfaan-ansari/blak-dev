import { useQuery } from "@tanstack/react-query"
import { ApiResponse, PaginatedResponse } from "../shared/shared.type"
import { AppError } from "@blak/utils"
import { OperatorAccount } from "./onboarding.type"
import { apiClient } from "@/lib/api-client"

export const useAccounts = () => {
  return useQuery<PaginatedResponse<OperatorAccount[]>, AppError>({
    queryKey: ["accounts"],
    queryFn: () => apiClient.get("/accounts"),
  })
}

export const useAccount = () => {
  return useQuery<ApiResponse<OperatorAccount>, AppError>({
    queryKey: ["account"],
    queryFn: () => apiClient.get("/accounts/active"),
  })
}
