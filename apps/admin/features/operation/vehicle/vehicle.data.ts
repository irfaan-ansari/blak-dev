import { useQuery } from "@tanstack/react-query"

import { AppError } from "@blak/utils"

import { apiClient } from "@/lib/api-client"

import type {
  ApiResponse,
  PaginatedResponse,
} from "@/features/shared/shared.type"
import type { VehicleWithImages, Vehicle } from "./vehicle.type"

export const useVehicles = (params?: Record<string, any>) => {
  return useQuery<PaginatedResponse<Vehicle>, AppError>({
    queryKey: ["vehicles", params],
    queryFn: () => apiClient.get("/vehicles", { params }),
  })
}

export const useVehicle = (id: string) => {
  return useQuery<ApiResponse<VehicleWithImages>, AppError>({
    queryKey: ["vehicle", id],
    queryFn: () => apiClient.get(`/vehicles/${id}`),
  })
}
