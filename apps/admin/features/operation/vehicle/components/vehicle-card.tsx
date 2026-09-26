import React from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { ArrowUpRight, Building2, Car, CarFront, Pencil } from "lucide-react"
import type { Vehicle } from "../vehicle.type"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { StatusBadge } from "@/features/shared/components/status-badge"

import { Button } from "@blak/ui/components/button"
import { STATUS_MAP } from "../vehicle.const"
import Link from "next/link"
import VehicleAction from "./vehicle-action"

export const VehicleCard = ({ data }: { data: Vehicle }) => {
  return (
    <Card className="relative" size="sm">
      <Link
        href={`/operation/vehicles/${data.id}`}
        className="absolute inset-0"
      />
      <CardHeader className="border-b">
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

        <CardAction>
          <StatusBadge statusMap={STATUS_MAP} status={data.status} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Link
          href={`/network/operators/${data?.organization?.id}`}
          className="group/link relative flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Building2 className="size-3.5 text-muted-foreground" />
          {data?.organization?.name}
          <ArrowUpRight className="group-hover/link-translatex-x-px size-3 transition group-hover/link:-translate-y-px" />
        </Link>
        <VehicleAction data={data}>
          <Button variant="invert" size="sm" className="relative ml-auto">
            <Pencil className="size-3.5" /> Action
          </Button>
        </VehicleAction>
      </CardContent>
    </Card>
  )
}
