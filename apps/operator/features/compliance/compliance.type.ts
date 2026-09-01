import { ComplianceRecord, ComplianceRequirement } from "@blak/db"

export type Compliance = ComplianceRequirement & {
  record: ComplianceRecord & {
    document: Document
  }
}
