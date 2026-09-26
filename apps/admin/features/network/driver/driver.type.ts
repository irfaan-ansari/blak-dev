import type { File, Organization, User } from "@blak/db"

export type Driver = User & {
  organization: Pick<Organization, "id" | "name"> | null
}

export type DriverWithDocs = Driver & {
  documents: File[]
}
