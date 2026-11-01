#!/usr/bin/env node
/**
 * Site verification: rebuild, check every sitemap URL, validate HTML/scripts/links.
 * Run: node verify-site.mjs
 */
import fs from "fs";
import path from "path";
import vm from "vm";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const BASE = "https://sahankit.github.io";

const SKIP_LINK_PREFIXES = ["/y-chat/", "mailto:", "tel:", "javascript:", "#"];
const OPTIONAL_PATHS = new Set(["/y-chat/"]);

function urlToFile(loc) {
  let p = loc.replace(BASE, "").replace(/^\//, "");
  if (!p) return "index.html";
  if (p.endsWith("/")) return `${p}index.html`;
  if (!p.endsWith(".html")) return `${p}/index.html`;
  return p;
}

function collectInternalHrefs(html) {
  const hrefs = [];
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) hrefs.push(m[1]);
  return hrefs;
}

function inlineScripts(html) {
  const scripts = [];
  const re = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1];
    if (/src\s*=/.test(attrs)) continue;
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) continue;
    if (/type\s*=\s*["']module["']/i.test(attrs)) continue;
    const body = m[2].trim();
    if (body) scripts.push(body);
  }
  return scripts;
}

function resolveHref(href) {
  if (!href.startsWith("/") || href.startsWith("//")) return null;
  for (const pre of SKIP_LINK_PREFIXES) {
    if (href === pre || href.startsWith(pre)) return null;
  }
  let p = href.split("?")[0].split("#")[0];
  if (/\.(css|js|xml|svg|json|png|jpe?g|gif|webp|ico|woff2?|txt|html)$/i.test(p)) {
    return p.startsWith("/") ? p.slice(1) : p;
  }
  if (p.endsWith("/")) return urlToFile(BASE + p);
  if (p.endsWith(".html")) return p.slice(1);
  return urlToFile(BASE + p + "/");
}

function checkScriptSyntax(code, file) {
  try {
    new vm.Script(code, { filename: file });
    return null;
  } catch (e) {
    return e.message;
  }
}

console.log("→ node build-site.mjs");
execSync("node build-site.mjs", { cwd: ROOT, stdio: "inherit" });

console.log("→ node osint-username.test.mjs");
execSync("node osint-username.test.mjs", { cwd: ROOT, stdio: "inherit" });
console.log("→ node income-tax.test.mjs");
execSync("node income-tax.test.mjs", { cwd: ROOT, stdio: "inherit" });
console.log("→ node quiz-hourly.test.mjs");
execSync("node quiz-hourly.test.mjs", { cwd: ROOT, stdio: "inherit" });

const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const errors = [];
const linkWarnings = [];
const scriptWarnings = [];
let pages = 0;
let scriptsChecked = 0;

