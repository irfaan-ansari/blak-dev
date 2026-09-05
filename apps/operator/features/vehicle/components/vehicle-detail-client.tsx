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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@blak/ui/components/carousel"
import Image from "next/image"
import { PageSkeleton } from "@blak/ui/components/blak/empty-state"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { Building2, CircleUser } from "lucide-react"
import { useVehicle } from "../vehicle.data"

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
              <CardContent>
                <CardTitle className="font-semibold">Total Trips</CardTitle>
                <CardDescription>10</CardDescription>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent>
                <CardTitle className="font-semibold">Completed</CardTitle>
                <CardDescription>10</CardDescription>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardContent>
                <CardTitle className="font-semibold">Cancelled</CardTitle>
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
                  <CardTitle className="font-semibold">Driver Name</CardTitle>
                  <CardDescription>#123456</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-[1fr_1rem_1fr] border-b pb-6">
              <div>Make</div>
              <div>:</div>
              <div className="pl-10">{vehicle?.make}</div>
              <div>Year</div>
              <div>:</div>
              <div className="pl-10">{vehicle?.year}</div>
              <div>Model</div>
              <div>:</div>
              <div className="pl-10">{vehicle?.model}</div>
              <div>Trim level</div>
              <div>:</div>
              <div className="pl-10">{vehicle?.trim}</div>
              <div>VIN</div>
              <div>:</div>
              <div className="pl-10">{vehicle?.vin}</div>
              <div>Engine</div>
              <div>:</div>
              <div className="pl-10">{vehicle?.engine}</div>
              <div>Exterior color</div>
              <div>:</div>
              <div className="pl-10">{vehicle?.exteriorColor}</div>
              <div>Interior color</div>
              <div>:</div>
              <div className="pl-10">{vehicle?.interiorColor}</div>
              <div>License plate</div>
              <div>:</div>
              <div className="pl-10">{vehicle?.licensePlate}</div>
              <div>Registration #</div>
              <div>:</div>
              <div className="pl-10">{vehicle?.registrationNumber}</div>
              <div>Registration expiry</div>
              <div>:</div>
              <div className="pl-10">
                {/* {vehicle?.registrationExpiry &&
                  vehicle?.registrationExpiry?.toISOString()} */}
              </div>
            </CardContent>

            <CardContent>
              <Carousel>
                <CarouselContent>
                  {vehicle?.images?.map((image) => (
                    <CarouselItem
                      className="basis-1/2 lg:basis-1/3"
                      key={image.id}
                    >
                      <div className="relative overflow-hidden rounded-md">
                        <Image
                          src={image.url ?? ""}
                          alt="vehicle image"
                          width={600}
                          height={600}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
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
