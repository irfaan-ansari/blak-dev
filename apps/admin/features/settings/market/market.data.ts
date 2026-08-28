import { apiClient } from "@/lib/api-client"
import { City, Country, State } from "@blak/db"
import { useQuery } from "@tanstack/react-query"
import { PaginatedResponse } from "@/features/shared/shared.type"
import { type AppError } from "@blak/utils"

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

export const useCountryStates = () => {
  return useQuery<PaginatedResponse<State>, AppError>({
    queryKey: ["states"],
    queryFn: async () => {
      const response =
        await apiClient.get<PaginatedResponse<State>>("/countries")

      return response
    },
    staleTime: 1000 * 60 * 60,
  })
}
export const useStateCities = () => {
  return useQuery<PaginatedResponse<City>, AppError>({
    queryKey: ["cities"],
    queryFn: async () => {
      const response =
        await apiClient.get<PaginatedResponse<City>>("/countries")

      return response
    },
    staleTime: 1000 * 60 * 60,
  })
}
