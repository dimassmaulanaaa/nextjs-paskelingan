# Website Karang Taruna Paskelingan

Company profile + katalog sewa *bolopecah* (peralatan hajatan) untuk Karang Taruna Paskelingan, Dukuh Keboan Pason, Desa Ceper, Kabupaten Klaten, Jawa Tengah. Pengunjung memilih barang & tanggal di `/sewa`, lalu pengajuan dikirim ke WhatsApp pengurus — tidak ada pembayaran/stok online.

Stack: **Next.js 16** (App Router, RSC, Server Actions) · **React 19** · **TypeScript 5** · **Tailwind v4** · **shadcn** (`base-nova`, di atas `@base-ui/react`) · **Neon Postgres** (`@neondatabase/serverless`). Auth admin & sesi pakai `node:crypto` (nol dependency tambahan).

## Prasyarat

- [Bun](https://bun.sh) `1.3.14` (package manager + task runner). Bodi script memanggil `node`/`next` dengan sengaja — jangan `bun test`, jangan rewrite ke `bun --bun`.
- File `.env` (lihat **Env** di bawah).

## Mulai

```bash
bun install
bun run db:setup        # buat tabel items + seed 15 barang
bun run dev             # http://localhost:3000
```

## Script

| Perintah | Fungsi |
| --- | --- |
| `bun run dev` | Dev server |
| `bun run build` / `bun run start` | Build produksi / serve |
| `bun run lint` | ESLint (`eslint-config-next`) |
| `bun run test` | `node --test` — semua tes logika murni; tes DB self-skip |
| `bun run test:db` | Tes CRUD katalog terhadap DB nyata (`RUN_DB_TESTS=1`) |
| `bun run db:setup` | Apply `db/schema.sql` + `db/seed.sql` ke `DATABASE_URL` |
| `bun run hash-password -- <plain>` | Hasilkan `salt:hash` scrypt untuk `ADMIN_PASSWORD_HASH` |

## Env

Isi di `.env`:

```
DATABASE_URL          # Neon connection string
ADMIN_USERNAME        # username admin tunggal
ADMIN_PASSWORD_HASH   # scrypt salt:hash (via `bun run hash-password`)
SESSION_SECRET        # kunci HMAC untuk cookie sesi (≥ 32 byte acak)
```

## Struktur

`app/` — rute publik (`/`, `/sewa`) + admin (`/admin/login`, `/admin/(dashboard)`). `components/landing/*` — section beranda; `components/ui/*` — shadcn. `lib/` — data & logika murni (`catalog-shared` client-safe vs `catalog` server-only; `auth`, `rental`, `whatsapp`, `seo`, `format`). `db/` — `schema.sql` + `seed.sql` (tanpa ORM/tool migrasi). `docs/spec.md` — sumber kebenaran desain.

Detail arsitektur & aturan kerja: lihat [`CLAUDE.md`](./CLAUDE.md) dan [`docs/spec.md`](./docs/spec.md).
