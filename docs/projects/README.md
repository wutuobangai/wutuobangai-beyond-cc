---
title: 开源项目
icon: code
category: 开源项目
author: 阿浩
date: 2026-07-04
---

# 开源项目

> 作者：阿浩 · 2026-11-26 更新 · 体验入口与源码分开列。

这里放我做出来的开源项目。有网页演示的给体验入口，本地脚本给源码入口；能做什么、还没验什么，分别说明。

## Fuck Claude

浏览器环境透明度扫描工具。它会在本地逐项读取网页本来就能看到的区域信号，并用动画展示系统时区、浏览器语言、可探测字体、Intl Locale、时区偏移和平台渲染风格。

- [打开线上演示](https://fuckclaude.wutuobangai.com)
- [查看项目介绍](/projects/fuck-claude.html)
- [查看 GitHub 源码](https://github.com/wutuobangai/fuck-claude)

> 它不是 Claude 官方判定器，也不会上传扫描结果；分数只表示当前网页能观察到多少区域环境信息。


## AI 垃圾体检（ai-junk-check）

用 AI 做视频、写代码、跑模型，系统盘容易被过程文件塞满。这个小工具把常见的位置扫一遍，告诉你缓存、模型、旧会话、渲染帧各占了多少，还能生成一张不带路径的体检卡。**它只检查，不删除、不移动你的任何文件。**

- [查看 GitHub 仓库：ai-junk-check](https://github.com/wutuobangai/ai-junk-check)
- [先看怎么分成品、工程和过程文件](/cases/ai-video-disk-management.html)

只用 Python 自带的库，不联网。报告里有本机路径，别直接发给别人；体检卡上不带路径，分享前自己也先看一眼。

Mac 上扫描验过；Windows 是之前的版本验过扫描；Linux 没实测。公开的这一版不带清理功能：清理那部分的保护还没补完，补好再放出来。清不清、怎么清，看完报告你自己定。

## Claude Code 收尾提醒（claude-code-reminder-hooks）

有时方案还在讨论，AI 已经改了文件；有时想法聊完，待办却没记。规则和记忆文件越写越长，也容易忘了整理。这套小脚本围绕这三件事给提醒。

- [查看 GitHub 仓库：claude-code-reminder-hooks](https://github.com/wutuobangai/claude-code-reminder-hooks)
- [讨论时别抢跑施工](/methodology/discuss-is-not-execute.html)
- [一页固定要求怎么写](/methodology/one-rulebook-two-ais.html#一页固定要求-当前进度另查)

它们针对 Claude Code 的事件格式设计，只需要 Bash 和 Python 3.8 以上，安装条件看仓库说明；不因为原理相近就宣称能原样装进其他 AI 工具。

讨论与待办的检查发生在 Stop 收尾阶段，不能撤销已经做过的工具动作；行数、字符数提醒也不保证模型完整读取。它们可能漏判、误判，是帮你回头检查的提醒，不能当成事前授权防火墙，也不会自动替你整理文件。

工具问题请在对应仓库提 Issue；其他到 [会员站](https://wutuobangai.top) 的微信入口找服务台或阿浩。
