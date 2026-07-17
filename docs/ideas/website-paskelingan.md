# Website Karang Taruna Paskelingan — Refined Direction

> Hasil sesi `/idea-refine` di atas intent terkunci dari `/interview-me`. Dokumen ini jadi masukan untuk `/spec-driven-development`.

## Problem Statement

**How Might We** bikin Paskelingan ada di dunia maya sehingga warga & calon penyewa Klaten/Ceper nemu mereka saat dicari, langsung percaya ini resmi, dan bisa ajukan sewa bolopecah tanpa gesekan — semua berakhir mulus di WhatsApp.

## Recommended Direction — "Etalase Tepercaya"

Poros situs adalah **ditemukan & dipercaya** saat orang mencari nama+lokasi Paskelingan, bukan mengejar kata kunci umum berkompetisi tinggi. Nilai utama lahir dari konten yang benar-benar menyebut "Keboan Pason, Ceper, Klaten" dalam kalimat bermakna (hero, About, footer, JSON-LD `LocalBusiness`), FAQ sewa penangkap long-tail, dan bukti sosial jujur yang pengurus suplai.

Di atas tulang punggung konten itu, dicomot dua menang-murah dari sisi UX:

- **Grup barang ber-anchor SEO** di `/sewa` — judul grup merangkap kata kunci, sekaligus merapikan 15 baris jadi tidak monoton.
- **Ringkasan pesanan sticky** — total + tombol WA menempel di bawah layar mobile, meredam gesekan form panjang di HP.

Semua konten profil pakai **placeholder pintar**: ditulis realistis dan sudah memuat kata kunci lokasi sejak hari 1 (bukan Lorem ipsum), sehingga situs fungsional-SEO langsung saat rilis. Pasca-rilis, pengurus mengganti bertahap dengan konten asli.

## Key Assumptions to Validate

- [ ] **Konten asli benar-benar masuk ≤ H+30.** Risiko #1. Placeholder pintar menahan sementara, tapi kalau konten asli tak pernah masuk, tujuan "ditemukan & dipercaya" gagal total — terlepas dari kualitas kode. Uji: pantau apakah set konten minimum terisi dalam 30 hari sejak live.
- [ ] **Volume pencarian nama+lokasi cukup berarti.** "Karang Taruna Keboan Pason" bisa sangat kecil (<5/bulan). Uji: cek Google Search Console pasca-rilis; kalau nol, perluas ke frasa sekitar (nama desa/kecamatan tetangga) via FAQ & konten.
- [ ] **Penyewa nyaman isi form di HP lalu lanjut ke WA.** Uji: pantau apakah pengaju WA menyertakan rincian dari form (bukan chat kosong "mau sewa").

## MVP Scope

**Fondasi (wajib rilis):**

- `/` beranda company profile: Hero, Tentang (memuat "Berdiri sejak 2016" + lokasi lengkap), Kegiatan, Galeri, Struktur Pengurus, Kontak, **teaser katalog** ("mulai Rp100" + beberapa barang + link ke `/sewa`), FAQ sewa.
- `/sewa`: satu tabel 15 barang **dikelompokkan 3 grup ber-anchor SEO**, kolom (nama, harga satuan, input jumlah, subtotal), total di bawah, **sticky summary + tombol WA** di mobile. Merangkap katalog (tidak ada section katalog terpisah).
- Form sewa: date picker (hari ini ke depan, tanpa aturan jeda), validasi "min. satu barang jumlah ≥ 1", pesan WA menyaring barang jumlah 0, format `Rp20.000` konsisten di layar & WA.
- `/admin` + `/admin/login`: satu akun dari env var, CRUD katalog, sesi cookie HTTP-only, rute `/admin/*` terproteksi.
- SEO teknis: Metadata API per halaman, JSON-LD `LocalBusiness` (nama, alamat lengkap, `foundingDate: 2016`, area layanan), sitemap.xml, robots.txt, OG tags, rendering RSC.
- DB Neon: tabel `items` (id, name, unit_price, created_at, updated_at), seed 15 barang.
- Placeholder pintar (memuat kata kunci lokasi) untuk semua konten profil, mudah diganti.

### Grup barang final (fix)

| Grup | Barang |
| ---- | ------ |
| **Peralatan Makan** | Piring, Piring + Sendok, Mangkuk Sup, Mangkuk Sup + Sendok, Mangkuk Es, Mangkuk Es + Sendok, Lepek |
| **Wadah & Minum** | Gelas, Gelas + Tutup, Baki, Porong, Ceret, Termos |
| **Perabot** | Tikar, Kursi |

### Set konten minimum wajib (ambang H+30)

Placeholder pintar boleh saat rilis, tapi berikut wajib jadi konten asli ≤ 30 hari sejak live:

- Alamat lengkap asli (Dukuh Keboan Pason, Desa Ceper, Kec. Ceper, Kab. Klaten, Jawa Tengah)
- Min. 1 paragraf "Tentang Paskelingan" asli
- Min. 3 foto asli kegiatan
- Tahun berdiri: **2016**
- Min. 3 nama pengurus inti

## Not Doing (and Why)

- **Katalog etalase harga-penuh di beranda** — cukup teaser "mulai Rp100" + link; harga penuh & input hanya di `/sewa`. Hindari duplikasi, satu sumber kebenaran.
- **Dropdown pilih barang / tambah-hapus baris** — diganti daftar tetap. Story #15 & #19 ditulis ulang di spec (barang tak dipilih, hanya diisi jumlah; validasi → "min. satu barang jumlah ≥ 1").
- **Kejar kata kunci umum kompetitif** ("sewa alat pesta") — fokus nama+lokasi saingan-rendah. Menang yang bisa dimenangkan.
- **UI kelola admin** — satu akun env var. Ganti pengurus lewat update env.
- **Testimoni/bukti sosial dibuat-buat** — hanya klaim jujur (tahun berdiri 2016). Kredibilitas palsu = bumerang.
- **Arah B (konversi-first)** — mengoptimalkan yang bukan tujuan utama (sukses = ditemukan & dipercaya).
- **Pembayaran online, log sewa, cek stok, rentang tanggal, multi-bahasa, notifikasi selain WA, CMS konten profil, admin berjenjang** — sesuai batasan PRD asli.

## Open Questions (terjawab sesi ini)

- **Toleransi placeholder:** ambang keras **H+30** — set konten minimum wajib masuk ≤ 30 hari sejak live.
- **Grup barang:** 3 grup, nama & isi **fix** (lihat tabel).
- **Bukti sosial:** tahun berdiri **2016** → "Berdiri sejak 2016" di About + `foundingDate` JSON-LD.
