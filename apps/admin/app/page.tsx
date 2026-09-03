"use client"
import StatCard from "@/features/dashboard/components/stat-card"
import { useAnalytics } from "@/features/dashboard/dashboard.data"
import { authClient } from "@blak/auth/client"
import { Card } from "@blak/ui/components/card"
import Image from "next/image"
import React from "react"

const HomePage = () => {
  const { data: session } = authClient.useSession()
  const { data } = useAnalytics()
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
      <div className="flex gap-4 lg:col-span-4">
        <div className="grid flex-1 gap-1">
          <div className="flex gap-2">
            <span className="text-xl">Welcome!</span>
            <span className="text-xl font-bold">
              {session?.user?.name || "Guest"}
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 lg:col-span-3 lg:gap-6">
        {/* stats */}
        <div className="hap-4 grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
          <StatCard
            icon={
              <Image
                src={"/icons/vehicles.png"}
                alt="vehicle-icon"
                width={70}
                height={70}
              />
            }
            className="bg-linear-to-b from-blue-500 to-blue-300"
            title="Total Vehicles"
            value={data?.data?.vehicleCount}
          />
          <StatCard
            icon={
              <Image
                src={"/icons/operator.png"}
                alt="vehicle-icon"
                width={70}
                height={70}
              />
            }
            className="bg-linear-to-b from-yellow-500 to-yellow-600"
            title="Total Drivers"
            value={data?.data?.driverCount}
          />
          <StatCard
            icon={
              <Image
                src={"/icons/passenger.png"}
                alt="vehicle-icon"
                width={70}
                height={70}
              />
            }
            className="bg-linear-to-b from-violet-500 to-indigo-600"
            title="Total Passengers"
            value={data?.data?.passengerCount}
          />
        </div>
        {/*  */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <Card className="aspect-[1/0.7]" />
          <Card className="aspect-[1/0.7]" />
        </div>

        <Card className="h-36" />
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
