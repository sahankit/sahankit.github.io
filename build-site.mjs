#!/usr/bin/env node
import fs from "fs";
import path from "path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const BASE = "https://sahankit.github.io";

const nav = `
<header class="site-header">
  <a class="brand" href="${BASE}/">Sahankit Tools</a>
  <ul class="site-nav">
    <li><a href="${BASE}/">All tools</a></li>
    <li><a href="${BASE}/guides/writing-tools.html">Guides</a></li>
    <li><a href="${BASE}/y-chat/">Y-Chat</a></li>
  </ul>
</header>`;

const footer = `
<footer class="site-footer">
  <p>Free browser tools · <a href="${BASE}/y-chat/">Y-Chat</a> (free chat) · Not affiliated with Google or Yahoo</p>
  <p><a href="${BASE}/sitemap.xml">Sitemap</a></p>
</footer>`;

const headCommon = (title, desc, urlPath) => `
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="google-adsense-account" content="ca-pub-5596933121293455" />
  <meta name="robots" content="index, follow" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${BASE}${urlPath}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="${BASE}${urlPath}" />
  <link rel="stylesheet" href="/assets/site.css" />
  <script src="/assets/ads.js" defer></script>`;

function page(urlPath, title, desc, mainHtml, breadcrumb = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>${headCommon(title, desc, urlPath)}
</head>
<body>
${nav}
<div class="wrap">
${breadcrumb}
${mainHtml}
</div>
${footer}
</body>
</html>`;
}

const ad = `<aside class="ad-slot" data-ad hidden aria-label="Advertisement"></aside>`;

const tools = [
  {
    path: "/word-counter.html",
    file: "word-counter.html",
    title: "Free Word Counter — Count Words, Characters & Paragraphs",
    desc: "Count words, characters, sentences, and paragraphs in your text. Free online word counter for writers and SEO.",
    card: "Word counter",
    cardDesc: "Count words, characters, and paragraphs instantly.",
    body: `
<h1>Word counter</h1>
${ad}
<div class="tool-panel">
  <label for="text">Paste or type your text</label>
  <textarea id="text" placeholder="Start typing…"></textarea>
  <div class="stats">
    <div class="stat"><strong id="words">0</strong>Words</div>
    <div class="stat"><strong id="chars">0</strong>Characters</div>
    <div class="stat"><strong id="chars-nospace">0</strong>No spaces</div>
    <div class="stat"><strong id="paras">0</strong>Paragraphs</div>
  </div>
</div>
<script>
const t=document.getElementById('text');
function upd(){
  const s=t.value;
  document.getElementById('words').textContent=(s.trim().match(/\\S+/g)||[]).length;
  document.getElementById('chars').textContent=s.length;
  document.getElementById('chars-nospace').textContent=s.replace(/\\s/g,'').length;
  document.getElementById('paras').textContent=s.trim()?s.trim().split(/\\n+/).filter(Boolean).length:0;
}
t.addEventListener('input',upd); upd();
</script>
<div class="prose"><h2>Why use a word counter?</h2><p>Writers, students, and SEO editors use word counts for essays, meta descriptions, and social posts. This tool runs in your browser; nothing is uploaded.</p></div>`,
  },
  {
    path: "/character-counter.html",
    file: "character-counter.html",
    title: "Character Counter — Letters & Bytes Online",
    desc: "Count characters with and without spaces. Free character counter for tweets, SMS, and forms.",
    card: "Character counter",
    cardDesc: "Character limits for social and forms.",
    body: `
<h1>Character counter</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label>
  <textarea id="text"></textarea>
  <div class="stats">
    <div class="stat"><strong id="all">0</strong>All chars</div>
    <div class="stat"><strong id="nospace">0</strong>No spaces</div>
    <div class="stat"><strong id="lines">0</strong>Lines</div>
  </div>
</div>
<script>
const t=document.getElementById('text');
t.oninput=()=>{
  const s=t.value;
  document.getElementById('all').textContent=s.length;
  document.getElementById('nospace').textContent=s.replace(/\\s/g,'').length;
  document.getElementById('lines').textContent=s? s.split(/\\n/).length:0;
};
</script>`,
  },
  {
    path: "/case-converter.html",
    file: "case-converter.html",
    title: "Case Converter — Upper, Lower, Title Case",
    desc: "Convert text to UPPERCASE, lowercase, or Title Case online for free.",
    card: "Case converter",
    cardDesc: "UPPER, lower, and Title Case.",
    body: `
<h1>Case converter</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label>
  <textarea id="text"></textarea>
  <div class="row">
    <button type="button" class="primary" data-m="upper">UPPERCASE</button>
    <button type="button" class="primary" data-m="lower">lowercase</button>
    <button type="button" class="primary" data-m="title">Title Case</button>
  </div>
</div>
<script>
const t=document.getElementById('text');
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{
  let s=t.value;
  if(b.dataset.m==='upper') s=s.toUpperCase();
  if(b.dataset.m==='lower') s=s.toLowerCase();
  if(b.dataset.m==='title') s=s.toLowerCase().replace(/\\b\\w/g,c=>c.toUpperCase());
  t.value=s;
});
</script>`,
  },
  {
    path: "/json-formatter.html",
    file: "json-formatter.html",
    title: "JSON Formatter & Validator — Pretty Print Online",
    desc: "Format and validate JSON in the browser. Free JSON pretty printer with error messages.",
    card: "JSON formatter",
    cardDesc: "Pretty-print and validate JSON.",
    body: `
