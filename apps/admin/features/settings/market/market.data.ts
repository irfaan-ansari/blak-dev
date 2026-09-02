import { City, Country, Currency, State } from "@blak/db"
import { apiClient } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"
import { PaginatedResponse } from "@/features/shared/shared.type"
import { type AppError } from "@blak/utils"
import { MarketWithRelations } from "./market.type"

export const useMarkets = () => {
  return useQuery<PaginatedResponse<MarketWithRelations>, AppError>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response =
        await apiClient.get<PaginatedResponse<MarketWithRelations>>("/markets")
      console.log(response)
      return response
    },
    staleTime: 1000 * 60 * 60,
  })
}

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

export const useCurrencies = () => {
  return useQuery<PaginatedResponse<Currency>, AppError>({
    queryKey: ["currencies"],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Currency>>(
        "/countries/currencies"
      )

      return response
    },
    staleTime: 1000 * 60 * 60,
  })
}

export const useCountryStates = (countryId: string) => {
  return useQuery<PaginatedResponse<State>, AppError>({
    queryKey: ["states", countryId],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<State>>(
        `/countries/${countryId}/states`
      )

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
