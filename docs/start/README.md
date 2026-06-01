---
title: 零基础上手
icon: rocket
index: false
---

# 零基础上手：不懂代码，也能装上 Claude Code / Codex

> 这一栏是给**完全不懂代码的普通人**写的。不堆术语、不假设你会命令行——从"在哪下载"开始，手把手带你把 Claude Code 和 Codex 装上、跑起来、用进日常。

::: tip 我们对你负责：内容会跟着官方更新
AI 工具更新极快。本栏每篇安装教程都标注**「官方核实日期」**——步骤跟着官方最新走，绝不让你照着过时的教程瞎折腾。这是我们和别的教程最大的不一样：**真实、不糊弄。**
:::

## 先建立一个全局理解

Claude Code（Anthropic 出的）和 Codex（OpenAI 出的），本质是**同一种东西**：一个住进你电脑里、能自己读文件 / 改东西 / 跑命令的 **AI 干活搭子**。

它们都不止一个「入口」——你可以在终端用、在桌面 App 用、在 VS Code 里用、也能在网页 / 云端用。**先看懂每个入口干嘛的，再挑你顺手的那个开始。**

<section style="background:#1c1917;border-radius:16px;padding:30px 26px;margin:26px 0;color:#e7e5e4">
  <div style="font-size:20px;font-weight:600;color:#fff;margin-bottom:6px">Claude Code / Codex 入口地图</div>
  <div style="font-size:13.5px;color:#a8a29e;margin-bottom:22px">同一个 AI 搭子，5 个入口，挑顺手的开始。</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px">
    <div style="background:#292524;border:1px solid #44403c;border-radius:12px;padding:16px 18px">
      <div style="font-size:15px;font-weight:600;color:#fff">终端 CLI</div>
      <div style="font-size:12.5px;color:#a8a29e;margin-top:5px">装进电脑终端里 · 最强最自由 · 本栏主推</div>
    </div>
    <div style="background:#292524;border:1px solid #44403c;border-radius:12px;padding:16px 18px">
      <div style="font-size:15px;font-weight:600;color:#fff">桌面 App</div>
      <div style="font-size:12.5px;color:#a8a29e;margin-top:5px">图形界面 · 点点点 · 对小白最友好</div>
    </div>
    <div style="background:#292524;border:1px solid #44403c;border-radius:12px;padding:16px 18px">
      <div style="font-size:15px;font-weight:600;color:#fff">IDE 插件</div>
      <div style="font-size:12.5px;color:#a8a29e;margin-top:5px">装进 VS Code · 贴着代码用</div>
    </div>
    <div style="background:#292524;border:1px solid #44403c;border-radius:12px;padding:16px 18px">
      <div style="font-size:15px;font-weight:600;color:#fff">网页 / 云端</div>
      <div style="font-size:12.5px;color:#a8a29e;margin-top:5px">浏览器里用 · 免安装 · 跑长任务</div>
    </div>
    <div style="background:#292524;border:1px solid #44403c;border-radius:12px;padding:16px 18px">
      <div style="font-size:15px;font-weight:600;color:#fff">集成生态</div>
      <div style="font-size:12.5px;color:#a8a29e;margin-top:5px">MCP · 各平台 · 把它接进你的工具</div>
    </div>
  </div>
</section>

## 怎么走？我把整条路做成了一张「闯关地图」

不懂代码的人最怕的，不是难，是**"不知道下一步该干嘛"**。

所以我没给你列一堆章节，而是把这条路拆成了 **6 关 + 1 个补给站**——从"把它装进电脑"，到"它开始懂你"。**每过一关，你就实打实多会一样东西。** 照着闯，别跳级，下面就是这张地图 👇

## 新手推荐路径

1. **先别纠结选哪个**：Claude Code 和 Codex 任选一个开始，底层功夫是相通的，换工具不用重学。
2. **从能跑起来的入口下手**：怕命令行 → 先用桌面 App / 网页；想要最强 → 直接上终端 CLI（本栏手把手带）。
3. **第一天就让它帮你干一件真事**：别光看教程，挑一个你手头真实的小活，让它做完——这一下你就懂了。
4. **跑顺了再立规矩**：写 CLAUDE.md / AGENTS.md，让它记住你是谁。

