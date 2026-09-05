"use server"

import z from "zod"
import { prisma } from "@blak/db"
import { AppError } from "@blak/utils"
import { sendEmail } from "@blak/email"
import { withPermission } from "@/lib/safe-action"
import AccountApprovedEmail from "@blak/email/templates/account-approved"

const schema = z.object({
  id: z.string(),
  action: z.enum(["approve", "reject", "suspend"]),
})
export const updateOperatorStatus = withPermission({ app: ["admin"] })
  .inputSchema(schema)
  .action(async ({ ctx, clientInput }) => {
    const { id, action } = clientInput

    const org = await prisma.organization.findFirst({
      where: {
        id,
      },
    })
    if (!org) throw new AppError("NOT_FOUND")

    await Promise.all([
      prisma.organization.update({
        where: {
          id,
        },
        data: {
          status: action === "approve" ? "ACTIVE" : "SUSPENDED",
        },
      }),
      sendEmail({
        to: org.contactEmail,
        subject: "Your BLAK operator account has been approved",
        template: AccountApprovedEmail({
          url: process.env.NEXT_PUBLIC_AUTH_URL!,
        }),
      }),
    ])
    return { success: true, id }
  })
