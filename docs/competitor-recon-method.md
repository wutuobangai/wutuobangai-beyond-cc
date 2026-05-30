# 竞品对标 4 层挖法（从截图挖到对手技术栈）

> 别人对标只截个图就完事 · 我们挖 4 层 · 一路挖到对手用了哪个上游平台、哪些 API 端点、怎么设计参数面板。
>
> [English version below ↓]

---

## 大白话（这套是干啥的）

对标竞品不是「打开网站截个图」。
那只挖到最浅的一层——它想让你看到的壳。

真正的对手信息藏在 4 层里，越往下越值钱：

1. **截图** = 看它长啥样（视觉壳）
2. **文案** = 看它怎么说（卖点/定价/SEO）
3. **渲染 DOM** = 看它动态加载的内容（静态抓不到的目录）
4. **JS bundle** = 看它的魂（技术栈/上游平台/API 端点/参数体系）

**一句话**：截图抄壳 → bundle 抄魂。

---

## 为什么大多数人只挖到第 1 层

现代网站（React/Vue/Vite）首页静态 HTML 往往只是个空壳，几 KB。
真内容是 JavaScript 跑完才渲染出来的。
所以你 `curl` 一下只看到一堆 `<div id="root">`，啥都没有。
你以为「这站没内容」，其实内容全在 JS bundle 里。

会挖的人，4 层挖到底，看到的是它的整个技术架构。

---

## 四层挖法（每层：目的 + 命令 + 挖到什么 + 失败兜底）

> 准备：先定一个 Chrome 变量，下面命令复用。macOS 默认：
> ```bash
> CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
> # 没有 Chrome 用 Chromium / Edge 同理，--headless 参数通用
> ```

---

### 第 1 层 · 截图层（看壳）

**目的**：1 秒看清它整体视觉、首页结构、配色、留白。

```bash
TARGET="https://example.com"
OUT="/tmp/recon"; mkdir -p "$OUT"
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --window-size=1440,4500 \
  --screenshot="$OUT/home.png" \
  "$TARGET"
# 多页批量
for p in "" "pricing" "features" "blog"; do
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --window-size=1440,4500 \
    --screenshot="$OUT/${p:-home}.png" \
    "$TARGET/$p"
done
```

**挖到什么**：首页黄金结构（英雄区/能力展示/信任背书/CTA/Footer）、配色风格、信息密度。

**失败兜底**：截图全白 = 内容靠 JS 渲染 → 加 `--virtual-time-budget=8000` 等渲染，或直接跳第 3 层。

---

### 第 2 层 · 文案层（看它怎么说）

**目的**：抓导航分类、板块结构、定价档位、卖点话术、SEO 长尾词、CTA 文案。

把首页和 /pricing 喂给你的 AI，让它提取：
1. 顶部导航全部分类
2. 首页板块顺序
3. 定价所有档位和价格
4. 核心卖点/slogan
5. SEO 关键词/长尾词
6. 所有 CTA 按钮文案

（用 AI 工具的「读网页」功能，或 curl 下 HTML 喂给 AI）

**挖到什么**：定价策略（订阅 vs 积分 vs 永不过期）、卖点差异化、SEO 布局、数据背书、变现方式数量。

**失败兜底**：内容很少（SPA 站静态 HTML 才几 KB）= 真内容是 JS 渲染的 → 跳第 3 层。

---

### 第 3 层 · 渲染 DOM 层（SPA 动态内容）

**目的**：现代站首页静态只有空壳，真内容（产品目录、动态网格）要 JS 跑完才出来。这层把渲染后完整 DOM dump 出来。

```bash
TARGET="https://example.com"
"$CHROME" --headless --disable-gpu \
  --virtual-time-budget=9000 \
  --dump-dom \
  "$TARGET" > /tmp/recon/rendered.html
# 对比静态 vs 渲染后大小（差距越大越依赖 JS）
curl -s "$TARGET" | wc -c           # 静态：可能只有 7KB 空壳
wc -c /tmp/recon/rendered.html       # 渲染后：可能 194KB 出全部目录
# 抓标题/产品列表
grep -oiE '<h[1-3][^>]*>[^<]+</h[1-3]>' /tmp/recon/rendered.html
```

