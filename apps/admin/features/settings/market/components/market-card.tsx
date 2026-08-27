import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { Badge } from "@blak/ui/components/badge"
import { Button } from "@blak/ui/components/button"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import {
  CheckCircle,
  CircleCheck,
  CornerDownRight,
  EllipsisVertical,
  Globe2,
} from "lucide-react"
import React from "react"

export const MarketCard = () => {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>
              <Globe2 className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <CardTitle>Lorem, ipsum dolor.</CardTitle>
            <div className="flex items-start gap-1">
              <CornerDownRight className="size-3 text-muted-foreground opacity-80" />
              <span className="text-xs text-muted-foreground">12 States</span>
              <span className="text-xs text-muted-foreground">18 Cities</span>
            </div>
          </div>
        </div>
        <CardAction className="flex items-center gap-3">
          <Badge variant="outline" className="h-7 tracking-wider uppercase">
            <CircleCheck className="size-3.5 text-green-500" />
            Active
            <span className="border-l pl-2">$</span>
          </Badge>
          <Button variant="outline" size="icon">
            <EllipsisVertical className="size-4" />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
