# Project Overview

This is a **Turborepo Next.js 16 monorepo starter** with two apps (`web` and
`admin`), shared packages (`auth`, `db`, `trpc`, `ui`, `i18n`, `config`,
`tsconfig`, `lib`), and a curated stack: tRPC v11, Better Auth v1.6+ with
email/password + phone + OAuth (GitHub, Google), Kysely ORM on Neon PostgreSQL
with UUIDv7 primary keys, Tailwind CSS v4 with shadcn/ui Base UI components,
and URL-path-based i18n (en / zh-CN) without i18next. The project uses Biome
for linting/formatting, pnpm workspaces, and Turborepo v2 for orchestration.

## Repository Structure

- **`apps/web/`** — Public-facing Next.js 16 app (port 3000) with i18n, auth,
  tRPC client, dashboard, posts management, and theme support.
- **`apps/admin/`** — Admin Next.js 16 app (port 3001) with i18n, auth guard in
  `proxy.ts`, tRPC client, and admin-only pages.
- **`packages/auth/`** — Shared Better Auth configuration: server (`betterAuth`
  with Pool, phoneNumber plugin, OAuth) and client (`createAuthClient` with
  `phoneNumber` plugin).
- **`packages/db/`** — Kysely client with PostgresDialect, SQL migration runner,
  `kysely-codegen` types, and seed script.
- **`packages/trpc/`** — tRPC v11 init with superjson, `createContext`,
  `requireAuth` middleware, and routers (`auth`, `post` merged in `_app`).
- **`packages/ui/`** — shadcn/ui component library: Base UI Button, `cn()`
  utility, `cva` variants, Tailwind v4 globals.css with shadcn color tokens.
- **`packages/i18n/`** — Routing-only i18n: locale constants, `hasLocale`
  guard, and `proxy.ts` (Accept-Language + cookie detection).
- **`packages/config/tailwind/`** — Tailwind v4 shared theme (color tokens,
  border radii) consumed via `@theme` in globals.css.
- **`packages/tsconfig/`** — Shared TypeScript configs: `base.json`,
  `nextjs.json`, `react-library.json`.
- **`packages/lib/`** — Shared utility helpers (`env.ts` guards).
- **`scripts/`** — SQL setup (`setup-db.sql`, `setup-auth-db.sh`) for Neon
  PostgreSQL.

## Build & Development Commands

```bash
# Install all dependencies
pnpm install

# Start dev servers (web :3000, admin :3001 concurrently)
pnpm dev

# Production build everything
pnpm build

# Lint all packages with Biome
pnpm lint

# Fix lint issues
pnpm lint:fix

# Format code
pnpm format

# Type-check all packages
pnpm type-check

# Run custom DB migrations (SQL files → Kysely)
pnpm db:migrate

# Generate TypeScript types from DB (kysely-codegen)
pnpm db:codegen

# Seed the database
pnpm db:seed

# Full DB setup (migrate → codegen → seed)
pnpm db:setup

# Better Auth schema migration (CLI-managed auth tables)
pnpm auth:migrate

# Clean all build caches
pnpm clean

# Per-package commands (examples)
cd apps/web && pnpm dev        # web only
cd apps/admin && pnpm dev      # admin only
cd packages/db && pnpm db:migrate
```

## Code Style & Conventions

- **Linter & Formatter**: Biome v2 (`biome.json` at root). Run `pnpm lint` or
  `pnpm format` globally. No ESLint or Prettier.
- **TypeScript**: Strict mode, `moduleResolution: "bundler"`, ES2022 target.
  Shared configs in `packages/tsconfig/`.
- **Naming**:
  - Files: `kebab-case.ts`, `page.tsx`, `layout.tsx`, `loading.tsx`,
    `error.tsx`, `not-found.tsx`, `forbidden.tsx`, `unauthorized.tsx`,
    `global-error.tsx`.
  - Directories: `kebab-case/`, `[param]/` for route segments.
  - Components: `PascalCase` exported functions.
  - Hooks: `camelCase` prefixed with `use`.
  - Actions: `camelCase` (`createPost`, `updatePost`).
  - Types: `PascalCase` (`WebDictionary`, `AdminDictionary`, `TRPCContext`).
