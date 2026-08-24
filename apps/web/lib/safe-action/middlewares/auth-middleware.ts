import { redirect } from "next/navigation"
import { checkAuth } from "@/lib/check-auth"
import { createMiddleware } from "next-safe-action"
import { type Permission } from "@blak/auth/types"
import { AppError } from "@blak/utils/error"

const REDIRECT_URL = process.env.NEXT_PUBLIC_AUTH_URL

export const authMiddleware = (permission?: Permission) =>
  createMiddleware().define(async ({ next }) => {
    if (!REDIRECT_URL) {
      throw new Error("NEXT_PUBLIC_AUTH_URL is not configured")
    }
    const { session, authenticated, authorized } = await checkAuth(permission)

    if (!authenticated) redirect(REDIRECT_URL)

    if (!authorized) throw new AppError("FORBIDDEN")

    return next({
      ctx: {
        user: session?.user!,
        session: session?.session!,
      },
    })
  })
