import type { ComplianceRequirement, Country, Currency, Market } from "@blak/db"

export interface MarketWithRelations extends Market {
  country: Country
  currency: Currency
  complianceRequirements: ComplianceRequirement[]
}
