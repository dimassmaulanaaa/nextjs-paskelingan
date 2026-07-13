import { hashPassword } from "../lib/auth.ts";

const plain = process.argv[2];
if (!plain) {
  console.error("Pakai: npm run hash-password -- <password>");
  process.exit(1);
}

console.log("Set ke ADMIN_PASSWORD_HASH:");
console.log(hashPassword(plain));
