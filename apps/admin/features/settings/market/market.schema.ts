import { z } from "zod"

export const marketSchema = z.object({
  name: z.string(),
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
  compliance: z
    .object({
      entityType: z.string(),
      requirments: z
        .object({
          name: z.string(),
          label: z.string(),
          type: z.string(),
        })
        .array(),
    })
    .array(),
})

export type MarketFormValues = z.infer<typeof marketSchema>
