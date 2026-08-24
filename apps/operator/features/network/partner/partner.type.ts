import { Organization } from "@blak/db"

type Metadata = {
  address: string
  city: string
  state: string
  pincode: string
  country: string
}
export type Partner = Omit<Organization, "metadata"> & {
  metadata: Metadata
}