## 不懂代码？这一栏就是为你写的

市面上教 Claude Code / Codex 的，几乎都是程序员写给程序员看的——满屏术语，普通人第一步就劝退。

**我自己就是 30 岁、完全不懂代码的普通人**，硬是从"连终端是啥都不知道"，一路装到一群 AI 给我干活。这一栏，是我把自己当年踩过的每一个坑、卡住的每一步，**翻译成你能听懂的大白话**重写一遍。

- ✅ 每一步都讲清**在哪点、输什么**，照着做就行
- ✅ 每个卡点都标**真实踩坑**（我当年就栽这儿）
- ✅ 不藏私、不卖关子、全免费

## 🗺️ 闯关地图

<div style="margin:24px 0">

<div style="background:#fff;border:1px solid #ece7df;border-left:4px solid #16a34a;border-radius:12px;padding:16px 20px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.04)">
  <div style="font-size:15.5px;font-weight:700;color:#1c1917;margin-bottom:3px">🏁 新手村 · 出发前看一眼</div>
  <div style="font-size:12.5px;color:#a8a29e;margin-bottom:11px">先搞懂 Claude Code / Codex 到底是个啥、有几个入口——心里有数，再上路。</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <a href="/start/" style="font-size:13px;color:#16a34a;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:5px 11px;text-decoration:none">本页就是 · 往下看 ↓</a>
  </div>
</div>

<div style="background:#fff;border:1px solid #ece7df;border-left:4px solid #4F46E5;border-radius:12px;padding:16px 20px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.04)">
  <div style="font-size:15.5px;font-weight:700;color:#1c1917;margin-bottom:3px">🎮 第 1 关 · 把家伙装进电脑</div>
  <div style="font-size:12.5px;color:#a8a29e;margin-bottom:11px">通关后你会：在自己电脑里，把 AI 干活搭子真正跑起来。</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <a href="/start/install-claude-code.html" style="font-size:13px;color:#4F46E5;background:#f4f3ff;border:1px solid #e0ddff;border-radius:8px;padding:5px 11px;text-decoration:none">装 Claude Code →</a>
    <a href="/start/install-codex.html" style="font-size:13px;color:#4F46E5;background:#f4f3ff;border:1px solid #e0ddff;border-radius:8px;padding:5px 11px;text-decoration:none">装 Codex →</a>
  </div>
</div>

<div style="background:#fff;border:1px solid #ece7df;border-left:4px solid #4F46E5;border-radius:12px;padding:16px 20px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.04)">
  <div style="font-size:15.5px;font-weight:700;color:#1c1917;margin-bottom:3px">🎫 第 2 关 · 办通行证</div>
  <div style="font-size:12.5px;color:#a8a29e;margin-bottom:11px">通关后你会：账号登上、清楚要花哪些钱，从此能正经用了。</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <a href="/start/subscribe-and-pay.html" style="font-size:13px;color:#4F46E5;background:#f4f3ff;border:1px solid #e0ddff;border-radius:8px;padding:5px 11px;text-decoration:none">订阅与付费 →</a>
    <a href="/start/cli-login.html" style="font-size:13px;color:#4F46E5;background:#f4f3ff;border:1px solid #e0ddff;border-radius:8px;padding:5px 11px;text-decoration:none">CLI 安装与登录 →</a>
  </div>
</div>

<div style="background:#fff;border:1px solid #ece7df;border-left:4px solid #4F46E5;border-radius:12px;padding:16px 20px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.04)">
  <div style="font-size:15.5px;font-weight:700;color:#1c1917;margin-bottom:3px">⚡ 第 3 关 · 第一次使唤它</div>
  <div style="font-size:12.5px;color:#a8a29e;margin-bottom:11px">通关后你会：让它真帮你干成一件事——"卧槽它真能干活"的那一下。</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <a href="/start/first-task.html" style="font-size:13px;color:#4F46E5;background:#f4f3ff;border:1px solid #e0ddff;border-radius:8px;padding:5px 11px;text-decoration:none">跑通第一个任务 →</a>
    <a href="/start/let-it-edit.html" style="font-size:13px;color:#4F46E5;background:#f4f3ff;border:1px solid #e0ddff;border-radius:8px;padding:5px 11px;text-decoration:none">让它帮你改东西 →</a>
  </div>
