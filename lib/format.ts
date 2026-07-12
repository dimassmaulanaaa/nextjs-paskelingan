const rupiah = new Intl.NumberFormat("id-ID");

export function formatRupiah(amount: number): string {
  return `Rp${rupiah.format(amount)}`;
}

const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

// Terima ISO "YYYY-MM-DD"; parse komponen langsung agar tak tergeser timezone.
export function formatTanggal(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${BULAN[m - 1]} ${y}`;
}