<h1>JSON formatter</h1>${ad}
<div class="tool-panel">
  <label for="json">JSON</label>
  <textarea id="json" spellcheck="false" placeholder='{"hello":"world"}'></textarea>
  <div class="row"><button type="button" class="primary" id="fmt">Format</button><button type="button" class="primary" id="min">Minify</button></div>
  <p id="msg" class="error" hidden></p>
</div>
<script>
const j=document.getElementById('json'), msg=document.getElementById('msg');
function run(spaces){
  msg.hidden=true;
  try{ j.value=JSON.stringify(JSON.parse(j.value),null,spaces); }
  catch(e){ msg.textContent=e.message; msg.hidden=false; }
}
document.getElementById('fmt').onclick=()=>run(2);
document.getElementById('min').onclick=()=>run(0);
</script>`,
  },
  {
    path: "/epoch-converter.html",
    file: "epoch-converter.html",
    title: "Unix Epoch Converter — Timestamp to Date",
    desc: "Convert Unix timestamps to local date and time. Free epoch seconds and milliseconds tool.",
    card: "Epoch converter",
    cardDesc: "Unix timestamp ↔ readable date.",
    body: `
<h1>Unix epoch converter</h1>${ad}
<div class="tool-panel">
  <label for="ts">Timestamp (seconds or ms)</label>
  <input id="ts" inputmode="numeric" placeholder="1700000000" />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
  <p><button type="button" class="primary" id="now">Use now</button></p>
</div>
<script>
function convert(){
  let n=Number(document.getElementById('ts').value.trim());
  if(!Number.isFinite(n)) { document.getElementById('out').textContent='Enter a number'; return; }
  if(n<1e12) n*=1000;
  document.getElementById('out').textContent=new Date(n).toString();
}
document.getElementById('go').onclick=convert;
document.getElementById('now').onclick=()=>{ document.getElementById('ts').value=Math.floor(Date.now()/1000); convert(); };
</script>`,
  },
  {
    path: "/bmi-calculator.html",
    file: "bmi-calculator.html",
    title: "BMI Calculator — Body Mass Index Online",
    desc: "Calculate BMI from height and weight. Free BMI calculator with metric units.",
    card: "BMI calculator",
    cardDesc: "Body mass index from height & weight.",
    body: `
<h1>BMI calculator</h1>${ad}
<div class="tool-panel">
  <label for="h">Height (cm)</label><input id="h" type="number" min="50" max="250" value="170" />
  <label for="w">Weight (kg)</label><input id="w" type="number" min="20" max="300" value="70" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const h=Number(document.getElementById('h').value)/100, w=Number(document.getElementById('w').value);
  if(!h||!w) return;
  const bmi=(w/(h*h)).toFixed(1);
  let cat='Normal'; if(bmi<18.5) cat='Underweight'; else if(bmi>=25&&bmi<30) cat='Overweight'; else if(bmi>=30) cat='Obese';
  document.getElementById('out').textContent='BMI: '+bmi+' ('+cat+') — for adults; not medical advice.';
};
</script>`,
  },
  {
    path: "/percentage-calculator.html",
    file: "percentage-calculator.html",
    title: "Percentage Calculator — X% of Y",
    desc: "Find what percentage one number is of another, or X percent of a value. Free online.",
    card: "Percentage calculator",
    cardDesc: "Percent of a number, increase/decrease.",
    body: `
<h1>Percentage calculator</h1>${ad}
<div class="tool-panel">
  <label>What is <input id="pct" type="number" value="10" style="width:4rem" />% of <input id="of" type="number" value="200" style="width:5rem" />?</label>
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=Number(document.getElementById('pct').value), o=Number(document.getElementById('of').value);
  document.getElementById('out').textContent=(p/100*o).toLocaleString(undefined,{maximumFractionDigits:4});
};
</script>`,
  },
  {
    path: "/emi-calculator.html",
    file: "emi-calculator.html",
    title: "EMI Calculator — Loan Monthly Payment India",
    desc: "Estimate monthly EMI from loan amount, annual interest rate, and tenure in months.",
    card: "EMI calculator",
    cardDesc: "Monthly loan payment estimate.",
    body: `
