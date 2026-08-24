import { useQuery } from "@tanstack/react-query"

import { authClient } from "@blak/auth/client"
import { AppError } from "@blak/utils/error"

export const useInvitation = (id: string) => {
  return useQuery({
    queryKey: ["invitation"],
    queryFn: async () => {
      const { data, error } = await authClient.organization.getInvitation({
        query: {
          id,
        },
      })
      if (error) throw new AppError("NOT_FOUND", { message: error.message })
      return data
    },
  })
}
