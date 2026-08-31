import { City } from "@blak/db"
import { apiClient } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"
import { PaginatedResponse } from "@/features/shared/shared.type"
import { type AppError } from "@blak/utils"
import { CountryWithStateCount, StateWithCityCount } from "./market.type"

export const useCountries = () => {
  return useQuery<PaginatedResponse<CountryWithStateCount>, AppError>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response =
        await apiClient.get<PaginatedResponse<CountryWithStateCount>>(
          "/countries"
        )

      return response
    },
    staleTime: 1000 * 60 * 60,
  })
}

export const useCountryStates = (countryId: string) => {
  return useQuery<PaginatedResponse<StateWithCityCount>, AppError>({
    queryKey: ["states", countryId],
    queryFn: async () => {
      const response = await apiClient.get<
        PaginatedResponse<StateWithCityCount>
      >(`/countries/${countryId}/states`)

      return response
    },
    staleTime: 1000 * 60 * 60,
  })
}
export const useStateCities = (stateId: string) => {
  return useQuery<PaginatedResponse<City>, AppError>({
    queryKey: ["cities", stateId],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<City>>(
        `/countries/states/${stateId}/cities`
      )

      return response
    },
    staleTime: 1000 * 60 * 60,
  })
}
