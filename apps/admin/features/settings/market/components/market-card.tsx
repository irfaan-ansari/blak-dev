import { Badge } from "@blak/ui/components/badge"
import { Button } from "@blak/ui/components/button"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { CircleCheck, CornerDownRight, Globe2, PenSquare } from "lucide-react"
import React from "react"
import type { MarketWithRelations } from "../market.type"
import { MarketDialog } from "./market-dialog"

export const MarketCard = ({ data }: { data: MarketWithRelations }) => {
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
            <CardTitle>
              {data.name}{" "}
              <span className="text-xs text-muted-foreground">
                ({data.iso2})
              </span>
            </CardTitle>
            <div className="flex items-start gap-1">
              <CornerDownRight className="size-3 text-muted-foreground opacity-80" />
              <span className="text-xs text-muted-foreground">
                Currency: {data.currency.code}
              </span>
              <span className="text-xs text-muted-foreground">
                Phone Code: {data.country.phoneCode}
              </span>
            </div>
          </div>
        </div>
        <CardAction className="flex items-center gap-3">
          <Badge variant="outline" className="h-7 tracking-wider">
            <CircleCheck className="size-3.5 text-green-500" />
            {data?.status}
          </Badge>
          <MarketDialog
            id={data.id}
            values={{
              ...data,
              status: data.status as "ACTIVE" | "INACTIVE",
            }}
          >
            <Button
              variant="outline"
              size="xs"
              className="bg-foreground text-background hover:bg-foreground/80 hover:text-background"
            >
              Edit
              <PenSquare className="size-3" />
            </Button>
          </MarketDialog>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
