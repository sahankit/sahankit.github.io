/** SEO prose, FAQs, and keywords per page (used by build-site.mjs). */
import { SITE_NAME } from "./seo-build.mjs";

export function renderSeoHtml(seo) {
  if (!seo) return "";
  let html = '<section class="page-guide" aria-label="Guide and FAQ">';
  if (seo.sections?.length) {
    html += '<div class="prose seo-content">';
    for (const s of seo.sections) {
      html += `<h2>${s.h2}</h2>`;
      for (const p of s.paragraphs || []) html += `<p>${p}</p>`;
      if (s.list) {
        html += "<ul>";
        for (const li of s.list) html += `<li>${li}</li>`;
        html += "</ul>";
      }
    }
    html += "</div>";
  }
  if (seo.faqs?.length) {
    html += '<div class="faq"><h2>Frequently asked questions</h2>';
    seo.faqs.forEach((f, i) => {
      html += `<details class="faq-item"${i === 0 ? " open" : ""}><summary><h3>${f.q}</h3></summary><div class="faq-answer"><p>${f.a}</p></div></details>`;
    });
    html += "</div>";
  }
  if (seo.related?.length) {
    html += '<div class="prose"><h2>Related free tools</h2><ul class="link-list">';
    for (const r of seo.related) html += `<li><a href="${r.href}">${r.label}</a></li>`;
    html += "</ul></div>";
  }
  html += "</section>";
  return html;
}

export function jsonLdGraph(items) {
  if (!items.length) return "";
  const payload = items.length === 1 ? items[0] : { "@context": "https://schema.org", "@graph": items };
  return `<script type="application/ld+json">${JSON.stringify(payload)}</script>`;
}

export function webPageLd(title, desc, urlPath, base) {
  return {
    "@type": "WebPage",
    name: title,
    description: desc,
    url: `${base}${urlPath}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${base}/` },
  };
}

export function faqLd(faqs) {
  if (!faqs?.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
    })),
  };
}

export function softwareAppLd(title, desc, urlPath, base) {
  return {
    "@type": "SoftwareApplication",
    name: title.split("—")[0].trim(),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: desc,
    url: `${base}${urlPath}`,
  };
}

const rel = {
  word: { href: "/word-counter.html", label: "Word counter" },
  char: { href: "/character-counter.html", label: "Character counter" },
  case: { href: "/case-converter.html", label: "Case converter" },
  json: { href: "/json-formatter.html", label: "JSON formatter" },
  epoch: { href: "/epoch-converter.html", label: "Epoch converter" },
  bmi: { href: "/bmi-calculator.html", label: "BMI calculator" },
  pct: { href: "/percentage-calculator.html", label: "Percentage calculator" },
  emi: { href: "/emi-calculator.html", label: "EMI calculator" },
  tip: { href: "/tip-calculator.html", label: "Tip calculator" },
  age: { href: "/age-calculator.html", label: "Age calculator" },
  ifsc: { href: "/ifsc-format.html", label: "IFSC format checker" },
  pan: { href: "/pan-format.html", label: "PAN format checker" },
  domain: { href: "/domain-age.html", label: "Domain age checker" },
  reading: { href: "/reading-time.html", label: "Reading time calculator" },
  gst: { href: "/gst-calculator.html", label: "GST calculator" },
  sip: { href: "/sip-calculator.html", label: "SIP calculator" },
  hash: { href: "/hash-generator.html", label: "SHA-256 hash generator" },
  b64: { href: "/base64-encoder.html", label: "Base64 encoder" },
  uuid: { href: "/uuid-generator.html", label: "UUID generator" },
  pwd: { href: "/password-generator.html", label: "Password generator" },
  writing: { href: "/guides/writing-tools.html", label: "Writing tools guide" },
  seo: { href: "/guides/seo-checklist.html", label: "SEO checklist" },
  india: { href: "/guides/india-id-formats.html", label: "India ID formats guide" },
};

