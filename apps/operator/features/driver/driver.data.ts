import { useQuery } from "@tanstack/react-query"
import { ApiResponse, PaginatedResponse } from "../shared/shared.type"
import { AppError } from "@blak/utils"

import { apiClient } from "@/lib/api-client"
import { User } from "@blak/db"
import { DriverWithDocument } from "./driver.type"

export const useDrivers = () => {
  return useQuery<PaginatedResponse<User>, AppError>({
    queryKey: ["drivers"],
    queryFn: () => apiClient.get("/drivers"),
  })
}
export const useDriver = (id: string) => {
  return useQuery<ApiResponse<DriverWithDocument>, AppError>({
    queryKey: ["driver", id],
    queryFn: () => apiClient.get(`/drivers/${id}`),
  })
}
