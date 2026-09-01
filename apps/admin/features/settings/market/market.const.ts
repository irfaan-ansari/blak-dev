import { MarketFormValues } from "./market.schema"

export const DEFAULT_VALUES: MarketFormValues = {
  name: "",
  iso2: "",
  country: { id: "", name: "" },
  currency: { id: "", code: "", symbol: "" },
  status: "ACTIVE",
  complianceRequirements: [],
}

export const COMPLIANCE_ENTITIES = [
  { label: "Operator", value: "OPERATOR", field: "operator" },
  { label: "Partner", value: "PARTNER", field: "partner" },
  { label: "Driver", value: "DRIVER", field: "driver" },
  { label: "Vehicle", value: "VEHICLE", field: "vehicle" },
] as const

export const COMPLIANCE_TYPE = [
  { label: "Text", value: "NUMBER" },
  { label: "Document", value: "DOCUMENT" },
] as const
