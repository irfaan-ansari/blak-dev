import { z } from "zod"

const entityTypeSchema = z.enum(["NUMBER", "DOCUMENT"])
const entitySchema = z.enum(["OPERATOR", "PARTNER", "DRIVER", "VEHICLE"])

export const complianceRequirementSchema = z.object({
  id: z.string().optional(),
  entityType: entitySchema,
  name: z.string().min(1),
  label: z.string().min(1),
  type: entityTypeSchema,
  isRequired: z.boolean(),
})

export const marketSchema = z.object({
  name: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  iso2: z.string(),
  country: z.object({
    id: z.string(),
    name: z.string(),
  }),
  currency: z.object({
    id: z.string(),
    code: z.string(),
    symbol: z.string(),
  }),
  complianceRequirements: z.array(complianceRequirementSchema),
})

export type MarketFormValues = z.infer<typeof marketSchema>

const marketActionSchema = z.object({
  name: z.string(),
  iso2: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  countryId: z.string(),
  currencyId: z.string(),
  complianceRequirements: z.array(
    z.object({
      id: z.string().optional(),
      entityType: entitySchema,
      name: z.string(),
      label: z.string(),
      type: entityTypeSchema,
      isRequired: z.boolean(),
    })
  ),
})

export const createMarketSchema = z.object({
  data: marketActionSchema,
})
export const updateMarketSchema = z.object({
  id: z.string().min(1, "Market ID is required"),
  data: marketActionSchema,
})
