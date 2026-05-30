# wutuobangai-beyond-cc

> 30 岁不懂代码的普通人 · 用 Claude Code 跑出了超越 Anthropic 的方法论

[English version below ↓]

---

## Why "BEYOND"?（不是嘴喊·是时间证据）

不是说我们比 Anthropic 强·而是 5 件关键方法论我们都比官方早落地。
每一件都有时间戳 + 真实事故 + 物理 hook 可验证。

| # | 方法论 | 我们落地 | Anthropic 官方 | 关系 |
|---|--------|----------|----------------|------|
| 1 | 4 agent 端到端 + 5 件硬指标（A 开发 / B 部署 / C 测试 / V 验收） | 2026-04-26 | 2026-05-06 Multiagent Orchestration | **我们早 10 天** |
| 2 | verifier 独立核实（主线 ≠ verifier · 防 agent 自报全清） | 2026-04-26 | 2026-05-06 Outcomes 模型 | **我们早 10 天** |
| 3 | Memory 4 件套（user / feedback / project / reference 分类沉淀） | 2026-04-27 | 2026-05-06 Dreaming 模式 | **我们早 9 天** |
| 4 | 主席台第 10 条·反向劝阻（AI 主动给「轻 vs 重」对比） | 2026-05-22 | 2026-05-06「能做就别派 agent」 | 官方先提原则 · **我们先做物理 hook 落地** |
| 5 | Agent 工具白名单 8 件套 | 2026-05-20 | 2026-05-06 16 tool 白名单（仅原则） | 官方先提原则 · **我们做出更深 1 层的 SOP + hook** |

**为啥能跟官方打出时间差？**
- 3 件我们真比官方早（4 月立法 · Anthropic 5-06 才 ship）
- 2 件官方先提原则 · 我们先做物理落地（文档建议 vs hook 拦截 · 不是一回事）

不是我们厉害·是我们**每天被真实事故炸**·痛了 1 小时就立法。
Anthropic 看百万用户共性 · 发的是「建议文档」。
我看 1 个普通人天天被坑 · 发的是「装上就能拦的 hook」。
**痛点驱动 ≠ 文档驱动** · 这是普通玩家的优势。

---

## 这个仓库做啥（大白话）

**让 AI 学会反向劝阻人类**。

你说「全做 / 一次性 / 派 agent / 推草稿箱」时·AI 必须停下来反问你：

> 「轻流程 5 分钟 ¥0·重流程 80 分钟烧 ¥5·我倾向轻·你拍。」

而不是默默走重流程·烧光你的 token + credits·然后跟你说「我已经派 4 个 agent 跑全流程闭环了」。

---

## 为啥要这玩意（真实事故）

**2026-05-22 下午 5 点**·我跟我的 AI 助手说：「这篇内容直接发布。」

接下来 80 分钟·AI 自动升级了 4 次：
- 「直接放公众号」→ AI 默认推到草稿箱（多消耗 5 万 token）
- 「积分多」→ AI 默认全部走付费生图 API（多烧 credits）
- 「一次性派子 agent」→ AI 默认派 4 个子 agent（翻 4 倍）
- 隐含「全流程闭环」→ AI 自我升级到 max effort（吃光对话上下文）

80 分钟后·我问：「卡在什么地方了 这么慢」
AI 说：「token 不够了·要不要再派 agent？」

**应该是 5 分钟纯文字交付完事。**

事后第二个 AI 接手诊断·一句话精准定位：
> 「AI 不会反向劝阻你升级·这是元盲区。」

第二天我就让 AI 写了这个 hook·物理拦截 17 个升级触发词。

5 天后·同样的内容发布场景 · **18 分钟交付**·**节省 62 分钟**。

---

## 怎么装（3 步 · 小学生都会）

### 步骤 1·下载 hook

```bash
curl -fsSL https://raw.githubusercontent.com/langliu409-eng/wutuobangai-beyond-cc/main/hooks/anti-reverse-pushback.sh \
  -o ~/.claude/hooks/anti-reverse-pushback.sh
chmod +x ~/.claude/hooks/anti-reverse-pushback.sh
```

### 步骤 2·接入 settings.json

