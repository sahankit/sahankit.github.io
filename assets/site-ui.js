"use strict";

/**
 * Site UX shared by every page:
 *  - tool search (home hero + header) backed by assets/tools-search.json
 *  - tool-page helpers: Enter runs the main action, live recalculation for numeric
 *    calculators, NaN/Infinity guard, copy buttons for read-only output, recent tools
 */
(function () {
  const RECENT_KEY = "tools:recent";
  const MAX_HITS = 12;

  /* ---------- Search ---------- */

  let indexPromise = null;
  function loadIndex() {
    indexPromise ??= fetch("/assets/tools-search.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) =>
        data.map((item) => ({
          ...item,
          _name: normalize(item.name),
          _blob: normalize([item.name, item.desc, item.cat, item.kw].filter(Boolean).join(" ")),
        })),
      )
      .catch((err) => {
        indexPromise = null;
        throw err;
      });
    return indexPromise;
  }

  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9₹%+#.\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlight(text, tokens) {
    let html = escapeHtml(text);
    if (!tokens.length) return html;
    const re = new RegExp(`(${tokens.map(escapeRe).sort((a, b) => b.length - a.length).join("|")})`, "gi");
    return html.replace(re, "<mark>$1</mark>");
  }

  function search(index, query) {
    const q = normalize(query);
    if (!q) return { hits: [], tokens: [] };
    const tokens = q.split(" ").filter(Boolean);
    const hits = [];
    for (const item of index) {
      let score = 0;
      let ok = true;
      for (const t of tokens) {
        if (item._name.includes(t)) score += item._name.split(" ").some((w) => w.startsWith(t)) ? 24 : 14;
        else if (item._blob.includes(t)) score += 6;
        else {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      if (item._name === q) score += 200;
      else if (item._name.startsWith(q)) score += 90;
      else if (item._name.includes(q)) score += 50;
      score -= item._name.length * 0.05;
      if (item.pop) score += 2 + item.pop * 0.1;
      hits.push({ item, score });
    }
    hits.sort((a, b) => b.score - a.score);
    return { hits: hits.slice(0, MAX_HITS).map((h) => h.item), tokens };
  }

  function initFinder(root) {
    const input = root.querySelector('input[type="search"]');
    const results = root.querySelector("[data-results]");
    const empty = root.querySelector("[data-empty]");
    if (!input || !results) return;

    let index = null;
    let active = -1;
    let lastHits = [];
    const listId = results.id || `${input.id || "tool-search"}-results`;
    results.id = listId;
    results.setAttribute("role", "listbox");
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-controls", listId);
    input.setAttribute("aria-expanded", "false");

    function setEmpty(text) {
      if (!empty) return;
      empty.textContent = text;
      empty.hidden = !text;
    }

    function setActive(i) {
      const links = results.querySelectorAll(".search-hit");
      links.forEach((a, n) => a.setAttribute("aria-selected", n === i ? "true" : "false"));
      active = i;
      if (links[i]) {
        input.setAttribute("aria-activedescendant", links[i].id);
        links[i].scrollIntoView({ block: "nearest" });
      } else input.removeAttribute("aria-activedescendant");
    }

    function render(hits, tokens) {
      lastHits = hits;
      results.innerHTML = "";
      active = -1;
      input.removeAttribute("aria-activedescendant");
      input.setAttribute("aria-expanded", hits.length ? "true" : "false");
      const frag = document.createDocumentFragment();
      hits.forEach((item, i) => {
        const a = document.createElement("a");
        a.className = "search-hit";
        a.href = item.href;
        a.id = `${listId}-${i}`;
        a.setAttribute("role", "option");
        a.innerHTML = `<strong>${highlight(item.name, tokens)}</strong><span>${escapeHtml(item.cat ? `${item.cat} · ` : "")}${highlight(item.desc, tokens)}</span>`;
        frag.appendChild(a);
      });
      results.appendChild(frag);
    }

    function run() {
      const q = input.value;
      if (!index) return;
      if (!normalize(q)) {
        render([], []);
        setEmpty(empty ? "Type to search tools by name or topic." : "");
        return;
      }
      const { hits, tokens } = search(index, q);
      render(hits, tokens);
      setEmpty(hits.length ? "" : "No match—try GST, PDF, loan, word, image, or tax.");
      if (!hits.length && !empty) {
        results.innerHTML = `<p class="search-none">No tools match “${escapeHtml(q)}”.</p>`;
      }
    }

    function ensureIndex() {
      return loadIndex()
        .then((data) => {
          index = data;
          run();
        })
        .catch(() => setEmpty("Search is unavailable right now—browse the categories below."));
    }

    input.addEventListener("input", () => (index ? run() : ensureIndex()));
    input.addEventListener("focus", () => (index ? run() : ensureIndex()), { once: false });

    input.addEventListener("keydown", (e) => {
      const count = results.querySelectorAll(".search-hit").length;
      if (e.key === "ArrowDown" && count) {
        e.preventDefault();
        setActive((active + 1) % count);
      } else if (e.key === "ArrowUp" && count) {
        e.preventDefault();
        setActive(active <= 0 ? count - 1 : active - 1);
      } else if (e.key === "Enter") {
        const target = lastHits[active >= 0 ? active : 0];
        if (target) {
          e.preventDefault();
          location.href = target.href;
        }
      } else if (e.key === "Escape") {
        if (input.value) input.value = "";
        render([], []);
        input.blur();
      }
    });

    root.addEventListener("submit", (e) => {
      if (lastHits[0]) {
        e.preventDefault();
        location.href = lastHits[active >= 0 ? active : 0].href;
      }
    });

    if (root.matches(".header-search")) {
      document.addEventListener("click", (e) => {
        if (!root.contains(e.target)) render([], []);
      });
    }

    return { input, ensureIndex };
  }

  const finders = [...document.querySelectorAll("[data-tool-finder]")].map(initFinder).filter(Boolean);
  const heroFinder = document.getElementById("tool-finder");
  const headerToggle = document.querySelector(".header-search-toggle");
  const header = document.querySelector(".site-header");

  if (headerToggle && header) {
    headerToggle.addEventListener("click", () => {
      const open = !header.classList.contains("is-searching");
      header.classList.toggle("is-searching", open);
      headerToggle.setAttribute("aria-expanded", String(open));
      if (open) document.getElementById("header-search-input")?.focus();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "/" || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    const el = document.activeElement;
    if (el && (el.isContentEditable || /^(input|textarea|select)$/i.test(el.tagName))) return;
    const target = finders[0]?.input;
    if (!target) return;
    e.preventDefault();
    header?.classList.add("is-searching");
    target.focus();
  });

  if (heroFinder) {
    const params = new URLSearchParams(location.search);
    const qParam = params.get("q");
    const hero = finders.find((f) => heroFinder.contains(f.input));
    if (hero) {
      if (qParam) hero.input.value = qParam;
      hero.ensureIndex();
      if (qParam || location.hash === "#find-tool" || params.get("find") === "1") {
        setTimeout(() => {
          hero.input.focus({ preventScroll: true });
          heroFinder.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      }
    }
  }

  /* ---------- Recent tools ---------- */

  function readRecent() {
    try {
      const list = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      return Array.isArray(list) ? list.filter((x) => x && typeof x.href === "string" && typeof x.name === "string") : [];
    } catch {
      return [];
    }
  }

  const panel = document.querySelector("main .tool-panel");
  const h1 = document.querySelector("main h1");
  if (panel && h1) {
    try {
      const href = location.pathname.replace(/\.html$/, "/");
      const list = readRecent().filter((x) => x.href !== href);
      list.unshift({ href, name: h1.textContent.trim().slice(0, 60) });
      localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 6)));
    } catch {
      /* storage blocked */
    }
  }

  const recentHost = document.querySelector("[data-recent-tools]");
  if (recentHost) {
    const list = readRecent();
    if (list.length) {
      recentHost.querySelector("[data-recent-list]").innerHTML = list
        .map((x) => `<a class="recent-chip" href="${escapeHtml(x.href)}">${escapeHtml(x.name)}</a>`)
        .join("");
      recentHost.hidden = false;
    }
  }

  /* ---------- Tool page helpers ---------- */

  if (!panel) return;

  const LIVE_ACTION = /^\s*(calculate|estimate|convert|compute|total|split|find|get|show|check bmi|annual|entropy|mpg)/i;
  const BAD_VALUE = /(^|[^A-Za-z])(NaN|-?Infinity)([^A-Za-z]|$)/;

  function primaryAction(scope) {
    return [...scope.querySelectorAll("button.primary")].find(
      (b) => !b.disabled && !/^\s*(copy|reset|clear|download|print)\b/i.test(b.textContent),
    );
  }

  function guardOutputs(scope) {
    scope.querySelectorAll("p, span, strong, div, td, output, li").forEach((el) => {
      if (el.children.length || el.closest("label, button")) return;
      const text = el.textContent;
      if (text.length > 160 || !(BAD_VALUE.test(text) || text.trim() === "undefined")) return;
      const inTile = el.closest(".stat, td, output");
      el.textContent = inTile ? "—" : "Enter valid numbers to see a result.";
      if (!inTile && el.classList.contains("ok")) {
        el.classList.remove("ok");
        el.classList.add("error");
      }
    });
    scope.querySelectorAll("input[readonly], textarea[readonly]").forEach((el) => {
      if (BAD_VALUE.test(el.value) && el.value.length < 160) el.value = "";
    });
  }

  function restoreOkClass(scope) {
    scope.querySelectorAll("p.error[data-was-ok]").forEach((el) => el.classList.replace("error", "ok"));
  }

  document.querySelectorAll("main .tool-panel").forEach((p) => {
    p.querySelectorAll("p.ok, div.ok").forEach((el) => el.setAttribute("data-was-ok", ""));
  });

  function afterRun(scope) {
    setTimeout(() => guardOutputs(scope), 0);
    setTimeout(() => guardOutputs(scope), 400);
  }

  document.querySelectorAll("main .tool-panel").forEach((p) => {
    guardOutputs(p);
    p.addEventListener(
      "click",
      (e) => {
        if (e.target.closest("button")) {
          restoreOkClass(p);
          afterRun(p);
        }
      },
      true,
    );
  });

  /* Enter in a single-line field runs the main action unless the page already did. */
  let enterPending = false;
  let enterHandled = false;
  document.addEventListener(
    "keydown",
    (e) => {
      enterPending = e.key === "Enter";
      enterHandled = false;
    },
    true,
  );
  document.addEventListener(
    "click",
    () => {
      if (enterPending) enterHandled = true;
    },
    true,
  );
  document.addEventListener("keydown", (e) => {
    const wasPending = enterPending;
    enterPending = false;
    if (!wasPending || e.key !== "Enter" || enterHandled || e.defaultPrevented || e.isComposing) return;
    const field = e.target;
    if (!(field instanceof HTMLInputElement) || /^(checkbox|radio|file|button|submit|search)$/i.test(field.type)) return;
    const scope = field.closest(".tool-panel");
    const btn = scope && primaryAction(scope);
    if (!btn) return;
    e.preventDefault();
    btn.click();
  });

  /* Numeric calculators recalculate as values change. */
  document.querySelectorAll("main .tool-panel").forEach((p) => {
    if (p.querySelector('input[type="file"]') || p.hasAttribute("data-no-live")) return;
    const btn = primaryAction(p);
    if (!btn || !LIVE_ACTION.test(btn.textContent)) return;
    let timer = 0;
    const onChange = (e) => {
      const el = e.target;
      if (p.dataset.live === "off" || !(el instanceof HTMLElement)) return;
      const liveField =
        el.matches('input[type="number"], input[type="range"], input[type="date"], input[type="time"], input[type="month"], input[type="radio"], input[type="checkbox"], select');
      if (!liveField) return;
      if (el.matches('input[type="number"]') && el.value !== "" && !el.checkValidity?.() && el.validity?.badInput) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const before = el.value;
        btn.click();
        if ("value" in el && el.value !== before) {
          el.value = before;
          p.dataset.live = "off";
        }
      }, e.type === "change" ? 0 : 280);
    };
    p.addEventListener("input", onChange);
    p.addEventListener("change", onChange);
  });

  /* Copy buttons for read-only results that lack one. */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    }
  }

  document.querySelectorAll("main .tool-panel").forEach((p) => {
    const hasCopy = [...p.querySelectorAll("button")].some((b) => /^\s*copy\b/i.test(b.textContent));
    if (hasCopy) return;
    const targets = p.querySelectorAll('textarea[readonly], input[readonly][type="text"], input[readonly]:not([type]), pre[id]');
    targets.forEach((el) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-mini";
      btn.textContent = "Copy";
      btn.setAttribute("aria-label", "Copy result");
      btn.addEventListener("click", async () => {
        const text = "value" in el && el.tagName !== "PRE" ? el.value : el.textContent;
        if (!text.trim()) return;
        const ok = await copyText(text);
        btn.textContent = ok ? "Copied ✓" : "Copy failed";
        btn.classList.toggle("is-copied", ok);
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("is-copied");
        }, 1400);
      });
      el.insertAdjacentElement("afterend", btn);
    });
  });
})();
