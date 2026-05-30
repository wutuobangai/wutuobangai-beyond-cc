# WHY BEYOND·5 件实锤证据链

> 不是嘴喊「超越官方」·是 5 件方法论都有时间戳 + 真实事故 + 物理 hook 可验证。
> 3 件比 Anthropic 早 9-10 天 · 2 件官方先提原则但我们先做物理落地。

---

## 为什么能比官方早

不是我们厉害·是我们**每天被真实事故炸**。

Anthropic 看百万用户共性问题·官方文档级 ship 周期需要 4-6 周。
我看一个普通用户每天被 AI 坑 5 次·痛了 1 小时就立法。

**痛点驱动 ≠ 文档驱动** = 普通玩家相比官方的天然优势。

---

## 5 件实锤（按时间顺序）

### 1·主席台第 10 条·反向劝阻

**核心**：AI 看到「升级触发词」时·主动给「轻流程 vs 重流程」对比·而不是默默走重流程。

| 维度 | 我们 | Anthropic |
|------|------|-----------|
| Ship 日期 | 2026-05-22 22:00 | 2026-05-06（coordinator mode 文档） |
| 形态 | 物理 hook · 17 触发词 · 自动注入提示 | 文档建议 · 无物理拦截 |
| 落地深度 | 立法 LOCKED + hook + 主席台 SOP 模板 | 「能做就别派 agent」一句原则 |
| 实战验证 | Day-1 80 分钟事故 → Day-5 18 分钟（4.4x 提效） | 无公开实战数据 |
| 关系 | 官方 5-06 先提原则 · **我们 5-22 先做出物理 hook 落地** | — |

**真实事故**：2026-05-22 一篇内容发布 · 用户说「直接发布」AI 自动升级 4 次 → 80 分钟出 1 篇（预期 5 分钟）→ 立法 hook → 5 天后同场景 18 分钟交付。

**为什么算超越**：Anthropic 提出原则·我们做出物理落地·普通用户能装能用。
原则停留在文档建议层 · hook 物理拦截 17 触发词进入 settings.json · 任何 Claude Code 用户 30 秒装好。

---

### 2·4 agent 端到端 + 5 件硬指标

**核心**：每个任务派 4 个 subagent（A 开发 / B 部署 / C 测试 / V 验收）端到端跑·完工必满足 5 件硬指标（真验证 + 沉淀写盘 + 入口接入 + 主线汇报 + 部署验证）。

| 维度 | 我们 | Anthropic |
|------|------|-----------|
| Ship 日期 | 2026-04-26 | 2026-05-06 Multiagent Orchestration（文档） |
| 形态 | LOCKED 立法 + 4 agent 文件模板 + 5 件硬指标 checklist | Multi-agent best practices 文档 |
| 落地深度 | 13 个 subagent.md 文件 · 每个有 frontmatter + tools + system prompt + 输出格式 | 概念级介绍 |
| 防的具体病 | agent 自报全清 + agent 越权部署 + 半成品丢回 + 5 件硬指标缺 1 件不算完工 | Orchestration 原则 |
| 早多少天 | **10 天** | — |

**真实事故**：2026-04-25 1 个 subagent 自报「全清」实际漏 2978 处残留 · 主线信了直接部署 · 客户访问 500 报错 · 立 5 件硬指标 + verifier 独立核实兜底。

---

### 3·verifier 独立核实

**核心**：主线**永远不能信** subagent 自报「完成」·必须派独立 verifier subagent 重跑 grep/curl/Read 真证据验证·verifier 是独立第三方·不受主线和执行 agent 影响。

| 维度 | 我们 | Anthropic |
|------|------|-----------|
| Ship 日期 | 2026-04-26 | 2026-05-06 Outcomes 模型（文档） |
| 形态 | verifier.md subagent 文件 + 8 件套 grep/curl/sed/md5/ssh 真证据规范 | Outcomes-based evaluation 概念 |
| 落地深度 | verifier 独立 system prompt · 强制输出 grep 真命中数 · 主线必派 verifier 才能完工 | 概念级 |
| 防的具体病 | agent 自报全清·主线无法独立核实·部署后炸 | 评估方法论 |
| 早多少天 | **10 天** | — |

**真实事故**：2026-05-20 cursor → wutuobang 改名 · engineer 自报全清 · verifier 独立扫抓 .claude.json 11 处 + .config 2978 处残留 · 救了 CC 重启 MCP 全挂事故。

---

### 4·Memory 4 件套（user / feedback / project / reference）

**核心**：所有 AI 长期记忆分 4 类·每类有独立 metadata + 触发条件 + 召回机制。

