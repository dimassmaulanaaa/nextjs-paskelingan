# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Bun** is the package manager and task runner (`packageManager: bun@1.3.14`, `bun.lock`). Install deps with `bun install`; run tasks with `bun run <script>`. Note: the script *bodies* invoke `node`/`next` on purpose — the test suite uses the `node:test` API (Bun's `bun test` runner is incompatible) and Next runs on the Node runtime. So `bun run` orchestrates, Node executes. Don't `bun test`, and don't rewrite bodies to `bun --bun`.

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

Next.js 16 App Router + React 19, Tailwind v4, shadcn (`base-nova` style, built on `@base-ui/react` not Radix). Indonesian-language domain: renting *bolopecah* (breakable tableware) for events in Ceper, Klaten.

**Data layer** — Neon serverless Postgres. `lib/db.ts` exports one tagged-template `sql`. Single `items` table (`lib/db/schema.sql`); no ORM, no migrations tool — schema changes go in `schema.sql` + re-run `db:setup`.

**Client/server split (important)** — `lib/catalog-shared.ts` is pure and client-safe (types, `validateItemInput`, `groupItems`, `hargaTerendah`, `VALID_GROUPS`) with **zero DB import**. `lib/catalog.ts` is server-only: imports `sql`, does CRUD, and re-exports the shared symbols. Never import `lib/db` (or `lib/catalog`) into a client component — go through `catalog-shared`. `lib/rental.ts` and `lib/whatsapp.ts` are likewise pure calc.

**Public flow** — `/` landing, `/sewa` rental form. The landing page (`app/page.tsx`) is composed of section components in `components/landing/*` (`hero`, `stats`, `tentang`, `kegiatan`, `galeri`, `teaser`, `pengurus`, `faq`, `footer`); their copy constants (`KEGIATAN`/`PENGURUS`/`FAQ`) live in `lib/landing-content.ts` (client-safe, no DB). There is **no checkout / DB write from the public side**: the form builds a WhatsApp deep link (`buildWaUrl` → `wa.me/<WA_NUMBER>`) and the order is placed in chat. `getItems()` (server) feeds the catalog; teaser "mulai Rp X" uses `hargaTerendah`. The date field's "today" min comes from `lib/use-today.ts` (`useTodayISO`, a hydration-safe `useSyncExternalStore` — server renders `""`, client fills local today).

**Admin** — `/admin/login` + `/admin/(dashboard)` item CRUD via server actions in `app/admin/actions.ts` (`revalidatePath("/sewa")` and `"/"` after each mutation). Auth is a **single env-defined admin** (no users table): `login()` checks `ADMIN_USERNAME` + `verifyPassword` against `ADMIN_PASSWORD_HASH`, then sets an HMAC-signed session cookie (`signSession`, payload+sig, 8h). Three layers guard admin:
1. `proxy.ts` — Next 16's renamed middleware (`export function proxy` + `config.matcher`). Optimistic: redirects to login if the session cookie is *absent*. Does not verify.
2. `app/admin/(dashboard)/layout.tsx` — authoritative `verifySession` on every dashboard render.
3. `requireAuth()` inside each mutating server action.

**Server action placement** — Colocate actions in `app/<route>/actions.ts` while they serve a single route scope (e.g. `app/admin/actions.ts` is admin-only: login/logout + item CRUD). Keep them thin: auth + parse `FormData` + call `lib/*` + `revalidatePath`. The real logic lives in `lib/` (`lib/catalog.ts`, `lib/auth.ts`), so it's already reusable without sharing the action itself. Only when the *same action* is invoked from two different route scopes, move it to `lib/actions/*.ts`. Don't pre-split on speculation — the public `/sewa` flow does no DB write by design, so admin actions aren't expected to be shared.

**Testing** — `node --test`. Pure modules (`auth`, `catalog-validate`, `format`, `rental`, `seo`, `whatsapp`) always run; `tests/catalog.test.ts` skips its DB cases unless `RUN_DB_TESTS=1`.

## Docs workflow

Three doc types, each with different lifetimes and git status:

- **`docs/spec.md`** — permanent, **descriptive**, **tracked in git**: a mirror of the code that runs now. Code is the source of truth; when code and this doc disagree, the doc is wrong. Refresh it (and `graphify update .`) after a feature merges.
- **`docs/ideas/*.md`** — permanent, **tracked in git**: product direction and brainstorm. Update freely; no strict sync with code required.
- **`docs/specs/<fitur>.md`** — throwaway, **prescriptive**, **local-only (gitignored)**: a blueprint for ONE feature, written *before* coding (via `/spec`). May intentionally disagree with current code. Delete once the feature is live and folded into `docs/spec.md`. Never commit — `.gitignore` excludes `docs/specs/*.md` (except `TEMPLATE.md`).

Feature flow: `/interview-me` → `/spec` (writes `docs/specs/<fitur>.md`) → `/plan` → `/build` → `/review` → after merge: update `docs/spec.md` + `graphify update .` → drop the feature spec. Never treat a `docs/specs/*` file as lasting truth.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

# Context7

Always use Context7 when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.

# Frontend Design Rules

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:

- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. Think outside the box!
</frontend_aesthetics>

@AGENTS.md
