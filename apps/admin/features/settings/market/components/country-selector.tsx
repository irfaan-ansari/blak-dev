import React from "react"
import type { Currency, Country } from "@blak/db"
import { Check } from "lucide-react"
import { useCountries } from "../market.data"
import { Button } from "@blak/ui/components/button"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { SearchBar } from "@blak/ui/components/blak/search-input"

import { QueryState } from "@blak/ui/components/blak/query-state"

export const CountrySelector = ({
  children,
  selected,
  onSelectedChange,
}: {
  children: React.ReactNode
  selected?: string
  onSelectedChange?: (value: Country & { currency: Currency }) => void
}) => {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const { data, isPending } = useCountries()
  const countries = data?.data ?? []

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return countries

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(q) ||
        country.iso2.toLowerCase().includes(q)
    )
  }, [countries, query])

  return (
    <DropDrawer trigger={children} open={open} setOpen={setOpen} modal={true}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="p-2">
          <SearchBar
            placeholder="Search countries..."
            className="max-w-full"
            value={query}
            onSearch={setQuery}
          />
        </div>

        <div className="no-scrollbar min-h-0 flex-1 overflow-auto lg:max-h-72">
          <QueryState
            isPending={isPending}
            isError={false}
            isEmpty={filtered.length === 0}
          >
            <div>
              {filtered.map((country) => {
                const checked = selected === country.id
                return (
                  <Button
                    key={country.id}
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start"
                    onClick={() => {
                      onSelectedChange?.(country)
                      setOpen(false)
                    }}
                  >
                    {country.name}
                    {checked ? (
                      <Check className="ml-auto text-muted-foreground" />
                    ) : null}
                  </Button>
                )
              })}
            </div>
          </QueryState>
        </div>
      </div>
    </DropDrawer>
  )
}

// const MarketStates = ({
//   countryId,
//   selectedStateIds,
//   selectedCityIds,
//   onToggleState,
//   onToggleCity,
// }: {
//   countryId: string
//   selectedStateIds: string[]
//   selectedCityIds: string[]
//   onToggleState: (stateId: string) => void
//   onToggleCity: (cityId: string) => void
// }) => {
//   const { data: states, isPending } = useCountryStates(countryId)

//   return (
//     <QueryState
//       isPending={isPending}
//       isError={false}
//       isEmpty={states?.data?.length === 0}
//     >
//       {states?.data?.map((state) => (
//         <Collapsible key={state.id}>
//           <Field
//             orientation="horizontal"
//             className="h-9 gap-2 rounded-md px-2 hover:bg-secondary/50"
//           >
//             <Checkbox
//               checked={selectedStateIds.includes(state.id)}
//               onCheckedChange={() => onToggleState(state.id)}
//             />
//             <CollapsibleTrigger className="inline-flex flex-1 items-center justify-start">
//               {state.name} state
//               <span className="ml-auto">{state.cityCount} cities</span>
//               <ChevronDown className="size-4 text-muted-foreground" />
//             </CollapsibleTrigger>
//           </Field>

//           <CollapsibleContent className="pl-4">
//             <MarketCities
//               stateId={state.id}
//               selectedCityIds={selectedCityIds}
//               onToggleCity={onToggleCity}
//             />
//           </CollapsibleContent>
//         </Collapsible>
//       ))}
//     </QueryState>
//   )
// }

// const MarketCities = ({
//   stateId,
//   selectedCityIds,
//   onToggleCity,
// }: {
//   stateId: string
//   selectedCityIds: string[]
//   onToggleCity: (cityId: string) => void
// }) => {
//   const { data: cities, isPending } = useStateCities(stateId)

//   return (
//     <QueryState
//       isPending={isPending}
//       isError={false}
//       isEmpty={cities?.data?.length === 0}
//     >
//       {cities?.data.map((city) => (
//         <Field
//           key={city.id}
//           orientation="horizontal"
//           className="h-8 gap-2 rounded-md px-2 hover:bg-secondary/50"
//         >
//           <Checkbox
//             checked={selectedCityIds.includes(city.id)}
//             onCheckedChange={() => onToggleCity(city.id)}
//           />
//           <span>{city.name} city</span>
//         </Field>
//       ))}
//     </QueryState>
//   )
// }
