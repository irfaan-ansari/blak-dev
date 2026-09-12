"use client"

import React from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blak/ui/components/carousel"
import { useParams } from "next/navigation"
import { ArrowUpRight, Building2 } from "lucide-react"
import { PageSkeleton } from "@blak/ui/components/blak/empty-state"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { useVehicle } from "@/features/operation/vehicle/vehicle.data"
import Link from "next/link"

export const VehicleDetailClient = () => {
  const id = useParams()?.id

  const { data, isPending } = useVehicle(id as string)
  if (isPending) return <PageSkeleton />
  const vehicle = data?.data

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
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
            <CardHeader className="border-b">
              <Link
                href={`/network/operators/${vehicle?.organization?.id}`}
                className="group/link flex items-center gap-3"
              >
                <Avatar size="lg" className="rounded-md *:rounded-md">
                  <AvatarFallback>
                    <Building2 className="size-4 text-rose-500" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid">
                  <CardTitle className="font-semibold">
                    {vehicle?.organization?.name}
                  </CardTitle>
                  <CardDescription>
                    #{vehicle?.organization?.id}
                  </CardDescription>
                </div>
                <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-[0.4fr_3rem_1fr] pb-4">
              <div>Make</div>
              <div>:</div>
              <div>{vehicle?.make}</div>
              <div>Year</div>
              <div>:</div>
              <div>{vehicle?.year}</div>
              <div>Model</div>
              <div>:</div>
              <div>{vehicle?.model}</div>
              <div>Trim level</div>
              <div>:</div>
              <div>{vehicle?.trim}</div>
              <div>VIN</div>
              <div>:</div>
              <div>{vehicle?.vin}</div>
              <div>Engine</div>
              <div>:</div>
              <div>{vehicle?.engine}</div>
              <div>Exterior color</div>
              <div>:</div>
              <div>{vehicle?.exteriorColor}</div>
              <div>Interior color</div>
              <div>:</div>
              <div>{vehicle?.interiorColor}</div>
              <div>License plate</div>
              <div>:</div>
              <div>{vehicle?.licensePlate}</div>
              <div>Registration #</div>
              <div>:</div>
              <div>{vehicle?.registrationNumber}</div>
              <div>Registration expiry</div>
              <div>:</div>
              <div>
                {vehicle?.registrationExpiry &&
                  (vehicle?.registrationExpiry as any)?.split("T")?.[0]}
              </div>
            </CardContent>

            {(vehicle?.images?.length ?? 0) > 0 && (
              <CardContent className="border-t pt-4">
                <Carousel>
                  <CarouselContent>
                    {vehicle?.images?.map((image) => (
                      <CarouselItem
                        className="basis-1/2 lg:basis-1/3"
                        key={image.id}
                      >
                        <div className="space-y-2">
                          <div className="relative overflow-hidden rounded-md">
                            <Image
                              src={image.url ?? ""}
                              alt="vehicle image"
                              width={600}
                              height={600}
                            />
                            <a
                              href={image.url ?? ""}
                              target="_blank"
                              className="absolute inset-0 flex justify-end rounded-md bg-black/20 p-4 opacity-0 backdrop-blur-md transition hover:opacity-50"
                            >
                              <ArrowUpRight className="size-4" />
                            </a>
                          </div>
                          <div className="truncate text-xs text-muted-foreground">
                            {image.field}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            )}
          </Card>
        </div>

        <Card size="sm">
          <CardHeader>
            <CardTitle className="font-semibold">Recent trips</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>No trips </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
