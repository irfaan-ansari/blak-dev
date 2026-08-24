import { PaginatedResponse } from "@/features/shared/shared.type"
import { useQuery } from "@tanstack/react-query"
import { OperatorApplication } from "./operator.type"
import { apiClient } from "@blak/utils"

export const useOperatorApplications = () => {
  return useQuery<PaginatedResponse<OperatorApplication>, Error>({
    queryKey: ["operator-applications"],
    queryFn: () => apiClient.get("/v1/application/operators"),
  })
}
