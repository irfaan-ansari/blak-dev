"use server"

import { auth } from "@blak/auth"
import { EntityType, prisma } from "@blak/db"
import { AppError } from "@blak/utils"

import { withPermission } from "@/lib/safe-action"
import { driverCreateSchema } from "./driver.schema"

export const createDriver = withPermission({ app: ["operator"] })
  .inputSchema(driverCreateSchema)
  .action(async ({ ctx, clientInput }) => {
    const organizationId = ctx.session.activeOrganizationId!

    const { name, email, phoneNumber, documents } = clientInput.data

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
      select: {
        id: true,
      },
    })

    if (existingUser) {
      throw new AppError("CONFLICT", {
        message: "Email or phone already exists",
      })
    }

    const { user } = await auth.api.signUpEmail({
      body: {
        name,
        email,
        phoneNumber,
        password: crypto.randomUUID(),
      },
    })

    await Promise.all([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          role: "driver",
        },
      }),

      auth.api.addMember({
        body: {
          userId: user.id,
          role: "driver",
          organizationId,
        },
      }),
    ])

    await prisma.$transaction(async (tx) => {
      const files = await tx.file.createManyAndReturn({
        data: documents.map((document) => ({
          name: document.name,
          mime: document.mime,
          size: document.size,
          storageKey: document.storageKey,
          url: document.url,
        })),
      })

      const fileMap = new Map(files.map((file) => [file.storageKey, file.id]))

      await tx.complianceRecord.createMany({
        data: documents.map((document) => ({
          requirementId: document.requirementId,
          entityType: EntityType.DRIVER,
          entityId: user.id,
          fileId: fileMap.get(document.storageKey)!,
          name: document.name,
          label: document.label,
        })),
      })
    })

    return {
      success: true,
      id: user.id,
    }
  })
