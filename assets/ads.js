"use strict";

(() => {
  const base = document.currentScript && document.currentScript.src
    ? document.currentScript.src.replace(/\/[^/]*$/, "/")
    : "/assets/";
  const cfgUrl = base + "ads.json";

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
    if (!slot) return;
    document.querySelectorAll(".ad-slot[data-ad]").forEach((host) => {
      if (host.querySelector("ins.adsbygoogle")) return;
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

  fetch(cfgUrl)
    .then((r) => (r.ok ? r.json() : null))
    .then((cfg) => {
      const client = String(cfg?.client || "").trim();
      const slot = String(cfg?.slot || "").trim();
      boot(client, cfg?.autoAds);
      const run = () => fillSlots(client, slot);
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
      else run();
    })
    .catch(() => {});
})();
