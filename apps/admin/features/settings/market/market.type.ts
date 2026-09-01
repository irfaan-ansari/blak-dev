import type {
  ComplianceRequirement,
  Country,
  Currency,
  Market,
  State,
} from "@blak/db"

export interface MarketWithRelations extends Market {
  country: Currency
  currency: Currency
  stateCount: number
  cityCount: number
  complianceRequirements: ComplianceRequirement[]
}

export interface CountryWithStateCount extends Country {
  stateCount: number
  currency: Currency
}

export interface StateWithCityCount extends State {
  cityCount: number
}