把 `examples/settings.json.example` 里的 hook 段·粘到你的 `~/.claude/settings.json` 的 `hooks` 段。

### 步骤 3·重启 Claude Code

```bash
# 命令行
claude restart
# 或者退出 GUI 重开
```

完事·下次你说「全做」「一次性」「派 agent」时·AI 会自动停下来给你「轻 vs 重」对比。

---

## 怎么用（错误案例 vs 正确案例）

### 错误案例（hook 没装）

```
你：这篇公众号直接放
AI：好的·我派 agent 推草稿箱+生 4 张配图+烧 credits...
（80 分钟后）
你：卡在哪了
AI：token 不够了
```

### 正确案例（hook 装好）

```
你：这篇公众号直接放
AI：🛑 升级触发词命中
   轻流程：纯文交付 5 分钟 ¥0
   重流程：推草稿箱+生 4 张配图 30 分钟 ¥0.32
   我倾向轻·你拍。
你：轻
AI：好·5 分钟出。
（5 分钟后）
AI：完事·公众号文已交付。
```

---

## 不用 Claude Code？也能用（给 Codex / Cursor / 其他 AI 用户）

hook 脚本是给 Claude Code 装的 · 但**方法论谁都能拿走**。

**最简单的用法**：下载整个仓库 → 扔给你的 AI → 让它读完自己适配。

```
你：我下载了一个 GitHub 仓库 叫 wutuobangai-beyond-cc
   你读一下里面所有文件
   然后帮我做一套适配 [你的工具名] 的版本

AI：（读完 8 个文件后自动理解方法论 · 输出适配版）
```

适用场景：

| 你用的工具 | 怎么让 AI 学 |
|-----------|-------------|
| **Codex CLI** | 把仓库文件夹拖进项目 · 对话里说「读 wutuobangai-beyond-cc 目录 帮我适配」 |
| **Cursor** | 打开仓库文件夹 · @codebase 说「学习这套反向劝阻方法论 帮我写 Cursor rules」 |
| **ChatGPT / 其他** | 把 trigger-words.md + SOP 两个文件内容贴进对话 · 说「按这个思路帮我写提示词」 |

核心就一句话：**让 AI 先问你「轻还是重」再干活** · 不管用啥工具 · 这个道理通用。

---

## 长期愿景

慢慢把整套「30 岁普通人用 AI 跑公司」的方法论开源。

这是第 1 个 hook · 后面还有：
- 4 agent 端到端 + 5 件硬指标的 playbook
- verifier 独立核实的 prompt 模板
- 派 agent 8 件套白名单
- Memory 4 件套分类沉淀
- 竞品对标 4 层挖法（已上线 → `docs/competitor-recon-method.md`）

慢慢来·不抢热点·不装专家·只交付能复制的真东西。

---

## 致谢

感谢 Anthropic 做出 Claude Code·感谢 coordinator mode 启发我们思考「能做就别派 agent」。
我们把这个原则·从「文档建议」做成了「物理 hook」。

---

# English Version

## Why "BEYOND"?

Not bragging — just 5 methodologies we landed before Anthropic's official ship.
Each has timestamps + real incidents + physical hooks you can verify.

| # | Methodology | Our Ship | Anthropic Ship | Relationship |
|---|-------------|----------|----------------|--------------|
| 1 | 4-agent end-to-end + 5 hard metrics (A dev / B deploy / C test / V verify) | 2026-04-26 | 2026-05-06 Multiagent Orchestration | **We shipped 10 days earlier** |
| 2 | Independent verifier (main thread ≠ verifier · prevents agent self-report fraud) | 2026-04-26 | 2026-05-06 Outcomes model | **We shipped 10 days earlier** |
| 3 | Memory 4-pack (user / feedback / project / reference) | 2026-04-27 | 2026-05-06 Dreaming mode | **We shipped 9 days earlier** |
| 4 | Stage-10 Reverse Pushback (AI proactively offers "light vs heavy" comparison) | 2026-05-22 | 2026-05-06 "Don't dispatch if you can do it" | They proposed principle first · **we built the physical hook** |
| 5 | Agent toolset whitelist 8-pack | 2026-05-20 | 2026-05-06 16 tool whitelist (principle only) | They proposed principle first · **we built deeper SOP + hook** |