**挖到什么**：完整产品/功能目录（截图数不清的全量列表）、动态加载的卡片、隐藏 tab 内容。

**真实对比**：某 AI 工具站静态 curl 只有 7KB 空壳，渲染后 194KB 出全部模型目录——差 27 倍。

**失败兜底**：dump 还是空 → 加大 `--virtual-time-budget=15000`；内容在 shadow DOM → 用 Playwright 能进 shadow root。

---

### 第 4 层 · JS bundle 层（看它的魂）

**目的**：界面看不到的真产品设计全在 JS bundle 里——技术栈、后端、上游平台、API 端点、参数体系。这是「它怎么造的」。

```bash
TARGET="https://example.com"
# 1. 从渲染 DOM 找 bundle 路径
grep -oE '/assets/[^"]*\.js' /tmp/recon/rendered.html | sort -u
# 2. 下载主 bundle（通常最大那个）
curl -s "$TARGET/assets/index-XXXX.js" -o /tmp/recon/bundle.js
wc -c /tmp/recon/bundle.js   # 1-2MB 正常

# 3. 扒技术栈 / 后端 / 上游平台
grep -oiE '(supabase|firebase|vercel|cloudflare)' /tmp/recon/bundle.js | sort | uniq -c
grep -oiE '(fal\.ai|fal-|replicate|runpod|together\.ai)' /tmp/recon/bundle.js | sort -u
# 4. 扒 API 端点
grep -oE 'https://[a-z0-9.-]+/(api|rest|functions)/[a-z0-9/_-]*' /tmp/recon/bundle.js | sort -u
# 5. 扒参数体系（分辨率/比例/质量/数量）
grep -oiE '(resolution|aspectRatio|maxImages|quality)' /tmp/recon/bundle.js | sort | uniq -c
```

**挖到什么**：
- 技术栈：前端框架（Vite+React 还是 Next.js）、后端（Supabase / Firebase）
- 上游平台实锤：模型走哪个聚合（看 API 前缀就知道它接了 fal.ai 还是 replicate）
- API 端点全表
- 参数面板设计（质量分档、数量上限、比例选项、宽审分组）
- 支付方式（看是 Stripe 还是加密货币 = 判断它面向哪个市场）

**真实案例**：某 AI 工具站 bundle 实锤——前端 Vite+React、后端 Supabase、34 个模型不自己接，全走一个海外聚合平台的 API（看前缀一目了然）。一个结论就出来了：它的模型全靠那个海外平台，在某些地区访问不稳定——这就是它抄不走的弱点，也是后来者的机会。

