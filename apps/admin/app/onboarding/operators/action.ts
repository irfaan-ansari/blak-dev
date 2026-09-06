"use server"

import { auth } from "@blak/auth"

type ResendEmailInput = {
  id: string
  email: string
}

type ResendEmailResult = {
  success: boolean
  sent: string[]
  failed: string[]
}

export const resendEmails = async (
  users: ResendEmailInput[]
): Promise<ResendEmailResult> => {
  try {
    const batch = users.slice(0, 5)

    const url = new URL(process.env.NEXT_PUBLIC_AUTH_URL!)

    const results = await Promise.allSettled(
      batch.map(async (user) => {
        await auth.api.requestPasswordReset({
          body: {
            email: user.email,
            redirectTo: `${url.origin}/auth/create-password`,
          },
        })

        return user.id
      })
    )

    const sent: string[] = []
    const failed: string[] = []

    results.forEach((result, index) => {
      const user = batch[index]

      if (!user) return

      if (result.status === "fulfilled") {
        sent.push(user.id)
      } else {
        failed.push(user.id)

        console.error(
          `Failed to send password reset email to ${user.email}`,
          result.reason
        )
      }
    })

    return {
      success: failed.length === 0,
      sent,
      failed,
    }
  } catch (error) {
    return {
      success: false,
      sent: ["0"],
      failed: ["0"],
    }
  }
}
