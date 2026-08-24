import { Organization } from "@blak/db"

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
export type OperatorStatus = Organization["status"]
