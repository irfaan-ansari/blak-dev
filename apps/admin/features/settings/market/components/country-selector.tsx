import React from "react"
import { ChevronDown } from "lucide-react"
import { useCountries, useCountryStates, useStateCities } from "../market.data"
import { Field } from "@blak/ui/components/field"
import { Button } from "@blak/ui/components/button"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { SearchBar } from "@blak/ui/components/blak/search-input"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blak/ui/components/collapsible"
import { Checkbox } from "@blak/ui/components/checkbox"
import { QueryState } from "@blak/ui/components/blak/query-state"

export const CountrySelector = ({
  children,
  selected,
  onSelectedChange,
}: {
  children: React.ReactNode
  selected?: string
  onSelectedChange?: (countryId: string | undefined) => void
}) => {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [draft, setDraft] = React.useState<string | undefined>(selected)

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

  const handleOpenChange = (value: boolean) => {
    setOpen(value)

    if (value) {
      setDraft(selected)
      setQuery("")
    }
  }

  const handleCancel = () => {
    setDraft(selected)
    setOpen(false)
  }

  const handleDone = () => {
    onSelectedChange?.(draft)
    setOpen(false)
  }

  return (
    <DropDrawer
      trigger={children}
      open={open}
      setOpen={handleOpenChange}
      modal={false}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="p-2">
          <SearchBar
            placeholder="Search countries..."
            className="max-w-full"
            value={query}
            onSearch={setQuery}
          />
        </div>

        {/* Countries */}
        <div className="no-scrollbar min-h-0 flex-1 overflow-auto lg:max-h-96">
          <QueryState
            isPending={isPending}
            isError={false}
            isEmpty={filtered.length === 0}
          >
            <div>
              {filtered.map((country) => {
                const checked = draft === country.id
                return (
                  <Collapsible key={country.id}>
                    <Field
                      orientation="horizontal"
                      className="h-10 rounded-md px-2 hover:bg-secondary/50"
                    >
                      <Checkbox />
                      <CollapsibleTrigger className="inline-flex flex-1 items-center justify-start">
                        {country.name}
                        <span className="ml-auto">
                          {country.stateCount} provinence/states
                        </span>
                        <ChevronDown className="size-4 text-muted-foreground" />
                      </CollapsibleTrigger>
                    </Field>
                    <CollapsibleContent className="pl-4">
                      <MarketStates countryId={country.id} />
                    </CollapsibleContent>
                  </Collapsible>
                )
              })}
            </div>
          </QueryState>
        </div>

        {/* Footer */}
        <Field className="gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleCancel}
            className="sm:w-28"
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="lg"
            disabled={!draft}
            onClick={handleDone}
            className="sm:w-28"
          >
            Done
          </Button>
        </Field>
      </div>
    </DropDrawer>
  )
}

const MarketStates = ({ countryId }: { countryId: string }) => {
  const { data: states, isPending } = useCountryStates(countryId)

  return (
    <QueryState
      isPending={isPending}
      isError={false}
      isEmpty={states?.data?.length === 0}
    >
      {states?.data?.map((state) => (
        <Collapsible key={state.id}>
          <Field
            orientation="horizontal"
            className="h-9 gap-2 rounded-md px-2 hover:bg-secondary/50"
          >
            <Checkbox />
            <CollapsibleTrigger className="inline-flex flex-1 items-center justify-start">
              {state.name} state
              <span className="ml-auto">{state.cityCount} cities</span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </CollapsibleTrigger>
          </Field>

          <CollapsibleContent className="pl-4">
            <MarketCities stateId={state.id} />
          </CollapsibleContent>
        </Collapsible>
      ))}
    </QueryState>
  )
}

const MarketCities = ({ stateId }: { stateId: string }) => {
  const { data: cities, isPending } = useStateCities(stateId)

  return (
    <QueryState
      isPending={isPending}
      isError={false}
      isEmpty={cities?.data?.length === 0}
    >
      {cities?.data.map((city) => (
        <Field
          key={city.id}
          orientation="horizontal"
          className="h-8 gap-2 rounded-md px-2 hover:bg-secondary/50"
        >
          <Checkbox />
          <span> {city.name} city</span>
        </Field>
      ))}
    </QueryState>
  )
}
