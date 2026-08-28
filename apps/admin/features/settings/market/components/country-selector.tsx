import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { useCountries } from "../market.data"
import React from "react"

export const CountrySelector = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = React.useState(false)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCountries()

  const countries = data?.pages.flatMap((page) => page.data) ?? []
  console.log(countries)
  return (
    <DropDrawer trigger={children} open={open} setOpen={setOpen}>
      <div className="grid gap-1">
        {countries.map((country) => (
          <div key={country.id}>{country.name}</div>
        ))}

        {hasNextPage && (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    </DropDrawer>
  )
}
