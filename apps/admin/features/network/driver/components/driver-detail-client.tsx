"use client"
import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { useParams } from "next/navigation"

import { useDriver } from "@/features/network/driver/driver.data"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { PageSkeleton } from "@blak/ui/components/blak/empty-state"
import {
  ArrowUpRight,
  Building2,
  ExternalLink,
  FileTextIcon,
} from "lucide-react"
import Link from "next/link"

export const DriverDetailClient = () => {
  const id = useParams()?.id

  const { data, isPending } = useDriver(id as string)

  if (isPending) return <PageSkeleton />

  const driver = data?.data

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          {/* stats */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card size="sm">
              <CardContent className="space-y-4">
                <CardTitle>Total Trips</CardTitle>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent className="space-y-4">
                <CardTitle>Completed</CardTitle>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent className="space-y-4">
                <CardTitle>Cancelled</CardTitle>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
          </div>

          <Card size="sm">
            {driver?.organization ? (
              <CardHeader className="border-b">
                <Link
                  href={`/network/operators/${driver?.organization?.id}`}
                  className="group/link flex items-center gap-3"
                >
                  <Avatar size="lg" className="rounded-md *:rounded-md">
                    <AvatarFallback>
                      <Building2 className="size-4 text-pink-500" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <CardTitle className="font-semibold">
                      {driver?.organization?.name}
                    </CardTitle>
                    <CardDescription>
                      #{driver?.organization?.id}
                    </CardDescription>
                  </div>
                  <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </CardHeader>
            ) : (
              <CardHeader className="border-b">
                <CardTitle className="font-semibold">Driver details</CardTitle>
              </CardHeader>
            )}
            <CardContent className="grid grid-cols-[0.4fr_3rem_1fr] border-b pb-4">
              <div>Name</div>
              <div>:</div>
              <div>{driver?.name}</div>
              <div>Phone number</div>
              <div>:</div>
              <div>{driver?.phoneNumber}</div>
              <div>Email</div>
              <div>:</div>
              <div>{driver?.email}</div>
            </CardContent>

            <CardContent className="space-y-2">
              {(driver?.documents?.length || 0) > 0 ? (
                driver?.documents?.map((doc) => (
                  <a
                    href={doc.url!}
                    key={doc.id}
                    target="_blank"
                    className="md group flex gap-4 rounded-md border bg-muted/50 p-4"
                  >
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground">
                      <FileTextIcon className="size-4" />
                    </span>
                    <div className="grid flex-1">
                      <span className="font-medium">{doc?.field}</span>
                      <span className="text-xs text-muted-foreground">
                        {doc.name}
                      </span>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                ))
              ) : (
                <span className="text-muted-foreground">
                  No documents found
                </span>
              )}
            </CardContent>
          </Card>
        </div>

        <Card size="sm" className="lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle className="font-semibold">Recent transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>No transactions </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
