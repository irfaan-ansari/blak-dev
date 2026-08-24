import type { AuthType } from "@blak/auth/types"

export type AppContext = {
  Variables: Omit<AuthType, "user" | "session"> & {
    user: NonNullable<AuthType["user"]>
    session: NonNullable<AuthType["session"]>
  }
}
export type OrgContext = {
  Variables: AppContext["Variables"] & {
    organizationId: string

    role: string
  }
}
