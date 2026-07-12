export type RentalLine = { name: string; unitPrice: number; qty: number };
export type ValidationResult = { valid: true } | { valid: false; error: string };

export function hitungSubtotal(unitPrice: number, qty: number): number {
  return unitPrice * qty;
}

export function hitungTotal(lines: RentalLine[]): number {
  return lines.reduce((sum, l) => sum + hitungSubtotal(l.unitPrice, l.qty), 0);
}

export function validateRental(
  tanggal: string,
  lines: RentalLine[],
): ValidationResult {
  if (!tanggal) return { valid: false, error: "Pilih tanggal sewa terlebih dahulu." };
  if (!lines.some((l) => l.qty >= 1))
    return { valid: false, error: "Pilih minimal satu barang dengan jumlah ≥ 1." };
  return { valid: true };
}
