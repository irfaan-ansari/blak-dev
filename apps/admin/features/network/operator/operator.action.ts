"use server"

import z from "zod"
import { auth } from "@blak/auth"
import { sendEmail } from "@blak/email"
import { withPermission } from "@/lib/safe-action"
import { AppError, REDIRECT_MAP } from "@blak/utils"
import { OrganizationStatus, prisma } from "@blak/db"
import { AccountApprovedEmail } from "@blak/email/templates/account-approved"
import { OnboardingReminderEmail } from "@blak/email/templates/onboarding-reminder"

const schema = z.object({
  id: z.string(),
  data: z.object({
    status: z.enum(OrganizationStatus),
  }),
})
export const updateOperatorStatus = withPermission({ app: ["admin"] })
  .inputSchema(schema)
  .action(async ({ ctx, clientInput }) => {
    const { id, data } = clientInput

    const org = await prisma.organization.findFirst({
      where: {
        id,
      },
    })
    if (!org) throw new AppError("NOT_FOUND")

    await prisma.organization.update({
      where: { id },
      data: { status: data.status },
    })

    if (data.status === "ACTIVE") {
      await sendEmail({
        to: org.contactEmail,
        subject: "Your BLAK operator account has been approved",
        template: AccountApprovedEmail({
          url: process.env.NEXT_PUBLIC_AUTH_URL!,
        }),
      })
    }
    return { success: true, id }
  })

/**
 * send reminder
 */
const reminderSchema = z.object({
  id: z.string(),
})

export const sendReminder = withPermission({ app: ["admin"] })
  .inputSchema(reminderSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput

    const org = await prisma.organization.findFirst({
      where: {
        id,
      },
    })
    if (!org) throw new AppError("NOT_FOUND", { message: "Account not found" })

    const member = await prisma.member.findFirst({
      where: {
        organizationId: id,
        user: {
          email: { in: [org.contactEmail, org.email] },
        },
      },
      include: {
        user: true,
      },
    })

    if (!member)
      throw new AppError("NOT_FOUND", { message: "Account not found" })

    const url = new URL(process.env.NEXT_PUBLIC_AUTH_URL!)

    await auth.api.requestPasswordReset({
      body: {
        email: org.contactEmail,
        redirectTo: `${url.origin}/auth/create-password`,
      },
    })

    return { success: true }
  })

export const sendOnboardingReminder = withPermission({ app: ["admin"] })
  .inputSchema(reminderSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput

    const org = await prisma.organization.findFirst({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        contactEmail: true,
      },
    })

    if (!org) throw new AppError("NOT_FOUND", { message: "Account not found" })

    const url = new URL(REDIRECT_MAP.operator!)

    await sendEmail({
      to: [...new Set([org.contactEmail, org.email].filter(Boolean))],
      subject: "Complete Your Fleet Setup on BLAK",
      template: OnboardingReminderEmail({
        name: org.name,
        url: url.origin,
      }),
    })

    return { success: true }
  })
