import React from "react"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import {
  ArrowRight,
  Calendar,
  CircleUser,
  Mail,
  MapPin,
  Smartphone,
  Truck,
} from "lucide-react"

import { OperatorApplication } from "../operator.type"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { formatRelative } from "@blak/utils/format"
import { pluralize } from "@blak/utils/string"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "../operator.const"
import { OperatorAction } from "./operator-action"

export const OperatorCard = ({ data }: { data: OperatorApplication }) => {
  const { legalBusinessName, state, country, vehicleCount } =
    data.application || {}
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar size="lg">
            <AvatarFallback>{legalBusinessName[0]}</AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 flex-1 gap-2">
            <CardTitle>{legalBusinessName}</CardTitle>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {state} {country}
              </span>
              <span className="inline-flex items-center gap-1">
                <Truck className="size-3.5" />
                {pluralize(vehicleCount, "Vehicle")}
              </span>
            </div>
          </div>
        </div>
        <CardAction className="flex items-center gap-3">
          <StatusBadge status={data.currentStatus} statusMap={STATUS_MAP} />
          <OperatorAction data={data} />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="border-t border-dashed"></div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <CircleUser className="size-3.5" />
            <span className="text-muted-foreground">{data.contactName}</span>
            <span className="text-xs text-muted-foreground">
              ({data.contactTitle})
            </span>
          </div>
          <CopyButton
            prefix={<Smartphone className="size-3.5" />}
            value={data.contactPhone}
          />
          <CopyButton
            prefix={<Mail className="size-3.5" />}
            value={data.contactEmail}
          />
          <div className="ml-auto flex items-center gap-1">
            <Calendar className="size-3.5" />
            <span className="text-muted-foreground">
              {formatRelative(data.createdAt)}
            </span>
            <ArrowRight className="size-4 transition-transform group-hover/card:translate-x-0.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
