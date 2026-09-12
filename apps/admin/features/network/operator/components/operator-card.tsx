import React from "react"
import Link from "next/link"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"

import { CopyButton } from "@blak/ui/components/blak/copy-button"
import { Avatar, AvatarFallback, AvatarImage } from "@blak/ui/components/avatar"
import {
  Building2,
  CarFront,
  Mail,
  MapPin,
  Smartphone,
  UserCheck,
  Users,
} from "lucide-react"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { OperatorAction } from "./operator-action"
import { Operator } from "../operator.type"
import { STATUS_MAP } from "../operator.const"

export const OperatorCard = ({ data }: { data: Operator }) => {
  return (
    <Card size="sm" className="relative">
      <Link
        href={`/network/operators/${data.id}`}
        className="absolute inset-0"
      />
      <CardHeader className="border-b">
        <div className="flex items-start gap-3">
          <Avatar size="lg" className="rounded-md *:rounded-md">
            <AvatarImage src={data.logo ?? ""} />
            <AvatarFallback>
              <Building2 className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 flex-1">
            <CardTitle className="font-semibold">{data.name}</CardTitle>
            <div className="mb-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              <span>
                {data.metadata?.state} {data.metadata?.country}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4">
              <CopyButton
                prefix={<Smartphone className="size-3.5" />}
                value={data.phoneNumber}
              />
              <CopyButton
                prefix={<Mail className="size-3.5" />}
                value={data.email}
              />
            </div>
          </div>
        </div>
        <CardAction>
          <StatusBadge status={data.status} statusMap={STATUS_MAP} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Users className="size-3.5 text-muted-foreground" />
          {data.driverCount}
          <span className="text-muted-foreground">Drivers</span>
        </div>
        <div className="flex items-center gap-1">
          <CarFront className="size-3.5 text-muted-foreground" />
          {data.vehicleCount}
          <span className="text-muted-foreground">Vehicles</span>
        </div>
        <div className="relative ml-auto">
          <OperatorAction data={data} />
        </div>
      </CardContent>
    </Card>
  )
}
