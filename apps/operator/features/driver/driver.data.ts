import { useQuery } from "@tanstack/react-query"
import { PaginatedResponse } from "../shared/shared.type"
import { AppError } from "@blak/utils"

import { apiClient } from "@/lib/api-client"
import { User } from "@blak/db"

export const useDrivers = () => {
  return useQuery<PaginatedResponse<User>, AppError>({
    queryKey: ["drivers"],
    queryFn: () => apiClient.get("/drivers"),
  })
}
