"use strict";

(() => {
  const base =
    document.currentScript && document.currentScript.src
      ? document.currentScript.src.replace(/\/[^/]*$/, "/")
      : "/assets/";
  const cfgUrl = base + "ads.json";

  let fillOnce = null;

  function clientFromMeta() {
    const m = document.querySelector('meta[name="google-adsense-account"]');
    return String(m?.getAttribute("content") || "").trim();
  }

  function boot(client, autoAds) {
    if (!/^ca-pub-\d+$/.test(client)) return;
    window.adsbygoogle = window.adsbygoogle || [];
    if (autoAds !== false) {
      window.adsbygoogle.push({ google_ad_client: client, enable_page_level_ads: true });
    }
    if (document.querySelector('script[src*="adsbygoogle.js"]')) return;
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    document.head.appendChild(s);
  }

  function fillSlots(client, slot) {
    if (!slot || !/^ca-pub-\d+$/.test(client)) return;
    document.querySelectorAll(".ad-slot[data-ad]").forEach((host) => {
      if (host.querySelector("ins.adsbygoogle")) return;
      host.hidden = false;
      if (!host.getBoundingClientRect().width) {
        host.hidden = true;
        return;
      }
      const label = document.createElement("p");
      label.className = "ad-label";
      label.textContent = "Advertisement";
      const ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", client);
      ins.setAttribute("data-ad-slot", slot);
      ins.setAttribute("data-ad-format", "auto");
      ins.setAttribute("data-full-width-responsive", "true");
      host.append(label, ins);
      host.hidden = false;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        /* ignore */
      }
    });
  }

  function isToolPage() {
    return !!document.querySelector("main .tool-panel");
  }

  function bindInputOnlyTools(reveal) {
    const panel = document.querySelector("main .tool-panel");
    if (!panel || panel.querySelector("button.primary")) return;
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      reveal();
    };
    const debounced = () => {
      clearTimeout(debounced.t);
      debounced.t = setTimeout(run, 900);
    };
    panel.addEventListener("input", debounced, { passive: true });
    panel.addEventListener("change", debounced, { passive: true });
  }

  function start(cfg) {
    const client = String(cfg?.client || clientFromMeta() || "").trim();
    const slot = String(cfg?.slot || "").trim();
    const deferForTool = cfg?.showAfterToolUse !== false && isToolPage();

    boot(client, cfg?.autoAds);

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      fillSlots(client, slot);
    };
    fillOnce = reveal;

    if (!deferForTool) {
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", reveal);
      else reveal();
      return;
    }

    document.addEventListener("tool:complete", reveal, { once: true });
    bindInputOnlyTools(reveal);
    if (window.__toolCompleteFired) reveal();
  }

  fetch(cfgUrl)
    .then((r) => (r.ok ? r.json() : null))
    .then((cfg) => start(cfg || {}))
    .catch(() => start({}));
})();