<h1>EMI calculator</h1>${ad}
<div class="tool-panel">
  <label for="p">Principal (₹)</label><input id="p" type="number" value="500000" />
  <label for="r">Annual interest (%)</label><input id="r" type="number" step="0.1" value="10.5" />
  <label for="n">Tenure (months)</label><input id="n" type="number" value="60" />
  <button type="button" class="primary" id="go">Calculate EMI</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=Number(document.getElementById('p').value), ann=Number(document.getElementById('r').value)/100/12, n=Number(document.getElementById('n').value);
  if(!P||!n) return;
  const emi= ann? P*ann*Math.pow(1+ann,n)/(Math.pow(1+ann,n)-1): P/n;
  document.getElementById('out').textContent='EMI ≈ ₹'+emi.toFixed(2)+' (estimate only, not a bank offer)';
};
</script>`,
  },
  {
    path: "/tip-calculator.html",
    file: "tip-calculator.html",
    title: "Tip Calculator — Split Bill & Gratuity",
    desc: "Calculate tip and split a restaurant bill between people. Free tip calculator.",
    card: "Tip calculator",
    cardDesc: "Tip amount and per-person split.",
    body: `
<h1>Tip calculator</h1>${ad}
<div class="tool-panel">
  <label for="bill">Bill (₹)</label><input id="bill" type="number" value="1000" />
  <label for="tip">Tip (%)</label><input id="tip" type="number" value="10" />
  <label for="people">People</label><input id="people" type="number" min="1" value="2" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const b=Number(document.getElementById('bill').value), tip=Number(document.getElementById('tip').value)/100, p=Math.max(1,Number(document.getElementById('people').value));
  const total=b*(1+tip);
  document.getElementById('out').textContent='Total ₹'+total.toFixed(2)+' · ₹'+(total/p).toFixed(2)+' per person';
};
</script>`,
  },
  {
    path: "/age-calculator.html",
    file: "age-calculator.html",
    title: "Age Calculator — Years from Birth Date",
    desc: "Calculate age in years, months, and days from your date of birth.",
    card: "Age calculator",
    cardDesc: "Age from date of birth.",
    body: `
<h1>Age calculator</h1>${ad}
<div class="tool-panel">
  <label for="dob">Date of birth</label><input id="dob" type="date" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const d=document.getElementById('dob').value; if(!d) return;
  const b=new Date(d+'T00:00:00'), n=new Date();
  let y=n.getFullYear()-b.getFullYear(), m=n.getMonth()-b.getMonth(), day=n.getDate()-b.getDate();
  if(day<0){ m--; day+=new Date(n.getFullYear(),n.getMonth(),0).getDate(); }
  if(m<0){ y--; m+=12; }
  document.getElementById('out').textContent=y+' years, '+m+' months, '+day+' days';
};
</script>`,
  },
  {
    path: "/ifsc-format.html",
    file: "ifsc-format.html",
    title: "IFSC Format Checker — Validate IFSC Pattern",
    desc: "Check if an IFSC code matches the standard 11-character format. Does not verify with RBI.",
    card: "IFSC format check",
    cardDesc: "Validate IFSC pattern (not bank lookup).",
    body: `
<h1>IFSC format checker</h1>${ad}
<div class="tool-panel">
  <label for="ifsc">IFSC code</label><input id="ifsc" maxlength="11" placeholder="SBIN0001234" autocapitalize="characters" />
  <button type="button" class="primary" id="go">Check format</button>
  <p id="out"></p>
</div>
<p class="prose">This only checks the <strong>pattern</strong> (4 letters + 0 + 6 alphanumeric). It does not confirm the branch exists. Use your bank or RBI for official verification.</p>
<script>
document.getElementById('go').onclick=()=>{
  const s=document.getElementById('ifsc').value.trim().toUpperCase();
  const ok=/^[A-Z]{4}0[A-Z0-9]{6}$/.test(s);
  const o=document.getElementById('out');
  o.className=ok?'ok':'error';
  o.textContent=ok?'Format looks valid.':'Invalid format — expect 11 characters like HDFC0001234.';
};
</script>`,
  },
  {
    path: "/pan-format.html",
    file: "pan-format.html",
    title: "PAN Format Checker — Validate PAN Pattern",
    desc: "Check if a PAN matches the standard format AAAAA9999A. Not an official Income Tax verification.",
    card: "PAN format check",
    cardDesc: "Validate PAN pattern only.",
    body: `
<h1>PAN format checker</h1>${ad}
<div class="tool-panel">
  <label for="pan">PAN</label><input id="pan" maxlength="10" placeholder="ABCDE1234F" autocapitalize="characters" />
  <button type="button" class="primary" id="go">Check format</button>
  <p id="out"></p>
