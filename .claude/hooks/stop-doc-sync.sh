#!/usr/bin/env bash
# Stop hook: block ending the turn if app/lib/components changed but docs/spec.md didn't.
# Anti-loop: only blocks once per distinct diff (hash stored in .claude/.stop-hook-guard.json).
set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-.}"

if [ ! -d .git ]; then
  exit 0
fi

# Tracked changes (staged + unstaged) vs HEAD, plus untracked new files, scoped to source dirs.
CHANGED=$(
  {
    git diff --name-only HEAD -- app lib components 2>/dev/null || true
    git ls-files --others --exclude-standard -- app lib components 2>/dev/null || true
  } | { grep -Ev '(^|/)tests/|\.test\.[jt]sx?$' || true; } | sort -u
)

if [ -z "$CHANGED" ]; then
  exit 0
fi

if echo "$CHANGED" | grep -qx 'docs/spec.md' || git diff --name-only HEAD -- docs/spec.md 2>/dev/null | grep -q .; then
  exit 0
fi

GUARD_FILE=".claude/.stop-hook-guard.json"
HASH=$(echo "$CHANGED" | sha1sum | cut -d' ' -f1)
PREV_HASH=""
if [ -f "$GUARD_FILE" ]; then
  PREV_HASH=$(python3 -c "import json;print(json.load(open('$GUARD_FILE')).get('hash',''))" 2>/dev/null || true)
fi

if [ "$HASH" = "$PREV_HASH" ]; then
  exit 0
fi

mkdir -p .claude
printf '{"hash":"%s"}\n' "$HASH" > "$GUARD_FILE"

FILES_LIST=$(echo "$CHANGED" | tr '\n' ' ')
REASON="Source berubah (app/lib/components) tapi docs/spec.md belum ikut diupdate: ${FILES_LIST}. Update docs/spec.md dulu supaya tetap mirror kode (lihat CLAUDE.md soal docs workflow). Kalau perubahan ini memang gak mengubah arsitektur/behavior yang dideskripsikan spec.md, boleh lanjut stop tanpa update -- hook ini gak akan block dua kali untuk diff yang sama. Cek juga apakah convention di CLAUDE.md/AGENTS.md perlu disesuaikan, dan jalankan graphify update . kalau strukturnya berubah."

python3 -c "import json,sys;print(json.dumps({'decision':'block','reason':sys.argv[1]}))" "$REASON"
exit 0
