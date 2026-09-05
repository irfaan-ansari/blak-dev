"use client"
import React from "react"
import { useDrivers } from "../driver.data"
import {
  EmptyState,
  ErrorState,
  PageSkeleton,
} from "@blak/ui/components/blak/empty-state"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { CircleCheck, Mail, Smartphone, UserCircle } from "lucide-react"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import { Badge } from "@blak/ui/components/badge"
import Link from "next/link"

export const DriverClient = () => {
  const { data, isPending, isError, error } = useDrivers()

  if (isPending) return <PageSkeleton />

  if (isError) {
    return <ErrorState title={error.message} description={error.details} />
  }

  if (data?.data?.length === 0) {
    return (
      <EmptyState
        title="No vehicles found"
        description="You don't have any vehicles yet."
      />
    )
  }

  return (
    <div className="space-y-2">
      {data.data?.map((drv) => (
        <Card key={drv.id} size="sm" className="relative">
          <Link href={`/drivers/${drv.id}`} className="absolute inset-0" />
          <CardHeader>
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback>
                  <UserCircle className="size-4 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="grid min-w-2xs">
                <CardTitle>{drv.name}</CardTitle>
                <CopyButton
                  value={drv.phoneNumber ?? ""}
                  prefix={<Smartphone className="size-3" />}
                />
                <CopyButton
                  value={drv.email}
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
      ))}
    </div>
  )
}
