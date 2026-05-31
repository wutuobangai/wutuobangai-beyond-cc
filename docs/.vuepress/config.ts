import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Beyond CC · 乌托邦AI",
  description:
    "30 岁不懂代码的普通人，用 AI 跑出超越官方的方法论。反向劝阻 hook、4 agent 端到端、竞品对标 5 层挖法、Memory 4 件套 —— 普通人用 AI 真正跑活的实战资料站。",

  bundler: viteBundler(),

  head: [
    ["meta", { name: "keywords", content: "一人AI公司,AI一个人怎么干,30岁转AI,中年人转AI,普通人用AI,普通人AI赚钱,AI入门,Claude Code,Codex,AI方法论,一人公司" }],
    ["meta", { name: "robots", content: "index,follow" }],
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
      { text: "两条路", link: "/two-roads.html" },
      {
        text: "一人公司架构",
        children: [
          { text: "架构全貌", link: "/architecture/" },
          { text: "13 个 AI 岗位", link: "/architecture/agents.html" },
          { text: "工具栈 · 100+ Skill / 29 MCP", link: "/architecture/stack.html" },
        ],
      },
      { text: "实战经验", link: "/lessons/" },
      { text: "实战案例", link: "/cases/" },
      { text: "方法论库", link: "/methodology/" },
      { text: "开源技能下载", link: "/skills/" },
      { text: "金句墙", link: "/quotes/" },
      {
        text: "我的产品",
        children: [
          { text: "AIGC 站（国内）", link: "https://wutuobangai.com" },
          { text: "AI 工具站（海外）", link: "https://wutuobangai.top" },
          { text: "课程站", link: "https://forms.wutuobangai.com" },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "开始",
          children: ["/guide/README.md"],
        },
      ],
      "/lessons/": [
        {
          text: "实战经验",
          children: [
            "/lessons/README.md",
            "/lessons/status-200-not-alive.md",
            "/lessons/dispatch-for-truth.md",
          ],
        },
      ],
      "/cases/": [
        {
          text: "实战案例库",
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
      "/journey/": [
        {
          text: "我的 0 → 1",
          children: ["/journey/README.md"],
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
      "/skills/": [
        {
          text: "开源技能下载",
          children: ["/skills/README.md"],
        },
      ],
      "/quotes/": [
        {
          text: "金句墙",
          children: ["/quotes/README.md"],
        },
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
