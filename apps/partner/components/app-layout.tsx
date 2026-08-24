import React from "react"
import { NavUser } from "./nav-user"
import { Button } from "@blak/ui/components/button"
import { Bell, Search, X } from "lucide-react"
import { Badge } from "@blak/ui/components/badge"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@blak/ui/components/input-group"
import Image from "next/image"
import Link from "next/link"

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <AppHeader />
      <div className="h-full px-4 py-6 lg:px-6">{children}</div>
    </React.Fragment>
  )
}

const AppHeader = () => {
  return (
    <header className="@container border-b px-4 lg:px-6">
      <div className="flex h-16 w-full items-center gap-4">
        <Link className="inline-flex items-center" href="/">
          <Image src="/logo/logo.png" width={140} height={40} alt="Blak" />
        </Link>
        <span className="flex-1"></span>
        <InputGroup className="max-w-sm">
          <InputGroupAddon>
            <Search className="size-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <Button
          variant="ghost"
          className="gap-0.5 px-2 shadow-none hover:bg-transparent"
        >
          <Badge variant="warning" className="size-5 rounded-full">
            10
          </Badge>
          <Bell className="size-5" />
        </Button>
        <NavUser />
      </div>
    </header>
  )
}
