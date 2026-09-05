import { useQuery } from "@tanstack/react-query"

import { AppError } from "@blak/utils"

import { apiClient } from "@/lib/api-client"

import { ApiResponse, PaginatedResponse } from "@/features/shared/shared.type"
import { VehicleWithImages } from "./vehicle.type"

export const useVehicles = (params?: Record<string, any>) => {
  return useQuery<PaginatedResponse<VehicleWithImages>, AppError>({
    queryKey: ["vehicles", params],
    queryFn: () => apiClient.get("/vehicles", { params }),
  })
}

export const useVehicle = (id: string) => {
  return useQuery<ApiResponse<VehicleWithImages>, AppError>({
    queryKey: ["vehicle"],
    queryFn: () => apiClient.get(`/vehicles/${id}`),
  })
}
