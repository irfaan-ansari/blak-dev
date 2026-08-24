"use server"
import { prisma } from "@blak/db"
import { auth } from "@blak/auth"
import { actionClient } from "@/lib/safe-action"
import { registerActionSchema } from "./register.schema"
import { AppError } from "@blak/utils/error"

export const registerUser = await actionClient
  .inputSchema(registerActionSchema)
  .action(async ({ clientInput, ctx }) => {
    const { confirmPassword, callbackURL, role, ...values } = clientInput.data

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: values.email }, { phoneNumber: values.phoneNumber }],
      },
    })

    if (user)
      throw new AppError("CONFLICT", {
        message: "Email or phone number already registered.",
        details: "An account with this email or phone number already exists.",
      })

    const [invitation, response] = await Promise.all([
      prisma.invitation.findFirst({
        where: { email: values.email },
      }),
      auth.api.signUpEmail({
        body: {
          ...values,
        },
      }),
    ])

    if (invitation && response) {
      await prisma.user.update({
        data: {
          role: invitation.userRole,
        },
        where: {
          id: response.user.id,
        },
      })
    }
    return response
  })
