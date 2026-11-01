/** Batch 22 — High-intent SEO tools. */

export function batch22Tools(ad) {
  return [
    {
      path: "/pregnancy-due-date-calculator.html",
      file: "pregnancy-due-date-calculator.html",
      category: "calculators",
      title: "Pregnancy Due Date Calculator — EDD from LMP",
      desc: "Estimate your due date from the first day of your last menstrual period (LMP). Free pregnancy calculator—illustration only, not medical advice.",
      card: "Pregnancy due date",
      cardDesc: "EDD from LMP date.",
      body: `<h1>Pregnancy due date calculator</h1>
<p class="prose" style="font-size:0.85rem">Naegele rule estimate (LMP + 280 days). Confirm with your clinician.</p>${ad}
<div class="tool-panel">
<label for="lmp">First day of last period (LMP)</label><input id="lmp" type="date" />
<button type="button" class="primary" id="go">Calculate due date</button>
<p id="out" class="ok"></p>
<p id="weeks" class="prose"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=document.getElementById('lmp').value; if(!v) return;
  const lmp=new Date(v+'T12:00:00');
  const due=new Date(lmp); due.setDate(due.getDate()+280);
  const today=new Date(); today.setHours(12,0,0,0);
  const daysP=Math.floor((today-lmp)/86400000);
  const weeks=Math.floor(daysP/7), days=daysP%7;
  document.getElementById('out').textContent='Estimated due date: '+due.toLocaleDateString(undefined,{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  document.getElementById('weeks').textContent='About '+weeks+' weeks '+days+' days since LMP (estimate).';
};
</script>`,
    },
    {
      path: "/kg-to-lbs-converter.html",
      file: "kg-to-lbs-converter.html",
      category: "calculators",
      title: "KG to LBS Converter — Kilograms to Pounds",
      desc: "Convert kilograms to pounds and pounds to kg instantly. Free weight converter for gym, shipping, and recipes.",
      card: "KG to lbs",
      cardDesc: "Kilograms ↔ pounds.",
      body: `<h1>KG to lbs converter</h1>${ad}
<div class="tool-panel">
<label for="kg">Kilograms (kg)</label><input id="kg" type="number" step="0.01" value="70" />
<label for="lbs">Pounds (lbs)</label><input id="lbs" type="number" step="0.01" />
<p class="prose" style="font-size:0.85rem">1 kg = 2.2046226218 lbs</p>
</div>
<script>
const kg=document.getElementById('kg'), lbs=document.getElementById('lbs');
let lock=false;
function fromKg(){ if(lock) return; lock=true; lbs.value=kg.value? (kg.value*2.2046226218).toFixed(4):''; lock=false; }
function fromLbs(){ if(lock) return; lock=true; kg.value=lbs.value? (lbs.value/2.2046226218).toFixed(4):''; lock=false; }
kg.oninput=fromKg; lbs.oninput=fromLbs; fromKg();
</script>`,
    },
    {
      path: "/cm-to-feet-converter.html",
      file: "cm-to-feet-converter.html",
      category: "calculators",
      title: "CM to Feet & Inches Converter — Height Calculator",
      desc: "Convert centimeters to feet and inches (and back). Free height converter for body measurements and travel.",
      card: "CM to feet",
      cardDesc: "Height cm ↔ ft/in.",
      body: `<h1>CM to feet & inches</h1>${ad}
<div class="tool-panel">
<label for="cm">Centimeters</label><input id="cm" type="number" step="0.1" value="170" />
<label for="ftin">Feet and inches</label><input id="ftin" type="text" placeholder="5 ft 7 in" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="ok"></p>
</div>
<script>
function cmToFtIn(cm){
  const totalIn=cm/2.54; const ft=Math.floor(totalIn/12); const inch=Math.round(totalIn-ft*12);
  return { ft, inch: inch===12?0:inch, ftAdj: inch===12?ft+1:ft };
}
document.getElementById('go').onclick=()=>{
  const cm=+document.getElementById('cm').value;
  if(!cm) return;
  const r=cmToFtIn(cm);
  document.getElementById('ftin').value=r.ftAdj+"' "+r.inch+'"';
  document.getElementById('out').textContent=cm+' cm ≈ '+r.ftAdj+' feet '+r.inch+' inches';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/celsius-to-fahrenheit.html",
      file: "celsius-to-fahrenheit.html",
      category: "calculators",
      title: "Celsius to Fahrenheit Converter — °C to °F Online",
      desc: "Convert Celsius to Fahrenheit and Fahrenheit to Celsius. Free temperature converter with live sync.",
      card: "°C ↔ °F",
      cardDesc: "Temperature converter.",
      body: `<h1>Celsius ↔ Fahrenheit</h1>${ad}
<div class="tool-panel">
<label for="c">Celsius (°C)</label><input id="c" type="number" step="0.1" value="37" />
<label for="f">Fahrenheit (°F)</label><input id="f" type="number" step="0.1" />
</div>
<script>
const c=document.getElementById('c'), f=document.getElementById('f'); let l=false;
c.oninput=()=>{ if(l) return; l=true; f.value=c.value!==''? (c.value*9/5+32).toFixed(2):''; l=false; };
f.oninput=()=>{ if(l) return; l=true; c.value=f.value!==''? ((f.value-32)*5/9).toFixed(2):''; l=false; };
c.oninput(); c.dispatchEvent(new Event('input'));
</script>`,
    },
    {
      path: "/what-is-my-ip.html",
      file: "what-is-my-ip.html",
      category: "developer",
      title: "What Is My IP Address? — Public IP Lookup",
      desc: "See your public IPv4 address from the browser. Uses a read-only IP API—no install.",
      card: "What is my IP",
      cardDesc: "Public IPv4 lookup.",
      body: `<h1>What is my IP?</h1>${ad}
<div class="tool-panel">
<button type="button" class="primary" id="go">Show my public IP</button>
<p id="ip" class="ok" style="font-size:1.2rem;font-family:monospace"></p>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<button type="button" class="primary rs-secondary" id="copy" hidden>Copy IP</button>
</div>
<script>
document.getElementById('go').onclick=async()=>{
  const st=document.getElementById('status');
  st.textContent='Looking up…';
  try{
    const r=await fetch('https://api.ipify.org?format=json');
    const j=await r.json();
    document.getElementById('ip').textContent=j.ip||'Unknown';
    document.getElementById('copy').hidden=false;
    st.textContent='IPv4 from ipify.org (your ISP address as seen on the internet).';
  }catch(e){ st.className='error'; st.textContent='Could not fetch IP. Check network or ad blockers.'; }
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('ip').textContent);
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/keyword-density-checker.html",
      file: "keyword-density-checker.html",
      category: "seo",
      title: "Keyword Density Checker — SEO Word Frequency",
      desc: "Analyze keyword density and top terms in your text. Free SEO content checker in the browser.",
      card: "Keyword density",
      cardDesc: "Top terms & % in text.",
      body: `<h1>Keyword density checker</h1>${ad}
<div class="tool-panel">
<label for="text">Paste page copy or article</label><textarea id="text" rows="10" placeholder="Paste content to analyze word frequency…"></textarea>
<button type="button" class="primary" id="go">Analyze</button>
<p id="meta" class="prose"></p>
<table class="prose" id="tbl" style="width:100%;border-collapse:collapse;font-size:0.9rem"></table>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const raw=document.getElementById('text').value.toLowerCase();
  const words=(raw.match(/[a-z0-9']{2,}/g)||[]);
  const n=words.length;
  const map=new Map();
  for(const w of words){ map.set(w,(map.get(w)||0)+1); }
  const stop=new Set('the and for that with this from your have are was not but can will our you all any out about into than them they been their more also just like when what how who get has its new one two use using online free tool tools'.split(' '));
  const list=[...map.entries()].filter(([w])=>!stop.has(w)).sort((a,b)=>b[1]-a[1]).slice(0,25);
  document.getElementById('meta').textContent=n+' words counted (2+ letter tokens).';
  document.getElementById('tbl').innerHTML='<tr><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px">Keyword</th><th style="border-bottom:1px solid #ccc;padding:6px">Count</th><th style="border-bottom:1px solid #ccc;padding:6px">Density</th></tr>'
    +list.map(([w,c])=>'<tr><td style="padding:6px;border-bottom:1px solid #eee">'+w+'</td><td style="padding:6px;border-bottom:1px solid #eee">'+c+'</td><td style="padding:6px;border-bottom:1px solid #eee">'+(100*c/n).toFixed(2)+'%</td></tr>').join('');
};
</script>`,
    },
    {
      path: "/gpa-calculator.html",
      file: "gpa-calculator.html",
      category: "student",
      title: "GPA Calculator — 4.0 Scale Grade Point Average",
      desc: "Calculate semester or cumulative GPA on a 4.0 scale. Free GPA calculator for students—add courses and credits.",
      card: "GPA calculator",
      cardDesc: "4.0 scale GPA.",
      body: `<h1>GPA calculator (4.0 scale)</h1>${ad}
<div class="tool-panel">
<div id="courses">
<div class="job-block"><label>Grade points (0–4)</label><input type="number" step="0.01" min="0" max="4" value="4" data-g /><label>Credits</label><input type="number" step="1" min="1" value="3" data-c /></div>
</div>
<button type="button" class="primary rs-secondary" id="add">+ Add course</button>
<button type="button" class="primary" id="go">Calculate GPA</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('add').onclick=()=>{
  const d=document.createElement('div'); d.className='job-block';
  d.innerHTML='<label>Grade points (0–4)</label><input type="number" step="0.01" min="0" max="4" value="3" data-g /><label>Credits</label><input type="number" step="1" min="1" value="3" data-c /><button type="button" class="rs-link-btn" data-r>Remove</button>';
  d.querySelector('[data-r]').onclick=()=>d.remove();
  document.getElementById('courses').appendChild(d);
};
document.getElementById('go').onclick=()=>{
  let pts=0, cr=0;
  document.querySelectorAll('#courses .job-block').forEach(b=>{
    const g=+b.querySelector('[data-g]').value, c=+b.querySelector('[data-c]').value;
    if(c>0){ pts+=g*c; cr+=c; }
  });
  document.getElementById('out').textContent=cr?('GPA: '+(pts/cr).toFixed(3)+' ('+cr+' credits)'):'Add at least one course.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/retirement-calculator.html",
      file: "retirement-calculator.html",
      category: "calculators",
      title: "Retirement Savings Calculator — Future Nest Egg",
      desc: "Estimate retirement savings from monthly contributions, return rate, and years to retire. Free compound growth calculator.",
      card: "Retirement calculator",
      cardDesc: "Monthly save → FV.",
      body: `<h1>Retirement savings calculator</h1>${ad}
<div class="tool-panel">
<label for="bal">Current savings ($)</label><input id="bal" type="number" value="10000" />
<label for="mo">Monthly contribution ($)</label><input id="mo" type="number" value="500" />
<label for="y">Years until retirement</label><input id="y" type="number" value="25" />
<label for="r">Expected annual return (%)</label><input id="r" type="number" step="0.1" value="7" />
<button type="button" class="primary" id="go">Estimate</button>
<div class="stats" id="stats"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let fv=+document.getElementById('bal').value;
  const pmt=+document.getElementById('mo').value;
  const years=+document.getElementById('y').value;
  const r=+document.getElementById('r').value/100/12;
  const n=years*12;
  for(let i=0;i<n;i++) fv=(fv+pmt)*(1+r);
  const fmt=n=>'$'+Math.round(n).toLocaleString('en-US');
  document.getElementById('stats').innerHTML='<div class="stat"><strong>'+fmt(fv)+'</strong>Estimated balance</div><div class="stat"><strong>'+fmt(pmt*n)+'</strong>Total contributed</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/macro-calculator.html",
      file: "macro-calculator.html",
      category: "calculators",
      title: "Macro Calculator — Protein, Carbs & Fat from Calories",
      desc: "Split daily calories into protein, carbohydrates, and fat grams. Free macro calculator for meal planning.",
      card: "Macro calculator",
      cardDesc: "Protein · carbs · fat g.",
      body: `<h1>Macro calculator</h1>${ad}
<div class="tool-panel">
<label for="cal">Daily calories</label><input id="cal" type="number" value="2000" />
<label for="p">Protein %</label><input id="p" type="number" value="30" />
<label for="c">Carbs %</label><input id="c" type="number" value="40" />
<label for="f">Fat %</label><input id="f" type="number" value="30" />
<button type="button" class="primary" id="go">Calculate macros</button>
<div class="stats" id="stats"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const cal=+document.getElementById('cal').value;
  let pp=+document.getElementById('p').value, cp=+document.getElementById('c').value, fp=+document.getElementById('f').value;
  const sum=pp+cp+fp||1; pp=pp/sum*100; cp=cp/sum*100; fp=fp/sum*100;
  const pg=Math.round(cal*pp/100/4), cg=Math.round(cal*cp/100/4), fg=Math.round(cal*fp/100/9);
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+pg+'g</strong>Protein ('+pp.toFixed(0)+'%)</div>'
    +'<div class="stat"><strong>'+cg+'g</strong>Carbs ('+cp.toFixed(0)+'%)</div>'
    +'<div class="stat"><strong>'+fg+'g</strong>Fat ('+fp.toFixed(0)+'%)</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/days-until-calculator.html",
      file: "days-until-calculator.html",
      category: "productivity",
      title: "Days Until Calculator — Countdown to Any Date",
      desc: "Count days until a future date or since a past date. Free countdown calculator for events and deadlines.",
      card: "Days until date",
      cardDesc: "Countdown calculator.",
      body: `<h1>Days until calculator</h1>${ad}
<div class="tool-panel">
<label for="d">Target date</label><input id="d" type="date" />
<button type="button" class="primary" id="go">Count days</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=document.getElementById('d').value; if(!v) return;
  const t=new Date(v+'T12:00:00');
  const today=new Date(); today.setHours(12,0,0,0);
  const days=Math.round((t-today)/86400000);
  document.getElementById('out').textContent=days===0?'That date is today.': days>0?days+' days until '+t.toLocaleDateString():Math.abs(days)+' days since '+t.toLocaleDateString();
};
</script>`,
    },
    {
      path: "/ideal-weight-calculator.html",
      file: "ideal-weight-calculator.html",
      category: "calculators",
      title: "Ideal Weight Calculator — Healthy Weight Range by Height",
      desc: "Estimate ideal body weight from height using Robinson formula. Compare with BMI—illustration only.",
      card: "Ideal weight",
      cardDesc: "Weight range by height.",
      body: `<h1>Ideal weight calculator</h1>${ad}
<div class="tool-panel">
<label for="sex">Sex</label><select id="sex"><option value="m">Male</option><option value="f">Female</option></select>
<label for="cm">Height (cm)</label><input id="cm" type="number" value="170" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const cm=+document.getElementById('cm').value;
  const male=document.getElementById('sex').value==='m';
  const inch=cm/2.54;
  const over=Math.max(0, inch-60);
  const kg=male? 52+1.9*over : 49+1.7*over;
  document.getElementById('out').textContent='Robinson ideal ≈ '+kg.toFixed(1)+' kg ('+(kg*2.20462).toFixed(1)+' lbs). Healthy range often ±10%.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/split-pdf.html",
      file: "split-pdf.html",
      category: "documents",
      title: "Split PDF — Extract Pages Online",
      desc: "Extract a page range from a PDF in your browser. Private split with pdf-lib—no upload to our servers.",
      card: "Split PDF",
      cardDesc: "Extract page range.",
      body: `<h1>Split PDF (extract pages)</h1>${ad}
<div class="tool-panel">
<label for="file">PDF file</label><input id="file" type="file" accept="application/pdf" />
<label for="from">From page</label><input id="from" type="number" min="1" value="1" />
<label for="to">To page</label><input id="to" type="number" min="1" value="1" />
<button type="button" class="primary" id="go" disabled>Split &amp; download</button>
<p id="msg" class="prose"></p>
</div>
<script type="module">
const f=document.getElementById('file'), btn=document.getElementById('go');
f.onchange=()=>{ btn.disabled=!f.files.length; };
btn.onclick=async()=>{
  const { PDFDocument }=await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
  const bytes=await f.files[0].arrayBuffer();
  const src=await PDFDocument.load(bytes);
  const total=src.getPageCount();
  let a=Math.max(1,+document.getElementById('from').value);
  let b=Math.min(total,+document.getElementById('to').value);
  if(a>b) [a,b]=[b,a];
  const out=await PDFDocument.create();
  const idx=[...Array(b-a+1)].map((_,i)=>a-1+i);
  const pages=await out.copyPages(src, idx);
  pages.forEach(p=>out.addPage(p));
  const saved=await out.save();
  const dl=document.createElement('a');
  dl.href=URL.createObjectURL(new Blob([saved],{type:'application/pdf'}));
  dl.download='split-pages-'+a+'-'+b+'.pdf';
  dl.click();
  document.getElementById('msg').className='ok';
  document.getElementById('msg').textContent='Saved pages '+a+'–'+b+' of '+total+'.';
};
</script>`,
    },
  ];
}
