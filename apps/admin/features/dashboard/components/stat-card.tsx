import { Card, CardContent, CardTitle } from "@blak/ui/components/card"
import { Skeleton } from "@blak/ui/components/skeleton"
import { cn } from "@blak/ui/lib/utils"
import React from "react"

const StatCard = ({
  icon,
  title,
  value,
  className,
}: {
  icon: React.ReactNode
  title: string
  value: string | number
  className?: string
}) => {
  return (
    <Card className={cn("min-h-36", className)} size="sm">
      <CardContent className="flex h-full items-start justify-between gap-4">
        {icon}
        <div className="flex h-full flex-col justify-between gap-4">
          <CardTitle>{title}</CardTitle>
          <div className="text-right text-3xl font-black">
            {value ?? <Skeleton className="ml-auto h-5 w-20" />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard
