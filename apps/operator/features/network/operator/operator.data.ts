import { PaginatedResponse } from "@/features/shared/shared.type"
import { useQuery } from "@tanstack/react-query"

import { Operator } from "./operator.type"
import { apiClient } from "@blak/utils"

export const useOperators = () => {
  return useQuery<PaginatedResponse<Operator>, Error>({
    queryKey: ["operators"],
    queryFn: () => apiClient.get("/v1/operators"),
  })
}
