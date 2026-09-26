import { useQuery } from "@tanstack/react-query"
import { ApiResponse, PaginatedResponse } from "../shared/shared.type"
import { AppError } from "@blak/utils"

import { apiClient } from "@/lib/api-client"
import { Vehicle, VehicleWithImages } from "./vehicle.type"

export const useVehicles = (page = 1, limit = 100) => {
  return useQuery<PaginatedResponse<Vehicle>, AppError>({
    queryKey: ["vehicles", { page, limit }],
    queryFn: () => apiClient.get("/vehicles", { params: { page, limit } }),
  })
}

export const useVehicle = (id: string) => {
  return useQuery<ApiResponse<VehicleWithImages>, AppError>({
    queryKey: ["vehicle", id],
    queryFn: () => apiClient.get(`/vehicles/${id}`),
  })
}
