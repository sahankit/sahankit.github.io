/** Batch 16 — SEO-focused calculators & converters. */

export function batch16Tools(ad) {
  return [
    {
      path: "/hra-calculator.html",
      file: "hra-calculator.html",
      category: "india",
      title: "HRA Calculator India — House Rent Allowance Exemption",
      desc: "Calculate HRA tax exemption for salaried employees in India. Metro vs non-metro, basic salary and rent paid.",
      card: "HRA calculator",
      cardDesc: "India HRA exemption estimate.",
      body: `
<h1>HRA calculator (India)</h1>
<p class="prose" style="font-size:0.9rem">Estimate exempt HRA under the old tax regime. Exemption is the <strong>least</strong> of three amounts. Not a substitute for Form 16 or CA advice.</p>
${ad}
<div class="tool-panel">
  <label for="basic">Basic salary (annual ₹)</label><input id="basic" type="number" value="600000" />
  <label for="hra">HRA received (annual ₹)</label><input id="hra" type="number" value="240000" />
  <label for="rent">Rent paid (annual ₹)</label><input id="rent" type="number" value="180000" />
  <label><input id="metro" type="checkbox" checked /> Metro city (50% of basic limit)</label>
  <button type="button" class="primary" id="go">Calculate exemption</button>
  <div id="out" class="prose" style="margin-top:12px"></div>
</div>
<script>
function fmt(n){ return '₹'+Math.round(n).toLocaleString('en-IN'); }
document.getElementById('go').onclick=()=>{
  const basic=+document.getElementById('basic').value;
  const hra=+document.getElementById('hra').value;
  const rent=+document.getElementById('rent').value;
  const metro=document.getElementById('metro').checked;
  const a=hra;
  const b=Math.max(0, rent - basic*0.1);
  const c=basic*(metro?0.5:0.4);
  const ex=Math.min(a,b,c);
  document.getElementById('out').innerHTML='<p class="ok"><strong>Exempt HRA (estimate): '+fmt(ex)+'</strong></p>'
    +'<ul><li>Actual HRA: '+fmt(a)+'</li><li>Rent − 10% basic: '+fmt(b)+'</li><li>'+(metro?'50%':'40%')+' of basic: '+fmt(c)+'</li></ul>'
    +'<p style="font-size:0.85rem">Taxable HRA portion (approx): '+fmt(Math.max(0,hra-ex))+'</p>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/home-loan-calculator.html",
      file: "home-loan-calculator.html",
      category: "india",
      title: "Home Loan EMI Calculator India — Housing Loan Interest",
      desc: "Free home loan EMI calculator for India. Monthly EMI, total interest, and total payment from loan amount, rate, and tenure.",
      card: "Home loan EMI",
      cardDesc: "Housing loan EMI & interest.",
      body: `
<h1>Home loan EMI calculator</h1>${ad}
<div class="tool-panel">
  <label for="p">Loan amount (₹)</label><input id="p" type="number" value="5000000" />
  <label for="r">Interest rate (% per year)</label><input id="r" type="number" step="0.01" value="8.5" />
  <label for="y">Tenure (years)</label><input id="y" type="number" value="20" />
  <button type="button" class="primary" id="go">Calculate EMI</button>
  <div class="stats" id="stats"></div>
</div>
<script>
function emi(P, annual, years){
  const n=years*12, r=annual/100/12;
  if(!r) return P/n;
  return P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
}
function fmt(n){ return '₹'+Math.round(n).toLocaleString('en-IN'); }
document.getElementById('go').onclick=()=>{
  const P=+document.getElementById('p').value, rate=+document.getElementById('r').value, y=+document.getElementById('y').value;
  const e=emi(P,rate,y), total=e*y*12, interest=total-P;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+fmt(e)+'</strong>Monthly EMI</div>'
    +'<div class="stat"><strong>'+fmt(interest)+'</strong>Total interest</div>'
    +'<div class="stat"><strong>'+fmt(total)+'</strong>Total payment</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/car-loan-calculator.html",
      file: "car-loan-calculator.html",
      category: "calculators",
      title: "Car Loan EMI Calculator — Auto Loan Payment",
      desc: "Calculate car loan EMI from vehicle price, down payment, interest rate, and loan tenure. Free auto loan calculator.",
      card: "Car loan EMI",
      cardDesc: "Price, down pay, EMI.",
      body: `
<h1>Car loan EMI calculator</h1>${ad}
<div class="tool-panel">
  <label for="price">Vehicle price (₹)</label><input id="price" type="number" value="800000" />
  <label for="down">Down payment (₹)</label><input id="down" type="number" value="200000" />
  <label for="r">Interest (% p.a.)</label><input id="r" type="number" step="0.01" value="9" />
  <label for="y">Tenure (years)</label><input id="y" type="number" value="5" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=Math.max(0,+document.getElementById('price').value-+document.getElementById('down').value);
  const rate=+document.getElementById('r').value, y=+document.getElementById('y').value;
  const n=y*12, r=rate/100/12;
  const emi=r?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n;
  const fmt=n=>'₹'+Math.round(n).toLocaleString('en-IN');
  document.getElementById('out').textContent='Loan '+fmt(P)+' · EMI '+fmt(emi)+'/month · Total '+fmt(emi*n);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/step-up-sip-calculator.html",
      file: "step-up-sip-calculator.html",
      category: "india",
      title: "Step-Up SIP Calculator — Increase SIP Yearly",
      desc: "Estimate mutual fund SIP returns when you increase the monthly SIP amount each year. Free step-up SIP calculator India.",
      card: "Step-up SIP",
      cardDesc: "SIP with annual increase.",
      body: `
<h1>Step-up SIP calculator</h1>${ad}
<div class="tool-panel">
  <label for="sip">Starting monthly SIP (₹)</label><input id="sip" type="number" value="5000" />
  <label for="step">Annual SIP increase (%)</label><input id="step" type="number" value="10" />
  <label for="ret">Expected return (% p.a.)</label><input id="ret" type="number" step="0.1" value="12" />
  <label for="y">Investment period (years)</label><input id="y" type="number" value="15" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let sip=+document.getElementById('sip').value;
  const stepPct=+document.getElementById('step').value/100;
  const r=+document.getElementById('ret').value/100/12;
  const years=+document.getElementById('y').value;
  let fv=0, invested=0, monthly=sip;
  for(let y=0;y<years;y++){
    for(let m=0;m<12;m++){
      invested+=monthly;
      fv=(fv+monthly)*(1+r);
    }
    monthly*=1+stepPct;
  }
  const fmt=n=>'₹'+Math.round(n).toLocaleString('en-IN');
  document.getElementById('out').textContent='Invested '+fmt(invested)+' · Est. maturity '+fmt(fv)+' (illustration only)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/gst-inclusive-calculator.html",
      file: "gst-inclusive-calculator.html",
      category: "india",
      title: "GST Inclusive Price Calculator — Remove GST from MRP",
      desc: "Find taxable value and GST amount from a GST-inclusive price. India GST 5%, 12%, 18%, 28% rates.",
      card: "GST inclusive price",
      cardDesc: "Split MRP into base + GST.",
      body: `
<h1>GST inclusive price calculator</h1>${ad}
<div class="tool-panel">
  <label for="inc">GST-inclusive amount (₹)</label><input id="inc" type="number" value="1180" />
  <label for="rate">GST rate (%)</label>
  <select id="rate"><option value="5">5%</option><option value="12">12%</option><option value="18" selected>18%</option><option value="28">28%</option></select>
  <button type="button" class="primary" id="go">Split amount</button>
  <div class="stats" id="stats"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const inc=+document.getElementById('inc').value;
  const g=+document.getElementById('rate').value/100;
  const base=inc/(1+g), gst=inc-base;
  const f=n=>'₹'+n.toFixed(2);
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+f(base)+'</strong>Taxable value</div>'
    +'<div class="stat"><strong>'+f(gst)+'</strong>GST</div>'
    +'<div class="stat"><strong>'+f(inc)+'</strong>Inclusive total</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/meta-description-checker.html",
      file: "meta-description-checker.html",
      category: "seo",
      title: "Meta Description Length Checker — SEO Character Count",
      desc: "Count characters and pixels for SEO meta descriptions and title tags. Stay within Google snippet limits.",
      card: "Meta description checker",
      cardDesc: "SEO title & description length.",
      body: `
<h1>Meta description &amp; title length checker</h1>${ad}
<div class="tool-panel">
  <label for="title">Page title</label><input id="title" type="text" placeholder="Free Word Counter — Count Words Online" />
  <p id="title-meta" class="prose" style="font-size:0.88rem"></p>
  <label for="desc">Meta description</label>
  <textarea id="desc" rows="4" placeholder="Short summary for search results…"></textarea>
  <p id="desc-meta" class="prose" style="font-size:0.88rem"></p>
</div>
<script>
function check(){
  const t=document.getElementById('title').value;
  const d=document.getElementById('desc').value;
  const tl=t.length;
  const dl=d.length;
  const tOk=tl>=30&&tl<=60;
  const dOk=dl>=120&&dl<=160;
  document.getElementById('title-meta').innerHTML='Title: <strong>'+tl+'</strong> characters — '+(tOk?'<span class="ok">Good range (≈30–60)</span>':'<span class="error">Aim for ~30–60 chars</span>');
  document.getElementById('desc-meta').innerHTML='Description: <strong>'+dl+'</strong> characters — '+(dOk?'<span class="ok">Good range (≈120–160)</span>':'<span class="error">Aim for ~120–160 chars</span>');
}
document.getElementById('title').oninput=check;
document.getElementById('desc').oninput=check;
check();
</script>`,
    },
    {
      path: "/html-to-markdown.html",
      file: "html-to-markdown.html",
      category: "writing",
      title: "HTML to Markdown Converter — Online Free",
      desc: "Convert HTML snippets to Markdown in your browser. Paste HTML, get clean MD for docs and GitHub.",
      card: "HTML to Markdown",
      cardDesc: "HTML → MD converter.",
      body: `
<h1>HTML to Markdown</h1>${ad}
<div class="tool-panel">
  <label for="html">HTML</label><textarea id="html" rows="8" spellcheck="false">&lt;h2&gt;Hello&lt;/h2&gt;&lt;p&gt;Convert &lt;strong&gt;this&lt;/strong&gt; to Markdown.&lt;/p&gt;</textarea>
  <button type="button" class="primary" id="go">Convert</button>
  <label for="md">Markdown</label><textarea id="md" rows="8" readonly spellcheck="false"></textarea>
  <button type="button" class="primary" id="copy">Copy Markdown</button>
</div>
<script type="module">
const go=document.getElementById('go');
go.onclick=async()=>{
  const mod=await import('https://cdn.jsdelivr.net/npm/turndown@7.2.0/+esm');
  const Turndown=mod.default||mod.TurndownService;
  const td=new Turndown();
  document.getElementById('md').value=td.turndown(document.getElementById('html').value);
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('md').value);
go.click();
</script>`,
    },
    {
      path: "/markdown-to-text.html",
      file: "markdown-to-text.html",
      category: "writing",
      title: "Markdown to Plain Text — Strip MD Formatting",
      desc: "Remove Markdown syntax and get plain text for word counts, emails, and CMS paste.",
      card: "Markdown to text",
      cardDesc: "Strip MD formatting.",
      body: `
<h1>Markdown to plain text</h1>${ad}
<div class="tool-panel">
  <label for="md">Markdown</label><textarea id="md" rows="10"># Title

Some **bold** and [link](https://example.com).</textarea>
  <button type="button" class="primary" id="go">Strip formatting</button>
  <label for="out">Plain text</label><textarea id="out" rows="10" readonly></textarea>
</div>
<script>
function mdToText(s){
  return s
    .replace(/\`\`\`[\\s\\S]*?\`\`\`/g,' ')
    .replace(/!\\[[^\\]]*\\]\\([^)]+\\)/g,'')
    .replace(/\\[([^\\]]+)\\]\\([^)]+\\)/g,'$1')
    .replace(/^#{1,6}\\s+/gm,'')
    .replace(/(\\*\\*|__)(.*?)\\1/g,'$2')
    .replace(/(\\*|_)(.*?)\\1/g,'$2')
    .replace(/~~(.*?)~~/g,'$1')
    .replace(/\`([^\`]+)\`/g,'$1')
    .replace(/^>\\s?/gm,'')
    .replace(/^[-*+]\\s+/gm,'')
    .replace(/^\\d+\\.\\s+/gm,'')
    .replace(/\\n{3,}/g,'\\n\\n')
    .trim();
}
document.getElementById('go').onclick=()=>{
  document.getElementById('out').value=mdToText(document.getElementById('md').value);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/tdee-calculator.html",
      file: "tdee-calculator.html",
      category: "calculators",
      title: "TDEE Calculator — Daily Calorie Needs (BMR + Activity)",
      desc: "Calculate total daily energy expenditure (TDEE) and BMR using the Mifflin-St Jeor equation. Free calorie calculator.",
      card: "TDEE calculator",
      cardDesc: "Daily calories & BMR.",
      body: `
<h1>TDEE &amp; BMR calculator</h1>${ad}
<div class="tool-panel">
  <label for="sex">Sex</label><select id="sex"><option value="m">Male</option><option value="f">Female</option></select>
  <label for="age">Age (years)</label><input id="age" type="number" value="30" />
  <label for="kg">Weight (kg)</label><input id="kg" type="number" value="70" />
  <label for="cm">Height (cm)</label><input id="cm" type="number" value="170" />
  <label for="act">Activity</label>
  <select id="act">
    <option value="1.2">Sedentary</option>
    <option value="1.375">Light exercise</option>
    <option value="1.55" selected>Moderate</option>
    <option value="1.725">Very active</option>
    <option value="1.9">Athlete</option>
  </select>
  <button type="button" class="primary" id="go">Calculate</button>
  <div class="stats" id="stats"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const male=document.getElementById('sex').value==='m';
  const w=+document.getElementById('kg').value, h=+document.getElementById('cm').value, a=+document.getElementById('age').value;
  const act=+document.getElementById('act').value;
  const bmr=male?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;
  const tdee=bmr*act;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+Math.round(bmr)+'</strong>BMR kcal/day</div>'
    +'<div class="stat"><strong>'+Math.round(tdee)+'</strong>TDEE kcal/day</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/iban-validator.html",
      file: "iban-validator.html",
      category: "developer",
      title: "IBAN Validator — Check International Bank Account Number",
      desc: "Validate IBAN format and MOD-97 checksum in the browser. Free IBAN checker for SEPA and international transfers.",
      card: "IBAN validator",
      cardDesc: "MOD-97 checksum check.",
      body: `
<h1>IBAN validator</h1>${ad}
<div class="tool-panel">
  <label for="iban">IBAN</label>
  <input id="iban" type="text" spellcheck="false" placeholder="DE89 3704 0044 0532 0130 00" />
  <button type="button" class="primary" id="go">Validate</button>
  <p id="out"></p>
</div>
<script>
function validateIban(raw){
  const iban=raw.replace(/\\s/g,'').toUpperCase();
  if(!/^[A-Z]{2}\\d{2}[A-Z0-9]{11,30}$/.test(iban)) return { ok:false, msg:'Invalid format (need country + check digits + BBAN).' };
  const rearr=iban.slice(4)+iban.slice(0,4);
  let num='';
  for(const ch of rearr){
    num+=ch>='A'&&ch<='Z'?String(ch.charCodeAt(0)-55):ch;
  }
  let rem=0;
  for(let i=0;i<num.length;i+=7){
    rem=parseInt(String(rem)+num.slice(i,i+7),10)%97;
  }
  if(rem!==1) return { ok:false, msg:'Checksum failed (MOD-97).' };
  return { ok:true, msg:'Valid IBAN format and checksum.', iban };
}
document.getElementById('go').onclick=()=>{
  const r=validateIban(document.getElementById('iban').value);
  const o=document.getElementById('out');
  o.className=r.ok?'ok':'error';
  o.textContent=r.msg+(r.iban?' '+r.iban:'');
};
</script>`,
    },
    {
      path: "/jwt-generator.html",
      file: "jwt-generator.html",
      category: "developer",
      title: "JWT Generator — Create HS256 JSON Web Token",
      desc: "Build a signed JWT (HS256) from header, payload, and secret in the browser. Pairs with our JWT decoder.",
      card: "JWT generator",
      cardDesc: "Sign HS256 JWT locally.",
      body: `
<h1>JWT generator (HS256)</h1>
<p class="prose" style="font-size:0.85rem">For testing only. Never paste production secrets on shared computers.</p>
${ad}
<div class="tool-panel">
  <label for="secret">Secret</label><input id="secret" type="text" value="dev-secret-change-me" autocomplete="off" />
  <label for="payload">Payload (JSON)</label><textarea id="payload" rows="6" spellcheck="false">{\\n  "sub": "1234567890",\\n  "name": "Jane Doe",\\n  "iat": 1516239022\\n}</textarea>
  <button type="button" class="primary" id="go">Generate JWT</button>
  <label for="jwt">Token</label><textarea id="jwt" rows="4" readonly spellcheck="false"></textarea>
  <button type="button" class="primary" id="copy">Copy token</button>
</div>
<script>
function b64url(bytes){
  let s='';
  bytes.forEach(b=>s+=String.fromCharCode(b));
  return btoa(s).replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=+$/,'');
}
function b64urlJson(o){
  return b64url([...new TextEncoder().encode(JSON.stringify(o))]);
}
document.getElementById('go').onclick=async()=>{
  let payload;
  try{ payload=JSON.parse(document.getElementById('payload').value); }
  catch(e){ alert('Invalid JSON: '+e.message); return; }
  const header={ alg:'HS256', typ:'JWT' };
  const h=b64urlJson(header), p=b64urlJson(payload);
  const data=h+'.'+p;
  const key=await crypto.subtle.importKey('raw', new TextEncoder().encode(document.getElementById('secret').value), {name:'HMAC', hash:'SHA-256'}, false, ['sign']);
  const sig=await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  document.getElementById('jwt').value=data+'.'+b64url([...new Uint8Array(sig)]);
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('jwt').value);
</script>`,
    },
    {
      path: "/test-credit-card-generator.html",
      file: "test-credit-card-generator.html",
      category: "developer",
      title: "Test Credit Card Number Generator — Luhn Valid Cards",
      desc: "Generate Luhn-valid test credit card numbers for Visa and Mastercard. For payment gateway sandbox testing only.",
      card: "Test card generator",
      cardDesc: "Luhn-valid sandbox cards.",
      body: `
<h1>Test credit card generator</h1>
<p class="prose" style="font-size:0.85rem">For <strong>developer sandbox testing</strong> only—not real cards. Use your payment provider's test docs.</p>
${ad}
<div class="tool-panel">
  <label for="brand">Brand</label>
  <select id="brand"><option value="visa">Visa</option><option value="mc">Mastercard</option></select>
  <button type="button" class="primary" id="go">Generate</button>
  <p id="out" class="ok" style="font-family:monospace;font-size:1.1rem"></p>
</div>
<script>
function luhnDigit(partial){
  const d=[...partial].reverse().map(Number);
  let sum=0;
  for(let i=0;i<d.length;i++){
    let n=d[i];
    if(i%2===0){ n*=2; if(n>9) n-=9; }
    sum+=n;
  }
  return (10-sum%10)%10;
}
function gen(prefix, len){
  let s=prefix;
  while(s.length<len-1) s+=Math.floor(Math.random()*10);
  return s+luhnDigit(s);
}
document.getElementById('go').onclick=()=>{
  const brand=document.getElementById('brand').value;
  const num=brand==='visa'?gen('4',16):gen('51',16);
  document.getElementById('out').textContent=num.replace(/(\\d{4})(?=\\d)/g,'$1 ');
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
