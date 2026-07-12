export const ORG = {
  nama: "Karang Taruna Paskelingan",
  foundingDate: "2016",
  wa: "6287889198491",
  waDisplay: "+62 878-8919-8491",
  alamat: {
    dukuh: "Dukuh Keboan Pason",
    desa: "Desa Ceper",
    kecamatan: "Kecamatan Ceper",
    kabupaten: "Kabupaten Klaten",
    provinsi: "Jawa Tengah",
  },
  areaLayanan: ["Ceper", "Klaten"],
} as const;

export const ALAMAT_LENGKAP =
  `${ORG.alamat.dukuh}, ${ORG.alamat.desa}, ${ORG.alamat.kecamatan}, ${ORG.alamat.kabupaten}, ${ORG.alamat.provinsi}`;

// Kata kunci lokal target (nama + lokasi, saingan-rendah).
export const KEYWORDS = [
  "Karang Taruna Paskelingan",
  "Karang Taruna Keboan Pason",
  "Karang Taruna Ceper",
  "Karang Taruna Klaten",
  "Sewa bolopecah Klaten",
  "Sewa bolopecah Ceper",
  "Sewa piring gelas Klaten",
  "Sewa piring gelas Ceper",
];
