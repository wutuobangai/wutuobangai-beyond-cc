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

## 四步路线（照着走，别跳级）

| 阶段 | 你要达成的 | 大白话 |
|---|---|---|
| ① **装上车** | 装好工具 + 第一次让它说话 | 在你电脑里把它跑起来 |
| ② **跑通第一个任务** | 让它真帮你干成一件事 | 从"会聊"到"会干活" |
| ③ **立规矩** | 写一份"我是谁、我的规矩"给它 | 让它越用越懂你（CLAUDE.md / AGENTS.md）|
| ④ **往上走** | 接工具、配技能、多任务 | 这就跨进「一个人指挥一群 AI」那条路了 |

> 前两步是**人人都该会**的，装好就能用；到第 ③④ 步，你就开始往「一人公司」那条更深的路上走——那是另一段旅程（想深入 → 看 [0→1 之路](/journey/) 和 [一人公司架构](/architecture/)）。

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

## 教程目录

> 跟着这个顺序走：从装上车，到上手干活，到立规矩往上走。一步一步来，不跳级。

**第一步 · 入门准备**
- [装 Claude Code（Mac / Windows 手把手）](/start/install-claude-code.html)
- [装 Codex（Mac / Windows 手把手）](/start/install-codex.html)
- [订阅与付费：到底要花哪些钱](/start/subscribe-and-pay.html)
- [跑通你的第一个任务](/start/first-task.html)

**第二步 · 日常工作流**
- [让它帮你改东西（不慌、能撤回）](/start/let-it-edit.html)
- [权限与安全：哪些该放手、哪些要拦住](/start/permissions-safety.html)

**第三步 · CLI 与 IDE**
- [CLI 安装与登录](/start/cli-login.html)
- [在 VS Code 里用](/start/vscode.html)

**第四步 · 进阶与团队**
- [写你的第一份"规矩"：CLAUDE.md / AGENTS.md](/start/memory-rules.html)
- [给 AI 配"装备"：MCP 与技能](/start/mcp-skills.html)
- [排障手册：卡住了怎么自救](/start/troubleshooting.html)

---

*装好了，想直接用上更省事的 AI 工具 → [来 AIGC 站按积分用](https://wutuobangai.com)；想有人带着系统学、少踩坑 → [16 周陪跑课程](https://forms.wutuobangai.com)。*
