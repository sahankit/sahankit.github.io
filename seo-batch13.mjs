function t(kw, h2, p) {
  return { keywords: kw, sections: [{ h2, paragraphs: [p] }], faqs: [], related: [] };
}

const aiNote =
  "Requires desktop Chrome with built-in AI (Gemini Nano) and enough free disk space. Processing happens on your device.";

export const batch13PageSeo = {
  "grammar-checker.html": {
    metaTitle: "Grammar Checker — Chrome AI Proofreader Online",
    metaDescription:
      "Check grammar and spelling with Chrome’s Proofreader API. On-device proofreading when supported—private and free.",
    keywords: "grammar checker online, chrome ai proofreader, spell check browser",
    sections: [
      { h2: "Chrome built-in grammar check", paragraphs: [aiNote, "Paste text and run Check grammar to see suggested fixes from the Proofreader API."] },
    ],
    faqs: [{ q: "Does this upload my text?", a: "No. The Proofreader model runs locally in Chrome when available." }],
    related: [
      { href: "/ai-writing/", label: "Chrome AI writing hub" },
      { href: "/text-rewriter/", label: "AI rewriter" },
    ],
  },
  "sentence-splitter.html": t(
    "sentence splitter online",
    "Split into sentences",
    "Uses Intl.Segmenter when available—works in most modern browsers without AI.",
  ),
  "paragraph-splitter.html": t("paragraph splitter text", "Split paragraphs", "Split on blank lines or group every N sentences."),
  "text-summarizer.html": {
    metaTitle: "Text Summarizer — Chrome AI Summarizer",
    metaDescription: "Summarize articles with Chrome’s Summarizer API. Key points, TL;DR, headline modes.",
    keywords: "text summarizer chrome ai, summarize article online",
    canonicalPath: "/summariser/",
    sections: [
      {
        h2: "On-device summarization",
        paragraphs: [aiNote, 'Prefer the full experience? Use the <a href="/summariser/">AI summariser</a> page (same Chrome Summarizer API).'],
      },
    ],
    related: [{ href: "/summariser/", label: "AI summariser" }, { href: "/ai-writing/", label: "AI writing hub" }],
  },
  "text-rewriter.html": {
    metaTitle: "Text Rewriter — Chrome AI Rewriter",
    metaDescription: "Rewrite text formal or casual, shorter or longer, with Chrome’s Rewriter API.",
    keywords: "rewrite text ai chrome, paraphrase online",
    sections: [{ h2: "Rewrite with Chrome AI", paragraphs: [aiNote] }],
    related: [{ href: "/grammar-checker/", label: "Grammar checker" }],
  },
  "ai-writer.html": {
    metaTitle: "AI Writer — Chrome Writer API",
    metaDescription: "Generate drafts from a prompt using Chrome’s Writer API on supported desktops.",
    keywords: "ai writer chrome built-in, write email ai browser",
    sections: [{ h2: "Generate text locally", paragraphs: [aiNote] }],
    related: [{ href: "/lorem-ipsum/", label: "Lorem ipsum" }],
  },
  "language-detector.html": {
    metaTitle: "Language Detector — Chrome AI",
    metaDescription: "Detect text language with Chrome’s Language Detector API.",
    keywords: "language detector online chrome ai",
    sections: [{ h2: "Detect language", paragraphs: [aiNote] }],
    related: [{ href: "/word-counter/", label: "Word counter" }],
  },
};
