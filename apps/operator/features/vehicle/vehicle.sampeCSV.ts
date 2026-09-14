import { VehicleImportRow } from "./vehicle.type"

export const SAMPLE_CSV = [
  [
    "year",
    "make",
    "model",
    "trim",
    "interiorColor",
    "exteriorColor",
    "engine",
    "licensePlate",
    "registrationNumber",
    "vin",
    "registrationExpiry",
  ],
  [
    "2025",
    "Mercedes-Benz",
    "S-Class",
    "S 580",
    "Black",
    "Black",
    "V8",
    "ABC123",
    "REG001",
    "W1K12345678901234",
    "2027-01-15",
  ],
]
  .map((row) => row.join(","))
  .join("\n")

export const REQUIRED_FIELDS: Array<keyof VehicleImportRow> = [
  "year",
  "make",
  "model",
  "trim",
  "interiorColor",
  "exteriorColor",
  "engine",
  "licensePlate",
]
