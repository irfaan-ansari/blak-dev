import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { Badge } from "@blak/ui/components/badge"
import { Button } from "@blak/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { EllipsisVertical, Globe2 } from "lucide-react"
import React from "react"

export const MarketCard = () => {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              <Globe2 className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <CardTitle>Lorem, ipsum dolor.</CardTitle>
          </div>
        </div>
        <CardAction className="flex items-center gap-3">
          <Badge>Active</Badge>
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-t"></div>
        <div className="flex gap-4">
          <span className="text-xs text-muted-foreground">12 States</span>
          <span className="text-xs text-muted-foreground">18 Cities</span>
        </div>
      </CardContent>
    </Card>
  )
}
