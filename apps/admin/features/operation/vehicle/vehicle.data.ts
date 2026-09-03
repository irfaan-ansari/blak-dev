import { useQuery } from "@tanstack/react-query"

import { AppError } from "@blak/utils"

import { apiClient } from "@/lib/api-client"

import { ApiResponse, PaginatedResponse } from "@/features/shared/shared.type"
import { VehicleWithImages } from "./vehicle.type"

export const useVehicles = () => {
  return useQuery<PaginatedResponse<VehicleWithImages>, AppError>({
    queryKey: ["vehicles"],
    queryFn: () => apiClient.get("/vehicles"),
  })
}

export const useVehicle = (id: string) => {
  return useQuery<ApiResponse<VehicleWithImages>, AppError>({
    queryKey: ["vehicle"],
    queryFn: () => apiClient.get(`/vehicles/${id}`),
  })
}
