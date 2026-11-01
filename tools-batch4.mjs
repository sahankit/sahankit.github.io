/** Fourth batch of tools. */
export function batch4Tools(ad) {
  return [
    {
      path: "/number-base-converter.html",
      file: "number-base-converter.html",
      category: "developer",
      title: "Number Base Converter — Binary, Hex, Decimal",
      desc: "Convert numbers between decimal, binary, and hexadecimal.",
      card: "Base converter",
      cardDesc: "Dec, bin, hex.",
      body: `
<h1>Number base converter</h1>${ad}
<div class="tool-panel">
  <label for="dec">Decimal</label><input id="dec" inputmode="numeric" value="255" />
  <label for="bin">Binary</label><input id="bin" spellcheck="false" />
  <label for="hex">Hexadecimal</label><input id="hex" spellcheck="false" />
  <p class="prose" style="font-size:0.85rem">Edit any field; others update.</p>
</div>
<script>
let lock=false;
function fromDec(n){
  if(!Number.isFinite(n)||n<0) return;
  lock=true;
  document.getElementById('bin').value=n.toString(2);
  document.getElementById('hex').value=n.toString(16).toUpperCase();
  lock=false;
}
document.getElementById('dec').oninput=()=>{ if(lock) return; fromDec(Number(document.getElementById('dec').value)); };
document.getElementById('bin').oninput=()=>{ if(lock) return; const n=parseInt(document.getElementById('bin').value.replace(/\\s/g,''),2); if(!isNaN(n)){ lock=true; document.getElementById('dec').value=n; document.getElementById('hex').value=n.toString(16).toUpperCase(); lock=false; } };
document.getElementById('hex').oninput=()=>{ if(lock) return; const n=parseInt(document.getElementById('hex').value,16); if(!isNaN(n)){ lock=true; document.getElementById('dec').value=n; document.getElementById('bin').value=n.toString(2); lock=false; } };
fromDec(255);
</script>`,
    },
    {
      path: "/days-between-dates.html",
      file: "days-between-dates.html",
      category: "calculators",
      title: "Days Between Dates Calculator",
      desc: "Count days between two calendar dates.",
      card: "Days between dates",
      cardDesc: "Date difference in days.",
      body: `
<h1>Days between dates</h1>${ad}
<div class="tool-panel">
  <label for="a">Start</label><input id="a" type="date" />
  <label for="b">End</label><input id="b" type="date" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
const t=new Date().toISOString().slice(0,10);
document.getElementById('a').value=t;
document.getElementById('b').value=t;
document.getElementById('go').onclick=()=>{
  const a=new Date(document.getElementById('a').value+'T00:00:00');
  const b=new Date(document.getElementById('b').value+'T00:00:00');
  const days=Math.round((b-a)/864e5);
  document.getElementById('out').textContent=days+' day(s)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/simple-interest.html",
      file: "simple-interest.html",
      category: "calculators",
      title: "Simple Interest Calculator",
      desc: "Calculate simple interest from principal, rate, and time in years.",
      card: "Simple interest",
      cardDesc: "I = P×R×T.",
      body: `
<h1>Simple interest calculator</h1>${ad}
<div class="tool-panel">
  <label for="p">Principal</label><input id="p" type="number" value="10000" />
  <label for="r">Rate (% per year)</label><input id="r" type="number" step="0.1" value="8" />
  <label for="t">Time (years)</label><input id="t" type="number" step="0.1" value="2" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=Number(document.getElementById('p').value), R=Number(document.getElementById('r').value)/100, T=Number(document.getElementById('t').value);
  const I=P*R*T;
  document.getElementById('out').textContent='Interest '+I.toFixed(2)+' · Total '+(P+I).toFixed(2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/percentage-change.html",
      file: "percentage-change.html",
      category: "calculators",
      title: "Percentage Change Calculator",
      desc: "Find percent increase or decrease from old value to new value.",
      card: "% change",
      cardDesc: "Old → new percent.",
      body: `
<h1>Percentage change</h1>${ad}
<div class="tool-panel">
  <label for="old">Old value</label><input id="old" type="number" value="100" />
  <label for="new">New value</label><input id="new" type="number" value="120" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const o=Number(document.getElementById('old').value), n=Number(document.getElementById('new').value);
  const ch=o?((n-o)/o*100):0;
  document.getElementById('out').textContent=(ch>=0?'+':'')+ch.toFixed(2)+'% change';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/roman-numerals.html",
      file: "roman-numerals.html",
      category: "writing",
      title: "Roman Numerals Converter",
      desc: "Convert Arabic numbers to Roman numerals and back (1–3999).",
      card: "Roman numerals",
      cardDesc: "Arabic ↔ Roman.",
      body: `
<h1>Roman numerals</h1>${ad}
<div class="tool-panel">
  <label for="arabic">Arabic (1–3999)</label><input id="arabic" type="number" min="1" max="3999" value="2026" />
  <label for="roman">Roman</label><input id="roman" spellcheck="false" value="MMXXVI" />
  <button type="button" class="primary" id="toR">→ Roman</button>
  <button type="button" class="primary" id="toA">→ Arabic</button>
</div>
<script>
function toRoman(n){
  if(n<1||n>3999) return '';
  const map=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let s=''; for(const [v,sym] of map){ while(n>=v){ s+=sym; n-=v; } } return s;
}
function fromRoman(s){
  const m={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
  s=s.toUpperCase().replace(/[^IVXLCDM]/g,''); let t=0, p=0;
  for(let i=s.length-1;i>=0;i--){ const v=m[s[i]]||0; t+=v<p?-v:v; p=v; }
  return t;
}
document.getElementById('toR').onclick=()=>{
  const n=Number(document.getElementById('arabic').value);
  document.getElementById('roman').value=toRoman(n);
};
document.getElementById('toA').onclick=()=>{
  document.getElementById('arabic').value=fromRoman(document.getElementById('roman').value);
};
</script>`,
    },
    {
      path: "/slug-generator.html",
      file: "slug-generator.html",
      category: "seo",
      title: "URL Slug Generator — SEO Friendly Slugs",
      desc: "Turn a title into a lowercase hyphenated URL slug.",
      card: "Slug generator",
      cardDesc: "Title → URL slug.",
      body: `
<h1>URL slug generator</h1>${ad}
<div class="tool-panel">
  <label for="title">Title</label><input id="title" value="My Blog Post Title!" />
  <label for="slug">Slug</label><input id="slug" readonly />
  <button type="button" class="primary" id="copy">Copy slug</button>
</div>
<script>
function slug(s){
  return s.normalize('NFKD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase()
    .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80);
}
function upd(){ document.getElementById('slug').value=slug(document.getElementById('title').value); }
document.getElementById('title').oninput=upd;
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('slug').value);
upd();
</script>`,
    },
    {
      path: "/strip-html.html",
      file: "strip-html.html",
      category: "writing",
      title: "Strip HTML Tags — Text Only",
      desc: "Remove HTML tags and get plain text from markup.",
      card: "Strip HTML",
      cardDesc: "HTML → plain text.",
      body: `
<h1>Strip HTML tags</h1>${ad}
<div class="tool-panel">
  <label for="html">HTML</label><textarea id="html" rows="6"><p>Hello <strong>world</strong></p></textarea>
  <label for="text">Plain text</label><textarea id="text" rows="6" readonly></textarea>
  <button type="button" class="primary" id="go">Strip</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const d=document.createElement('div');
  d.innerHTML=document.getElementById('html').value;
  document.getElementById('text').value=d.textContent||'';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/extract-urls.html",
      file: "extract-urls.html",
      category: "developer",
      title: "Extract URLs from Text",
      desc: "Find and list http/https URLs in pasted text.",
      card: "Extract URLs",
      cardDesc: "List links in text.",
      body: `
<h1>Extract URLs</h1>${ad}
<div class="tool-panel">
  <textarea id="text" rows="8" placeholder="Paste text containing links…"></textarea>
  <button type="button" class="primary" id="go">Extract</button>
  <textarea id="out" rows="6" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const m=document.getElementById('text').value.match(/https?:\\/\\/[^\\s<>\"']+/gi)||[];
  document.getElementById('out').value=[...new Set(m)].join('\\n');
};
</script>`,
    },
    {
      path: "/csv-to-json.html",
      file: "csv-to-json.html",
      category: "developer",
      title: "CSV to JSON Converter",
      desc: "Convert simple comma-separated values to JSON arrays.",
      card: "CSV → JSON",
      cardDesc: "Simple CSV converter.",
      body: `
<h1>CSV to JSON</h1>${ad}
<div class="tool-panel">
  <label for="csv">CSV (header row)</label><textarea id="csv" rows="6">name,score
Ada,98
Bob,87</textarea>
  <button type="button" class="primary" id="go">Convert</button>
  <textarea id="json" rows="8" readonly spellcheck="false"></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const lines=document.getElementById('csv').value.trim().split(/\\n/).filter(Boolean);
  if(!lines.length) return;
  const headers=lines[0].split(',').map(h=>h.trim());
  const rows=lines.slice(1).map(line=>{
    const cells=line.split(',');
    const o={}; headers.forEach((h,i)=>o[h]= (cells[i]||'').trim()); return o;
  });
  document.getElementById('json').value=JSON.stringify(rows,null,2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/json-to-csv.html",
      file: "json-to-csv.html",
      category: "developer",
      title: "JSON to CSV Converter",
      desc: "Convert JSON array of objects to CSV text.",
      card: "JSON → CSV",
      cardDesc: "Export CSV from JSON.",
      body: `
<h1>JSON to CSV</h1>${ad}
<div class="tool-panel">
  <textarea id="json" rows="8" spellcheck="false">[{"name":"Ada","score":98},{"name":"Bob","score":87}]</textarea>
  <button type="button" class="primary" id="go">Convert</button>
  <textarea id="csv" rows="6" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  try{
    const arr=JSON.parse(document.getElementById('json').value);
    if(!Array.isArray(arr)||!arr.length) throw new Error('Need non-empty JSON array');
    const keys=[...new Set(arr.flatMap(o=>Object.keys(o)))];
    const esc=v=>('"'+String(v??'').replace(/"/g,'""')+'"');
    const lines=[keys.join(',')].concat(arr.map(o=>keys.map(k=>esc(o[k])).join(',')));
    document.getElementById('csv').value=lines.join('\\n');
  }catch(e){ document.getElementById('csv').value='Error: '+e.message; }
};
</script>`,
    },
    {
      path: "/pomodoro-timer.html",
      file: "pomodoro-timer.html",
      category: "productivity",
      title: "Pomodoro Timer — 25 Minute Focus",
      desc: "Simple Pomodoro focus timer in the browser with breaks.",
      card: "Pomodoro timer",
      cardDesc: "25 / 5 focus cycles.",
      body: `
<h1>Pomodoro timer</h1>${ad}
<div class="tool-panel">
  <p id="phase" class="ok">Focus</p>
  <p id="clock" style="font-size:2.5rem;font-weight:800;text-align:center">25:00</p>
  <div class="row">
    <button type="button" class="primary" id="start">Start</button>
    <button type="button" class="primary" id="reset">Reset</button>
  </div>
</div>
<script>
let sec=25*60, focus=true, id=null;
function render(){
  const m=String(Math.floor(sec/60)).padStart(2,'0'), s=String(sec%60).padStart(2,'0');
  document.getElementById('clock').textContent=m+':'+s;
  document.getElementById('phase').textContent=focus?'Focus':'Break';
}
document.getElementById('start').onclick=()=>{
  if(id) return;
  id=setInterval(()=>{
    sec--;
    if(sec<=0){
      focus=!focus;
      sec=focus?25*60:5*60;
    }
    render();
  },1000);
};
document.getElementById('reset').onclick=()=>{ clearInterval(id); id=null; focus=true; sec=25*60; render(); };
render();
</script>`,
    },
    {
      path: "/countdown-timer.html",
      file: "countdown-timer.html",
      category: "productivity",
      title: "Countdown Timer — Minutes & Seconds",
      desc: "Set a countdown timer and get an alert when time is up.",
      card: "Countdown timer",
      cardDesc: "Custom countdown.",
      body: `
<h1>Countdown timer</h1>${ad}
<div class="tool-panel">
  <label for="min">Minutes</label><input id="min" type="number" min="0" value="5" />
  <button type="button" class="primary" id="go">Start</button>
  <p id="out" style="font-size:2rem;font-weight:800;text-align:center">5:00</p>
</div>
<script>
let id=null, left=0;
function tick(){
  const m=Math.floor(left/60), s=left%60;
  document.getElementById('out').textContent=m+':'+String(s).padStart(2,'0');
  if(left<=0){ clearInterval(id); id=null; document.getElementById('out').textContent='Done!'; return; }
  left--;
}
document.getElementById('go').onclick=()=>{
  clearInterval(id);
  left=Math.max(0,Number(document.getElementById('min').value)||0)*60;
  tick();
  id=setInterval(tick,1000);
};
</script>`,
    },
    {
      path: "/coin-flip.html",
      file: "coin-flip.html",
      category: "productivity",
      title: "Coin Flip — Heads or Tails Online",
      desc: "Flip a virtual coin. Random heads or tails.",
      card: "Coin flip",
      cardDesc: "Heads or tails.",
      body: `
<h1>Coin flip</h1>${ad}
<div class="tool-panel">
  <button type="button" class="primary" id="go">Flip coin</button>
  <p id="out" class="ok" style="font-size:2rem"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  document.getElementById('out').textContent=crypto.getRandomValues(new Uint8Array(1))[0]&1?'Heads':'Tails';
};
</script>`,
    },
    {
      path: "/barcode-generator.html",
      file: "barcode-generator.html",
      category: "developer",
      title: "Barcode Generator — Code 128",
      desc: "Create Code 128 barcodes from text. SVG barcode generator.",
      card: "Barcode generator",
      cardDesc: "Code 128 SVG.",
      body: `
<h1>Barcode generator</h1>${ad}
<div class="tool-panel">
  <label for="txt">Text</label><input id="txt" value="123456789012" />
  <button type="button" class="primary" id="go">Generate</button>
  <svg id="bc"></svg>
</div>
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
<script>
document.getElementById('go').onclick=()=>{
  try{ JsBarcode('#bc', document.getElementById('txt').value, {format:'CODE128'}); }
  catch(e){ alert(e.message||'Invalid value'); }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/aspect-ratio.html",
      file: "aspect-ratio.html",
      category: "design",
      title: "Aspect Ratio Calculator — Resize Dimensions",
      desc: "Calculate width or height keeping aspect ratio.",
      card: "Aspect ratio",
      cardDesc: "Lock W×H ratio.",
      body: `
<h1>Aspect ratio calculator</h1>${ad}
<div class="tool-panel">
  <label for="w">Width</label><input id="w" type="number" value="1920" />
  <label for="h">Height</label><input id="h" type="number" value="1080" />
  <label for="nw">New width</label><input id="nw" type="number" value="1280" />
  <button type="button" class="primary" id="go">New height</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const w=Number(document.getElementById('w').value), h=Number(document.getElementById('h').value);
  const nw=Number(document.getElementById('nw').value);
  const nh=w?Math.round((nw*h)/w):0;
  document.getElementById('out').textContent='Height for '+nw+' px width: '+nh+' px (ratio '+(w/h).toFixed(4)+')';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/user-agent.html",
      file: "user-agent.html",
      category: "developer",
      title: "What's My User Agent?",
      desc: "Show your browser user agent string and platform info.",
      card: "User agent",
      cardDesc: "Browser UA string.",
      body: `
<h1>User agent</h1>${ad}
<div class="tool-panel">
  <p><strong>User agent</strong></p>
  <textarea id="ua" rows="4" readonly></textarea>
  <p id="meta" class="ok"></p>
</div>
<script>
document.getElementById('ua').value=navigator.userAgent;
document.getElementById('meta').textContent='Platform: '+navigator.platform+' · Language: '+navigator.language;
</script>`,
    },
  ];
}
