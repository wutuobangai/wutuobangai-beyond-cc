import { defineClientConfig } from "vuepress/client";

/**
 * 首页路由修复（2026-05-31）
 * 问题：cal. 的真首页是自定义首页 A（index.html 由 nginx 直接服务·活网格+护城河）。
 *       但 VuePress 是 SPA，点击导航「首页」或左上角 logo 时，前端路由会渲染 VuePress
 *       自己的默认首页（docs/README.md 的绿色 home），而不是首页 A。
 * 修复：拦截所有指向 "/" 的链接点击，强制整页刷新（window.location）到 /，
 *       这样一定走 nginx → 拿到首页 A，绕开 SPA 渲染的绿色默认 home。
 * 只拦 href 精确等于首页的链接，其它内页 SPA 导航不受影响。
 */
export default defineClientConfig({
  setup() {
    if (typeof window === "undefined") return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const a = target && target.closest ? target.closest("a") : null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (href === "/" || href === "/index.html") {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = "/";
      }
    };
    document.addEventListener("click", onClick, true);
  },
});
