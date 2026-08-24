import { PaginatedResponse } from "@/features/shared/shared.type"
import { useQuery } from "@tanstack/react-query"
import { PartnerApplication } from "./partner.type"
import { apiClient } from "@blak/utils"

export const usePartnerApplications = () => {
  return useQuery<PaginatedResponse<PartnerApplication>, Error>({
    queryKey: ["partner-applications"],
    queryFn: () => apiClient.get("/v1/application/partners"),
  })
}
