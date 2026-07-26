# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Commands

**Bun** is the package manager and task runner (`packageManager: bun@1.3.14`, `bun.lock`). Install deps with `bun install`; run tasks with `bun run <script>`. Note: the script _bodies_ invoke `node`/`next` on purpose — the test suite uses the `node:test` API (Bun's `bun test` runner is incompatible) and Next runs on the Node runtime. So `bun run` orchestrates, Node executes. Don't `bun test`, and don't rewrite bodies to `bun --bun`.

- `bun run dev` — dev server (http://localhost:3000)
- `bun run build` / `bun run start` — production build / serve
- `bun run lint` — ESLint (`eslint-config-next`, flat config in `eslint.config.mjs`)
- `bun run test` — `node --test`; runs all pure-logic tests in `tests/`. DB integration tests self-skip.
- `bun run test:db` — `node --env-file=.env --test tests/catalog.test.ts`; sets `RUN_DB_TESTS=1` to un-skip the DB-backed cases. Hits the real Neon DB in `DATABASE_URL`.
- `bun run db:setup` — apply `lib/db/schema.sql` then `lib/db/seed.sql` to `DATABASE_URL`. Seed uses `ON CONFLICT (name) DO NOTHING`, so re-running is safe (idempotent for inserts) but will **not** update prices/groups of rows that already exist.
- `bun run hash-password` — generate a scrypt `salt:hash` for `ADMIN_PASSWORD_HASH`.

Run a single test file: `node --test tests/rental.test.ts`. Single case: `node --test --test-name-pattern="<name>"`.

Env vars (`.env`): `DATABASE_URL` (Neon), `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` (scrypt), `SESSION_SECRET` (HMAC key).

## Architecture

Next.js 16 App Router + React 19, Tailwind v4, shadcn (`base-nova` style, built on `@base-ui/react` not Radix). Indonesian-language domain: renting _bolopecah_ (breakable tableware) for events in Ceper, Klaten.

**Data layer** — Neon serverless Postgres. `lib/db.ts` exports one tagged-template `sql`. Single `items` table (`lib/db/schema.sql`); no ORM, no migrations tool — schema changes go in `schema.sql` + re-run `db:setup`.

**Client/server split (important)** — `lib/catalog-shared.ts` is pure and client-safe (types, `validateItemInput`, `groupItems`, `lowestPrice`, `VALID_GROUPS`) with **zero DB import**. `lib/catalog.ts` is server-only: imports `sql`, does CRUD, and re-exports the shared symbols. Never import `lib/db` (or `lib/catalog`) into a client component — go through `catalog-shared`. `lib/rental.ts` and `lib/whatsapp.ts` are likewise pure calc.

**Public flow** — `/` landing, `/sewa` rental form. The landing page (`app/page.tsx`) is composed of section components in `components/landing/*` (`hero`, `stats`, `tentang`, `kegiatan`, `galeri`, `teaser`, `pengurus`, `faq`, `footer`); their copy constants (`KEGIATAN`/`PENGURUS`/`FAQ`) live in `lib/landing-content.ts` (client-safe, no DB). There is **no checkout / DB write from the public side**: the form builds a WhatsApp deep link (`buildWaUrl` → `wa.me/<WA_NUMBER>`) and the order is placed in chat. `getItems()` (server) feeds the catalog; teaser "mulai Rp X" uses `lowestPrice`. The date field's "today" min comes from `lib/use-today.ts` (`useTodayISO`, a hydration-safe `useSyncExternalStore` — server renders `""`, client fills local today).

**Admin** — `/admin/login` + `/admin/(dashboard)` item CRUD via server actions in `app/admin/actions.ts` (`revalidatePath("/sewa")` and `"/"` after each mutation). Auth is a **single env-defined admin** (no users table): `login()` checks `ADMIN_USERNAME` + `verifyPassword` against `ADMIN_PASSWORD_HASH`, then sets an HMAC-signed session cookie (`signSession`, payload+sig, 8h). Three layers guard admin:

1. `proxy.ts` — Next 16's renamed middleware (`export function proxy` + `config.matcher`). Optimistic: redirects to login if the session cookie is _absent_. Does not verify.
2. `app/admin/(dashboard)/layout.tsx` — authoritative `verifySession` on every dashboard render.
3. `requireAuth()` inside each mutating server action.

**Server action placement** — Colocate actions in `app/<route>/actions.ts` while they serve a single route scope (e.g. `app/admin/actions.ts` is admin-only: login/logout + item CRUD). Keep them thin: auth + parse `FormData` + call `lib/*` + `revalidatePath`. The real logic lives in `lib/` (`lib/catalog.ts`, `lib/auth.ts`), so it's already reusable without sharing the action itself. Only when the _same action_ is invoked from two different route scopes, move it to `lib/actions/*.ts`. Don't pre-split on speculation — the public `/sewa` flow does no DB write by design, so admin actions aren't expected to be shared.

**Testing** — `node --test`. Pure modules (`auth`, `catalog-validate`, `format`, `rental`, `seo`, `whatsapp`) always run; `tests/catalog.test.ts` skips its DB cases unless `RUN_DB_TESTS=1`.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Context7

Always use Context7 when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.

## Agent skills

### Issue tracker

GitHub Issues on `dimassmaulanaaa/nextjs-paskelingan`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — `CONTEXT.md` + `docs/adr/` at root. See `docs/agents/domain.md`.