</div>
<p class="prose">Format-only check (5 letters, 4 digits, 1 letter). Not linked to Income Tax records.</p>
<script>
document.getElementById('go').onclick=()=>{
  const s=document.getElementById('pan').value.trim().toUpperCase();
  const ok=/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(s);
  const o=document.getElementById('out');
  o.className=ok?'ok':'error';
  o.textContent=ok?'Format looks valid.':'Invalid PAN format.';
};
</script>`,
  },
];

const guides = [
  {
    path: "/guides/writing-tools.html",
    file: "guides/writing-tools.html",
    title: "Free Online Writing Tools — Word Count & More",
    desc: "Overview of free writing tools: word counter, character counter, and case converter.",
    body: `<h1>Free writing tools online</h1>${ad}
<p>Use our <a href="/word-counter.html">word counter</a>, <a href="/character-counter.html">character counter</a>, and <a href="/case-converter.html">case converter</a> in the browser. No signup, no upload to a server.</p>
<h2>For SEO and social</h2><p>Character limits matter for titles, meta descriptions, and posts. Count first, then publish.</p>`,
  },
  {
    path: "/guides/seo-checklist.html",
    file: "guides/seo-checklist.html",
    title: "Simple SEO Checklist for Small Sites",
    desc: "A short SEO checklist: titles, sitemap, Search Console, and useful content.",
    body: `<h1>Simple SEO checklist</h1>${ad}
<ol><li>Unique title and description on every page</li><li>Submit sitemap in Google Search Console</li><li>Fast, mobile-friendly pages</li><li>Internal links between related tools</li><li>Useful content, not duplicate spam</li></ol>
<p>Example project: <a href="/y-chat/">Y-Chat</a> on GitHub Pages with sitemap and guides.</p>`,
  },
  {
    path: "/guides/india-id-formats.html",
    file: "guides/india-id-formats.html",
    title: "India IFSC & PAN Format Guide",
    desc: "How IFSC and PAN formats work, and what format-only checkers can and cannot do.",
    body: `<h1>IFSC and PAN formats (India)</h1>${ad}
<p><a href="/ifsc-format.html">IFSC checker</a> — 11 characters. <a href="/pan-format.html">PAN checker</a> — 10 characters. These tools do not verify with government databases.</p>`,
  },
];

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

const hubCards = tools.map((t) =>
  `<a class="card" href="${t.path}"><h2>${t.card}</h2><p>${t.cardDesc}</p></a>`,
).join("\n");

const indexHtml = page(
  "/",
  "Sahankit Tools — Free Calculators & Writing Utilities",
  "Free online tools: word counter, JSON formatter, EMI calculator, BMI, epoch converter, IFSC/PAN format checkers, and guides.",
  `<div class="hero"><h1>Free online tools</h1><p>Calculators and writing utilities in your browser. Also try <a href="/y-chat/">Y-Chat</a> — free chat rooms.</p></div>
${ad}
<section><h2>Text &amp; writing</h2><div class="grid">${tools.slice(0, 4).map((t) => `<a class="card" href="${t.path}"><h2>${t.card}</h2><p>${t.cardDesc}</p></a>`).join("")}</div></section>
<section style="margin-top:24px"><h2>Calculators</h2><div class="grid">${tools.slice(4, 10).map((t) => `<a class="card" href="${t.path}"><h2>${t.card}</h2><p>${t.cardDesc}</p></a>`).join("")}</div></section>
<section style="margin-top:24px"><h2>India utilities</h2><div class="grid">${tools.slice(10).map((t) => `<a class="card" href="${t.path}"><h2>${t.card}</h2><p>${t.cardDesc}</p></a>`).join("")}</div></section>
<section style="margin-top:24px"><h2>Guides</h2><div class="grid">${guides.map((g) => `<a class="card" href="${g.path}"><h2>${g.title.split("—")[0].trim()}</h2><p>${g.desc.slice(0, 80)}…</p></a>`).join("")}</div></section>`,
);

write("index.html", indexHtml);

for (const t of tools) {
  const bc = `<nav class="breadcrumb"><a href="/">Tools</a> / ${t.card}</nav>`;
  write(t.file, page(t.path, t.title, t.desc, t.body, bc));
}

for (const g of guides) {
  const bc = `<nav class="breadcrumb"><a href="/">Tools</a> / Guides</nav>`;
  write(g.file, page(g.path, g.title, g.desc, g.body, bc));
}

const urls = ["/", ...tools.map((t) => t.path), ...guides.map((g) => g.path)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${BASE}${u === "/" ? "/" : u}</loc><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>
`;
write("sitemap.xml", sitemap);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);
write(".nojekyll", "");

console.log("Built", tools.length, "tools,", guides.length, "guides");
