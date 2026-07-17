# Arsitektur: Website Karang Taruna Paskelingan

> Dokumen **deskriptif** — memetakan kode yang berjalan sekarang, bukan rencana. Sumber kebenaran tetap kode itu sendiri; perbarui dokumen ini setelah struktur berubah. Arah produk & latar: `docs/ideas/website-paskelingan.md`.

## Ringkasan

Company profile + katalog sewa *bolopecah* (peralatan hajatan) untuk Karang Taruna Paskelingan (Dukuh Keboan Pason, Desa Ceper, Kec. Ceper, Kab. Klaten, Jawa Tengah). Pengunjung memilih barang & tanggal di `/sewa`; pengajuan dikirim ke WhatsApp pengurus lewat deep link. **Tidak ada pembayaran, stok, atau log pengajuan di DB** — alur berakhir di WhatsApp. DB hanya menyimpan katalog barang & harga (satu tabel `items`); admin mengelolanya lewat CRUD terproteksi.

## Tech Stack (terpasang)

- **Next.js 16.2.10** (App Router, RSC, Server Actions). API-nya beda dari training data lama — baca `node_modules/next/dist/docs/` sebelum menulis kode Next (mis. middleware sekarang `proxy.ts`).
- **React 19.2.4**, **TypeScript 5**, **Tailwind CSS v4** (`@tailwindcss/postcss`).
- **shadcn** style `base-nova` di atas **`@base-ui/react`** (bukan Radix). Ikon **lucide-react**. Dark mode via **next-themes**.
- **Neon Postgres** (`@neondatabase/serverless`), tanpa ORM & tanpa tool migrasi.
- **Auth** & sesi: stdlib **`node:crypto`** (scrypt + HMAC), nol dependency auth.
- **Test**: **`node:test`** + `node:assert` bawaan. `bun test` TIDAK dipakai (inkompatibel) — jalankan lewat `node --test`.
- **Package manager / runner**: **Bun** `1.3.14`. Bodi script memanggil `node`/`next` dengan sengaja (Bun mengorkestrasi, Node mengeksekusi).
- Bahasa: **Indonesia saja** (`<html lang="id">`), tanpa i18n.

## Commands

```
Dev:      bun run dev            # next dev — http://localhost:3000
Build:    bun run build          # next build
Start:    bun run start          # next start
Lint:     bun run lint           # eslint (flat config)
Test:     bun run test           # node --test; tes DB self-skip
Test DB:  bun run test:db        # RUN_DB_TESTS=1, hit DB nyata di DATABASE_URL
DB setup: bun run db:setup       # schema.sql + seed.sql ke DATABASE_URL
Hash pw:  bun run hash-password -- <plain>   # cetak salt:hash untuk ADMIN_PASSWORD_HASH
```

Satu file tes: `node --test tests/rental.test.ts`. Satu kasus: `node --test --test-name-pattern="<nama>"`.

## Struktur Proyek

