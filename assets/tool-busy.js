"use strict";

/**
 * Loading states for tool panels: spinner on the action button plus a status line.
 * Wraps async click handlers inside .tool-panel; busy UI appears only if the work
 * is still running after a short delay, so instant results and early validation
 * messages are never overwritten.
 */
(function () {
  const PATCHED = "data-tool-busy-patched";
  const DELAY_MS = 150;
  const PLACEHOLDER = "Working…";

  function findStatus(panel) {
    return panel ? panel.querySelector("#status, #msg, .tool-feedback") : null;
  }

  function fileGateDisabled(panel) {
    const fi = panel && panel.querySelector('input[type="file"]');
    return !!fi && !(fi.files && fi.files.length);
  }

  const ToolBusy = {
    start(panel, btn, statusEl, message) {
      if (panel) {
        panel.classList.add("is-processing");
        panel.setAttribute("aria-busy", "true");
      }
      if (btn && !btn.classList.contains("is-busy")) {
        btn.dataset.busyHtml = btn.innerHTML;
        btn.classList.add("is-busy");
        btn.disabled = true;
        btn.insertAdjacentHTML("afterbegin", '<span class="tool-btn-spinner" aria-hidden="true"></span>');
      }
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.dataset.busy = "1";
        if (message || !statusEl.textContent.trim()) {
          statusEl.textContent = message || PLACEHOLDER;
          statusEl.dataset.busyText = statusEl.textContent;
        }
      }
    },

    setMessage(statusEl, message) {
      if (!statusEl || message == null) return;
      statusEl.hidden = false;
      statusEl.textContent = message;
    },

    stop(panel, btn, statusEl) {
      if (panel) {
        panel.classList.remove("is-processing");
        panel.removeAttribute("aria-busy");
      }
      if (btn && btn.classList.contains("is-busy")) {
        btn.classList.remove("is-busy");
        if (btn.dataset.busyHtml != null) {
          btn.innerHTML = btn.dataset.busyHtml;
          delete btn.dataset.busyHtml;
        }
        btn.disabled = fileGateDisabled(panel);
      }
      if (statusEl) {
        delete statusEl.dataset.busy;
        if (statusEl.dataset.busyText && statusEl.textContent === statusEl.dataset.busyText) {
          statusEl.textContent = "";
        }
        delete statusEl.dataset.busyText;
      }
    },
  };
  window.ToolBusy = ToolBusy;

  function signalToolComplete() {
    window.__toolCompleteFired = true;
    document.dispatchEvent(new CustomEvent("tool:complete"));
  }

  function flashCopied(btn) {
    if (btn.dataset.copyLabel) return;
    btn.dataset.copyLabel = btn.innerHTML;
    btn.classList.add("is-copied");
    btn.textContent = "Copied ✓";
    setTimeout(() => {
      btn.innerHTML = btn.dataset.copyLabel;
      delete btn.dataset.copyLabel;
      btn.classList.remove("is-copied");
    }, 1400);
  }

  function patchButton(btn) {
    if (btn.hasAttribute(PATCHED)) return;
    const orig = btn.onclick;
    if (typeof orig !== "function") return;
    const panel = btn.closest(".tool-panel");
    const isCopy = /^\s*copy\b/i.test(btn.textContent);
    btn.setAttribute(PATCHED, "1");
    btn.onclick = function (ev) {
      if (btn.classList.contains("is-busy")) return undefined;
      const result = orig.call(this, ev);
      if (isCopy) {
        Promise.resolve(result).then(() => flashCopied(btn), () => {});
        return result;
      }
      if (!result || typeof result.then !== "function") {
        if (!isCopy) signalToolComplete();
        return result;
      }
      const status = findStatus(panel);
      let started = false;
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        started = true;
        ToolBusy.start(panel, btn, status);
      }, DELAY_MS);
      return Promise.resolve(result).finally(() => {
        settled = true;
        clearTimeout(timer);
        if (started) ToolBusy.stop(panel, btn, status);
        if (!isCopy) signalToolComplete();
      });
    };
  }

  function patchAll() {
    document.querySelectorAll(".tool-panel button.primary").forEach(patchButton);
  }

  /** Primary buttons without .onclick (addEventListener only) still reveal ads after use. */
  function bindPrimaryClicks() {
    document.querySelectorAll("main .tool-panel button.primary").forEach((btn) => {
      if (btn.hasAttribute("data-tool-ad-bound")) return;
      if (/^\s*copy\b/i.test(btn.textContent)) return;
      btn.setAttribute("data-tool-ad-bound", "1");
      btn.addEventListener(
        "click",
        () => {
          setTimeout(signalToolComplete, 0);
        },
        { capture: true },
      );
    });
  }

  function init() {
    patchAll();
    bindPrimaryClicks();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
  window.addEventListener("load", init);
})();
