"use strict";

/** Lightweight GA4 engagement events (after gtag loads). */
(function () {
  const host = location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return;

  function toolName() {
    const h1 = document.querySelector("main h1");
    return (h1 && h1.textContent ? h1.textContent.trim() : "") || location.pathname;
  }

  function send(name, params) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params);
  }

  document.addEventListener(
    "click",
    (e) => {
      const hit = e.target.closest("#tool-finder a.search-hit");
      if (hit) {
        send("select_tool_search", { link_url: hit.getAttribute("href") || "", page_path: location.pathname });
        return;
      }
      const btn = e.target.closest("main button.primary, main .tool-panel button:not(.secondary)");
      if (btn) {
        send("tool_action", { tool_name: toolName().slice(0, 80), page_path: location.pathname });
      }
    },
    true,
  );

  const finder = document.getElementById("tool-finder");
  const input = finder && finder.querySelector('input[type="search"]');
  if (input) {
    let lastQ = "";
    input.addEventListener(
      "change",
      () => {
        const q = String(input.value || "").trim();
        if (q.length < 2 || q === lastQ) return;
        lastQ = q;
        send("tool_search", { search_term: q.slice(0, 80) });
      },
      { passive: true },
    );
  }
})();
