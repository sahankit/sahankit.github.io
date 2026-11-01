/** SEO helpers used by build-site.mjs (meta escaping, canonicals, JSON-LD). */

export const OG_IMAGE = "/assets/og.svg";
/** Site brand shown in header, meta, and JSON-LD. */
export const SITE_NAME = "Tools";

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
      name: SITE_NAME,
      url: `${base}/`,
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

/** Default on-page SEO when a tool has no entry in pageSeo. */
export function fallbackToolSeo(tool) {
  const name = tool.card;
  const key = name.toLowerCase();
  return {
    keywords: `${key}, free ${key} online, ${key} calculator, ${SITE_NAME}`,
    sections: [
      {
        h2: `How to use the ${key}`,
        paragraphs: [tool.desc, "Everything runs in your browser—no signup and no install."],
      },
    ],
    faqs: [
      {
        q: `Is this ${key} free?`,
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
