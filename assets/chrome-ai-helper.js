/** Shared helpers for Chrome built-in AI (Proofreader, Summarizer, Writer, Rewriter, LanguageDetector). */
window.ChromeAi = {
  hintHtml:
    '<p class="prose" style="font-size:0.85rem">Uses <strong>Chrome built-in AI</strong> on your device (Gemini Nano). Needs desktop Chrome with enough disk/RAM. Enable flags such as <code>chrome://flags/#proofreader-api</code>, <code>#summarizer-api-for-gemini-nano</code>, <code>#rewriter-api</code>, <code>#writer-api</code>, or <code>#translation-api</code> if the tool says unavailable. Text stays local—nothing is sent to this website’s server.</p>',

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
    const msg =
      pct >= 0 && pct < 1
        ? "Downloading on-device model… " + Math.round(pct * 100) + "%"
        : pct >= 1
          ? "Model ready."
          : "";
    if (window.ToolBusy?.setMessage) window.ToolBusy.setMessage(el, msg);
    else el.textContent = msg;
  },

  async unavailableMessage(apiName) {
    const a = await this.availability(apiName);
    if (a === "unsupported") return "This browser does not expose " + apiName + ". Use desktop Chrome.";
    if (a === "unavailable") return apiName + " is unavailable on this device (storage, RAM, or OS).";
    return "";
  },

  /** Writer API — generate text from a prompt. */
  async runWriter({ prompt, context, tone, length, statusEl, outEl }) {
    outEl.value = "";
    if (!prompt.trim()) {
      statusEl.className = "error";
      statusEl.textContent = "Enter a prompt or topic first.";
      return;
    }
    if (!this.has("Writer")) {
      statusEl.className = "error";
      statusEl.textContent = "Writer API not found. Enable chrome://flags/#writer-api in Chrome.";
      return;
    }
    statusEl.className = "tool-feedback";
    statusEl.textContent = "Writing…";
    let writer;
    try {
      const opts = { tone: tone || "neutral", length: length || "medium", format: "plain-text" };
      const avail = await this.availability("Writer", opts);
      if (avail === "unavailable") {
        statusEl.className = "error";
        statusEl.textContent = await this.unavailableMessage("Writer");
        return;
      }
      if (avail === "downloadable" || avail === "downloading") statusEl.textContent = "Preparing on-device model…";
      writer = await this.create("Writer", opts, (p) => this.setProgress(statusEl, p));
      outEl.value = await writer.write(prompt, context ? { context } : {});
      statusEl.className = "ok";
      statusEl.textContent = "Done. Review before publishing.";
    } catch (e) {
      statusEl.className = "error";
      statusEl.textContent = e.message || String(e);
    } finally {
      writer?.destroy?.();
    }
  },

  /** Rewriter API — rewrite existing text. */
  async runRewriter({ text, tone, length, statusEl, outEl }) {
    outEl.value = "";
    if (!text.trim()) {
      statusEl.className = "error";
      statusEl.textContent = "Paste text first.";
      return;
    }
    if (!this.has("Rewriter")) {
      statusEl.className = "error";
      statusEl.textContent = "Rewriter API not found. Enable chrome://flags/#rewriter-api in Chrome.";
      return;
    }
    statusEl.className = "tool-feedback";
    statusEl.textContent = "Rewriting…";
    let rewriter;
    try {
      const opts = {
        tone: tone || "as-is",
        length: length || "as-is",
        format: "plain-text",
        expectedInputLanguages: ["en"],
      };
      const avail = await this.availability("Rewriter", opts);
      if (avail === "unavailable") {
        statusEl.className = "error";
        statusEl.textContent = await this.unavailableMessage("Rewriter");
        return;
      }
      rewriter = await this.create("Rewriter", opts, (p) => this.setProgress(statusEl, p));
      outEl.value = await rewriter.rewrite(text);
      statusEl.className = "ok";
      statusEl.textContent = "Done.";
    } catch (e) {
      statusEl.className = "error";
      statusEl.textContent = e.message || String(e);
    } finally {
      rewriter?.destroy?.();
    }
  },

  /** Summarizer API — optional streaming into a textarea. */
  async runSummarizer({ text, type, length, statusEl, outEl, stream }) {
    outEl.value = "";
    if (!text.trim()) {
      statusEl.className = "error";
      statusEl.textContent = "Paste text first.";
      return;
    }
    if (!this.has("Summarizer")) {
      statusEl.className = "error";
      statusEl.textContent = "Summarizer API not found. Use Chrome 138+ desktop.";
      return;
    }
    statusEl.className = "tool-feedback";
    statusEl.textContent = "Summarising…";
    let summarizer;
    try {
      const opts = {
        type: type || "key-points",
        format: "markdown",
        length: length || "medium",
        expectedInputLanguages: ["en"],
      };
      const avail = await this.availability("Summarizer", opts);
      if (avail === "unavailable") {
        statusEl.className = "error";
        statusEl.textContent = await this.unavailableMessage("Summarizer");
        return;
      }
      summarizer = await this.create("Summarizer", opts, (p) => this.setProgress(statusEl, p));
      if (stream && typeof summarizer.summarizeStreaming === "function") {
        const s = summarizer.summarizeStreaming(text);
        for await (const chunk of s) {
          const part = typeof chunk === "string" ? chunk : (chunk && chunk.text) || "";
          outEl.value += part;
        }
      } else {
        const summary = await summarizer.summarize(text);
        outEl.value = typeof summary === "string" ? summary : (summary && summary.summary) || String(summary);
      }
      statusEl.className = "ok";
      statusEl.textContent = "Done. AI summaries can miss nuance.";
    } catch (e) {
      statusEl.className = "error";
      statusEl.textContent = e.message || String(e);
    } finally {
      summarizer?.destroy?.();
    }
  },

  /** Translator API — on-device translation (Chrome 138+ desktop). */
  async runTranslator({ text, sourceLanguage, targetLanguage, statusEl, outEl, stream }) {
    outEl.value = "";
    if (!text.trim()) {
      statusEl.className = "error";
      statusEl.textContent = "Enter text to translate.";
      return;
    }
    if (sourceLanguage === targetLanguage) {
      statusEl.className = "error";
      statusEl.textContent = "Pick different source and target languages.";
      return;
    }
    if (!this.has("Translator")) {
      statusEl.className = "error";
      statusEl.textContent = "Translator API not found. Use Chrome 138+ desktop and chrome://flags/#translation-api if needed.";
      return;
    }
    statusEl.className = "tool-feedback";
    statusEl.textContent = "Translating…";
    let translator;
    try {
      const opts = { sourceLanguage, targetLanguage };
      const avail = await this.availability("Translator", opts);
      if (avail === "unavailable") {
        statusEl.className = "error";
        statusEl.textContent = await this.unavailableMessage("Translator");
        return;
      }
      if (avail === "downloadable" || avail === "downloading") statusEl.textContent = "Downloading language pack…";
      translator = await this.create("Translator", opts, (p) => this.setProgress(statusEl, p));
      if (stream && typeof translator.translateStreaming === "function") {
        const s = translator.translateStreaming(text);
        for await (const chunk of s) outEl.value += chunk;
      } else {
        outEl.value = await translator.translate(text);
      }
      statusEl.className = "ok";
      statusEl.textContent = "Done.";
    } catch (e) {
      statusEl.className = "error";
      statusEl.textContent = e.message || String(e);
    } finally {
      translator?.destroy?.();
    }
  },
};