**Why can we match or beat official timelines?**
- 3 items we truly shipped before Anthropic (April laws · they shipped May 6)
- 2 items they proposed the principle first · we built the physical implementation

Not because we're smart — because we get **burned by real incidents daily**.
Anthropic looks at million-user patterns · ships "doc suggestions."
We look at one ordinary person getting wrecked every day · ship "hooks that actually block."
**Pain-driven ≠ doc-driven** — that's the ordinary user's edge.

---

## What This Repo Does

**Teach AI to push back when humans escalate.**

When you say "do it all / one-shot / dispatch agents / push to draft" — AI must stop and ask:

> "Light flow: 5 min $0 · Heavy flow: 80 min $5 · I prefer light · your call."

Instead of silently going heavy, burning your tokens + credits, then saying "I've dispatched 4 agents for full pipeline."

---

## Why (Real Incident)

**2026-05-22 5pm** · I told my AI assistant: "Just publish this piece of content."

Next 80 minutes — AI auto-escalated 4 times:
- "Put on account" → AI defaulted to draft box (extra 50K tokens)
- "Plenty of credits" → AI defaulted to paid image gen API (burn credits)
- "One-shot subagent" → AI dispatched 4 subagents (4x bloat)
- Implicit "full pipeline" → AI self-upgraded to max effort (ate context window)

After 80 min I asked: "What's stuck? So slow."
AI: "Token exhausted, dispatch more agents?"

**Should've been 5-minute plain-text delivery.**

A second AI took over diagnosis — one sentence pinpointed:
> "AI doesn't push back when you escalate — this is the meta blind spot."

Next day I had AI write this hook · physically intercepts 17 escalation trigger words.

5 days later · same scenario · **18-minute delivery · saved 62 minutes**.

---

## Install (3 Steps · Anyone Can Do It)

### Step 1 · Download hook

```bash
curl -fsSL https://raw.githubusercontent.com/langliu409-eng/wutuobangai-beyond-cc/main/hooks/anti-reverse-pushback.sh \
  -o ~/.claude/hooks/anti-reverse-pushback.sh
chmod +x ~/.claude/hooks/anti-reverse-pushback.sh
```

### Step 2 · Plug into settings.json

Copy hook block from `examples/settings.json.example` into your `~/.claude/settings.json` `hooks` section.

### Step 3 · Restart Claude Code

Done · next time you say "do it all" / "one-shot" / "dispatch agents" — AI stops with "light vs heavy" comparison.

---

## Not Using Claude Code? Still Works (for Codex / Cursor / Any AI)

The hook script is Claude Code-specific · but **the methodology is universal**.

**Simplest way**: Download this repo → feed it to your AI → let it read and adapt.

```
You: I downloaded a GitHub repo called wutuobangai-beyond-cc
     Read all the files inside
     Then build me an adapted version for [your tool name]

AI: (reads 8 files · understands the methodology · outputs adapted version)
```

| Your Tool | How to Use |
|-----------|-----------|
| **Codex CLI** | Drop repo folder into project · say "read wutuobangai-beyond-cc dir and adapt for me" |
| **Cursor** | Open repo folder · @codebase "learn this reverse-pushback methodology and write Cursor rules" |
| **ChatGPT / Others** | Paste trigger-words.md + SOP content into chat · say "build me a prompt based on this" |

Core idea in one sentence: **Make AI ask "light or heavy?" before doing anything** · works with any tool.

---

## Long-term Vision

Slowly open-source the full "30-year-old ordinary person runs AI company" methodology.

This is hook #1 · more to come:
- 4-agent end-to-end + 5 hard metrics playbook
- Independent verifier prompt template
- Agent dispatch 8-pack whitelist
- Memory 4-pack classification system

Take it slow · no hype · no expert pose · only deliver what you can replicate.

---

## Acknowledgment

Thanks to Anthropic for Claude Code · thanks to coordinator mode for the "don't dispatch if you can do it" principle.
We turned that principle from "doc suggestion" into "physical hook."

---

## License

MIT
