/** Third batch of tools. */
export function moreTools(ad) {
  return [
    {
      path: "/random-number.html",
      file: "random-number.html",
      category: "developer",
      title: "Random Number Generator — Range Online",
      desc: "Pick a random integer between min and max. Free secure random in the browser.",
      card: "Random number",
      cardDesc: "Random int in a range.",
      body: `
<h1>Random number generator</h1>${ad}
<div class="tool-panel">
  <label for="a">Min</label><input id="a" type="number" value="1" />
  <label for="b">Max</label><input id="b" type="number" value="100" />
  <button type="button" class="primary" id="go">Roll</button>
  <p id="out" class="ok" style="font-size:2rem"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let min=Number(document.getElementById('a').value), max=Number(document.getElementById('b').value);
  if(min>max){ const t=min; min=max; max=t; }
  const n=Math.floor(crypto.getRandomValues(new Uint32Array(1))[0]/4294967296*(max-min+1))+min;
  document.getElementById('out').textContent=String(n);
};
</script>`,
    },
    {
      path: "/discount-calculator.html",
      file: "discount-calculator.html",
      category: "calculators",
      title: "Discount Calculator — Sale Price & Savings",
      desc: "Find sale price after a percent discount. Free discount calculator.",
      card: "Discount calculator",
      cardDesc: "Price after % off.",
      body: `
<h1>Discount calculator</h1>${ad}
<div class="tool-panel">
  <label for="p">Original price</label><input id="p" type="number" value="999" />
  <label for="d">Discount (%)</label><input id="d" type="number" value="20" />
  <button type="button" class="primary" id="go">Calculate</button>
  <div class="stats">
    <div class="stat"><strong id="sale">—</strong>Sale price</div>
    <div class="stat"><strong id="save">—</strong>You save</div>
  </div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=Number(document.getElementById('p').value), d=Number(document.getElementById('d').value)/100;
  const sale=p*(1-d);
  document.getElementById('sale').textContent=sale.toFixed(2);
  document.getElementById('save').textContent=(p-sale).toFixed(2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/profit-margin.html",
      file: "profit-margin.html",
      category: "calculators",
      title: "Profit Margin Calculator — Markup & Margin",
      desc: "Calculate profit margin and markup from cost and selling price.",
      card: "Profit margin",
      cardDesc: "Margin % from cost & price.",
      body: `
<h1>Profit margin calculator</h1>${ad}
<div class="tool-panel">
  <label for="cost">Cost</label><input id="cost" type="number" value="50" />
  <label for="price">Selling price</label><input id="price" type="number" value="80" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const c=Number(document.getElementById('cost').value), p=Number(document.getElementById('price').value);
  const profit=p-c;
  const margin=p?((profit/p)*100).toFixed(2):'0';
  const markup=c?((profit/c)*100).toFixed(2):'0';
  document.getElementById('out').textContent='Profit '+profit.toFixed(2)+' · Margin '+margin+'% · Markup '+markup+'%';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/unit-converter.html",
      file: "unit-converter.html",
      category: "calculators",
      title: "Unit Converter — Length, Weight, Temperature",
      desc: "Convert km/miles, kg/lb, and Celsius/Fahrenheit online.",
      card: "Unit converter",
      cardDesc: "Length, weight, temperature.",
      body: `
<h1>Unit converter</h1>${ad}
<div class="tool-panel">
  <label for="mode">Type</label>
  <select id="mode"><option value="len">Length (km ↔ miles)</option><option value="wt">Weight (kg ↔ lb)</option><option value="temp">Temperature (°C ↔ °F)</option></select>
  <label for="val">Value</label><input id="val" type="number" value="10" />
  <label for="dir">Direction</label>
  <select id="dir"><option value="ab">First → second</option><option value="ba">Second → first</option></select>
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=Number(document.getElementById('val').value), m=document.getElementById('mode').value, ab=document.getElementById('dir').value==='ab';
  let r, label;
  if(m==='len'){ r=ab?v*0.621371:v/0.621371; label=ab?'miles':'km'; }
  else if(m==='wt'){ r=ab?v*2.20462:v/2.20462; label=ab?'lb':'kg'; }
  else { r=ab?v*9/5+32:(v-32)*5/9; label=ab?'°F':'°C'; }
  document.getElementById('out').textContent=r.toFixed(4)+' '+label;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/sort-lines.html",
      file: "sort-lines.html",
      category: "writing",
      title: "Sort Lines Alphabetically — Text Tool",
      desc: "Sort lines A–Z or Z–A. Free online line sorter.",
      card: "Sort lines",
      cardDesc: "A–Z / Z–A line sort.",
      body: `
<h1>Sort lines</h1>${ad}
<div class="tool-panel">
  <textarea id="text" placeholder="One item per line…"></textarea>
  <div class="row">
    <button type="button" class="primary" data-s="az">A → Z</button>
    <button type="button" class="primary" data-s="za">Z → A</button>
  </div>
</div>
<script>
const t=document.getElementById('text');
document.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{
  const lines=t.value.split(/\\n/).filter(l=>l.length);
  lines.sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'}));
  if(b.dataset.s==='za') lines.reverse();
  t.value=lines.join('\\n');
});
</script>`,
    },
    {
      path: "/dedupe-lines.html",
      file: "dedupe-lines.html",
      category: "writing",
      title: "Remove Duplicate Lines — Online",
      desc: "Remove duplicate lines from a list. Keeps first occurrence.",
      card: "Dedupe lines",
      cardDesc: "Unique lines only.",
      body: `
<h1>Remove duplicate lines</h1>${ad}
<div class="tool-panel">
  <textarea id="text"></textarea>
  <button type="button" class="primary" id="go">Remove duplicates</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const seen=new Set(), out=[];
  for(const line of document.getElementById('text').value.split(/\\n/)){
    const k=line.trim();
    if(seen.has(k)) continue;
    seen.add(k); out.push(line);
  }
  document.getElementById('text').value=out.join('\\n');
};
</script>`,
    },
    {
      path: "/reverse-text.html",
      file: "reverse-text.html",
      category: "writing",
      title: "Reverse Text — Backwards String Tool",
      desc: "Reverse characters or words in your text online.",
      card: "Reverse text",
      cardDesc: "Flip characters or words.",
      body: `
<h1>Reverse text</h1>${ad}
<div class="tool-panel">
  <textarea id="text"></textarea>
  <div class="row">
    <button type="button" class="primary" data-m="char">Reverse characters</button>
    <button type="button" class="primary" data-m="word">Reverse word order</button>
  </div>
</div>
<script>
const t=document.getElementById('text');
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{
  const s=t.value;
  t.value=b.dataset.m==='char'?s.split('').reverse().join(''):s.split(/\\s+/).reverse().join(' ');
});
</script>`,
    },
    {
      path: "/word-frequency.html",
      file: "word-frequency.html",
      category: "writing",
      title: "Word Frequency Counter — Top Words",
      desc: "Count how often each word appears in text. Free word frequency tool.",
      card: "Word frequency",
      cardDesc: "Top repeated words.",
      body: `