```
app/
  layout.tsx                       → Root layout: lang="id", font (Outfit/Work_Sans/Geist_Mono
                                     via next/font), metadata + OG dari lib/seo, ThemeProvider,
                                     skip-link "Lompat ke konten utama"
  page.tsx                         → Beranda (RSC): ambil getItems() → hargaTerendah, render
                                     JSON-LD LocalBusiness + rakit section components/landing/*
  site-header.tsx                  → Header publik (client): nav + ModeToggle + Sheet (mobile)
  globals.css                      → Tailwind v4 + token tema
  sewa/
    page.tsx                       → Katalog (RSC): getItems() + searchParams.tanggal → RentalForm
    rental-form.tsx                → Client: grup barang, input jumlah, subtotal/total real-time,
                                     validasi, tombol "Ajukan Sewa via WhatsApp" (window.open)
  admin/
    login/page.tsx                 → Form login (client, useActionState → action login)
    (dashboard)/layout.tsx         → verifySession otoritatif tiap render; redirect bila invalid
    (dashboard)/page.tsx           → Dashboard (RSC): getItems() → ItemList
    (dashboard)/item-list.tsx      → Client: tabel item + form create/update/delete (server actions)
    actions.ts                     → "use server": login, logout, actionCreate/Update/DeleteItem;
                                     requireAuth() di tiap mutasi; revalidatePath "/sewa" & "/"
  sitemap.ts                       → sitemap.xml: "/" + "/sewa"
  robots.ts                        → robots.txt: allow "/", disallow "/admin", tunjuk sitemap
proxy.ts                           → Next 16 (ex-middleware): cek optimistic cookie utk /admin/*
                                     (matcher kecualikan /admin/login); verifikasi absen di sini
components/
  landing/                         → section beranda: hero, stats, tentang, kegiatan, galeri,
                                     teaser, pengurus, faq, footer
  ui/                              → shadcn (base-nova): accordion, avatar, badge, button, card,
                                     dropdown-menu, input, label, separator, sheet, table
  mode-toggle.tsx, theme-provider.tsx
lib/
  db.ts                            → Neon client: satu tagged-template `sql` (throw bila DATABASE_URL absen)
  catalog-shared.ts                → MURNI, client-safe (NOL import DB): tipe Item/ItemGroup,
                                     VALID_GROUPS, validateItemInput, hargaTerendah, groupItems
  catalog.ts                       → server-only: getItems/createItem/updateItem/deleteItem;
                                     re-export simbol dari catalog-shared
  landing-content.ts               → konstanta copy beranda (KEGIATAN, PENGURUS, FAQ), client-safe
  use-today.ts                     → useTodayISO: useSyncExternalStore hydration-safe
                                     (server "", client → tanggal lokal hari ini) untuk min <input date>
  auth.ts                          → hash/verifyPassword (scrypt salt:hash), sign/verifySession
                                     (HMAC payload.sig), SESSION_COOKIE, SESSION_MAX_AGE (8 jam)
  format.ts                        → formatRupiah (Intl id-ID, "Rp20.000"), formatTanggal
                                     (parse ISO manual → "25 Juni 2026", anti geser timezone)
  rental.ts                        → MURNI: hitungSubtotal, hitungTotal, validateRental
  whatsapp.ts                      → MURNI: buildWaMessage, buildWaUrl, WA_NUMBER (seam uji utama)
  seo.ts                           → konstanta ORG (nama, WA, alamat, foundingDate 2016), KEYWORDS,
                                     SITE_URL, jsonLdLocalBusiness()
  utils.ts                         → cn() (clsx + tailwind-merge)
  db/
    schema.sql                     → CREATE TABLE IF NOT EXISTS items (name UNIQUE, CHECK harga ≥ 0)
    seed.sql                       → INSERT 15 barang, ON CONFLICT (name) DO NOTHING
scripts/
  db-setup.ts                      → baca & jalankan schema.sql lalu seed.sql via sql; cetak jumlah
  hash-password.ts                 → cetak scrypt salt:hash dari argumen plaintext
tests/
  whatsapp.test.ts                 → penyusunan pesan + URL encode (filter qty 0)
  rental.test.ts                   → subtotal/total + validasi (edge: 0, 1, banyak)
  catalog-validate.test.ts         → validateItemInput / groupItems / hargaTerendah (murni)
  catalog.test.ts                  → CRUD integrasi thd DB; skip kecuali RUN_DB_TESTS=1
  auth.test.ts                     → hash/verify password + sign/verify sesi
  format.test.ts                   → formatRupiah / formatTanggal
  seo.test.ts                      → jsonLdLocalBusiness + konstanta org
docs/
  spec.md                          → dokumen ini
  ideas/website-paskelingan.md     → arah produk
```

## Lapisan Data

Neon serverless Postgres, satu tabel. Tanpa ORM/migrasi — perubahan skema masuk ke `schema.sql` lalu `bun run db:setup` diulang.

### Tabel `items`

| Kolom | Tipe | Catatan |
| ----- | ---- | ------- |
| `id` | serial PK | |
| `name` | text UNIQUE NOT NULL | jangkar seed `ON CONFLICT` |
| `unit_price` | integer NOT NULL, CHECK ≥ 0 | Rupiah tanpa desimal |
| `group_name` | text NOT NULL, default `'Peralatan Makan'` | 'Peralatan Makan' \| 'Wadah & Minum' \| 'Perabot' (`VALID_GROUPS`) |
| `sort_order` | integer NOT NULL, default 0 | urutan tampil dalam grup |
| `created_at` | timestamptz default now() | |
| `updated_at` | timestamptz default now() | di-set `now()` saat update |

Pengelompokan (`group_name` + `sort_order`) tinggal di data, bukan hardcode UI — `groupItems()` menyusun grup mengikuti urutan kemunculan. `createItem` mengisi `sort_order` = `MAX+1` dalam grup.

### Seed 15 barang

**Peralatan Makan:** Piring (200), Piring + Sendok (200), Mangkuk Sup (200), Mangkuk Sup + Sendok (200), Mangkuk Es (200), Mangkuk Es + Sendok (200), Lepek (100)
**Wadah & Minum:** Gelas (200), Gelas + Tutup (200), Baki (1000), Porong (2000), Ceret (3000), Termos (10000)
**Perabot:** Tikar (5000), Kursi (1000)

