import { prisma } from "@blak/db"
import { betterAuth } from "better-auth"
import {
  bearer,
  emailOTP,
  admin as adminPlugin,
  organization as organizationPlugin,
  phoneNumber as phoneNumberPlugin,
} from "better-auth/plugins"
import { apiKey } from "@better-auth/api-key"
import { userAc, userRoles } from "./permission"
import { getUserOrganization } from "./resolve-org"
import { prismaAdapter } from "better-auth/adapters/prisma"

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
      // allowUserToCreateOrganization: async (user) => {
      //   return true
      // },
      //   ac: orgAc,
      //   roles: orgRoles,
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
              defaultValue: "PENDING_ONBOARDING",
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
          console.log(user)
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
  trustedOrigins: (process.env.BETTER_AUTH_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
})
