import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { Badge } from "@blak/ui/components/badge"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { CircleCheck, Mail, Smartphone, UserCircle } from "lucide-react"
import React from "react"
import { DriverWithDocs } from "../driver.type"
import Link from "next/link"

export const DriverCard = ({ data }: { data: DriverWithDocs }) => {
  return (
    <Card size="sm">
      <Link
        href={`/network/drivers/${data?.id}`}
        className="absolute inset-0"
      />
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarFallback>
              <UserCircle className="size-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="grid min-w-2xs">
            <CardTitle>{data.name}</CardTitle>
            <CopyButton
              value={data.phoneNumber ?? ""}
              prefix={<Smartphone className="size-3" />}
            />
            <CopyButton
              value={data.email}
              prefix={<Mail className="size-3" />}
            />
          </div>
        </div>
        <CardAction className="relative space-x-2">
          <Badge className="h-7 px-2" variant="outline">
            <CircleCheck className="text-green-500" /> Active
          </Badge>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
