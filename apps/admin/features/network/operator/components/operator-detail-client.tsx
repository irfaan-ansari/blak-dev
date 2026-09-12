"use client"

import React from "react"

import {
  Card,
  CardAction,
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
import Link from "next/link"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "../operator.const"

export const OperatorDetailClient = () => {
  const id = useParams()?.id

  const { data, isPending } = useOperator(id as string)
  if (isPending) return <PageSkeleton />

  const operator = data?.data

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          {/* stats */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Link
              href={`/operation/vehicles?organization=${operator?.id}`}
              className="group/card relative flex flex-col gap-4 rounded-md bg-card p-4 shadow-xs ring ring-border"
            >
              <CardTitle>Vehicles</CardTitle>
              <div className="text-2xl font-bold">{operator?.vehicleCount}</div>

              <ArrowUpRight className="absolute top-4 right-4 size-4 text-muted-foreground transition group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
            </Link>

            <Link
              href={`/network/drivers?organization=${operator?.id}`}
              className="group/card relative flex flex-col gap-4 rounded-md bg-card p-4 shadow-xs ring ring-border"
            >
              <CardTitle>Drivers</CardTitle>
              <div className="text-2xl font-bold">{operator?.driverCount}</div>

              <ArrowUpRight className="absolute top-4 right-4 size-4 text-muted-foreground transition group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
            </Link>

            <div className="group/card relative flex flex-col gap-4 rounded-md bg-card p-4 shadow-xs ring ring-border">
              <CardTitle>Rides</CardTitle>
              <div className="text-2xl font-bold">0</div>

              <ArrowUpRight className="absolute top-4 right-4 size-4 text-muted-foreground transition group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
            </div>
          </div>

          <Card size="sm">
            <CardHeader className="border-b">
              <div className="flex items-center gap-4 pr-4">
                <Avatar size="lg" className="rounded-md *:rounded-md">
                  <AvatarFallback>
                    <Building2 className="size-4 text-rose-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid">
                  <CardTitle className="font-semibold">
                    {operator?.name}
                  </CardTitle>
                  <CardDescription>#{operator?.id}</CardDescription>
                </div>
              </div>
              <CardAction>
                <StatusBadge
                  status={operator?.status!}
                  statusMap={STATUS_MAP}
                />
              </CardAction>
            </CardHeader>
            <CardContent className="grid grid-cols-[0.4fr_3rem_1fr] gap-0.5">
              <div>Company Name</div>
              <div>:</div>
              <div>{operator?.name}</div>
              <div>Company Legal Name</div>
              <div>:</div>
              <div>{operator?.legalName}</div>
              <div>Phone number</div>
              <div>:</div>
              <div>{operator?.phoneNumber}</div>
              <div>Email</div>
              <div>:</div>
              <div>{operator?.email}</div>
              <div>Website</div>
              <div>:</div>
              <div>{operator?.website}</div>
              <div className="col-span-3 h-10"></div>
              <div>Steet</div>
              <div>:</div>
              <div>{operator?.metadata?.address ?? "-"}</div>
              <div>City</div>
              <div>:</div>
              <div>{operator?.metadata?.city ?? "-"}</div>
              <div>State</div>
              <div>:</div>
              <div>{operator?.metadata?.state ?? "-"}</div>
              <div>Zip code</div>
              <div>:</div>
              <div>{operator?.metadata?.pincode ?? "-"}</div>
              <div>Country</div>
              <div>:</div>
              <div>{operator?.metadata?.country ?? "-"}</div>
              <div className="col-span-3 h-10"></div>
              <div>Primary Contact</div>
              <div>:</div>
              <div>{operator?.contactName ?? "-"}</div>
              <div>Contact Title</div>
              <div>:</div>
              <div>{operator?.contactTitle ?? "-"}</div>
              <div>Contact Phone</div>
              <div>:</div>
              <div>{operator?.contactPhone ?? "-"}</div>
              <div>Contact Email</div>
              <div>:</div>
              <div>{operator?.contactEmail ?? "-"}</div>
            </CardContent>

            {(operator?.documents?.length ?? 0) > 0 && (
              <CardContent className="space-y-2 border-t pt-6">
                {operator?.documents?.map((doc) => (
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
                        {doc?.field}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {doc.name}
                      </span>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                ))}
              </CardContent>
            )}
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
