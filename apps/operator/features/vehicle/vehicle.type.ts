import { Vehicle as DBVehicle, File } from "@blak/db"

export type Vehicle = DBVehicle

export type VehicleWithImages = DBVehicle & {
  images: File[]
  documents: File[]
}
