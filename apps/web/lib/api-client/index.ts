import { createApiClient } from "@blak/utils"

export const apiClient = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  basePath: "/v1",
})
