import { type AppError } from "@blak/utils"
import { apiClient } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"
import { PaginatedResponse } from "@/features/shared/shared.type"
import { Compliance } from "./compliance.type"

export const useCompliance = (entity: string) => {
  return useQuery<PaginatedResponse<Compliance>, AppError>({
    queryKey: ["compliance"],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Compliance>>(
        `/compliance`,
        {
          params: {
            entity,
          },
        }
      )
      console.log(response)
      return response
    },
    staleTime: 1000 * 60 * 60,
  })
}
