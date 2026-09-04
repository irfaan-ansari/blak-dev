import React from "react"

import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Building2, Mail, MapPin, Smartphone } from "lucide-react"

import { CopyButton } from "@blak/ui/components/blak/copy-button"
import { Avatar, AvatarFallback, AvatarImage } from "@blak/ui/components/avatar"

import { StatusBadge } from "@/features/shared/components/status-badge"
import { Operator } from "../operator.type"
import { STATUS_MAP } from "../operator.const"
import { OperatorAction } from "./operator-action"
import Link from "next/link"

export const OperatorCard = ({ data }: { data: Operator }) => {
  return (
    <Card size="sm">
      <Link
        href={`/network/operators/${data.id}`}
        className="absolute inset-0"
      />
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar size="lg">
            <AvatarImage src={data.logo ?? ""} />
            <AvatarFallback>
              <Building2 className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 flex-1 gap-2">
            <CardTitle className="font-semibold">{data.name}</CardTitle>

            <div className="flex flex-wrap items-center gap-x-4">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                <span className="text-muted-foreground">
                  {data.metadata?.state} {data.metadata?.country}
                </span>
              </span>
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
        <CardAction className="relative flex items-center gap-3">
          <StatusBadge status={data.status} statusMap={STATUS_MAP} />
          <OperatorAction data={data} />
        </CardAction>
      </CardHeader>
    </Card>
  )
}
