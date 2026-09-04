"use server"

import { prisma } from "@blak/db"
import { headers } from "next/headers"
import { auth } from "@blak/auth"
import { slugify } from "@blak/utils/string"
import { withPermission } from "@/lib/safe-action"
import { OperatorApplication } from "./operator.type"
import { processOperatorApplicationschema } from "./operator.schema"
import { AppError } from "@blak/utils/error"

export const processOperatorApplication = withPermission({
  application: ["update"],
})
  .inputSchema(processOperatorApplicationschema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, action } = parsedInput
    const { session } = ctx

    const application = await prisma.application.findFirst({
      where: { id },
      include: { operatorApplication: true },
    })

    if (!application) throw new Error("Application not found")

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
    }

    return { success: true }
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
  const org = await createOrgUser(application)

  await Promise.all([
    prisma.application.update({
      where: { id: application.id },
      data: {
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
}

/** create organization */
async function createOrgUser(
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

  // create user
  const user = await auth.api.signUpEmail({
    body: {
      name: application.contactName,
      email: application.contactEmail,
      password: application.id,
      phoneNumber: application.contactPhone,
    },
  })

  // update user role
  const url = new URL(process.env.NEXT_PUBLIC_AUTH_URL!)
  await Promise.all([
    auth.api.requestPasswordReset({
      body: {
        email: application.contactEmail,
        redirectTo: `${url.origin}/auth/create-password`,
      },
    }),
    prisma.user.update({
      where: {
        id: user.user.id,
      },
      data: {
        role: "operator",
      },
    }),
  ])

  // find and map market
  const market = await prisma.market.findFirst({
    where: {
      country: {
        name: {
          contains: country,
          mode: "insensitive",
        },
      },
    },
  })

  if (!market) {
    throw new AppError("NOT_FOUND", {
      message: "Market not found",
    })
  }

  // create organization
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
      marketId: market.id,
    },
    headers: await headers(),
  })

  if (!org) throw new Error("Failed to create organization")

  await auth.api.addMember({
    body: {
      userId: user.user.id,
      role: "owner",
      organizationId: org.id,
    },
  })

  return org
}