- **Package naming**: `@repo/<name>` (e.g., `@repo/auth`, `@repo/db`).
- **Imports**: Use `@/` path alias for app-local imports (e.g., `@/components`),
  `workspace:*` for cross-packages.
- **React**: Server Components by default; `"use client"` for interactivity.
- **Next.js 16 conventions**: `params` and `searchParams` typed as `Promise<T>`
  with `await`. Use `proxy.ts` (not `middleware.ts`). No `src/` directory — apps
  live at project root level.
- **Commit messages**: Conventional Commits (e.g., `feat:`, `fix:`, `refactor:`,
  `chore:`, `docs:`). Keep subject under 72 chars.
- **CSS**: Tailwind v4 with `@import` + `@theme` blocks. HSL/OKLCH CSS
  variables for shadcn compatibility. Inline `style` props for prototypes;
  migrate to Tailwind utility classes for production.

## Architecture Notes

```
┌──────────────────────────────────────────────────────────────────┐
│                          Next.js 16 Apps                          │
│                                                                   │
│  apps/web (:3000)          apps/admin (:3001)                     │
│  ┌─────────────────────┐   ┌─────────────────────┐                │
│  │ proxy.ts (i18n)     │   │ proxy.ts (auth+i18n)│                │
│  │ app/[locale]/...    │   │ app/[locale]/...    │                │
│  │  ├ page (RSC→i18n)  │   │  ├ page (auth guard)│                │
│  │  ├ dashboard (auth)  │   │  └ auth/login       │                │
│  │  ├ posts (RSC+SA)   │   │    auth/register     │                │
│  │  └ auth/login       │   └─────────────────────┘                │
│  │    auth/register     │                                          │
│  └─────────────────────┘                                          │
│         │                         │                               │
│         ▼                         ▼                               │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                Shared Packages Layer                         │  │
│  │                                                              │  │
│  │  @repo/auth ← @repo/db ← @repo/trpc ← @repo/ui ← @repo/i18n│  │
│  │    server.ts      client.ts     init+context  components    │  │
│  │    client.ts      types.ts      routers        globals.css   │  │
│  └─────────────────────────────────────────────────────────────┘  │
│         │                         │                               │
│         ▼                         ▼                               │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                    External Services                         │  │
│  │  ┌──────────┐  ┌───────────┐  ┌──────────────────────────┐  │  │
│  │  │ Neon     │  │ Better    │  │ OAuth Providers          │  │  │
│  │  │ PostgreSQL│  │ Auth CLI  │  │ (GitHub, Google)         │  │  │
│  │  │ (PG17)   │  │ (auth     │  │                          │  │  │
│  │  │          │  │  tables)  │  │                          │  │  │
│  │  └──────────┘  └───────────┘  └──────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Data flow:**
1. **Request → `proxy.ts` (i18n)** — detects locale via cookie or
   Accept-Language, redirects or sets cookie. Admin `proxy.ts` also checks
   session and redirects unauthenticated users.
2. **Server Components** — read data directly via `@repo/db` (Kysely) or
   `auth.api.getSession()`. Protected pages call `unauthorized()` to render
   `unauthorized.tsx` (not `redirect()`).
3. **Mutations → Server Actions** — `"use server"` functions in
   `apps/*/actions/`. Example: `createPost()` validates session, inserts via
   Kysely, then `revalidatePath()`.
4. **Client Reads → tRPC** — `@trpc/react-query` integration. Client
   Components call `trpc.post.list.useQuery()` via the merged `Providers`.
   tRPC v11 route: `POST /api/trpc`.
5. **Auth API** — Better Auth handles its own routes at
   `api/auth/[...all]/route.ts` (via `toNextJsHandler`).
6. **Auth forms** — Client Components using `authClient` from
   `@repo/auth/client`. Login/register forms receive dictionary via Server
   Component prop pattern.
7. **i18n** — Each app owns `app/[locale]/_dictionaries/index.ts` with its own
   `Dictionary` type and `getDictionary(locale)` using dynamic `import()`.
   `packages/i18n` provides only locale constants and routing proxy.

## Testing Strategy

> TODO: No test framework is currently configured. Recommended additions:
> - **Unit**: Vitest for shared packages (`packages/db`, `packages/auth`).
> - **Integration**: Playwright or Vitest with MSW for API route testing.
> - **E2E**: Playwright for critical user journeys (login, create post,
>   locale switch).
> - **CI**: Run `pnpm lint && pnpm type-check && pnpm build` on every PR.

## Security & Compliance

- **Secrets**: Database URL, Better Auth secret, and OAuth credentials are
  stored in `.env` (gitignored). See `.env.example` for required vars.
- **Auth tokens**: Better Auth manages session tokens via httpOnly cookies.
  Cookie prefix: `turbo-starter`. Secure flag set in production.
- **OAuth**: GitHub and Google client IDs/secrets sourced from env vars.
- **Phone OTP**: `sendOTP` callback logs to console (stub — replace with SMS
  provider in production).
- **Server-only code**: `"server-only"` import enforced in dictionary modules.
- **Dependency scanning**: `pnpm audit` recommended before production deploy.
- **License**: > TODO: Specify license (none detected in repo).

## Agent Guardrails

- **Never modify** `packages/db/src/types.ts` directly — it is auto-generated
  by `kysely-codegen`. Edit the SQL migration and re-run `pnpm db:codegen`.
- **Never edit** `pnpm-lock.yaml` manually — use `pnpm install` or
  `pnpm add <pkg>`.
- **Never commit** `.env`, `.env.local`, `.next/`, `.turbo/`, `dist/`,
  `node_modules/`.
- **No `src/` directories**: Both apps use flat `app/` at project root (Next.js
  recommended structure). Do not add `src/` folders inside apps.
- **No i18next or accept-language-parser**: i18n uses dynamic `import()` in
  per-app dictionaries. Keep `packages/i18n` as routing-only.
- **Mutations prefer Server Actions** over tRPC: Use `"use server"` in
  `apps/*/actions/`.
- **Auth guard uses `unauthorized()`** (not `redirect()`) in protected Server
  Components.
- **Do not add `@better-auth/kysely-adapter`**: Better Auth accepts a `Pool`
  directly (`generateId: false`).
- **All error boundaries present**: Every route segment must have `error.tsx`
  (client component with `reset`). Root must have `global-error.tsx`.
- **Every route must have**: `not-found.tsx`, `forbidden.tsx`,
  `unauthorized.tsx` at app root level.
- **Max line length ≈ 100 chars** in source files.
- **No emoji in code or commit messages** unless explicitly requested.

## Extensibility Hooks

- **Environment variables** (all required, see `.env.example`):
  - `DATABASE_URL` — Neon PostgreSQL connection string.
  - `BETTER_AUTH_SECRET` — Auth encryption secret.
  - `BETTER_AUTH_URL` — Auth callback URL (e.g., `http://localhost:3000`).
  - `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — GitHub OAuth app creds.
  - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth app creds.
  - `NEXT_PUBLIC_APP_URL` — Public URL for web app.
  - `NEXT_PUBLIC_ADMIN_URL` — Public URL for admin app.
- **Feature flags**: > TODO: No feature flag system configured. Consider
  `@vercel/flags` or similar.
- **Plugin points**:
  - Better Auth: Add plugins in `packages/auth/src/server.ts` (e.g., 2FA,
    magic link, organization).
  - tRPC: Add routers in `packages/trpc/src/server/routers/` and merge in
    `_app.ts`.
  - UI: Add components in `packages/ui/src/components/` and export from
    `package.json` `exports` field.
  - DB: Add SQL migration files in `packages/db/src/migrations/` as
    `NNN_description.sql`, then re-run `kysely-codegen`.
  - i18n: Add locales to `packages/i18n/src/index.ts` `locales` array
    and per-app `_dictionaries/` JSON files.

## Further Reading

- Next.js 16 docs: https://nextjs.org/docs
- Turborepo docs: https://turbo.build/repo/docs
- Better Auth docs: https://www.better-auth.com/docs
- tRPC v11 docs: https://trpc.io/docs
- Kysely docs: https://kysely.dev/docs
- shadcn/ui (Base UI): https://ui.shadcn.com
- Tailwind CSS v4: https://tailwindcss.com/docs
- Neon PostgreSQL: https://neon.tech/docs
- Biome: https://biomejs.dev
