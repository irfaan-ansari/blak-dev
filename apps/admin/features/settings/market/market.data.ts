import { apiClient } from "@/lib/api-client"
import { City, Country, State } from "@blak/db"
import { useInfiniteQuery } from "@tanstack/react-query"
import { PaginatedResponse } from "@/features/shared/shared.type"

export const useCountries = () => {
  return useInfiniteQuery({
    queryKey: ["countries"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get<PaginatedResponse<Country[]>>(
        `/countries`,
        {
          params: {
            page: pageParam,
          },
        }
      )

      return response
    },

    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.pagination
      return page < pageCount ? page + 1 : undefined
    },
  })
}

export const useStates = (countryId: string) => {
  return useInfiniteQuery({
    queryKey: ["states", countryId],

    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get<PaginatedResponse<State[]>>(
        `/countries/${countryId}/states`,
        {
          params: {
            page: pageParam,
          },
        }
      )

      return response
    },

    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.pagination

      return page < pageCount ? page + 1 : undefined
    },
    enabled: !!countryId,
  })
}

export const useCities = (stateId: string) => {
  return useInfiniteQuery({
    queryKey: ["cities", stateId],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const response = await apiClient.get<PaginatedResponse<City[]>>(
        `/countries/states/${stateId}/cities`,
        {
          params: {
            page: pageParam,
          },
        }
      )

      return response
    },

    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.pagination

      return page < pageCount ? page + 1 : undefined
    },

    enabled: !!stateId,
  })
}
