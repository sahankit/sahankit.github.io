/** Batch 23 — Additional high-search-intent tools. */

export function batch23Tools(ad) {
  return [
    {
      path: "/serp-snippet-preview.html",
      file: "serp-snippet-preview.html",
      category: "seo",
      title: "SERP Snippet Preview — Google Title & Description Mockup",
      desc: "Preview how your page title and meta description may look in Google search results. Free SERP simulator for SEO.",
      card: "SERP preview",
      cardDesc: "Google snippet mockup.",
      body: `<h1>SERP snippet preview</h1>${ad}
<div class="tool-panel">
<label for="url">Display URL (optional)</label><input id="url" type="text" placeholder="sahankit.github.io › word-counter" />
<label for="title">SEO title</label><input id="title" type="text" maxlength="120" placeholder="Free Word Counter — Count Words Online" />
<label for="desc">Meta description</label><textarea id="desc" rows="3" maxlength="320" placeholder="Paste your meta description…"></textarea>
<div class="brief-card" id="preview" style="margin-top:16px">
<div id="pv-url" style="font-size:0.82rem;color:#202124;margin-bottom:4px"></div>
<div id="pv-title" style="font-size:1.15rem;color:#1a0dab;line-height:1.3;margin-bottom:4px"></div>
<div id="pv-desc" style="font-size:0.88rem;color:#4d5156;line-height:1.45"></div>
</div>
<p id="meta" class="prose" style="font-size:0.88rem"></p>
</div>
<script>
function render(){
  const t=document.getElementById('title').value||'Page title preview';
  const d=document.getElementById('desc').value||'Meta description preview — write a compelling summary for searchers.';
  const u=document.getElementById('url').value||'example.com › page';
  document.getElementById('pv-url').textContent=u;
  document.getElementById('pv-title').textContent=t;
  document.getElementById('pv-desc').textContent=d;
  document.getElementById('meta').textContent='Title '+t.length+' chars · Description '+d.length+' chars (typical targets ~30–60 title, ~120–160 description).';
}
['url','title','desc'].forEach(id=>document.getElementById(id).oninput=render);
render();
</script>`,
    },
    {
      path: "/instagram-caption-counter.html",
      file: "instagram-caption-counter.html",
      category: "seo",
      title: "Instagram Caption Character Counter — Post Limit Checker",
      desc: "Count characters for Instagram captions and bios. Free counter with 2,200 character limit reminder.",
      card: "Instagram counter",
      cardDesc: "Caption character count.",
      body: `<h1>Instagram caption character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Caption or bio text</label><textarea id="text" rows="8" placeholder="Write your Instagram caption…"></textarea>
<div class="stats" id="stats"></div>
</div>
<script>
const LIM=2200;
function upd(){
  const n=document.getElementById('text').value.length;
  const left=LIM-n;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+n+'</strong>Characters used</div>'
    +'<div class="stat"><strong>'+left+'</strong>Remaining (2,200 limit)</div>'
    +'<div class="stat"><strong>'+(left>=0?'OK':'Over')+'</strong>Status</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/twitter-character-counter.html",
      file: "twitter-character-counter.html",
      category: "seo",
      title: "Twitter / X Character Counter — 280 Character Limit",
      desc: "Count characters for posts on X (Twitter). Free 280-character counter for social posts and threads.",
      card: "X / Twitter counter",
      cardDesc: "280 character limit.",
      body: `<h1>X (Twitter) character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Post text</label><textarea id="text" rows="6" placeholder="Write your post…"></textarea>
<div class="stats" id="stats"></div>
</div>
<script>
const LIM=280;
function upd(){
  const n=document.getElementById('text').value.length;
  const left=LIM-n;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+n+'</strong>Characters</div>'
    +'<div class="stat"><strong>'+left+'</strong>Left of 280</div>'
    +'<div class="stat"><strong>'+(left>=0?'Fits':'Too long')+'</strong></div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/linkedin-character-counter.html",
      file: "linkedin-character-counter.html",
      category: "seo",
      title: "LinkedIn Post Character Counter — 3,000 Character Limit",
      desc: "Count characters for LinkedIn posts and updates. Free counter with 3,000 character guidance.",
      card: "LinkedIn counter",
      cardDesc: "Post character count.",
      body: `<h1>LinkedIn post character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Post draft</label><textarea id="text" rows="10" placeholder="Paste your LinkedIn post…"></textarea>
<div class="stats" id="stats"></div>
</div>
<script>
const LIM=3000;
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+n+'</strong>Characters</div>'
    +'<div class="stat"><strong>'+(LIM-n)+'</strong>Remaining</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/schema-markup-generator.html",
      file: "schema-markup-generator.html",
      category: "seo",
      title: "FAQ Schema Markup Generator — JSON-LD for SEO",
      desc: "Build FAQPage JSON-LD structured data from questions and answers. Copy schema markup for rich results.",
      card: "FAQ schema generator",
      cardDesc: "JSON-LD FAQPage markup.",
      body: `<h1>FAQ schema markup generator</h1>${ad}
<div class="tool-panel">
<div id="pairs">
<div class="job-block"><label>Question</label><input type="text" data-q placeholder="How does this tool work?" /><label>Answer</label><textarea rows="2" data-a placeholder="Short answer for search…"></textarea></div>
</div>
<button type="button" class="primary rs-secondary" id="add">+ Add FAQ</button>
<button type="button" class="primary" id="go">Generate JSON-LD</button>
<label for="out">Copy into &lt;head&gt; as script type="application/ld+json"</label>
<textarea id="out" rows="12" readonly style="font-family:monospace;font-size:0.85rem"></textarea>
<button type="button" class="primary rs-secondary" id="copy">Copy markup</button>
</div>
<script>
document.getElementById('add').onclick=()=>{
  const d=document.createElement('div'); d.className='job-block';
  d.innerHTML='<label>Question</label><input type="text" data-q /><label>Answer</label><textarea rows="2" data-a></textarea><button type="button" class="rs-link-btn" data-r>Remove</button>';
  d.querySelector('[data-r]').onclick=()=>d.remove();
  document.getElementById('pairs').appendChild(d);
};
document.getElementById('go').onclick=()=>{
  const faqs=[];
  document.querySelectorAll('#pairs .job-block').forEach(b=>{
    const q=b.querySelector('[data-q]').value.trim();
    const a=b.querySelector('[data-a]').value.trim();
    if(q&&a) faqs.push({q,a});
  });
  if(!faqs.length){ document.getElementById('out').value='Add at least one Q&A pair.'; return; }
  const ld={
    '@context':'https://schema.org',
    '@type':'FAQPage',
    mainEntity: faqs.map(({q,a})=>({
      '@type':'Question', name:q,
      acceptedAnswer:{'@type':'Answer', text:a}
    }))
  };
  document.getElementById('out').value=JSON.stringify(ld,null,2);
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
</script>`,
    },
    {
      path: "/miles-to-km-converter.html",
      file: "miles-to-km-converter.html",
      category: "calculators",
      title: "Miles to KM Converter — Miles to Kilometers Calculator",
      desc: "Convert miles to kilometers and km to miles instantly. Free distance converter for travel, running, and fuel economy.",
      card: "Miles to km",
      cardDesc: "Miles ↔ kilometers.",
      body: `<h1>Miles to km converter</h1>${ad}
<div class="tool-panel">
<label for="mi">Miles</label><input id="mi" type="number" step="0.001" value="10" />
<label for="km">Kilometers</label><input id="km" type="number" step="0.001" />
<p class="prose" style="font-size:0.85rem">1 mi = 1.609344 km</p>
</div>
<script>
const mi=document.getElementById('mi'), km=document.getElementById('km'); let l=false;
mi.oninput=()=>{ if(l)return; l=true; km.value=mi.value!==''?(mi.value*1.609344).toFixed(4):''; l=false; };
km.oninput=()=>{ if(l)return; l=true; mi.value=km.value!==''?(km.value/1.609344).toFixed(4):''; l=false; };
mi.oninput(); mi.dispatchEvent(new Event('input'));
</script>`,
    },
    {
      path: "/liter-to-gallon-converter.html",
      file: "liter-to-gallon-converter.html",
      category: "calculators",
      title: "Liter to Gallon Converter — US Gallons Calculator",
      desc: "Convert liters to US gallons and gallons to liters. Free volume converter for fuel, cooking, and science.",
      card: "Liter to gallon",
      cardDesc: "Liters ↔ US gallons.",
      body: `<h1>Liter to gallon converter (US)</h1>${ad}
<div class="tool-panel">
<label for="L">Liters</label><input id="L" type="number" step="0.01" value="3.785" />
<label for="gal">US gallons</label><input id="gal" type="number" step="0.01" />
<p class="prose" style="font-size:0.85rem">1 US gal = 3.785411784 L</p>
</div>
<script>
const L=document.getElementById('L'), gal=document.getElementById('gal'); let lock=false;
L.oninput=()=>{ if(lock)return; lock=true; gal.value=L.value!==''?(L.value/3.785411784).toFixed(4):''; lock=false; };
gal.oninput=()=>{ if(lock)return; lock=true; L.value=gal.value!==''?(gal.value*3.785411784).toFixed(4):''; lock=false; };
L.oninput(); L.dispatchEvent(new Event('input'));
</script>`,
    },
    {
      path: "/ovulation-calculator.html",
      file: "ovulation-calculator.html",
      category: "calculators",
      title: "Ovulation Calculator — Fertile Window Estimate from LMP",
      desc: "Estimate ovulation and fertile days from cycle length and last period date. Illustration only—not medical advice.",
      card: "Ovulation calculator",
      cardDesc: "Fertile window estimate.",
      body: `<h1>Ovulation calculator</h1>
<p class="prose" style="font-size:0.85rem">Estimate only. Confirm with a clinician or ovulation test.</p>${ad}
<div class="tool-panel">
<label for="lmp">First day of last period</label><input id="lmp" type="date" />
<label for="cycle">Average cycle length (days)</label><input id="cycle" type="number" min="21" max="45" value="28" />
<button type="button" class="primary" id="go">Estimate fertile window</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=document.getElementById('lmp').value; if(!v) return;
  const cycle=+document.getElementById('cycle').value||28;
  const lmp=new Date(v+'T12:00:00');
  const ov=new Date(lmp); ov.setDate(ov.getDate()+cycle-14);
  const start=new Date(ov); start.setDate(start.getDate()-5);
  const end=new Date(ov); end.setDate(end.getDate()+1);
  const fmt=d=>d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
  document.getElementById('out').textContent='Estimated ovulation ~ '+fmt(ov)+'. Fertile window ~ '+fmt(start)+' – '+fmt(end)+' (cycle '+cycle+' days).';
};
</script>`,
    },
    {
      path: "/calorie-deficit-calculator.html",
      file: "calorie-deficit-calculator.html",
      category: "calculators",
      title: "Calorie Deficit Calculator — Daily Calories for Weight Loss",
      desc: "Estimate daily calorie target from TDEE and desired weight loss per week. Free deficit calculator—not medical advice.",
      card: "Calorie deficit",
      cardDesc: "Daily calories to lose weight.",
      body: `<h1>Calorie deficit calculator</h1>${ad}
<div class="tool-panel">
<label for="tdee">Maintenance calories (TDEE) per day</label><input id="tdee" type="number" value="2200" />
<label for="lb">Target loss per week (lbs)</label><input id="lb" type="number" step="0.1" value="1" />
<button type="button" class="primary" id="go">Calculate target</button>
<p id="out" class="ok"></p>
<p class="prose" style="font-size:0.85rem">~3,500 kcal ≈ 1 lb body weight. Use <a href="/tdee-calculator/">TDEE calculator</a> for maintenance estimate.</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const tdee=+document.getElementById('tdee').value;
  const lb=+document.getElementById('lb').value;
  const cut=Math.round(lb*3500/7);
  const target=Math.max(800,tdee-cut);
  document.getElementById('out').textContent='Eat about '+target+' kcal/day (−'+cut+' kcal/day deficit) to lose ~'+lb+' lb/week. Not for minors or medical conditions without professional guidance.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/debt-payoff-calculator.html",
      file: "debt-payoff-calculator.html",
      category: "calculators",
      title: "Debt Payoff Calculator — Months to Pay Off Loan",
      desc: "See how long it takes to pay off debt with APR, balance, and monthly payment. Free loan payoff calculator.",
      card: "Debt payoff",
      cardDesc: "Months to zero balance.",
      body: `<h1>Debt payoff calculator</h1>${ad}
<div class="tool-panel">
<label for="bal">Balance owed ($)</label><input id="bal" type="number" value="5000" />
<label for="apr">APR (%)</label><input id="apr" type="number" step="0.01" value="18" />
<label for="pmt">Monthly payment ($)</label><input id="pmt" type="number" value="200" />
<button type="button" class="primary" id="go">Calculate payoff time</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let bal=+document.getElementById('bal').value;
  const r=+document.getElementById('apr').value/100/12;
  const pmt=+document.getElementById('pmt').value;
  if(pmt<=bal*r){ document.getElementById('out').className='error'; document.getElementById('out').textContent='Payment too low to cover interest. Increase monthly payment.'; return; }
  document.getElementById('out').className='ok';
  let months=0, interest=0;
  while(bal>0.01&&months<600){
    const int=bal*r; interest+=int; bal=bal+int-pmt; months++;
  }
  const yrs=(months/12).toFixed(1);
  document.getElementById('out').textContent='Pay off in ~'+months+' months ('+yrs+' years). Total interest ~ $'+interest.toFixed(0)+'.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/credit-card-payoff-calculator.html",
      file: "credit-card-payoff-calculator.html",
      category: "calculators",
      title: "Credit Card Payoff Calculator — Interest & Timeline",
      desc: "Calculate months to pay off credit card debt with APR and monthly payments. Free payoff planner.",
      card: "Credit card payoff",
      cardDesc: "Payoff time & interest.",
      body: `<h1>Credit card payoff calculator</h1>${ad}
<div class="tool-panel">
<label for="bal">Card balance ($)</label><input id="bal" type="number" value="3000" />
<label for="apr">APR (%)</label><input id="apr" type="number" step="0.01" value="22.99" />
<label for="pmt">Monthly payment ($)</label><input id="pmt" type="number" value="150" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let bal=+document.getElementById('bal').value;
  const r=+document.getElementById('apr').value/100/12;
  const pmt=+document.getElementById('pmt').value;
  if(pmt<=bal*r){ document.getElementById('out').className='error'; document.getElementById('out').textContent='Minimum payment must exceed monthly interest.'; return; }
  document.getElementById('out').className='ok';
  let m=0, int=0;
  while(bal>0.01&&m<600){ const i=bal*r; int+=i; bal=bal+i-pmt; m++; }
  document.getElementById('out').textContent='Debt-free in ~'+m+' months. Interest paid ~ $'+int.toFixed(0)+'. Pay more to finish sooner.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/square-footage-calculator.html",
      file: "square-footage-calculator.html",
      category: "calculators",
      title: "Square Footage Calculator — Room Area in Sq Ft & Sq M",
      desc: "Calculate room area from length and width. Free square feet calculator for flooring, paint, and real estate.",
      card: "Square footage",
      cardDesc: "Length × width area.",
      body: `<h1>Square footage calculator</h1>${ad}
<div class="tool-panel">
<label for="len">Length (feet)</label><input id="len" type="number" step="0.01" value="12" />
<label for="wid">Width (feet)</label><input id="wid" type="number" step="0.01" value="10" />
<button type="button" class="primary" id="go">Calculate area</button>
<div class="stats" id="stats"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const sq=+document.getElementById('len').value*+document.getElementById('wid').value;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+sq.toFixed(2)+'</strong>Square feet</div>'
    +'<div class="stat"><strong>'+(sq*0.092903).toFixed(2)+'</strong>Square meters</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/sleep-calculator.html",
      file: "sleep-calculator.html",
      category: "productivity",
      title: "Sleep Calculator — Best Bedtime & Wake-Up Times",
      desc: "Find wake-up or bedtime options based on 90-minute sleep cycles. Free sleep cycle calculator.",
      card: "Sleep calculator",
      cardDesc: "90-min cycle times.",
      body: `<h1>Sleep calculator</h1>${ad}
<div class="tool-panel">
<label for="mode">I want to</label>
<select id="mode"><option value="wake">Wake up at…</option><option value="sleep">Fall asleep at…</option></select>
<label for="time">Time</label><input id="time" type="time" value="07:00" />
<button type="button" class="primary" id="go">Suggest times</button>
<ul id="list" class="prose"></ul>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const [h,m]=document.getElementById('time').value.split(':').map(Number);
  const base=new Date(); base.setHours(h,m,0,0);
  const wake=document.getElementById('mode').value==='wake';
  const cycles=[6,5,4,3];
  const lis=cycles.map(c=>{
    const d=new Date(base);
    d.setMinutes(d.getMinutes()+(wake?-c*90-15:c*90+15));
    return '<li>'+d.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})+' ('+c+' cycles)</li>';
  });
  document.getElementById('list').innerHTML=(wake?'Try falling asleep at:':'Try waking at:')+lis.join('');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/hours-calculator.html",
      file: "hours-calculator.html",
      category: "productivity",
      title: "Hours Calculator — Add Time Durations",
      desc: "Add hours and minutes from multiple time entries. Free timesheet hours calculator for work and billing.",
      card: "Hours calculator",
      cardDesc: "Add hours & minutes.",
      body: `<h1>Hours calculator</h1>${ad}
<div class="tool-panel">
<label for="a">Time 1 (hours:minutes)</label><input id="a" type="text" placeholder="2:30" value="2:30" />
<label for="b">Time 2</label><input id="b" type="text" placeholder="1:45" value="1:45" />
<label for="c">Time 3 (optional)</label><input id="c" type="text" placeholder="0:00" />
<button type="button" class="primary" id="go">Add times</button>
<p id="out" class="ok"></p>
</div>
<script>
function parse(s){
  const p=s.trim().split(':'); if(p.length<2) return (+s||0)*60;
  return (+p[0]||0)*60+(+p[1]||0);
}
document.getElementById('go').onclick=()=>{
  const total=[document.getElementById('a').value,document.getElementById('b').value,document.getElementById('c').value]
    .reduce((s,v)=>s+parse(v),0);
  const h=Math.floor(total/60), m=total%60;
  document.getElementById('out').textContent='Total: '+h+' h '+m+' min ('+(total/60).toFixed(2)+' decimal hours)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/email-validator.html",
      file: "email-validator.html",
      category: "developer",
      title: "Email Validator — Check Email Address Format Online",
      desc: "Validate email address syntax with RFC-style rules in the browser. Free format checker—does not verify inbox delivery.",
      card: "Email validator",
      cardDesc: "Format syntax check.",
      body: `<h1>Email validator</h1>${ad}
<div class="tool-panel">
<label for="em">Email address</label><input id="em" type="email" placeholder="name@example.com" />
<button type="button" class="primary" id="go">Validate</button>
<p id="out" class="ok"></p>
</div>
<script>
const re=/^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
document.getElementById('go').onclick=()=>{
  const v=document.getElementById('em').value.trim();
  if(!v){ document.getElementById('out').className='error'; document.getElementById('out').textContent='Enter an email.'; return; }
  const ok=re.test(v);
  document.getElementById('out').className=ok?'ok':'error';
  document.getElementById('out').textContent=ok?'Format looks valid (syntax only—not deliverability).':'Format looks invalid.';
};
</script>`,
    },
    {
      path: "/pdf-page-counter.html",
      file: "pdf-page-counter.html",
      category: "documents",
      title: "PDF Page Counter — Count Pages in PDF Online",
      desc: "Count pages in a PDF file locally in your browser. Private PDF page count with pdf-lib—no upload to our servers.",
      card: "PDF page counter",
      cardDesc: "Count PDF pages.",
      body: `<h1>PDF page counter</h1>${ad}
<div class="tool-panel">
<label for="file">PDF file</label><input id="file" type="file" accept="application/pdf" />
<button type="button" class="primary" id="go" disabled>Count pages</button>
<p id="msg" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script type="module">
const f=document.getElementById('file'), btn=document.getElementById('go'), msg=document.getElementById('msg');
f.onchange=()=>{ btn.disabled=!f.files.length; msg.textContent=''; };
btn.onclick=async()=>{
  msg.textContent='Reading PDF…';
  try{
    const { PDFDocument }=await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
    const bytes=await f.files[0].arrayBuffer();
    const doc=await PDFDocument.load(bytes);
    msg.className='ok';
    msg.textContent='This PDF has '+doc.getPageCount()+' page'+(doc.getPageCount()===1?'':'s')+'.';
  }catch(e){ msg.className='error'; msg.textContent='Could not read PDF.'; }
};
</script>`,
    },
  ];
}
