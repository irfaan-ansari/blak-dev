"use server"

import { prisma } from "@blak/db"
import { headers } from "next/headers"
import { auth } from "@blak/auth"
import { slugify } from "@blak/utils/string"
import { withPermission } from "@/lib/safe-action"
import { OperatorApplication } from "./operator.type"
import { processOperatorApplicationschema } from "./operator.schema"

export const processOperatorApplication = withPermission({
  application: ["update"],
})
  .inputSchema(processOperatorApplicationschema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, action } = parsedInput
    const { session } = ctx
    const application = await prisma.application.findUnique({
      where: { id },
      include: { operatorApplication: true },
    })

    if (!application) throw new Error("Application not found")

    let inviteUrl = null
    if (action === "reject") {
      await rejectApplication(id, session.userId)
    }

    if (action === "approve") {
      const result = await approveApplication(
        {
          ...application,
          application: application.operatorApplication!,
        },
        session.userId
      )
      const url = new URL(process.env.NEXT_PUBLIC_AUTH_URL!)
      inviteUrl = `${url.origin}/auth/accept-invitation/${result.id}`
    }

    return { success: true, inviteUrl }
  })

/** reject application */
export async function rejectApplication(applicationId: string, userId: string) {
  return prisma.$transaction([
    prisma.application.update({
      where: { id: applicationId },
      data: {
        currentStatus: "REJECTED",
        decidedAt: new Date(),
      },
    }),
    prisma.review.create({
      data: {
        entityId: applicationId,
        entityType: "APPLICATION",
        status: "REJECTED",
        reason: "Application rejected",
        reviewerId: userId,
      },
    }),
  ])
}

/** approve application */
export async function approveApplication(
  application: Omit<OperatorApplication, "reviews">,
  userId: string
) {
  const org = await createOrgForApplication(application)

  const invitation = await auth.api.createInvitation({
    body: {
      email: application.contactEmail,
      role: "owner",
      organizationId: org.id,
      resend: true,
      userRole: "operator",
    },
    headers: await headers(),
  })

  await prisma.$transaction([
    prisma.application.update({
      where: { id: application.id },
      data: {
        invitationId: invitation.id,
        currentStatus: "APPROVED",
        organizationId: org.id,
        decidedAt: new Date(),
      },
    }),
    prisma.review.create({
      data: {
        entityId: application.id,
        entityType: "APPLICATION",
        status: "APPROVED",
        reason: "Application approved",
        reviewerId: userId,
      },
    }),
  ])

  return invitation
}

/** create organization */
async function createOrgForApplication(
  application: Omit<OperatorApplication, "reviews">
) {
  const {
    legalBusinessName,
    businessPhone,
    businessEmail,
    operatingName,
    website,
    address,
    city,
    state,
    pincode,
    country,
  } = application.application

  const org = await auth.api.createOrganization({
    body: {
      slug: slugify(legalBusinessName),
      name: operatingName ?? "",
      type: "OPERATOR",
      legalName: legalBusinessName,
      email: businessEmail,
      phoneNumber: businessPhone,
      metadata: { address, city, state, pincode, country },
      website: website ?? "",
      contactName: application.contactName,
      contactTitle: application.contactTitle,
      contactPhone: application.contactPhone,
      contactEmail: application.contactEmail,
    },
    headers: await headers(),
  })

  if (!org) throw new Error("Failed to create organization")

  return org
}
