/** Sixth batch — everyday useful tools. */
export function batch6Tools(ad) {
  return [
    {
      path: "/stopwatch.html",
      file: "stopwatch.html",
      category: "productivity",
      title: "Stopwatch — Online Lap Timer",
      desc: "Free stopwatch with lap times in your browser.",
      card: "Stopwatch",
      cardDesc: "Lap timer in browser.",
      body: `
<h1>Stopwatch</h1>${ad}
<div class="tool-panel">
  <p id="clock" style="font-size:2.5rem;font-weight:800;text-align:center">00:00.0</p>
  <div class="row">
    <button type="button" class="primary" id="start">Start</button>
    <button type="button" class="primary" id="lap">Lap</button>
    <button type="button" class="primary" id="reset">Reset</button>
  </div>
  <ul id="laps"></ul>
</div>
<script>
let t0=0, running=false, id=null, laps=[];
function ms(){ return running?performance.now()-t0:0; }
function fmt(x){
  const s=Math.floor(x/1000), m=Math.floor(s/60), r=s%60, d=Math.floor((x%1000)/100);
  return String(m).padStart(2,'0')+':'+String(r).padStart(2,'0')+'.'+d;
}
function tick(){ document.getElementById('clock').textContent=fmt(ms()); }
document.getElementById('start').onclick=()=>{
  if(!running){ t0=performance.now()-ms(); running=true; id=setInterval(tick,100); tick(); }
  else{ running=false; clearInterval(id); }
  document.getElementById('start').textContent=running?'Pause':'Start';
};
document.getElementById('lap').onclick=()=>{
  if(!running) return;
  laps.unshift(fmt(ms()));
  document.getElementById('laps').innerHTML=laps.map(x=>'<li>'+x+'</li>').join('');
};
document.getElementById('reset').onclick=()=>{
  running=false; clearInterval(id); t0=0; laps=[]; document.getElementById('laps').innerHTML='';
  document.getElementById('start').textContent='Start'; document.getElementById('clock').textContent='00:00.0';
};
</script>`,
    },
    {
      path: "/bytes-converter.html",
      file: "bytes-converter.html",
      category: "developer",
      title: "Bytes Converter — KB, MB, GB",
      desc: "Convert data sizes between bytes, KB, MB, GB, and TB.",
      card: "Bytes converter",
      cardDesc: "KB, MB, GB sizes.",
      body: `
<h1>Bytes converter</h1>${ad}
<div class="tool-panel">
  <label for="n">Value</label><input id="n" type="number" value="1048576" />
  <label for="from">From</label>
  <select id="from"><option value="1">Bytes</option><option value="1024">KB</option><option value="1048576" selected>MB</option><option value="1073741824">GB</option></select>
  <label for="to">To</label>
  <select id="to"><option value="1024">KB</option><option value="1048576">MB</option><option value="1073741824" selected>GB</option><option value="1099511627776">TB</option></select>
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=Number(document.getElementById('n').value);
  const from=Number(document.getElementById('from').value), to=Number(document.getElementById('to').value);
  const bytes=v*from;
  document.getElementById('out').textContent=(bytes/to).toLocaleString(undefined,{maximumFractionDigits:6});
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/utm-builder.html",
      file: "utm-builder.html",
      category: "seo",
      title: "UTM Link Builder — Campaign URL Parameters",
      desc: "Build URLs with utm_source, utm_medium, utm_campaign for analytics.",
      card: "UTM builder",
      cardDesc: "Campaign tracking URLs.",
      body: `
<h1>UTM link builder</h1>${ad}
<div class="tool-panel">
  <label for="url">Page URL</label><input id="url" type="url" value="https://sahankit.github.io/" />
  <label for="src">utm_source</label><input id="src" placeholder="newsletter" />
  <label for="med">utm_medium</label><input id="med" placeholder="email" />
  <label for="camp">utm_campaign</label><input id="camp" placeholder="launch" />
  <button type="button" class="primary" id="go">Build</button>
  <textarea id="out" rows="3" readonly></textarea>
  <button type="button" class="primary" id="copy">Copy</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  try{
    const u=new URL(document.getElementById('url').value);
    const add=(k,v)=>{ if(v) u.searchParams.set(k,v); };
    add('utm_source',document.getElementById('src').value.trim());
    add('utm_medium',document.getElementById('med').value.trim());
    add('utm_campaign',document.getElementById('camp').value.trim());
    document.getElementById('out').value=u.toString();
  }catch(e){ document.getElementById('out').value='Invalid base URL'; }
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/whatsapp-link.html",
      file: "whatsapp-link.html",
      category: "india",
      title: "WhatsApp Click-to-Chat Link Generator",
      desc: "Create wa.me links with phone number and prefilled message.",
      card: "WhatsApp link",
      cardDesc: "wa.me chat links.",
      body: `
<h1>WhatsApp link generator</h1>${ad}
<div class="tool-panel">
  <label for="phone">Phone (country code, no +)</label><input id="phone" inputmode="numeric" placeholder="919876543210" />
  <label for="msg">Prefilled message</label><textarea id="msg" rows="3">Hello!</textarea>
  <button type="button" class="primary" id="go">Generate</button>
  <input id="out" type="url" readonly />
  <a id="open" href="#" target="_blank" rel="noopener">Open link</a>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=document.getElementById('phone').value.replace(/\\D/g,'');
  const text=encodeURIComponent(document.getElementById('msg').value);
  const link='https://wa.me/'+p+(text?'?text='+text:'');
  document.getElementById('out').value=link;
  document.getElementById('open').href=link;
};
</script>`,
    },
    {
      path: "/random-picker.html",
      file: "random-picker.html",
      category: "productivity",
      title: "Random Name Picker — Choose from a List",
      desc: "Pick a random winner or option from a list of names.",
      card: "Random picker",
      cardDesc: "Pick from a list.",
      body: `
<h1>Random picker</h1>${ad}
<div class="tool-panel">
  <label for="list">One name or option per line</label>
  <textarea id="list">Alice
Bob
Carol</textarea>
  <button type="button" class="primary" id="go">Pick random</button>
  <p id="out" class="ok" style="font-size:1.5rem"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const items=document.getElementById('list').value.split(/\\n/).map(s=>s.trim()).filter(Boolean);
  if(!items.length){ document.getElementById('out').textContent='Add at least one line'; return; }
  document.getElementById('out').textContent=items[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0]/4294967296*items.length)];
};
</script>`,
    },
    {
      path: "/text-diff.html",
      file: "text-diff.html",
      category: "writing",
      title: "Text Diff — Compare Two Texts",
      desc: "Line-by-line diff of two text blocks.",
      card: "Text diff",
      cardDesc: "Compare two texts.",
      body: `
<h1>Text diff</h1>${ad}
<div class="tool-panel">
  <label for="a">Text A</label><textarea id="a" rows="6"></textarea>
  <label for="b">Text B</label><textarea id="b" rows="6"></textarea>
  <button type="button" class="primary" id="go">Compare</button>
  <pre id="out" style="white-space:pre-wrap;background:#faf7ff;padding:12px;border-radius:10px"></pre>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const A=document.getElementById('a').value.split(/\\n/), B=document.getElementById('b').value.split(/\\n/);
  const n=Math.max(A.length,B.length); const lines=[];
  for(let i=0;i<n;i++){
    const a=A[i]??'', b=B[i]??'';
    if(a===b) lines.push('  '+a);
    else{ if(a) lines.push('- '+a); if(b) lines.push('+ '+b); }
  }
  document.getElementById('out').textContent=lines.join('\\n')||'(identical)';
};
</script>`,
    },
    {
      path: "/standard-deviation.html",
      file: "standard-deviation.html",
      category: "calculators",
      title: "Standard Deviation Calculator",
      desc: "Calculate sample standard deviation and variance from a list of numbers.",
      card: "Std deviation",
      cardDesc: "SD & variance.",
      body: `
<h1>Standard deviation</h1>${ad}
<div class="tool-panel">
  <textarea id="nums">2, 4, 4, 4, 5, 5, 7, 9</textarea>
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const a=document.getElementById('nums').value.split(/[\\s,]+/).map(Number).filter(n=>Number.isFinite(n));
  if(a.length<2){ document.getElementById('out').textContent='Need 2+ numbers'; return; }
  const mean=a.reduce((x,y)=>x+y,0)/a.length;
  const varSample=a.reduce((s,x)=>s+(x-mean)**2,0)/(a.length-1);
  document.getElementById('out').textContent='Mean '+mean.toFixed(4)+' · SD '+Math.sqrt(varSample).toFixed(4)+' · Variance '+varSample.toFixed(4);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/median-calculator.html",
      file: "median-calculator.html",
      category: "calculators",
      title: "Median Calculator — Middle Value",
      desc: "Find the median of a list of numbers.",
      card: "Median calculator",
      cardDesc: "Middle value.",
      body: `
<h1>Median calculator</h1>${ad}
<div class="tool-panel">
  <textarea id="nums">3, 1, 4, 1, 5, 9, 2, 6</textarea>
  <button type="button" class="primary" id="go">Median</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const a=document.getElementById('nums').value.split(/[\\s,]+/).map(Number).filter(n=>Number.isFinite(n)).sort((x,y)=>x-y);
  if(!a.length){ document.getElementById('out').textContent='Enter numbers'; return; }
  const mid=Math.floor(a.length/2);
  const med=a.length%2?a[mid]:(a[mid-1]+a[mid])/2;
  document.getElementById('out').textContent='Median: '+med;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/exchange-rate.html",
      file: "exchange-rate.html",
      category: "calculators",
      title: "Currency Converter — Custom Exchange Rate",
      desc: "Convert amounts using your own exchange rate (no live forex API).",
      card: "Exchange rate",
      cardDesc: "Convert with your rate.",
      body: `
<h1>Currency converter (custom rate)</h1>${ad}
<div class="tool-panel">
  <label for="amt">Amount</label><input id="amt" type="number" value="100" />
  <label for="rate">1 unit A = how many B?</label><input id="rate" type="number" step="0.0001" value="83.25" />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
  <p class="prose" style="font-size:0.85rem">Enter the rate from your bank or search—live rates are not fetched.</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const a=Number(document.getElementById('amt').value), r=Number(document.getElementById('rate').value);
  document.getElementById('out').textContent=(a*r).toLocaleString(undefined,{maximumFractionDigits:4});
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/work-days.html",
      file: "work-days.html",
      category: "calculators",
      title: "Work Days Calculator — Business Days Between Dates",
      desc: "Count weekdays (Mon–Fri) between two dates.",
      card: "Work days",
      cardDesc: "Weekdays between dates.",
      body: `
<h1>Work days calculator</h1>${ad}
<div class="tool-panel">
  <label for="a">Start</label><input id="a" type="date" />
  <label for="b">End</label><input id="b" type="date" />
  <button type="button" class="primary" id="go">Count</button>
  <p id="out" class="ok"></p>
</div>
<script>
const t=new Date().toISOString().slice(0,10);
document.getElementById('a').value=t; document.getElementById('b').value=t;
document.getElementById('go').onclick=()=>{
  let a=new Date(document.getElementById('a').value+'T00:00:00');
  let b=new Date(document.getElementById('b').value+'T00:00:00');
  if(b<a){ const s=a; a=b; b=s; }
  let n=0;
  for(const d=new Date(a); d<=b; d.setDate(d.getDate()+1)){
    const w=d.getDay(); if(w!==0&&w!==6) n++;
  }
  document.getElementById('out').textContent=n+' work day(s)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/running-pace.html",
      file: "running-pace.html",
      category: "calculators",
      title: "Running Pace Calculator — Min per km",
      desc: "Calculate pace from distance and time.",
      card: "Running pace",
      cardDesc: "Pace min/km.",
      body: `
<h1>Running pace calculator</h1>${ad}
<div class="tool-panel">
  <label for="km">Distance (km)</label><input id="km" type="number" step="0.01" value="5" />
  <label for="min">Time (minutes)</label><input id="min" type="number" step="0.1" value="28" />
  <button type="button" class="primary" id="go">Pace</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const km=Number(document.getElementById('km').value), min=Number(document.getElementById('min').value);
  if(!km) return;
  const pace=min/km, m=Math.floor(pace), s=Math.round((pace-m)*60);
  document.getElementById('out').textContent=m+':'+String(s).padStart(2,'0')+' min/km · '+(km/min*60).toFixed(2)+' km/h';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/vcard-generator.html",
      file: "vcard-generator.html",
      category: "productivity",
      title: "vCard Generator — Contact Card Text",
      desc: "Generate a vCard 3.0 string for contacts.",
      card: "vCard generator",
      cardDesc: "Downloadable contact card.",
      body: `
<h1>vCard generator</h1>${ad}
<div class="tool-panel">
  <label for="name">Full name</label><input id="name" value="Ada Lovelace" />
  <label for="org">Organization</label><input id="org" value="Example Co" />
  <label for="phone">Phone</label><input id="phone" value="+1-555-0100" />
  <label for="email">Email</label><input id="email" type="email" value="ada@example.com" />
  <button type="button" class="primary" id="go">Generate</button>
  <textarea id="out" rows="8" readonly></textarea>
  <button type="button" class="primary" id="dl">Download .vcf</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const n=document.getElementById('name').value.split(' ');
  const fn=n[0]||'', ln=n.slice(1).join(' ')||'';
  const v=['BEGIN:VCARD','VERSION:3.0','FN:'+document.getElementById('name').value,'N:'+ln+';'+fn+';;;',
    'ORG:'+document.getElementById('org').value,'TEL:'+document.getElementById('phone').value,
    'EMAIL:'+document.getElementById('email').value,'END:VCARD'].join('\\n');
  document.getElementById('out').value=v;
};
document.getElementById('dl').onclick=()=>{
  document.getElementById('go').click();
  const b=new Blob([document.getElementById('out').value],{type:'text/vcard'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='contact.vcf'; a.click();
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/yaml-to-json.html",
      file: "yaml-to-json.html",
      category: "developer",
      title: "YAML to JSON Converter",
      desc: "Convert YAML to JSON in the browser.",
      card: "YAML → JSON",
      cardDesc: "Parse YAML locally.",
      body: `
<h1>YAML to JSON</h1>${ad}
<div class="tool-panel">
  <textarea id="yaml" rows="8" spellcheck="false">name: Sahankit
tools: 88
online: true</textarea>
  <button type="button" class="primary" id="go">Convert</button>
  <textarea id="json" rows="10" readonly spellcheck="false"></textarea>
</div>
<script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>
<script>
document.getElementById('go').onclick=()=>{
  try{
    const obj=jsyaml.load(document.getElementById('yaml').value);
    document.getElementById('json').value=JSON.stringify(obj,null,2);
  }catch(e){ document.getElementById('json').value='Error: '+e.message; }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/xml-formatter.html",
      file: "xml-formatter.html",
      category: "developer",
      title: "XML Formatter — Pretty Print XML",
      desc: "Format and indent XML in the browser.",
      card: "XML formatter",
      cardDesc: "Pretty-print XML.",
      body: `
<h1>XML formatter</h1>${ad}
<div class="tool-panel">
  <textarea id="xml" rows="8" spellcheck="false"><root><item id="1">Hello</item></root></textarea>
  <button type="button" class="primary" id="go">Format</button>
  <textarea id="out" rows="10" readonly spellcheck="false"></textarea>
  <p id="err" class="error" hidden></p>
</div>
<script>
function fmt(node, indent){
  if(node.nodeType===3) return node.textContent.trim()?indent+node.textContent.trim()+'\\n':'';
  if(node.nodeType!==1) return '';
  let s=indent+'<'+node.nodeName;
  for(const a of node.attributes||[]) s+=' '+a.name+'="'+a.value+'"';
  const kids=[...node.childNodes].filter(n=>n.nodeType!==3||n.textContent.trim());
  if(!kids.length) return s+'/>\\n';
  s+='>\\n';
  for(const k of kids) s+=fmt(k, indent+'  ');
  return s+indent+'</'+node.nodeName+'>\\n';
}
document.getElementById('go').onclick=()=>{
  const err=document.getElementById('err'); err.hidden=true;
  try{
    const doc=new DOMParser().parseFromString(document.getElementById('xml').value,'application/xml');
    if(doc.querySelector('parsererror')) throw new Error('Invalid XML');
    document.getElementById('out').value=fmt(doc.documentElement,'');
  }catch(e){ err.textContent=e.message; err.hidden=false; }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/unicode-character.html",
      file: "unicode-character.html",
      category: "developer",
      title: "Unicode Code Point — Character Info",
      desc: "Get Unicode code point and UTF-8 hex for a character.",
      card: "Unicode lookup",
      cardDesc: "Code point & UTF-8.",
      body: `
<h1>Unicode character lookup</h1>${ad}
<div class="tool-panel">
  <label for="ch">Character</label><input id="ch" maxlength="2" value="A" />
  <button type="button" class="primary" id="go">Lookup</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const str=document.getElementById('ch').value;
  const chars=[...str];
  if(!chars.length) return;
  const cp=str.codePointAt(0);
  const bytes=new TextEncoder().encode(chars[0]);
  document.getElementById('out').textContent='U+'+cp.toString(16).toUpperCase().padStart(4,'0')+' · UTF-8 '+[...bytes].map(b=>b.toString(16).padStart(2,'0')).join(' ');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/nato-alphabet.html",
      file: "nato-alphabet.html",
      category: "writing",
      title: "NATO Phonetic Alphabet Converter",
      desc: "Spell words with Alpha, Bravo, Charlie phonetic alphabet.",
      card: "NATO alphabet",
      cardDesc: "Phonetic spelling.",
      body: `
<h1>NATO phonetic alphabet</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label><input id="text" value="hello" />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
const N={A:'Alpha',B:'Bravo',C:'Charlie',D:'Delta',E:'Echo',F:'Foxtrot',G:'Golf',H:'Hotel',I:'India',J:'Juliet',K:'Kilo',L:'Lima',M:'Mike',N:'November',O:'Oscar',P:'Papa',Q:'Quebec',R:'Romeo',S:'Sierra',T:'Tango',U:'Uniform',V:'Victor',W:'Whiskey',X:'X-ray',Y:'Yankee',Z:'Zulu','0':'Zero','1':'One','2':'Two','3':'Three','4':'Four','5':'Five','6':'Six','7':'Seven','8':'Eight','9':'Nine'};
document.getElementById('go').onclick=()=>{
  const s=document.getElementById('text').value.toUpperCase();
  document.getElementById('out').textContent=[...s].map(c=>N[c]||c).join(' ');
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
