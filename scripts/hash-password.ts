import { hashPassword } from "../lib/auth.ts";

const plain = process.argv[2];
if (!plain) {
  console.error("Usage: bun run hash-password -- <password>");
  process.exit(1);
}

console.log("Set to ADMIN_PASSWORD_HASH:");
console.log(hashPassword(plain));
