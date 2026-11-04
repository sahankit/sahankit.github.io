/** Batch 25 — More high-search-intent tools. */

export function batch25Tools(ad) {
  return [
    {
      path: "/facebook-character-counter.html",
      file: "facebook-character-counter.html",
      category: "seo",
      title: "Facebook Post Character Counter — Status Length",
      desc: "Count characters for Facebook posts and ads. Free counter with common length guidance for social copy.",
      card: "Facebook counter",
      cardDesc: "Post character count.",
      body: `<h1>Facebook post character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Post text</label><textarea id="text" rows="8" placeholder="Write your Facebook post…"></textarea>
<div class="stats" id="stats"></div>
<p class="prose" style="font-size:0.85rem">Short posts often perform well under ~250 characters; Facebook allows much longer text.</p>
</div>
<script>
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+n+'</strong>Characters</div>'
    +'<div class="stat"><strong>'+(n<=250?'Short':'Long')+'</strong>~250 char tip</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/pinterest-description-counter.html",
      file: "pinterest-description-counter.html",
      category: "seo",
      title: "Pinterest Description Character Counter — Pin Text Limit",
      desc: "Count Pinterest pin description characters. Free counter with ~500 character guidance for pin SEO.",
      card: "Pinterest counter",
      cardDesc: "Pin description length.",
      body: `<h1>Pinterest description counter</h1>${ad}
<div class="tool-panel">
<label for="text">Pin description</label><textarea id="text" rows="6"></textarea>
<div class="stats" id="stats"></div>
</div>
<script>
const GUIDE=500;
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML='<div class="stat"><strong>'+n+'</strong>Chars</div><div class="stat"><strong>'+(GUIDE-n)+'</strong>Left of ~500 guide</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/sitemap-xml-generator.html",
      file: "sitemap-xml-generator.html",
      category: "seo",
      title: "Sitemap XML Generator — Build sitemap.xml Online",
      desc: "Generate a basic sitemap.xml from a list of page URLs. Free XML sitemap builder for small sites.",
      card: "Sitemap generator",
      cardDesc: "sitemap.xml from URLs.",
      body: `<h1>Sitemap XML generator</h1>${ad}
<div class="tool-panel">
<label for="base">Site base URL</label><input id="base" type="url" placeholder="https://example.com" />
<label for="urls">Page paths or full URLs (one per line)</label><textarea id="urls" rows="10" placeholder="/\\n/about/\\n/contact/"></textarea>
<button type="button" class="primary" id="go">Generate sitemap.xml</button>
<textarea id="out" rows="14" readonly style="font-family:monospace;font-size:0.82rem"></textarea>
<button type="button" class="primary rs-secondary" id="copy">Copy XML</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let base=(document.getElementById('base').value||'https://example.com').replace(/\\/+$/,'');
  const lines=(document.getElementById('urls').value||'').split(/\\n/).map(s=>s.trim()).filter(Boolean);
  const today=new Date().toISOString().slice(0,10);
  const locs=lines.map(u=>u.startsWith('http')?u:(base+(u.startsWith('/')?u:'/'+u)));
  const body=locs.map(u=>'  <url><loc>'+u.replace(/&/g,'&amp;')+'</loc><lastmod>'+today+'</lastmod></url>').join('\\n');
  document.getElementById('out').value='<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n'+body+'\\n</urlset>';
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
</script>`,
    },
    {
      path: "/canonical-tag-generator.html",
      file: "canonical-tag-generator.html",
      category: "seo",
      title: "Canonical Tag Generator — rel=canonical HTML",
      desc: "Generate a canonical link tag for duplicate content and SEO. Copy HTML for your page head.",
      card: "Canonical tag",
      cardDesc: "rel=canonical HTML.",
      body: `<h1>Canonical tag generator</h1>${ad}
<div class="tool-panel">
<label for="url">Preferred page URL</label><input id="url" type="url" placeholder="https://example.com/page/" />
<button type="button" class="primary" id="go">Generate</button>
<textarea id="out" rows="3" readonly style="font-family:monospace"></textarea>
<button type="button" class="primary rs-secondary" id="copy">Copy</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const u=document.getElementById('url').value.trim();
  document.getElementById('out').value=u?'<link rel="canonical" href="'+u.replace(/"/g,'&quot;')+'" />':'Enter a URL.';
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/period-calculator.html",
      file: "period-calculator.html",
      category: "calculators",
      title: "Period Calculator — Next Period & Cycle Dates",
      desc: "Estimate next period date from last period start and average cycle length. Not medical advice.",
      card: "Period calculator",
      cardDesc: "Next cycle estimate.",
      body: `<h1>Period calculator</h1>${ad}
<div class="tool-panel">
<label for="last">First day of last period</label><input id="last" type="date" />
<label for="cycle">Cycle length (days)</label><input id="cycle" type="number" min="21" max="45" value="28" />
<button type="button" class="primary" id="go">Estimate next period</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=document.getElementById('last').value; if(!v) return;
  const cycle=+document.getElementById('cycle').value||28;
  const next=new Date(v+'T12:00:00'); next.setDate(next.getDate()+cycle);
  document.getElementById('out').textContent='Next period may start around '+next.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'})+'.';
};
</script>`,
    },
    {
      path: "/pregnancy-week-calculator.html",
      file: "pregnancy-week-calculator.html",
      category: "calculators",
      title: "Pregnancy Week Calculator — How Many Weeks Pregnant",
      desc: "Calculate pregnancy week and day from the first day of your last period (LMP). Estimate only.",
      card: "Pregnancy weeks",
      cardDesc: "Weeks from LMP.",
      body: `<h1>Pregnancy week calculator</h1>${ad}
<div class="tool-panel">
<label for="lmp">First day of last period (LMP)</label><input id="lmp" type="date" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=document.getElementById('lmp').value; if(!v) return;
  const lmp=new Date(v+'T12:00:00');
  const days=Math.floor((Date.now()-lmp)/86400000);
  const w=Math.floor(days/7), d=days%7;
  document.getElementById('out').textContent='About '+w+' weeks '+d+' days pregnant (gestational age from LMP). Confirm with prenatal care.';
};
</script>`,
    },
    {
      path: "/z-score-calculator.html",
      file: "z-score-calculator.html",
      category: "calculators",
      title: "Z-Score Calculator — Standard Score from Mean",
      desc: "Calculate z-score from value, mean, and standard deviation. Free statistics calculator.",
      card: "Z-score",
      cardDesc: "Standard score (z).",
      body: `<h1>Z-score calculator</h1>${ad}
<div class="tool-panel">
<label for="x">Value (x)</label><input id="x" type="number" step="any" value="85" />
<label for="mu">Mean (μ)</label><input id="mu" type="number" step="any" value="75" />
<label for="sd">Standard deviation (σ)</label><input id="sd" type="number" step="any" value="10" />
<button type="button" class="primary" id="go">Calculate z</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const x=+document.getElementById('x').value, mu=+document.getElementById('mu').value, sd=+document.getElementById('sd').value;
  if(!sd){ document.getElementById('out').className='error'; document.getElementById('out').textContent='σ must be > 0'; return; }
  document.getElementById('out').className='ok';
  const z=(x-mu)/sd;
  document.getElementById('out').textContent='z = '+z.toFixed(4)+' (x is '+(z>=0?'above':'below')+' the mean).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/reverse-sales-tax-calculator.html",
      file: "reverse-sales-tax-calculator.html",
      category: "calculators",
      title: "Reverse Sales Tax Calculator — Price Before Tax",
      desc: "Find pre-tax price from tax-inclusive total and tax rate. Free reverse VAT/sales tax calculator.",
      card: "Reverse sales tax",
      cardDesc: "Pre-tax from total.",
      body: `<h1>Reverse sales tax calculator</h1>${ad}
<div class="tool-panel">
<label for="total">Total with tax ($)</label><input id="total" type="number" step="0.01" value="118" />
<label for="rate">Tax rate (%)</label><input id="rate" type="number" step="0.01" value="18" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const total=+document.getElementById('total').value;
  const r=+document.getElementById('rate').value/100;
  const pre=total/(1+r);
  const tax=total-pre;
  document.getElementById('out').textContent='Pre-tax: $'+pre.toFixed(2)+' · Tax: $'+tax.toFixed(2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/house-affordability-calculator.html",
      file: "house-affordability-calculator.html",
      category: "calculators",
      title: "House Affordability Calculator — Home Price from Income",
      desc: "Estimate affordable home price using income and DTI-style payment ratio. Illustration—not a loan offer.",
      card: "House affordability",
      cardDesc: "Price from income.",
      body: `<h1>House affordability calculator</h1>${ad}
<div class="tool-panel">
<label for="inc">Gross monthly income ($)</label><input id="inc" type="number" value="8000" />
<label for="pct">Max housing payment (% of income)</label><input id="pct" type="number" value="28" />
<label for="down">Down payment ($)</label><input id="down" type="number" value="50000" />
<label for="rate">Mortgage rate (% APR)</label><input id="rate" type="number" step="0.01" value="7" />
<label for="years">Loan term (years)</label><input id="years" type="number" value="30" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const pmt=+document.getElementById('inc').value*(+document.getElementById('pct').value/100);
  const r=+document.getElementById('rate').value/100/12;
  const n=+document.getElementById('years').value*12;
  const loan=r? pmt*((Math.pow(1+r,n)-1)/(r*Math.pow(1+r,n))): pmt*n;
  const price=loan+(+document.getElementById('down').value);
  document.getElementById('out').textContent='Rough max home price ~ $'+Math.round(price).toLocaleString()+' (payment ~ $'+Math.round(pmt)+'/mo). Taxes/insurance not included.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/overtime-calculator.html",
      file: "overtime-calculator.html",
      category: "calculators",
      title: "Overtime Pay Calculator — Time and a Half",
      desc: "Calculate overtime pay at 1.5× hourly rate. Free US-style overtime calculator for hourly workers.",
      card: "Overtime pay",
      cardDesc: "1.5× hourly rate.",
      body: `<h1>Overtime calculator</h1>${ad}
<div class="tool-panel">
<label for="rate">Regular hourly rate ($)</label><input id="rate" type="number" step="0.01" value="20" />
<label for="reg">Regular hours</label><input id="reg" type="number" step="0.1" value="40" />
<label for="ot">Overtime hours</label><input id="ot" type="number" step="0.1" value="5" />
<button type="button" class="primary" id="go">Calculate pay</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const r=+document.getElementById('rate').value;
  const reg=+document.getElementById('reg').value;
  const ot=+document.getElementById('ot').value;
  const total=reg*r+ot*r*1.5;
  document.getElementById('out').textContent='Gross pay: $'+total.toFixed(2)+' (regular $'+(reg*r).toFixed(2)+' + OT $'+(ot*r*1.5).toFixed(2)+'). Rules vary by region.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/markup-calculator.html",
      file: "markup-calculator.html",
      category: "calculators",
      title: "Markup Calculator — Selling Price from Cost",
      desc: "Calculate selling price and profit from cost and markup percentage. Free retail markup calculator.",
      card: "Markup calculator",
      cardDesc: "Cost + markup %.",
      body: `<h1>Markup calculator</h1>${ad}
<div class="tool-panel">
<label for="cost">Cost ($)</label><input id="cost" type="number" step="0.01" value="50" />
<label for="mk">Markup (%)</label><input id="mk" type="number" step="0.1" value="40" />
<button type="button" class="primary" id="go">Calculate price</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const cost=+document.getElementById('cost').value;
  const mk=+document.getElementById('mk').value/100;
  const price=cost*(1+mk);
  document.getElementById('out').textContent='Sell at $'+price.toFixed(2)+' · Profit $'+(price-cost).toFixed(2)+' · Markup '+document.getElementById('mk').value+'%';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/gravel-calculator.html",
      file: "gravel-calculator.html",
      category: "calculators",
      title: "Gravel Calculator — Tons & Cubic Yards for Driveway",
      desc: "Estimate gravel volume and weight for driveways and paths. Free cubic yard gravel calculator.",
      card: "Gravel calculator",
      cardDesc: "Volume & tons estimate.",
      body: `<h1>Gravel calculator</h1>${ad}
<div class="tool-panel">
<label for="L">Length (feet)</label><input id="L" type="number" value="20" />
<label for="W">Width (feet)</label><input id="W" type="number" value="10" />
<label for="D">Depth (inches)</label><input id="D" type="number" value="3" />
<button type="button" class="primary" id="go">Calculate</button>
<div class="stats" id="stats"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const cuft=+document.getElementById('L').value*+document.getElementById('W').value*(+document.getElementById('D').value/12);
  const cuyd=cuft/27;
  const tons=cuft*0.005; // ~100 lb/ft³ rule of thumb
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+cuyd.toFixed(2)+'</strong>Cubic yards</div>'
    +'<div class="stat"><strong>'+tons.toFixed(2)+'</strong>Tons (approx)</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/tile-calculator.html",
      file: "tile-calculator.html",
      category: "calculators",
      title: "Tile Calculator — Floor Tiles Needed with Waste",
      desc: "Calculate how many floor tiles you need from room size and tile dimensions. Adds waste factor.",
      card: "Tile calculator",
      cardDesc: "Tiles for floor area.",
      body: `<h1>Tile calculator</h1>${ad}
<div class="tool-panel">
<label for="rl">Room length (ft)</label><input id="rl" type="number" value="12" />
<label for="rw">Room width (ft)</label><input id="rw" type="number" value="10" />
<label for="tl">Tile length (in)</label><input id="tl" type="number" value="12" />
<label for="tw">Tile width (in)</label><input id="tw" type="number" value="12" />
<label for="w">Waste (%)</label><input id="w" type="number" value="10" />
<button type="button" class="primary" id="go">Calculate tiles</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const area=+document.getElementById('rl').value*+document.getElementById('rw').value*144;
  const tile=+document.getElementById('tl').value*+document.getElementById('tw').value;
  const n=Math.ceil((area/tile)*(1+(+document.getElementById('w').value/100)));
  document.getElementById('out').textContent='Order about '+n+' tiles (includes waste).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/calories-burned-walking-calculator.html",
      file: "calories-burned-walking-calculator.html",
      category: "calculators",
      title: "Calories Burned Walking Calculator — Steps & Distance",
      desc: "Estimate calories burned walking from weight, distance, or steps. Illustration using MET estimate.",
      card: "Walking calories",
      cardDesc: "Calories burned walking.",
      body: `<h1>Calories burned walking</h1>${ad}
<div class="tool-panel">
<label for="kg">Body weight (kg)</label><input id="kg" type="number" value="70" />
<label for="mi">Distance (miles)</label><input id="mi" type="number" step="0.1" value="3" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const kg=+document.getElementById('kg').value;
  const mi=+document.getElementById('mi').value;
  const hours=mi/3.1; // ~3.1 mph moderate walk
  const met=3.5;
  const kcal=met*3.5*kg/200*hours*60;
  document.getElementById('out').textContent='About '+Math.round(kcal)+' kcal burned (moderate pace estimate).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/syllable-counter.html",
      file: "syllable-counter.html",
      category: "writing",
      title: "Syllable Counter — Count Syllables in Text",
      desc: "Estimate syllable count in English text for poetry, haiku, and readability. Free syllable counter.",
      card: "Syllable counter",
      cardDesc: "Syllables in text.",
      body: `<h1>Syllable counter</h1>${ad}
<div class="tool-panel">
<label for="text">Text</label><textarea id="text" rows="8" placeholder="Paste poem or sentence…"></textarea>
<button type="button" class="primary" id="go">Count syllables</button>
<p id="out" class="ok"></p>
</div>
<script>
function countSyl(word){
  word=word.toLowerCase().replace(/[^a-z]/g,'');
  if(word.length<=3) return 1;
  word=word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m=word.match(/[aeiouy]{1,2}/g);
  return m?m.length:1;
}
document.getElementById('go').onclick=()=>{
  const words=(document.getElementById('text').value.match(/[a-zA-Z']+/g)||[]);
  const s=words.reduce((a,w)=>a+countSyl(w),0);
  document.getElementById('out').textContent=s+' syllables in '+words.length+' words (English estimate).';
};
</script>`,
    },
    {
      path: "/sentence-counter.html",
      file: "sentence-counter.html",
      category: "writing",
      title: "Sentence Counter — Count Sentences in Text",
      desc: "Count sentences in your writing for readability and editing. Free sentence counter online.",
      card: "Sentence counter",
      cardDesc: "Sentences in text.",
      body: `<h1>Sentence counter</h1>${ad}
<div class="tool-panel">
<label for="text">Text</label><textarea id="text" rows="8"></textarea>
<button type="button" class="primary" id="go">Count</button>
<div class="stats" id="stats"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const t=document.getElementById('text').value.trim();
  const sentences=t? (t.match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[]).filter(s=>s.trim()).length : 0;
  const words=(t.match(/\\S+/g)||[]).length;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+sentences+'</strong>Sentences</div>'
    +'<div class="stat"><strong>'+words+'</strong>Words</div>'
    +'<div class="stat"><strong>'+(sentences? (words/sentences).toFixed(1):0)+'</strong>Words/sentence</div>';
};
document.getElementById('text').oninput=()=>document.getElementById('go').click();
</script>`,
    },
    {
      path: "/nanoid-generator.html",
      file: "nanoid-generator.html",
      category: "developer",
      title: "Nano ID Generator — Short Unique IDs",
      desc: "Generate URL-friendly Nano ID strings in the browser. Free unique ID generator for apps and databases.",
      card: "Nano ID generator",
      cardDesc: "Short unique IDs.",
      body: `<h1>Nano ID generator</h1>${ad}
<div class="tool-panel">
<label for="len">Length</label><input id="len" type="number" min="8" max="32" value="21" />
<button type="button" class="primary" id="go">Generate</button>
<p id="out" class="ok" style="font-family:monospace"></p>
<button type="button" class="primary rs-secondary" id="copy">Copy</button>
</div>
<script>
const ABC='-_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
document.getElementById('go').onclick=()=>{
  const n=+document.getElementById('len').value||21;
  const arr=new Uint8Array(n); crypto.getRandomValues(arr);
  let id=''; for(let i=0;i<n;i++) id+=ABC[arr[i]&63];
  document.getElementById('out').textContent=id;
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').textContent);
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/png-to-pdf.html",
      file: "png-to-pdf.html",
      category: "documents",
      title: "PNG to PDF — Convert PNG Image to PDF",
      desc: "Convert PNG images to PDF in your browser. Private conversion—no upload to our servers.",
      card: "PNG to PDF",
      cardDesc: "PNG → PDF download.",
      body: `<h1>PNG to PDF</h1>${ad}
<div class="tool-panel">
<label for="file">PNG image</label><input id="file" type="file" accept="image/png" />
<button type="button" class="primary" id="go" disabled>Convert</button>
<p id="msg" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script type="module">
const f=document.getElementById('file'), btn=document.getElementById('go'), msg=document.getElementById('msg');
f.onchange=()=>{ btn.disabled=!f.files.length; msg.textContent=''; };
btn.onclick=async()=>{
  msg.textContent='Converting…';
  try{
    const { PDFDocument }=await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
    const bytes=await f.files[0].arrayBuffer();
    const pdf=await PDFDocument.create();
    const img=await pdf.embedPng(bytes);
    const { width, height }=img.scale(1);
    const page=pdf.addPage([width,height]);
    page.drawImage(img,{x:0,y:0,width,height});
    const saved=await pdf.save();
    const base=(f.files[0].name||'image').replace(/\\.png$/i,'');
    const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([saved],{type:'application/pdf'}));
    a.download=base+'.pdf';
    a.click();
    msg.className='ok'; msg.textContent='Downloaded '+base+'.pdf';
  }catch(e){ msg.className='error'; msg.textContent='Could not convert.'; }
};
</script>`,
    },
  ];
}
