/** Shared helpers for Chrome built-in AI (Proofreader, Summarizer, Writer, Rewriter, LanguageDetector). */
window.ChromeAi = {
  hintHtml:
    '<p class="prose" style="font-size:0.85rem">Uses <strong>Chrome built-in AI</strong> on your device (Gemini Nano). Needs desktop Chrome with enough disk/RAM. Enable flags such as <code>chrome://flags/#proofreader-api</code>, <code>#summarizer-api-for-gemini-nano</code>, or <code>#rewriter-api</code> if the tool says unavailable. Text stays local—nothing is sent to this website’s server.</p>',

  has(apiName) {
    return apiName in globalThis && typeof globalThis[apiName]?.availability === "function";
  },

  async availability(apiName, options) {
    if (!this.has(apiName)) return "unsupported";
    try {
      return await globalThis[apiName].availability(options || {});
    } catch {
      return "unsupported";
    }
  },

  async create(apiName, options, onProgress) {
    const Cls = globalThis[apiName];
    const opts = { ...(options || {}) };
    if (onProgress) {
      opts.monitor = (m) => {
        m.addEventListener("downloadprogress", (e) => onProgress(e.loaded ?? 0));
      };
    }
    return await Cls.create(opts);
  },

  setProgress(el, pct) {
    if (!el) return;
    if (pct >= 0 && pct < 1) el.textContent = "Downloading on-device model… " + Math.round(pct * 100) + "%";
    else if (pct >= 1) el.textContent = "Model ready.";
  },

  async unavailableMessage(apiName) {
    const a = await this.availability(apiName);
    if (a === "unsupported") return "This browser does not expose " + apiName + ". Use desktop Chrome.";
    if (a === "unavailable") return apiName + " is unavailable on this device (storage, RAM, or OS).";
    return "";
  },
};
