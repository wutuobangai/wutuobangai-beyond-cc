/* 资料站铃铛（右上角）：提醒本站自己的更新。数据在 /bell-data.js。参照海外站 site-updates 做法。 */
(function () {
  'use strict';
  if (window.__calBell) return; window.__calBell = true;
  var KEY = 'cal-site-updates-seen-v1';
  function load(cb) {
    if (window.CAL_SITE_UPDATES) return cb();
    var s = document.createElement('script');
    s.src = '/bell-data.js?v=' + Date.now();
    s.onload = cb; document.head.appendChild(s);
  }
  function seen() { try { var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function idOf(it) { return it.date + '|' + it.link + '|' + it.title; }
  function css() {
    if (document.getElementById('cal-bell-css')) return;
    var st = document.createElement('style'); st.id = 'cal-bell-css';
    st.textContent =
      '.cal-bell{position:relative;display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;margin:0 6px;border:1px solid rgba(79,70,229,.22);border-radius:10px;background:rgba(79,70,229,.07);color:#1A1A1A;font-size:18px;line-height:1;cursor:pointer;padding:0;flex:none}' +
      '.cal-bell:hover{border-color:#4F46E5;background:rgba(79,70,229,.13)}' +
      '.cal-bell-badge{position:absolute;right:-5px;top:-5px;min-width:18px;height:18px;line-height:14px;padding:0 4px;box-sizing:border-box;border-radius:20px;background:#dc2626;color:#fff;border:2px solid #fff;font-size:10px;text-align:center;font-family:-apple-system,"PingFang SC",sans-serif}' +
      '.cal-bell.unread{animation:calBellPulse 2.4s ease-in-out infinite}' +
      '@keyframes calBellPulse{50%{box-shadow:0 0 0 4px rgba(79,70,229,.18)}}' +
      '.cal-bell-panel{position:fixed;z-index:2000;box-sizing:border-box;width:min(340px,calc(100vw - 24px));max-height:70vh;overflow:auto;background:#fff;color:#1A1A1A;border:1px solid rgba(26,26,26,.1);border-radius:12px;box-shadow:0 12px 36px rgba(26,26,26,.14);padding:12px 14px;font:14px/1.55 -apple-system,"PingFang SC","Microsoft YaHei",sans-serif;text-align:left}' +
      '.cal-bell-panel[hidden]{display:none}' +
      '.cal-bell-head{display:flex;justify-content:space-between;align-items:center;margin:0 0 6px;font-weight:700;font-size:15px}' +
      '.cal-bell-x{border:0;background:transparent;font-size:20px;color:#8C8A84;cursor:pointer;padding:0 4px}' +
      '.cal-bell-item{display:block;padding:10px 2px;border-top:1px solid #f0eee8;text-decoration:none!important;color:#1A1A1A!important}' +
      '.cal-bell-item:hover .cal-bell-t{color:#4F46E5}' +
      '.cal-bell-d{display:block;color:#8C8A84;font-size:11px;margin-bottom:2px}' +
      '.cal-bell-t{display:block;font-weight:600}' +
      '.cal-bell-s{display:block;color:#52504B;font-size:12.5px;margin-top:2px}' +
      '.cal-bell-new{display:inline-block;margin-left:6px;padding:0 6px;border-radius:6px;background:#dc2626;color:#fff;font-size:10px;font-weight:600;vertical-align:1px}' +
      '.cal-bell-all{display:block;text-align:center;padding:10px 0 2px;border-top:1px solid #f0eee8;color:#4F46E5!important;font-size:13px;text-decoration:none!important}';
    document.head.appendChild(st);
  }
  var btn, badge, panel;
  function build() {
    var items = window.CAL_SITE_UPDATES || []; if (!items.length) return false;
    btn = document.createElement('button'); btn.type = 'button'; btn.className = 'cal-bell'; btn.textContent = '🔔';
    btn.setAttribute('aria-haspopup', 'true'); btn.setAttribute('aria-expanded', 'false');
    badge = document.createElement('span'); badge.className = 'cal-bell-badge'; btn.appendChild(badge);
    panel = document.createElement('div'); panel.className = 'cal-bell-panel'; panel.hidden = true; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', '网站更新');
    var head = document.createElement('div'); head.className = 'cal-bell-head'; head.appendChild(document.createTextNode('🔔 网站更新'));
    var x = document.createElement('button'); x.type = 'button'; x.className = 'cal-bell-x'; x.textContent = '×'; x.setAttribute('aria-label', '关闭'); head.appendChild(x); panel.appendChild(head);
    var s0 = seen();
    items.forEach(function (it) {
      var a = document.createElement('a'); a.className = 'cal-bell-item'; a.href = it.link;
      var d = document.createElement('span'); d.className = 'cal-bell-d'; d.textContent = it.date; a.appendChild(d);
      var t = document.createElement('span'); t.className = 'cal-bell-t'; t.textContent = it.title;
      if (s0.indexOf(idOf(it)) === -1) { var n = document.createElement('span'); n.className = 'cal-bell-new'; n.textContent = '新'; t.appendChild(n); }
      a.appendChild(t);
      if (it.summary) { var sm = document.createElement('span'); sm.className = 'cal-bell-s'; sm.textContent = it.summary; a.appendChild(sm); }
      panel.appendChild(a);
    });
    var all = document.createElement('a'); all.className = 'cal-bell-all'; all.href = '/changelog/'; all.textContent = '看全部更新日志 →'; panel.appendChild(all);
    document.body.appendChild(panel);
    function render() {
      var s = seen(); var c = items.filter(function (it) { return s.indexOf(idOf(it)) === -1; }).length;
      badge.textContent = String(c); badge.hidden = !c; btn.classList.toggle('unread', c > 0);
      btn.setAttribute('aria-label', '网站更新' + (c ? '，' + c + ' 条未读' : ''));
    }
    function place() {
      var r = btn.getBoundingClientRect(); var w = Math.min(340, window.innerWidth - 24);
      panel.style.left = Math.max(12, Math.min(r.right - w, window.innerWidth - w - 12)) + 'px';
      panel.style.top = (r.bottom + 8) + 'px';
    }
    function toggle(open) {
      panel.hidden = !open; btn.setAttribute('aria-expanded', String(open));
      if (open) { place(); var s = seen(); items.forEach(function (it) { var i = idOf(it); if (s.indexOf(i) === -1) s.push(i); }); save(s); render(); }
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); toggle(panel.hidden); });
    x.addEventListener('click', function () { toggle(false); });
    document.addEventListener('click', function (e) { if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) toggle(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
    window.addEventListener('resize', function () { if (!panel.hidden) place(); });
    window.addEventListener('scroll', function () { if (!panel.hidden) place(); }, { passive: true });
    render(); return true;
  }
  function mount() {
    if (btn && document.body.contains(btn)) return;
    // 首页 A：放在导航最右（手机菜单按钮左边）；内页（VuePress）：放在顶栏右侧区域最前面。
    var homeNav = document.querySelector('#hd nav');
    var vpEnd = document.querySelector('.vp-navbar-end');
    if (homeNav) { var tg = homeNav.querySelector('.nav-toggle'); homeNav.insertBefore(btn, tg || null); }
    else if (vpEnd) { vpEnd.insertBefore(btn, vpEnd.firstChild); }
  }
  function start() {
    css(); if (!btn && !build()) return; mount();
    // VuePress 换页/水合会重画顶栏，铃铛掉了就补回去。
    new MutationObserver(function () { if (!document.body.contains(btn)) mount(); }).observe(document.body, { childList: true, subtree: true });
  }
  // 内页等 VuePress 接管页面后再挂，避免水合不一致。
  function ready() { setTimeout(function () { load(start); }, document.querySelector('#app') ? 400 : 0); }
  if (document.readyState === 'complete') ready(); else window.addEventListener('load', ready);
})();
