import React from "react"
import Link from "next/link"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Vehicle } from "../vehicle.type"
import { STATUS_MAP } from "../vehicle.const"
import { CarFront, SquarePen } from "lucide-react"
import { Button } from "@blak/ui/components/button"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"

const VehicleCard = ({ data }: { data: Vehicle }) => {
  return (
    <Card className="relative" size="sm">
      <Link href={`/vehicles/${data.id}`} className="absolute inset-0" />
      <CardHeader>
        <div className="flex h-full items-start gap-3">
          <Avatar size="lg" className="shrink-0 rounded-md *:rounded-md">
            <AvatarFallback>
              <CarFront className="size-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <CardTitle>{data.make}</CardTitle>
            <CardDescription className="text-xs">
              {data.exteriorColor} - {data.year}
            </CardDescription>
            <div className="mt-1.5 grid grid-cols-3 gap-4">
              <div className="grid gap-0.5">
                <span className="text-xs text-muted-foreground">
                  License Plate
                </span>
                <span>{data.licensePlate}</span>
              </div>
              <div className="grid gap-0.5">
                <span className="text-xs text-muted-foreground">
                  Registration Number
                </span>
                <span>{data.registrationNumber ?? "-"}</span>
              </div>
              <div className="grid gap-0.5">
                <span className="text-xs text-muted-foreground">VIN</span>
                <span>{data.vin}</span>
              </div>
            </div>
          </div>
        </div>

        <CardAction className="relative flex items-center gap-1">
          <StatusBadge statusMap={STATUS_MAP} status={data.status} />
          <Button variant="invert" size="icon-sm" asChild>
            <Link href={`/vehicles/${data.id}/edit`}>
              <SquarePen className="size-3.5" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

export default VehicleCard
