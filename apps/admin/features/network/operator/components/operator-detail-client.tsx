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

import { PageSkeleton } from "@blak/ui/components/blak/empty-state"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { ArrowUpRight, Building2, CircleUser, FileTextIcon } from "lucide-react"

import { useOperator } from "@/features/network/operator/operator.data"

export const OperatorDetailClient = () => {
  const id = useParams()?.id

  const { data, isPending } = useOperator(id as string)
  if (isPending) return <PageSkeleton />
  const driver = data?.data

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          {/* stats */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card size="sm">
              <CardContent>
                <CardTitle className="font-semibold">Vehicles</CardTitle>
                <CardDescription>10</CardDescription>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent>
                <CardTitle className="font-semibold">Drivers</CardTitle>
                <CardDescription>10</CardDescription>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent>
                <CardTitle className="font-semibold">Rides</CardTitle>
                <CardDescription>10</CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card size="sm">
            <CardHeader className="border-b">
              <div className="flex items-center gap-4 pr-4">
                <Avatar size="lg" className="rounded-md *:rounded-md">
                  <AvatarFallback>
                    <CircleUser className="size-4 text-sky-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid">
                  <CardTitle className="font-semibold">
                    Lorem ipsum dolor sit.
                  </CardTitle>
                  <CardDescription>Vehicle</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-[1fr_1rem_1fr] border-b pb-6">
              <div>Name</div>
              <div>:</div>
              <div className="pl-10">{driver?.name}</div>
              <div>Phone number</div>
              <div>:</div>
              <div className="pl-10">{driver?.phoneNumber}</div>
              <div>Email</div>
              <div>:</div>
              <div className="pl-10">{driver?.email}</div>
            </CardContent>

            <CardContent className="space-y-2">
              {driver?.documents?.map((doc) => (
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
                    <span className="font-medium">
                      {/* @ts-ignore */}
                      {doc?.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {doc.name}
                    </span>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
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
