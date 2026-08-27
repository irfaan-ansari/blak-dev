import { Organization } from "@blak/db"

export type OperatorAccount = Organization & { active: boolean }
