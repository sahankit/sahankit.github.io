#!/usr/bin/env node
/** Browser smoke: load each sitemap page locally and fail on console errors. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { startStaticServer } from "./test-http-server.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const BASE = "https://sahankit.github.io";
const PORT = 8765;

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.log("playwright not installed — run: npm i -D playwright && npx playwright install chromium");
    console.log("Skipping browser smoke (static verify-site.mjs already passed).");
    process.exit(0);
  }

  const sitemap = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
  const paths = [...sitemap.matchAll(/<loc>[^<]+<\/loc>/g)].map((m) =>
    m[0].replace("<loc>", "").replace("</loc>", "").replace(BASE, ""),
  );

  const server = startStaticServer(PORT);
  await new Promise((r) => server.once("listening", r));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  // Third-party scripts (CookieYes throws on non-registered hosts like 127.0.0.1) are out of scope here.
  await context.route(/cookieyes\.com|googlesyndication\.com|googletagmanager\.com|google-analytics\.com|doubleclick\.net/, (r) => r.abort());
  const fails = [];

  for (const pathname of paths) {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const url = `http://127.0.0.1:${PORT}${pathname}`;
    const resp = await page.goto(url, { waitUntil: "load", timeout: 20000 });
    await page.waitForTimeout(150);
    if (!resp || resp.status() >= 400) fails.push(`${pathname}: HTTP ${resp?.status()}`);
    else if (errors.length) fails.push(`${pathname}: ${errors[0]}`);
    await page.close();
  }

  await browser.close();
  server.close();

  if (fails.length) {
    console.error("Browser smoke failures:", fails.length);
    fails.slice(0, 20).forEach((f) => console.error(" ", f));
    process.exit(1);
  }
  console.log(`Browser smoke: ${paths.length} pages OK`);
}

main();
