import { Badge } from "@blak/ui/components/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { UserCircle } from "lucide-react"
import React from "react"

const VehicleCard = () => {
  return (
    <Card className="ring-ring/10" size="sm">
      <CardHeader className="gap-x-10">
        <div className="flex items-start gap-3">
          <div className="size-12 rounded-full border"></div>
          <div className="grid min-w-0 flex-1 gap-0.5">
            <CardTitle>Name - Make</CardTitle>
            <CardDescription>model</CardDescription>
          </div>
          <Badge className="h-8 self-center" variant="outline">
            <UserCircle className="size-4" /> Driver
          </Badge>
        </div>
        <CardAction>
          <Badge className="h-7 rounded-md">Approved</Badge>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

export default VehicleCard
