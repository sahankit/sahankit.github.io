const aiNote =
  "Requires desktop Chrome with built-in AI (Gemini Nano) and enough free disk space. Processing happens on your device—not on Sahankit servers.";

export const batch17PageSeo = {
  "summariser.html": {
    metaTitle: "AI Summariser Online — Chrome Built-in Text Summarizer (Free)",
    metaDescription:
      "Summarise articles and long text with Chrome’s Summarizer API. Key points, TL;DR, headline, and teaser modes—private on-device AI, no signup.",
    keywords:
      "ai summariser, text summarizer chrome, summarise article online, chrome built-in ai summarizer, tldr generator free, key points summary",
    howTo: {
      name: "How to summarise text with Chrome AI",
      description: "Use the Summarizer API in desktop Chrome to create a short summary locally.",
      steps: [
        { name: "Paste your text", text: "Add an article, notes, or any English passage in the text box." },
        { name: "Choose type and length", text: "Pick key points, TL;DR, headline, or teaser, and short, medium, or long output." },
        { name: "Click Summarise", text: "Chrome downloads the on-device model if needed, then writes the summary. Copy or edit the result." },
      ],
    },
    sections: [
      {
        h2: "Chrome built-in AI summariser",
        paragraphs: [
          "This tool calls the browser’s Summarizer API (Gemini Nano). Your text is not sent to Sahankit—we do not run a summarization server.",
          aiNote,
        ],
      },
      {
        h2: "Summary types",
        paragraphs: [
          "Key points — bullet-style takeaways. TL;DR — one or two sentences. Headline — title-style line. Teaser — short promo blurb.",
        ],
      },
    ],
    faqs: [
      { q: "Why does it say unavailable?", a: "Use desktop Chrome, free disk space (~GB for the model), and flags such as summarizer-api-for-gemini-nano if the API is off." },
      { q: "Is this the same as ChatGPT?", a: "No. It uses Google’s on-device model in Chrome, not a cloud chat account." },
      { q: "Can I summarise PDFs?", a: "Copy text from the PDF first, or use our PDF to Word tool to extract text, then paste here." },
    ],
    related: [
      { href: "/ai-writing/", label: "Chrome AI writing hub" },
      { href: "/text-rewriter/", label: "AI rewriter" },
      { href: "/grammar-checker/", label: "Grammar checker" },
      { href: "/reading-time/", label: "Reading time" },
    ],
  },
};
