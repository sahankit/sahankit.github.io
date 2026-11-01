/** Seventh batch — useful everyday tools. */
export function batch7Tools(ad) {
  return [
    {
      path: "/url-parser.html",
      file: "url-parser.html",
      category: "developer",
      title: "URL Parser — Split URL Components",
      desc: "Parse a URL into protocol, host, path, and query parameters.",
      card: "URL parser",
      cardDesc: "Break down any URL.",
      body: `
<h1>URL parser</h1>${ad}
<div class="tool-panel">
  <label for="url">URL</label>
  <input id="url" type="url" value="https://sahankit.github.io/word-counter/?ref=home" />
  <button type="button" class="primary" id="go">Parse</button>
  <pre id="out"></pre>
</div>
<script>
document.getElementById('go').onclick=()=>{
  try{
    const u=new URL(document.getElementById('url').value);
    const params=[...u.searchParams.entries()].map(([k,v])=>k+'='+v).join('\\n')||'(none)';
    document.getElementById('out').textContent=
      'Protocol: '+u.protocol+'\\nHost: '+u.host+'\\nPath: '+u.pathname+'\\nHash: '+(u.hash||'(none)')+'\\nQuery params:\\n'+params;
  }catch(e){ document.getElementById('out').textContent='Invalid URL: '+e.message; }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/json-to-yaml.html",
      file: "json-to-yaml.html",
      category: "developer",
      title: "JSON to YAML Converter",
      desc: "Convert JSON to YAML in the browser.",
      card: "JSON → YAML",
      cardDesc: "Export YAML from JSON.",
      body: `
<h1>JSON to YAML</h1>${ad}
<div class="tool-panel">
  <textarea id="json" rows="8" spellcheck="false">{"name":"Sahankit","tools":104,"tags":["free","browser"]}</textarea>
  <button type="button" class="primary" id="go">Convert</button>
  <textarea id="yaml" rows="10" readonly spellcheck="false"></textarea>
</div>
<script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>
<script>
document.getElementById('go').onclick=()=>{
  try{
    const obj=JSON.parse(document.getElementById('json').value);
    document.getElementById('yaml').value=jsyaml.dump(obj,{lineWidth:120});
  }catch(e){ document.getElementById('yaml').value='Error: '+e.message; }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/mailto-link-builder.html",
      file: "mailto-link-builder.html",
      category: "productivity",
      title: "Mailto Link Builder — Email Links",
      desc: "Build mailto links with subject and body prefilled.",
      card: "Mailto builder",
      cardDesc: "Email links with subject.",
      body: `
<h1>Mailto link builder</h1>${ad}
<div class="tool-panel">
  <label for="to">To</label><input id="to" type="email" value="hello@example.com" />
  <label for="sub">Subject</label><input id="sub" value="Hello" />
  <label for="body">Body</label><textarea id="body" rows="4">Message here</textarea>
  <button type="button" class="primary" id="go">Build</button>
  <input id="out" readonly />
  <button type="button" class="primary" id="copy">Copy</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const q=new URLSearchParams();
  if(document.getElementById('sub').value) q.set('subject',document.getElementById('sub').value);
  if(document.getElementById('body').value) q.set('body',document.getElementById('body').value);
  const s=q.toString();
  document.getElementById('out').value='mailto:'+document.getElementById('to').value.trim()+(s?'?'+s:'');
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/cidr-calculator.html",
      file: "cidr-calculator.html",
      category: "developer",
      title: "CIDR Calculator — Subnet Mask & Range",
      desc: "IPv4 CIDR notation: network address, mask, and host count.",
      card: "CIDR calculator",
      cardDesc: "IPv4 subnet info.",
      body: `
<h1>CIDR calculator</h1>${ad}
<div class="tool-panel">
  <label for="cidr">IPv4 CIDR</label><input id="cidr" value="192.168.1.0/24" spellcheck="false" />
  <button type="button" class="primary" id="go">Calculate</button>
  <pre id="out"></pre>
</div>
<script>
function parseIp(s){
  const p=s.split('.').map(Number);
  if(p.length!==4||p.some(x=>x<0||x>255)) throw new Error('Invalid IPv4');
  return ((p[0]<<24)>>>0)+((p[1]<<16)>>>0)+((p[2]<<8)>>>0)+p[3];
}
function ipStr(n){ return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.'); }
document.getElementById('go').onclick=()=>{
  try{
    const [ip,prefix]=document.getElementById('cidr').value.split('/');
    const p=Number(prefix);
    if(p<0||p>32) throw new Error('Prefix must be 0–32');
    const mask=p===0?0:(0xffffffff<<(32-p))>>>0;
    const base=parseIp(ip.trim())&mask;
    const hosts=Math.max(0,2**(32-p)-2);
    document.getElementById('out').textContent='Network: '+ipStr(base)+'/'+p+'\\nMask: '+ipStr(mask)+'\\nUsable hosts (approx): '+hosts;
  }catch(e){ document.getElementById('out').textContent=e.message; }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/chmod-calculator.html",
      file: "chmod-calculator.html",
      category: "developer",
      title: "Chmod Calculator — Unix File Permissions",
      desc: "Convert between chmod numeric (755) and rwx permissions.",
      card: "Chmod calculator",
      cardDesc: "Numeric ↔ rwx.",
      body: `
<h1>Chmod calculator</h1>${ad}
<div class="tool-panel">
  <label for="num">Numeric (e.g. 755)</label><input id="num" value="755" maxlength="3" />
  <label for="rwx">Symbolic</label><input id="rwx" value="rwxr-xr-x" spellcheck="false" />
  <div class="row">
    <button type="button" class="primary" id="toRwx">Num → rwx</button>
    <button type="button" class="primary" id="toNum">rwx → num</button>
  </div>
</div>
<script>
function perm(s){
  let v=0;
  if(s.includes('r')) v+=4;
  if(s.includes('w')) v+=2;
  if(s.includes('x')) v+=1;
  return v;
}
function tri(s){ return (perm(s.slice(0,3))<<6)|(perm(s.slice(3,6))<<3)|perm(s.slice(6,9)); }
document.getElementById('toRwx').onclick=()=>{
  const n=document.getElementById('num').value.padStart(3,'0').slice(-3);
  const map=d=>['---','--x','-w-','-wx','r--','r-x','rw-','rwx'][d]||'---';
  document.getElementById('rwx').value=map(+n[0])+map(+n[1])+map(+n[2]);
};
document.getElementById('toNum').onclick=()=>{
  const s=document.getElementById('rwx').value.padEnd(9,'-').slice(0,9);
  const v=tri(s.slice(0,3))+tri(s.slice(3,6))+tri(s.slice(6,9));
  document.getElementById('num').value=String(v);
};
document.getElementById('toRwx').click();
</script>`,
    },
    {
      path: "/quadratic-solver.html",
      file: "quadratic-solver.html",
      category: "calculators",
      title: "Quadratic Equation Solver — ax² + bx + c",
      desc: "Solve quadratic equations and show discriminant.",
      card: "Quadratic solver",
      cardDesc: "Roots of ax²+bx+c.",
      body: `
<h1>Quadratic equation solver</h1>${ad}
<div class="tool-panel">
  <label>a <input id="a" type="number" value="1" style="width:4rem" /></label>
  <label>b <input id="b" type="number" value="-3" style="width:4rem" /></label>
  <label>c <input id="c" type="number" value="2" style="width:4rem" /></label>
  <button type="button" class="primary" id="go">Solve</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const a=+document.getElementById('a').value,b=+document.getElementById('b').value,c=+document.getElementById('c').value;
  if(a===0){ document.getElementById('out').textContent='a must not be 0'; return; }
  const D=b*b-4*a*c;
  if(D<0) document.getElementById('out').textContent='No real roots (D='+D+')';
  else if(D===0){ const x=-b/(2*a); document.getElementById('out').textContent='Double root x='+x; }
  else{
    const s=Math.sqrt(D);
    document.getElementById('out').textContent='x1='+((-b+s)/(2*a)).toFixed(6)+', x2='+((-b-s)/(2*a)).toFixed(6);
  }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/grade-calculator.html",
      file: "grade-calculator.html",
      category: "calculators",
      title: "Weighted Grade Calculator",
      desc: "Calculate course grade from weighted assignments.",
      card: "Grade calculator",
      cardDesc: "Weighted average %.",
      body: `
<h1>Weighted grade calculator</h1>${ad}
<div class="tool-panel">
  <p>Enter score and weight % per line: <code>score weight</code></p>
  <textarea id="rows">90 40
85 30
78 30</textarea>
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let wSum=0, wx=0;
  for(const line of document.getElementById('rows').value.split(/\\n/)){
    const [s,w]=line.trim().split(/\\s+/).map(Number);
    if(!Number.isFinite(s)||!Number.isFinite(w)) continue;
    wx+=s*w; wSum+=w;
  }
  document.getElementById('out').textContent=wSum?('Grade: '+(wx/wSum).toFixed(2)+'% (weights sum '+wSum+'%)'):'Add rows';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/bmr-calculator.html",
      file: "bmr-calculator.html",
      category: "calculators",
      title: "BMR Calculator — Basal Metabolic Rate",
      desc: "Estimate BMR using Mifflin-St Jeor equation.",
      card: "BMR calculator",
      cardDesc: "Daily calories at rest.",
      body: `
<h1>BMR calculator</h1>${ad}
<div class="tool-panel">
  <label>Sex</label>
  <select id="sex"><option value="m">Male</option><option value="f">Female</option></select>
  <label for="kg">Weight (kg)</label><input id="kg" type="number" value="70" />
  <label for="cm">Height (cm)</label><input id="cm" type="number" value="170" />
  <label for="age">Age</label><input id="age" type="number" value="30" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
  <p class="prose" style="font-size:0.85rem">Estimate only—not medical advice.</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const kg=+document.getElementById('kg').value, cm=+document.getElementById('cm').value, age=+document.getElementById('age').value;
  let bmr=10*kg+6.25*cm-5*age;
  bmr+=document.getElementById('sex').value==='m'?5:-161;
  document.getElementById('out').textContent='BMR ≈ '+Math.round(bmr)+' kcal/day';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/flesch-reading.html",
      file: "flesch-reading.html",
      category: "writing",
      title: "Flesch Reading Ease Score",
      desc: "Estimate reading ease from word and sentence counts.",
      card: "Flesch score",
      cardDesc: "Readability estimate.",
      body: `
<h1>Flesch reading ease</h1>${ad}
<div class="tool-panel">
  <textarea id="text" rows="8">The quick brown fox jumps over the lazy dog. Short sentences help readability.</textarea>
  <button type="button" class="primary" id="go">Score</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const t=document.getElementById('text').value.trim();
  const words=(t.match(/\\S+/g)||[]).length;
  const sentences=(t.match(/[.!?]+/g)||[]).length||1;
  const syll=Math.max(1,Math.round(words*1.4));
  const score=206.835-1.015*(words/sentences)-84.6*(syll/words);
  document.getElementById('out').textContent='Score: '+score.toFixed(1)+' (approx syllables) · '+words+' words';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/palindrome-checker.html",
      file: "palindrome-checker.html",
      category: "writing",
      title: "Palindrome Checker",
      desc: "Check if text reads the same forwards and backwards.",
      card: "Palindrome checker",
      cardDesc: "Same forwards & back.",
      body: `
<h1>Palindrome checker</h1>${ad}
<div class="tool-panel">
  <input id="text" value="racecar" />
  <button type="button" class="primary" id="go">Check</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=document.getElementById('text').value.toLowerCase().replace(/[^a-z0-9]/g,'');
  const ok=s===[...s].reverse().join('');
  document.getElementById('out').textContent=ok?'Palindrome!':'Not a palindrome';
  document.getElementById('out').className=ok?'ok':'error';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/anagram-checker.html",
      file: "anagram-checker.html",
      category: "writing",
      title: "Anagram Checker — Same Letters?",
      desc: "Check if two phrases are anagrams of each other.",
      card: "Anagram checker",
      cardDesc: "Compare two phrases.",
      body: `
<h1>Anagram checker</h1>${ad}
<div class="tool-panel">
  <label for="a">Phrase A</label><input id="a" value="listen" />
  <label for="b">Phrase B</label><input id="b" value="silent" />
  <button type="button" class="primary" id="go">Check</button>
  <p id="out" class="ok"></p>
</div>
<script>
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'').split('').sort().join('');
document.getElementById('go').onclick=()=>{
  const ok=norm(document.getElementById('a').value)===norm(document.getElementById('b').value);
  document.getElementById('out').textContent=ok?'Anagram!':'Not an anagram';
  document.getElementById('out').className=ok?'ok':'error';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/pincode-format.html",
      file: "pincode-format.html",
      category: "india",
      title: "India PIN Code Format Checker",
      desc: "Validate 6-digit Indian PIN code format. Not India Post verification.",
      card: "PIN code format",
      cardDesc: "6-digit PIN pattern.",
      body: `
<h1>India PIN code format</h1>${ad}
<div class="tool-panel">
  <label for="pin">PIN code</label><input id="pin" maxlength="6" inputmode="numeric" placeholder="110001" />
  <button type="button" class="primary" id="go">Check</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=document.getElementById('pin').value.trim();
  const ok=/^[1-9][0-9]{5}$/.test(s);
  const o=document.getElementById('out');
  o.className=ok?'ok':'error';
  o.textContent=ok?'Format OK (6 digits, not starting with 0).':'Invalid PIN format.';
};
</script>`,
    },
    {
      path: "/loan-comparison.html",
      file: "loan-comparison.html",
      category: "calculators",
      title: "Loan EMI Comparison — Two Loans",
      desc: "Compare monthly EMI for two loan offers side by side.",
      card: "Loan compare",
      cardDesc: "Compare two EMIs.",
      body: `
<h1>Loan EMI comparison</h1>${ad}
<div class="tool-panel">
  <h2>Loan A</h2>
  <label>Principal <input id="p1" type="number" value="500000" /></label>
  <label>Rate % <input id="r1" type="number" step="0.1" value="9" /></label>
  <label>Months <input id="n1" type="number" value="60" /></label>
  <h2>Loan B</h2>
  <label>Principal <input id="p2" type="number" value="500000" /></label>
  <label>Rate % <input id="r2" type="number" step="0.1" value="10.5" /></label>
  <label>Months <input id="n2" type="number" value="60" /></label>
  <button type="button" class="primary" id="go">Compare</button>
  <p id="out" class="ok"></p>
</div>
<script>
function emi(P,r,n){
  const i=r/12/100;
  if(!i) return P/n;
  return P*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1);
}
document.getElementById('go').onclick=()=>{
  const e1=emi(+document.getElementById('p1').value,+document.getElementById('r1').value,+document.getElementById('n1').value);
  const e2=emi(+document.getElementById('p2').value,+document.getElementById('r2').value,+document.getElementById('n2').value);
  document.getElementById('out').textContent='EMI A: ₹'+Math.round(e1).toLocaleString('en-IN')+' · EMI B: ₹'+Math.round(e2).toLocaleString('en-IN')+' · Diff ₹'+Math.round(Math.abs(e1-e2)).toLocaleString('en-IN');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/amortization-schedule.html",
      file: "amortization-schedule.html",
      category: "calculators",
      title: "Loan Amortization Schedule — First 12 Months",
      desc: "See principal vs interest split for the first year of a loan.",
      card: "Amortization table",
      cardDesc: "EMI breakdown table.",
      body: `
<h1>Amortization schedule (first 12 months)</h1>${ad}
<div class="tool-panel">
  <label>Principal (₹) <input id="p" type="number" value="1000000" /></label>
  <label>Rate % <input id="r" type="number" step="0.1" value="10" /></label>
  <label>Months <input id="n" type="number" value="120" /></label>
  <button type="button" class="primary" id="go">Build</button>
  <div id="table" style="overflow:auto;margin-top:12px"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let bal=+document.getElementById('p').value;
  const r=+document.getElementById('r').value/100/12, n=+document.getElementById('n').value;
  const i=r||0.0001;
  const pay=bal*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1);
  let html='<table><tr><th>#</th><th>Payment</th><th>Interest</th><th>Principal</th><th>Balance</th></tr>';
  for(let m=1;m<=Math.min(12,n);m++){
    const intr=bal*i, pr=pay-intr; bal-=pr;
    html+='<tr><td>'+m+'</td><td>'+pay.toFixed(0)+'</td><td>'+intr.toFixed(0)+'</td><td>'+pr.toFixed(0)+'</td><td>'+Math.max(0,bal).toFixed(0)+'</td></tr>';
  }
  html+='</table>';
  document.getElementById('table').innerHTML=html;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/world-clock.html",
      file: "world-clock.html",
      category: "productivity",
      title: "World Clock — Time in Major Cities",
      desc: "See current local time in popular time zones.",
      card: "World clock",
      cardDesc: "Live city times.",
      body: `
<h1>World clock</h1>${ad}
<div class="tool-panel">
  <button type="button" class="primary" id="go">Refresh</button>
  <ul id="list"></ul>
</div>
<script>
const zones=['Asia/Kolkata','America/New_York','America/Los_Angeles','Europe/London','Europe/Berlin','Asia/Tokyo','Australia/Sydney','UTC'];
function refresh(){
  document.getElementById('list').innerHTML=zones.map(z=>{
    const fmt=new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeStyle:'medium',timeZone:z});
    return '<li><strong>'+z+'</strong> — '+fmt.format(new Date())+'</li>';
  }).join('');
}
document.getElementById('go').onclick=refresh;
refresh();
setInterval(refresh,30000);
</script>`,
    },
  ];
}
