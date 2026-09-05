"use server"

import { auth } from "@blak/auth"
import { prisma } from "@blak/db"
import { AppError } from "@blak/utils"

import { withPermission } from "@/lib/safe-action"
import { driverCreateSchema } from "./driver.schema"

export const createDriver = withPermission({ app: ["operator"] })
  .inputSchema(driverCreateSchema)
  .action(async ({ ctx, clientInput }) => {
    const organizationId = ctx.session.activeOrganizationId!

    const { name, email, phoneNumber } = clientInput.data

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

    return {
      success: true,
      id: user.id,
    }
  })
