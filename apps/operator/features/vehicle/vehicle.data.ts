import { useQuery } from "@tanstack/react-query"
import { ApiResponse, PaginatedResponse } from "../shared/shared.type"
import { apiClient, AppError } from "@blak/utils"
import { Vehicle } from "./vehicle.type"

export const useVehicles = () => {
  return useQuery<PaginatedResponse<Vehicle[]>, AppError>({
    queryKey: ["vehicles"],
    queryFn: () => apiClient.get("/v1/operator/vehicles"),
  })
}

export const useVehicle = (id: string) => {
  return useQuery<ApiResponse<Vehicle>, AppError>({
    queryKey: ["vehicle"],
    queryFn: () => apiClient.get(`/v1/operator/vehicles/${id}`),
  })
}
