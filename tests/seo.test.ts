import { test } from "node:test";
import assert from "node:assert/strict";
import { jsonLdLocalBusiness, ORG } from "../lib/seo.ts";

test("jsonLdLocalBusiness punya schema.org LocalBusiness + nama + foundingDate", () => {
  const ld = jsonLdLocalBusiness();
  assert.equal(ld["@context"], "https://schema.org");
  assert.equal(ld["@type"], "LocalBusiness");
  assert.equal(ld.name, ORG.nama);
  assert.equal(ld.foundingDate, "2016");
});

test("jsonLdLocalBusiness alamat lengkap Klaten Jawa Tengah", () => {
  const ld = jsonLdLocalBusiness();
  assert.equal(ld.address["@type"], "PostalAddress");
  assert.equal(ld.address.addressRegion, "Jawa Tengah");
  assert.ok(ld.address.addressLocality.includes("Klaten"));
  assert.ok(ld.address.streetAddress.includes("Keboan Pason"));
});

test("jsonLdLocalBusiness areaServed memuat area layanan", () => {
  const ld = jsonLdLocalBusiness();
  assert.ok(Array.isArray(ld.areaServed));
  assert.ok(ld.areaServed.includes("Klaten"));
});
