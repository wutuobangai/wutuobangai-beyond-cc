---
title: CLI 安装与登录（命令篇）
icon: terminal
order: 1
---

# CLI 安装与登录（命令篇）

::: tip 官方核实
本文所有安装命令来自 Anthropic 与 OpenAI 官方文档，核实日期 **2026-06-01**。AI 工具更新快，命令若对不上，以 [claude.com](https://claude.com) 和 [chatgpt.com](https://chatgpt.com) 官方为准。
:::

> 这篇结束，你会：知道 CLI 到底是个啥，把 Claude Code 和 Codex 的命令行版本都装上、登录进去，确认它们真的能用。照着粘命令就行，不用懂代码。

## 先说清：CLI 是啥，跟前两篇啥区别

CLI 就是「在终端里用」的意思。终端就是那个黑乎乎、能打字的窗口（Mac 叫「终端」，Windows 叫「PowerShell」）。

为啥要在这种地方用？因为 **CLI 是这两个工具最强、最自由的入口**。你可以让它读你电脑里的文件、改东西、跑任务，能干的活最多。

跟前面那两篇的区别：

- 「[装 Claude Code](/start/install-claude-code.html)」「装 Codex」那两篇，是给纯小白看的**总览**——讲清这工具是啥、能干嘛、怎么先跑起来。
- **这一篇，专门盯着 CLI 这个入口本身**：怎么装、怎么登录、登录里那些容易卡的细节。如果你已经看过那两篇、想把命令行这条路彻底搞通，看这篇就对了。

两个工具我都讲，你想装哪个装哪个，全装上也行。

## 装 Claude Code 的命令行版

### Mac / Linux（一行搞定，最省事）

打开终端（`Command + 空格`，输 `Terminal`，回车），把下面这行**整条复制**粘进去，回车：

```bash
curl -fsSL https://claude.com/install.sh | bash
```

这个方式**不用先装 Node.js**，是官方推荐的原生装法，最适合新手。

### Windows

开始菜单搜「PowerShell」点开，粘这行，回车：

```powershell
irm https://claude.com/install.ps1 | iex
```

### 已经会用 npm 的（备选）

电脑里装过 Node.js（18 以上版本）的话，也能用这条：

```bash
npm install -g @anthropic-ai/claude-code
```

没装过 Node.js 就别管这条，用上面 Mac/Windows 的一行命令更省心。

## 装 Codex 的命令行版

### Mac / Linux

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

### Windows

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

### Mac 上还有两个备选

用过 Homebrew 的，可以：

```bash
brew install --cask codex
```

装过 Node.js 的，可以：

```bash
npm install -g @openai/codex
```

挑一个能跑通的就行，不用全试。

## 装完怎么启动

两个工具的启动命令都特别短，就一个词。

启动 Claude Code，终端里输：

```bash
claude
```

启动 Codex，终端里输：

```bash
codex
```

回车，能进去（屏幕变成工具的界面、等你打字），就说明装对了。

## 怎么登录

**第一次启动它会让你登录，跟着提示走就行，下面说下两个的差别。**

### Claude Code：用账号授权（OAuth）

输 `claude` 之后，它会自动跳出浏览器，让你用 Claude 账号点一下「授权」。点完回到终端，就登上了。

- 有 Claude Pro / Max 订阅的，直接登，按月付费随便用，最划算。
- 想按量付费的，用 Claude 的 API（预充值，用多少扣多少）。

### Codex：用 ChatGPT 账号登

输 `codex` 之后，选 **「Sign in with ChatGPT」**（用 ChatGPT 账号登录），它会带你去浏览器确认一下，确认完就回来了。

> 一句话：Claude 这边认 Claude 账号，Codex 这边认 ChatGPT 账号。你有哪个账号就登哪个。

## 怎么确认真的装好了

不用搞复杂的检查，**能启动进去就等于装好了**：

1. 终端输 `claude`（或 `codex`），回车。
2. 看到它的界面出来、光标在等你打字，就成了。
3. 随便问它一句「你好」，它能回你话，说明登录也通了。

## 新手最容易卡的地方（我当年都栽过）

1. **输 `claude` / `codex` 提示「command not found」** → 装是装上了，但当前这个窗口没刷新。**把终端关掉、重新开一个**，再输一遍就好了。
2. **粘命令进去没反应** → 八成是漏按了回车；要么就是网没连上，换个网再试。
3. **登录页打不开 / 一直转圈** → 网络问题。先确认你能正常打开对应官网（Claude 官网 / ChatGPT 官网），能打开就能登。
4. **分不清该登哪个账号** → 记住：装的是 Claude Code 就用 Claude 账号，装的是 Codex 就用 ChatGPT 账号，别混。

## 下一步

- 想贴着文件、在编辑器里改东西 → [在 VS Code 里用](/start/vscode.html)
- 直接上手干第一个活 → [跑通你的第一个任务](/start/first-task.html)
- 想先搞清要花多少钱 → [订阅与付费](/start/subscribe-and-pay.html)

---

*想直接用更省事的 AI → [AIGC 站按积分用](https://wutuobangai.com)；想系统学 → [16 周陪跑课程](https://forms.wutuobangai.com)。*
