import {
  scryptSync,
  randomBytes,
  timingSafeEqual,
  createHmac,
} from "node:crypto";

// --- Password: scrypt + salt, format "salt:hash" (hex) ---

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  try {
    const salt = Buffer.from(saltHex, "hex");
    const expected = Buffer.from(hashHex, "hex");
    const actual = scryptSync(password, salt, expected.length);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

// --- Session: payload base64url + HMAC-SHA256, format "payload.sig" ---

type SessionPayload = { username: string; exp: number };

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

export function signSession(
  username: string,
  secret: string,
  maxAgeSeconds: number,
): string {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const payload: SessionPayload = { username, exp };
  const data = b64url(Buffer.from(JSON.stringify(payload)));
  const sig = b64url(createHmac("sha256", secret).update(data).digest());
  return `${data}.${sig}`;
}

export function verifySession(
  token: string,
  secret: string,
): SessionPayload | null {
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  try {
    const expected = createHmac("sha256", secret).update(data).digest();
    const given = Buffer.from(sig, "base64url");
    if (given.length !== expected.length || !timingSafeEqual(given, expected))
      return null;
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString(),
    ) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000)
      return null;
    return payload;
  } catch {
    return null;
  }
}
