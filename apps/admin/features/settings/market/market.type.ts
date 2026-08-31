import { Country, State } from "@blak/db"

export interface CountryWithStateCount extends Country {
  stateCount: number
}

export interface StateWithCityCount extends State {
  cityCount: number
}