export const indexSeo = {
  keywords:
    "free online tools, free calculator, income tax calculator India, GST calculator, EMI calculator, word counter, character counter, PDF merge, password generator, typing test, developer tools, SEO tools",
  sections: [
    {
      h2: "Free browser tools for writing, math, and everyday tasks",
      paragraphs: [
        "Tools is a collection of lightweight calculators and text utilities that run entirely in your browser. There is no app install, no account, and no server-side storage of what you type into a tool.",
        "Use word counters, typing tests, QR codes, PDF merge, and image tools without uploading to our servers. India pages cover GST, invoices, FD/RD/SIP, CGPA, and salary estimates. Chat landing pages link to free Y-Chat rooms at /y-chat/. IFSC and PAN checkers validate format only—not government records.",
      ],
    },
    {
      h2: "High-traffic tools people search for",
      paragraphs: [
        'Jump straight to common searches: <a href="/word-counter/">word counter</a>, <a href="/character-counter/">character counter</a>, <a href="/income-tax-calculator/">income tax calculator (India)</a>, <a href="/gst-calculator/">GST calculator</a>, <a href="/home-loan-calculator/">home loan EMI</a>, <a href="/pdf-merge/">merge PDF</a>, <a href="/password-generator/">password generator</a>, <a href="/ai-meta-description-generator/">AI meta description</a>, and <a href="/free-online-chat/">free online chat</a>.',
      ],
    },
    {
      h2: "Privacy and how these tools work",
      paragraphs: [
        "Each page loads static HTML and JavaScript from GitHub Pages. Calculations happen on your device. We do not log your input text on a backend because there is no backend for the tools themselves.",
      ],
      list: [
        "Open a tool, enter values, read the result immediately.",
        "Bookmark individual tool pages you use often.",
        "Read the guides for writing, SEO, and India ID format basics.",
      ],
    },
    {
      h2: "Specialized mini-sites",
      paragraphs: [
        'Browse focused hubs: <a href="/finance/">Finance (India)</a>, <a href="/dev/">Developer</a>, <a href="/seo-lab/">SEO lab</a>, <a href="/design/">Design</a>, <a href="/student/">Student</a>, <a href="/chat/">Chat</a>, and <a href="/quiz/">Quiz</a>.',
      ],
    },
    {
      h2: "Also try Y-Chat",
      paragraphs: [
        'Looking for conversation? <a href="/y-chat/">Y-Chat</a> offers free Yahoo-style chat rooms and a private messenger in the browser on the same GitHub Pages site under <code>/y-chat/</code>.',
      ],
    },
  ],
  faqs: [
    {
      q: "How do I find a specific tool?",
      a: "Use the search box at the top of the home page, or open a topic hub (Finance, Developer, India, and others) for a shorter list.",
    },
    {
      q: "Are these tools free?",
      a: "Yes. Every calculator and text tool on this site is free to use in the browser.",
    },
    {
      q: "Do I need to create an account?",
      a: "No account is required for any tool page.",
    },
    {
      q: "Where is the sitemap for search engines?",
      a: 'See <a href="/sitemap.xml">sitemap.xml</a> linked in the footer.',
    },
  ],
};

