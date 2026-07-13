import { test } from "node:test";
import assert from "node:assert/strict";
import {
  hashPassword,
  verifyPassword,
  signSession,
  verifySession,
} from "../lib/auth.ts";

const SECRET = "test-secret-minimal-32-bytes-panjang-xx";

// --- password ---

test("hashPassword format salt:hash, verifyPassword benar", () => {
  const hash = hashPassword("rahasia123");
  assert.match(hash, /^[0-9a-f]+:[0-9a-f]+$/);
  assert.equal(verifyPassword("rahasia123", hash), true);
});

test("verifyPassword tolak password salah", () => {
  const hash = hashPassword("rahasia123");
  assert.equal(verifyPassword("salah", hash), false);
});

test("hashPassword hasilkan salt berbeda tiap panggil", () => {
  assert.notEqual(hashPassword("sama"), hashPassword("sama"));
});

test("verifyPassword tolak hash rusak tanpa throw", () => {
  assert.equal(verifyPassword("x", "bukan-format-valid"), false);
});

// --- session ---

test("signSession round-trip verifySession valid", () => {
  const token = signSession("admin", SECRET, 3600);
  const result = verifySession(token, SECRET);
  assert.equal(result?.username, "admin");
});

test("verifySession tolak tanda-tangan dipalsu", () => {
  const token = signSession("admin", SECRET, 3600);
  const tampered = token.slice(0, -4) + "0000";
  assert.equal(verifySession(tampered, SECRET), null);
});

test("verifySession tolak secret berbeda", () => {
  const token = signSession("admin", SECRET, 3600);
  assert.equal(verifySession(token, "secret-lain-yang-cukup-panjang-32byte"), null);
});

test("verifySession tolak sesi kadaluarsa", () => {
  const token = signSession("admin", SECRET, -1); // sudah lewat
  assert.equal(verifySession(token, SECRET), null);
});

test("verifySession tolak token sampah tanpa throw", () => {
  assert.equal(verifySession("sampah", SECRET), null);
  assert.equal(verifySession("", SECRET), null);
});
