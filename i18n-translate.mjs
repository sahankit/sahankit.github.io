import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PREFIX_LOCALES } from "./i18n.mjs";
import { phraseDict } from "./i18n-phrases.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = path.join(ROOT, "i18n", "cache");
const GTX = {
  zh: "zh-CN",
  hi: "hi",
  es: "es",
  ar: "ar",
  fr: "fr",
  pt: "pt",
  ru: "ru",
  bn: "bn",
  ja: "ja",
  de: "de",
  ko: "ko",
  id: "id",
  tr: "tr",
  vi: "vi",
};

const caches = new Map();

function cachePath(locale) {
  return path.join(CACHE_DIR, `${locale}.json`);
}

function loadCache(locale) {
  if (caches.has(locale)) return caches.get(locale);
  const p = cachePath(locale);
  let map = {};
  try {
    map = JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    map = {};
  }
  caches.set(locale, map);
  return map;
}

function saveCache(locale) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const map = caches.get(locale) || {};
  const ordered = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(cachePath(locale), `${JSON.stringify(ordered, null, 0)}\n`);
}

function mergedMap(locale) {
  return { ...loadCache(locale), ...phraseDict(locale) };
}

export function lookup(locale, english) {
  if (!english || locale === "en") return english;
  const map = mergedMap(locale);
  return map[english] || english;
}

export function dictFor(locale) {
  return new Map(Object.entries(mergedMap(locale)));
}

const KEEP = /\b(GST|EMI|PDF|JSON|CSV|HTML|CSS|SEO|API|URL|FAQ|ToolHQ|Y-Chat)\b/g;

function protectKeep(s) {
  return String(s).replace(KEEP, (m) => `⟦${m}⟧`);
}

function restoreKeep(s) {
  return String(s).replace(/⟦([^⟧]+)⟧/g, "$1");
}

async function translateBatch(locale, strings) {
  const tl = GTX[locale];
  if (!tl || !strings.length) return [];
  const sep = "\n§\n";
  const q = strings.map(protectKeep).join(sep);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { "User-Agent": "ToolHQ-i18n/1.0" } });
  if (!res.ok) throw new Error(`translate ${locale} HTTP ${res.status}`);
  const data = await res.json();
  const joined = restoreKeep((data[0] || []).map((row) => row[0] || "").join(""));
  const parts = joined.split("§").map((s) => restoreKeep(s.replace(/^\n+|\n+$/g, "").trim()));
  if (parts.length !== strings.length) {
    if (strings.length === 1) return [joined.trim() || strings[0]];
    const out = [];
    for (const s of strings) out.push((await translateBatch(locale, [s]))[0] || s);
    return out;
  }
  return parts;
}

function keepTranslation(en, tr) {
  if (!tr) return false;
  if (tr === en && /[a-z]/.test(en) && en.length > 24) return false;
  return true;
}

async function fillLocale(locale, strings) {
  const map = loadCache(locale);
  const phrases = phraseDict(locale);
  const missing = strings.filter((s) => map[s] == null && phrases[s] == null);
  if (!missing.length) return 0;
  const chunkSize = 12;
  let filled = 0;
  let rateLimited = 0;
  for (let i = 0; i < missing.length; i += chunkSize) {
    const chunk = missing.slice(i, i + chunkSize);
    let tries = 0;
    while (tries < 3) {
      try {
        const out = await translateBatch(locale, chunk);
        for (let j = 0; j < chunk.length; j++) {
          if (!keepTranslation(chunk[j], out[j])) continue;
          map[chunk[j]] = out[j];
          filled += 1;
        }
        break;
      } catch (err) {
        tries += 1;
        const wait = /429/.test(String(err.message)) ? 15000 * tries : 400 * tries;
        if (/429/.test(String(err.message))) rateLimited += 1;
        if (tries >= 3 || rateLimited >= 3) {
          console.warn(`translate ${locale} backing off (${err.message})`);
          saveCache(locale);
          return filled;
        }
        await new Promise((r) => setTimeout(r, wait));
      }
    }
    await new Promise((r) => setTimeout(r, 120));
    if ((i / chunkSize) % 10 === 0 && i) process.stdout.write(`  ${locale} ${i}/${missing.length}\n`);
  }
  saveCache(locale);
  return filled;
}

export async function ensureTranslations(strings) {
  const unique = [...new Set(strings.filter(Boolean))];
  const locales = process.env.I18N_LOCALES
    ? process.env.I18N_LOCALES.split(",").map((s) => s.trim()).filter((s) => PREFIX_LOCALES.includes(s))
    : PREFIX_LOCALES;
  console.log(`i18n: ${unique.length} unique English strings × ${locales.length} locales`);
  if (process.env.SKIP_TRANSLATE === "1") {
    for (const locale of locales) {
      const map = loadCache(locale);
      const phrases = phraseDict(locale);
      const cached = unique.filter((s) => map[s] || phrases[s]).length;
      console.log(`i18n: ${locale} skip-fill (${Math.round((cached / Math.max(unique.length, 1)) * 100)}% cached)`);
    }
    return;
  }
  for (const locale of locales) {
    const map = loadCache(locale);
    const phrases = phraseDict(locale);
    const cached = unique.filter((s) => map[s] || phrases[s]).length;
    const coverage = cached / Math.max(unique.length, 1);
    const missing = unique.length - cached;
    if (!missing) {
      console.log(`i18n: ${locale} cache hit (100%)`);
      continue;
    }
    console.log(`i18n: ${locale} filling ${missing} missing (${Math.round(coverage * 100)}% cached)`);
    const n = await fillLocale(locale, unique);
    console.log(`i18n: ${locale} ${n ? `filled ${n}` : "partial"} (${Math.round((unique.filter((s) => loadCache(locale)[s]).length / unique.length) * 100)}%)`);
  }
}
