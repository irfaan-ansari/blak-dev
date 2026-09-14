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
import {
  ArrowRight,
  CircleCheck,
  Mail,
  Smartphone,
  User,
  UserCircle,
} from "lucide-react"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import { Badge } from "@blak/ui/components/badge"
import Link from "next/link"
import { Button } from "@blak/ui/components/button"

export const DriverClient = () => {
  const { data, isPending, isError, error } = useDrivers()

  if (isPending) return <PageSkeleton />

  if (isError) {
    return <ErrorState title={error.message} description={error.details} />
  }

  if (data?.data?.length === 0) {
    return (
      <EmptyState
        title="No drivers found"
        description="You don't have any drivers yet."
      />
    )
  }

  return (
    <div className="space-y-2">
      {data.data?.map((drv) => (
        <Card size="sm" className="relative">
          <Link href={`/drivers/${drv?.id}`} className="absolute inset-0" />
          <CardHeader>
            <div className="flex items-start gap-3">
              <Avatar className="rounded-md *:rounded-md" size="lg">
                <AvatarFallback>
                  <UserCircle className="size-4 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <CardTitle>{drv.name}</CardTitle>

                <div className="flex">
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
            </div>

            <CardAction className="space-x-1">
              <Badge className="h-7 px-2" variant="success-light">
                <CircleCheck /> Active
              </Badge>
              <Button size="sm" variant="invert" className="ml-auto">
                View details <ArrowRight className="size-3.5" />
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
