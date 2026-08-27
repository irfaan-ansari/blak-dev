# BLAK

Built as a **TypeScript monorepo** with separate applications, a shared API, authentication, database, and reusable packages.

## Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Applications](#applications)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Database](#database)

## Architecture

```text
blak-dev/
├── apps/
│   ├── admin/        # Admin portal
│   ├── operator/     # Fleet operator portal
│   ├── partner/      # Partner portal
│   └── web/          # Public website
│
├── services/
│   └── api/          # Hono API
│
├── packages/
│   ├── auth/         # Authentication
│   ├── db/            # Prisma + PostgreSQL
│   ├── email/         # Email services
│   ├── ui/             # Shared UI
│   ├── utils/          # Shared utilities
│   ├── eslint-config/
│   └── ts-config/
│
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

Each app maintains its own `.env` configuration.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Hono, Node.js
- **Database:** PostgreSQL + Prisma
- **Authentication:** Better Auth
- **Storage:** Cloudflare R2
- **Monorepo:** Turborepo + pnpm
- **Validation:** Zod
- **Data Fetching:** TanStack Query

## Applications

| Application    | Purpose                     |
| -------------- | --------------------------- |
| `web`          | Public BLAK website         |
| `admin`        | Platform administration     |
| `operator`     | Fleet & business management |
| `partner`      | Partner management          |
| `services/api` | Shared backend services     |

The architecture is designed to support future Driver and Passenger mobile applications, along with multi-country and multi-currency operations.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `pnpm build`     | Build all apps and packages  |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint`      | Run linting                  |

## Database

```bash
pnpm --filter @blak/db generate
pnpm --filter @blak/db migrate
pnpm --filter @blak/db studio
```
