import { useQuery } from "@tanstack/react-query"
import { ApiResponse } from "../shared/shared.type"
import { apiClient } from "@/lib/api-client"
import { AppError } from "@blak/utils"

export const useAnalytics = () => {
  return useQuery<ApiResponse<any>, AppError>({
    queryKey: ["analytics"],
    queryFn: () => apiClient.get("/analytics"),
  })
}
