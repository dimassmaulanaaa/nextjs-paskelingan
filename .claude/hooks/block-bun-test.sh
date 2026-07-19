#!/usr/bin/env bash
# PreToolUse(Bash) hook: block bare `bun test` — suite ini pakai node:test API,
# incompatible sama Bun test runner (lihat CLAUDE.md). `bun run test` / `bun run test:db`
# tetap boleh karena itu jalanin script package.json yang manggil node --test.
set -euo pipefail

CMD=$(python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('tool_input', d).get('command',''))" 2>/dev/null || true)

if echo "$CMD" | grep -Eq '(^|[;&|]|[[:space:]])bun[[:space:]]+test([[:space:]]|$)'; then
  REASON="Jangan pakai 'bun test' -- test suite proyek ini pakai node:test API, gak compatible sama Bun test runner (lihat CLAUDE.md). Pakai 'bun run test' (semua test) atau 'node --test tests/<file>.test.ts' (satu file) sebagai gantinya."
  python3 -c "import json,sys;print(json.dumps({'hookSpecificOutput':{'hookEventName':'PreToolUse','permissionDecision':'deny','permissionDecisionReason':sys.argv[1]}}))" "$REASON"
  exit 0
fi

exit 0
