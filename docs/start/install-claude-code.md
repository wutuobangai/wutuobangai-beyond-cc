---
title: 装 Claude Code（Mac / Windows 手把手）
icon: download
order: 1
---

# 装 Claude Code：Mac / Windows 手把手

::: tip 官方核实
本文安装命令来自 Anthropic 官方文档，核实日期 **2026-06-01**。AI 工具更新快，命令若对不上，以 [claude.com](https://claude.com) 官方为准。
:::

> 这篇结束，你会：在自己电脑上把 Claude Code 跑起来，看到它跟你说第一句话。全程不用你懂代码，照着粘命令就行。

## 装之前，先搞清 3 件事

1. **电脑要求**：Mac（macOS 10.15 以上）或 Windows 10 以上，内存 4GB 以上——现在的电脑基本都够。
2. **要花钱吗**：Claude Code 本身免费下载。但用它干活，要么订阅 Claude（Pro 或 Max），要么用 API 按量付费。具体怎么选、多少钱，看 [订阅与付费](/start/subscribe-and-pay.html) 那篇（价格会变，我们只讲怎么选）。
3. **要能上网**：它要连 Anthropic 的服务器。你能打开这个页面，就没问题。

## Mac 怎么装（一行命令，最省事）

1. 打开「终端」：按 `Command + 空格`，输入 `Terminal`，回车。
2. 把下面这行**整条复制**，粘进终端，按回车：

```bash
curl -fsSL https://claude.com/install.sh | bash
```

3. 等它自己跑完（几十秒，屏幕会刷一堆字，不用管）。

> 这个方式**不用先装 Node.js**，是官方推荐的原生安装，最适合小白。

## Windows 怎么装

1. 开始菜单搜「PowerShell」，点开。
2. 粘这行，回车：

```powershell
irm https://claude.com/install.ps1 | iex
```

3. 等装完。

> Windows 也支持 WSL / Git for Windows 那套，但上面这条 PowerShell 一行最简单，先用这个。

## （备选）已经会用 npm 的

如果你电脑已经装了 Node.js（18 以上版本），也可以用这个：

```bash
npm install -g @anthropic-ai/claude-code
```

没装过 Node.js 就别管这条，用上面 Mac/Windows 的一行命令更省心。

## 装完，怎么打开它

终端（或 PowerShell）里输入这一个词，回车：

```bash
claude
```

第一次打开，它会让你登录——自动跳出浏览器，用你的 Claude 账号点一下「授权」就行。

## 登录用哪个账号

- **有 Claude Pro / Max 订阅** → 直接登，最划算，按月付费随便用。
- **想按量付费** → 用 Claude 的 API（预充值 credits，用多少扣多少）。

新手建议：先开 Pro 试水，顺手了再看要不要升 Max。

## 新手最容易卡的 3 个地方（我当年都栽过）

1. **输 `claude` 提示「command not found」** → 装是装上了，但当前窗口没生效。**把终端关掉、重新开一个**，再输 `claude` 就好了。
2. **粘命令进去没反应** → 检查是不是漏按了回车；或者网络没连上，换个网试。
3. **登录页打不开 / 一直转圈** → 网络问题。确认你能正常打开 Claude 官网，能开就能登。

## 下一步

- 想把另一个也装上 → [装 Codex](/start/install-codex.html)
- 直接上手干活 → [跑通你的第一个任务](/start/first-task.html)
- 想先搞清要花多少钱 → [订阅与付费](/start/subscribe-and-pay.html)

---

*装好了想直接用更省事的 AI → [来 AIGC 站按积分用](https://wutuobangai.com)；想有人带着系统学、少踩坑 → [16 周陪跑课程](https://forms.wutuobangai.com)。*
