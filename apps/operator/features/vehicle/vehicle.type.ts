import { Vehicle as DBVehicle, File } from "@blak/db"

export type VehicleWithImages = DBVehicle & {
  images: File[]
}
