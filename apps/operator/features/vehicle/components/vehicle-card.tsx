import React from "react"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Car, SquarePen } from "lucide-react"
import { VehicleWithImages } from "../vehicle.type"
import { Avatar, AvatarFallback, AvatarImage } from "@blak/ui/components/avatar"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "../vehicle.const"

import { Button } from "@blak/ui/components/button"
import { VehicleDialog } from "./vehicle-dialog"
import Link from "next/link"

const VehicleCard = ({ data }: { data: VehicleWithImages }) => {
  return (
    <Card className="relative" size="sm">
      <Link href={`/vehicles/${data.id}`} className="absolute inset-0" />
      <CardHeader className="gap-x-10">
        <div className="flex h-full items-start gap-3">
          <Avatar size="lg">
            <AvatarImage src={data?.images?.[0]?.url ?? ""} />
            <AvatarFallback>
              <Car className="size-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="grid min-w-2xs gap-0.5">
            <CardTitle>
              {data.make}{" "}
              <span className="text-xs text-muted-foreground">
                ({data.exteriorColor})
              </span>
            </CardTitle>
            <CardDescription>
              License Plate: {data.licensePlate}
            </CardDescription>
            <CardDescription>
              Reg. No.: {data.registrationNumber}
            </CardDescription>
          </div>
          <div className="grid min-w-2xs">
            <span className="text-muted-foreground">Year: {data.year}</span>

            <span className="text-muted-foreground">
              Trim Level: {data.trim}
            </span>
          </div>
        </div>

        <CardAction className="relative space-x-2">
          <StatusBadge statusMap={STATUS_MAP} status={data.status} />
          <VehicleDialog>
            <Button variant="outline" size="icon">
              <SquarePen size="2.5!" />
            </Button>
          </VehicleDialog>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

export default VehicleCard
