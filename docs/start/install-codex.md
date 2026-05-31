---
title: 装 Codex（Mac / Windows 手把手）
icon: download
order: 2
---

# 装 Codex：Mac / Windows 手把手

::: tip 官方核实
本文安装命令来自 OpenAI Codex 官方仓库，核实日期 **2026-06-01**。命令若对不上，以官方 [github.com/openai/codex](https://github.com/openai/codex) 为准。
:::

> Codex 是 OpenAI 出的 AI 编程搭子，跟 Claude Code 是「同类」——都住进你电脑里帮你干活。这篇带你把它装上、跑起来。

## 装之前，先搞清 3 件事

1. **电脑要求**：Mac（苹果芯片和 Intel 都行）、Windows、Linux 都支持。
2. **要花钱吗**：Codex 本身免费装。用它要登录 ChatGPT 账号——有 **ChatGPT Plus / Pro** 这类订阅最方便（也能用 API key，但那个对小白麻烦，先别碰）。
3. **要能上网**：要连 OpenAI 的服务器。

## Mac 怎么装（一行命令）

打开「终端」（`Command + 空格` → 输 `Terminal` → 回车），粘这行回车：

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

> 如果你电脑装过 Homebrew，也可以用：`brew install --cask codex`（没装过 Homebrew 就用上面那条）。

## Windows 怎么装

开始菜单搜「PowerShell」打开，粘这行回车：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

## （备选）会用 npm 的

电脑装过 Node.js 的，也可以：

```bash
npm install -g @openai/codex
```

## 装完，怎么打开它

终端里输入这一个词，回车：

```bash
codex
```

## 第一次登录（推荐最简单的方式）

打开后选 **「Sign in with ChatGPT」**（用 ChatGPT 账号登录）——这是最省事的方式，点一下用你的 ChatGPT 账号授权就行。

- 支持的订阅：ChatGPT **Plus / Pro / Business / Edu / Enterprise**。
- 也能用 API key 登录，但要额外配置，新手先用 ChatGPT 账号那条路。

## 新手最容易卡的地方

1. **输 `codex` 提示找不到命令** → 关掉终端、重开一个再试（装完要新窗口才生效）。
2. **登录卡住** → 确认你能正常打开 ChatGPT 官网，网络通就能登。
3. **不知道选 ChatGPT 还是 API** → 闭眼选「Sign in with ChatGPT」，最简单。

## Claude Code 和 Codex，先学哪个？

**任选一个开始都行**——它俩底层是相通的，学会一个，另一个很快上手。怕选错就先装顺手的那个，跑通 [第一个任务](/start/first-task.html) 再说。

## 下一步

- [跑通你的第一个任务](/start/first-task.html)
- [订阅与付费怎么选](/start/subscribe-and-pay.html)

---

*想直接用更省事的 AI → [来 AIGC 站按积分用](https://wutuobangai.com)；想有人带着系统学 → [16 周陪跑课程](https://forms.wutuobangai.com)。*
