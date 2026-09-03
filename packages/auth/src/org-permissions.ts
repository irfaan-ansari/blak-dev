import { createAccessControl } from "better-auth/plugins/access"
import {
  defaultStatements,
  adminAc,
} from "better-auth/plugins/organization/access"

const statement = {
  ...defaultStatements,
} as const

const ac = createAccessControl(statement)

const owner = ac.newRole({
  ...adminAc.statements,
})
const admin = ac.newRole({
  ...adminAc.statements,
})
const member = ac.newRole({
  ...adminAc.statements,
})
const driver = ac.newRole({
  ...adminAc.statements,
})

const orgUserRoles = {
  owner,
  admin,
  member,
  driver,
} as const

export { ac as orgAc, orgUserRoles }

export type OrgAccessStatement = typeof statement
