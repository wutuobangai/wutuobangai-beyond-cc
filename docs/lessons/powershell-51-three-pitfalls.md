---
title: PowerShell 5.1 跑不动脚本？先查这三个坑
category: 经验教训
author: 阿浩
date: 2026-11-26
---

# PowerShell 5.1 跑不动脚本？先查这三个坑

> 作者：阿浩 · 2026-11-26

脚本在自己电脑上检查通过，发到 Windows 上却连第一步都跑不起来。你让 AI 再查，它还是说语法没问题。这时候，先看两边用的是不是同一版 PowerShell、同一种启动方法。

我遇到过这种事：在 Mac 上用 PowerShell 7 检查没报错，Windows PowerShell 5.1 实际执行时却接连出问题。下面用虚构的文件和配置演示，别拿例子覆盖自己的正式配置。

这次事故记录的环境是 **Windows PowerShell 5.1.19041**。本文在 2026-11-26 对照微软文档核过规则；没有把每个例子在各版 Windows 上重跑，下面是排查办法，不是所有版本的修复保证。

## 第一个坑：引号到了外部程序那里，已经变了

假设你把一段 JavaScript 塞进参数：

```powershell
node -e 'console.log("sample".split("."))'
```

你眼里是完整字符串，外部程序收到的却可能丢了内层双引号。Windows PowerShell 5.1 会先解析参数，再把参数拼成命令行字符串。嵌在里面的引号需要额外处理。[微软的 5.1 参数解析说明](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_parsing?view=powershell-5.1#passing-arguments-that-contain-quote-characters)讲了这个行为。

排查时，查接收端真正拿到了什么，别只看脚本原文。代码稍长，就把它放进虚构的 `sample-check.js`，再运行 `node .\sample-check.js`，少过一层引号转换。外部程序的版本、工作目录仍要核。

[PowerShell 7.3 改过原生命令参数传递](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_parsing?view=powershell-7.5#passing-arguments-that-contain-quote-characters)。所以“PowerShell 7 能跑”不能直接推到 5.1；7 的兼容模式也有差别。

## 第二个坑：看起来都是字典，序列化却报循环引用

另一处错误出在全新安装。旧配置合并能过，没有配置时新建字典，再交给 `JavaScriptSerializer`，却报“检测到循环引用”。

当次排查发现，`New-Object` 创建的对象经过 PowerShell 包装，进入那条序列化链后触发了问题。改用下面的构造方式后，当次路径通过了：

```powershell
$sampleConfig = [System.Collections.Generic.Dictionary[string,object]]::new()
$sampleConfig['label'] = 'demo'
```

这不是说 `New-Object` 创建的对象都会出错。要查对象真实类型、包装和里面有没有父子互相引用。[.NET Framework 的 Serialize 文档](https://learn.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer.serialize?view=netframework-4.8.1)确认循环引用会触发异常，但没有替我们证明这一条 PowerShell 包装链的全部原因。

测试要分“原来没有文件”和“已有文件需要合并”。只测后一条，就可能把新用户第一步的问题漏掉。换构造方式后，也要读回 JSON，确认字段、类型和旧值保留情况。

## 第三个坑：编码要连着启动方式一起看

本地 `.ps1` 里有中文，用 Windows PowerShell 5.1 的 `-File` 执行时，没有 BOM 的 UTF-8 可能被按本机旧代码页读取。[微软编码说明](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_character_encoding?view=powershell-5.1#the-byte-order-mark)建议这种非 ASCII 脚本使用 UTF-8 BOM。

但我们当时另一条“下载文本再执行”的路径，曾把开头的 BOM 留进字符串，导致首行 `param` 前多出字符。这个现象不能外推成“所有远程脚本都不能带 BOM”。下载响应的字符集、下载器怎样解码、执行器怎样处理字符串，要一起查。

本地文件按本地文件测，下载执行按下载执行测。不要为了让其中一条通过，就给所有脚本统一加 BOM 或去 BOM。远程脚本先下载、检查来源和内容，再决定执行，别让排障变成盲跑陌生代码。

## 可以复制给 AI 的检查单

```text
先别改我的真实配置。请核对：
Windows 与 PowerShell 的完整版本：____
实际启动命令／下载解码方式：____
外部程序实际收到的参数：____
配置不存在、配置已存在，两条路分别怎样：____
脚本编码、BOM、输出文件编码分别是什么：____
只在临时样例里验证，给出实际结果和未验版本。
通过语法检查，不等于通过用户安装路径。
```

遇到安装卡点，可以接着看本站的[零基础上手与排障入口](/start/)。
