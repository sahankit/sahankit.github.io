#!/usr/bin/env node
import fs from "fs";
import path from "path";
import {
  renderSeoHtml,
  jsonLdGraph,
  faqLd,
  softwareAppLd,
  indexSeo,
  pageSeo as corePageSeo,
} from "./seo-content.mjs";
import { extraPageSeo } from "./seo-extra.mjs";
import { sitePageSeo } from "./seo-sites.mjs";
import { extraTools } from "./tools-extra.mjs";
import { moreTools } from "./tools-more.mjs";
import { morePageSeo } from "./seo-more.mjs";
import { batch4Tools } from "./tools-batch4.mjs";
import { batch4PageSeo } from "./seo-batch4.mjs";
import { batch5Tools } from "./tools-batch5.mjs";
import { batch5PageSeo } from "./seo-batch5.mjs";
import { batch6Tools } from "./tools-batch6.mjs";
import { batch6PageSeo } from "./seo-batch6.mjs";
import { batch7Tools } from "./tools-batch7.mjs";
import { batch7PageSeo } from "./seo-batch7.mjs";
import { batch8Tools } from "./tools-batch8.mjs";
import { batch8PageSeo } from "./seo-batch8.mjs";
import { batch9Tools } from "./tools-batch9.mjs";
import { batch9PageSeo } from "./seo-batch9.mjs";
import { batch10Tools } from "./tools-batch10.mjs";
import { batch10PageSeo } from "./seo-batch10.mjs";
import { batch11Tools } from "./tools-batch11.mjs";
import { batch11PageSeo } from "./seo-batch11.mjs";
import { batch12Tools } from "./tools-batch12.mjs";
import { batch12PageSeo } from "./seo-batch12.mjs";
import { batch13Tools } from "./tools-batch13.mjs";
import { batch13PageSeo } from "./seo-batch13.mjs";
import { batch14Tools } from "./tools-batch14.mjs";
import { batch14PageSeo } from "./seo-batch14.mjs";
import { batch15Tools } from "./tools-batch15.mjs";
import { batch15PageSeo } from "./seo-batch15.mjs";
import { batch16Tools } from "./tools-batch16.mjs";
import { batch16PageSeo } from "./seo-batch16.mjs";
import { batch17Tools } from "./tools-batch17.mjs";
import { batch17PageSeo } from "./seo-batch17.mjs";
import { batch20Tools } from "./tools-batch20.mjs";
import { batch20PageSeo } from "./seo-batch20.mjs";
import { batch21Tools } from "./tools-batch21.mjs";
import { batch21PageSeo } from "./seo-batch21.mjs";
import { batch22Tools } from "./tools-batch22.mjs";
import { batch22PageSeo } from "./seo-batch22.mjs";
import { batch23Tools } from "./tools-batch23.mjs";
import { batch23PageSeo } from "./seo-batch23.mjs";
import { batch24Tools } from "./tools-batch24.mjs";
import { batch24PageSeo } from "./seo-batch24.mjs";
import { batch25Tools } from "./tools-batch25.mjs";
import { batch25PageSeo } from "./seo-batch25.mjs";
import { batch26Tools } from "./tools-batch26.mjs";
import { batch26PageSeo } from "./seo-batch26.mjs";
import { batch27Tools } from "./tools-batch27.mjs";
import { batch27PageSeo } from "./seo-batch27.mjs";
import { batch28Tools } from "./tools-batch28.mjs";
import { batch28PageSeo } from "./seo-batch28.mjs";
import { batch29Tools } from "./tools-batch29.mjs";
import { batch29PageSeo } from "./seo-batch29.mjs";
import { batch30Tools } from "./tools-batch30.mjs";
import { batch30PageSeo } from "./seo-batch30.mjs";
import { batch31Tools } from "./tools-batch31.mjs";
import { batch31PageSeo } from "./seo-batch31.mjs";
import { micrositeDefs, micrositeMain, quizSiteBody, briefSiteBody } from "./sites.mjs";
import { buildBriefFeedsJson } from "./fetch-brief-feeds.mjs";
import { CATEGORY_ICON, iconSvg, iconTile, toolCardHtml, hubCardHtml } from "./ui-icons.mjs";
import {
  OG_IMAGE,
  SITE_NAME,
  SITE_PUBLISHER,
  siteOwnerLine,
  escapeMeta,
  canonicalFromFile,
  webSiteLd,
  breadcrumbLd,
  webPageNode,
  fallbackToolSeo,
  fallbackGuideSeo,
  enrichToolSeo,
  enrichContentSeo,
  buildMetaDescription,
  formatDocumentTitle,
} from "./seo-build.mjs";

const pageSeo = {
  ...corePageSeo,
  ...extraPageSeo,
  ...morePageSeo,
  ...batch4PageSeo,
  ...batch5PageSeo,
  ...batch6PageSeo,
  ...batch7PageSeo,
  ...batch8PageSeo,
  ...batch9PageSeo,
  ...batch10PageSeo,
  ...batch11PageSeo,
  ...batch12PageSeo,
  ...batch13PageSeo,
  ...batch14PageSeo,
  ...batch15PageSeo,
  ...batch16PageSeo,
  ...batch17PageSeo,
  ...batch20PageSeo,
  ...batch21PageSeo,
  ...batch22PageSeo,
  ...batch23PageSeo,
  ...batch24PageSeo,
  ...batch25PageSeo,
  ...batch26PageSeo,
  ...batch27PageSeo,
  ...batch28PageSeo,
  ...batch29PageSeo,
  ...batch30PageSeo,
  ...batch31PageSeo,
  ...sitePageSeo,
};

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const BASE = "https://sahankit.github.io";
const BUILD_DATE = new Date().toISOString().slice(0, 10);
/** CookieYes consent banner — load before analytics/ads (configure tags in CookieYes dashboard). */
const COOKIEYES_SCRIPT = "https://cdn-cookieyes.com/client_data/dc1fa4cdfcacd6155e83e1e8/script.js";
const ANALYTICS_CONFIG_PATH = path.join(ROOT, "assets/analytics.json");

/** Optional: GA_MEASUREMENT_ID env overrides analytics.json at build time (CI-friendly). */
function applyAnalyticsEnv() {
  const fromEnv = process.env.GA_MEASUREMENT_ID?.trim();
  if (!fromEnv) return;
  let cfg = { measurementId: "", anonymizeIp: true, sendPageView: true };
  try {
    cfg = { ...cfg, ...JSON.parse(fs.readFileSync(ANALYTICS_CONFIG_PATH, "utf8")) };
  } catch {
    /* new file */
  }
  cfg.measurementId = fromEnv;
  fs.writeFileSync(ANALYTICS_CONFIG_PATH, `${JSON.stringify(cfg, null, 2)}\n`);
}

applyAnalyticsEnv();

const nav = `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="site-header-inner">
    <a class="brand" href="/" aria-label="${SITE_NAME} home"><span class="brand-mark" aria-hidden="true">T</span><span>${SITE_NAME}</span></a>
    <nav class="site-nav" aria-label="Main">
      <a href="/#find-tool">Search</a>
      <a href="/#hubs">Hubs</a>
      <a href="/finance/">Finance</a>
      <a href="/dev/">Developer</a>
      <a href="/guides/writing-tools/">Guides</a>
      <a href="/quiz/">Quiz</a>
      <a href="/brief/">News</a>
    </nav>
  </div>
</header>`;

const FOOTER_POPULAR = [
  ["/word-counter/", "Word counter"],
  ["/income-tax-calculator/", "Income tax calculator"],
  ["/gst-calculator/", "GST calculator"],
  ["/emi-calculator/", "EMI calculator"],
  ["/pdf-merge/", "Merge PDF"],
  ["/qr-code-generator/", "QR code generator"],
];

function footerHtml() {
  const list = (items) => items.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("");
  const hubs = micrositeDefs.slice(0, 8).map((s) => [`/${s.slug}/`, s.hero]);
  return `
<footer class="site-footer">
  <div class="site-footer-inner">
    <div class="footer-brand">
      <a class="brand" href="/" aria-label="${SITE_NAME} home"><span class="brand-mark" aria-hidden="true">T</span><span>${SITE_NAME}</span></a>
      <p>${tools.length}+ free calculators and utilities. Most tools run entirely in your browser—no signup.</p>
    </div>
    <nav class="footer-col" aria-label="Popular tools"><h2>Popular</h2><ul>${list(FOOTER_POPULAR)}</ul></nav>
    <nav class="footer-col" aria-label="Topic hubs"><h2>Hubs</h2><ul>${list(hubs)}</ul></nav>
    <nav class="footer-col" aria-label="Site"><h2>Site</h2><ul>${list([
      ["/guides/writing-tools/", "Guides"],
      ["/about/", "About"],
      ["/privacy/", "Privacy policy"],
      ["/y-chat/", "Y-Chat"],
      ["/sitemap.xml", "Sitemap"],
    ])}</ul></nav>
  </div>
  <p class="footer-owner">Site owned by ${escapeMeta(siteOwnerLine())}</p>
  <p class="footer-note">Estimates are for information only—not financial, tax, legal, or medical advice. Not affiliated with Google or Yahoo.</p>
</footer>`;
}

