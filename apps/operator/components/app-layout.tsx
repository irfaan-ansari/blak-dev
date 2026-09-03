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
import { OnboardingStatus } from "@/features/shared/components/onboarding-status"

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <AppHeader />
      <OnboardingStatus />
      <div className="h-full px-4 py-6 lg:px-6">
        <div className="@container mx-auto max-w-7xl">{children}</div>
      </div>
    </React.Fragment>
  )
}

const AppHeader = () => {
  return (
    <header className="@container border-b bg-card px-4 lg:px-6">
      <div className="flex h-20 w-full items-center gap-4">
        <Link className="inline-flex items-center" href="/dashboard">
          <Image src="/logo/logo-blak.png" width={140} height={40} alt="Blak" />
        </Link>
        <span className="flex-1"></span>
        <InputGroup className="max-w-xs">
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
        <Button variant="ghost" size="lg" className="relative rounded-full">
          <Bell className="size-5" />
          <Badge variant="warning" className="rounded-full">
            10
          </Badge>
        </Button>
        <NavUser />
      </div>
    </header>
  )
}
