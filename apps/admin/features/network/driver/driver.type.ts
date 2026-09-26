import type { File, Organization, User, Vehicle } from "@blak/db"

export type Driver = User & {
  organization: Pick<Organization, "id" | "name"> | null
  vehicle: Pick<Vehicle, "id" | "make" | "model" | "licensePlate"> | null
}

export type DriverWithDocs = Driver & {
  documents: File[]
}
