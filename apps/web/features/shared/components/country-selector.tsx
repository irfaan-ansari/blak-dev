import React from "react"
import type { Currency, Country } from "@blak/db"
import { Check } from "lucide-react"

import { Button } from "@blak/ui/components/button"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { SearchBar } from "@blak/ui/components/blak/search-input"

import { QueryState } from "@blak/ui/components/blak/query-state"
import { useCountries } from "../shared.data"

export const CountrySelector = ({
  children,
  selected,
  onSelectedChange,
}: {
  children: React.ReactNode
  selected?: string
  onSelectedChange?: (value: Country) => void
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
