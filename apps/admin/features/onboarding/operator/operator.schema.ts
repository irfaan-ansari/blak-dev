import { ApplicationStatus } from "@blak/db"
import z from "zod"

export const processOperatorApplicationschema = z.object({
  id: z.string().min(1),
  action: z.enum(ApplicationStatus),
})