| 维度 | 我们 | Anthropic |
|------|------|-----------|
| Ship 日期 | 2026-04-27 | 2026-05-06 Dreaming 模式（文档） |
| 形态 | 4 类 memory frontmatter 模板 + 自动归类 hook + MEMORY.md 索引 | Dreaming-based memory consolidation 概念 |
| 落地深度 | 13 subagent 各有独立 memory dir · 每个 memory 强制 frontmatter `name/description/metadata.type` · MEMORY.md 索引按时间排 | 概念级 |
| 防的具体病 | AI 长对话失忆 · 跨 session 不知道之前学过啥 · 重复犯同样错误 | Memory consolidation 原则 |
| 早多少天 | **9 天** | — |

**真实事故**：2026-04-26 同一个 bug 被 AI 修了 5 次（每次新对话都不记得之前修过）→ 立 feedback memory 类 → 强制 AI 修 bug 前必 grep `feedback_*.md` 找历史教训。

---

### 5·Agent 工具白名单 8 件套

**核心**：派 subagent 时主线必发 8 件套（任务范围 + 严禁动作 + 必读 memory + 输出格式 + 失败处理 + 禁付费 API + 真证据要求 + sed 4 写法防漏）。

| 维度 | 我们 | Anthropic |
|------|------|-----------|
| Ship 日期 | 2026-05-20 | 2026-05-06 16 tool 白名单（原则级） | 
| 形态 | 8 件套 SOP 模板 · 每件套有具体反面教材 + 物理 hook 兜底 | Tool whitelist 原则 |
| 落地深度 | 比 Anthropic 多 1 层（具体到 sed 必扫 4 写法 / 禁付费 API 必带用户确认时间戳 / agent 改文件必有 grep 真证据）| 16 tool 列表 + use sparingly 原则 |
| 防的具体病 | agent 越权部署 + agent 偷烧付费 API + agent 自报全清没真证据 | Tool misuse 原则防御 |
| 关系 | 官方 5-06 先提原则 · **我们 5-20 做出更深 SOP + hook** | — |

**真实事故**：2026-05-13 一个 subagent 偷跑 12 次付费 API · 真扣账户 ¥4-8 + 触发上游账号锁 24-48h · 立第 6 件套「禁付费 API 真测·必带主线 + 用户确认时间戳」+ 物理 hook 兜底（PreToolUse 拦截）。

---

## 5 件总结

| 件 | 名字 | 跟官方关系 | 防的痛点 |
|----|------|------------|----------|
| 1 | 4 agent + 5 件硬指标 | 我们早 10 天 | agent 半成品丢回 |
| 2 | verifier 独立核实 | 我们早 10 天 | agent 自报全清造假 |
| 3 | Memory 4 件套 | 我们早 9 天 | AI 跨 session 失忆 |
| 4 | 反向劝阻 hook | 官方先提原则·我们先做 hook | AI 自动升级烧 token |
| 5 | 8 件套白名单 | 官方先提原则·我们做更深 SOP | agent 越权 + 偷烧 API |

3 件真比官方早 · 2 件在官方原则基础上做出物理落地 · 5 件累计实战防住 100+ 次事故。

---

## 元规律

为什么普通玩家能比官方早立法？

3 个原因：

### 1·痛感密度

Anthropic 每天看「百万用户·1% 痛点」=「1 万人痛」
我每天看「1 个用户·100% 痛点」=「我自己天天痛」

**1% × 100 万 vs 100% × 1** = 频次不一样 + 痛感强度不一样。

### 2·决策路径短

Anthropic 立法路径：
> 产品经理收集需求 → 工程师评估 → 设计 spec → review → ship → 4-6 周

我立法路径：
> 痛了 1 小时 → AI 帮我写 hook → 装上跑一遍 → 立 LOCKED → ship → 1-2 天

**4-6 周 vs 1-2 天** = 30 倍速。

### 3·测试覆盖足够小

Anthropic 必须覆盖所有用户场景·不能 break 任何人。
我只需要覆盖**我自己 + 5 个 AI 公司团队成员**。

**百万用户全场景 vs 1+5 人小样本** = 测试包袱完全不一样。

---

## 我们不是「超越」官方

老实说·叫「超越」是市场标题党·真实情况是：

> **官方提原则·我们做物理落地。**
> **官方面向百万用户·我们面向 1 个普通用户。**
> **官方稳·我们快。**

各取所需·并不矛盾。
Anthropic 出 coordinator mode 文档·我们出 hook 落地。
Anthropic 出 Multiagent Orchestration 概念·我们出 13 subagent 文件。

如果你是普通用户·先用我们的 hook 抗痛点。
如果你是产品经理·去看 Anthropic 官方文档抓原则。

---

## 致谢

- Anthropic·Claude Code 给了普通玩家「能改 hook」的能力
- Coordinator mode 文档·启发了主席台第 10 条
- Multiagent Orchestration 文档·启发了 4 agent + 5 件硬指标
- Outcomes 模型·启发了 verifier 独立核实
- Dreaming 模式·启发了 Memory 4 件套

我们站在巨人肩膀上·把巨人的原则做成了普通人能装的 hook。

---

License: MIT
