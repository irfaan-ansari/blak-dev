import { useQuery } from "@tanstack/react-query"

import { AppError } from "@blak/utils"

import { apiClient } from "@/lib/api-client"

import type {
  ApiResponse,
  PaginatedResponse,
} from "@/features/shared/shared.type"
import type { Driver, DriverWithDocs } from "./driver.type"

export const useDrivers = (params?: Record<string, any>) => {
  return useQuery<PaginatedResponse<Driver>, AppError>({
    queryKey: ["drivers", params],
    queryFn: () => apiClient.get("/drivers", { params }),
  })
}

export const useDriver = (id: string) => {
  return useQuery<ApiResponse<DriverWithDocs>, AppError>({
    queryKey: ["driver", id],
    queryFn: () => apiClient.get(`/drivers/${id}`),
  })
}
