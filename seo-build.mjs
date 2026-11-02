/** SEO helpers used by build-site.mjs (meta escaping, canonicals, JSON-LD). */

export const OG_IMAGE = "/assets/og.png";
/** Site brand shown in header, meta, and JSON-LD. */
export const SITE_NAME = "Tools";

/** Legal / publisher attribution (footer, about, schema.org). */
export const SITE_PUBLISHER = {
  brand: "Useless engineer",
  company: "Sah Technologies",
  locality: "Bangalore",
  country: "IN",
};

export function siteOwnerLine() {
  const { brand, company, locality } = SITE_PUBLISHER;
  return `${brand} · ${company} · ${locality}`;
}

export function escapeMeta(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Preferred canonical URL for a generated file path. */
export function canonicalFromFile(file) {
  const slug = file.replace(/\.html$/, "");
  return `/${slug}/`;
}

export function webSiteLd(base) {
  return {
    "@type": "WebSite",
    "@id": `${base}/#website`,
    name: SITE_NAME,
    url: `${base}/`,
    description:
      "Free online calculators, India finance tools, developer utilities, and browser-based text tools.",
    publisher: {
      "@type": "Organization",
      name: SITE_PUBLISHER.company,
      alternateName: [SITE_PUBLISHER.brand, SITE_NAME],
      url: `${base}/`,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_PUBLISHER.locality,
        addressCountry: SITE_PUBLISHER.country,
      },
    },
  };
}

export function breadcrumbLd(crumbs, base, pageUrl) {
  if (!crumbs?.length) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => {
      const isLast = i === crumbs.length - 1;
      const entry = {
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
      };
      if (!isLast && c.url) entry.item = `${base}${c.url}`;
      else if (isLast && pageUrl) entry.item = `${base}${pageUrl}`;
      return entry;
    }),
  };
}

export function webPageNode(title, desc, canonicalPath, base) {
  return {
    "@type": "WebPage",
    "@id": `${base}${canonicalPath}#webpage`,
    name: title,
    description: desc,
    url: `${base}${canonicalPath}`,
    isPartOf: { "@id": `${base}/#website` },
  };
}

/** Tool name for mid-sentence use: "Word counter" → "word counter", but "EMI calculator" / "PDF to Word" keep their casing. */
export function inSentence(name) {
  const s = String(name ?? "");
  return /^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;
}

/** Default on-page SEO when a tool has no entry in pageSeo. */
export function fallbackToolSeo(tool) {
  const name = tool.card;
  const key = name.toLowerCase();
  return {
    keywords: `${key}, free ${key} online, ${key} calculator, ${SITE_NAME}`,
    sections: [
      {
        h2: `How to use the ${inSentence(name)}`,
        paragraphs: [tool.desc, "Everything runs in your browser—no signup and no install."],
      },
    ],
    faqs: [
      {
        q: `Is this ${inSentence(name)} free?`,
        a: "Yes. These tools are free to use in the browser.",
      },
      {
        q: "Is my data uploaded?",
        a: "For most tools, input stays on your device. Domain age lookup calls public RDAP; see each tool page for details.",
      },
    ],
    related: [{ href: "/", label: "All tools" }],
  };
}

export function fallbackGuideSeo(guide) {
  const short = guide.title.split("—")[0].trim();
  return {
    keywords: `${short}, free online guide, ${SITE_NAME}`,
    sections: [
      {
        h2: "Guide overview",
        paragraphs: [guide.desc],
      },
    ],
    faqs: [],
    related: [{ href: "/", label: "Tools home" }],
  };
}

/** Meta description tuned for search snippets (~120–160 chars). */
export function buildMetaDescription(raw, label = "tool") {
  let d = String(raw ?? "").trim();
  const name = String(label ?? "tool").trim();
  if (!d) d = `Free online ${name}.`;
  if (d.length < 110) {
    if (!d.endsWith(".")) d += ".";
    d += ` Free ${inSentence(name)} in your browser—no signup or install.`;
  }
  if (d.length > 165) {
    d = d.slice(0, 162).replace(/\s+\S*$/, "") + "…";
  }
  return d;
}

