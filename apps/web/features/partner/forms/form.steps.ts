import { FormOperation } from "./steps/form-operation"
import { FormContact } from "./steps/form-contact"
import { FormBusiness } from "./steps/form-business"
import { FormPartnership } from "./steps/form-partnership"
import {
  businessSchema,
  contactSchema,
  locationSchema,
  operationSchema,
  partnershipSchema,
} from "../partner.schema"
import { FormAddress } from "./steps/form-address"

export const STEPS = [
  {
    key: "business",
    component: FormBusiness,
    schema: businessSchema,
  },
  {
    key: "address",
    component: FormAddress,
    schema: locationSchema,
  },
  {
    key: "contact",
    component: FormContact,
    schema: contactSchema,
  },
  {
    key: "operations",
    component: FormOperation,
    schema: operationSchema,
  },
  {
    key: "partnership",
    component: FormPartnership,
    schema: partnershipSchema,
  },
] as const
