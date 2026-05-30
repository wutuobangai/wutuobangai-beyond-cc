---
title: 从这里开始
icon: rocket
---

# 从这里开始

## 这个站是啥

一个 **30 岁不懂代码的普通人**，每天用 Claude Code / Codex 跑一家一人 AI 公司，被真实事故炸出来的方法论合集。

不讲理论，只交付**能复制的真东西**：装上就生效的 hook、照着走的 SOP、可验证的事故复盘。

## 第一个就能用：反向劝阻 hook

你跟 AI 说「全做 / 一次性 / 派 agent」时，AI 经常默默升级成重流程，烧光 token + credits，然后跟你说「我已经派 4 个 agent 跑全流程了」。

这个 hook 让 AI **先停下来问你「轻还是重」**：

> 「轻流程 5 分钟 ¥0 · 重流程 80 分钟烧 ¥5 · 我倾向轻 · 你拍。」

### 3 步装好（小学生都会）

```bash
# 1. 下载 hook
curl -fsSL https://raw.githubusercontent.com/langliu409-eng/wutuobangai-beyond-cc/main/hooks/anti-reverse-pushback.sh \
  -o ~/.claude/hooks/anti-reverse-pushback.sh
chmod +x ~/.claude/hooks/anti-reverse-pushback.sh

# 2. 把 examples/settings.json.example 的 hook 段贴进 ~/.claude/settings.json

# 3. 重启 Claude Code
```

完事，下次说「全做」时 AI 会自动给你「轻 vs 重」对比。

## 不用 Claude Code 也能用

hook 是给 Claude Code 装的，但**方法论谁都能拿走**。最简单的用法：

> 下载整个仓库 → 扔给你的 AI（Codex / Cursor / ChatGPT）→ 让它读完自己适配。

## 三条学习路径

1. **第一次用 AI**：先装上面这个 hook，感受「AI 反问你」是什么体验
2. **想让 AI 别瞎烧钱**：读 [反向劝阻 SOP](/methodology/reverse-pushback.md)
3. **想系统学一人公司方法论**：进 [方法论库](/methodology/)

---

## 想直接用上 AI 不折腾？

- 🚀 [乌托邦AI 工具站](https://wutuobangai.com)：不用翻墙用海外顶级模型，人民币按积分用
- 💬 加微信领免费资料包 + 进交流群（二维码见页脚）
