import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

// 「踩坑记录」合并侧边栏（实战经验 lessons + 实战案例 cases 两组 · 一处定义两处复用）
const pitfallSidebar = [
  {
    text: "踩坑故事 · 深度复盘",
    children: [
      "/lessons/status-200-not-alive.md",
      "/lessons/dispatch-for-truth.md",
    ],
  },
  {
    text: "实战案例 · 照着做",
    collapsible: true,
    children: [
      "/cases/README.md",
      "/cases/dispatch-beats-guessing.md",
      "/cases/reuse-dead-assets.md",
      "/cases/verify-not-trust-selfreport.md",
      "/cases/field-truth-over-ai.md",
      "/cases/enforce-not-rely-on-discipline.md",
      "/cases/componentize-edit-once.md",
      "/cases/check-sync-chain-first.md",
      "/cases/avoid-at-source.md",
    ],
  },
];

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Beyond CC · 乌托邦AI",
  description:
    "30 岁不懂代码的普通人，用 AI 跑出超越官方的方法论。反向劝阻 hook、4 agent 端到端、竞品对标 5 层挖法、Memory 4 件套 —— 普通人用 AI 真正跑活的实战资料站。",

  bundler: viteBundler(),

  head: [
    // favicon：全局声明，保证每个内页 tab 都有图标（不声明则浏览器默认要 /favicon.ico → SPA 兜底吐 HTML → 默认地球）
    ["link", { rel: "icon", type: "image/png", href: "/favicon.png" }],
    ["link", { rel: "shortcut icon", type: "image/png", href: "/favicon.png" }],
    ["meta", { name: "keywords", content: "一人AI公司,AI一个人怎么干,30岁转AI,中年人转AI,普通人用AI,普通人AI赚钱,AI入门,Claude Code,Codex,AI方法论,一人公司" }],
    ["meta", { name: "robots", content: "index,follow" }],
    // KF-FLOAT-BEYONDCC-20260601 企业客服浮窗（右下角·跳企微客服）· 内页全站注入
    ["script", { src: "/kf-float.js", defer: "" }],
  ],

  theme: hopeTheme({
    hostname: "https://cal.wutuobangai.com",
    logo: "/logo.png",

    author: { name: "乌托邦AI" },
    repo: "wutuobangai/wutuobangai-beyond-cc",
    repoLabel: "GitHub",
    docsDir: "docs",

    navbar: [
      { text: "首页", link: "/" },
      { text: "0→1 之路", link: "/journey/" },
      { text: "零基础上手", link: "/start/" },
      {
        text: "一人公司架构",
        children: [
          { text: "架构全貌", link: "/architecture/" },
          { text: "13 个 AI 岗位", link: "/architecture/agents.html" },
          { text: "工具栈 · 100+ Skill / 29 MCP", link: "/architecture/stack.html" },
        ],
      },
      { text: "踩坑记录", link: "/cases/" },
      { text: "方法论库", link: "/methodology/" },
      { text: "开源技能下载", link: "/skills/" },
      { text: "金句墙", link: "/quotes/" },
      {
        text: "我的其他网站",
        children: [
          { text: "AIGC 站（国内）", link: "https://wutuobangai.com" },
          { text: "AI 工具站（海外）", link: "https://wutuobangai.top" },
          { text: "课程站", link: "https://forms.wutuobangai.com" },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        { text: "开始", children: ["/guide/README.md"] },
      ],
      "/journey/": [
        { text: "我的 0 → 1", children: ["/journey/README.md"] },
      ],
      // 闯关地图：新手村 + 6 关 + 补给站（每关 = 一个「我现在会了 X」的通关点）
      "/start/": [
        { text: "🏁 新手村 · 学习路线", link: "/start/README.md" },
        {
          text: "🎮 第 1 关 · 装上家伙",
          collapsible: true,
          children: [
            { text: "装 Claude Code", link: "/start/install-claude-code.md" },
            { text: "装 Codex", link: "/start/install-codex.md" },
          ],
        },
        {
          text: "🎫 第 2 关 · 办通行证",
          collapsible: true,
          children: [
            { text: "订阅与付费", link: "/start/subscribe-and-pay.md" },
            { text: "CLI 安装与登录", link: "/start/cli-login.md" },
          ],
        },
        {
          text: "⚡ 第 3 关 · 第一次使唤",
          collapsible: true,
          children: [
            { text: "跑通第一个任务", link: "/start/first-task.md" },
            { text: "让它帮你改东西", link: "/start/let-it-edit.md" },
          ],
        },
        {
          text: "🛡️ 第 4 关 · 踩住刹车",
          collapsible: true,
          children: [
            { text: "权限与安全", link: "/start/permissions-safety.md" },
          ],
        },
        {
          text: "📜 第 5 关 · 给它立规矩",
          collapsible: true,
          children: [
            { text: "写第一份 CLAUDE.md / AGENTS.md", link: "/start/memory-rules.md" },
          ],
        },
        {
          text: "🧰 第 6 关 · 配齐装备",
          collapsible: true,
          children: [
            { text: "在 VS Code 里用", link: "/start/vscode.md" },
            { text: "MCP 与技能", link: "/start/mcp-skills.md" },
          ],
        },
        {
          text: "🆘 补给站 · 卡住自救",
          collapsible: true,
          children: [
            { text: "排障手册", link: "/start/troubleshooting.md" },
          ],
        },
      ],
      "/architecture/": [
        {
          text: "一人公司架构",
          children: [
            "/architecture/README.md",
            "/architecture/agents.md",
            "/architecture/stack.md",
          ],
        },
      ],
      "/methodology/": [
        {
          text: "方法论库",
          children: [
            "/methodology/README.md",
            "/methodology/reverse-pushback.md",
            "/methodology/chairman-mode.md",
            "/methodology/thirty-second-sync.md",
            "/methodology/five-hard-metrics.md",
            "/methodology/no-ball-kicking.md",
            "/methodology/closeout-15-steps.md",
            "/methodology/clean-old-before-new.md",
            "/methodology/why-beyond.md",
            "/methodology/story.md",
            "/methodology/competitor-recon.md",
          ],
        },
      ],
      "/lessons/": pitfallSidebar,
      "/cases/": pitfallSidebar,
      "/skills/": [
        { text: "开源技能下载", children: ["/skills/README.md"] },
      ],
      "/quotes/": [
        { text: "金句墙", children: ["/quotes/README.md"] },
      ],
    },

    // 商业闭环钩子（codexguide 没有的超越点）
    footer:
      '想系统学这套打法 → <a href="https://forms.wutuobangai.com" target="_blank">16 周陪跑课程</a> · 想直接用 → <a href="https://wutuobangai.com" target="_blank">工具站按积分用</a> · <a href="https://work.weixin.qq.com/kfid/kfc5a9b5eb24d51c342" target="_blank">加微信领免费资料</a>',
    displayFooter: true,
    copyright: "MIT Licensed | Copyright © 2026 乌托邦AI",

    // 时效声明 + 编辑链接
    lastUpdated: true,
    contributors: false,

    plugins: {
      // SEO：内页自动 og:image + twitter card（首页 homepage.html 单独手补 head）
      seo: {
        fallBackImage: "https://cal.wutuobangai.com/og-cover.png",
        ogp: (ogp) => ({
          ...ogp,
          "twitter:card": "summary_large_image",
          "twitter:image:src": "https://cal.wutuobangai.com/og-cover.png",
        }),
      },
      // sitemap 显式声明（配合百度/必应/Google 收录）
      sitemap: {
        changefreq: "weekly",
      },
      // 图标（fontawesome-with-brands）
      icon: {
        assets: "fontawesome-with-brands",
      },
      // Ctrl+K 全文搜索
      slimsearch: {
        indexContent: true,
      },
      // RSS 订阅
      feed: {
        rss: true,
        json: true,
      },
    },
  }),
});
