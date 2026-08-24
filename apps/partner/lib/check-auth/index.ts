"use server"

import { auth } from "@blak/auth"
import { type Permission } from "@blak/auth/types"

import { headers } from "next/headers"

export const checkAuth = async (permission?: Permission) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return {
      session: null,
      authenticated: false,
      authorized: false,
    }
  }

  if (permission) {
    const { success: authorized } = await auth.api.userHasPermission({
      body: {
        userId: session.session.userId,
        permissions: permission,
      },
    })

    return {
      session,
      authenticated: true,
      authorized,
    }
  }

  return {
    session,
    authenticated: true,
    authorized: true,
  }
}