**失败兜底**：
- bundle 是 minified 一行 → 正常，grep 照样抓字符串字面量（URL/字段名不会被混淆掉）。
- 找不到 /assets/*.js → grep 渲染 DOM 里所有 `<script src>`。
- bundle 分片很多 → 把所有 chunk 都 curl 下来合并 grep：`cat /tmp/recon/*.js | grep ...`。

---

## 产出 · 作战地图（挖完怎么落地）

挖完 4 层，让 AI 综合出**横向对比矩阵 + 落地结论**，不是堆数据。

### 横向对比矩阵（多个竞品时）
| 类别 | 说明 | 动作 |
|------|------|------|
| 🟢 **都做的** | 行业标准 | 必抄 |
| 🟡 **各自独有的** | 单家杀招 | 挑值钱的偷 |
| 🔴 **都没做的** | 行业空白 = 你的蓝海 | 你的护城河 |

### 落地结论模板
- **抄什么**：🟢 + 🟡 里值钱的（具体到能施工的颗粒度）
- **避什么**：竞品的坑 / 不适合你市场的
- **独创什么**：🔴 蓝海（这是对标的真正目的——找到对手没占的位）

---

## 合规边界（重要）

| 能做 | 不能做 |
|------|--------|
| ✅ 抓公开的 JS bundle（浏览器本来就下载它） | ❌ 高频请求 / 压测对方服务 |
| ✅ 读公开页面 / 公开内容 | ❌ 撞登录后的私有数据 |
| ✅ 只读，仅做竞品研究 | ❌ 任何写操作 / 破坏对方服务 |

**核心原则**：只碰公开 · 只读不写 · 不破坏。
你做的事，和「打开它的页面用浏览器开发者工具看 Network」本质一样，只是更结构化。

---

## 怎么让你的 AI 帮你跑

把这个文件扔给你的 AI（Claude / Codex / Cursor / ChatGPT 都行），说：

```
读这个 competitor-recon-method.md
然后帮我对标 https://对手网址.com
4 层挖到底，出一份横向对比作战地图
```

AI 会自动跑命令、抓 bundle、grep 技术栈，最后给你一张「抄什么 / 避什么 / 独创什么」的地图。

---

# English Version

## What This Method Does

Competitor research isn't "open the site and take a screenshot."
That only digs the shallowest layer — the shell they want you to see.

Real competitor intel hides in 4 layers, more valuable as you go deeper:

1. **Screenshot** — what it looks like (visual shell)
2. **Copy** — what it says (selling points / pricing / SEO)
3. **Rendered DOM** — dynamically loaded content (catalog you can't get from static curl)
4. **JS bundle** — its soul (tech stack / upstream platform / API endpoints / parameter system)

**In one sentence**: screenshot copies the shell → bundle copies the soul.

## Why Most People Only Dig Layer 1

Modern sites (React/Vue/Vite) often serve a static HTML shell of just a few KB.
The real content renders after JavaScript runs.
So a plain `curl` shows you `<div id="root">` and nothing else.
You think "this site has no content" — but it's all in the JS bundle.

## The 4 Layers

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

**Layer 1 · Screenshot** — full-page capture:
```bash
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --window-size=1440,4500 --screenshot="/tmp/recon/home.png" "https://example.com"
```

**Layer 2 · Copy** — feed homepage + /pricing to your AI, extract: nav categories, section order, pricing tiers, slogan, SEO keywords, CTA copy.

**Layer 3 · Rendered DOM** — dump DOM after JS runs:
```bash
"$CHROME" --headless --disable-gpu --virtual-time-budget=9000 \
  --dump-dom "https://example.com" > /tmp/recon/rendered.html
curl -s "https://example.com" | wc -c    # static: maybe 7KB shell
wc -c /tmp/recon/rendered.html            # rendered: maybe 194KB full catalog
```

**Layer 4 · JS bundle** — grep tech stack / upstream / endpoints:
```bash
grep -oE '/assets/[^"]*\.js' /tmp/recon/rendered.html | sort -u
curl -s "https://example.com/assets/index-XXXX.js" -o /tmp/recon/bundle.js
grep -oiE '(supabase|firebase|fal\.ai|replicate)' /tmp/recon/bundle.js | sort -u
grep -oE 'https://[a-z0-9.-]+/(api|rest|functions)/[a-z0-9/_-]*' /tmp/recon/bundle.js | sort -u
```

## Output · Battle Map

| Category | Action |
|----------|--------|
| 🟢 Everyone does it = industry standard | Copy it |
| 🟡 Unique to one = their edge | Steal the valuable ones |
| 🔴 Nobody does it = blue ocean | Your moat |

Conclusion: what to copy / what to avoid / what to invent (🔴 blue ocean is the real point of recon).

## Compliance

| OK | Not OK |
|----|--------|
| ✅ Fetch public JS bundle (browser downloads it anyway) | ❌ High-frequency requests / stress test |
| ✅ Read public pages | ❌ Hit private data behind login |
| ✅ Read-only, research only | ❌ Any write / disrupt their service |

**Core principle**: public only · read-only · no disruption.
What you're doing is essentially the same as opening DevTools Network tab — just more structured.

## Let Your AI Run It

Hand this file to your AI (Claude / Codex / Cursor / ChatGPT):

```
Read competitor-recon-method.md
Then do competitor recon on https://target.com
Dig all 4 layers, output a horizontal comparison battle map
```

---

License: MIT
