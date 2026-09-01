"use client"
import {
  AppDrawer,
  AppDrawerContent,
  AppDrawerHeader,
  AppDrawerTitle,
  AppDrawerTrigger,
} from "@blak/ui/components/blak/app-drawer"
import { Button } from "@blak/ui/components/button"
import { FieldGroup } from "@blak/ui/components/field"
import { CloudUpload } from "lucide-react"
import React from "react"

export const VehicleImportDialog = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = React.useState(false)
  return (
    <AppDrawer open={open} onOpenChange={setOpen}>
      <AppDrawerTrigger asChild>{children}</AppDrawerTrigger>
      <AppDrawerContent className="sm:max-w-2xl">
        <AppDrawerHeader>
          <AppDrawerTitle className="text-xl font-bold">
            Import vehicle data
          </AppDrawerTitle>
        </AppDrawerHeader>
        <FieldGroup>
          <div className="flex h-36 flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed bg-secondary/20 hover:bg-secondary/50">
            <CloudUpload className="size-5" />
            <div className="space-y-1">
              <p className="text-muted-foreground">Upload a CSV file</p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button> Upload</Button>
          </div>
        </FieldGroup>
      </AppDrawerContent>
    </AppDrawer>
  )
}
