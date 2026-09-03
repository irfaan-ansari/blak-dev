import React from "react"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Car, EllipsisVertical } from "lucide-react"
import { VehicleWithImages } from "../vehicle.type"
import { Avatar, AvatarFallback, AvatarImage } from "@blak/ui/components/avatar"
import { StatusBadge } from "@/features/shared/components/status-badge"

import { Button } from "@blak/ui/components/button"
import { STATUS_MAP } from "../vehicle.const"
import Link from "next/link"

export const VehicleCard = ({ data }: { data: VehicleWithImages }) => {
  return (
    <Card className="relative" size="sm">
      <Link
        href={`/operation/vehicles/${data.id}`}
        className="absolute inset-0"
      />
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
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
