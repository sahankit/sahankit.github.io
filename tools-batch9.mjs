/** Ninth batch of useful tools. */
export function batch9Tools(ad) {
  return [
    {
      path: "/hourly-to-salary.html",
      file: "hourly-to-salary.html",
      category: "calculators",
      title: "Hourly to Salary Calculator — Annual Pay",
      desc: "Convert hourly wage to estimated annual salary.",
      card: "Hourly → salary",
      cardDesc: "Hourly rate to annual.",
      body: `
<h1>Hourly to salary</h1>${ad}
<div class="tool-panel">
  <label for="rate">Hourly rate</label><input id="rate" type="number" value="500" />
  <label for="hrs">Hours per week</label><input id="hrs" type="number" value="40" />
  <label for="wks">Weeks per year</label><input id="wks" type="number" value="52" />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const r=+document.getElementById('rate').value, h=+document.getElementById('hrs').value, w=+document.getElementById('wks').value;
  document.getElementById('out').textContent='≈ '+(r*h*w).toLocaleString(undefined,{maximumFractionDigits:0})+' per year';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/cagr-calculator.html",
      file: "cagr-calculator.html",
      category: "calculators",
      title: "CAGR Calculator — Compound Annual Growth Rate",
      desc: "Calculate CAGR from beginning value, ending value, and years.",
      card: "CAGR calculator",
      cardDesc: "Growth rate %.",
      body: `
<h1>CAGR calculator</h1>${ad}
<div class="tool-panel">
  <label for="b">Beginning value</label><input id="b" type="number" value="10000" />
  <label for="e">Ending value</label><input id="e" type="number" value="18000" />
  <label for="y">Years</label><input id="y" type="number" value="5" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const b=+document.getElementById('b').value, e=+document.getElementById('e').value, y=+document.getElementById('y').value;
  const c=b>0&&y>0?(Math.pow(e/b,1/y)-1)*100:0;
  document.getElementById('out').textContent='CAGR: '+c.toFixed(2)+'%';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/rule-of-72.html",
      file: "rule-of-72.html",
      category: "calculators",
      title: "Rule of 72 — Years to Double Money",
      desc: "Estimate years to double an investment at a given annual return.",
      card: "Rule of 72",
      cardDesc: "Years to double.",
      body: `
<h1>Rule of 72</h1>${ad}
<div class="tool-panel">
  <label for="r">Annual return (%)</label><input id="r" type="number" step="0.1" value="8" />
  <button type="button" class="primary" id="go">Estimate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const r=+document.getElementById('r').value;
  document.getElementById('out').textContent=r>0?('≈ '+(72/r).toFixed(1)+' years to double'):'Enter positive rate';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/fraction-calculator.html",
      file: "fraction-calculator.html",
      category: "calculators",
      title: "Fraction Calculator — Add Two Fractions",
      desc: "Add, subtract, multiply, or divide two simple fractions.",
      card: "Fraction calculator",
      cardDesc: "Operate on fractions.",
      body: `
<h1>Fraction calculator</h1>${ad}
<div class="tool-panel">
  <label>a/b <input id="a1" type="number" value="1" style="width:3rem" /> / <input id="a2" type="number" value="2" style="width:3rem" /></label>
  <select id="op"><option value="+">+</option><option value="-">−</option><option value="*">×</option><option value="/">÷</option></select>
  <label>c/d <input id="b1" type="number" value="1" style="width:3rem" /> / <input id="b2" type="number" value="3" style="width:3rem" /></label>
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
const gcd=(x,y)=>{ while(y){ const t=y; y=x%y; x=t; } return Math.abs(x)||1; };
document.getElementById('go').onclick=()=>{
  let n1=+document.getElementById('a1').value,d1=+document.getElementById('a2').value;
  let n2=+document.getElementById('b1').value,d2=+document.getElementById('b2').value;
  const op=document.getElementById('op').value;
  if(!d1||!d2) return;
  let n,d;
  if(op==='+'){ n=n1*d2+n2*d1; d=d1*d2; }
  else if(op==='-'){ n=n1*d2-n2*d1; d=d1*d2; }
  else if(op==='*'){ n=n1*n2; d=d1*d2; }
  else { n=n1*d2; d=d1*n2; }
  const g=gcd(n,d); n/=g; d/=g;
  if(d<0){ n=-n; d=-d; }
  document.getElementById('out').textContent=n+'/'+d+(d!==1?' ≈ '+(n/d).toFixed(4):'');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/ratio-simplifier.html",
      file: "ratio-simplifier.html",
      category: "calculators",
      title: "Ratio Simplifier — Reduce to Lowest Terms",
      desc: "Simplify a ratio like 10:15 to 2:3.",
      card: "Ratio simplifier",
      cardDesc: "Reduce ratios.",
      body: `
<h1>Ratio simplifier</h1>${ad}
<div class="tool-panel">
  <label>A <input id="a" type="number" value="10" /></label>
  <label>B <input id="b" type="number" value="15" /></label>
  <button type="button" class="primary" id="go">Simplify</button>
  <p id="out" class="ok"></p>
</div>
<script>
const gcd=(x,y)=>{ while(y){ const t=y; y=x%y; x=t; } return Math.abs(x)||1; };
document.getElementById('go').onclick=()=>{
  let a=+document.getElementById('a').value,b=+document.getElementById('b').value;
  const g=gcd(a,b); document.getElementById('out').textContent=(a/g)+':'+(b/g);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/mod-calculator.html",
      file: "mod-calculator.html",
      category: "calculators",
      title: "Modulo Calculator — A mod B",
      desc: "Calculate remainder after division.",
      card: "Mod calculator",
      cardDesc: "Remainder mod N.",
      body: `
<h1>Modulo calculator</h1>${ad}
<div class="tool-panel">
  <label>A <input id="a" type="number" value="17" /></label>
  <label>B <input id="b" type="number" value="5" /></label>
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const a=+document.getElementById('a').value,b=+document.getElementById('b').value;
  document.getElementById('out').textContent=b?((a%b)+' (mod '+b+')'):'B cannot be 0';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/ipv4-to-decimal.html",
      file: "ipv4-to-decimal.html",
      category: "developer",
      title: "IPv4 to Decimal Converter",
      desc: "Convert dotted IPv4 address to decimal integer and back.",
      card: "IPv4 ↔ decimal",
      cardDesc: "IP as integer.",
      body: `
<h1>IPv4 to decimal</h1>${ad}
<div class="tool-panel">
  <label for="ip">IPv4</label><input id="ip" value="192.168.0.1" spellcheck="false" />
  <button type="button" class="primary" id="toDec">To decimal</button>
  <label for="dec">Decimal</label><input id="dec" inputmode="numeric" />
  <button type="button" class="primary" id="toIp">To IPv4</button>
</div>
<script>
function toDec(s){
  const p=s.trim().split('.').map(Number);
  if(p.length!==4||p.some(x=>x<0||x>255)) throw new Error('bad ip');
  return ((p[0]<<24)>>>0)+((p[1]<<16)>>>0)+((p[2]<<8)>>>0)+p[3];
}
function toIp(n){
  n=Number(n)>>>0;
  return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
}
document.getElementById('toDec').onclick=()=>{ try{ document.getElementById('dec').value=toDec(document.getElementById('ip').value); }catch(e){ alert(e.message); } };
document.getElementById('toIp').onclick=()=>{ document.getElementById('ip').value=toIp(document.getElementById('dec').value); };
document.getElementById('toDec').click();
</script>`,
    },
    {
      path: "/rot13-encoder.html",
      file: "rot13-encoder.html",
      category: "developer",
      title: "ROT13 Encoder & Decoder",
      desc: "ROT13 encodes and decodes text (same operation twice returns original).",
      card: "ROT13",
      cardDesc: "Rotate letters 13.",
      body: `
<h1>ROT13</h1>${ad}
<div class="tool-panel">
  <textarea id="text">Hello World</textarea>
  <button type="button" class="primary" id="go">ROT13</button>
  <textarea id="out" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const rot=s=>s.replace(/[a-zA-Z]/g,c=>{
    const b=c<='Z'?65:97; return String.fromCharCode((c.charCodeAt(0)-b+13)%26+b);
  });
  const t=document.getElementById('text').value;
  document.getElementById('out').value=rot(t);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/base32-encoder.html",
      file: "base32-encoder.html",
      category: "developer",
      title: "Base32 Encode & Decode",
      desc: "Encode or decode Base32 text in the browser.",
      card: "Base32",
      cardDesc: "Base32 encode/decode.",
      body: `
<h1>Base32 encoder</h1>${ad}
<div class="tool-panel">
  <textarea id="text" spellcheck="false">hi</textarea>
  <div class="row">
    <button type="button" class="primary" id="enc">Encode</button>
    <button type="button" class="primary" id="dec">Decode</button>
  </div>
  <p id="msg" class="error" hidden></p>
</div>
<script>
const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function encBytes(bytes){
  let bits=0,val=0,out='';
  for(const b of bytes){
    val=(val<<8)|b; bits+=8;
    while(bits>=5){ bits-=5; out+=alphabet[(val>>bits)&31]; }
  }
  if(bits>0) out+=alphabet[(val<<(5-bits))&31];
  return out;
}
function decStr(s){
  s=s.toUpperCase().replace(/=+$/,'').replace(/\\s/g,'');
  let bits=0,val=0,out=[];
  for(const c of s){
    const i=alphabet.indexOf(c); if(i<0) throw new Error('invalid char');
    val=(val<<5)|i; bits+=5;
    if(bits>=8){ bits-=8; out.push((val>>bits)&255); }
  }
  return new Uint8Array(out);
}
document.getElementById('enc').onclick=()=>{
  document.getElementById('msg').hidden=true;
  document.getElementById('text').value=encBytes(new TextEncoder().encode(document.getElementById('text').value));
};
document.getElementById('dec').onclick=()=>{
  document.getElementById('msg').hidden=true;
  try{
    document.getElementById('text').value=new TextDecoder().decode(decStr(document.getElementById('text').value));
  }catch(e){ document.getElementById('msg').textContent=e.message; document.getElementById('msg').hidden=false; }
};
</script>`,
    },
    {
      path: "/lottery-numbers.html",
      file: "lottery-numbers.html",
      category: "productivity",
      title: "Lottery Number Generator — Pick 6",
      desc: "Generate random lottery-style numbers in a range.",
      card: "Lottery numbers",
      cardDesc: "Random number set.",
      body: `
<h1>Lottery number generator</h1>${ad}
<div class="tool-panel">
  <label for="max">Max number</label><input id="max" type="number" value="49" />
  <label for="pick">How many</label><input id="pick" type="number" value="6" />
  <button type="button" class="primary" id="go">Generate</button>
  <p id="out" class="ok" style="font-size:1.3rem"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const max=+document.getElementById('max').value, k=+document.getElementById('pick').value;
  const set=new Set();
  while(set.size<Math.min(k,max)){ set.add(1+Math.floor(crypto.getRandomValues(new Uint32Array(1))[0]/4294967296*max)); }
  document.getElementById('out').textContent=[...set].sort((a,b)=>a-b).join(', ');
};
</script>`,
    },
    {
      path: "/list-shuffler.html",
      file: "list-shuffler.html",
      category: "productivity",
      title: "List Shuffler — Randomize Lines",
      desc: "Randomly shuffle lines in a list.",
      card: "Shuffle list",
      cardDesc: "Random line order.",
      body: `
<h1>List shuffler</h1>${ad}
<div class="tool-panel">
  <textarea id="text">one
two
three
four</textarea>
  <button type="button" class="primary" id="go">Shuffle</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const a=document.getElementById('text').value.split(/\\n/);
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(crypto.getRandomValues(new Uint32Array(1))[0]/4294967296*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  document.getElementById('text').value=a.join('\\n');
};
</script>`,
    },
    {
      path: "/text-joiner.html",
      file: "text-joiner.html",
      category: "writing",
      title: "Text Joiner — Combine Lines with Delimiter",
      desc: "Join lines with comma, space, or custom delimiter.",
      card: "Join lines",
      cardDesc: "Delimiter join.",
      body: `
<h1>Text joiner</h1>${ad}
<div class="tool-panel">
  <textarea id="lines" rows="6">apple
banana
cherry</textarea>
  <label for="del">Delimiter</label><input id="del" value=", " />
  <button type="button" class="primary" id="go">Join</button>
  <textarea id="out" rows="3" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const lines=document.getElementById('lines').value.split(/\\n/).filter(l=>l.length);
  document.getElementById('out').value=lines.join(document.getElementById('del').value);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/cooking-converter.html",
      file: "cooking-converter.html",
      category: "calculators",
      title: "Cooking Unit Converter — Cups, tbsp, ml",
      desc: "Convert common cooking measurements.",
      card: "Cooking units",
      cardDesc: "Cups, tbsp, ml.",
      body: `
<h1>Cooking converter</h1>${ad}
<div class="tool-panel">
  <label for="val">Amount</label><input id="val" type="number" value="1" />
  <label for="from">From</label>
  <select id="from"><option value="cup">Cup (US)</option><option value="tbsp">Tablespoon</option><option value="tsp">Teaspoon</option><option value="ml">ml</option></select>
  <label for="to">To</label>
  <select id="to"><option value="ml" selected>ml</option><option value="cup">Cup</option><option value="tbsp">Tablespoon</option><option value="tsp">Teaspoon</option></select>
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
const ml={cup:236.588, tbsp:14.787, tsp:4.929, ml:1};
document.getElementById('go').onclick=()=>{
  const v=+document.getElementById('val').value;
  const f=ml[document.getElementById('from').value], t=ml[document.getElementById('to').value];
  document.getElementById('out').textContent=(v*f/t).toFixed(3)+' '+document.getElementById('to').value;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/gratuity-calculator.html",
      file: "gratuity-calculator.html",
      category: "india",
      title: "Gratuity Calculator India — Payment of Gratuity Act",
      desc: "Estimate gratuity for eligible employees (simplified formula).",
      card: "Gratuity (India)",
      cardDesc: "Gratuity estimate.",
      body: `
<h1>Gratuity calculator (India)</h1>${ad}
<div class="tool-panel">
  <label for="sal">Last drawn basic + DA (₹ monthly)</label><input id="sal" type="number" value="30000" />
  <label for="y">Years of service</label><input id="y" type="number" value="7" />
  <button type="button" class="primary" id="go">Estimate</button>
  <p id="out" class="ok"></p>
  <p class="prose" style="font-size:0.85rem">Uses common formula (15/26)×months—verify with HR/statute.</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const sal=+document.getElementById('sal').value, y=+document.getElementById('y').value;
  const g=(15/26)*sal*12*y;
  document.getElementById('out').textContent='≈ ₹'+Math.round(g).toLocaleString('en-IN');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/upi-id-format.html",
      file: "upi-id-format.html",
      category: "india",
      title: "UPI ID Format Checker",
      desc: "Check if a UPI VPA matches common name@bank format.",
      card: "UPI format check",
      cardDesc: "Validate VPA pattern.",
      body: `
<h1>UPI ID format checker</h1>${ad}
<div class="tool-panel">
  <label for="upi">UPI ID</label><input id="upi" placeholder="name@oksbi" autocapitalize="none" />
  <button type="button" class="primary" id="go">Check</button>
  <p id="out"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=document.getElementById('upi').value.trim().toLowerCase();
  const ok=/^[a-z0-9.\\-_]{2,256}@[a-z]{2,64}$/.test(s);
  const o=document.getElementById('out');
  o.className=ok?'ok':'error';
  o.textContent=ok?'Format looks valid.':'Invalid UPI format (expected user@psp).';
};
</script>`,
    },
    {
      path: "/isbn-validator.html",
      file: "isbn-validator.html",
      category: "writing",
      title: "ISBN-10 & ISBN-13 Validator",
      desc: "Validate ISBN checksum for 10 or 13 digit books codes.",
      card: "ISBN validator",
      cardDesc: "Check ISBN checksum.",
      body: `
<h1>ISBN validator</h1>${ad}
<div class="tool-panel">
  <input id="isbn" placeholder="9780306406157" spellcheck="false" />
  <button type="button" class="primary" id="go">Validate</button>
  <p id="out"></p>
</div>
<script>
function clean(s){ return s.replace(/[^0-9Xx]/g,''); }
function isbn10(s){
  if(s.length!==10) return false;
  let sum=0;
  for(let i=0;i<9;i++) sum+=(10-i)*+s[i];
  const c=s[9].toUpperCase()==='X'?10:+s[9];
  return (sum+c)%11===0;
}
function isbn13(s){
  if(s.length!==13) return false;
  let sum=0;
  for(let i=0;i<12;i++) sum+=+s[i]*(i%2?3:1);
  const check=(10-(sum%10))%10;
  return check===+s[12];
}
document.getElementById('go').onclick=()=>{
  const s=clean(document.getElementById('isbn').value);
  const ok=(s.length===10&&isbn10(s))||(s.length===13&&isbn13(s));
  const o=document.getElementById('out');
  o.className=ok?'ok':'error';
  o.textContent=ok?'Valid ISBN checksum.':'Invalid ISBN.';
};
</script>`,
    },
    {
      path: "/cpm-calculator.html",
      file: "cpm-calculator.html",
      category: "seo",
      title: "CPM Calculator — Cost Per Thousand Impressions",
      desc: "Calculate CPM from ad spend and impressions.",
      card: "CPM calculator",
      cardDesc: "Ad CPM math.",
      body: `
<h1>CPM calculator</h1>${ad}
<div class="tool-panel">
  <label for="spend">Spend</label><input id="spend" type="number" value="100" />
  <label for="imp">Impressions</label><input id="imp" type="number" value="50000" />
  <button type="button" class="primary" id="go">CPM</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=+document.getElementById('spend').value, i=+document.getElementById('imp').value;
  document.getElementById('out').textContent=i?('CPM = '+(s/i*1000).toFixed(2)):'—';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/ctr-calculator.html",
      file: "ctr-calculator.html",
      category: "seo",
      title: "CTR Calculator — Click-Through Rate",
      desc: "Calculate CTR from clicks and impressions.",
      card: "CTR calculator",
      cardDesc: "Clicks ÷ impressions.",
      body: `
<h1>CTR calculator</h1>${ad}
<div class="tool-panel">
  <label for="clicks">Clicks</label><input id="clicks" type="number" value="120" />
  <label for="imp">Impressions</label><input id="imp" type="number" value="10000" />
  <button type="button" class="primary" id="go">CTR</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const c=+document.getElementById('clicks').value, i=+document.getElementById('imp').value;
  document.getElementById('out').textContent=i?('CTR = '+(100*c/i).toFixed(2)+'%'):'—';
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
