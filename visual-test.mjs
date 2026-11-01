#!/usr/bin/env node
/**
 * Visual regression + layout checks (Playwright).
 * Baselines: test/visual/baseline/*.png
 * Update baselines: UPDATE_VISUAL=1 node visual-test.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { startStaticServer, ROOT } from "./test-http-server.mjs";

const PORT = 8766;
const BASELINE_DIR = path.join(ROOT, "test/visual/baseline");

const PAGES = [
  "/",
  "/ai-writing/",
  "/brief/",
  "/finance/",
  "/grammar-checker/",
  "/income-tax-calculator/",
  "/osint-search/",
  "/word-counter/",
  "/404.html",
];

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 720 },
  { name: "mobile", width: 390, height: 844 },
];

function slugFromPath(pathname) {
  if (pathname === "/") return "home";
  return pathname.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "page";
}

async function comparePng(actual, expectedPath) {
  let PNG;
  let pixelmatch;
  try {
    PNG = (await import("pngjs")).PNG;
    pixelmatch = (await import("pixelmatch")).default;
  } catch {
    console.warn("Install pngjs + pixelmatch for screenshot diff (npm i -D pngjs pixelmatch). Skipping pixel compare.");
    return { ok: true, skipped: true };
  }
  const expected = PNG.sync.read(fs.readFileSync(expectedPath));
  const act = PNG.sync.read(actual);
  if (act.width !== expected.width || act.height !== expected.height) {
    return { ok: false, reason: `size ${act.width}x${act.height} vs ${expected.width}x${expected.height}` };
  }
  const diff = new PNG({ width: act.width, height: act.height });
  const mismatched = pixelmatch(act.data, expected.data, diff.data, act.width, act.height, {
    threshold: 0.25,
  });
  const maxAllowed = Math.max(800, Math.floor(act.width * act.height * 0.02));
  if (mismatched > maxAllowed) {
    const failPath = expectedPath.replace("/baseline/", "/diff/").replace(".png", "-diff.png");
    fs.mkdirSync(path.dirname(failPath), { recursive: true });
    fs.writeFileSync(failPath, PNG.sync.write(diff));
    return { ok: false, reason: `${mismatched} pixels differ (max ${maxAllowed})`, diff: failPath };
  }
  return { ok: true, mismatched };
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error("Playwright required: npm i -D playwright && npx playwright install chromium");
    process.exit(1);
  }

  fs.mkdirSync(BASELINE_DIR, { recursive: true });
  const update = process.env.UPDATE_VISUAL === "1";
  const server = startStaticServer(PORT);
  await new Promise((r) => server.once("listening", r));

  const browser = await chromium.launch({ headless: true });
  const layoutFails = [];
  const visualFails = [];
  let shots = 0;

  for (const pathname of PAGES) {
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      const url = `http://127.0.0.1:${PORT}${pathname}`;
      const resp = await page.goto(url, { waitUntil: "load", timeout: 25000 });
      await page.waitForTimeout(200);

      if (!resp || resp.status() >= 400) {
        layoutFails.push(`${pathname} (${vp.name}): HTTP ${resp?.status() ?? "?"}`);
        await page.close();
        continue;
      }

      const layout = await page.evaluate(() => {
        const doc = document.documentElement;
        const overflow = doc.scrollWidth > doc.clientWidth + 2;
        const brand = document.querySelector(".brand");
        const main = document.querySelector("main");
        const brandBox = brand?.getBoundingClientRect();
        const mainBox = main?.getBoundingClientRect();
        return {
          overflow,
          brandVisible: !!(brandBox && brandBox.width > 0 && brandBox.height > 0),
          mainVisible: !!(mainBox && mainBox.width > 0 && mainBox.height > 0),
        };
      });

      if (layout.overflow) layoutFails.push(`${pathname} (${vp.name}): horizontal overflow`);
      if (!layout.brandVisible) layoutFails.push(`${pathname} (${vp.name}): .brand not visible`);
      if (!layout.mainVisible && !pathname.includes("404")) {
        layoutFails.push(`${pathname} (${vp.name}): main not visible`);
      }

      const png = await page.screenshot({ fullPage: false, animations: "disabled" });
      const file = path.join(BASELINE_DIR, `${slugFromPath(pathname)}-${vp.name}.png`);
      shots++;

      if (update) {
        fs.writeFileSync(file, png);
      } else if (fs.existsSync(file)) {
        const cmp = await comparePng(png, file);
        if (!cmp.ok && !cmp.skipped) {
          visualFails.push(`${pathname} (${vp.name}): ${cmp.reason}${cmp.diff ? ` → ${cmp.diff}` : ""}`);
        }
      }

      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`Visual test: ${PAGES.length} pages × ${VIEWPORTS.length} viewports = ${shots} screenshots`);
  if (update) {
    console.log(`Baselines updated in ${BASELINE_DIR}`);
  } else if (!fs.readdirSync(BASELINE_DIR).some((f) => f.endsWith(".png"))) {
    console.log("No baselines yet. Run: UPDATE_VISUAL=1 node visual-test.mjs");
  }

  if (layoutFails.length) {
    console.error("\nLayout failures:", layoutFails.length);
    layoutFails.forEach((f) => console.error(" ", f));
  }
  if (visualFails.length) {
    console.error("\nVisual diff failures:", visualFails.length);
    visualFails.forEach((f) => console.error(" ", f));
  }

  if (layoutFails.length || visualFails.length) process.exit(1);
  console.log("\nVisual + layout checks passed.");
}

main();
