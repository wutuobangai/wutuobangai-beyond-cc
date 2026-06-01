# anti-hallucination-prompt-guard

A tiny **Claude Code `UserPromptSubmit` hook** that nudges the AI to **search its own project context before answering** — instead of answering confidently from (often wrong) memory.

It's a coarse rule-based heuristic. **No LLM call, no tokens burned, never blocks.** A missed or over-eager match costs you nothing but a one-line nudge — and it stays out of your way until a pattern actually matches. (If `jq` isn't installed it tells you so once, instead of silently doing nothing.)

## Why

The most expensive failure mode of an AI coding agent isn't "it doesn't know" — it's **"it thinks it knows" and answers from memory**. You ask *"didn't we already set up X?"* and it cheerfully makes up an answer instead of grepping the repo.

This hook watches your prompt for two patterns and injects a one-line reminder:

| Trigger | Example | Reminder injected |
|---|---|---|
| **Past-tense / decision** | *"we decided…"*, *"last time…"*, *"didn't we build…"* | → read your decisions log + grep your memory **before** asserting |
| **Action imperative** | *"build me a…"*, *"write a…"*, *"go do X"* | → search your local SOPs / templates / examples **before** acting |

It fires **once per session per group** (no nagging).

## Install (3 steps)

1. Drop `anti-hallucination-prompt-guard.sh` somewhere (e.g. `~/.claude/hooks/`) and `chmod +x` it.
2. Open the **`CONFIG` block** at the top of the script and point the 3 variables at your project:
   ```bash
   DECISIONS_FILE="$HOME/your-project/DECISIONS.md"   # your "locked decisions" log
   MEMORY_GLOB="$HOME/.claude/projects/*/memory/*.md" # where your AI keeps memory
   SOP_DIR="$HOME/your-project/sops"                  # your how-to / playbook dir
   ```
   The triggers are bilingual (English + Chinese) — trim `TRIGGERS_PAST` / `TRIGGERS_ACTION` to your language.
3. Register it in your Claude Code `settings.json` (full file: [`examples/settings.json.example`](../examples/settings.json.example)):
   ```json
   { "hooks": { "UserPromptSubmit": [
     { "hooks": [ { "type": "command", "command": "~/.claude/hooks/anti-hallucination-prompt-guard.sh" } ] }
   ] } }
   ```

## Test it yourself

```bash
echo '{"prompt":"we decided last time to use Postgres","session_id":"t1"}' \
  | bash anti-hallucination-prompt-guard.sh
# → emits a hookSpecificOutput reminder to check your decisions log first

echo '{"prompt":"hello","session_id":"t2"}' | bash anti-hallucination-prompt-guard.sh
# → nothing. Stays out of your way unless a trigger matches.
```

## It's a heuristic, not magic

The triggers are deliberately simple regex — they'll occasionally miss a phrasing or fire on an innocent one. That's fine: a wrong nudge costs nothing, and it fires **at most once per session per group** (markers reset daily) so it never nags. Tune `TRIGGERS_PAST` / `TRIGGERS_ACTION` to how *you* actually talk. The value isn't perfect intent detection — it's making "search before you assert" the cheap default.

## Requirements

`bash` + [`jq`](https://jqlang.github.io/jq/). If `jq` is missing the hook stays quiet except for a one-time "installed but inactive" notice — it won't pretend to protect you while doing nothing.

## License

MIT. Part of **beyond-cc** — open methodology from a non-coder running a company on AI. Take it, fork it, adapt it.
