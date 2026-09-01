import { AppError } from "@blak/utils"
import { apiClient } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"
import { OperatorAccount } from "./account.type"
import { ApiResponse, PaginatedResponse } from "../shared/shared.type"

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
