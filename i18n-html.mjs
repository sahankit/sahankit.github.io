import { localeHref, t } from "./i18n.mjs";

const ATTRS = ["placeholder", "aria-label", "title", "alt"];
const SKIP_CHUNK =
  /^(<(?:script|style|pre|code|kbd)\b|<div class="lang-switcher">)/i;
const SKIP_SPLIT =
  /(<(?:script|style)[\s\S]*?<\/(?:script|style)>|<div class="lang-switcher">[\s\S]*?<\/div>|<(?:pre|code|kbd)\b[\s\S]*?<\/(?:pre|code|kbd)>)/gi;
const FUNCTION_WORD = /^(and|or|the|a|an|to|of|in|on|for|vs|vs\.|by|at|as)$/i;
const META_CONTENT =
  /(<meta\b[^>]*(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"[^>]*\bcontent=")([^"]*)("[^>]*>)/gi;
const META_CONTENT_FIRST =
  /(<meta\b[^>]*\bcontent=")([^"]*)("[^>]*(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"[^>]*>)/gi;

export function extractTextStrings(html) {
  const found = new Set();
  const chunks = String(html).split(SKIP_SPLIT);
  for (const chunk of chunks) {
    if (SKIP_CHUNK.test(chunk)) continue;
    for (const m of chunk.matchAll(/>([^<]*[A-Za-z][^<]*)</g)) {
      const core = decode(m[1]).replace(/\s+/g, " ").trim();
      if (shouldTranslate(core)) found.add(core);
    }
    for (const attr of ATTRS) {
      const re = new RegExp(`${attr}="([^"]*[A-Za-z][^"]*)"`, "gi");
      for (const m of chunk.matchAll(re)) {
        const core = decode(m[1]).replace(/\s+/g, " ").trim();
        if (shouldTranslate(core)) found.add(core);
      }
    }
  }
  return [...found];
}

export function localizeHtml(html, locale, dict) {
  if (!locale || locale === "en") return html;
  const parts = String(html).split(SKIP_SPLIT);
  return parts
    .map((chunk) => {
      if (SKIP_CHUNK.test(chunk)) return chunk;
      let out = rewriteHrefs(chunk, locale);
      out = replaceText(out, dict);
      out = replaceAttrs(out, dict);
      out = replaceMeta(out, dict);
      out = replaceFaqTemplates(out, dict, locale);
      return out;
    })
    .join("");
}

export function rewriteHrefs(html, locale) {
  return html.replace(/\s(href|action)="(\/[^"]*)"/g, (full, attr, href) => ` ${attr}="${localeHref(locale, href)}"`);
}

export function shouldTranslate(s) {
  if (!s || s.length < 2 || s.length > 500) return false;
  if (!/[A-Za-z]/.test(s)) return false;
  if (FUNCTION_WORD.test(s)) return false;
  if (/^[A-Z0-9+./\-]+$/.test(s) && s.length <= 8) return false;
  if (/^https?:\/\//i.test(s)) return false;
  if (/[{}]/.test(s) && /:[^;]+;/.test(s)) return false;
  if (/[{}<>;=]/.test(s) && /function|=>|var |const |let /.test(s)) return false;
  return true;
}

function replaceText(html, dict) {
  return html.replace(/>([^<]*[A-Za-z][^<]*)</g, (full, text) => {
    const lead = text.match(/^\s*/)[0];
    const trail = text.match(/\s*$/)[0];
    const core = decode(text).replace(/\s+/g, " ").trim();
    if (!shouldTranslate(core)) return full;
    const tr = dict.get(core);
    if (!tr || tr === core) return full;
    return `>${lead}${escapeHtml(tr)}${trail}<`;
  });
}

function replaceAttrs(html, dict) {
  let out = html;
  for (const attr of ATTRS) {
    const re = new RegExp(`(${attr})="([^"]*[A-Za-z][^"]*)"`, "gi");
    out = out.replace(re, (full, name, value) => {
      const core = decode(value).replace(/\s+/g, " ").trim();
      if (!shouldTranslate(core)) return full;
      const tr = dict.get(core);
      if (!tr || tr === core) return full;
      return `${name}="${escapeAttr(tr)}"`;
    });
  }
  return out;
}

function replaceMeta(html, dict) {
  const swap = (full, a, value, b) => {
    const core = decode(value).replace(/\s+/g, " ").trim();
    if (!shouldTranslate(core)) return full;
    const tr = dict.get(core);
    if (!tr || tr === core) return full;
    return `${a}${escapeAttr(tr)}${b}`;
  };
  return html.replace(META_CONTENT, swap).replace(META_CONTENT_FIRST, swap);
}

function replaceFaqTemplates(html, dict, locale) {
  let out = html.replace(/Is this ([^<?]+?) free\?/g, (_, name) => {
    const n = dict.get(name.trim()) || name.trim();
    return t(locale, "faqFreeQ", { name: n });
  });
  out = out.replace(
    /Yes\. The ([^<]+?) is free to use in your browser with no account required\./g,
    (_, name) => {
      const n = dict.get(name.trim()) || name.trim();
      return t(locale, "faqFreeA", { name: n });
    },
  );
  return out;
}

function decode(s) {
  return String(s)
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}
