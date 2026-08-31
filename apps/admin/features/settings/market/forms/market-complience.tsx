import React from "react"
import { Plus } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Button } from "@blak/ui/components/button"

export const MarketComplience = () => {
  return (
    <div className="space-y-4">
      <Card size="sm">
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent>market infor</CardContent>
      </Card>
      <Button prefix={<Plus />} className="w-full" variant="outline">
        Add New
      </Button>
    </div>
  )
}
