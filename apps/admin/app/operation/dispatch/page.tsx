import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@blak/ui/components/card"
import { Badge } from "@blak/ui/components/badge"
import { Button } from "@blak/ui/components/button"
import { DataTable } from "@blak/ui/components/data-table"
import type { DataTableColumnDef } from "@blak/ui/components/data-table"
import {
  Activity,
  CarFront,
  Clock,
  MapPin,
  Radio,
  UserRound,
} from "lucide-react"

const dispatchColumns: DataTableColumnDef<{ id: string }>[] = [
  { id: "booking", header: "Booking" },
  { id: "pickup", header: "Pickup" },
  { id: "driver", header: "Driver" },
  { id: "vehicle", header: "Vehicle" },
  { id: "eta", header: "ETA" },
  { id: "status", header: "Status" },
  { id: "actions", header: "" },
]

const metrics = [
  { label: "Live trips", value: "0", icon: Activity },
  { label: "Pending assignment", value: "0", icon: Clock },
  { label: "Available drivers", value: "0", icon: UserRound },
  { label: "Available vehicles", value: "0", icon: CarFront },
]

const DispatchPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Live Dispatch</h1>
          <p className="text-sm text-muted-foreground">
            Monitor active bookings, assignments, and fleet availability.
          </p>
        </div>

        <Badge className="h-7 border-emerald-600 bg-emerald-600 px-2.5 text-white">
          Live
        </Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon }) => (
          <Card key={label} size="sm">
            <CardContent className="flex items-center justify-between">
              <div className="grid gap-1">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-2xl font-semibold">{value}</span>
              </div>
              <Icon className="size-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          <Card size="sm" className="overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle className="font-semibold">Dispatch Map</CardTitle>
            </CardHeader>
            <CardContent className="flex min-h-80 items-center justify-center bg-secondary/30">
              <div className="grid justify-items-center gap-2 text-center text-muted-foreground">
                <MapPin className="size-6" />
                <div className="text-sm font-medium">No active trips</div>
                <div className="max-w-sm text-xs">
                  Driver positions and active routes will appear here once
                  dispatch data is connected.
                </div>
              </div>
            </CardContent>
          </Card>

          <DataTable
            columns={dispatchColumns}
            data={[]}
            empty={{
              title: "No live dispatch items",
              description:
                "Active and pending bookings will appear here when dispatch begins.",
            }}
          />
        </div>

        <div className="space-y-4">
          <Card size="sm">
            <CardHeader className="border-b">
              <CardTitle className="font-semibold">Assignment Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <EmptyDispatchState
                icon={Radio}
                title="No bookings waiting"
                description="New booking requests will queue here for assignment."
              />
            </CardContent>
          </Card>

          <Card size="sm">
            <CardHeader className="border-b">
              <CardTitle className="font-semibold">
                Available Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" className="justify-start" disabled>
                <UserRound className="size-4" />
                No available drivers
              </Button>
              <Button variant="outline" className="justify-start" disabled>
                <CarFront className="size-4" />
                No available vehicles
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function EmptyDispatchState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Radio
  title: string
  description: string
}) {
  return (
    <div className="grid justify-items-center gap-2 rounded-md border border-dashed p-6 text-center">
      <Icon className="size-5 text-muted-foreground" />
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  )
}

export default DispatchPage