`ON CONFLICT (name) DO NOTHING`: aman diulang, tapi tidak memperbarui harga/grup baris yang sudah ada.

## Client/Server Split

Batas penting agar client bundle bebas DB:

- **`lib/catalog-shared.ts`** murni & client-safe (tipe + validasi + `groupItems`/`hargaTerendah`, nol import DB). Client component (`rental-form.tsx`) mengimpor dari sini.
- **`lib/catalog.ts`** server-only (`import { sql }`, CRUD), me-*re-export* simbol shared agar server code cukup impor satu modul.
- **Jangan** impor `lib/db` atau `lib/catalog` ke client component. `lib/rental.ts`, `lib/whatsapp.ts`, `lib/format.ts`, `lib/seo.ts`, `lib/landing-content.ts` juga murni/aman-client.

## Alur Publik

`/` beranda RSC menyusun section dari `components/landing/*` dan menyisipkan `<script type="application/ld+json">` LocalBusiness. Teaser "mulai RpX" memakai `hargaTerendah(getItems())`.

`/sewa`: RSC memberi `items` ke `RentalForm` (client). Form membentuk `RentalLine[]`, hitung subtotal/total real-time via `lib/rental`. Submit → `validateRental` (tanggal wajib + minimal satu qty ≥ 1) → `buildWaMessage` + `buildWaUrl` → `window.open("wa.me/<WA_NUMBER>?text=…")`. Tidak ada tulis DB dari sisi publik.

## Admin & Auth

Satu admin didefinisikan lewat env (tanpa tabel users). `login()` mencocokkan `ADMIN_USERNAME` + `verifyPassword` terhadap `ADMIN_PASSWORD_HASH`, lalu men-set cookie sesi HMAC (`signSession`, `httpOnly` + `secure` di produksi + `sameSite=lax`, 8 jam).

Tiga lapis penjaga rute admin:
1. **`proxy.ts`** — optimistic: redirect ke `/admin/login` bila cookie sesi absen (matcher mengecualikan `/admin/login`). Tidak memverifikasi tanda tangan.
2. **`app/admin/(dashboard)/layout.tsx`** — `verifySession` otoritatif tiap render dashboard; redirect bila invalid/kedaluwarsa.
3. **`requireAuth()`** di dalam tiap server action yang mengubah data.

Setiap mutasi memanggil `revalidatePath("/sewa")` dan `revalidatePath("/")` agar katalog & teaser harga ikut segar.

## Strategi Testing

`node --test` atas `tests/*.test.ts` (assert-based, nol framework). Modul murni (`auth`, `catalog-validate`, `format`, `rental`, `seo`, `whatsapp`) selalu jalan. `catalog.test.ts` melewati kasus DB kecuali `RUN_DB_TESTS=1` (via `bun run test:db`, menembak DB nyata di `DATABASE_URL`). Proteksi rute admin diuji lewat unit `verifySession`, bukan klik UI.

## Env Vars

```
DATABASE_URL          # Neon connection string (dipakai lib/db.ts)
ADMIN_USERNAME        # username admin tunggal
ADMIN_PASSWORD_HASH   # scrypt salt:hash hex (via `bun run hash-password`)
SESSION_SECRET        # kunci HMAC cookie sesi (≥ 32 byte acak)
NEXT_PUBLIC_SITE_URL  # opsional; override SITE_URL saat deploy (default vercel.app)
```

## Konvensi

TypeScript ketat; fungsi murni terpisah dari I/O; komentar seperlunya (kepadatan rendah, ikut repo). RSC default, `"use client"` hanya di komponen interaktif (`rental-form`, `site-header`, `item-list`, `login`, `mode-toggle`). Nama variabel/UI Bahasa Indonesia (domain) boleh; nama simbol kode Inggris. Rupiah = integer, diformat di tampilan (`Rp20.000`). Tanggal disimpan ISO `YYYY-MM-DD`, tampil `id-ID` panjang.

## Batasan Desain (yang tercermin di kode)

- Harga selalu dari DB (tak pernah hardcode di client).
- Tidak ada pembayaran / stok / rentang tanggal / i18n / log pengajuan ke DB.
- Skema DB terbatas satu tabel `items`.
- Nol dependency runtime/dev baru untuk auth/hash/sesi/test/format — semua stdlib atau yang sudah terpasang.
```
