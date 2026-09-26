import { createAuthClient } from "better-auth/react"
import {
  adminClient,
  organizationClient,
  phoneNumberClient,
  emailOTPClient,
  inferAdditionalFields,
  inferOrgAdditionalFields,
} from "better-auth/client/plugins"
import { apiKeyClient } from "@better-auth/api-key/client"
import type { AuthQueryAtom } from "better-auth/client"
import { userAc, userRoles } from "./permission"
import type { auth } from "./auth"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  basePath: "/auth",
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    adminClient({
      ac: userAc,
      roles: userRoles,
    }),
    organizationClient({
      schema: inferOrgAdditionalFields<typeof auth>(),
    }),
    phoneNumberClient(),
    apiKeyClient(),
    emailOTPClient(),
    inferAdditionalFields<typeof auth>(),
  ],
})

export type AuthClient = typeof authClient