const headCommon = (title, desc, canonicalPath, keywords = "", opts = {}) => {
  const t = escapeMeta(title);
  const d = escapeMeta(desc);
  const k = keywords ? escapeMeta(keywords) : "";
  const canonical = `${BASE}${canonicalPath}`;
  const ogImage = `${BASE}${OG_IMAGE}`;
  const robots = opts.noindex ? "noindex, follow" : "index, follow, max-image-preview:large";
  return `
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="google-adsense-account" content="ca-pub-5596933121293455" />
  <meta name="robots" content="${robots}" />
  <meta name="author" content="${SITE_NAME}" />
  <meta name="theme-color" content="#720e9e" />
  <meta name="color-scheme" content="light" />
  <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
  <link rel="dns-prefetch" href="https://cdn-cookieyes.com" />
  <script id="cookieyes" type="text/javascript" src="${COOKIEYES_SCRIPT}"></script>
  <title>${t}</title>
  <link rel="icon" href="/favicon.ico" sizes="48x48" />
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
  <meta name="description" content="${d}" />
  ${k ? `<meta name="keywords" content="${k}" />` : ""}
  <link rel="canonical" href="${canonical}" />
  <link rel="sitemap" type="application/xml" title="Sitemap" href="${BASE}/sitemap.xml" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${t}" />
  <meta property="og:description" content="${d}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="${opts.ogLocale || "en_US"}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${SITE_NAME} — free online calculators and utilities" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t}" />
  <meta name="twitter:description" content="${d}" />
  <meta name="twitter:image" content="${ogImage}" />
  <link rel="stylesheet" href="/assets/site.css" />
  <script src="/assets/analytics.js" defer></script>
  <script src="/assets/ads.js" defer></script>
  <script src="/assets/tool-busy.js" defer></script>
  <script src="/assets/site-ui.js" defer></script>
  <script src="/assets/ga-events.js" defer></script>`;
};

