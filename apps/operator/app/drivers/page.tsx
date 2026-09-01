import React from "react"
import { Button } from "@blak/ui/components/button"
import {
  ChevronDown,
  CircleCheck,
  EllipsisVertical,
  ListFilter,
  Mail,
  Plus,
  Smartphone,
  UserCircle,
} from "lucide-react"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import { Badge } from "@blak/ui/components/badge"
import { DriverDialog } from "@/features/driver/components/driver-dialog"

const drivers = [
  {
    name: "Alex Morgan",
    phone: "+1 415 728 3941",
    email: "alex.morgan@rideblak.com",
    license: "••••4821",
    licenseExpiry: "Dec 2027",
    vehicle: "Mercedes S-Class",
    plateNumber: "8KX 2941",
  },
  {
    name: "Daniel Carter",
    phone: "+1 212 584 7193",
    email: "daniel.carter@rideblak.com",
    license: "••••7316",
    licenseExpiry: "Mar 2028",
    vehicle: "BMW 7 Series",
    plateNumber: "NY 4827",
  },
  {
    name: "Michael Bennett",
    phone: "+44 7700 912845",
    email: "michael.bennett@rideblak.com",
    license: "••••1954",
    licenseExpiry: "Jun 2027",
    vehicle: "Range Rover Autobiography",
    plateNumber: "LK 24 RBL",
  },
  {
    name: "James Anderson",
    phone: "+61 412 583 726",
    email: "james.anderson@rideblak.com",
    license: "••••8642",
    licenseExpiry: "Oct 2028",
    vehicle: "Mercedes V-Class",
    plateNumber: "BLK 726",
  },
  {
    name: "Oliver Wilson",
    phone: "+1 310 647 2185",
    email: "oliver.wilson@rideblak.com",
    license: "••••3279",
    licenseExpiry: "Jan 2029",
    vehicle: "Cadillac Escalade",
    plateNumber: "7BL 9184",
  },
  {
    name: "William Harris",
    phone: "+1 646 391 5827",
    email: "william.harris@rideblak.com",
    license: "••••6093",
    licenseExpiry: "Aug 2027",
    vehicle: "Audi A8",
    plateNumber: "NY 7319",
  },
  {
    name: "Ethan Brooks",
    phone: "+1 305 728 4619",
    email: "ethan.brooks@rideblak.com",
    license: "••••2487",
    licenseExpiry: "Nov 2028",
    vehicle: "Lexus LM",
    plateNumber: "MIA 482",
  },
  {
    name: "Noah Thompson",
    phone: "+44 7911 284637",
    email: "noah.thompson@rideblak.com",
    license: "••••9156",
    licenseExpiry: "Apr 2028",
    vehicle: "Bentley Flying Spur",
    plateNumber: "BLK 84 N",
  },
  {
    name: "Lucas Martin",
    phone: "+33 6 28 47 91 35",
    email: "lucas.martin@rideblak.com",
    license: "••••5738",
    licenseExpiry: "Sep 2027",
    vehicle: "Mercedes EQS",
    plateNumber: "BLK 2026",
  },
  {
    name: "Henry Walker",
    phone: "+1 702 583 1946",
    email: "henry.walker@rideblak.com",
    license: "••••3465",
    licenseExpiry: "Feb 2029",
    vehicle: "Range Rover Vogue",
    plateNumber: "LV 5832",
  },
]

const DriversPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-xl font-bold">Drivers</div>
        <Button
          size="sm"
          variant="outline"
          className="bg-card! hover:bg-card/80"
        >
          Filter by Status
          <ChevronDown />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-card hover:bg-card/80"
        >
          Sort by
          <ListFilter />
        </Button>
        <DriverDialog>
          <Button size="sm">
            <Plus />
            Invite
          </Button>
        </DriverDialog>
      </div>
      <div className="space-y-2">
        {drivers.map((drv, i) => (
          <Card key={i} size="sm">
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
                    value={drv.phone}
                    prefix={<Smartphone className="size-3" />}
                  />
                  <CopyButton
                    value={drv.email}
                    prefix={<Mail className="size-3" />}
                  />
                </div>
                <div className="grid min-w-2xs">
                  <span className="text-sm text-muted-foreground">License</span>
                  <span>{drv.license}</span>
                  <span>Valid until {drv.licenseExpiry} </span>
                </div>
                <div className="grid min-w-2xs">
                  <span className="text-sm text-muted-foreground">Vehicle</span>
                  <span>{drv.vehicle}</span>
                  <span>{drv.plateNumber} </span>
                </div>
              </div>
              <CardAction className="space-x-2">
                <Badge className="h-7 px-2" variant="outline">
                  <CircleCheck className="text-green-500" /> Active
                </Badge>
                <Button variant="outline" size="icon">
                  <EllipsisVertical />
                </Button>
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DriversPage
