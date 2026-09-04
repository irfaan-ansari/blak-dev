import { prisma } from "@blak/db"
import {
  bearer,
  emailOTP,
  admin as adminPlugin,
  phoneNumber as phoneNumberPlugin,
  organization as organizationPlugin,
} from "better-auth/plugins"
import { betterAuth } from "better-auth"
import { apiKey } from "@better-auth/api-key"
import { userAc, userRoles } from "./permission"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { getRootDomain, getUserOrganization } from "./utils"
import { orgAc, orgUserRoles } from "./org-permissions"
import { sendEmail } from "@blak/email"
import PasswordResetEmail from "@blak/email/templates/reset-password"

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: "/auth",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  logger: {
    disabled: false,
    disableColors: false,
    level: "warn",
    log: (level, message, ...args) => {
      console.log(`[${level}] ${message}`, ...args)
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      console.log("sendResetPassword:", user, url, token, request)
      sendEmail({
        to: user.email,
        subject: "Reset your password",
        template: PasswordResetEmail({ url: `${url}?token=${token}` }),
      })
    },
  },
  session: {
    additionalFields: {
      activeMarketId: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [
    bearer(),
    apiKey({
      enableMetadata: true,
    }),
    adminPlugin({
      ac: userAc,
      roles: userRoles,
    }),
    emailOTP({
      async sendVerificationOTP(data, ctx) {},
    }),
    phoneNumberPlugin(),
    organizationPlugin({
      ac: orgAc,
      roles: orgUserRoles,
      schema: {
        organization: {
          additionalFields: {
            marketId: {
              type: "string",
              required: false,
              input: true,
            },
            phoneNumber: {
              type: "string",
              required: true,
              input: true,
            },
            type: {
              type: "string",
              required: true,
              input: true,
            },
            email: {
              type: "string",
              required: true,
              input: true,
            },
            status: {
              type: "string",
              required: true,
              defaultValue: "ONBOARDING",
              input: false,
            },
            legalName: {
              type: "string",
              required: true,
            },
            website: {
              type: "string",
              required: false,
            },
            taxId: {
              type: "string",
              required: false,
            },
            registrationNo: {
              type: "string",
              required: false,
            },
            contactName: {
              type: "string",
              required: false,
            },
            contactTitle: {
              type: "string",
              required: false,
            },
            contactPhone: {
              type: "string",
              required: false,
            },
            contactEmail: {
              type: "string",
              required: false,
            },
          },
        },
        invitation: {
          additionalFields: {
            userRole: {
              type: "string",
              required: true,
              input: true,
            },
          },
        },
      },
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (user, context) => {
          console.log("before user create:", user)
        },
      },
    },
    session: {
      create: {
        before: async (session) => {
          const orgId = await getUserOrganization(session.userId)
          return {
            data: {
              ...session,
              activeOrganizationId: orgId,
            },
          }
        },
      },
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: getRootDomain(process.env.BETTER_AUTH_URL as string),
    },
    defaultCookieAttributes: {
      secure: true,
      sameSite: "none",
      httpOnly: true,
    },
  },
  trustedOrigins: (process.env.BETTER_AUTH_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
})
