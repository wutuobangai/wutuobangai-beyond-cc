---
title: supabase functions deploy 传了旧代码？先核它认的目录
category: 经验教训
author: 阿浩
date: 2026-11-26
---

# supabase functions deploy 传了旧代码？先核它认的目录

> 作者：阿浩 · 2026-11-26

代码明明改好了，部署也显示成功，线上却像没改过。先别急着再发一次。你得先确认：刚才传上去的，究竟是哪份文件？

我遇到过一次多层目录里的误传。编辑的是新副本，命令却用了上层项目里的旧函数。下面用虚构的 `demo-note` 说明位置关系，不涉及真实业务。

## 同名函数有两份，终端在新目录也不够

```text
sample-app/
  supabase/
    config.toml
    functions/demo-note/index.ts      ← 旧副本
  drafts/
    next-version/
      supabase/functions/demo-note/index.ts  ← 正在改的副本
```

在 `next-version` 里敲命令，不等于工具就认这里是项目根。事故记录显示，当时 CLI 找到了上层配置，使用了旧副本。`--project-ref` 选的是远端项目，不能替你确认本地源码位置。

**版本边界要说清。** 当次事故没留下 CLI 版本号，不能补猜。本文在 2026-11-26 用本机 **Supabase CLI 2.90.0** 核过 `--version`、`functions deploy --help`、`functions download --help`，没有执行远端部署或下载，也没有在这个版本上复现误传。

[当前官方全局参数说明](https://supabase.com/docs/reference/cli/introduction#global-flags)写明：不指定工作目录时会从当前目录向上查找；显式 `--workdir` 指向包含 `supabase/` 的目录。这个当前文档行为，不倒推成所有历史版本都一样。官方也有 [CLI v3 变更说明](https://supabase.com/changelog/supabase-cli-v3)，跨大版本先看自己的帮助输出。

## 先把三件事对齐

部署前，让 AI 列出：项目根目录、目标项目标识、实际入口文件。三者缺一个，就没法判断要发的是什么。

常见布局是 `supabase/functions/<函数名>/index.ts`；如果配置了自定义 `entrypoint`，还要沿配置去找。[官方函数配置文档](https://supabase.com/docs/guides/functions/function-configuration)介绍了入口配置，不能只凭同名文件猜。

下面是 **CLI 2.90.0 帮助中存在的命令形式**。占位符需要换成你自己的已确认对象；部署会改远端，获得授权后才运行：

```sh
supabase --version
supabase functions deploy --help
supabase functions download --help
# 已核项目、入口、差异、备份，并获准发布后：
supabase functions deploy demo-note \
  --workdir /path/to/sample-app \
  --project-ref YOUR_PROJECT_REF
```

`--workdir` 写项目根，不写函数目录。也别默认它能替你检查业务对不对；它只是把工作位置写明确。

## 想拿线上版本比对，下载到另一处

别把下载命令直接指向唯一的工作副本。它会把远端函数源码写到本地，现有未提交内容可能受影响。先保存当前改动，再准备独立的比对目录，确认它的项目结构和配置。

下载用 `functions download demo-note --project-ref YOUR_PROJECT_REF --workdir /path/to/compare-app`。此处只是命令示意，实际参数仍以安装版本的帮助为准。比对目录里不要先放自己的唯一新稿。

发完也不能只看“成功”。在另一处回读远端源码，核本次入口和关联文件，再走实际功能。如果打包或回读形式不同，就解释差异、核具体内容，不能硬说文件指纹一定相等。

## 可以复制给 AI 的部署前检查单

```text
先只读，不部署：
CLI 完整版本与命令帮助：____
显式工作目录：____（其中 supabase/ 的位置____）
远端目标项目：____（不写密钥）
函数名与实际 entrypoint：____
是否还有同名旧副本：____
本次改动、基线与可恢复备份：____
哪些动作已获准：____
发布后的源码回读位置、功能验法：____
未知项先写未知，不用再部署一次来猜。
```

继续排查“改好了却没生效”，可以接着看[先核同步链的案例](/cases/check-sync-chain-first.html)。
