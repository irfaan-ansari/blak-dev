"use client"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell } from "lucide-react"

import { NavUser } from "./nav-user"
import { Badge } from "@blak/ui/components/badge"
import { Button } from "@blak/ui/components/button"
// import { SearchQueryParam } from "@blak/ui/components/blak/search-input"

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <AppHeader />
      <div className="h-full px-4 py-6 lg:px-6">
        <div className="@container mx-auto max-w-7xl">{children}</div>
      </div>
    </React.Fragment>
  )
}

const AppHeader = () => {
  return (
    <header className="@container border-b bg-card px-4 lg:px-6">
      <div className="flex h-18 w-full items-center gap-4">
        <Link className="inline-flex items-center" href="/">
          <Image src="/logo/logo-blak.png" width={120} height={40} alt="Blak" />
        </Link>
        <span className="flex-1"></span>
        <Button
          variant="secondary"
          size="icon"
          className="relative rounded-full border border-border bg-secondary/50"
        >
          <Bell />
        </Button>
        <NavUser />
      </div>
    </header>
  )
}
