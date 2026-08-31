import type { Country, Currency, State } from "@blak/db"

export interface CountryWithStateCount extends Country {
  stateCount: number
  currency: Currency
}

export interface StateWithCityCount extends State {
  cityCount: number
}
