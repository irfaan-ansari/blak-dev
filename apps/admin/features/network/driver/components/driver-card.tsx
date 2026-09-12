import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { Badge } from "@blak/ui/components/badge"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CircleCheck,
  Mail,
  Smartphone,
  UserCircle,
} from "lucide-react"
import React from "react"
import type { Driver } from "../driver.type"
import Link from "next/link"
import DriverAction from "./driver-action"
import { Button } from "@blak/ui/components/button"

export const DriverCard = ({ data }: { data: Driver }) => {
  return (
    <Card size="sm" className="relative">
      <Link
        href={`/network/drivers/${data?.id}`}
        className="absolute inset-0"
      />
      <CardHeader className="border-b">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarFallback>
              <UserCircle className="size-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle>{data.name}</CardTitle>
            <Link
              href={`/network/operators/${data.organization?.id}`}
              className="group/link relative flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Building2 className="size-3" /> {data.organization?.name}
              <ArrowUpRight className="size-3 transition group-hover/link:translate-x-px group-hover/link:-translate-y-px" />
            </Link>
          </div>
        </div>
        <CardAction className="relative space-x-2">
          <Badge className="h-7 px-2" variant="success-light">
            <CircleCheck /> Active
          </Badge>
          {/* <DriverAction data={data} /> */}
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-start">
        <CopyButton
          value={data.phoneNumber ?? ""}
          prefix={<Smartphone className="size-3" />}
        />
        <CopyButton value={data.email} prefix={<Mail className="size-3" />} />
        <Button size="sm" variant="invert" className="ml-auto">
          View details <ArrowRight className="size-3.5" />
        </Button>
      </CardContent>
    </Card>
  )
}
