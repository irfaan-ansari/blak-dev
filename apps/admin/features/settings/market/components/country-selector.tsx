import React from "react"
import { Search, X } from "lucide-react"
import { useCountries } from "../market.data"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { Button } from "@blak/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blak/ui/components/collapsible"
import { Field } from "@blak/ui/components/field"
import { Checkbox } from "@blak/ui/components/checkbox"
import { Label } from "@blak/ui/components/label"
import { Input } from "@blak/ui/components/input"

type StateRow = { id: string; name: string; code?: string }
type CountryRow = {
  id: string
  name: string
  iso2: string
  flagUrl?: string | null
  states: StateRow[]
}

type CheckState = boolean | "indeterminate"

function getCheckState(selected: Set<string>, ids: string[]): CheckState {
  if (ids.length === 0) return false
  let count = 0
  for (const id of ids) if (selected.has(id)) count++
  if (count === 0) return false
  if (count === ids.length) return true
  return "indeterminate"
}

export const CountrySelector = ({
  children,
  selected,
  onSelectedChange,
}: {
  children: React.ReactNode
  selected?: string[]
  onSelectedChange?: (ids: string[]) => void
}) => {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [draft, setDraft] = React.useState<Set<string>>(new Set(selected))

  const { data } = useCountries()
  const countries: CountryRow[] = React.useMemo(
    () => [...(data?.data ?? [])].sort((a, b) => a.name.localeCompare(b.name)),
    [data]
  )

  // Re-seed the draft from committed selection every time the drawer opens,
  // so an unsaved edit never leaks in and Cancel is always a true no-op.
  React.useEffect(() => {
    if (open) setDraft(new Set(selected))
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Precompute id sets once instead of flatMap-ing on every render of every row ----
  const { countryStateIds, allStateIds } = React.useMemo(() => {
    const countryStateIds = new Map<string, string[]>()
    const allStateIds: string[] = []
    for (const country of countries) {
      const ids = country.states.map((s) => s.id)
      countryStateIds.set(country.id, ids)
      allStateIds.push(...ids)
    }
    return { countryStateIds, allStateIds }
  }, [countries])

  // ---- Search: matches country name or state name, auto-expanding matched countries ----
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return countries

    return countries
      .map((country) => {
        if (country.name.toLowerCase().includes(q)) return country
        const matchedStates = country.states.filter((s) =>
          s.name.toLowerCase().includes(q)
        )
        return matchedStates.length > 0
          ? { ...country, states: matchedStates }
          : null
      })
      .filter((c): c is CountryRow => c !== null)
  }, [countries, query])

  const toggle = (ids: string[], checked: boolean) => {
    setDraft((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => (checked ? next.add(id) : next.delete(id)))
      return next
    })
  }

  const selectedCount = draft.size
  const totalCount = allStateIds.length

  const handleCancel = () => {
    setOpen(false) // draft is discarded; re-seeded from `selected` on next open
  }

  const handleDone = () => {
    onSelectedChange?.(Array.from(draft))
    setOpen(false)
  }

  return (
    <DropDrawer trigger={children} open={open} setOpen={setOpen} modal={false}>
      <div className="flex h-full flex-col">
        <div className="border-b p-3">
          <div className="px-1 text-sm font-medium text-muted-foreground">
            Regions
          </div>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="pr-8 pl-8"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="max-h-64 flex-1 overflow-auto *:w-full *:justify-start">
          {filtered.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No regions match "{query}"
            </div>
          )}

          {filtered.map((country) => {
            const ids = countryStateIds.get(country.id) ?? []
            const cState = getCheckState(draft, ids)
            const checkedCount = ids.filter((id) => draft.has(id)).length

            return (
              <Collapsible key={country.id} defaultOpen={!!query}>
                <Field orientation="horizontal" className="px-3 py-2">
                  <Checkbox
                    id={`country-${country.id}`}
                    checked={cState}
                    onCheckedChange={(checked) => toggle(ids, !!checked)}
                  />
                  <Label
                    htmlFor={`country-${country.id}`}
                    className="flex flex-1 items-center gap-2"
                  >
                    {country.flagUrl ? (
                      <img
                        src={country.flagUrl}
                        alt=""
                        className="h-5 w-7 rounded-sm object-cover"
                      />
                    ) : (
                      <span className="h-5 w-7 rounded-sm bg-muted" />
                    )}
                    {ids.length > 0 ? (
                      <CollapsibleTrigger asChild>
                        <span className="flex flex-1 cursor-pointer items-center justify-between">
                          <span className="font-medium">{country.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {checkedCount} of {ids.length} states and
                            territories
                          </span>
                        </span>
                      </CollapsibleTrigger>
                    ) : (
                      <span className="font-medium">{country.name}</span>
                    )}
                  </Label>
                </Field>

                {ids.length > 0 && (
                  <CollapsibleContent className="pl-11">
                    {country.states.map((s) => (
                      <Field
                        orientation="horizontal"
                        key={s.id}
                        className="py-1.5"
                      >
                        <Checkbox
                          id={`state-${s.id}`}
                          checked={draft.has(s.id)}
                          onCheckedChange={(checked) =>
                            toggle([s.id], !!checked)
                          }
                        />
                        <Label
                          htmlFor={`state-${s.id}`}
                          className="cursor-pointer"
                        >
                          {s.name}
                        </Label>
                      </Field>
                    ))}
                  </CollapsibleContent>
                )}
              </Collapsible>
            )
          })}
        </div>

        <div className="flex items-center justify-between border-t p-3">
          <span className="text-sm text-muted-foreground">
            {selectedCount} of {totalCount} selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleDone}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </DropDrawer>
  )
}
