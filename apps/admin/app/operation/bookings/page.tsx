"use client"

import { DataTable } from "@blak/ui/components/data-table"
import { bookingColumns } from "@/features/operation/booking/components/booking-columns"

const BookingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-xl font-bold">Bookings</div>
      </div>

      <DataTable
        columns={bookingColumns}
        data={[]}
        empty={{
          title: "No bookings yet",
          description:
            "Bookings will appear here once customer trips are created.",
        }}
      />
    </div>
  )
}

export default BookingsPage
