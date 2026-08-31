import React from "react"
import { Check } from "lucide-react"
import type { Currency } from "@blak/db"
import { useCurrencies } from "../market.data"
import { Button } from "@blak/ui/components/button"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { SearchBar } from "@blak/ui/components/blak/search-input"

import { QueryState } from "@blak/ui/components/blak/query-state"

export const CurrencySelector = ({
  children,
  selected,
  onSelectedChange,
}: {
  children: React.ReactNode
  selected?: string
  onSelectedChange?: (value: Currency) => void
}) => {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const { data, isPending } = useCurrencies()
  const currencies = data?.data ?? []

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return currencies

    return currencies.filter((country) =>
      country.name.toLowerCase().includes(q)
    )
  }, [currencies, query])

  return (
    <DropDrawer trigger={children} open={open} setOpen={setOpen} modal={false}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="p-2">
          <SearchBar
            placeholder="Search currencies..."
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
              {filtered.map((currency) => {
                const checked = selected === currency.id
                return (
                  <Button
                    key={currency.id}
                    variant="ghost"
                    size="lg"
                    className="w-full justify-start"
                    onClick={() => {
                      onSelectedChange?.(currency)
                      setOpen(false)
                    }}
                  >
                    {`${currency.name} - ${currency.symbol}`}
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
