import { PaginatedResponse } from "@/features/shared/shared.type"
import { useQuery } from "@tanstack/react-query"
import { PartnerApplication } from "./partner.type"
import { apiClient } from "@/lib/api-client"
import { AppError } from "@blak/utils/error"

export const usePartnerApplications = () => {
  return useQuery<PaginatedResponse<PartnerApplication>, AppError>({
    queryKey: ["partner-applications"],
    queryFn: () => apiClient.get("/application/partners"),
  })
}
