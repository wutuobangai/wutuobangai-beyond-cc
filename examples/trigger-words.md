# 17 Escalation Trigger Words (升级触发词 17 个)

> Default trigger list shipped with `anti-reverse-pushback.sh`.
> Customize for your own workflow by editing the `triggers_upgrade` regex in the hook.

---

## Trigger Categories

### 1·Workflow Words (5 个工作流相关)

| Trigger | 中文 | Why AI Escalates |
|---------|------|------------------|
| `do it all` | 全做 | AI 默认走最完整路径 |
| `one-shot` / `one shot` | 一次性 | AI 默认拆 N 步派 N agent |
| `end-to-end` / `end to end` | 端到端 | AI 默认接全栈流水线 |
| `full-pipeline` / `full pipeline` | 全流程 | AI 默认补全所有可选步骤 |
| `full pipeline closed-loop` | 全流程闭环 | AI 默认升级到 max effort |

### 2·Dispatch Words (3 个派活相关)

| Trigger | 中文 | Why AI Escalates |
|---------|------|------------------|
| `dispatch agent` | 派 agent | AI 默认派 N 个 subagent 并行 |
| `subagent` / `sub-agent` | 子 agent | AI 默认拆细到 4-8 个 agent |
| `push to draft` | 推草稿箱 | AI 默认走多步骤上传流程 |

### 3·Resource Words (3 个烧资源相关)

| Trigger | 中文 | Why AI Escalates |
|---------|------|------------------|
| `burn credits` | 烧 credits | AI 默认认为预算无上限 |
| `burn tokens` | 烧 token | AI 默认 max context |
| `max effort` | max effort | AI 默认全套护栏 + 全 verify |

### 4·Trigger Phrases (6 个动作相关)

| Trigger | 中文 | Why AI Escalates |
|---------|------|------------------|
| `upgrade` | 升级 | AI 默认换更贵模型 + 加 verify |
| `just publish` | 直接放 / 直接发 | AI 默认走「编辑+审核+发布」全流程 |
| `just post` | 直接推 | 同上 |
| `one-click publish` / `one-click` | 一键发布 | AI 默认接到 N8N / API 自动化 |
| `auto post` | 自动发 | AI 默认接到平台 API + 风控审核 |

---

## Reverse Pushback Template

When any trigger fires · AI must output this format BEFORE doing anything:

```
🛑 Escalation trigger detected.

【Stage-10 Reverse Pushback】
Light flow: <what · how long · cost>
Heavy flow: <what · how long · cost>
AI preference: <light/heavy + 1-line reason>

Waiting for: pick "light" or "heavy"
Default if no answer: light flow
```

---

## 3 Exceptions (skip pushback · proceed directly)

The hook should NOT trigger reverse pushback when:

1. **Fixing a real bug with hard evidence**·≤30 lines·controllable·user will be angry if not fixed
2. **User explicitly said "I want heavy"**·原话「我就是要全套 / 重流程 / 就是要烧」
3. **Hard-locked SOP**·organization has a fixed procedure that mandates full pipeline

---

## How to Customize

Edit line 50 in `anti-reverse-pushback.sh`:

```bash
triggers_upgrade="do it all|one[ -]shot|..."
```

- Use `|` to separate alternatives
- Use `[ -]` to match both space and hyphen
- Add your own organization's escalation triggers

Example for a sales team:
```bash
triggers_upgrade="close the deal|all hands|emergency|VIP customer|escalate"
```

Example for a content team:
```bash
triggers_upgrade="full series|monthly batch|multi-platform|cross-post|repurpose"
```

---

## 4 Real-world Scenarios

### Scenario A·Content Publishing

| User Says | Without Hook | With Hook |
|-----------|--------------|-----------|
| "Just put it on the channel" | AI runs full edit+review+publish pipeline 80 min | AI offers: Light=plain text 5 min ¥0 / Heavy=full pipeline 80 min ¥5 |

### Scenario B·Image Generation

| User Says | Without Hook | With Hook |
|-----------|--------------|-----------|
| "One-shot all 4 images" | AI dispatches 4 agents in parallel + max-effort prompts | AI offers: Light=HTML render ¥0 / Heavy=4 paid API calls ¥0.32 |

### Scenario C·Code Refactoring

| User Says | Without Hook | With Hook |
|-----------|--------------|-----------|
| "End-to-end refactor this module" | AI rewrites every file + adds full test suite | AI offers: Light=targeted fix ≤30 lines / Heavy=full refactor + tests |

### Scenario D·Research Task

| User Says | Without Hook | With Hook |
|-----------|--------------|-----------|
| "Full pipeline on competitor analysis" | AI runs 8 searches + scrapes + builds doc | AI offers: Light=1 web search summary / Heavy=8 sources + scraping |