function buildJsonLd(title, desc, canonicalPath, opts = {}) {
  const graph = [];
  if (opts.isHome) graph.push(webSiteLd(BASE));
  if (opts.isHome && opts.itemList?.length) {
    graph.push({
      "@type": "ItemList",
      name: "Popular free online tools",
      itemListElement: opts.itemList.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: `${BASE}${item.url}`,
      })),
    });
  }
  graph.push(webPageNode(title, desc, canonicalPath, BASE));
  const bc = breadcrumbLd(opts.breadcrumbs, BASE, canonicalPath);
  if (bc) graph.push(bc);
  const faq = faqLd(opts.faqs);
  if (faq) graph.push(faq);
  if (opts.softwareApp) {
    graph.push({
      ...softwareAppLd(title, desc, canonicalPath, BASE),
      url: `${BASE}${canonicalPath}`,
    });
  }
  if (opts.howTo?.steps?.length) {
    graph.push({
      "@type": "HowTo",
      name: opts.howTo.name || title,
      description: opts.howTo.description || desc,
      step: opts.howTo.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }
  return jsonLdGraph([{ "@context": "https://schema.org", "@graph": graph }]);
}

function page(urlPath, title, desc, mainHtml, breadcrumb = "", opts = {}) {
  const canonicalPath = opts.canonical || urlPath;
  return `<!DOCTYPE html>
<html lang="en">
<head>${headCommon(title, desc, canonicalPath, opts.keywords || "", opts)}
${buildJsonLd(title, desc, canonicalPath, opts)}
</head>
<body>
${nav}
<main class="wrap" id="main">
${breadcrumb}
${mainHtml}
</main>
${footerHtml()}
</body>
</html>`;
}

const ad = `<aside class="ad-slot ad-slot--top" data-ad hidden aria-label="Advertisement"></aside>`;
const adBelow = `<aside class="ad-slot ad-slot--below" data-ad hidden aria-label="Advertisement"></aside>`;

/** Every tool page gets AdSense slots even if a template omits \${ad}. */
function ensureToolAds(body) {
  let html = body;
  if (!html.includes("ad-slot")) {
    const hero = html.match(/<header class="page-hero"[\s\S]*?<\/header>/);
    if (hero) html = html.replace(hero[0], `${hero[0]}\n${ad}`);
    else html = html.replace(/(<h1>[\s\S]*?<\/h1>)/, `$1\n${ad}`);
  }
  if (!html.includes("ad-slot--below")) html = `${html.trimEnd()}\n${adBelow}\n`;
  return html;
}

const HUB_CATEGORIES = [
  { id: "writing", title: "Text & writing" },
  { id: "calculators", title: "Calculators" },
  { id: "india", title: "India utilities" },
  { id: "productivity", title: "Productivity" },
  { id: "design", title: "Design & color" },
  { id: "documents", title: "PDF & images" },
  { id: "seo", title: "SEO & web" },
  { id: "developer", title: "Developer utilities" },
  { id: "chat", title: "Free chat (Y-Chat)" },
];

const CATEGORY_HUB = {
  writing: { href: "/writing/", label: "Writing toolkit" },
  calculators: { href: "/finance/", label: "Finance & calculators" },
  india: { href: "/india/", label: "India utilities" },
  productivity: { href: "/productivity/", label: "Productivity hub" },
  design: { href: "/design/", label: "Design & media" },
  documents: { href: "/design/", label: "PDF & images" },
  seo: { href: "/seo-lab/", label: "SEO lab" },
  developer: { href: "/dev/", label: "Developer utilities" },
  chat: { href: "/chat/", label: "Free chat (Y-Chat)" },
};

const FEATURED_HUB_SLUGS = ["finance", "india", "dev", "osint", "ai-writing", "student", "brief", "quiz"];

const POPULAR_TOOL_FILES = [
  "word-counter.html",
  "character-counter.html",
  "income-tax-calculator.html",
  "personal-loan-calculator.html",
  "ltcg-tax-calculator.html",
  "home-loan-calculator.html",
  "gst-calculator.html",
  "emi-calculator.html",
  "pdf-merge.html",
  "pdf-to-word.html",
  "qr-code-generator.html",
  "ai-meta-description-generator.html",
  "json-formatter.html",
  "password-generator.html",
  "typing-test.html",
  "grammar-checker.html",
  "free-online-chat.html",
  "osint-search.html",
];

function normalizeToolBody(body, t) {
  const hub = CATEGORY_HUB[t.category];
  const icon = CATEGORY_ICON[t.category];
  const eyebrow = hub
    ? `<a class="eyebrow tone-${icon?.[1] || "violet"}" href="${hub.href}">${iconSvg(icon?.[0])}${hub.label}</a>`
    : "";
  const lead = escapeMeta(t.desc || t.cardDesc);
  if (!/<h1>/.test(body)) return body;
  return body.replace(
    /<h1>([^<]*)<\/h1>/,
    `<header class="page-hero">${eyebrow}<h1>$1</h1><p class="page-lead">${lead}</p></header>`,
  );
}

function breadcrumbHtml(items) {
  const lis = items
    .map((it, i) =>
      i === items.length - 1 || !it.url
        ? `<li aria-current="page">${it.name}</li>`
        : `<li><a href="${it.url}">${it.name}</a></li>`,
    )
    .join("");
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><ol>${lis}</ol></nav>`;
}

function relatedCardsHtml(related, self) {
  const cards = [];
  for (const r of related || []) {
    if (!r?.href || r.href === "/" || r.href === self) continue;
    const t = tools.find((x) => canonicalFromFile(x.file) === r.href);
    const hub = micrositeDefs.find((s) => `/${s.slug}/` === r.href);
    if (hub) {
      cards.push(hubCardHtml({ slug: hub.slug, title: r.label, desc: hub.blurb }));
    } else if (r.href.startsWith("/guides/")) {
      cards.push(
        `<a class="card tool-card" href="${r.href}">${iconTile(["book", "violet"])}<span class="card-body"><h3 class="card-title">${r.label}</h3><p>Guide</p></span></a>`,
      );
    } else {
      cards.push(toolCardHtml({ href: r.href, title: r.label, desc: t?.cardDesc || "", category: t?.category }));
    }
    if (cards.length >= 6) break;
  }
  if (!cards.length) return "";
  return `<section class="related-tools" aria-labelledby="related-heading">
<h2 id="related-heading">Related tools</h2>
<div class="grid grid--compact">${cards.join("")}</div>
</section>`;
}

function hubSectionsHtml() {
  const blocks = HUB_CATEGORIES.map(({ id, title }) => {
    const list = tools.filter((t) => t.category === id);
    if (!list.length) return null;
    return { id, title, list };
  }).filter(Boolean);
  const panels = blocks
    .map(({ id, title, list }) => {
      return `<details class="category-panel">
<summary>${iconTile(CATEGORY_ICON[id], "icon-tile--sm")}<span class="category-panel-title">${title}</span><span class="category-panel-count">${list.length}</span></summary>
<div class="grid grid--compact">${list
        .map((t) =>
          toolCardHtml({ href: canonicalFromFile(t.file), title: t.card, desc: t.cardDesc, category: t.category }),
        )
        .join("")}</div>
</details>`;
    })
    .join("\n");
  return `<section id="all-tools" class="catalog" aria-labelledby="catalog-heading">
<h2 id="catalog-heading">All tools by topic</h2>
<p class="section-hint">Open a category below, or use search above to jump straight to a tool.</p>
${panels}
</section>`;
}

function micrositeCard(s) {
  const blurb = s.blurb.length > 100 ? `${s.blurb.slice(0, 97)}…` : s.blurb;
  return hubCardHtml({ slug: s.slug, title: s.hero, desc: blurb });
}

function toolFinderHtml() {
  return `<section id="find-tool" class="tool-finder" aria-labelledby="finder-heading">
<h2 id="finder-heading" class="sr-only">Find a tool</h2>
<div id="tool-finder">
<label class="sr-only" for="tool-search-input">Search tools</label>
<input type="search" id="tool-search-input" name="q" placeholder="Search ${tools.length} tools…" autocomplete="off" enterkeyhint="search" />
<div class="search-results" data-results aria-live="polite"></div>
<p class="search-empty" data-empty hidden>Type to search 210+ tools by name or topic.</p>
</div>
</section>`;
}

const tools = [
  {
    path: "/word-counter.html",
    file: "word-counter.html",
    category: "writing",
    title: "Free Word Counter — Count Words, Characters & Paragraphs",
    desc: "Count words, characters, sentences, and paragraphs in your text. Free online word counter for writers and SEO.",
    card: "Word counter",
    cardDesc: "Count words, characters, and paragraphs instantly.",
    body: `
<h1>Word counter</h1>
${ad}
<div class="tool-panel">
  <label for="text">Paste or type your text</label>
  <textarea id="text" placeholder="Start typing…"></textarea>
  <div class="stats">
    <div class="stat"><strong id="words">0</strong>Words</div>
    <div class="stat"><strong id="chars">0</strong>Characters</div>
    <div class="stat"><strong id="chars-nospace">0</strong>No spaces</div>
    <div class="stat"><strong id="paras">0</strong>Paragraphs</div>
  </div>
</div>
<script>
const t=document.getElementById('text');
function upd(){
  const s=t.value;
  document.getElementById('words').textContent=(s.trim().match(/\\S+/g)||[]).length;
  document.getElementById('chars').textContent=s.length;
  document.getElementById('chars-nospace').textContent=s.replace(/\\s/g,'').length;
  document.getElementById('paras').textContent=s.trim()?s.trim().split(/\\n+/).filter(Boolean).length:0;
}
t.addEventListener('input',upd); upd();
</script>`,
  },
  {
    path: "/character-counter.html",
    file: "character-counter.html",
    category: "writing",
    title: "Character Counter — Letters & Bytes Online",
    desc: "Count characters with and without spaces. Free character counter for tweets, SMS, and forms.",
    card: "Character counter",
    cardDesc: "Character limits for social and forms.",
    body: `
<h1>Character counter</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label>
  <textarea id="text"></textarea>
  <div class="stats">
    <div class="stat"><strong id="all">0</strong>All chars</div>
    <div class="stat"><strong id="nospace">0</strong>No spaces</div>
    <div class="stat"><strong id="lines">0</strong>Lines</div>
  </div>
</div>
<script>
const t=document.getElementById('text');
t.oninput=()=>{
  const s=t.value;
  document.getElementById('all').textContent=s.length;
  document.getElementById('nospace').textContent=s.replace(/\\s/g,'').length;
  document.getElementById('lines').textContent=s? s.split(/\\n/).length:0;
};
</script>`,
  },
  {
    path: "/case-converter.html",
    file: "case-converter.html",
    category: "writing",
    title: "Case Converter — Upper, Lower, Title Case",
    desc: "Convert text to UPPERCASE, lowercase, or Title Case online for free.",
    card: "Case converter",
    cardDesc: "UPPER, lower, and Title Case.",
    body: `
<h1>Case converter</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label>
  <textarea id="text"></textarea>
  <div class="row">
    <button type="button" class="primary" data-m="upper">UPPERCASE</button>
    <button type="button" class="primary" data-m="lower">lowercase</button>
    <button type="button" class="primary" data-m="title">Title Case</button>
  </div>
</div>
<script>
const t=document.getElementById('text');
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{
  let s=t.value;
  if(b.dataset.m==='upper') s=s.toUpperCase();
  if(b.dataset.m==='lower') s=s.toLowerCase();
  if(b.dataset.m==='title') s=s.toLowerCase().replace(/\\b\\w/g,c=>c.toUpperCase());
  t.value=s;
});
</script>`,
  },
  {
    path: "/json-formatter.html",
    file: "json-formatter.html",
    category: "writing",
    title: "JSON Formatter & Validator — Pretty Print Online",
    desc: "Format and validate JSON in the browser. Free JSON pretty printer with error messages.",
    card: "JSON formatter",
    cardDesc: "Pretty-print and validate JSON.",
    body: `
<h1>JSON formatter</h1>${ad}
<div class="tool-panel">
  <label for="json">JSON</label>
  <textarea id="json" spellcheck="false" placeholder='{"hello":"world"}'></textarea>
  <div class="row"><button type="button" class="primary" id="fmt">Format</button><button type="button" class="primary" id="min">Minify</button></div>
  <p id="msg" class="error" hidden></p>
</div>
<script>
const j=document.getElementById('json'), msg=document.getElementById('msg');
function run(spaces){
  msg.hidden=true;
  try{ j.value=JSON.stringify(JSON.parse(j.value),null,spaces); }
  catch(e){ msg.textContent=e.message; msg.hidden=false; }
}
document.getElementById('fmt').onclick=()=>run(2);
document.getElementById('min').onclick=()=>run(0);
</script>`,
  },
  {
    path: "/reading-time.html",
    file: "reading-time.html",
    category: "writing",
    title: "Reading Time Calculator — Words to Minutes",
    desc: "Estimate how long it takes to read your article from word count. Free reading time calculator for blogs and SEO.",
    card: "Reading time",
    cardDesc: "Blog read time from word count.",
    body: `
<h1>Reading time calculator</h1>${ad}
<div class="tool-panel">
  <label for="text">Paste article text</label>
  <textarea id="text" placeholder="Paste your blog post…"></textarea>
  <label for="wpm">Reading speed (words per minute)</label>
  <input id="wpm" type="number" min="100" max="400" value="200" />
  <p id="out" class="ok"></p>
</div>
<script>
function upd(){
  const s=document.getElementById('text').value;
  const wpm=Math.max(100,Number(document.getElementById('wpm').value)||200);
  const words=(s.trim().match(/\\S+/g)||[]).length;
  const min=words/wpm;
  const o=document.getElementById('out');
  if(!words){ o.textContent=''; return; }
  o.textContent=words.toLocaleString()+' words · about '+ (min<1?Math.ceil(min*60)+' sec':min.toFixed(1)+' min')+' at '+wpm+' wpm';
}
document.getElementById('text').addEventListener('input',upd);
document.getElementById('wpm').addEventListener('input',upd);
</script>`,
  },
  {
    path: "/epoch-converter.html",
    file: "epoch-converter.html",
    category: "calculators",
    title: "Unix Epoch Converter — Timestamp to Date",
    desc: "Convert Unix timestamps to local date and time. Free epoch seconds and milliseconds tool.",
    card: "Epoch converter",
    cardDesc: "Unix timestamp ↔ readable date.",
    body: `
<h1>Unix epoch converter</h1>${ad}
<div class="tool-panel">
  <label for="ts">Timestamp (seconds or ms)</label>
  <input id="ts" inputmode="numeric" placeholder="1700000000" />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
  <p><button type="button" class="primary" id="now">Use now</button></p>
</div>
<script>
function convert(){
  let n=Number(document.getElementById('ts').value.trim());
  if(!Number.isFinite(n)) { document.getElementById('out').textContent='Enter a number'; return; }
  if(n<1e12) n*=1000;
  document.getElementById('out').textContent=new Date(n).toString();
}
document.getElementById('go').onclick=convert;
document.getElementById('now').onclick=()=>{ document.getElementById('ts').value=Math.floor(Date.now()/1000); convert(); };
</script>`,
  },
  {
    path: "/bmi-calculator.html",
    file: "bmi-calculator.html",
    category: "calculators",
    title: "BMI Calculator — Body Mass Index Online",
    desc: "Calculate BMI from height and weight. Free BMI calculator with metric units.",
    card: "BMI calculator",
    cardDesc: "Body mass index from height & weight.",
    body: `
<h1>BMI calculator</h1>${ad}
<div class="tool-panel">
  <label for="h">Height (cm)</label><input id="h" type="number" min="50" max="250" value="170" />
  <label for="w">Weight (kg)</label><input id="w" type="number" min="20" max="300" value="70" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const h=Number(document.getElementById('h').value)/100, w=Number(document.getElementById('w').value);
  if(!h||!w) return;
  const bmi=(w/(h*h)).toFixed(1);
  let cat='Normal'; if(bmi<18.5) cat='Underweight'; else if(bmi>=25&&bmi<30) cat='Overweight'; else if(bmi>=30) cat='Obese';
  document.getElementById('out').textContent='BMI: '+bmi+' ('+cat+') — for adults; not medical advice.';
};
</script>`,
  },
  {
    path: "/percentage-calculator.html",
    file: "percentage-calculator.html",
    category: "calculators",
    title: "Percentage Calculator — X% of Y",
    desc: "Find what percentage one number is of another, or X percent of a value. Free online.",
    card: "Percentage calculator",
    cardDesc: "Percent of a number, increase/decrease.",
    body: `
