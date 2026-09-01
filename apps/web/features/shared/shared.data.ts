import { apiClient } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"
import { PaginatedResponse } from "./shared.type"
import { AppError } from "@blak/utils/error"
import { Country } from "@blak/db"

export const useCountries = () => {
  return useQuery<PaginatedResponse<Country>, AppError>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response =
        await apiClient.get<PaginatedResponse<Country>>("/countries")

      return response
    },
    staleTime: 1000 * 60 * 60,
  })
}
