"use client"

import { useParams } from "next/navigation"
import { useVehicle } from "@/features/vehicle/vehicle.data"
import { PageSkeleton } from "@blak/ui/components/blak/empty-state"
import { VehicleForm } from "@/features/vehicle/form/vehicle-form"
import { DEFAULT_VALUES } from "@/features/vehicle/vehicle.schema"

function VehicleEditPage() {
  const params = useParams()
  const id = params.id as string

  const { data, isPending } = useVehicle(id)

  if (isPending) return <PageSkeleton />

  const vehicle = data?.data!

  return (
    <VehicleForm
      id={`${vehicle?.id}`}
      data={{
        ...vehicle,
        year: `${vehicle?.year}`,
        make: `${vehicle?.make}`,
        model: `${vehicle?.model}`,
        trim: `${vehicle?.trim}`,
        engine: `${vehicle?.engine}`,
        interiorColor: `${vehicle?.interiorColor}`,
        exteriorColor: `${vehicle?.exteriorColor}`,
        licensePlate: `${vehicle?.licensePlate}`,
        vin: `${vehicle?.vin}`,
        registrationExpiry: `${vehicle?.registrationExpiry}`,
        registrationNumber: `${vehicle?.registrationNumber}`,
        category: `${vehicle?.category}`,
        status: `${vehicle?.status}`,
        // @ts-expect-error
        documents: vehicle?.documents?.length
          ? vehicle.documents.map((doc) => ({
              id: doc.id,
              label: doc.field!,
              file: undefined as any,
              url: doc.url,
            }))
          : DEFAULT_VALUES.documents,
        // @ts-expect-error
        images: vehicle?.images?.length
          ? vehicle.images.map((img) => ({
              id: img.id,
              label: img.field!,
              file: undefined as any,
              url: img.url,
            }))
          : DEFAULT_VALUES.images,
      }}
    />
  )
}

export default VehicleEditPage
