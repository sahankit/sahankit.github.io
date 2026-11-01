"use strict";

/** Google Analytics 4 (gtag.js). Set measurementId in /assets/analytics.json (G-XXXXXXXXXX). */
(() => {
  const base =
    document.currentScript && document.currentScript.src
      ? document.currentScript.src.replace(/\/[^/]*$/, "/")
      : "/assets/";
  const cfgUrl = base + "analytics.json";

  function start(cfg) {
    const id = String(cfg?.measurementId || "").trim();
    if (!/^G-[A-Z0-9]+$/i.test(id)) return;
    const host = location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", id, {
      anonymize_ip: cfg?.anonymizeIp !== false,
      send_page_view: cfg?.sendPageView !== false,
    });

    if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  }

  fetch(cfgUrl)
    .then((r) => (r.ok ? r.json() : null))
    .then((cfg) => start(cfg || {}))
    .catch(() => start({}));
})();
