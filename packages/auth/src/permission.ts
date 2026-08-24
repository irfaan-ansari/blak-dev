import { createAccessControl } from "better-auth/plugins/access"
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access"

const statement = {
  ...defaultStatements,
  app: ["admin", "operator", "partner", "driver"],
  application: ["update"],
  vehicle: ["create", "read", "update", "delete"],
  driver: ["read", "update", "approve"],
  ride: ["create", "read", "update", "cancel"],
} as const

const ac = createAccessControl(statement)

const superAdmin = ac.newRole({
  ...adminAc.statements,
  app: ["admin"],
  application: ["update"],
  vehicle: ["create", "read", "update", "delete"],
  driver: ["read", "update", "approve"],
  ride: ["create", "read", "update", "cancel"],
})

const developer = ac.newRole({
  ...adminAc.statements,
  app: ["admin"],
  application: ["update"],
  vehicle: ["create", "read", "update", "delete"],
  driver: ["read", "update", "approve"],
  ride: ["create", "read", "update", "cancel"],
})

const admin = ac.newRole({
  ...adminAc.statements,
  app: ["admin"],
  application: ["update"],
  vehicle: ["create", "read", "update", "delete"],
  driver: ["read", "update", "approve"],
  ride: ["create", "read", "update", "cancel"],
})

const user = ac.newRole({
  ...adminAc.statements,
  application: ["update"],
})

const operator = ac.newRole({
  ...adminAc.statements,
  app: ["operator"],
})

const partner = ac.newRole({
  ...adminAc.statements,
  app: ["partner"],
})

const driver = ac.newRole({
  app: ["driver"],
  vehicle: ["read", "update"],
  ride: ["read", "update"],
})

const userRoles = {
  superAdmin,
  developer,
  admin,
  user,
  driver,
  operator,
  partner,
} as const

export { ac as userAc, userRoles }

export type AccessStatement = typeof statement
