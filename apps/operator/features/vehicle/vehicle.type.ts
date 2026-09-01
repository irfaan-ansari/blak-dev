import { Vehicle as DBVehicle, Document } from "@blak/db"

export type VehicleWithImages = DBVehicle & {
  images: Document[]
}
