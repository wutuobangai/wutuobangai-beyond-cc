---
title: 开源技能下载
icon: download
category: 开源技能
author: 阿浩
date: 2026-05-31
---

# 开源技能下载

> 作者：阿浩 · 2026-05-31 · 持续更新

> 这一栏不是文章，是**能直接复制走、装上就用的真文件**——hook、配置、清单。开源、免费，拿走不用谢。

我是一个不懂代码的普通人。下面这些，是我一步步调教 AI 的过程里，沉淀出来、自己天天在用的"真家伙"。我把它们脱敏后开源出来——你不用从头踩坑，复制装上就能用。

::: tip 怎么用这一页
每个技能都给了：**它解决什么问题 · 怎么装 · 文件在哪**。全部文件都在 GitHub 开源仓库，点链接就能拿。
:::

---

## 🛡️ 反向劝阻 hook（防 AI 默认烧钱跑重流程）

**解决什么**：AI 有个通病——你说"帮我做这事"，它默认走最长的路：全套、所有可选项、验了再验。一件 5 分钟的小事，能给你跑成 80 分钟、烧一堆钱。

**这个 hook 干什么**：当你说出"升级 / 全做 / 一次性 / 端到端"这类词，它**强制 AI 先停下来反问你**——"轻流程 5 分钟搞定，重流程 30 分钟还要花钱，你要哪个？"，由你拍板，而不是它闷头烧。

**怎么装**（3 步）：

1. 下载 hook 脚本 `anti-reverse-pushback.sh`
2. 在你的 `settings.json` 里挂上这个 hook（参考仓库里的 `settings.json.example`）
3. 按 `trigger-words.md` 配好触发词

**文件在这**：

| 文件 | 作用 |
|---|---|
| `hooks/anti-reverse-pushback.sh` | hook 主脚本 |
| `examples/settings.json.example` | 怎么挂到配置里 |
| `examples/trigger-words.md` | 升级触发词清单 |

👉 **全部在开源仓库**：[github.com/wutuobangai/wutuobangai-beyond-cc](https://github.com/wutuobangai/wutuobangai-beyond-cc)（点 `hooks/` 和 `examples/` 文件夹直接拿）

> 想看这个 hook 背后的故事（我是被一次 80 分钟出 1 篇的事故逼出来的）→ 读 [方法论库 · 反向劝阻 hook](/methodology/reverse-pushback.html)。

---

## 🔜 在路上

我自己天天在用的还有一批，正按批次脱敏开源：

| 技能 | 预计 |
|---|---|
| 防幻觉护栏 hook | 🔜 近期 |
| 主席台调度规则 | 🔜 近期 |
| 竞品对标五层挖法 | 🔜 排队中 |
| 收口沉淀清单 | 🔜 排队中 |

这一页会一直更新。**想优先要哪个？** 来 [GitHub Issues](https://github.com/wutuobangai/wutuobangai-beyond-cc/issues) 提一句，我排前面。

---

*我是个 30 岁不懂代码的普通人，靠这些自己焊出来的小工具，把一家公司交给了一群 AI 在跑。想直接用更省事的 → [来 AIGC 站按积分用](https://wutuobangai.com)；想系统学 → [16 周陪跑课程](https://forms.wutuobangai.com)。*
