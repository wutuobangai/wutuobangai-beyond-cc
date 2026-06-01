/* KF-FLOAT-BEYONDCC-20260601 企业客服浮窗 · 学海外站 kf-float 实现 · 全站右下角 · 点击直跳企微客服
 * 引入：config.ts head（内页） + homepage.html </body> 前（首页）
 * 配色用 beyond-cc 靛蓝（非海外站霓虹绿）· bottom 抬高避开 VuePress 回到顶部按钮
 */
(function () {
  'use strict';
  var KF_URL = 'https://work.weixin.qq.com/kfid/kfc5a9b5eb24d51c342';
  if (document.querySelector('.kf-fab')) return; // 防重复注入（首页+内页都引时）

  var style = document.createElement('style');
  style.textContent = ''
    + '.kf-fab{position:fixed;right:20px;bottom:84px;z-index:9998;'
    +   'background:linear-gradient(135deg,#4F46E5,#6366f1);color:#fff;border:none;border-radius:50px;'
    +   'padding:11px 18px;font-size:13px;font-weight:700;'
    +   'box-shadow:0 8px 24px rgba(79,70,229,0.35);'
    +   'display:flex;align-items:center;gap:7px;cursor:pointer;transition:all .2s;'
    +   'text-decoration:none;line-height:1;'
    +   'font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;}'
    + '.kf-fab:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(79,70,229,0.45);}'
    + '.kf-fab svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}'
    + '@media(max-width:640px){.kf-fab{right:14px;bottom:74px;width:48px;height:48px;padding:0;border-radius:50%;justify-content:center;}.kf-fab .kf-fab-text{display:none;}.kf-fab svg{width:20px;height:20px;}}'
    + '@keyframes kf-pulse{0%,100%{box-shadow:0 8px 24px rgba(79,70,229,0.35);}50%{box-shadow:0 8px 30px rgba(79,70,229,0.5),0 0 0 6px rgba(79,70,229,0.12);}}'
    + '.kf-fab{animation:kf-pulse 2.6s ease-in-out infinite;}';
  document.head.appendChild(style);

  var btn = document.createElement('a');
  btn.className = 'kf-fab';
  btn.href = KF_URL;
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.setAttribute('aria-label', '企业客服');
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg><span class="kf-fab-text">企业客服</span>';

  if (document.body) document.body.appendChild(btn);
  else document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(btn); });
})();
