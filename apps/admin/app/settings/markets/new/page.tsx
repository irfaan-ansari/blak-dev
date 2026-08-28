import { Button } from "@blak/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Plus } from "lucide-react"
import React from "react"

function NewMarketPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Create Markets</h1>
      </div>

      <div className="grid grid-cols-5 gap-4 md:gap-6">
        <div className="cols-span-5 space-y-4 md:col-span-3">
          <Card size="sm">
            <CardHeader>
              <CardTitle>General</CardTitle>
            </CardHeader>
            <CardContent>market infor</CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Compliance</CardTitle>
            </CardHeader>
            <CardContent>market infor</CardContent>
          </Card>
          <Button variant="secondary" className="w-full">
            <Plus /> Add New
          </Button>
        </div>
        <div className="col-span-2 rounded-2xl bg-card"></div>
      </div>
    </div>
  )
}

export default NewMarketPage
