import z from "zod"

export const processOperatorApplicationschema = z.object({
  id: z.string().min(1),
  action: z.enum(["approve", "reject"]),
})
