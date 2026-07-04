---
title: Fuck Claude
icon: magnifying-glass
category: 开源项目
author: 阿浩
date: 2026-07-04
---

<!-- 修改记录：2026-07-04 · Codex · 新增 Fuck Claude 项目公开说明。 -->

# Fuck Claude：你的开发工具到底读了什么？

> 一个在浏览器本地运行的环境透明度扫描工具。

[立即体验](https://fuckclaude.wutuobangai.com) · [GitHub 源码](https://github.com/wutuobangai/fuck-claude)

## 它能做什么

点击开始后，页面会真实读取六类浏览器可见信号：

1. `Intl.DateTimeFormat` 返回的系统时区；
2. `navigator.languages` 暴露的浏览器语言顺序；
3. Canvas 宽度差异能够探测到的常见中文字体；
4. 日期、数字和货币格式使用的 Intl Locale；
5. 浏览器返回的时区偏移；
6. 用户代理和平台暴露出的渲染环境特征。

扫描过程有逐项动画、声音反馈、五种角色状态和手机端专门布局。全局完成人数采用随机浏览器 ID 的单向哈希去重，不保存原始扫描结果。

## 它不能证明什么

网页读不到 Claude、GPT 或其他平台服务端的真实风控规则，因此这个分数不是官方封号概率，也不是账号安全承诺。它只把网页本来就能看到的环境信息透明地摆出来，方便开发者理解浏览器暴露面。

## 隐私边界

- 六项扫描全部在本地浏览器完成；
- 不使用 Google Analytics、追踪像素或外部字体；
- 计数接口只接收随机 UUID，服务端立即转成 SHA-256 哈希；
- 不提供修改环境、伪造身份或绕过平台限制的操作教程。

## 技术栈

- Astro 7 静态页面；
- TypeScript 扫描与动画逻辑；
- Web Audio 本地音效；
- Vercel Functions + Upstash Redis 完成人数计数；
- 中英文双语和响应式手机布局。

## 来源与授权

该商业改造版基于 `LinXiaoTao/FuckClaude`。原作者已授权阿浩使用源码和角色素材进行商业改造；公开仓库保留来源与改造记录。角色素材的再次授权以原作者授权范围为准。
