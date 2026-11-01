/** Batch 26 — More high-search-intent tools. */

export function batch26Tools(ad) {
  return [
    {
      path: "/decimal-to-percent-converter.html",
      file: "decimal-to-percent-converter.html",
      category: "calculators",
      title: "Decimal to Percent Converter — Convert Decimal to %",
      desc: "Convert decimals to percentages and percent back to decimal. Free decimal percent converter.",
      card: "Decimal to percent",
      cardDesc: "Decimal ↔ %.",
      body: `<h1>Decimal to percent converter</h1>${ad}
<div class="tool-panel">
<label for="dec">Decimal</label><input id="dec" type="number" step="any" value="0.125" />
<label for="pct">Percent (%)</label><input id="pct" type="number" step="any" />
</div>
<script>
const dec=document.getElementById('dec'), pct=document.getElementById('pct'); let l=false;
dec.oninput=()=>{ if(l)return; l=true; pct.value=dec.value!==''?(dec.value*100).toFixed(4):''; l=false; };
pct.oninput=()=>{ if(l)return; l=true; dec.value=pct.value!==''?(pct.value/100).toFixed(6):''; l=false; };
dec.oninput(); dec.dispatchEvent(new Event('input'));
</script>`,
    },
    {
      path: "/fraction-to-percent-converter.html",
      file: "fraction-to-percent-converter.html",
      category: "calculators",
      title: "Fraction to Percent Converter — Convert Fraction to %",
      desc: "Convert fractions like 3/4 to percent. Free fraction to percentage calculator.",
      card: "Fraction to percent",
      cardDesc: "a/b → %.",
      body: `<h1>Fraction to percent</h1>${ad}
<div class="tool-panel">
<label for="n">Numerator</label><input id="n" type="number" value="3" />
<label for="d">Denominator</label><input id="d" type="number" value="4" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const d=+document.getElementById('d').value;
  if(!d){ document.getElementById('out').className='error'; document.getElementById('out').textContent='Denominator cannot be 0.'; return; }
  const p=(+document.getElementById('n').value/d)*100;
  document.getElementById('out').className='ok';
  document.getElementById('out').textContent=p.toFixed(2)+'% ('+document.getElementById('n').value+'/'+d+')';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/week-number-calculator.html",
      file: "week-number-calculator.html",
      category: "productivity",
      title: "Week Number Calculator — ISO Week of Year",
      desc: "Find ISO week number and year from any date. Free week of year calculator.",
      card: "Week number",
      cardDesc: "ISO week from date.",
      body: `<h1>Week number calculator</h1>${ad}
<div class="tool-panel">
<label for="d">Date</label><input id="d" type="date" />
<button type="button" class="primary" id="go">Get week</button>
<p id="out" class="ok"></p>
</div>
<script>
function isoWeek(d){
  const x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
  x.setUTCDate(x.getUTCDate()+4-(x.getUTCDay()||7));
  const y=x.getUTCFullYear();
  const w=Math.ceil((((x-new Date(Date.UTC(y,0,1)))/86400000)+1)/7);
  return {y,w};
}
document.getElementById('go').onclick=()=>{
  const v=document.getElementById('d').value; if(!v) return;
  const r=isoWeek(new Date(v+'T12:00:00'));
  document.getElementById('out').textContent='ISO week '+r.w+' of '+r.y;
};
document.getElementById('d').valueAsDate=new Date();
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/dog-age-calculator.html",
      file: "dog-age-calculator.html",
      category: "calculators",
      title: "Dog Age Calculator — Dog Years to Human Years",
      desc: "Convert dog age to approximate human years. Free pet age calculator for fun planning.",
      card: "Dog age",
      cardDesc: "Dog years → human.",
      body: `<h1>Dog age calculator</h1>${ad}
<div class="tool-panel">
<label for="dog">Dog age (years)</label><input id="dog" type="number" step="0.1" value="5" />
<label for="size">Size</label><select id="size"><option value="s">Small (&lt;20 lb)</option><option value="m" selected>Medium</option><option value="l">Large</option></select>
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const y=+document.getElementById('dog').value;
  let human=16*Math.log(y+1)+31;
  if(document.getElementById('size').value==='s') human*=0.95;
  if(document.getElementById('size').value==='l') human*=1.05;
  document.getElementById('out').textContent='About '+Math.round(human)+' human years (estimate, not veterinary advice).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/cat-age-calculator.html",
      file: "cat-age-calculator.html",
      category: "calculators",
      title: "Cat Age Calculator — Cat Years to Human Years",
      desc: "Convert cat age to approximate human years. Free feline age calculator.",
      card: "Cat age",
      cardDesc: "Cat years → human.",
      body: `<h1>Cat age calculator</h1>${ad}
<div class="tool-panel">
<label for="cat">Cat age (years)</label><input id="cat" type="number" step="0.1" value="5" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const y=+document.getElementById('cat').value;
  let h=y<=1?15*y:15+(y-1)*4;
  document.getElementById('out').textContent='About '+Math.round(h)+' human years (common chart estimate).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/mulch-calculator.html",
      file: "mulch-calculator.html",
      category: "calculators",
      title: "Mulch Calculator — Cubic Yards & Bags for Garden",
      desc: "Estimate mulch volume from bed area and depth. Free cubic yard mulch calculator.",
      card: "Mulch calculator",
      cardDesc: "Mulch volume & bags.",
      body: `<h1>Mulch calculator</h1>${ad}
<div class="tool-panel">
<label for="sq">Bed area (sq ft)</label><input id="sq" type="number" value="200" />
<label for="in">Depth (inches)</label><input id="in" type="number" value="3" />
<button type="button" class="primary" id="go">Calculate</button>
<div class="stats" id="stats"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const cuft=+document.getElementById('sq').value*(+document.getElementById('in').value/12);
  const cuyd=cuft/27;
  const bags=Math.ceil(cuft/2);
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+cuyd.toFixed(2)+'</strong>Cubic yards</div>'
    +'<div class="stat"><strong>'+bags+'</strong>2 cu ft bags (approx)</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/btu-calculator.html",
      file: "btu-calculator.html",
      category: "calculators",
      title: "BTU Calculator — Room Size Air Conditioner Estimate",
      desc: "Estimate BTU cooling needed from room square feet. Rough AC sizing guide only.",
      card: "BTU calculator",
      cardDesc: "AC BTU estimate.",
      body: `<h1>BTU calculator (room AC)</h1>${ad}
<div class="tool-panel">
<label for="sq">Room area (sq ft)</label><input id="sq" type="number" value="250" />
<label for="sun">Sun exposure</label><select id="sun"><option value="1">Normal</option><option value="1.1">Very sunny</option><option value="0.9">Shaded</option></select>
<button type="button" class="primary" id="go">Estimate BTU</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const sq=+document.getElementById('sq').value;
  const mult=+document.getElementById('sun').value;
  const btu=Math.round(sq*20*mult);
  document.getElementById('out').textContent='Roughly '+btu.toLocaleString()+' BTU/hr needed (rule-of-thumb ~20 BTU per sq ft).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/mm-to-inches-converter.html",
      file: "mm-to-inches-converter.html",
      category: "calculators",
      title: "MM to Inches Converter — Millimeters to Inches",
      desc: "Convert millimeters to inches and inches to mm. Free metric imperial length converter.",
      card: "MM to inches",
      cardDesc: "mm ↔ in.",
      body: `<h1>MM to inches converter</h1>${ad}
<div class="tool-panel">
<label for="mm">Millimeters</label><input id="mm" type="number" step="0.01" value="25.4" />
<label for="in">Inches</label><input id="in" type="number" step="0.0001" />
</div>
<script>
const mm=document.getElementById('mm'), inch=document.getElementById('in'); let l=false;
mm.oninput=()=>{ if(l)return; l=true; inch.value=mm.value!==''?(mm.value/25.4).toFixed(4):''; l=false; };
inch.oninput=()=>{ if(l)return; l=true; mm.value=inch.value!==''?(inch.value*25.4).toFixed(2):''; l=false; };
mm.oninput(); mm.dispatchEvent(new Event('input'));
</script>`,
    },
    {
      path: "/fluid-ounces-to-ml-converter.html",
      file: "fluid-ounces-to-ml-converter.html",
      category: "calculators",
      title: "Ounces to ML Converter — US Fluid Ounces to Milliliters",
      desc: "Convert US fluid ounces to milliliters and ml to fl oz. Free kitchen volume converter.",
      card: "Fl oz to ml",
      cardDesc: "US fl oz ↔ ml.",
      body: `<h1>Fluid ounces to ml (US)</h1>${ad}
<div class="tool-panel">
<label for="oz">US fluid ounces</label><input id="oz" type="number" step="0.01" value="8" />
<label for="ml">Milliliters</label><input id="ml" type="number" step="0.01" />
<p class="prose" style="font-size:0.85rem">1 US fl oz = 29.5735 ml</p>
</div>
<script>
const oz=document.getElementById('oz'), ml=document.getElementById('ml'); let l=false;
oz.oninput=()=>{ if(l)return; l=true; ml.value=oz.value!==''?(oz.value*29.5735).toFixed(2):''; l=false; };
ml.oninput=()=>{ if(l)return; l=true; oz.value=ml.value!==''?(ml.value/29.5735).toFixed(3):''; l=false; };
oz.oninput(); oz.dispatchEvent(new Event('input'));
</script>`,
    },
    {
      path: "/commission-calculator.html",
      file: "commission-calculator.html",
      category: "calculators",
      title: "Commission Calculator — Sales Commission from Rate",
      desc: "Calculate sales commission from sale amount and commission rate. Free commission calculator.",
      card: "Commission calculator",
      cardDesc: "Sale × commission %.",
      body: `<h1>Commission calculator</h1>${ad}
<div class="tool-panel">
<label for="sale">Sale amount ($)</label><input id="sale" type="number" value="10000" />
<label for="rate">Commission rate (%)</label><input id="rate" type="number" step="0.01" value="5" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const c=+document.getElementById('sale').value*(+document.getElementById('rate').value/100);
  document.getElementById('out').textContent='Commission: $'+c.toFixed(2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/pro-rata-calculator.html",
      file: "pro-rata-calculator.html",
      category: "calculators",
      title: "Pro Rata Calculator — Prorated Amount by Days",
      desc: "Calculate pro-rata salary or rent for partial months from daily rate and days used.",
      card: "Pro rata calculator",
      cardDesc: "Prorate by days.",
      body: `<h1>Pro rata calculator</h1>${ad}
<div class="tool-panel">
<label for="full">Full period amount ($)</label><input id="full" type="number" value="3000" />
<label for="days">Days in period</label><input id="days" type="number" value="30" />
<label for="used">Days used</label><input id="used" type="number" value="12" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const pr=(+document.getElementById('full').value)*(+document.getElementById('used').value)/(+document.getElementById('days').value);
  document.getElementById('out').textContent='Pro-rata amount: $'+pr.toFixed(2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/swp-calculator.html",
      file: "swp-calculator.html",
      category: "india",
      title: "SWP Calculator — Systematic Withdrawal Plan India",
      desc: "Estimate how long mutual fund corpus lasts with monthly SWP withdrawals and return rate. Illustration only.",
      card: "SWP calculator",
      cardDesc: "Withdrawal runway.",
      body: `<h1>SWP calculator (India)</h1>${ad}
<div class="tool-panel">
<label for="corpus">Starting corpus (₹)</label><input id="corpus" type="number" value="5000000" />
<label for="wd">Monthly withdrawal (₹)</label><input id="wd" type="number" value="40000" />
<label for="r">Expected annual return (%)</label><input id="r" type="number" step="0.1" value="8" />
<button type="button" class="primary" id="go">Estimate duration</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let bal=+document.getElementById('corpus').value;
  const wd=+document.getElementById('wd').value;
  const rm=+document.getElementById('r').value/100/12;
  let months=0;
  while(bal>wd&&months<600){
    bal=bal*(1+rm)-wd; months++;
  }
  document.getElementById('out').textContent=months>=600?'Withdrawal may exceed growth indefinitely (check inputs).':'Corpus may last ~'+months+' months ('+(months/12).toFixed(1)+' years). Not investment advice.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/speaking-time-calculator.html",
      file: "speaking-time-calculator.html",
      category: "writing",
      title: "Speaking Time Calculator — Speech Length from Word Count",
      desc: "Estimate presentation or speech duration from word count and speaking speed (WPM).",
      card: "Speaking time",
      cardDesc: "Words → minutes.",
      body: `<h1>Speaking time calculator</h1>${ad}
<div class="tool-panel">
<label for="words">Word count</label><input id="words" type="number" value="1200" />
<label for="wpm">Speaking speed (words per minute)</label><input id="wpm" type="number" value="130" />
<button type="button" class="primary" id="go">Estimate time</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const min=+document.getElementById('words').value/+document.getElementById('wpm').value;
  const m=Math.floor(min), s=Math.round((min-m)*60);
  document.getElementById('out').textContent='About '+m+' min '+s+' sec at '+document.getElementById('wpm').value+' WPM.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/paragraph-counter.html",
      file: "paragraph-counter.html",
      category: "writing",
      title: "Paragraph Counter — Count Paragraphs in Text",
      desc: "Count paragraphs in an essay or article. Free paragraph counter for writers and students.",
      card: "Paragraph counter",
      cardDesc: "Paragraph count.",
      body: `<h1>Paragraph counter</h1>${ad}
<div class="tool-panel">
<label for="text">Text</label><textarea id="text" rows="10" placeholder="Paste your essay…"></textarea>
<div class="stats" id="stats"></div>
</div>
<script>
function upd(){
  const t=document.getElementById('text').value.trim();
  const paras=t? t.split(/\\n\\s*\\n/).filter(p=>p.trim()).length : 0;
  const words=(t.match(/\\S+/g)||[]).length;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+paras+'</strong>Paragraphs</div><div class="stat"><strong>'+words+'</strong>Words</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/youtube-tags-generator.html",
      file: "youtube-tags-generator.html",
      category: "seo",
      title: "YouTube Tags Generator — Video Tag Ideas from Keywords",
      desc: "Generate comma-separated YouTube tag ideas from your video topic keywords. Free tag helper for SEO.",
      card: "YouTube tags",
      cardDesc: "Tag ideas from keywords.",
      body: `<h1>YouTube tags generator</h1>${ad}
<div class="tool-panel">
<label for="text">Video topic / keywords</label><textarea id="text" rows="3" placeholder="home workout dumbbells beginners"></textarea>
<button type="button" class="primary" id="go">Generate tags</button>
<textarea id="out" rows="4" readonly></textarea>
<button type="button" class="primary rs-secondary" id="copy">Copy tags</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const words=(document.getElementById('text').value.toLowerCase().match(/[a-z0-9]{3,}/g)||[]);
  const base=[...new Set(words)];
  const tags=base.concat(base.map(w=>w+' tutorial'), base.map(w=>w+' tips')).slice(0,15);
  document.getElementById('out').value=[...new Set(tags)].join(', ');
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
</script>`,
    },
    {
      path: "/hreflang-tag-generator.html",
      file: "hreflang-tag-generator.html",
      category: "seo",
      title: "Hreflang Tag Generator — Multilingual SEO Link Tags",
      desc: "Generate hreflang link tags for alternate language or region pages. Copy HTML for international SEO.",
      card: "Hreflang generator",
      cardDesc: "Alternate locale tags.",
      body: `<h1>Hreflang tag generator</h1>${ad}
<div class="tool-panel">
<div id="rows">
<div class="job-block"><label>Language/region (hreflang)</label><input data-h placeholder="en-in" /><label>Page URL</label><input data-u type="url" placeholder="https://example.com/in/" /></div>
</div>
<button type="button" class="primary rs-secondary" id="add">+ Add locale</button>
<button type="button" class="primary" id="go">Generate tags</button>
<textarea id="out" rows="10" readonly style="font-family:monospace;font-size:0.82rem"></textarea>
</div>
<script>
document.getElementById('add').onclick=()=>{
  const d=document.createElement('div'); d.className='job-block';
  d.innerHTML='<label>Language/region (hreflang)</label><input data-h /><label>Page URL</label><input data-u type="url" /><button type="button" class="rs-link-btn" data-r>Remove</button>';
  d.querySelector('[data-r]').onclick=()=>d.remove();
  document.getElementById('rows').appendChild(d);
};
document.getElementById('go').onclick=()=>{
  const lines=[];
  document.querySelectorAll('#rows .job-block').forEach(b=>{
    const h=b.querySelector('[data-h]').value.trim();
    const u=b.querySelector('[data-u]').value.trim();
    if(h&&u) lines.push('<link rel="alternate" hreflang="'+h+'" href="'+u.replace(/"/g,'&quot;')+'" />');
  });
  document.getElementById('out').value=lines.join('\\n')||'Add at least one locale and URL.';
};
</script>`,
    },
    {
      path: "/amazon-title-character-counter.html",
      file: "amazon-title-character-counter.html",
      category: "seo",
      title: "Amazon Title Character Counter — Product Listing Length",
      desc: "Count characters in Amazon product titles with common 200-character guidance for sellers.",
      card: "Amazon title counter",
      cardDesc: "Listing title length.",
      body: `<h1>Amazon product title counter</h1>${ad}
<div class="tool-panel">
<label for="text">Product title</label><textarea id="text" rows="4"></textarea>
<div class="stats" id="stats"></div>
<p class="prose" style="font-size:0.85rem">Many categories suggest ~200 characters or less; Amazon rules vary by category.</p>
</div>
<script>
const G=200;
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML='<div class="stat"><strong>'+n+'</strong>Characters</div><div class="stat"><strong>'+(G-n)+'</strong>Left of ~200 guide</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/otp-generator.html",
      file: "otp-generator.html",
      category: "developer",
      title: "OTP Generator — 6-Digit One-Time Code",
      desc: "Generate random numeric OTP codes for testing and demos. Created locally in your browser.",
      card: "OTP generator",
      cardDesc: "6-digit codes.",
      body: `<h1>OTP generator</h1>${ad}
<div class="tool-panel">
<label for="len">Digits</label><input id="len" type="number" min="4" max="10" value="6" />
<button type="button" class="primary" id="go">Generate OTP</button>
<p id="out" class="ok" style="font-family:monospace;font-size:1.4rem;letter-spacing:0.2em"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const n=+document.getElementById('len').value||6;
  const arr=new Uint32Array(n); crypto.getRandomValues(arr);
  let s=''; for(let i=0;i<n;i++) s+=arr[i]%10;
  document.getElementById('out').textContent=s;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/wind-chill-calculator.html",
      file: "wind-chill-calculator.html",
      category: "calculators",
      title: "Wind Chill Calculator — Feels-Like Temperature",
      desc: "Calculate wind chill from air temperature and wind speed (US formula). Free weather calculator.",
      card: "Wind chill",
      cardDesc: "Feels-like temp.",
      body: `<h1>Wind chill calculator</h1>${ad}
<div class="tool-panel">
<label for="t">Air temperature (°F)</label><input id="t" type="number" value="30" />
<label for="w">Wind speed (mph)</label><input id="w" type="number" value="15" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let T=+document.getElementById('t').value, V=+document.getElementById('w').value;
  if(V<3){ document.getElementById('out').textContent='Wind chill ≈ air temperature when wind &lt; 3 mph.'; return; }
  const wc=35.74+0.6215*T-35.75*Math.pow(V,0.16)+0.4275*T*Math.pow(V,0.16);
  document.getElementById('out').textContent='Wind chill: '+wc.toFixed(1)+' °F';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/heat-index-calculator.html",
      file: "heat-index-calculator.html",
      category: "calculators",
      title: "Heat Index Calculator — Feels-Like Hot Weather",
      desc: "Estimate heat index from temperature and relative humidity (°F). Free summer safety calculator.",
      card: "Heat index",
      cardDesc: "Feels-like heat.",
      body: `<h1>Heat index calculator</h1>${ad}
<div class="tool-panel">
<label for="t">Temperature (°F)</label><input id="t" type="number" value="90" />
<label for="rh">Relative humidity (%)</label><input id="rh" type="number" value="60" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const T=+document.getElementById('t').value, R=+document.getElementById('rh').value;
  const hi=-42.379+2.04901523*T+10.14333127*R-0.22475541*T*R-0.00683783*T*T-0.05481717*R*R+0.00122874*T*T*R+0.00085282*T*R*R-0.00000199*T*T*R*R;
  document.getElementById('out').textContent='Heat index: '+hi.toFixed(1)+' °F (approx NOAA formula).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/pdf-rotate.html",
      file: "pdf-rotate.html",
      category: "documents",
      title: "Rotate PDF — Turn PDF Pages 90° Online",
      desc: "Rotate all pages in a PDF 90° clockwise in your browser. Private pdf-lib tool—no upload.",
      card: "Rotate PDF",
      cardDesc: "Rotate pages 90°.",
      body: `<h1>Rotate PDF pages</h1>${ad}
<div class="tool-panel">
<label for="file">PDF file</label><input id="file" type="file" accept="application/pdf" />
<label for="deg">Rotation</label><select id="deg"><option value="90">90° clockwise</option><option value="180">180°</option><option value="270">90° counter-clockwise</option></select>
<button type="button" class="primary" id="go" disabled>Rotate &amp; download</button>
<p id="msg" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script type="module">
const f=document.getElementById('file'), btn=document.getElementById('go'), msg=document.getElementById('msg');
f.onchange=()=>{ btn.disabled=!f.files.length; };
btn.onclick=async()=>{
  msg.textContent='Processing…';
  try{
    const { PDFDocument, degrees }=await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
    const src=await PDFDocument.load(await f.files[0].arrayBuffer());
    const out=await PDFDocument.create();
    const rot=+document.getElementById('deg').value;
    const pages=await out.copyPages(src, src.getPageIndices());
    pages.forEach(p=>{ p.setRotation(degrees(rot)); out.addPage(p); });
    const saved=await out.save();
    const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([saved],{type:'application/pdf'}));
    a.download='rotated.pdf';
    a.click();
    msg.className='ok'; msg.textContent='Downloaded rotated PDF.';
  }catch(e){ msg.className='error'; msg.textContent='Could not rotate PDF.'; }
};
</script>`,
    },
  ];
}
