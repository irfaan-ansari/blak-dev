import type { User, File, Vehicle } from "@blak/db"

export type DriverWithVehicle = User & {
  vehicle: Pick<Vehicle, "id" | "make" | "model" | "licensePlate"> | null
}

export type DriverWithDocument = User & {
  documents: File[]
}