<h1>Percentage calculator</h1>${ad}
<div class="tool-panel">
  <label>What is <input id="pct" type="number" value="10" style="width:4rem" />% of <input id="of" type="number" value="200" style="width:5rem" />?</label>
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=Number(document.getElementById('pct').value), o=Number(document.getElementById('of').value);
  document.getElementById('out').textContent=(p/100*o).toLocaleString(undefined,{maximumFractionDigits:4});
};
</script>`,
  },
  {
    path: "/emi-calculator.html",
    file: "emi-calculator.html",
    category: "calculators",
    title: "EMI Calculator — Loan Monthly Payment India",
    desc: "Estimate monthly EMI from loan amount, annual interest rate, and tenure in months.",
    card: "EMI calculator",
    cardDesc: "Monthly loan payment estimate.",
    body: `
<h1>EMI calculator</h1>${ad}
<div class="tool-panel">
  <label for="p">Principal (₹)</label><input id="p" type="number" value="500000" />
  <label for="r">Annual interest (%)</label><input id="r" type="number" step="0.1" value="10.5" />
  <label for="n">Tenure (months)</label><input id="n" type="number" value="60" />
  <button type="button" class="primary" id="go">Calculate EMI</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=Number(document.getElementById('p').value), ann=Number(document.getElementById('r').value)/100/12, n=Number(document.getElementById('n').value);
  if(!P||!n) return;
  const emi= ann? P*ann*Math.pow(1+ann,n)/(Math.pow(1+ann,n)-1): P/n;
  document.getElementById('out').textContent='EMI ≈ ₹'+emi.toFixed(2)+' (estimate only, not a bank offer)';
};
</script>`,
  },
  {
    path: "/tip-calculator.html",
    file: "tip-calculator.html",
    category: "calculators",
    title: "Tip Calculator — Split Bill & Gratuity",
    desc: "Calculate tip and split a restaurant bill between people. Free tip calculator.",
    card: "Tip calculator",
    cardDesc: "Tip amount and per-person split.",
    body: `
<h1>Tip calculator</h1>${ad}
<div class="tool-panel">
  <label for="bill">Bill (₹)</label><input id="bill" type="number" value="1000" />
  <label for="tip">Tip (%)</label><input id="tip" type="number" value="10" />
  <label for="people">People</label><input id="people" type="number" min="1" value="2" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const b=Number(document.getElementById('bill').value), tip=Number(document.getElementById('tip').value)/100, p=Math.max(1,Number(document.getElementById('people').value));
  const total=b*(1+tip);
  document.getElementById('out').textContent='Total ₹'+total.toFixed(2)+' · ₹'+(total/p).toFixed(2)+' per person';
};
</script>`,
  },
  {
    path: "/age-calculator.html",
    file: "age-calculator.html",
    category: "calculators",
    title: "Age Calculator — Years from Birth Date",
    desc: "Calculate age in years, months, and days from your date of birth.",
    card: "Age calculator",
    cardDesc: "Age from date of birth.",
    body: `
<h1>Age calculator</h1>${ad}
<div class="tool-panel">
  <label for="dob">Date of birth</label><input id="dob" type="date" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const d=document.getElementById('dob').value; if(!d) return;
  const b=new Date(d+'T00:00:00'), n=new Date();
  let y=n.getFullYear()-b.getFullYear(), m=n.getMonth()-b.getMonth(), day=n.getDate()-b.getDate();
  if(day<0){ m--; day+=new Date(n.getFullYear(),n.getMonth(),0).getDate(); }
  if(m<0){ y--; m+=12; }
  document.getElementById('out').textContent=y+' years, '+m+' months, '+day+' days';
};
</script>`,
  },
  {
    path: "/ifsc-format.html",
    file: "ifsc-format.html",
    category: "india",
    title: "IFSC Format Checker — Validate IFSC Pattern",
    desc: "Check if an IFSC code matches the standard 11-character format. Does not verify with RBI.",
    card: "IFSC format check",
    cardDesc: "Validate IFSC pattern (not bank lookup).",
    body: `
<h1>IFSC format checker</h1>${ad}
<div class="tool-panel">
  <label for="ifsc">IFSC code</label><input id="ifsc" maxlength="11" placeholder="SBIN0001234" autocapitalize="characters" />
  <button type="button" class="primary" id="go">Check format</button>
  <p id="out"></p>
</div>
<p class="prose">This only checks the <strong>pattern</strong> (4 letters + 0 + 6 alphanumeric). It does not confirm the branch exists. Use your bank or RBI for official verification.</p>
<script>
document.getElementById('go').onclick=()=>{
  const s=document.getElementById('ifsc').value.trim().toUpperCase();
  const ok=/^[A-Z]{4}0[A-Z0-9]{6}$/.test(s);
  const o=document.getElementById('out');
  o.className=ok?'ok':'error';
  o.textContent=ok?'Format looks valid.':'Invalid format — expect 11 characters like HDFC0001234.';
};
</script>`,
  },
  {
    path: "/pan-format.html",
    file: "pan-format.html",
    category: "india",
    title: "PAN Format Checker — Validate PAN Pattern",
    desc: "Check if a PAN matches the standard format AAAAA9999A. Not an official Income Tax verification.",
    card: "PAN format check",
    cardDesc: "Validate PAN pattern only.",
    body: `
<h1>PAN format checker</h1>${ad}
<div class="tool-panel">
  <label for="pan">PAN</label><input id="pan" maxlength="10" placeholder="ABCDE1234F" autocapitalize="characters" />
  <button type="button" class="primary" id="go">Check format</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=document.getElementById('pan').value.trim().toUpperCase();
  const ok=/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(s);
  const o=document.getElementById('out');
  o.className=ok?'ok':'error';
  o.textContent=ok?'Format looks valid.':'Invalid PAN format.';
};
</script>`,
  },
  {
    path: "/gst-calculator.html",
    file: "gst-calculator.html",
    category: "india",
    title: "GST Calculator India — Add or Remove GST",
    desc: "Calculate GST amount and total for 5%, 12%, 18%, or 28% rates. Exclusive or inclusive GST in rupees.",
    card: "GST calculator",
    cardDesc: "Add/remove GST at common India rates.",
    body: `
<h1>GST calculator (India)</h1>${ad}
<div class="tool-panel">
  <label for="amt">Amount (₹)</label><input id="amt" type="number" min="0" step="0.01" value="1000" />
  <label for="rate">GST rate (%)</label>
  <select id="rate"><option value="5">5%</option><option value="12">12%</option><option value="18" selected>18%</option><option value="28">28%</option></select>
  <fieldset class="row" style="border:none;padding:0;margin:12px 0">
    <label><input type="radio" name="mode" value="ex" checked /> Amount excludes GST</label>
    <label><input type="radio" name="mode" value="in" /> Amount includes GST</label>
  </fieldset>
  <button type="button" class="primary" id="go">Calculate</button>
  <div class="stats" id="stats">
    <div class="stat"><strong id="base">—</strong>Taxable value</div>
    <div class="stat"><strong id="gst">—</strong>GST</div>
    <div class="stat"><strong id="total">—</strong>Total</div>
  </div>
