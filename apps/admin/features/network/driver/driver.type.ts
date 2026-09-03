import { User, File } from "@blak/db"

export type DriverWithDocs = User & {
  documents: File[]
}
