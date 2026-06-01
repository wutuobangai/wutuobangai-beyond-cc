#!/usr/bin/env bash
# anti-hallucination-prompt-guard.sh
#
# A Claude Code UserPromptSubmit hook that nudges the AI to SEARCH its own
# project context BEFORE answering — instead of answering from (often wrong)
# memory. Cheap insurance against confident hallucination.
#
# Two trigger groups:
#   A) Past-tense / decision phrasing ("we decided…", "didn't we build…")
#      -> reminds the AI to read its decision log / grep its memory first.
#   B) Action-imperative phrasing ("build me a…", "help me write…")
#      -> reminds the AI to search local SOPs / templates / examples first.
#
# It is a COARSE regex heuristic — tune the TRIGGERS_* patterns to your taste.
# No LLM call, no tokens burned, NEVER blocks. Fires at most once per session
# per group (markers live in a per-day /tmp dir). If both groups match, you get
# ONE combined message.
#
# Register it under hooks.UserPromptSubmit in settings.json
# (see examples/settings.json.example).
#
# Part of beyond-cc — open methodology from a non-coder running a company on AI.
# MIT License.

# Intentionally NO 'set -e': a non-matching `grep -q` (exit 1) must never abort
# the hook. -u + pipefail are safe here.
set -uo pipefail

input=$(cat)

# jq parses the hook payload. If it's missing, say so LOUDLY rather than
# silently doing nothing forever (a disabled guard is worse than no guard).
if ! command -v jq >/dev/null 2>&1; then
  printf '%s\n' '{"hookSpecificOutput":{"hookEventName":"UserPromptSubmit","additionalContext":"[anti-hallucination-prompt-guard] jq not found — hook is installed but INACTIVE. Install jq to enable it."}}'
  exit 0
fi

msg=$(jq -r '.prompt // ""' <<<"$input" 2>/dev/null || echo "")
session_id=$(jq -r '.session_id // "default"' <<<"$input" 2>/dev/null || echo "default")
[ -z "$msg" ] && exit 0

# session_id is external input — sanitize before using it in a file path.
session_id=$(printf '%s' "$session_id" | tr -cd 'a-zA-Z0-9_-')
[ -z "$session_id" ] && session_id="default"

# Keep 'set -u' from tripping on the $HOME defaults below if HOME is unset
# (cron / container / CI). You're expected to edit these paths anyway.
: "${HOME:=/tmp}"

# ── CONFIG · edit these for your own project ─────────────────────────
DECISIONS_FILE="$HOME/your-project/DECISIONS.md"      # your "locked decisions" log
MEMORY_GLOB="$HOME/.claude/projects/*/memory/*.md"     # where your AI keeps memory
SOP_DIR="$HOME/your-project/sops"                      # your how-to / playbook dir
# Coarse intent patterns (English + zh). Trim to whatever language you work in.
# PAST: a "we/didn't we/last time" anchor + a prior-work verb (avoids matching
#       bare "earlier" / "we agreed [chit-chat]").
TRIGGERS_PAST="did ?n['’]?t we (build|set ?up|write|make|create|configure|add)|we (already )?(decided|agreed to|set ?up|configured|built|wrote|made|created|implemented)|last time|之前|上次|上回|我们(做过|搞过|建过|写过|配过|定过|决定)"
# ACTION: an imperative build-verb at start / after help-me-please (avoids
#         matching "how to write a…" or "what would make the…").
TRIGGERS_ACTION="(help me|please|pls|帮我|给我) ?(go )?(build|write|create|implement|add|make|set ?up|do|做|写|搞|建|加|改|实现|生成)|(^|[.!?][[:space:]]+)(build|write|create|implement|add|make|set ?up) (me )?(a|an|the) "
# ─────────────────────────────────────────────────────────────────────

marker_dir="/tmp/anti-hallucination-prompt-guard-$(date +%Y%m%d)"
mkdir -p "$marker_dir" 2>/dev/null || true

notes=""

# Group A — past tense / decision phrasing → search before you assert
if printf '%s' "$msg" | grep -qiE "$TRIGGERS_PAST"; then
  m="$marker_dir/${session_id}.past"
  if [ ! -f "$m" ]; then
    touch "$m" 2>/dev/null || true
    notes="⚠️ Past-tense / decision phrasing detected. Before answering:
① read $DECISIONS_FILE for any relevant prior decision
② grep your memory ($MEMORY_GLOB) for the user's own earlier words
③ only if nothing is found, ask the user.
The user's memory is NOT your source of truth — the files are. Don't answer from impression."
  fi
fi

# Group B — action imperative → search local playbooks before you act
if printf '%s' "$msg" | grep -qiE "$TRIGGERS_ACTION"; then
  m="$marker_dir/${session_id}.action"
  if [ ! -f "$m" ]; then
    touch "$m" 2>/dev/null || true
    [ -n "$notes" ] && notes="$notes

"
    notes="${notes}⚠️ Action request detected. Before doing it:
① search $SOP_DIR for an existing SOP / playbook on this topic
② search the project for *<keyword>*template* and *<keyword>*example*
③ read what you find, THEN act.
'I think I know how' is how you skip the better local solution. Check first."
  fi
fi

# Emit ONCE (combined). Schema = a single hookSpecificOutput object.
[ -n "$notes" ] && jq -nc --arg c "$notes" '{hookSpecificOutput:{hookEventName:"UserPromptSubmit",additionalContext:$c}}'
exit 0
