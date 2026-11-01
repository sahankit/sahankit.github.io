/** Fetch Google News RSS server-side (no CORS). Used at build time and in CI. */

export const BRIEF_FEED_URLS = {
  news: "https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en",
  sports: "https://news.google.com/rss/headlines/section/topic/SPORTS?hl=en-IN&gl=IN&ceid=IN:en",
  business: "https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-IN&gl=IN&ceid=IN:en",
};

const UA = "Tools-NewsBrief/1.0 (+https://sahankit.github.io/brief/)";

function decodeXmlText(raw) {
  if (!raw) return "";
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseTitle(raw) {
  const t = decodeXmlText(raw);
  const i = t.lastIndexOf(" - ");
  if (i > 0) return { title: t.slice(0, i).trim(), source: t.slice(i + 3).trim() };
  return { title: t, source: "" };
}

function inshort(text, maxWords = 55) {
  const w = text.split(/\s+/).filter(Boolean);
  if (w.length <= maxWords) return text;
  return `${w.slice(0, maxWords).join(" ")}…`;
}

export function parseRssItems(xml, limit = 25) {
  const items = [];
  for (const block of xml.match(/<item[\s\S]*?<\/item>/gi) || []) {
    const rawTitle = block.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
    const { title, source } = parseTitle(rawTitle);
    const link = decodeXmlText(block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)?.[1] || "");
    const pub = decodeXmlText(block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i)?.[1] || "");
    const desc = decodeXmlText(block.match(/<description[^>]*>([\s\S]*?)<\/description>/i)?.[1] || "");
    const srcName =
      decodeXmlText(block.match(/<source[^>]*>([\s\S]*?)<\/source>/i)?.[1] || "") || source;
    if (!title || !link) continue;
    items.push({
      title,
      link,
      pub,
      source: srcName,
      summary: inshort(desc || title),
    });
    if (items.length >= limit) break;
  }
  return items;
}

export async function fetchFeedXml(url, timeoutMs = 20000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": UA, Accept: "application/rss+xml, application/xml, text/xml,*/*" },
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

/** @returns {Promise<{ updated: string, feeds: Record<string, import('./fetch-brief-feeds.mjs').BriefItem[]> }>} */
export async function buildBriefFeedsJson() {
  const feeds = {};
  for (const [key, url] of Object.entries(BRIEF_FEED_URLS)) {
    const xml = await fetchFeedXml(url);
    feeds[key] = parseRssItems(xml, 25);
  }
  return { updated: new Date().toISOString(), feeds };
}

import { fileURLToPath } from "node:url";

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const out = process.argv[2] || "assets/brief-feeds.json";
  const data = await buildBriefFeedsJson();
  const { writeFileSync } = await import("node:fs");
  writeFileSync(out, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Wrote ${out} (${Object.values(data.feeds).flat().length} stories)`);
}
