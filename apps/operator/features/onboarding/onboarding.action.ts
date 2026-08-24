"use server"

import { withPermission } from "@/lib/safe-action"
import { prisma } from "@blak/db"
import { documentActionSchema } from "./onboarding.schema"
import { AppError } from "@blak/utils"

export const uploadDocuments = withPermission({ app: ["operator"] })
  .inputSchema(documentActionSchema)
  .action(async ({ ctx, clientInput }) => {
    const { session } = ctx
    const { data } = clientInput
    const organizationId = session.activeOrganizationId

    if (!organizationId) {
      throw new AppError("FORBIDDEN", {
        message: "No active organization",
      })
    }

    await prisma.$transaction(async (tx) => {
      await tx.document.createMany({
        data: data.map((document) => ({
          entityId: organizationId,
          entity: "OPERATOR",
          fileName: document.fileName,
          mimeType: document.mimeType,
          size: document.size,
          storageKey: document.storageKey,
          category: document.category,
          name: document.name,
          url: document.url,
          type: "DOCUMENT",
          status: "PENDING",
        })),
      })

      await tx.review.create({
        data: {
          entityId: organizationId,
          entityType: "OPERATOR",
          status: "UNDER_REVIEW",
          reason: "Documents submitted.",
        },
      })

      await tx.organization.update({
        where: {
          id: organizationId,
        },
        data: {
          status: "UNDER_REVIEW",
          onboardingStartedAt: new Date(),
        },
      })
    })

    return { id: organizationId }
  })