<h1>Word frequency</h1>${ad}
<div class="tool-panel">
  <textarea id="text" placeholder="Paste text…"></textarea>
  <button type="button" class="primary" id="go">Count</button>
  <pre id="out" style="white-space:pre-wrap;background:#faf7ff;padding:12px;border-radius:10px"></pre>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const m=new Map();
  for(const w of document.getElementById('text').value.toLowerCase().match(/[a-z']+/g)||[]){
    m.set(w,(m.get(w)||0)+1);
  }
  const top=[...m.entries()].sort((a,b)=>b[1]-a[1]).slice(0,30);
  document.getElementById('out').textContent=top.map(([w,c])=>c+'\\t'+w).join('\\n')||'(no words)';
};
</script>`,
    },
    {
      path: "/markdown-preview.html",
      file: "markdown-preview.html",
      category: "writing",
      title: "Markdown Preview — Live HTML Preview",
      desc: "Preview Markdown as HTML in the browser. Simple live Markdown viewer.",
      card: "Markdown preview",
      cardDesc: "Live MD → HTML.",
      body: `
<h1>Markdown preview</h1>${ad}
<div class="tool-panel">
  <label for="md">Markdown</label>
  <textarea id="md" rows="8"># Hello

- item one
- item two

**bold** and *italic*</textarea>
  <div id="html" class="prose" style="background:#fff;padding:16px;border:1px solid var(--line);border-radius:12px"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
const md=document.getElementById('md'), html=document.getElementById('html');
function upd(){ html.innerHTML=marked.parse(md.value); }
md.oninput=upd; upd();
</script>`,
    },
    {
      path: "/jwt-decoder.html",
      file: "jwt-decoder.html",
      category: "developer",
      title: "JWT Decoder — Read JWT Payload (No Verify)",
      desc: "Decode JWT header and payload JSON. Does not verify signatures.",
      card: "JWT decoder",
      cardDesc: "View JWT claims locally.",
      body: `
<h1>JWT decoder</h1>${ad}
<div class="tool-panel">
  <label for="jwt">JWT</label>
  <textarea id="jwt" spellcheck="false" placeholder="eyJhbG…"></textarea>
  <button type="button" class="primary" id="go">Decode</button>
  <pre id="out"></pre>
  <p class="prose" style="font-size:0.85rem">Signature is not verified. Do not paste production secrets.</p>
</div>
<script>
function b64url(s){
  s=s.replace(/-/g,'+').replace(/_/g,'/');
  while(s.length%4) s+='=';
  return JSON.parse(atob(s));
}
document.getElementById('go').onclick=()=>{
  const parts=document.getElementById('jwt').value.trim().split('.');
  if(parts.length<2){ document.getElementById('out').textContent='Need at least header.payload'; return; }
  try{
    document.getElementById('out').textContent=JSON.stringify({header:b64url(parts[0]),payload:b64url(parts[1])},null,2);
  }catch(e){ document.getElementById('out').textContent='Invalid JWT: '+e.message; }
};
</script>`,
    },
    {
      path: "/meta-tag-generator.html",
      file: "meta-tag-generator.html",
      category: "seo",
      title: "Meta Tag Generator — Title & Description HTML",
      desc: "Generate title, description, and Open Graph meta tags for a page.",
      card: "Meta tag generator",
      cardDesc: "SEO meta HTML snippet.",
      body: `
<h1>Meta tag generator</h1>${ad}
<div class="tool-panel">
  <label for="title">Title</label><input id="title" value="My Page Title" />
  <label for="desc">Description</label><textarea id="desc" rows="3">Short page summary for search results.</textarea>
  <label for="url">Canonical URL</label><input id="url" type="url" value="https://example.com/page" />
  <button type="button" class="primary" id="go">Generate</button>
  <textarea id="out" rows="10" readonly spellcheck="false"></textarea>
  <button type="button" class="primary" id="copy">Copy</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const t=document.getElementById('title').value, d=document.getElementById('desc').value, u=document.getElementById('url').value;
  document.getElementById('out').value=\`<title>\${t}</title>
<meta name="description" content="\${d.replace(/"/g,'&quot;')}" />
<link rel="canonical" href="\${u}" />
<meta property="og:title" content="\${t.replace(/"/g,'&quot;')}" />
<meta property="og:description" content="\${d.replace(/"/g,'&quot;')}" />
<meta property="og:url" content="\${u}" />\`;
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/robots-txt-generator.html",
      file: "robots-txt-generator.html",
      category: "seo",
      title: "Robots.txt Generator — Simple Template",
      desc: "Build a basic robots.txt with allow/disallow and sitemap URL.",
      card: "Robots.txt generator",
      cardDesc: "Basic robots.txt file.",
      body: `
<h1>Robots.txt generator</h1>${ad}
<div class="tool-panel">
  <label for="base">Site URL</label><input id="base" type="url" value="https://example.com" />
  <label><input type="checkbox" id="all" checked /> Allow all (User-agent: *)</label>
  <label for="dis">Disallow paths (one per line, optional)</label><textarea id="dis" rows="3" placeholder="/admin/"></textarea>
  <button type="button" class="primary" id="go">Generate</button>
  <textarea id="out" rows="8" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const base=document.getElementById('base').value.replace(/\\/$/,'');
  let t='User-agent: *\\n';
  if(document.getElementById('all').checked) t+='Allow: /\\n'; else t+='Disallow: /\\n';
  for(const line of document.getElementById('dis').value.split(/\\n/)){
    const p=line.trim(); if(p) t+='Disallow: '+p+'\\n';
  }
  t+='\\nSitemap: '+base+'/sitemap.xml\\n';
  document.getElementById('out').value=t;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/dice-roller.html",
      file: "dice-roller.html",
      category: "productivity",
      title: "Dice Roller — Roll D6, D20 Online",
      desc: "Roll dice with any number of sides. Free dice roller.",
      card: "Dice roller",
      cardDesc: "D6, D20, custom sides.",
      body: `
<h1>Dice roller</h1>${ad}
<div class="tool-panel">
  <label for="sides">Sides</label><input id="sides" type="number" min="2" max="100" value="6" />
  <label for="count">Dice</label><input id="count" type="number" min="1" max="20" value="2" />
  <button type="button" class="primary" id="go">Roll</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=Math.max(2,Number(document.getElementById('sides').value)||6);
  const n=Math.min(20,Math.max(1,Number(document.getElementById('count').value)||1));
  const rolls=Array.from({length:n},()=>1+Math.floor(crypto.getRandomValues(new Uint32Array(1))[0]/4294967296*s));
  const sum=rolls.reduce((a,b)=>a+b,0);
  document.getElementById('out').textContent=rolls.join(', ')+' (sum '+sum+')';
};
</script>`,
    },
    {
      path: "/roi-calculator.html",
      file: "roi-calculator.html",
      category: "calculators",
      title: "ROI Calculator — Return on Investment",
      desc: "Calculate ROI percent from gain and cost. Free ROI calculator.",
      card: "ROI calculator",
      cardDesc: "Return on investment %.",
      body: `
<h1>ROI calculator</h1>${ad}
<div class="tool-panel">
  <label for="gain">Gain from investment</label><input id="gain" type="number" value="1500" />
  <label for="cost">Cost of investment</label><input id="cost" type="number" value="1000" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const g=Number(document.getElementById('gain').value), c=Number(document.getElementById('cost').value);
  const roi=c?(((g-c)/c)*100).toFixed(2):'0';
  document.getElementById('out').textContent='ROI: '+roi+'%';
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
