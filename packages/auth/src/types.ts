import { auth } from "./auth"
import { AccessStatement, userRoles } from "./permission"

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}

export type UserRole = keyof typeof userRoles

export type Permission = {
  [R in keyof AccessStatement]?: AccessStatement[R][number][]
}
