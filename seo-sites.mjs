/** SEO for microsites and quiz. Keys match virtual file paths used in build. */

export const sitePageSeo = {
  "finance/index.html": {
    keywords: "India finance hub, GST EMI SIP calculators",
    sections: [{ h2: "India finance in one place", paragraphs: ["Calculators for GST, loans, savings, and invoices—all linked from this hub."] }],
    faqs: [{ q: "Is this investment advice?", a: "No. Illustrations only." }],
    related: [{ href: "/gst-calculator.html", label: "GST calculator" }],
  },
  "dev/index.html": {
    keywords: "developer tools hub, hash base64 uuid",
    sections: [{ h2: "Dev tools without install", paragraphs: ["Hash, encode, and generate IDs in the browser."] }],
    faqs: [],
    related: [{ href: "/hash-generator.html", label: "SHA-256" }],
  },
  "seo-lab/index.html": {
    keywords: "SEO tools hub, domain age word counter",
    sections: [{ h2: "Small-site SEO stack", paragraphs: ["Check domain registration and tune content length."] }],
    faqs: [],
    related: [{ href: "/domain-age.html", label: "Domain age" }],
  },
  "design/index.html": {
    keywords: "design tools hub, color gradient PDF",
    sections: [{ h2: "Design and documents", paragraphs: ["Colors, gradients, QR, PDF merge, and images."] }],
    faqs: [],
    related: [{ href: "/color-picker.html", label: "Color picker" }],
  },
  "student/index.html": {
    keywords: "student tools hub, CGPA typing test",
    sections: [{ h2: "Tools for students", paragraphs: ["CGPA, typing, and chat for study groups."] }],
    faqs: [],
    related: [{ href: "/cgpa-calculator.html", label: "CGPA tool" }],
  },
  "chat/index.html": {
    keywords: "free chat hub, Y-Chat rooms",
    sections: [{ h2: "Browser chat landing pages", paragraphs: ["Enter Y-Chat from themed landing URLs."] }],
    faqs: [],
    related: [{ href: "/y-chat/", label: "Y-Chat" }],
  },
  "writing/index.html": {
    keywords: "writing tools hub, text utilities",
    sections: [{ h2: "Writing mini-site", paragraphs: ["All text and Markdown helpers in one hub."] }],
    faqs: [],
    related: [{ href: "/word-counter.html", label: "Word counter" }],
  },
  "productivity/index.html": {
    keywords: "productivity hub, typing meeting planner",
    sections: [{ h2: "Productivity mini-site", paragraphs: ["Typing, meetings, and quick calculators."] }],
    faqs: [],
    related: [{ href: "/typing-test.html", label: "Typing test" }],
  },
  "quiz/index.html": {
    keywords: "free online quiz, trivia browser",
    sections: [{ h2: "Quick trivia quiz", paragraphs: ["Ten questions on general knowledge, tech, and this site's tools. Refresh to replay."] }],
    faqs: [{ q: "Is score saved?", a: "No. Everything runs locally in one session." }],
    related: [{ href: "/student/", label: "Student hub" }],
  },
};
