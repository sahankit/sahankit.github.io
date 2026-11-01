/** SEO metadata for batch 29 — Chrome built-in AI tools. */

const aiNote =
  "Requires desktop Chrome with built-in AI and enough free disk space. Text is processed on your device—not on Sahankit servers.";

export const batch29PageSeo = {
  "ai-translator.html": {
    metaTitle: "AI Translator Online — Chrome On-Device Translation",
    metaDescription:
      "Translate text privately with Chrome’s Translator API. On-device translation in desktop Chrome 138+—no signup.",
    keywords: "ai translator chrome, on device translation, chrome translator api",
    sections: [{ h2: "Private translation in Chrome", paragraphs: [aiNote, "Language packs download on first use for each pair you translate."] }],
    faqs: [{ q: "Does this work on mobile?", a: "No. Chrome’s Translator API is desktop-only as of Chrome 138." }],
    related: [
      { href: "/language-detector/", label: "Language detector" },
      { href: "/ai-writing/", label: "Chrome AI writing hub" },
    ],
  },
  "ai-meta-description-generator.html": {
    metaTitle: "AI Meta Description Generator — SEO Snippet Writer",
    metaDescription: "Generate SEO meta descriptions with Chrome Writer API. Under 160 characters—on-device AI, free.",
    keywords: "ai meta description generator, seo meta description writer, chrome ai writer",
    sections: [{ h2: "Meta descriptions with Chrome AI", paragraphs: [aiNote] }],
    related: [
      { href: "/meta-description-checker/", label: "Meta description checker" },
      { href: "/seo-lab/", label: "SEO lab" },
    ],
  },
  "ai-email-writer.html": {
    metaTitle: "AI Email Writer — Draft Emails in Chrome",
    metaDescription: "Draft professional emails from a short brief using Chrome’s Writer API. Free, on-device AI email writer.",
    keywords: "ai email writer, write email ai chrome, email generator free",
    sections: [{ h2: "Email drafts locally", paragraphs: [aiNote] }],
    related: [{ href: "/ai-writer/", label: "General AI writer" }, { href: "/ai-formalize-text/", label: "Formalize text" }],
  },
  "ai-product-description-writer.html": {
    metaTitle: "AI Product Description Writer — E-commerce Copy",
    metaDescription: "Generate product descriptions for online stores with Chrome Writer. Private browser AI copywriting.",
    keywords: "ai product description generator, ecommerce description writer, product copy ai",
    sections: [{ h2: "Product copy on-device", paragraphs: [aiNote] }],
    related: [{ href: "/amazon-title-character-counter/", label: "Amazon title counter" }, { href: "/ai-writing/", label: "AI writing hub" }],
  },
  "ai-cover-letter-writer.html": {
    metaTitle: "AI Cover Letter Writer — Job Application Draft",
    metaDescription: "Draft a cover letter from role and experience notes using Chrome Writer API. Free on-device AI.",
    keywords: "ai cover letter writer, cover letter generator free, job application ai",
    sections: [{ h2: "Cover letter drafts", paragraphs: [aiNote, "Always personalize before sending—AI drafts are starting points only."] }],
    related: [{ href: "/resume-builder/", label: "Resume builder" }, { href: "/ai-email-writer/", label: "AI email writer" }],
  },
  "ai-paraphrase-tool.html": {
    metaTitle: "AI Paraphrase Tool — Reword Text in Chrome",
    metaDescription: "Paraphrase text with Chrome’s Rewriter API. On-device rewording—private and free.",
    keywords: "ai paraphrase tool, paraphrase online chrome, reword text ai",
    sections: [{ h2: "Paraphrase with Rewriter", paragraphs: [aiNote] }],
    related: [{ href: "/text-rewriter/", label: "Text rewriter" }, { href: "/ai-simplify-text/", label: "Simplify text" }],
  },
  "ai-simplify-text.html": {
    metaTitle: "AI Simplify Text — Plain Language Tool",
    metaDescription: "Simplify complex text for easier reading with Chrome Rewriter. Shorter, clearer plain language.",
    keywords: "simplify text ai, plain language tool, simplify writing online",
    sections: [{ h2: "Plain language", paragraphs: [aiNote] }],
    related: [{ href: "/ai-formalize-text/", label: "Formalize text" }, { href: "/flesch-reading/", label: "Flesch reading score" }],
  },
  "ai-formalize-text.html": {
    metaTitle: "AI Formalize Text — Professional Tone Rewriter",
    metaDescription: "Make informal writing more formal with Chrome Rewriter API. Free professional tone tool.",
    keywords: "formalize text ai, make text formal, professional tone rewriter",
    sections: [{ h2: "Professional tone", paragraphs: [aiNote] }],
    related: [{ href: "/ai-email-writer/", label: "AI email writer" }, { href: "/grammar-checker/", label: "Grammar checker" }],
  },
  "ai-tldr-generator.html": {
    metaTitle: "AI TL;DR Generator — Short Summary Chrome AI",
    metaDescription: "Create a TL;DR summary of long text with Chrome Summarizer API. On-device, free TLDR generator.",
    keywords: "tldr generator ai, ai tldr, too long didnt read summary",
    sections: [{ h2: "TL;DR summaries", paragraphs: [aiNote] }],
    related: [{ href: "/summariser/", label: "Full AI summariser" }, { href: "/ai-meeting-notes-summarizer/", label: "Meeting notes" }],
  },
  "ai-meeting-notes-summarizer.html": {
    metaTitle: "AI Meeting Notes Summarizer — Key Points",
    metaDescription: "Summarize meeting notes into key points with Chrome Summarizer. Free on-device meeting summary.",
    keywords: "meeting notes summarizer ai, summarize meeting transcript, meeting summary tool",
    sections: [{ h2: "Meeting summaries", paragraphs: [aiNote] }],
    related: [{ href: "/ai-tldr-generator/", label: "TL;DR generator" }, { href: "/summariser/", label: "AI summariser" }],
  },
  "ai-social-post-writer.html": {
    metaTitle: "AI Social Post Writer — LinkedIn & Twitter Drafts",
    metaDescription: "Generate social media post drafts from a brief using Chrome Writer. Free on-device social copy AI.",
    keywords: "ai social media post generator, linkedin post writer ai, twitter post ai",
    sections: [{ h2: "Social drafts", paragraphs: [aiNote] }],
    related: [
      { href: "/linkedin-character-counter/", label: "LinkedIn counter" },
      { href: "/twitter-character-counter/", label: "Twitter counter" },
    ],
  },
  "ai-blog-intro-writer.html": {
    metaTitle: "AI Blog Intro Writer — Opening Paragraph Generator",
    metaDescription: "Write blog post introductions from title and outline with Chrome Writer API. Free AI blog intro.",
    keywords: "ai blog intro generator, blog introduction writer, opening paragraph ai",
    sections: [{ h2: "Blog introductions", paragraphs: [aiNote] }],
    related: [{ href: "/headline-analyzer/", label: "Headline analyzer" }, { href: "/reading-time/", label: "Reading time" }],
  },
};
