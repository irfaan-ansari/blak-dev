"use client"
import React from "react"

import {
  CarFront,
  FileCheck,
  KeyRound,
  Pencil,
  UserRoundCog,
} from "lucide-react"
import { DropDrawer } from "@blak/ui/components/blak/drop-drawer"
import { Button } from "@blak/ui/components/button"
import { DriverWithDocs } from "../driver.type"

const DriverAction = ({ data }: { data: DriverWithDocs }) => {
  return (
    <DropDrawer
      trigger={
        <Button variant="invert" size="icon-sm">
          <Pencil className="size-3.5" />
        </Button>
      }
      className="md:w-50"
    >
      <span className="px-3 pt-2 text-muted-foreground">Actions (demo)</span>
      <Button
        variant="ghost"
        size="lg"
        className="justify-start gap-2 shadow-none"
      >
        <Pencil className="size-4" />
        Edit Driver
      </Button>

      <Button
        variant="ghost"
        size="lg"
        className="justify-start gap-2 shadow-none"
      >
        <UserRoundCog className="size-4" />
        Update Status
      </Button>

      <Button
        variant="ghost"
        size="lg"
        className="justify-start gap-2 shadow-none"
      >
        <FileCheck className="size-4" />
        Review Documents
      </Button>

      <Button
        variant="ghost"
        size="lg"
        className="justify-start gap-2 shadow-none"
      >
        <CarFront className="size-4" />
        View Assigned Vehicle
      </Button>

      <Button
        variant="ghost"
        size="lg"
        className="justify-start gap-2 shadow-none"
      >
        <KeyRound className="size-4" />
        Reset Password
      </Button>
    </DropDrawer>
  )
}

export default DriverAction
