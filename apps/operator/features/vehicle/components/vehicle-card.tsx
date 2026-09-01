import React from "react"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import {
  Car,
  EllipsisVertical,
  Smartphone,
  SquarePen,
  UserCircle,
} from "lucide-react"
import { Badge } from "@blak/ui/components/badge"
import { VehicleWithImages } from "../vehicle.type"
import { Avatar, AvatarFallback, AvatarImage } from "@blak/ui/components/avatar"
import { StatusBadge } from "@/features/shared/components/status-badge"
import { STATUS_MAP } from "../vehicle.const"
import { CopyButton } from "@blak/ui/components/blak/copy-button"
import { Button } from "@blak/ui/components/button"
import { VehicleDialog } from "./vehicle-dialog"

const VehicleCard = ({ data }: { data: VehicleWithImages }) => {
  return (
    <Card className="ring-ring/10" size="sm">
      <CardHeader className="gap-x-10">
        <div className="flex h-full items-start gap-3">
          <Avatar size="lg">
            <AvatarImage src={data?.images?.[0]?.url ?? ""} />
            <AvatarFallback>
              <Car className="size-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="grid min-w-2xs gap-0.5">
            <CardTitle>
              {data.make}{" "}
              <span className="text-muted-ground text-xs">({data.color})</span>
            </CardTitle>
            <CardDescription>Plate number: {data.plateNumber}</CardDescription>
          </div>
          <div className="grid min-w-2xs">
            <span className="text-muted-foreground">Driver</span>
            <span>Daniel Carter</span>
            <CopyButton
              value="+1 1234123123"
              prefix={<Smartphone className="size-3" />}
            />
          </div>
        </div>

        <CardAction className="space-x-2">
          <StatusBadge statusMap={STATUS_MAP} status={data.status} />
          <VehicleDialog>
            <Button variant="outline" size="icon">
              <SquarePen size="3" />
            </Button>
          </VehicleDialog>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

export default VehicleCard
