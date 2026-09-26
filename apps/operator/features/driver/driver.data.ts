import { useQuery } from "@tanstack/react-query"
import { ApiResponse, PaginatedResponse } from "../shared/shared.type"
import { AppError } from "@blak/utils"

import { apiClient } from "@/lib/api-client"
import type { DriverWithDocument, DriverWithVehicle } from "./driver.type"

export const useDrivers = (page = 1, limit = 100) => {
  return useQuery<PaginatedResponse<DriverWithVehicle>, AppError>({
    queryKey: ["drivers", { page, limit }],
    queryFn: () => apiClient.get("/drivers", { params: { page, limit } }),
  })
}
export const useDriver = (id: string) => {
  return useQuery<ApiResponse<DriverWithDocument>, AppError>({
    queryKey: ["driver", id],
    queryFn: () => apiClient.get(`/drivers/${id}`),
  })
}