export const pageSeo = {
  "word-counter.html": {
    keywords: "word counter, word count, character count, paragraph counter, free word counter online",
    sections: [
      {
        h2: "What does this word counter count?",
        paragraphs: [
          "The counter updates as you type. Words are groups of characters separated by spaces. Characters include letters, numbers, punctuation, and spaces. The paragraph count splits on blank lines.",
        ],
      },
      {
        h2: "Who uses an online word counter?",
        paragraphs: [
          "Students check essay length, bloggers hit SEO targets, and editors enforce briefs. Meta descriptions often aim for roughly 150–160 characters—pair this tool with the character counter for precision.",
        ],
      },
    ],
    faqs: [
      { q: "Is text uploaded to a server?", a: "No. Counting runs locally in your browser." },
      { q: "Does it count hyphenated words as one word?", a: "Yes—anything between whitespace counts as one word token." },
    ],
    related: [rel.char, rel.case, rel.writing],
  },
  "character-counter.html": {
    keywords: "character counter, letter count, Twitter character count, SMS length",
    sections: [
      {
        h2: "Character limits for social and SEO",
        paragraphs: [
          "Posts, titles, and snippets often have strict character caps. This tool shows total characters, characters without spaces, and line count so you can trim copy before publishing.",
        ],
      },
    ],
    faqs: [
      { q: "What is the difference between characters and bytes?", a: "This tool counts JavaScript string length (UTF-16 code units). Most English text matches what you expect for character limits." },
    ],
    related: [rel.word, rel.case, rel.writing],
  },
  "case-converter.html": {
    keywords: "case converter, uppercase, lowercase, title case, change text case online",
    sections: [
      {
        h2: "When to change letter case",
        paragraphs: [
          "Convert pasted headings to title case, normalize shouty caps lock to lowercase, or prepare constants in UPPERCASE. Title case capitalizes the first letter of each word—a simple rule, not full Chicago Manual style.",
        ],
      },
    ],
    faqs: [
      { q: "Does title case handle names correctly?", a: "It uses a simple per-word capitalize rule. Proofread names and small words manually." },
    ],
    related: [rel.word, rel.char, rel.writing],
  },
  "json-formatter.html": {
    keywords: "JSON formatter, JSON validator, pretty print JSON, JSON beautifier online",
    sections: [
      {
        h2: "Format or minify JSON safely",
        paragraphs: [
          "Paste API responses or config files. Format adds readable indentation; Minify removes extra whitespace. Invalid JSON shows a parse error instead of silently failing.",
        ],
      },
    ],
    faqs: [
      { q: "Is my JSON sent anywhere?", a: "Parsing and formatting happen in your browser tab only." },
    ],
    related: [rel.epoch, rel.pct],
  },
  "epoch-converter.html": {
    keywords: "unix timestamp converter, epoch to date, timestamp to human readable",
    sections: [
      {
        h2: "Unix time in seconds and milliseconds",
        paragraphs: [
          "Timestamps from logs and APIs are often Unix epoch values. Values below 1,000,000,000,000 are treated as seconds and multiplied by 1,000. Larger values are treated as milliseconds.",
        ],
      },
    ],
    faqs: [
      { q: "What timezone is shown?", a: "The converter uses your browser local timezone when displaying the date string." },
    ],
    related: [rel.json, rel.age],
  },
  "bmi-calculator.html": {
    keywords: "BMI calculator, body mass index, BMI calculator kg cm",
    sections: [
      {
        h2: "Understanding BMI results",
        paragraphs: [
          "Body Mass Index is weight in kilograms divided by height in meters squared. Categories follow common WHO-style cutoffs for adults. BMI does not measure body fat directly and is not medical advice.",
        ],
      },
    ],
    faqs: [
      { q: "Can children use this BMI tool?", a: "This page uses adult cutoffs only. Pediatric BMI uses age-specific charts." },
    ],
    related: [rel.age, rel.pct],
  },
  "percentage-calculator.html": {
    keywords: "percentage calculator, percent of a number, what is X percent of Y",
    sections: [
      {
        h2: "Quick percent math",
        paragraphs: [
          "Find a percentage of any number—for discounts, tax estimates, exam scores, or tip math before using the dedicated tip calculator.",
        ],
      },
    ],
    faqs: [
      { q: "How is the result rounded?", a: "Up to four decimal places using standard formatting; adjust mentally for currency." },
    ],
    related: [rel.tip, rel.emi, rel.bmi],
  },
  "emi-calculator.html": {
    keywords: "EMI calculator India, loan EMI calculator, home loan EMI, personal loan EMI",
    sections: [
      {
        h2: "How EMI is estimated",
        paragraphs: [
          "EMI uses the standard amortizing loan formula with monthly compounding from the annual rate. Processing fees, insurance, and floating rates are not included. Treat the output as an estimate before talking to a bank.",
        ],
      },
    ],
    faqs: [
      { q: "Is this an official bank quote?", a: "No. It is a math helper only, not a loan offer." },
    ],
    related: [rel.pct, rel.tip],
  },
  "tip-calculator.html": {
    keywords: "tip calculator, split bill calculator, gratuity calculator India",
    sections: [
      {
        h2: "Split a bill with tip",
        paragraphs: [
          "Enter the bill amount, tip percentage, and number of people. The tool shows the grand total and fair share per person—handy for restaurants and group orders.",
        ],
      },
    ],
    faqs: [
      { q: "Does it round per person?", a: "Per-person amounts show two decimal places; real-world rounding may differ slightly." },
    ],
    related: [rel.pct, rel.emi],
  },
  "age-calculator.html": {
    keywords: "age calculator, date of birth to age, how old am I calculator",
    sections: [
      {
        h2: "Age from date of birth",
        paragraphs: [
          "Pick a birth date to see years, months, and days relative to today in your local calendar. Useful for forms, eligibility checks, and curiosity—not for legal age verification on its own.",
        ],
      },
    ],
    faqs: [
      { q: "Does it handle leap years?", a: "Yes—the calculation uses the browser Date object with calendar-aware month lengths." },
    ],
    related: [rel.bmi, rel.epoch],
  },
  "ifsc-format.html": {
    keywords: "IFSC code format, IFSC validator, check IFSC pattern India",
    sections: [
      {
        h2: "IFSC structure (format only)",
        paragraphs: [
          "Indian Financial System Codes are 11 characters: four bank letters, a zero, then six branch characters. This checker validates shape only. To confirm a live branch, use your bank or RBI sources.",
        ],
      },
    ],
    faqs: [
      { q: "Does this verify the branch exists?", a: "No. It only checks that the code matches the usual pattern." },
    ],
    related: [rel.pan, rel.india],
  },
  "pan-format.html": {
    keywords: "PAN format check, PAN validator pattern, PAN card format India",
    sections: [
      {
        h2: "Permanent Account Number layout",
        paragraphs: [
          "PANs are 10 characters: five letters, four digits, one letter. This tool checks format only. It does not query the Income Tax Department or prove a PAN is active.",
        ],
      },
    ],
    faqs: [
      { q: "Can I use this for KYC?", a: "Use official verification channels. This is a typing helper, not KYC." },
    ],
    related: [rel.ifsc, rel.india],
  },
  "guides/writing-tools.html": {
    keywords: "online writing tools, word count tool, free writing utilities",
    sections: [
      {
        h2: "Build a simple writing workflow",
        paragraphs: [
          "Draft in any editor, paste into the word counter for length, switch to the character counter for snippets, and use the case converter for consistent headings.",
        ],
      },
    ],
    faqs: [
      { q: "Which tool for SEO meta descriptions?", a: "Use the character counter and aim for concise, unique descriptions per page." },
    ],
    related: [rel.word, rel.char, rel.seo],
  },
  "guides/seo-checklist.html": {
    keywords: "SEO checklist, small website SEO, Google Search Console sitemap",
    sections: [
      {
        h2: "SEO basics for static sites",
        paragraphs: [
          "Static sites on GitHub Pages can rank when each URL has a unique title, helpful body copy, internal links, and a submitted sitemap. Avoid duplicate thin pages and keyword stuffing.",
        ],
        list: [
          "One clear H1 per page matching user intent.",
          "Meta description ~150 characters summarizing the page.",
          "Link related tools together in prose sections.",
          "Submit sitemap.xml in Google Search Console and Bing Webmaster.",
        ],
      },
    ],
    faqs: [
      { q: "How long until Google indexes a new tool page?", a: "Often days to a few weeks for new sites. Request indexing in Search Console after publishing." },
    ],
    related: [rel.domain, rel.writing, rel.word],
  },
  "domain-age.html": {
    keywords: "domain age checker, how old is a website, domain registration date, RDAP lookup, SEO domain age",
    sections: [
      {
        h2: "What is domain age?",
        paragraphs: [
          "Domain age usually means how long ago a domain name was first registered. Search engines and buyers sometimes treat older domains as more established, but age alone does not guarantee rankings or trust—you still need good content and links.",
          "This tool reads public registration metadata from RDAP (Registration Data Access Protocol), the modern replacement for classic WHOIS. Results depend on what the registry publishes; some TLDs hide or redact dates.",
        ],
      },
      {
        h2: "How to use the checker",
        paragraphs: [
          "Enter a domain like <code>example.com</code> or paste a full URL—we strip paths and optional <code>www</code>. Click Look up to see the registration date, approximate age in years and days, expiration if available, and last-changed date when the registry provides it.",
        ],
        list: [
          "Useful for quick SEO research and due diligence before buying a domain.",
          "Not a legal record—always confirm with the registrar for contracts.",
          "Lookup goes to the public RDAP network; we do not store domains you search.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is domain age a Google ranking factor?",
        a: "Google has said domain age alone is not a major direct factor. Helpful content, relevance, and reputation matter more than how old the registration is.",
      },
      {
        q: "Why does lookup fail for some domains?",
        a: "Some TLDs block RDAP, rate-limit requests, or omit registration dates. Privacy services may also limit public data.",
      },
      {
        q: "Do you store the domains I check?",
        a: "No. The lookup runs from your browser to public RDAP servers; this static site has no backend database for searches.",
      },
    ],
    related: [rel.seo, rel.epoch, rel.word],
  },
  "reading-time.html": {
    keywords: "reading time calculator, blog read time, words per minute, article length",
    sections: [
      {
        h2: "Why show reading time on posts?",
        paragraphs: [
          "Readers choose articles partly by time commitment. A “5 min read” label sets expectations and can improve engagement when it matches your actual word count.",
        ],
      },
    ],
    faqs: [
      { q: "What WPM should I use?", a: "200 words per minute is a common default for English prose; adjust down for dense or technical content." },
    ],
    related: [rel.word, rel.char, rel.writing],
  },
  "gst-calculator.html": {
    keywords: "GST calculator India, add GST, remove GST, 18 percent GST calculator",
    sections: [
      {
        h2: "Exclusive vs inclusive GST",
        paragraphs: [
          "If your amount excludes GST, the tool adds tax on top. If the amount already includes GST, it backs out the taxable value and tax component—useful for invoices marked GST-inclusive.",
        ],
      },
    ],
    faqs: [
      { q: "Which GST rates are supported?", a: "Quick presets for 5%, 12%, 18%, and 28%—common slab rates in India." },
      { q: "Is this for filing returns?", a: "No. Use official GST portals and your CA for compliance; this is a quick math helper." },
    ],
    related: [rel.emi, rel.sip, rel.india],
  },
  "sip-calculator.html": {
    keywords: "SIP calculator, mutual fund SIP, monthly SIP returns India",
    sections: [
      {
        h2: "How SIP maturity is estimated",
        paragraphs: [
          "The calculator assumes a fixed monthly investment and a constant annual return, compounded monthly. Real mutual fund returns vary; use this for illustration and planning only.",
        ],
      },
    ],
    faqs: [
      { q: "Does this include tax or exit load?", a: "No. It shows gross estimated maturity before fees and taxes." },
    ],
    related: [rel.emi, rel.gst, rel.pct],
  },
  "hash-generator.html": {
    keywords: "SHA-256 online, hash generator, text to hash, Web Crypto",
    sections: [
      {
        h2: "When to use SHA-256",
        paragraphs: [
          "SHA-256 produces a fixed-length fingerprint of text—handy for checksums, API signatures, and learning how hashing works. It is not encryption; do not hash passwords for login systems without proper salting and slow algorithms.",
        ],
      },
    ],
    faqs: [
      { q: "Is my text sent to a server?", a: "No. Hashing uses Web Crypto in your browser." },
    ],
    related: [rel.b64, rel.uuid, rel.json],
  },
  "base64-encoder.html": {
    keywords: "Base64 encode, Base64 decode, Base64 online, Unicode Base64",
    sections: [
      {
        h2: "Base64 in APIs and configs",
        paragraphs: [
          "Base64 encodes binary data as ASCII text—common in JSON web tokens, data URLs, and email. This tool handles Unicode text via UTF-8 before encoding.",
        ],
      },
    ],
    faqs: [
      { q: "Why did decode fail?", a: "Input must be valid Base64 (padding and character set). Remove stray spaces or line breaks if pasted from logs." },
    ],
    related: [rel.hash, rel.json, rel.uuid],
  },
  "uuid-generator.html": {
    keywords: "UUID generator, UUID v4, random UUID online",
    sections: [
      {
        h2: "What is UUID v4?",
        paragraphs: [
          "Version 4 UUIDs are random 128-bit identifiers, often used as database primary keys or correlation IDs. Collisions are astronomically unlikely for practical apps.",
        ],
      },
    ],
    faqs: [
      { q: "Are these cryptographically random?", a: "They use crypto.getRandomValues in the browser—suitable for app IDs; use platform APIs for security tokens if your framework provides them." },
    ],
    related: [rel.pwd, rel.hash, rel.b64],
  },
  "password-generator.html": {
    keywords: "password generator, strong password, random password online",
    sections: [
      {
        h2: "Strong password tips",
        paragraphs: [
          "Long passwords beat short complex ones. Use a password manager, enable two-factor authentication, and never reuse passwords across sites.",
        ],
      },
    ],
    faqs: [
      { q: "Are generated passwords stored?", a: "No. They exist only in your browser until you copy or refresh the page." },
    ],
    related: [rel.uuid, rel.hash],
  },
  "guides/india-id-formats.html": {
    keywords: "IFSC format, PAN format India, bank IFSC structure",
    sections: [
      {
        h2: "Why format checkers are not verification",
        paragraphs: [
          "Format validation catches typos before you paste a code into a payment app. It cannot tell you whether a branch merged, a PAN is cancelled, or a name matches the account holder.",
        ],
      },
    ],
    faqs: [
      { q: "Where to verify IFSC officially?", a: "Use your bank’s website or RBI published lists—not this demo tool." },
    ],
    related: [rel.ifsc, rel.pan],
  },
};
