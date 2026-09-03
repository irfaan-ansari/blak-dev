"use server"

import { EntityType, prisma } from "@blak/db"
import { withPermission } from "@/lib/safe-action"
import { createComplianceRecordSchema } from "./compliance.schema"

export const createComplianceRecord = withPermission({ app: ["operator"] })
  .inputSchema(createComplianceRecordSchema)
  .action(async ({ ctx, clientInput }) => {
    const { data } = clientInput
    const { session } = ctx

    const organizationId = session.activeOrganizationId!

    const files = await prisma.file.createManyAndReturn({
      data: data.map((document) => ({
        name: document.name,
        mime: document.mime,
        size: document.size,
        storageKey: document.storageKey,
        url: document.url,
      })),
    })
    const fileByKey = new Map(files.map((file) => [file.storageKey, file]))

    await Promise.all([
      prisma.complianceRecord.createMany({
        data: data.map((document, index) => ({
          requirementId: document.requirementId,
          entityType: EntityType.OPERATOR,
          entityId: organizationId,
          fileId: fileByKey.get(document.storageKey)!.id,
          name: document.name,
          label: "label",
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
    ])

    return { success: true }
  })
