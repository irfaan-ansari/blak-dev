"use client"

import { Button } from "@blak/ui/components/button"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { useRouterStuff } from "@blak/ui/hooks/use-router-stuff"
import { Check, ChevronDown, ListFilter } from "lucide-react"

type StatusFilterOption = {
  label: string
  value: string
}

type StatusFilterProps = {
  options: StatusFilterOption[]
  placeholder?: string
}

export function StatusFilter({
  options,
  placeholder = "Status: All",
}: StatusFilterProps) {
  const { queryParams, searchParamsObj } = useRouterStuff()
  const selected = String(searchParamsObj.status ?? "")
  const selectedLabel =
    options.find((option) => option.value === selected)?.label ?? placeholder

  return (
    <DropDrawer
      trigger={
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-40 justify-start gap-2"
        >
          <ListFilter className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1 truncate text-left">
            {selectedLabel}
          </span>
          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
        </Button>
      }
      className="*:justify-start"
    >
      <Button
        variant="ghost"
        size="sm"
        className="justify-start"
        onClick={() => queryParams({ set: { status: "" } })}
      >
        All
        {!selected && <Check className="ml-auto size-3.5" />}
      </Button>
      {options.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          className="justify-start"
          onClick={() => queryParams({ set: { status: option.value } })}
        >
          {option.label}
          {selected === option.value && <Check className="ml-auto size-3.5" />}
        </Button>
      ))}
    </DropDrawer>
  )
}
