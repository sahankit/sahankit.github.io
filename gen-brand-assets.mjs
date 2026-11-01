#!/usr/bin/env node
/**
 * Renders favicon + social preview images with Playwright.
 * Run after changing the brand: node gen-brand-assets.mjs
 */
import fs from "fs";
import path from "path";
import { chromium } from "playwright";
import { ROOT } from "./test-http-server.mjs";

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#9b2fd0"/><stop offset=".55" stop-color="#720e9e"/><stop offset="1" stop-color="#4a0068"/>
  </linearGradient></defs>
  <rect width="64" height="64" rx="16" fill="url(#g)"/>
  <path d="M18 18h28v8H36v22h-8V26H18z" fill="#fff"/>
</svg>
`;

const OG_HTML = `<!DOCTYPE html><html><head><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; font-family: -apple-system, "Segoe UI", Roboto, sans-serif;
    background: radial-gradient(900px 500px at 85% -10%, #9b2fd0 0%, transparent 60%), linear-gradient(135deg, #4a0068 0%, #720e9e 100%);
    color: #fff; padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 20px; font-size: 40px; font-weight: 800; letter-spacing: -1px; }
  .brand img { width: 72px; height: 72px; border-radius: 18px; box-shadow: 0 10px 30px rgba(0,0,0,.25); }
  h1 { font-size: 76px; line-height: 1.04; letter-spacing: -3px; font-weight: 800; max-width: 960px; }
  .chips { display: flex; gap: 14px; flex-wrap: wrap; }
  .chips span { font-size: 26px; font-weight: 700; padding: 12px 22px; border-radius: 999px; background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.25); }
</style></head><body>
  <div class="brand"><img src="data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString("base64")}" alt="">Tools</div>
  <h1>Free online calculators &amp; tools</h1>
  <div class="chips"><span>India finance</span><span>PDF &amp; images</span><span>Writing</span><span>Developer</span><span>No signup</span></div>
</body></html>`;

/** ICO container holding a single PNG image (supported by all modern browsers). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(6 + 16, 12);
  return Buffer.concat([header, entry, png]);
}

const browser = await chromium.launch();

async function renderMark(size) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${MARK_SVG.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`,
  );
  const png = await page.screenshot({ omitBackground: true });
  await page.close();
  return png;
}

fs.writeFileSync(path.join(ROOT, "assets/favicon.svg"), MARK_SVG);
fs.writeFileSync(path.join(ROOT, "favicon.ico"), pngToIco(await renderMark(48), 48));
fs.writeFileSync(path.join(ROOT, "assets/apple-touch-icon.png"), await renderMark(180));

const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.setContent(OG_HTML, { waitUntil: "load" });
fs.writeFileSync(path.join(ROOT, "assets/og.png"), await og.screenshot());
await browser.close();

console.log("Wrote favicon.ico, assets/favicon.svg, assets/apple-touch-icon.png, assets/og.png");
