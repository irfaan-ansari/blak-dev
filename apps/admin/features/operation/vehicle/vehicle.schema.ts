import z from "zod"
import { VehicleStatus } from "@blak/db"

export const vehicleStatusSchema = z.object({
  id: z.string(),
  data: z.object({
    status: z.enum(VehicleStatus),
  }),
})
