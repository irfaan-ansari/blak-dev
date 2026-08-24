import { createApiClient } from "./config"

export const apiClient = createApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
})
