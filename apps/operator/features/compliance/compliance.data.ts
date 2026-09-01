import { type AppError } from "@blak/utils"
import { apiClient } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"
import { PaginatedResponse } from "@/features/shared/shared.type"
import { Compliance } from "./compliance.type"

export const useCompliance = (enabled: boolean) => {
  return useQuery<PaginatedResponse<Compliance>, AppError>({
    queryKey: ["compliance"],
    queryFn: async () => {
      const response =
        await apiClient.get<PaginatedResponse<Compliance>>("/compliance")
      console.log(response)
      return response
    },
    staleTime: 1000 * 60 * 60,
    enabled,
  })
}
