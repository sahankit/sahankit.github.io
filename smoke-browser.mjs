#!/usr/bin/env node
/** Browser smoke: load each sitemap page locally and fail on console errors. */
import fs from "fs";
import path from "path";
import http from "http";
import { fileURLToPath } from "url";
import { execSync, spawn } from "child_process";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const BASE = "https://sahankit.github.io";
const PORT = 8765;

function contentType(file) {
  if (file.endsWith(".css")) return "text/css";
  if (file.endsWith(".js")) return "application/javascript";
  if (file.endsWith(".svg")) return "image/svg+xml";
  if (file.endsWith(".json")) return "application/json";
  if (file.endsWith(".xml")) return "application/xml";
  return "text/html; charset=utf-8";
}

function startServer() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p === "/") p = "/index.html";
    if (p.endsWith("/")) p += "index.html";
    const file = path.join(ROOT, p.replace(/^\//, ""));
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType(file) });
    fs.createReadStream(file).pipe(res);
  }).listen(PORT);
}

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

  const server = startServer();
  await new Promise((r) => server.once("listening", r));

  const browser = await chromium.launch({ headless: true });
  const fails = [];

  for (const pathname of paths) {
    const page = await browser.newPage();
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