</div>
<script>
const fmt=n=>'₹'+n.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
document.getElementById('go').onclick=()=>{
  const raw=Number(document.getElementById('amt').value);
  const r=Number(document.getElementById('rate').value)/100;
  const inc=document.querySelector('input[name=mode]:checked').value==='in';
  if(!Number.isFinite(raw)||raw<0) return;
  let base,gst,total;
  if(inc){ total=raw; base=total/(1+r); gst=total-base; }
  else{ base=raw; gst=base*r; total=base+gst; }
  document.getElementById('base').textContent=fmt(base);
  document.getElementById('gst').textContent=fmt(gst);
  document.getElementById('total').textContent=fmt(total);
};
document.getElementById('go').click();
</script>`,
  },
  {
    path: "/sip-calculator.html",
    file: "sip-calculator.html",
    category: "calculators",
    title: "SIP Calculator — Mutual Fund Returns Estimate",
    desc: "Estimate maturity value for monthly SIP with expected annual return. Free India SIP calculator in browser.",
    card: "SIP calculator",
    cardDesc: "Monthly SIP maturity estimate.",
    body: `
<h1>SIP calculator</h1>${ad}
<div class="tool-panel">
  <label for="p">Monthly SIP (₹)</label><input id="p" type="number" value="5000" />
  <label for="y">Years</label><input id="y" type="number" min="1" max="40" value="10" />
  <label for="r">Expected return (% per year)</label><input id="r" type="number" step="0.1" value="12" />
  <button type="button" class="primary" id="go">Calculate</button>
  <div class="stats">
    <div class="stat"><strong id="inv">—</strong>Invested</div>
    <div class="stat"><strong id="fv">—</strong>Est. maturity</div>
    <div class="stat"><strong id="gain">—</strong>Est. gains</div>
  </div>
  <p class="prose" style="margin-top:12px;font-size:0.85rem">Illustration only—not investment advice. Returns are not guaranteed.</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=Number(document.getElementById('p').value);
  const years=Number(document.getElementById('y').value);
  const ann=Number(document.getElementById('r').value)/100;
  const n=years*12, i=ann/12;
  if(!P||!years||!Number.isFinite(i)) return;
  const fv=i===0?P*n:P*((Math.pow(1+i,n)-1)/i)*(1+i);
  const inv=P*n;
  const fmt=x=>'₹'+Math.round(x).toLocaleString('en-IN');
  document.getElementById('inv').textContent=fmt(inv);
  document.getElementById('fv').textContent=fmt(fv);
  document.getElementById('gain').textContent=fmt(fv-inv);
};
document.getElementById('go').click();
</script>`,
  },
  {
    path: "/domain-age.html",
    file: "domain-age.html",
    category: "seo",
    title: "Domain Age Checker — Registration Date & Site Age",
    desc: "Find when a domain was registered and how old it is. Free RDAP lookup for SEO and due diligence.",
    card: "Domain age checker",
    cardDesc: "Registration date and age via public RDAP.",
    body: `
<h1>Domain age checker</h1>${ad}
<div class="tool-panel">
  <label for="domain">Domain or URL</label>
  <input id="domain" type="text" inputmode="url" autocomplete="off" placeholder="example.com" spellcheck="false" />
  <div class="row">
    <button type="button" class="primary" id="go">Look up</button>
  </div>
  <p id="out" class="tool-feedback" role="status" aria-live="polite"></p>
  <div class="stats" id="stats" hidden>
    <div class="stat"><strong id="created">—</strong>Registered</div>
    <div class="stat"><strong id="age">—</strong>Age</div>
    <div class="stat"><strong id="expires">—</strong>Expires</div>
    <div class="stat"><strong id="changed">—</strong>Last changed</div>
  </div>
</div>
<script>
function normDomain(raw){
  let s=String(raw||'').trim().toLowerCase();
  try{ if(s.includes('://')) s=new URL(s).hostname; }catch(_){}
  s=s.replace(/^www\\./,'').split('/')[0].split(':')[0];
  return s;
}
function eventDate(events,action){
  const e=(events||[]).find(x=>x.eventAction===action||(x.eventAction||'').includes(action));
  return e&&e.eventDate?new Date(e.eventDate):null;
}
function ageFrom(d){
  const n=new Date();
  let y=n.getFullYear()-d.getFullYear(), m=n.getMonth()-d.getMonth(), day=n.getDate()-d.getDate();
  if(day<0){ m--; day+=new Date(n.getFullYear(),n.getMonth(),0).getDate(); }
  if(m<0){ y--; m+=12; }
  const days=Math.floor((n-d)/864e5);
  return {y,m,day,days};
}
const fmt=d=>d.toLocaleDateString(undefined,{dateStyle:'long'});
document.getElementById('go').onclick=async()=>{
  const domain=normDomain(document.getElementById('domain').value);
  const out=document.getElementById('out'), stats=document.getElementById('stats');
  stats.hidden=true;
  out.className='';
  if(!domain||!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(domain)){
    out.className='error';
    out.textContent='Enter a valid domain (e.g. example.com).';
    return;
  }
  if(window.ToolBusy) ToolBusy.start(document.querySelector('.tool-panel'), document.getElementById('go'), out, 'Looking up domain…');
  else out.textContent='Looking up RDAP…';
  try{
    const res=await fetch('https://rdap.org/domain/'+encodeURIComponent(domain),{headers:{Accept:'application/rdap+json, application/json'}});
    if(!res.ok) throw new Error(res.status===404?'Domain not found in RDAP.':('Lookup failed ('+res.status+'). Try again later.'));
    const data=await res.json();
    const reg=eventDate(data.events,'registration');
    if(!reg||isNaN(reg)) throw new Error('Registration date not published for this domain.');
    const exp=eventDate(data.events,'expiration');
    const ch=eventDate(data.events,'last changed')||eventDate(data.events,'last updated');
    const a=ageFrom(reg);
    out.className='ok';
    out.textContent=domain;
    document.getElementById('created').textContent=fmt(reg);
    document.getElementById('age').textContent=a.y+' yr, '+a.m+' mo · '+a.days.toLocaleString()+' days';
    document.getElementById('expires').textContent=exp&&!isNaN(exp)?fmt(exp):'Not listed';
    document.getElementById('changed').textContent=ch&&!isNaN(ch)?fmt(ch):'Not listed';
    stats.hidden=false;
  }catch(err){
    out.className='error';
    out.textContent=err.message||'Lookup failed.';
  }finally{
    if(window.ToolBusy) ToolBusy.stop(document.querySelector('.tool-panel'), document.getElementById('go'), out);
  }
};
document.getElementById('domain').addEventListener('keydown',e=>{ if(e.key==='Enter') document.getElementById('go').click(); });
const prefill=new URLSearchParams(location.search).get('q');
if(prefill){ document.getElementById('domain').value=prefill; document.getElementById('go').click(); }
</script>`,
  },
  {
    path: "/hash-generator.html",
    file: "hash-generator.html",
    category: "developer",
    title: "SHA-256 Hash Generator — Text to Hash Online",
    desc: "Generate SHA-256 hashes from text in the browser. Free online hash calculator using Web Crypto.",
    card: "SHA-256 hash",
    cardDesc: "Hash text with Web Crypto.",
    body: `
<h1>SHA-256 hash generator</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label>
  <textarea id="text" spellcheck="false" placeholder="Enter string to hash…"></textarea>
  <button type="button" class="primary" id="go">Hash</button>
  <label for="out">SHA-256 (hex)</label>
  <input id="out" type="text" readonly spellcheck="false" />
