import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PREFIX_LOCALES } from "./i18n.mjs";

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

export function lookup(locale, english) {
  if (!english || locale === "en") return english;
  const map = loadCache(locale);
  return map[english] || english;
}

export function dictFor(locale) {
  const map = loadCache(locale);
  return new Map(Object.entries(map));
}

async function translateBatch(locale, strings) {
  const tl = GTX[locale];
  if (!tl || !strings.length) return [];
  const sep = "\n§\n";
  const q = strings.join(sep);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { "User-Agent": "ToolHQ-i18n/1.0" } });
  if (!res.ok) throw new Error(`translate ${locale} HTTP ${res.status}`);
  const data = await res.json();
  const joined = (data[0] || []).map((row) => row[0] || "").join("");
  const parts = joined.split("§").map((s) => s.replace(/^\n+|\n+$/g, "").trim());
  if (parts.length !== strings.length) {
    if (strings.length === 1) return [joined.trim() || strings[0]];
    const out = [];
    for (const s of strings) out.push((await translateBatch(locale, [s]))[0] || s);
    return out;
  }
  return parts;
}

async function fillLocale(locale, strings) {
  const map = loadCache(locale);
  const missing = strings.filter((s) => map[s] == null);
  if (!missing.length) return 0;
  const chunkSize = 40;
  let filled = 0;
  let rateLimited = 0;
  for (let i = 0; i < missing.length; i += chunkSize) {
    const chunk = missing.slice(i, i + chunkSize);
    let tries = 0;
    while (tries < 4) {
      try {
        const out = await translateBatch(locale, chunk);
        for (let j = 0; j < chunk.length; j++) {
          map[chunk[j]] = out[j] || chunk[j];
        }
        filled += chunk.length;
        break;
      } catch (err) {
        tries += 1;
        const wait = /429/.test(String(err.message)) ? 8000 * tries : 500 * tries;
        if (/429/.test(String(err.message))) rateLimited += 1;
        if (tries >= 3 || rateLimited >= 4) {
          console.warn(`translate ${locale} backing off (${err.message})`);
          saveCache(locale);
          return filled;
        }
        await new Promise((r) => setTimeout(r, wait));
      }
    }
    await new Promise((r) => setTimeout(r, 80));
    if ((i / chunkSize) % 10 === 0 && i) process.stdout.write(`  ${locale} ${i}/${missing.length}\n`);
  }
  saveCache(locale);
  return filled;
}

export async function ensureTranslations(strings) {
  const unique = [...new Set(strings.filter(Boolean))];
  console.log(`i18n: ${unique.length} unique English strings × ${PREFIX_LOCALES.length} locales`);
  for (const locale of PREFIX_LOCALES) {
    const map = loadCache(locale);
    const cached = unique.filter((s) => map[s]).length;
    const coverage = cached / Math.max(unique.length, 1);
    const missing = unique.length - cached;
    if (Object.keys(map).length < 10) {
      console.log(`i18n: ${locale} skipped (empty cache, chrome-only)`);
      continue;
    }
    if (!missing) {
      console.log(`i18n: ${locale} cache hit (100%)`);
      continue;
    }
    console.log(`i18n: ${locale} filling ${missing} missing (${Math.round(coverage * 100)}% cached)`);
    const n = await fillLocale(locale, unique);
    console.log(`i18n: ${locale} ${n ? `filled ${n}` : "partial"} (${Math.round((unique.filter((s) => loadCache(locale)[s]).length / unique.length) * 100)}%)`);
  }
}
