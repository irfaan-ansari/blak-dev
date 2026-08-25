import { useQuery } from "@tanstack/react-query"
import { ApiResponse, PaginatedResponse } from "../shared/shared.type"
import { apiClient, AppError } from "@blak/utils"
import { OperatorAccount } from "./account.type"

export const useAccounts = () => {
  return useQuery<PaginatedResponse<OperatorAccount[]>, AppError>({
    queryKey: ["accounts"],
    queryFn: () => apiClient.get("/v1/operator/accounts"),
  })
}

export const useAccount = () => {
  return useQuery<ApiResponse<OperatorAccount>, AppError>({
    queryKey: ["account"],
    queryFn: () => apiClient.get("/v1/operator/accounts/active"),
  })
}
