/** SEO for microsites and quiz. Keys match virtual file paths used in build. */

export const sitePageSeo = {
  "finance/index.html": {
    keywords: "India finance hub, GST EMI SIP calculators, income tax",
    sections: [
      {
        h2: "India finance in one place",
        paragraphs: [
          "Calculators for GST, income tax (new vs old regime), loans, FD/RD/SIP, salary, and invoices—all linked from this hub. Each tool runs in your browser.",
        ],
      },
    ],
    faqs: [{ q: "Is this investment advice?", a: "No. Illustrations only." }],
    related: [
      { href: "/income-tax-calculator/", label: "Income tax calculator" },
      { href: "/india/", label: "India utilities hub" },
      { href: "/gst-calculator/", label: "GST calculator" },
    ],
  },
  "dev/index.html": {
    keywords: "developer tools hub, hash base64 uuid json cron",
    sections: [{ h2: "Dev tools without install", paragraphs: ["Hash, encode, format JSON, and generate IDs locally."] }],
    faqs: [],
    related: [
      { href: "/security/", label: "Security tools hub" },
      { href: "/hash-generator/", label: "SHA-256" },
    ],
  },
  "seo-lab/index.html": {
    keywords: "SEO tools hub, domain age word counter meta tags",
    sections: [{ h2: "Small-site SEO stack", paragraphs: ["Check domain registration, meta tags, robots.txt, and content length."] }],
    faqs: [],
    related: [
      { href: "/osint/", label: "OSINT hub" },
      { href: "/domain-age/", label: "Domain age" },
    ],
  },
  "osint/index.html": {
    keywords: "osint hub, open source intelligence tools, username domain search",
    sections: [
      {
        h2: "Public OSINT toolkit",
        paragraphs: [
          "This mini-site groups OSINT-friendly utilities on Sahankit: the OSINT search link builder, domain age via RDAP, URL and email extractors, and network helpers. Use only for lawful research on public data.",
        ],
      },
      {
        h2: "Start here",
        paragraphs: ["Open the OSINT search page to generate username, domain, IP, and Google dork links in one place."],
      },
    ],
    faqs: [
      { q: "Is OSINT the same as hacking?", a: "No. OSINT uses publicly available information. Unauthorized system access is illegal." },
    ],
    related: [
      { href: "/osint-search/", label: "OSINT search hub page" },
      { href: "/domain-age/", label: "Domain age checker" },
      { href: "/seo-lab/", label: "SEO lab" },
    ],
  },
  "india/index.html": {
    keywords: "India online tools hub, tax GST UPI PAN calculator",
    sections: [
      {
        h2: "Tools for India — tax, money, and IDs",
        paragraphs: [
          "Compare new vs old income tax regime, estimate GST, PPF, and gratuity, validate UPI/PAN/IFSC/pincode patterns, and use invoice and rupee-in-words helpers. Not affiliated with the Government of India.",
        ],
      },
    ],
    faqs: [
      { q: "Which tool compares new and old tax regime?", a: "Use the income tax calculator linked at the top of this hub." },
    ],
    related: [
      { href: "/income-tax-calculator/", label: "Income tax (new vs old)" },
      { href: "/finance/", label: "Finance calculators" },
      { href: "/guides/india-id-formats.html", label: "India ID formats guide" },
    ],
  },
  "security/index.html": {
    keywords: "online security tools, hash password jwt hmac",
    sections: [
      {
        h2: "Browser-based security utilities",
        paragraphs: [
          "Generate and verify hashes, decode JWT payloads, check password strength, validate card numbers with Luhn, and create API keys—all client-side where noted.",
        ],
      },
    ],
    faqs: [{ q: "Is MD5 secure for passwords?", a: "No. Use slow password hashing in apps; MD5 here is for checksums and legacy compatibility only." }],
    related: [
      { href: "/dev/", label: "Developer hub" },
      { href: "/hash-generator/", label: "SHA-256 hash" },
      { href: "/jwt-decoder/", label: "JWT decoder" },
    ],
  },
  "design/index.html": {
    keywords: "design tools hub, color gradient PDF image",
    sections: [{ h2: "Design and documents", paragraphs: ["Colors, gradients, QR, PDF merge, and images."] }],
    faqs: [],
    related: [{ href: "/color-picker/", label: "Color picker" }],
  },
  "student/index.html": {
    keywords: "student tools hub, CGPA typing test",
    sections: [{ h2: "Tools for students", paragraphs: ["CGPA, typing, and chat for study groups."] }],
    faqs: [],
    related: [{ href: "/cgpa-calculator/", label: "CGPA tool" }],
  },
  "chat/index.html": {
    keywords: "free chat hub, Y-Chat rooms",
    sections: [{ h2: "Browser chat landing pages", paragraphs: ["Enter Y-Chat from themed landing URLs."] }],
    faqs: [],
    related: [{ href: "/y-chat/", label: "Y-Chat" }],
  },
  "writing/index.html": {
    keywords: "writing tools hub, text utilities markdown",
    sections: [{ h2: "Writing mini-site", paragraphs: ["All text and Markdown helpers in one hub."] }],
    faqs: [],
    related: [{ href: "/word-counter/", label: "Word counter" }],
  },
  "productivity/index.html": {
    keywords: "productivity hub, typing meeting pomodoro",
    sections: [{ h2: "Productivity mini-site", paragraphs: ["Typing, timers, meetings, and quick calculators."] }],
    faqs: [],
    related: [{ href: "/typing-test/", label: "Typing test" }],
  },
  "quiz/index.html": {
    keywords: "free online quiz, trivia browser",
    sections: [{ h2: "Quick trivia quiz", paragraphs: ["Ten questions on general knowledge, tech, and this site's tools. Refresh to replay."] }],
    faqs: [{ q: "Is score saved?", a: "No. Everything runs locally in one session." }],
    related: [{ href: "/student/", label: "Student hub" }],
  },
};
