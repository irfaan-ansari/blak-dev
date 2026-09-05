import type { User, File } from "@blak/db"

export type DriverWithDocument = User & {
  documents: File[]
}
