import { Organization, File } from "@blak/db"

type Metadata = {
  address: string
  city: string
  state: string
  pincode: string
  country: string
}
export type Operator = Omit<Organization, "metadata"> & {
  metadata: Metadata
}

export type OperatorWithDocuments = Operator & {
  documents: File[]
}

export type OperatorStatus = Organization["status"]
