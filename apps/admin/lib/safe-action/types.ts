import { type AuthType } from "@blak/auth/types"

export type AuthContext = {
  user: NonNullable<AuthType["user"]>
  session: NonNullable<AuthType["session"]>
}
