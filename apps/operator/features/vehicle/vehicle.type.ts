import { Vehicle as DBVehicle, File } from "@blak/db"

export type Vehicle = DBVehicle

export type VehicleWithImages = DBVehicle & {
  images: File[]
  documents: File[]
}

export type VehicleImportRow = {
  originalRowNumber?: number
  year: string
  make: string
  model: string
  trim: string
  interiorColor: string
  exteriorColor: string
  engine: string
  licensePlate: string
  registrationNumber?: string
  vin?: string
  registrationExpiry?: string
}
