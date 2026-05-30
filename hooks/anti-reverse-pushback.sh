#!/usr/bin/env bash
# Anti-Reverse-Pushback Guard · UserPromptSubmit upgrade-trigger guard
# Purpose: When user uses escalation triggers → inject "stage-10 reverse pushback" prompt
# Mechanism: Rule-based regex · No LLM calls · No token cost · Never blocks
# One-shot per session to avoid noise
#
# Real-world reason this exists:
# An ordinary user said "just put it on the channel" and watched their AI assistant
# auto-escalate 4 times into 80 minutes of work that should've been 5 minutes.
# This hook physically intercepts 17 escalation trigger words and forces AI to
# offer a "light flow vs heavy flow" comparison before doing anything.
#
# License: MIT

set -uo pipefail

input=$(cat)
raw_msg=$(echo "$input" | jq -r '.prompt // .user_message // ""' 2>/dev/null || echo "")
session_id=$(echo "$input" | jq -r '.session_id // "default"' 2>/dev/null || echo "default")

[ -z "$raw_msg" ] && exit 0

# ─── Filter out non-human-user blocks ────────────────────────────────────────
# Strip <system-reminder>...</system-reminder> (cross-line)
# Strip <task-notification>...</task-notification>
# Strip agent result lines / tool_use lines / command markers
# Whatever remains is real human input
msg=$(echo "$raw_msg" \
  | perl -0777 -pe 's/<system-reminder>.*?<\/system-reminder>//gis' \
  | perl -0777 -pe 's/<task-notification>.*?<\/task-notification>//gis' \
  | grep -v -E '^\s*(agentId:|Bash completed|Edit successful|tool_use|subagent|<command-|<\/command-)' \
  | sed '/^[[:space:]]*$/d')

# If filtered message is empty (all system/tool noise) → exit silently
[ -z "$msg" ] && exit 0

marker_dir="/tmp/cc-reverse-pushback"
mkdir -p "$marker_dir" 2>/dev/null || true

marker_file="$marker_dir/${session_id}.hit"

emit_ctx() {
  jq -nc --arg ctx "$1" '{hookSpecificOutput:{hookEventName:"UserPromptSubmit",additionalContext:$ctx}}'
}

# ─── Escalation Triggers (17 words) ───────────────────────────────────────
# These are common user phrases that AI tends to auto-escalate into heavy workflows.
# When any of these appear, AI must FIRST offer light-vs-heavy comparison.
#
# Categories:
#   - Workflow words: do-it-all / one-shot / end-to-end / full-pipeline
#   - Dispatch words: dispatch-agent / subagent / push-to-draft
#   - Resource words: burn-credits / burn-tokens / max-effort
#   - Trigger phrases: just-publish / auto-post / upgrade-X
triggers_upgrade="do it all|one[ -]shot|end[ -]to[ -]end|dispatch agent|sub[ -]agent|burn credits|burn tokens|push to draft|full[ -]pipeline|full pipeline closed[ -]loop|one[ -]click publish|one[ -]click|auto post|upgrade|max effort|just publish|just post"

if echo "$msg" | grep -qiE "$triggers_upgrade"; then
  if [ ! -f "$marker_file" ]; then
    touch "$marker_file" 2>/dev/null || true
    emit_ctx "🛑 Escalation trigger detected.
STOP and offer Stage-10 Reverse Pushback:

① Provide LIGHT-vs-HEAVY comparison:
【Stage-10 Reverse Pushback】
  Light flow: [what · time · cost]
  Heavy flow: [what · time · cost]
  AI preference: [light/heavy + 1-line reason]
  Wait for user to pick 'light' or 'heavy'

② Default to LIGHT flow · heavy requires explicit user confirmation

③ Three exceptions (skip pushback · proceed directly):
   - Fixing a real bug with hard evidence (≤30 lines, controllable)
   - User explicitly said 'I want heavy / full set / burn it'
   - Hard-locked SOP that requires full procedure

Reason this exists:
An ordinary user said 'just put it on the channel' and the AI auto-escalated
4 times, burning 80 minutes for what should have been 5-minute plain-text work.

This reminder appears only once per session."
  fi
fi

exit 0
