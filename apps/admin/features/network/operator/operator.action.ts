"use server"

import { withPermission } from "@/lib/safe-action"
import { prisma } from "@blak/db"
import { AppError } from "@blak/utils"
import z from "zod"

const schema = z.object({
  id: z.string(),

  action: z.enum(["activate", "reject", "suspend"]),
})
export const updateOperatorStatus = withPermission({ app: ["admin"] })
  .inputSchema(schema)
  .action(async ({ ctx, clientInput }) => {
    const { id, action } = clientInput

    const org = await prisma.organization.findMany({
      where: {
        id,
      },
    })
    if (!org) throw new AppError("NOT_FOUND")

    await prisma.organization.update({
      where: {
        id,
      },
      data: {
        status: action === "activate" ? "ACTIVE" : "ONBOARDING",
      },
    })
    return { success: true, id }
  })
