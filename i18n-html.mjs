import { localeHref } from "./i18n.mjs";

const ATTRS = ["placeholder", "aria-label", "title", "alt"];

export function extractTextStrings(html) {
  const found = new Set();
  const chunks = String(html).split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>)/gi);
  for (const chunk of chunks) {
    if (/^<(script|style|svg)\b/i.test(chunk)) continue;
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
  const parts = String(html).split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)/gi);
  return parts
    .map((chunk) => {
      if (/^<(script|style)\b/i.test(chunk)) return chunk;
      let out = rewriteHrefs(chunk, locale);
      out = replaceText(out, dict);
      out = replaceAttrs(out, dict);
      return out;
    })
    .join("");
}

export function rewriteHrefs(html, locale) {
  return html.replace(/\s(href|action)="(\/[^"]*)"/g, (full, attr, href) => ` ${attr}="${localeHref(locale, href)}"`);
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

function shouldTranslate(s) {
  if (!s || s.length < 2 || s.length > 500) return false;
  if (!/[A-Za-z]/.test(s)) return false;
  if (/^[A-Z0-9+./\-]+$/.test(s) && s.length <= 8) return false;
  if (/^https?:\/\//i.test(s)) return false;
  if (/[{}<>;=]/.test(s) && /function|=>|var |const |let /.test(s)) return false;
  return true;
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
