import { useQuery } from "@tanstack/react-query"

import { AppError } from "@blak/utils"

import { apiClient } from "@/lib/api-client"

import { ApiResponse, PaginatedResponse } from "@/features/shared/shared.type"
import { DriverWithDocs } from "./driver.type"

export const useDrivers = (params?: Record<string, any>) => {
  return useQuery<PaginatedResponse<DriverWithDocs>, AppError>({
    queryKey: ["drivers", params],
    queryFn: () => apiClient.get("/drivers", { params }),
  })
}

export const useDriver = (id: string) => {
  return useQuery<ApiResponse<DriverWithDocs>, AppError>({
    queryKey: ["driver"],
    queryFn: () => apiClient.get(`/drivers/${id}`),
  })
}
