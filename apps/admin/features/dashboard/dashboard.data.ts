"use client"

import { useQuery } from "@tanstack/react-query"
import { ApiResponse } from "../shared/shared.type"
import { apiClient } from "@/lib/api-client"
import { AppError } from "@blak/utils"

type AnalyticsData = {
  driverCount: number
  vehicleCount: number
  passengerCount: number
  applicationCount: number
  operatorCount: number
  partnerCount: number
}

export const useAnalytics = () => {
  return useQuery<ApiResponse<AnalyticsData>, AppError>({
    queryKey: ["analytics"],
    queryFn: () => apiClient.get("/analytics"),
  })
}
