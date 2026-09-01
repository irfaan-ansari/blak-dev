"use server"
import z from "zod"
import { auth } from "@blak/auth"
import { headers } from "next/headers"
import { withPermission } from "@/lib/safe-action"

export const inviteDriver = withPermission({ app: ["operator"] })
  .inputSchema(
    z.object({
      data: z.object({
        email: z.email("Invalid email"),
      }),
    })
  )
  .action(async ({ ctx, clientInput }) => {
    const organizationId = ctx.session.activeOrganizationId!
    const { email } = clientInput.data

    const data = await auth.api.createInvitation({
      body: {
        email,
        role: "member",
        organizationId,
        resend: true,
        userRole: "driver",
      },

      headers: await headers(),
    })

    return { success: true, id: data.id }
  })
