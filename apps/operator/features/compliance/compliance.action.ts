"use server"

import { prisma } from "@blak/db"
import { withPermission } from "@/lib/safe-action"
import { createComplianceRecordSchema } from "./compliance.schema"
import { sendEmail } from "@blak/email"
import DocumentSubmitted from "@blak/email/templates/document-submitted"
import { AppError } from "@blak/utils"

export const createComplianceRecord = withPermission({ app: ["operator"] })
  .inputSchema(createComplianceRecordSchema)
  .action(async ({ ctx, clientInput }) => {
    const { data } = clientInput
    const { session } = ctx

    const organizationId = session.activeOrganizationId!

    const org = await prisma.organization.findFirst({
      where: {
        id: organizationId,
      },
    })
    if (!org) throw new AppError("INVALID_REQUEST")

    await Promise.all([
      prisma.complianceRecord.createMany({
        data: data.map((document, index) => ({
          requirementId: document.requirementId,
          fileId: document.fileId,
        })),
      }),

      prisma.review.create({
        data: {
          entityId: organizationId,
          entityType: "OPERATOR",
          status: "PENDING_APPROVAL",
          reason: "Documents submitted.",
        },
      }),
      prisma.organization.update({
        where: {
          id: organizationId,
        },
        data: {
          status: "PENDING_APPROVAL",
          onboardingStartedAt: new Date(),
        },
      }),

      sendEmail({
        to: "inquiry@rideblak.com",
        subject: `Documents submitted for review — ${org.name}`,
        template: DocumentSubmitted({ name: org.name }),
      }),
    ])

    return { success: true }
  })