</div>
<script>
async function hash(){
  const s=document.getElementById('text').value;
  const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));
  document.getElementById('out').value=[...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
document.getElementById('go').onclick=hash;
document.getElementById('text').addEventListener('input',()=>{ document.getElementById('out').value=''; });
</script>`,
  },
  {
    path: "/base64-encoder.html",
    file: "base64-encoder.html",
    category: "developer",
    title: "Base64 Encoder & Decoder — Online",
    desc: "Encode or decode Base64 text in the browser. Supports Unicode strings. Free Base64 tool.",
    card: "Base64 encode/decode",
    cardDesc: "Encode and decode Base64 text.",
    body: `
<h1>Base64 encoder / decoder</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label>
  <textarea id="text" spellcheck="false"></textarea>
  <div class="row">
    <button type="button" class="primary" id="enc">Encode</button>
    <button type="button" class="primary" id="dec">Decode</button>
  </div>
  <p id="msg" class="error" hidden></p>
</div>
<script>
const t=document.getElementById('text'), msg=document.getElementById('msg');
function encUnicode(s){
  const bytes=new TextEncoder().encode(s);
  let bin=''; bytes.forEach(b=>bin+=String.fromCharCode(b));
  return btoa(bin);
}
function decUnicode(b64){
  const bin=atob(b64.replace(/\\s/g,''));
  const bytes=Uint8Array.from(bin,c=>c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
document.getElementById('enc').onclick=()=>{ msg.hidden=true; try{ t.value=encUnicode(t.value); }catch(e){ msg.textContent=e.message; msg.hidden=false; } };
document.getElementById('dec').onclick=()=>{ msg.hidden=true; try{ t.value=decUnicode(t.value); }catch(e){ msg.textContent='Invalid Base64.'; msg.hidden=false; } };
</script>`,
  },
  {
    path: "/uuid-generator.html",
    file: "uuid-generator.html",
    category: "developer",
    title: "UUID Generator — Random UUID v4 Online",
    desc: "Generate random UUID v4 identifiers. Copy one or many UUIDs. Free browser-based generator.",
    card: "UUID generator",
    cardDesc: "Random UUID v4 values.",
    body: `
<h1>UUID generator</h1>${ad}
<div class="tool-panel">
  <label for="n">How many</label><input id="n" type="number" min="1" max="50" value="5" style="width:5rem" />
  <button type="button" class="primary" id="go">Generate</button>
  <label for="out">UUIDs</label>
  <textarea id="out" readonly spellcheck="false" rows="6"></textarea>
  <button type="button" class="primary" id="copy">Copy all</button>
</div>
<script>
function uuid(){
  const a=new Uint8Array(16); crypto.getRandomValues(a);
  a[6]=(a[6]&15)|64; a[8]=(a[8]&63)|128;
  const h=[...a].map(b=>b.toString(16).padStart(2,'0')).join('');
  return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20);
}
document.getElementById('go').onclick=()=>{
  const n=Math.min(50,Math.max(1,Number(document.getElementById('n').value)||1));
  document.getElementById('out').value=Array.from({length:n},uuid).join('\\n');
};
document.getElementById('copy').onclick=async()=>{
  const o=document.getElementById('out'); await navigator.clipboard.writeText(o.value); };
document.getElementById('go').click();
</script>`,
  },
  {
    path: "/password-generator.html",
    file: "password-generator.html",
    category: "developer",
    title: "Password Generator — Strong Random Passwords",
    desc: "Create strong random passwords with custom length and character sets. Generated locally in your browser.",
    card: "Password generator",
    cardDesc: "Strong random passwords.",
    body: `
<h1>Password generator</h1>${ad}
<div class="tool-panel">
  <label for="len">Length</label><input id="len" type="number" min="8" max="128" value="16" />
  <div class="row">
    <label><input type="checkbox" id="u" checked /> A–Z</label>
    <label><input type="checkbox" id="l" checked /> a–z</label>
    <label><input type="checkbox" id="d" checked /> 0–9</label>
    <label><input type="checkbox" id="s" checked /> Symbols</label>
  </div>
  <button type="button" class="primary" id="go">Generate</button>
  <label for="out">Password</label>
  <input id="out" type="text" readonly spellcheck="false" autocomplete="off" />
  <button type="button" class="primary" id="copy">Copy</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let pool='';
  if(document.getElementById('u').checked) pool+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if(document.getElementById('l').checked) pool+='abcdefghijklmnopqrstuvwxyz';
  if(document.getElementById('d').checked) pool+='0123456789';
  if(document.getElementById('s').checked) pool+='!@#$%^&*()-_=+[]{};:,.?';
  const len=Math.min(128,Math.max(8,Number(document.getElementById('len').value)||16));
  if(!pool){ document.getElementById('out').value=''; return; }
  const arr=new Uint32Array(len); crypto.getRandomValues(arr);
  document.getElementById('out').value=Array.from(arr,x=>pool[x%pool.length]).join('');
};
document.getElementById('copy').onclick=async()=>{ await navigator.clipboard.writeText(document.getElementById('out').value); };
document.getElementById('go').click();
</script>`,
  },
  ...extraTools(ad),
  ...moreTools(ad),
  ...batch4Tools(ad),
  ...batch5Tools(ad),
  ...batch6Tools(ad),
  ...batch7Tools(ad),
  ...batch8Tools(ad),
  ...batch9Tools(ad),
  ...batch10Tools(ad),
  ...batch11Tools(ad),
  ...batch12Tools(ad),
  ...batch13Tools(ad),
  ...batch14Tools(ad),
  ...batch15Tools(ad),
  ...batch16Tools(ad),
  ...batch17Tools(ad),
  ...batch20Tools(ad),
  ...batch21Tools(ad),
  ...batch22Tools(ad),
  ...batch23Tools(ad),
  ...batch24Tools(ad),
  ...batch25Tools(ad),
  ...batch26Tools(ad),
  ...batch27Tools(ad),
  ...batch28Tools(ad),
  ...batch29Tools(ad),
  ...batch30Tools(ad),
  ...batch31Tools(ad),
];

const guides = [
  {
    path: "/guides/writing-tools.html",
    file: "guides/writing-tools.html",
    title: "Free Online Writing Tools — Word Count & More",
    desc: "Overview of free writing tools: word counter, character counter, and case converter.",
    body: `<h1>Free writing tools online</h1>${ad}
<p>Use our <a href="/word-counter.html">word counter</a>, <a href="/character-counter.html">character counter</a>, <a href="/case-converter.html">case converter</a>, and <a href="/reading-time.html">reading time calculator</a> in the browser. No signup, no upload to a server.</p>
<h2>For SEO and social</h2><p>Character limits matter for titles, meta descriptions, and posts. Count first, then publish.</p>`,
  },
  {
    path: "/guides/seo-checklist.html",
    file: "guides/seo-checklist.html",
    title: "Simple SEO Checklist for Small Sites",
    desc: "A short SEO checklist: titles, sitemap, Search Console, and useful content.",
    body: `<h1>Simple SEO checklist</h1>${ad}
<ol><li>Unique title and description on every page</li><li>Submit sitemap in Google Search Console</li><li>Fast, mobile-friendly pages</li><li>Internal links between related tools</li><li>Useful content, not duplicate spam</li><li>Check competitor domain history with the <a href="/domain-age.html">domain age checker</a> when doing research</li></ol>
<p>Example project: <a href="/y-chat/">Y-Chat</a> on GitHub Pages with sitemap and guides.</p>`,
  },
  {
    path: "/guides/india-id-formats.html",
    file: "guides/india-id-formats.html",
    title: "India IFSC & PAN Format Guide",
    desc: "How IFSC and PAN formats work, and what format-only checkers can and cannot do.",
    body: `<h1>IFSC and PAN formats (India)</h1>${ad}
<p><a href="/ifsc-format.html">IFSC checker</a> — 11 characters. <a href="/pan-format.html">PAN checker</a> — 10 characters. <a href="/gst-calculator.html">GST calculator</a> for invoice math. These tools do not verify with government databases.</p>`,
  },
  {
    path: "/guides/india-finance-tools.html",
    file: "guides/india-finance-tools.html",
    title: "India Finance Calculators — GST, SIP, FD & Salary",
    desc: "Overview of free India finance tools: GST, SIP, FD, RD, invoice, and salary estimators.",
    body: `<h1>India finance tools</h1>${ad}
<p>Use the <a href="/gst-calculator.html">GST calculator</a>, <a href="/sip-calculator.html">SIP calculator</a>, <a href="/fd-calculator.html">FD</a> / <a href="/rd-calculator.html">RD</a> tools, <a href="/india-invoice.html">invoice template</a>, and <a href="/inr-words.html">amount in words</a> for quick estimates—all in the browser.</p>
<p>None of these replace professional tax or investment advice.</p>`,
  },
  {
    path: "/guides/design-pdf-tools.html",
    file: "guides/design-pdf-tools.html",
    title: "Design, PDF & Image Tools — Colors, QR, Merge",
    desc: "Free design and document tools: gradients, color contrast, QR codes, PDF merge, and image compression.",
    body: `<h1>Design & document tools</h1>${ad}
<p>Try the <a href="/color-picker.html">color picker</a>, <a href="/gradient-generator.html">gradient generator</a>, <a href="/qr-code-generator.html">QR generator</a>, <a href="/pdf-merge.html">PDF merge</a>, <a href="/pdf-to-word.html">PDF to Word</a>, <a href="/word-to-pdf.html">Word to PDF</a>, <a href="/image-converter.html">image converter</a>, and <a href="/image-compress.html">image compressor</a>. Files stay on your device where tools run locally.</p>`,
  },
  {
    path: "/guides/y-chat-guide.html",
    file: "guides/y-chat-guide.html",
    title: "Y-Chat Guide — Free Browser Chat Rooms",
    desc: "How to use Y-Chat: free chat rooms, terms, and links from the tools hub.",
    body: `<h1>Y-Chat guide</h1>${ad}
<p><a href="/y-chat/">Y-Chat</a> is free browser chat with public rooms and private IM. You must accept 18+ terms before use.</p>
<p>SEO landing pages: <a href="/free-online-chat.html">free online chat</a>, <a href="/hindi-chat.html">Hindi chat</a>, <a href="/study-chat.html">study chat</a>.</p>`,
  },
];

let canonicalHtmlFiles = null;

/** Point internal links at canonical /slug/ URLs instead of the duplicate .html copies. */
function canonicalizeLinks(html) {
  canonicalHtmlFiles ??= new Set([...tools, ...guides].map((x) => x.file));
  return html.replace(/href="\/([a-z0-9][a-z0-9\-/]*)\.html(#[^"]*)?"/g, (m, slug, hash = "") =>
    canonicalHtmlFiles.has(`${slug}.html`) ? `href="/${slug}/${hash}"` : m,
  );
}

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, rel.endsWith(".html") ? canonicalizeLinks(content) : content);
}

const hubCards = tools.map((t) =>
  `<a class="card" href="${t.path}"><h2>${t.card}</h2><p>${t.cardDesc}</p></a>`,
).join("\n");

const featuredHubSet = new Set(FEATURED_HUB_SLUGS);
const featuredHubCards = micrositeDefs.filter((s) => featuredHubSet.has(s.slug)).map(micrositeCard).join("\n");
const otherHubCards = micrositeDefs.filter((s) => !featuredHubSet.has(s.slug)).map(micrositeCard).join("\n");

const popularCards = POPULAR_TOOL_FILES.map((file) => tools.find((t) => t.file === file))
  .filter(Boolean)
  .map((t) => toolCardHtml({ href: canonicalFromFile(t.file), title: t.card, desc: t.cardDesc, category: t.category }))
  .join("\n");

const indexMain = `<div class="hero">
<p class="hero-kicker">${tools.length} free tools · no signup</p>
<h1>Free online calculators &amp; tools</h1>
<p class="hero-lead">India finance, PDF, writing, developer and everyday calculators. Most tools run entirely in your browser, so your data stays on your device.</p>
${toolFinderHtml()}
<ul class="trust-strip" aria-label="How it works">
<li>Free forever</li>
<li>No account</li>
<li>Works on mobile</li>
</ul>
</div>
${ad}
<section id="hubs" class="home-section" aria-labelledby="hubs-heading">
<h2 id="hubs-heading">Start with a topic hub</h2>
<p class="section-hint">Curated collections—easier than scrolling the full list.</p>
<div class="grid grid--scroll">${featuredHubCards}</div>
${otherHubCards ? `<details class="more-hubs"><summary>More topic hubs</summary><div class="grid grid--compact">${otherHubCards}</div></details>` : ""}
</section>
<section class="home-section" aria-labelledby="popular-heading">
<h2 id="popular-heading">Popular tools</h2>
<p class="section-hint">Most-used pages—open one and start typing.</p>
<div class="grid grid--compact">${popularCards}</div>
</section>
${hubSectionsHtml()}
<section class="home-section" aria-labelledby="guides-heading">
<h2 id="guides-heading">Guides</h2>
<div class="grid grid--compact">${guides.map((g) => `<a class="card tool-card" href="${canonicalFromFile(g.file)}">${iconTile(["book", "violet"])}<span class="card-body"><h3 class="card-title">${g.title.split("—")[0].trim()}</h3><p>${g.desc.slice(0, 80)}…</p></span></a>`).join("")}</div>
</section>
${renderSeoHtml(indexSeo)}`;

const indexTitle = formatDocumentTitle(
  `Free Online Calculators & Tools — ${tools.length}+ Utilities`,
);
const indexItemList = POPULAR_TOOL_FILES.map((file) => tools.find((t) => t.file === file))
  .filter(Boolean)
  .slice(0, 12)
  .map((t) => ({ name: t.card, url: canonicalFromFile(t.file) }));

const indexHtml = page(
  "/",
  indexTitle,
  `${tools.length}+ free online tools: income tax, GST, EMI, PDF merge, word counter, QR codes, and more. Fast, private, no signup—works in your browser.`,
  indexMain,
  "",
  {
    keywords: indexSeo.keywords,
    faqs: indexSeo.faqs,
    isHome: true,
    canonical: "/",
    breadcrumbs: [{ name: "Home", url: "/" }],
    itemList: indexItemList,
  },
);

write("index.html", indexHtml);

const searchIndex = tools.map((t) => ({
  name: t.card,
  desc: t.cardDesc,
  href: canonicalFromFile(t.file),
  cat: HUB_CATEGORIES.find((c) => c.id === t.category)?.title || t.category,
}));
write("assets/tools-search.json", `${JSON.stringify(searchIndex)}\n`);

function resolveSeo(file, toolOrGuide) {
  let seo = pageSeo[file] ? { ...pageSeo[file] } : null;
  if (!seo && toolOrGuide?.card) seo = fallbackToolSeo(toolOrGuide);
  if (!seo && toolOrGuide?.title) seo = fallbackGuideSeo(toolOrGuide);
  if (!seo) return null;
  if (toolOrGuide?.card) {
    return enrichToolSeo(seo, toolOrGuide, { allTools: tools, categoryHub: CATEGORY_HUB });
  }
  if (toolOrGuide?.title && file.startsWith("guides/")) {
    return enrichContentSeo(seo, {
      title: toolOrGuide.title,
      desc: toolOrGuide.desc,
      faqs: seo.faqs,
    });
  }
  return seo;
}

function pageOpts(file, entity) {
  const seo = resolveSeo(file, entity);
  return {
    keywords: seo?.keywords,
    faqs: seo?.faqs,
    howTo: seo?.howTo,
    ogLocale: seo?.ogLocale,
    softwareApp: !file.startsWith("guides/"),
    seoBlock: seo,
  };
}

function pageTitleDesc(file, entity) {
  const seo = resolveSeo(file, entity);
  const label = entity.card || entity.title?.split("—")[0]?.trim() || "tool";
  return {
    title: formatDocumentTitle(seo?.metaTitle || entity.title),
    desc: buildMetaDescription(seo?.metaDescription || entity.desc, label),
  };
}

function fullMain(file, entity) {
  const seo = resolveSeo(file, entity);
  let body = entity.body;
  if (entity.card && entity.category) body = normalizeToolBody(body, entity);
  if (!entity.card) return body + (seo ? renderSeoHtml(seo) : "");
  body = ensureToolAds(body);
  const related = relatedCardsHtml(seo?.related, canonicalFromFile(file));
  return body + related + (seo ? renderSeoHtml({ ...seo, related: [] }) : "");
}

for (const t of tools) {
  const seo = resolveSeo(t.file, t);
  const canonical = seo?.canonicalPath || canonicalFromFile(t.file);
  const { title, desc } = pageTitleDesc(t.file, t);
  const hub = CATEGORY_HUB[t.category];
  const crumbs = [
    { name: "Home", url: "/" },
    ...(hub ? [{ name: hub.label, url: hub.href }] : []),
    { name: t.card, url: canonical },
  ];
  const bc = breadcrumbHtml(crumbs);
  const main = fullMain(t.file, t);
  const opts = {
    ...pageOpts(t.file, t),
    canonical,
    breadcrumbs: crumbs,
  };
  write(t.file, page(t.path, title, desc, main, bc, opts));
  write(`${t.file.replace(/\.html$/, "")}/index.html`, page(canonical, title, desc, main, bc, opts));
}

for (const g of guides) {
  const canonical = canonicalFromFile(g.file);
  const short = g.title.split("—")[0].trim();
  const bc = breadcrumbHtml([
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides/writing-tools/" },
    { name: short },
  ]);
  const main = fullMain(g.file, g);
  const opts = {
    ...pageOpts(g.file, g),
    canonical,
    softwareApp: false,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides/writing-tools/" },
      { name: short, url: canonical },
    ],
  };
  const gTitle = formatDocumentTitle(g.title);
  const gDesc = buildMetaDescription(g.desc, g.title.split("—")[0].trim());
  write(g.file, page(g.path, gTitle, gDesc, main, bc, opts));
  write(`${g.file.replace(/\.html$/, "")}/index.html`, page(canonical, gTitle, gDesc, main, bc, opts));
}

const micrositeUrls = [];
for (const def of micrositeDefs) {
  const file = `${def.slug}/index.html`;
  const urlPath = `/${def.slug}/`;
  micrositeUrls.push(urlPath);
  const bc = breadcrumbHtml([{ name: "Home", url: "/" }, { name: def.hero }]);
  const body = micrositeMain(def, ad, tools, guides);
  const seo = enrichContentSeo(pageSeo[file], {
    title: def.title,
    desc: def.desc,
    keywords: def.keywords,
    faqs: def.faqs,
  });
  const main = body + renderSeoHtml(seo);
  const opts = {
    keywords: seo.keywords,
    faqs: seo.faqs,
    canonical: urlPath,
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: def.hero, url: urlPath },
    ],
  };
  write(
    file,
    page(urlPath, formatDocumentTitle(def.title), buildMetaDescription(def.desc, def.hero), main, bc, opts),
  );
}

{
  const file = "brief/index.html";
  const urlPath = "/brief/";
  micrositeUrls.push(urlPath);
  const title = "News brief — India headlines (News, Sports & Business) | Tools";
  const desc =
    "Read latest India headlines in short cards. News, Sports, and Business tabs—Inshorts-style brief, free in your browser.";
  const bc = breadcrumbHtml([{ name: "Home", url: "/" }, { name: "News brief" }]);
  const briefSeo = enrichContentSeo(pageSeo[file], { title, desc, faqs: pageSeo[file]?.faqs });
  const main = briefSiteBody(ad) + renderSeoHtml(briefSeo);
  write(
    file,
    page(urlPath, title, buildMetaDescription(desc, "news brief"), main, bc, {
      keywords: briefSeo.keywords,
      faqs: briefSeo.faqs,
      softwareApp: false,
      canonical: urlPath,
      breadcrumbs: [
        { name: "Home", url: "/" },
        { name: "News brief", url: urlPath },
      ],
    }),
  );
}

{
  const file = "quiz/index.html";
  const urlPath = "/quiz/";
  micrositeUrls.push(urlPath);
  const title = formatDocumentTitle("Free Online Quiz & Trivia — Hourly 10 Questions");
  const desc = "Hourly ten-question trivia in your browser. New set each local hour—general knowledge and tech.";
  const bc = breadcrumbHtml([{ name: "Home", url: "/" }, { name: "Quiz" }]);
  const quizSeo = enrichContentSeo(pageSeo[file], { title, desc, faqs: pageSeo[file]?.faqs });
  const main = quizSiteBody(ad) + renderSeoHtml(quizSeo);
  write(
    file,
    page(urlPath, title, buildMetaDescription(desc, "online quiz"), main, bc, {
      keywords: quizSeo.keywords,
      faqs: quizSeo.faqs,
      softwareApp: false,
      canonical: urlPath,
      breadcrumbs: [
        { name: "Home", url: "/" },
        { name: "Quiz", url: urlPath },
      ],
    }),
  );
}

const infoPages = [
  {
    slug: "about",
    name: "About",
    title: `About ${SITE_NAME} — Free Browser Calculators & Utilities`,
    desc: `What ${SITE_NAME} is, how the free tools work, and how calculations and files are handled in your browser.`,
    body: `<header class="page-hero"><h1>About ${SITE_NAME}</h1>
<p class="page-lead">A collection of ${tools.length}+ free calculators and utilities for everyday work—finance, documents, writing, development, and study.</p></header>
<div class="prose prose--page">
<h2>How the tools work</h2>
<p>Most tools run as JavaScript in your browser. Text you type and files you open (PDFs, images, Word documents, videos) are processed on your device and are not uploaded to this website.</p>
<p>A few tools need a public service to answer a question—for example the domain age checker queries public RDAP records and the IP lookup asks ipify.org for your public IP address.</p>
<h2>Accuracy</h2>
<p>Calculators give estimates based on the formulas and rates shown on each page. They are not financial, tax, legal, or medical advice—confirm important numbers with a qualified professional or the official source.</p>
<h2>Cost</h2>
<p>Every tool is free with no account. The site is supported by advertising; see the <a href="/privacy/">privacy policy</a> for how ads work.</p>
<h2>Site owner</h2>
<p>This site is owned and maintained by <strong>${SITE_PUBLISHER.brand}</strong>, part of <strong>${SITE_PUBLISHER.company}</strong>, based in ${SITE_PUBLISHER.locality}, India.</p>
<h2>Start here</h2>
<ul><li><a href="/finance/">India finance calculators</a></li><li><a href="/design/">PDF, image &amp; design tools</a></li><li><a href="/writing/">Writing tools</a></li><li><a href="/dev/">Developer utilities</a></li></ul>
</div>`,
  },
  {
    slug: "privacy",
    name: "Privacy policy",
    title: `Privacy Policy — ${SITE_NAME}`,
    desc: `How ${SITE_NAME} handles your data: browser-based processing, advertising cookies from Google AdSense, and third-party services.`,
    body: `<header class="page-hero"><h1>Privacy policy</h1>
<p class="page-lead">Short version: tools process your input in your browser. This site uses Google Analytics and AdSense, which may use cookies.</p></header>
<div class="prose prose--page">
<h2>Data you enter in tools</h2>
<p>Text, numbers, and files you use in the tools are processed locally in your browser and are not sent to or stored by this website. Some tools load open-source libraries from a public CDN (jsDelivr) to do this work; the libraries run on your device.</p>
<p>A few tools need an outside service: the domain age checker queries public RDAP servers (rdap.org), the IP lookup asks ipify.org for your public IP, and the news brief may call rss2json.com when you tap Refresh (otherwise it uses a snapshot file on this site). Those requests go from your browser directly to that service.</p>
<h2>Cookie consent</h2>
<p>We use <a href="https://www.cookieyes.com/" rel="noopener">CookieYes</a> to show a cookie banner and record your choices about analytics and advertising cookies. You can change preferences anytime via the cookie settings link on the banner (if shown in your region).</p>
<h2>Analytics</h2>
<p>We use <a href="https://analytics.google.com/" rel="noopener">Google Analytics 4</a> to understand aggregate traffic (pages viewed, approximate location, device type). Analytics runs via Google’s gtag.js script; page URLs and referrer may be sent to Google when you accept analytics cookies and the measurement ID is configured. You can also opt out with a browser add-on such as the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">Google Analytics Opt-out Browser Add-on</a>.</p>
<h2>Advertising and cookies</h2>
<p>This site uses Google AdSense to show ads. Google and its partners may use cookies or similar technologies to serve ads based on your visits to this and other websites. You can learn how Google uses this information at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">How Google uses information from sites that use its services</a>, and you can turn off personalised ads in <a href="https://adssettings.google.com/" rel="noopener">Google Ads Settings</a>.</p>
<h2>Local storage</h2>
<p>A few tools (for example the resume builder) can save drafts in your browser's local storage so you don't lose work. That data stays on your device; clear it any time from your browser settings.</p>
<h2>Accounts</h2>
<p>The tools need no account and collect no names or email addresses. Y-Chat is a separate chat app with its own terms.</p>
<h2>Changes</h2>
<p>If this policy changes, the updated version will be posted on this page.</p>
</div>`,
  },
];

for (const p of infoPages) {
  const urlPath = `/${p.slug}/`;
  write(
    `${p.slug}/index.html`,
    page(urlPath, p.title, p.desc, p.body, breadcrumbHtml([{ name: "Home", url: "/" }, { name: p.name }]), {
      canonical: urlPath,
      softwareApp: false,
      breadcrumbs: [
        { name: "Home", url: "/" },
        { name: p.name, url: urlPath },
      ],
    }),
  );
}

const notFound = page(
  "/404.html",
  "Page not found — Tools",
  "This tool page was not found. Browse free calculators and writing tools on the home page.",
  `<h1>Page not found</h1>
<p>That URL is not on this site. Try the <a href="/">tools home</a> or <a href="/y-chat/">Y-Chat</a>.</p>
<ul>
  <li><a href="/word-counter/">Word counter</a></li>
  <li><a href="/emi-calculator/">EMI calculator</a></li>
  <li><a href="/income-tax-calculator/">Income tax calculator (India)</a></li>
  <li><a href="/guides/writing-tools/">Writing tools guide</a></li>
</ul>`,
  "",
  { noindex: true, canonical: "/404.html" },
);
write("404.html", notFound);
write("tools/index.html", `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/"><title>Redirect</title></head><body><p><a href="/">Go to ${SITE_NAME}</a></p></body></html>`);

const sitemapEntries = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  ...micrositeUrls.map((u) => ({ loc: u, priority: "0.9", changefreq: "weekly" })),
  ...tools.map((t) => ({
    loc: canonicalFromFile(t.file),
    priority: pageSeo[t.file]?.sitemapPriority || "0.8",
    changefreq: pageSeo[t.file]?.sitemapChangefreq || "monthly",
  })),
  ...guides.map((g) => ({
    loc: canonicalFromFile(g.file),
    priority: "0.7",
    changefreq: "monthly",
  })),
  ...infoPages.map((p) => ({ loc: `/${p.slug}/`, priority: "0.3", changefreq: "yearly" })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (e) =>
      `  <url><loc>${BASE}${e.loc}</loc><lastmod>${BUILD_DATE}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;
write("sitemap.xml", sitemap);
write(
  "robots.txt",
  `User-agent: *
Allow: /
Disallow: /404.html
Disallow: /tools/

Sitemap: ${BASE}/sitemap.xml
`,
);
write(".nojekyll", "");
write("google34da527c15058477.html", "google-site-verification: google34da527c15058477.html\n");

try {
  const brief = await buildBriefFeedsJson();
  write("assets/brief-feeds.json", `${JSON.stringify(brief, null, 2)}\n`);
  console.log(
    "Brief feeds:",
    Object.entries(brief.feeds)
      .map(([k, v]) => `${k}=${v.length}`)
      .join(", "),
  );
} catch (e) {
  console.warn("Brief feeds: fetch failed (keeping existing assets/brief-feeds.json if present):", e.message);
}

console.log("Built", tools.length, "tools,", guides.length, "guides,", micrositeUrls.length, "microsites");