function normalizeHref(href) {
  if (!href || href.startsWith("http") || href.startsWith("#")) return href;
  if (href.endsWith(".html")) return canonicalFromFile(href.replace(/^\//, ""));
  if (!href.endsWith("/") && !/\.[a-z0-9]+$/i.test(href)) return `${href}/`;
  return href;
}

function uniqueFaqs(faqs, extras) {
  const seen = new Set();
  const out = [];
  for (const f of [...(faqs || []), ...(extras || [])]) {
    if (!f?.q || seen.has(f.q)) continue;
    seen.add(f.q);
    out.push(f);
  }
  return out;
}

function defaultToolFaqs(card) {
  const name = inSentence(card);
  return [
    {
      q: `Is this ${name} free?`,
      a: `Yes. The ${name} is free to use in your browser with no account required.`,
    },
    {
      q: "Does my data leave my device?",
      a: "For most tools on this site, input stays on your device. If a tool calls a public API (for example domain age), that is noted on the page.",
    },
  ];
}

function defaultHowTo(tool) {
  const name = tool.card;
  return {
    name: `How to use the ${name}`,
    description: buildMetaDescription(tool.desc, name),
    steps: [
      { name: "Open the tool", text: "Use the form or editor on this page—no download required." },
      { name: "Enter your input", text: tool.cardDesc || tool.desc },
      {
        name: "Use the result",
        text: "Copy, download, or apply the output. Processing usually happens locally in your browser.",
      },
    ],
  };
}

/** Fill gaps in per-tool SEO (FAQs, related links, keywords, HowTo). */
export function enrichToolSeo(seo, tool, { allTools = [], categoryHub = {} } = {}) {
  const base = { ...(seo || fallbackToolSeo(tool)) };
  const card = tool.card;
  const key = card.toLowerCase();

  if (!base.keywords?.trim()) {
    base.keywords = `${key}, free ${key} online, ${key} tool, ${SITE_NAME}`;
  }

  if (!base.sections?.length) {
    base.sections = [
      {
        h2: `About the ${inSentence(card)}`,
        paragraphs: [tool.desc, "Runs in your browser—no signup and no install."],
      },
    ];
  } else if (base.sections.length === 1 && !(base.sections[0].paragraphs?.length > 1)) {
    base.sections = [
      ...base.sections,
      {
        h2: "Why use an online tool?",
        paragraphs: [
          "Browser tools are quick for one-off tasks—you avoid installing software and your input often stays on your device.",
        ],
      },
    ];
  }

  base.faqs = uniqueFaqs(base.faqs, defaultToolFaqs(card));
  if (base.faqs.length < 2) {
    base.faqs = uniqueFaqs(base.faqs, defaultToolFaqs(card));
  }

  const related = [];
  const hub = categoryHub[tool.category];
  if (hub) related.push({ href: hub.href, label: hub.label });
  for (const t of allTools) {
    if (t.file === tool.file || t.category !== tool.category) continue;
    related.push({ href: canonicalFromFile(t.file), label: t.card });
    if (related.length >= 4) break;
  }
  if (!related.some((r) => r.href === "/")) related.push({ href: "/", label: "All tools" });
  if (!base.related?.length) base.related = related;
  else {
    const merged = [...base.related];
    for (const r of related) {
      if (merged.length >= 5) break;
      const href = normalizeHref(r.href);
      if (!merged.some((x) => normalizeHref(x.href) === href)) merged.push(r);
    }
    base.related = merged;
  }
  base.related = base.related.map((r) => ({ ...r, href: normalizeHref(r.href) }));

  if (!base.howTo?.steps?.length) base.howTo = defaultHowTo(tool);

  return base;
}

/** Guides and hub pages: ensure FAQ + keywords for rich results. */
export function enrichContentSeo(seo, { title, desc, keywords, faqs = [] } = {}) {
  const base = { ...(seo || {}) };
  const short = String(title ?? "").split("—")[0].trim() || "This page";
  if (!base.keywords?.trim()) {
    base.keywords = keywords || `${short.toLowerCase()}, free online, ${SITE_NAME}`;
  }
  if (!base.sections?.length) {
    base.sections = [{ h2: "Overview", paragraphs: [desc || short] }];
  }
  const mergedFaqs = uniqueFaqs(faqs, base.faqs);
  const extras =
    mergedFaqs.length >= 2
      ? []
      : [
          { q: `Is ${short} free?`, a: "Yes. Content and tools on this site are free to use in the browser." },
          {
            q: "Do I need an account?",
            a: "No account is required for the calculators and utilities listed here.",
          },
        ];
  base.faqs = uniqueFaqs(mergedFaqs, extras);
  if (!base.related?.length) base.related = [{ href: "/", label: "All tools" }];
  base.related = base.related.map((r) => ({ ...r, href: normalizeHref(r.href) }));
  return base;
}