</div>

<div style="background:#fff;border:1px solid #ece7df;border-left:4px solid #4F46E5;border-radius:12px;padding:16px 20px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.04)">
  <div style="font-size:15.5px;font-weight:700;color:#1c1917;margin-bottom:3px">🛡️ 第 4 关 · 踩住刹车</div>
  <div style="font-size:12.5px;color:#a8a29e;margin-bottom:11px">通关后你会：它能改你的文件，但你随时撤得回、拦得住——心里不慌。</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <a href="/start/permissions-safety.html" style="font-size:13px;color:#4F46E5;background:#f4f3ff;border:1px solid #e0ddff;border-radius:8px;padding:5px 11px;text-decoration:none">权限与安全 →</a>
  </div>
</div>

<div style="background:#fff;border:1px solid #ece7df;border-left:4px solid #4F46E5;border-radius:12px;padding:16px 20px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.04)">
  <div style="font-size:15.5px;font-weight:700;color:#1c1917;margin-bottom:3px">📜 第 5 关 · 给它立规矩</div>
  <div style="font-size:12.5px;color:#a8a29e;margin-bottom:11px">通关后你会：写一份"我是谁、我的规矩"给它，它越用越懂你。</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <a href="/start/memory-rules.html" style="font-size:13px;color:#4F46E5;background:#f4f3ff;border:1px solid #e0ddff;border-radius:8px;padding:5px 11px;text-decoration:none">写第一份 CLAUDE.md / AGENTS.md →</a>
  </div>
</div>

<div style="background:#fff;border:1px solid #ece7df;border-left:4px solid #4F46E5;border-radius:12px;padding:16px 20px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,.04)">
  <div style="font-size:15.5px;font-weight:700;color:#1c1917;margin-bottom:3px">🧰 第 6 关 · 配齐装备</div>
  <div style="font-size:12.5px;color:#a8a29e;margin-bottom:11px">通关后你会：给它接上更多能力——贴着文件干活、装上各种工具。</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <a href="/start/vscode.html" style="font-size:13px;color:#4F46E5;background:#f4f3ff;border:1px solid #e0ddff;border-radius:8px;padding:5px 11px;text-decoration:none">在 VS Code 里用 →</a>
    <a href="/start/mcp-skills.html" style="font-size:13px;color:#4F46E5;background:#f4f3ff;border:1px solid #e0ddff;border-radius:8px;padding:5px 11px;text-decoration:none">MCP 与技能 →</a>
  </div>
</div>

<div style="background:#fffbeb;border:1px solid #fde68a;border-left:4px solid #d97706;border-radius:12px;padding:16px 20px;margin-bottom:12px">
  <div style="font-size:15.5px;font-weight:700;color:#1c1917;margin-bottom:3px">🆘 补给站 · 卡住了随时回来</div>
  <div style="font-size:12.5px;color:#a8a29e;margin-bottom:11px">任何一关卡住、报错、跑不动——别硬扛，回这儿自救。</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <a href="/start/troubleshooting.html" style="font-size:13px;color:#d97706;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:5px 11px;text-decoration:none">排障手册 →</a>
  </div>
</div>

</div>

> 🏆 **闯到最后**：这 6 关走完，你就从"会用 AI"迈进了「一个人指挥一群 AI」那条更深的路——那是另一段旅程（想深入 → [0→1 之路](/journey/) 和 [一人公司架构](/architecture/)；想有人带着少踩坑 → [16 周陪跑课程](https://forms.wutuobangai.com)）。

---

*装好了，想直接用上更省事的 AI 工具 → [来 AIGC 站按积分用](https://wutuobangai.com)；想有人带着系统学、少踩坑 → [16 周陪跑课程](https://forms.wutuobangai.com)。*
