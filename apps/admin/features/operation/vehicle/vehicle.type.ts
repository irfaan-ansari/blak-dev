import { Vehicle as DBVehicle, File, Organization } from "@blak/db"

export type Vehicle = DBVehicle & {
  organization: Pick<Organization, "id" | "name">
}
export type VehicleWithImages = Vehicle & {
  images: File[]
}
