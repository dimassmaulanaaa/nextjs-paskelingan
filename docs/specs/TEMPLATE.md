# Spec: <nama fitur>

> **Prescriptive & sekali-pakai.** Cetak biru SATU fitur, ditulis SEBELUM koding. Boleh beda dari kode sekarang — ini niat, bukan cermin. Setelah fitur live: lipat perubahan ke `docs/spec.md`, lalu hapus/arsipkan file ini. Jangan jadikan sumber kebenaran permanen.
>
> Status: `draft` | `in-progress` | `merged` (siap dibuang)

## Objective

<Apa yang dibangun & kenapa sekarang. 1–2 kalimat. Untuk siapa.>

## Acceptance Criteria

- [ ] <perilaku bisa-diamati, bukan detail implementasi>
- [ ] <...>

## Scope

**In:** <yang digarap>
**Out:** <yang sengaja TIDAK, biar nggak melebar>

## Perubahan Kode (rencana)

<File/modul yang disentuh + garis besar. Hormati batas yang ada: client/server split (catalog-shared vs catalog), nol dependency baru, DB satu tabel items. Lihat docs/spec.md.>

## Test

<Seam yang diuji via node:test. Modul murni diutamakan (rental/whatsapp/format/auth/catalog-shared). Sebut edge case.>

## Risiko / Open Questions

- <yang belum pasti; tanya sebelum lanjut>
