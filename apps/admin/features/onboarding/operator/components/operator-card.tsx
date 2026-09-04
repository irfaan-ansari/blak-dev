import React from "react"

import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { CircleUser, Mail, MapPin, Smartphone, Truck } from "lucide-react"

import { OperatorApplication } from "../operator.type"
import { CopyButton } from "@blak/ui/components/blak/copy-button"

import { pluralize } from "@blak/utils/string"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "../operator.const"
import { OperatorAction } from "./operator-action"
import Link from "next/link"

export const OperatorCard = ({ data }: { data: OperatorApplication }) => {
  const { legalBusinessName, state, country, vehicleCount } =
    data.application || {}
  return (
    <Card size="sm" className="relative">
      <Link
        href={`/onboarding/operators/${data.id}`}
        className="absolute inset-0"
      />
      <CardHeader>
        <div className="flex items-start gap-3">
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

            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <CircleUser className="size-3.5" />
                <span className="text-muted-foreground">
                  {data.contactName}
                </span>
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
            </div>
          </div>
        </div>
        <CardAction className="flex items-center gap-3">
          <StatusBadge status={data.currentStatus} statusMap={STATUS_MAP} />
          <OperatorAction data={data} />
        </CardAction>
      </CardHeader>
    </Card>
  )
}
