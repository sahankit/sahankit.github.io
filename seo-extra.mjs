/** SEO entries for tools-extra.mjs pages */

function toolSeo(keywords, h2, paragraph, faqs = [], related = [], metaTitle) {
  const entry = {
    keywords,
    sections: [{ h2, paragraphs: [paragraph] }],
    faqs,
    related,
  };
  if (metaTitle) entry.metaTitle = metaTitle;
  return entry;
}

export const extraPageSeo = {
  "qr-code-generator.html": toolSeo(
    "QR code generator, free QR code online, URL to QR",
    "Create QR codes for menus, posters, and links",
    "QR codes encode a URL or short text so phones can scan and open instantly. Generation happens in your browser; download PNG for print.",
    [{ q: "Do QR codes expire?", a: "Static QR codes do not expire—the data is in the image. If you change the URL later, generate a new code." }],
    [{ href: "/json-formatter.html", label: "JSON formatter" }, { href: "/guides/seo-checklist.html", label: "SEO checklist" }],
  ),
  "typing-test.html": toolSeo(
    "typing test, typing speed test, WPM test online",
    "Improve typing speed with timed tests",
    "A one-minute test using common English words gives a rough WPM and accuracy score. Practice regularly; accuracy matters more than speed for real work.",
    [{ q: "What is a good WPM?", a: "40–60 WPM is typical for everyday use; 70+ is fast for office work." }],
    [{ href: "/word-counter.html", label: "Word counter" }, { href: "/reading-time.html", label: "Reading time" }],
  ),
  "color-picker.html": toolSeo(
    "color picker, contrast ratio, hex rgb tool",
    "Accessible color contrast",
    "WCAG suggests at least 4.5:1 contrast for normal text. Use the ratio readout when picking text and background colors for sites and slides.",
    [],
    [{ href: "/gradient-generator.html", label: "Gradient generator" }],
  ),
  "gradient-generator.html": toolSeo(
    "CSS gradient generator, linear gradient online",
    "Copy-paste gradients for CSS",
    "Linear gradients add depth to headers and cards. Copy the generated background property into your stylesheet.",
    [],
    [{ href: "/color-picker.html", label: "Color picker" }],
  ),
  "image-compress.html": {
    metaTitle: "Image Compressor — Compress JPG/PNG Under 50KB, 100KB Online",
    metaDescription:
      "Compress a photo in your browser: lower JPEG quality or resize for form uploads (50 KB, 100 KB). No upload—private image compressor for JPG and PNG.",
    keywords:
      "compress image online, compress photo under 50kb, reduce jpg size, image compressor, shrink image for form upload, compress jpeg, image optimizer browser",
    directAnswer:
      "Drag a JPG or PNG, set JPEG quality with the slider, and download a smaller file. For an exact KB cap (e.g. 20 KB signature or 50 KB exam photo), use the reduce image size in KB tool linked below.",
    sections: [
      {
        h2: "Compress image under 50 KB or 100 KB for forms",
        paragraphs: [
          "Government and exam portals often cap photo uploads at 20–50 KB while keeping minimum dimensions. This compressor reduces file size by re-encoding to JPEG at your chosen quality—start around 0.6–0.75 for portraits.",
          "Need a precise target? Open <a href=\"/reduce-image-size-in-kb/\">Reduce image size in KB</a> to hit 20 KB, 50 KB, or 100 KB with optional width × height limits.",
        ],
      },
      {
        h2: "Private compression (no cloud upload)",
        paragraphs: [
          "The image is drawn to a canvas and exported as JPEG in your browser. Nothing is sent to ToolHQ servers—suitable for ID proofs, signatures, and coursework scans.",
        ],
      },
    ],
    faqs: [
      { q: "How do I compress a photo under 50 KB?", a: "Lower the quality slider and download. If still too large, use Reduce image size in KB with target 50 and crop excess background first." },
      { q: "PNG support?", a: "You can upload PNG; output is JPEG for smaller size. Transparency becomes white in the JPEG." },
      { q: "Will compression change width and height?", a: "This tool keeps original pixels and only changes JPEG quality. To resize dimensions, use the image resizer or reduce image size in KB tool." },
    ],
    related: [
      { href: "/reduce-image-size-in-kb/", label: "Reduce image size in KB" },
      { href: "/image-cropper/", label: "Crop image" },
      { href: "/passport-size-photo/", label: "Passport size photo" },
      { href: "/compress-pdf/", label: "Compress PDF" },
    ],
  },
  "pdf-merge.html": toolSeo(
    "merge pdf online, combine pdf free, pdf join browser",
    "Merge PDFs without uploading to a cloud",
    "pdf-lib runs locally to stitch pages in the order you select files.",
    [{ q: "Is there a file limit?", a: "Limited by your browser memory—keep batches modest on mobile." }],
    [
      { href: "/pdf-to-word.html", label: "PDF to Word" },
      { href: "/word-to-pdf.html", label: "Word to PDF" },
      { href: "/india-invoice.html", label: "GST invoice" },
    ],
  ),
  "meeting-planner.html": toolSeo(
    "time zone meeting planner, world clock meeting",
    "Schedule across time zones",
    "Pick your local time and compare how it appears in another IANA time zone—handy for remote teams.",
    [],
    [{ href: "/epoch-converter.html", label: "Epoch converter" }],
  ),
  "cron-helper.html": toolSeo(
    "cron expression helper, crontab explain, cron readable",
    "Readable cron descriptions",
    "Paste a standard five-field cron string to see when it runs in plain English.",
    [],
    [{ href: "/hash-generator.html", label: "Hash generator" }],
  ),
  "india-invoice.html": toolSeo(
    "GST invoice generator India, simple invoice print, invoice template",
    "Printable invoice template",
    "Fill seller, buyer, GSTIN, and line items then print or save as PDF from the browser. Not a GST filing system.",
    [{ q: "Is this legally valid?", a: "Use your CA and official billing software for compliance; this is a starter layout." }],
    [{ href: "/gst-calculator.html", label: "GST calculator" }, { href: "/inr-words.html", label: "INR in words" }],
  ),
  "inr-words.html": toolSeo(
    "amount in words rupees, cheque amount in words India, INR words",
    "Indian numbering in words",
    "Uses lakh and crore grouping common on Indian cheques and invoices.",
    [],
    [{ href: "/india-invoice.html", label: "GST invoice" }, { href: "/gst-calculator.html", label: "GST calculator" }],
  ),
  "compound-interest.html": toolSeo(
    "compound interest calculator, lump sum investment India",
    "Compound growth on a single deposit",
    "Choose compounding frequency to model FD-like or investment growth. Illustration only.",
    [],
    [{ href: "/fd-calculator.html", label: "FD calculator" }, { href: "/sip-calculator.html", label: "SIP calculator" }],
  ),
  "fd-calculator.html": toolSeo(
    "FD calculator India, fixed deposit maturity",
    "Fixed deposit maturity estimate",
    "Assumes quarterly compounding typical of many bank FDs. Rates differ by bank and tenure.",
    [],
    [{ href: "/rd-calculator.html", label: "RD calculator" }, { href: "/compound-interest.html", label: "Compound interest" }],
  ),
  "rd-calculator.html": toolSeo(
    "RD calculator India, recurring deposit calculator",
    "Recurring deposit estimate",
    "Models equal monthly deposits with monthly compounding at the stated annual rate.",
    [],
    [{ href: "/fd-calculator.html", label: "FD calculator" }, { href: "/sip-calculator.html", label: "SIP calculator" }],
  ),
  "cgpa-calculator.html": toolSeo(
    "CGPA to percentage, CGPA calculator India",
    "CGPA conversion formulas",
    "Schools use different multipliers (9.5× and 10× are common). Confirm with your institution.",
    [],
    [{ href: "/percentage-calculator.html", label: "Percentage calculator" }],
  ),
  "fuel-cost-calculator.html": toolSeo(
    "fuel cost calculator trip, petrol cost India km",
    "Road trip fuel budget",
    "Enter distance, vehicle mileage, and pump price to estimate litres and rupees.",
    [],
    [{ href: "/tip-calculator.html", label: "Tip calculator" }],
  ),
  "salary-calculator.html": toolSeo(
    "in hand salary calculator India, CTC to in hand estimate",
    "Quick in-hand salary estimate",
    "A lightweight monthly estimate from CTC with PF and new-regime tax. For full CTC structure, HRA, old vs new regime, and 87A, use the salary breakup calculator.",
    [
      {
        q: "How is this different from the salary breakup calculator?",
        a: "This page is a rough in-hand estimate. The salary breakup calculator models CTC components, HRA, deductions, and tax-optimized structure.",
      },
      { q: "Does it calculate TDS?", a: "It uses the shared FY 2026–27 new-regime tax engine—not a payroll TDS ledger." },
    ],
    [
      { href: "/salary-breakup-calculator.html", label: "Salary breakup (tax)" },
      { href: "/income-tax-calculator.html", label: "Income tax calculator" },
      { href: "/ctc-to-in-hand-calculator.html", label: "CTC to in-hand" },
    ],
  ),
  "free-online-chat.html": toolSeo(
    "free online chat, chat rooms no download, Y-Chat, free chat rooms browser",
    "Browser chat without install",
    "Y-Chat offers public rooms and private messaging on the same GitHub Pages site under /y-chat/. Adults must accept terms.",
    [{ q: "Is Y-Chat free?", a: "Yes. It runs in the browser; see terms on the chat site." }],
    [{ href: "/y-chat/", label: "Open Y-Chat" }, { href: "/hindi-chat.html", label: "Hindi chat" }],
    "Free Online Chat Rooms — No Download (Y-Chat)",
  ),
  "hindi-chat.html": toolSeo(
    "Hindi chat room online, free Hindi chat, Hindi chat room",
    "Chat in Hindi in your browser",
    "Use Y-Chat rooms and type in Hindi. Follow community rules and 18+ terms.",
    [],
    [{ href: "/y-chat/", label: "Y-Chat" }, { href: "/free-online-chat.html", label: "Free online chat" }],
    "Hindi Chat Room Online Free — Browser Chat (Y-Chat)",
  ),
  "study-chat.html": toolSeo(
    "study chat online, group study chat room, study together chat",
    "Study together in chat",
    "Coordinate homework and revision in a Y-Chat room alongside our student-friendly calculators.",
    [],
    [{ href: "/y-chat/", label: "Y-Chat" }, { href: "/cgpa-calculator.html", label: "CGPA calculator" }],
    "Study Chat & Group Study Online — Free (Y-Chat)",
  ),
  "guides/india-finance-tools.html": toolSeo(
    "India finance calculator, GST SIP FD tools",
    "Finance tools for India",
    "Links to GST, SIP, FD, RD, invoice, and salary tools on this site.",
    [],
    [{ href: "/gst-calculator.html", label: "GST calculator" }],
  ),
  "guides/design-pdf-tools.html": toolSeo(
    "PDF merge online, QR generator, color tools",
    "Design and file utilities",
    "Overview of color, gradient, QR, PDF, and image tools.",
    [],
    [{ href: "/qr-code-generator.html", label: "QR generator" }],
  ),
  "lorem-ipsum.html": toolSeo(
    "lorem ipsum generator, placeholder text",
    "Placeholder copy for mockups",
    "Generate neutral Latin filler for wireframes and design comps.",
    [],
    [{ href: "/word-counter.html", label: "Word counter" }],
  ),
  "url-encoder.html": toolSeo(
    "URL encode, decodeURIComponent online",
    "When to URL-encode",
    "Use encoding for query parameters and special characters in URLs.",
    [],
    [{ href: "/base64-encoder.html", label: "Base64" }],
  ),
  "html-entities.html": toolSeo(
    "HTML entity encoder, escape HTML online",
    "Escape user content",
    "Prevent accidental HTML injection when pasting text into templates.",
    [],
    [{ href: "/json-formatter.html", label: "JSON formatter" }],
  ),
  "guides/y-chat-guide.html": toolSeo(
    "Y-Chat guide, free chat rooms browser",
    "Using Y-Chat",
    "How to open chat rooms and related landing pages on this site.",
    [],
    [{ href: "/y-chat/", label: "Y-Chat" }],
  ),
};
