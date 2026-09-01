"use server"

import { prisma } from "@blak/db"
import { withPermission } from "@/lib/safe-action"
import { createComplianceRecordSchema } from "./compliance.schema"

export const createComplianceRecord = withPermission({ app: ["operator"] })
  .inputSchema(createComplianceRecordSchema)
  .action(async ({ ctx, clientInput }) => {
    const { data } = clientInput
    const { session } = ctx

    const organizationId = session.activeOrganizationId!
    console.log("client input", clientInput)
    console.log("INPUT", clientInput, organizationId)

    await Promise.all([
      prisma.document.createMany({
        data: data.map((document) => ({
          entityId: organizationId,
          entity: "OPERATOR",
          fileName: document.fileName,
          mimeType: document.mimeType,
          size: document.size,
          storageKey: document.storageKey,
          category: document.category,
          name: document.fileName,
          url: document.url,
          type: "DOCUMENT",
          status: "PENDING",
        })),
      }),
      prisma.review.create({
        data: {
          entityId: organizationId,
          entityType: "OPERATOR",
          status: "PENDING",
          reason: "Documents submitted.",
        },
      }),
      prisma.organization.update({
        where: {
          id: organizationId,
        },
        data: {
          status: "SUBMITTED",
          onboardingStartedAt: new Date(),
        },
      }),
    ])
    console.log("success")
    return { success: true }
  })
