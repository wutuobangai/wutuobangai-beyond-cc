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
    ["meta", { name: "keywords", content: "Claude Code,Codex,AI 实战,普通人用 AI,反向劝阻,AI 方法论,一人公司" }],
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
      { text: "开始", link: "/guide/" },
      { text: "实战经验", link: "/lessons/" },
      { text: "方法论库", link: "/methodology/" },
      { text: "🚀 用上 AI 工具站", link: "https://wutuobangai.com" },
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
      "/methodology/": [
        {
          text: "方法论库",
          children: [
            "/methodology/README.md",
            "/methodology/reverse-pushback.md",
            "/methodology/why-beyond.md",
            "/methodology/story.md",
            "/methodology/competitor-recon.md",
          ],
        },
      ],
    },

    // 商业闭环钩子（codexguide 没有的超越点）
    footer:
      '想直接用上 AI 不折腾？→ <a href="https://wutuobangai.com" target="_blank">工具站按积分用</a> · 加微信领免费资料包',
    displayFooter: true,
    copyright: "MIT Licensed | Copyright © 2026 乌托邦AI",

    // 时效声明 + 编辑链接
    lastUpdated: true,
    contributors: false,

    plugins: {
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
