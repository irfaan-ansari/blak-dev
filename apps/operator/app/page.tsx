"use client"
import StatCard from "@/features/dashboard/components/stat-card"
import { Button } from "@blak/ui/components/button"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import React from "react"
import { useAnalytics } from "@/features/analytics/analytic.data"
import { authClient } from "@blak/auth/client"

const HomePage = () => {
  const { data } = authClient.useSession()
  const { data: analytics } = useAnalytics()

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
      <div className="flex gap-4 lg:col-span-4">
        <div className="grid flex-1 gap-1">
          <div className="flex gap-2">
            <span className="text-xl">Welcome!</span>
            <span className="text-xl font-bold">{data?.user?.name}</span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 lg:col-span-3 lg:gap-6">
        {/* stats */}
        <div className="hap-4 grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
          <StatCard
            title="Total Drivers"
            value={analytics?.data?.driverCount}
            icon={
              <Image
                src={"/icons/driver.png"}
                alt="driver-icon"
                width={60}
                height={60}
              />
            }
          />
          <StatCard
            title="Total Vehicles"
            value={analytics?.data?.vehicleCount}
            icon={
              <Image
                src={"/icons/vehicle.png"}
                alt="vehicle-icon"
                width={60}
                height={60}
              />
            }
          />
          <StatCard
            title="Total Rides"
            value={analytics?.data?.rideCount}
            icon={
              <Image
                src={"/icons/ride.png"}
                alt="ride-icon"
                width={60}
                height={60}
              />
            }
          />
        </div>
        {/*  */}
        <div className="grid gap-4 lg:gap-6">
          <Card className="aspect-2/1" size="sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/ride.png"}
                  alt="ride-icon"
                  width={40}
                  height={40}
                />
                <CardTitle>Ride Status</CardTitle>
              </div>
              <CardAction>
                <Button size="sm" variant="outline">
                  Today <ChevronDown />
                </Button>
              </CardAction>
            </CardHeader>
          </Card>
        </div>

        <div className="h-36 rounded-2xl bg-secondary"></div>
      </div>
      <Card className="pt-0">
        <StatCard
          title="Total Revenue"
          className="border-3 border-primary! bg-foreground text-primary"
          value="0.00"
          icon={
            <Image
              src={"/icons/growth.png"}
              alt="driver-icon"
              width={60}
              height={60}
            />
          }
        />
        <div className="px-4 py-6 text-center text-muted-foreground">
          No Transactions
        </div>
      </Card>
    </div>
  )
}

export default HomePage
