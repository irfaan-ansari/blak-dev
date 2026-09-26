import { DataTable } from "@blak/ui/components/data-table"
import { StatusFilter } from "@/features/shared/components/status-filter"
import { passengerColumns } from "@/features/network/passenger/components/passenger-columns"

const passengerStatusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
]

const PassengersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Passengers</h1>
        <StatusFilter options={passengerStatusOptions} />
      </div>

      <DataTable
        columns={passengerColumns}
        data={[]}
        empty={{
          title: "No passengers found",
          description:
            "Passenger profiles will appear here once bookings begin.",
        }}
      />
    </div>
  )
}

export default PassengersPage