for (const loc of locs) {
  const rel = urlToFile(loc);
  const full = path.join(ROOT, rel);
  pages++;
  if (!fs.existsSync(full)) {
    errors.push(`Missing file for ${loc} → ${rel}`);
    continue;
  }
  const html = fs.readFileSync(full, "utf8");
  if (!html.includes("<main")) errors.push(`${rel}: missing <main>`);
  if (!html.includes("</html>")) errors.push(`${rel}: truncated HTML`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${rel}: empty title`);

  if (html.includes('"applicationCategory":"UtilitiesApplication"')) {
    const desc = html.match(/name="description" content="([^"]*)"/)?.[1] || "";
    if (desc.length < 70) errors.push(`${rel}: meta description too short (${desc.length} chars)`);
    if (!html.includes('name="keywords"')) errors.push(`${rel}: missing meta keywords`);
    if (!html.includes('class="page-guide"')) errors.push(`${rel}: missing on-page guide/FAQ block`);
    if (!html.includes('class="related-tools"')) errors.push(`${rel}: missing related tools section`);
    if ((html.match(/<h1[\s>]/g) || []).length !== 1) errors.push(`${rel}: expected exactly one <h1>`);
    if (!html.includes("FAQPage")) errors.push(`${rel}: missing FAQ JSON-LD`);
    if (!html.includes("HowTo")) errors.push(`${rel}: missing HowTo JSON-LD`);
    const canon = html.match(/rel="canonical" href="([^"]*)"/)?.[1] || "";
    if (canon && !canon.endsWith("/")) errors.push(`${rel}: canonical should use trailing slash`);
    if (!html.includes("ad-slot")) errors.push(`${rel}: missing AdSense ad slot`);
    if (!html.includes("google-adsense-account")) errors.push(`${rel}: missing AdSense account meta`);
    if (!html.includes("/assets/ads.js")) errors.push(`${rel}: missing ads.js`);
    if (!html.includes("/assets/analytics.js")) errors.push(`${rel}: missing analytics.js`);
    if (!html.includes('id="cookieyes"')) errors.push(`${rel}: missing CookieYes consent script`);
    if (!html.includes("ad-slot--below")) errors.push(`${rel}: missing below-tool ad slot`);
  }

  for (const href of collectInternalHrefs(html)) {
    const target = resolveHref(href);
    if (!target) continue;
    const tf = path.join(ROOT, target);
    if (!fs.existsSync(tf) && !OPTIONAL_PATHS.has(href.split("?")[0])) {
      linkWarnings.push(`${rel}: broken link ${href} → ${target}`);
    }
  }

  for (const code of inlineScripts(html)) {
    scriptsChecked++;
    const err = checkScriptSyntax(code, rel);
    if (err) scriptWarnings.push(`${rel}: script syntax — ${err}`);
  }
}

const assetFiles = [
  "assets/site.css",
  "assets/ads.js",
  "assets/ads.json",
  "assets/analytics.js",
  "assets/analytics.json",
  "assets/tool-busy.js",
  "assets/brief-feeds.json",
  "assets/og.png",
  "assets/favicon.svg",
  "assets/apple-touch-icon.png",
  "favicon.ico",
];
for (const a of assetFiles) {
  if (!fs.existsSync(path.join(ROOT, a))) errors.push(`Missing asset ${a}`);
}
try {
  const brief = JSON.parse(fs.readFileSync(path.join(ROOT, "assets/brief-feeds.json"), "utf8"));
  for (const key of ["news", "sports", "business"]) {
    const n = brief.feeds?.[key]?.length ?? 0;
    if (n < 1) errors.push(`brief-feeds.json: ${key} has no items`);
  }
} catch (e) {
  errors.push(`brief-feeds.json invalid: ${e.message}`);
}

console.log("\n--- Summary ---");
console.log(`Sitemap URLs: ${pages}`);
console.log(`Inline scripts syntax-checked: ${scriptsChecked}`);

if (linkWarnings.length) {
  console.log(`\nLink warnings (${linkWarnings.length}):`);
  for (const w of linkWarnings.slice(0, 30)) console.log("  ", w);
  if (linkWarnings.length > 30) console.log(`  … and ${linkWarnings.length - 30} more`);
}

if (scriptWarnings.length) {
  console.log(`\nScript warnings (${scriptWarnings.length}):`);
  for (const w of scriptWarnings) console.log("  ", w);
}

if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  for (const e of errors) console.log("  ", e);
  process.exit(1);
}

if (scriptWarnings.length) {
  console.log("\nFailed: inline script syntax errors.");
  process.exit(1);
}

console.log("\nAll static checks passed.");

if (process.env.SKIP_BROWSER !== "1") {
  console.log("\n→ node smoke-browser.mjs");
  try {
    execSync("node smoke-browser.mjs", { cwd: ROOT, stdio: "inherit" });
  } catch {
    process.exit(1);
  }
}

if (process.env.SKIP_VISUAL !== "1") {
  console.log("\n→ node visual-test.mjs");
  try {
    execSync("node visual-test.mjs", { cwd: ROOT, stdio: "inherit" });
  } catch {
    process.exit(1);
  }
}

if (linkWarnings.length) {
  console.log("(Some optional links were flagged—review warnings above.)");
  process.exit(linkWarnings.length > 50 ? 1 : 0);
}
