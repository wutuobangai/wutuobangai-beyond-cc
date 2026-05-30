# SOP·Stage-10 Reverse Pushback Hook（主席台反向劝阻 SOP）

> 中英双语完整文档·30 岁不懂代码的普通人也能装上用起来。

---

## 1·什么是主席台反向劝阻（What Is Stage-10 Reverse Pushback）

**中文一句话**：你说「全做 / 一次性 / 派 agent」时·AI 先停下来反问「轻流程 vs 重流程」对比·而不是默默走重流程烧光 token。

**English one-liner**: When you say "do it all / one-shot / dispatch agents" — AI must STOP and ask "light flow vs heavy flow comparison" — instead of silently going heavy and burning all your tokens.

「主席台」一词来自 Claude Code coordinator mode 启发·指 AI 不是「yes-man 执行者」·而是有判断的「主席台调度官」。

---

## 2·为啥需要这玩意（Why Do We Need This）

### 中文版

AI 有个通病：**默认走最长路径**。

你说「这事帮我做」·AI 听到的不是「做这事」·是「把这事做到极致+全套+所有可选项+verify+再 verify」。

结果就是：
- 5 分钟能干完的事·跑 80 分钟
- ¥0 能搞定的事·烧 ¥5
- 主线 1 个 agent 能解决·派 4 个 subagent 并行

普通用户没法跟 AI 解释「我只要轻流程」·因为他不知道「重流程」长啥样。
所以 hook 反过来·让 AI 主动给「轻 vs 重」对比·让用户拍。

### English Version

AI has a chronic disease: **default to the longest path**.

When you say "help me do this" — AI doesn't hear "do this" — it hears "do this to perfection + full set + all options + verify + verify again."

Result:
- 5-minute work takes 80 minutes
- $0 work burns $5
- Main thread can solve with 1 agent — AI dispatches 4 subagents in parallel

Ordinary users can't tell AI "I only want light flow" — because they don't know what "heavy flow" looks like.
So the hook reverses it — AI proactively offers "light vs heavy" comparison · user picks.

---

## 3·怎么装（How to Install · 3 Steps）

### 步骤 1·下载 hook

```bash
mkdir -p ~/.claude/hooks
curl -fsSL https://raw.githubusercontent.com/langliu409-eng/wutuobangai-beyond-cc/main/hooks/anti-reverse-pushback.sh \
  -o ~/.claude/hooks/anti-reverse-pushback.sh
chmod +x ~/.claude/hooks/anti-reverse-pushback.sh
```

### 步骤 2·接入 settings.json

打开 `~/.claude/settings.json`（没有就建）·把以下内容加到 `hooks.UserPromptSubmit` 数组里：

```json
{
  "hooks": [
    {
      "type": "command",
      "command": "~/.claude/hooks/anti-reverse-pushback.sh"
    }
  ]
}
```

完整示例见 `examples/settings.json.example`。

### 步骤 3·重启 Claude Code

```bash
# 命令行
claude restart

# 或者 GUI 退出重开
```

完事·下次说「全做 / 一次性 / 派 agent」时·AI 自动停下来给「轻 vs 重」对比。

---

## 4·17 升级触发词清单（17 Escalation Triggers）

详见 `examples/trigger-words.md`。

速查：
- 工作流·5 个：`do it all` / `one-shot` / `end-to-end` / `full pipeline` / `full pipeline closed-loop`
- 派活·3 个：`dispatch agent` / `subagent` / `push to draft`
- 烧资源·3 个：`burn credits` / `burn tokens` / `max effort`
- 动作·6 个：`upgrade` / `just publish` / `just post` / `one-click` / `one-click publish` / `auto post`

---

## 5·注入模板（Inject Template）

Hook 命中后·AI 收到以下提示注入：

```
🛑 Escalation trigger detected.
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
```

---

## 6·3 个例外（3 Exceptions · Skip Pushback）

以下场景 AI 直接干·不走反向劝阻：

1. **修真 bug 有真证据**·≤30 行可控·不修用户会发火
2. **用户明说要重流程**·原话「我就是要全套 / 重流程 / 就是要烧」
3. **硬性 LOCKED SOP**·组织有固定流程必须走全套

---

## 7·真实案例（Real-world Cases）

### Case A·公众号交付（5 min vs 80 min · 16x 提效）

| 没装 hook | 装了 hook |
|-----------|-----------|
| 用户：「直接放公众号」 | 用户：「直接放公众号」 |
| AI：派 4 agent 推草稿箱+生 4 张配图+烧 credits（80 分钟） | AI：轻=纯文 5 分钟 ¥0 / 重=配图推草稿箱 30 分钟 ¥0.32·我倾向轻·你拍 |
| 80 分钟后用户怒：「卡在哪了 这么慢」 | 用户：「轻」 / AI：5 分钟完事 |

### Case B·图片生成（HTML vs API · ¥0 vs ¥0.32）

| 没装 hook | 装了 hook |
|-----------|-----------|
| 用户：「一次性生成 4 张配图」 | 用户：「一次性生成 4 张配图」 |
| AI：派 4 agent 并行调付费 API（¥0.32） | AI：轻=HTML 渲染 ¥0 / 重=4 张付费 API ¥0.32·我倾向轻·你拍 |

---

## 8·故障排查（Troubleshooting）

### 问题 1·Hook 没生效·AI 还是默默走重流程

排查：
1. `ls -la ~/.claude/hooks/anti-reverse-pushback.sh`·确认存在 + 可执行
2. `cat ~/.claude/settings.json | jq '.hooks.UserPromptSubmit'`·确认配置正确
3. `claude restart` 后再试
4. 测试触发：发「one-shot test」看 hook 触发情况

### 问题 2·Hook 触发太频繁·烦

设计上每 session 触发 1 次（marker 文件在 `/tmp/cc-reverse-pushback/<session_id>.hit`）。
如果想清掉重新触发：
```bash
rm -rf /tmp/cc-reverse-pushback/
```

### 问题 3·想自定义触发词

编辑 `~/.claude/hooks/anti-reverse-pushback.sh` 第 50 行 `triggers_upgrade` 变量·按 `|` 分隔。

详见 `examples/trigger-words.md` § How to Customize。

---

## 9·升级路线（Roadmap）

- **v1（当前·5-23）**·17 触发词·UserPromptSubmit 注入·单 session 1 次
- **v2（计划中）**·支持组织级触发词字典（团队共享）+ 多语言支持（英文/日文/韩文）
- **v3（计划中）**·集成「重流程预算」概念·AI 自动估算 token + credits 给用户拍

---

## 10·致敬（Acknowledgment）

灵感来自 Anthropic Claude Code coordinator mode：
> Don't dispatch agents if you can do it yourself.

我们把这个**官方文档原则**·做成了**物理 hook 落地**。

`don't dispatch if you can do it` 是被动原则·`reverse pushback` 是主动反问·更适合普通用户。

---

## License

MIT
