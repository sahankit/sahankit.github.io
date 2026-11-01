/** Batch 28 — High-search DIY, finance, dev, and SEO tools. */

export function batch28Tools(ad) {
  return [
    {
      path: "/discord-character-counter.html",
      file: "discord-character-counter.html",
      category: "seo",
      title: "Discord Character Counter — Message Length Limit",
      desc: "Count Discord message characters with 2,000 character guidance. Free Discord counter for bots and posts.",
      card: "Discord counter",
      cardDesc: "2,000 char guide.",
      body: `<h1>Discord character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Message</label><textarea id="text" rows="6"></textarea>
<div class="stats" id="stats"></div>
</div>
<script>
const G=2000;
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML='<div class="stat"><strong>'+n+'</strong>Characters</div><div class="stat"><strong>'+(G-n)+'</strong>Left of 2,000</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/headline-analyzer.html",
      file: "headline-analyzer.html",
      category: "seo",
      title: "Headline Analyzer — Blog Title Word & Length Check",
      desc: "Analyze headline length, word count, and common power words for SEO titles. Free headline checker.",
      card: "Headline analyzer",
      cardDesc: "Title length & words.",
      body: `<h1>Headline analyzer</h1>${ad}
<div class="tool-panel">
<label for="text">Headline</label><input id="text" type="text" placeholder="How to save money in 2026" />
<button type="button" class="primary" id="go">Analyze</button>
<p id="out" class="ok"></p>
</div>
<script>
const power=new Set('free new proven secret easy best ultimate guide tips how why what discover simple fast save boost grow'.split(' '));
document.getElementById('go').onclick=()=>{
  const t=document.getElementById('text').value.trim();
  const words=t?t.split(/\\s+/):[];
  const hit=words.filter(w=>power.has(w.toLowerCase().replace(/[^a-z]/g,''))).length;
  let note='';
  if(t.length>60) note=' Consider shortening for SERP display (~60 chars).';
  else if(t.length<20) note=' Very short—add context for SEO.';
  document.getElementById('out').textContent=words.length+' words · '+t.length+' characters · '+hit+' power-word matches.'+note;
};
</script>`,
    },
    {
      path: "/spf-record-generator.html",
      file: "spf-record-generator.html",
      category: "developer",
      title: "SPF Record Generator — DNS TXT SPF Template",
      desc: "Build a basic SPF TXT record for email domains. Copy-paste DNS helper—not a mail server setup tool.",
      card: "SPF generator",
      cardDesc: "DNS TXT template.",
      body: `<h1>SPF record generator</h1>${ad}
<div class="tool-panel">
<label for="dom">Domain</label><input id="dom" type="text" placeholder="example.com" />
<label><input type="checkbox" id="google" checked /> Include Google (_spf.google.com)</label>
<label><input type="checkbox" id="ms" /> Include Microsoft (spf.protection.outlook.com)</label>
<label for="ip">Extra IPv4 (optional)</label><input id="ip" type="text" placeholder="203.0.113.10" />
<button type="button" class="primary" id="go">Generate TXT</button>
<p id="out" class="ok" style="font-family:monospace;word-break:break-all"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const parts=['v=spf1'];
  if(document.getElementById('google').checked) parts.push('include:_spf.google.com');
  if(document.getElementById('ms').checked) parts.push('include:spf.protection.outlook.com');
  const ip=document.getElementById('ip').value.trim();
  if(ip) parts.push('ip4:'+ip);
  parts.push('~all');
  document.getElementById('out').textContent=parts.join(' ');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/dmarc-record-generator.html",
      file: "dmarc-record-generator.html",
      category: "developer",
      title: "DMARC Record Generator — DNS _dmarc TXT Record",
      desc: "Generate a DMARC TXT record for _dmarc.yourdomain. Free DNS email authentication template.",
      card: "DMARC generator",
      cardDesc: "_dmarc TXT record.",
      body: `<h1>DMARC record generator</h1>${ad}
<div class="tool-panel">
<label for="pol">Policy (p=)</label><select id="pol"><option value="none">none (monitor)</option><option value="quarantine">quarantine</option><option value="reject">reject</option></select>
<label for="rua">Aggregate reports email (rua)</label><input id="rua" type="email" placeholder="dmarc@example.com" />
<label for="pct">Percent (pct)</label><input id="pct" type="number" min="1" max="100" value="100" />
<button type="button" class="primary" id="go">Generate</button>
<p id="out" class="ok" style="font-family:monospace;word-break:break-all"></p>
<p class="prose" style="font-size:0.85rem">Host at DNS name <code>_dmarc</code> on your domain.</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let s='v=DMARC1; p='+document.getElementById('pol').value+'; pct='+document.getElementById('pct').value;
  const rua=document.getElementById('rua').value.trim();
  if(rua) s+='; rua=mailto:'+rua;
  document.getElementById('out').textContent=s;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/snake-case-converter.html",
      file: "snake-case-converter.html",
      category: "writing",
      title: "Snake Case Converter — snake_case Online",
      desc: "Convert text to snake_case for variables and file names. Free snake case converter.",
      card: "Snake case",
      cardDesc: "snake_case text.",
      body: `<h1>Snake case converter</h1>${ad}
<div class="tool-panel">
<label for="text">Text</label><textarea id="text" rows="5"></textarea>
<button type="button" class="primary" id="go">To snake_case</button>
<textarea id="out" rows="5" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=document.getElementById('text').value.trim().replace(/[^\\w\\s-]/g,' ').split(/[\\s_-]+/).filter(Boolean).map(w=>w.toLowerCase()).join('_');
  document.getElementById('out').value=s;
};
</script>`,
    },
    {
      path: "/kebab-case-converter.html",
      file: "kebab-case-converter.html",
      category: "writing",
      title: "Kebab Case Converter — kebab-case for URLs",
      desc: "Convert phrases to kebab-case for URLs and CSS classes. Free kebab case converter.",
      card: "Kebab case",
      cardDesc: "kebab-case slugs.",
      body: `<h1>Kebab case converter</h1>${ad}
<div class="tool-panel">
<label for="text">Text</label><textarea id="text" rows="5"></textarea>
<button type="button" class="primary" id="go">To kebab-case</button>
<textarea id="out" rows="5" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=document.getElementById('text').value.trim().replace(/[^\\w\\s-]/g,' ').split(/[\\s_-]+/).filter(Boolean).map(w=>w.toLowerCase()).join('-');
  document.getElementById('out').value=s;
};
</script>`,
    },
    {
      path: "/minify-css.html",
      file: "minify-css.html",
      category: "developer",
      title: "Minify CSS — Compress CSS Online",
      desc: "Minify CSS by removing comments and extra whitespace in your browser. Free CSS minifier.",
      card: "Minify CSS",
      cardDesc: "Smaller CSS output.",
      body: `<h1>Minify CSS</h1>${ad}
<div class="tool-panel">
<label for="css">CSS</label><textarea id="css" rows="10" placeholder=".btn { color: red; }"></textarea>
<button type="button" class="primary" id="go">Minify</button>
<textarea id="out" rows="8" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let c=document.getElementById('css').value;
  c=c.replace(/\\/\\*[\\s\\S]*?\\*\\//g,'');
  c=c.replace(/\\s+/g,' ').replace(/\\s*([{}:;,])\\s*/g,'$1').trim();
  document.getElementById('out').value=c;
};
</script>`,
    },
    {
      path: "/em-to-px-converter.html",
      file: "em-to-px-converter.html",
      category: "design",
      title: "EM to PX Converter — CSS em and px Units",
      desc: "Convert em to pixels and px to em using parent font size. Free CSS unit converter.",
      card: "EM to PX",
      cardDesc: "em ↔ px CSS.",
      body: `<h1>EM to PX converter</h1>${ad}
<div class="tool-panel">
<label for="base">Parent font size (px)</label><input id="base" type="number" value="16" />
<label for="em">Em</label><input id="em" type="number" step="0.001" value="1.125" />
<label for="px">Pixels</label><input id="px" type="number" step="0.1" />
</div>
<script>
const base=document.getElementById('base'), em=document.getElementById('em'), px=document.getElementById('px');
let l=false;
em.oninput=()=>{ if(l)return; l=true; px.value=em.value!==''?(em.value*base.value).toFixed(2):''; l=false; };
px.oninput=()=>{ if(l)return; l=true; em.value=px.value!==''?(px.value/base.value).toFixed(4):''; l=false; };
base.oninput=()=>em.oninput(); em.oninput();
</script>`,
    },
    {
      path: "/irr-calculator.html",
      file: "irr-calculator.html",
      category: "calculators",
      title: "IRR Calculator — Internal Rate of Return",
      desc: "Estimate IRR from initial investment and yearly cash flows. Free internal rate of return calculator.",
      card: "IRR calculator",
      cardDesc: "Internal rate of return.",
      body: `<h1>IRR calculator</h1>${ad}
<div class="tool-panel">
<label for="inv">Initial investment ($)</label><input id="inv" type="number" value="50000" />
<label for="cf">Cash inflows by year (comma-separated)</label><input id="cf" type="text" value="15000,18000,22000,25000,30000" />
<button type="button" class="primary" id="go">Calculate IRR</button>
<p id="out" class="ok"></p>
</div>
<script>
function npv(r, inv, flows){
  let n=-inv;
  flows.forEach((cf,i)=>{ n+=cf/Math.pow(1+r,i+1); });
  return n;
}
document.getElementById('go').onclick=()=>{
  const inv=+document.getElementById('inv').value;
  const flows=document.getElementById('cf').value.split(',').map(x=>+x.trim()).filter(x=>!isNaN(x));
  let lo=-0.5, hi=2, mid;
  for(let i=0;i<80;i++){
    mid=(lo+hi)/2;
    if(npv(mid,inv,flows)>0) lo=mid; else hi=mid;
  }
  document.getElementById('out').textContent='Estimated IRR: '+(mid*100).toFixed(2)+'% (iterative).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/rental-yield-calculator.html",
      file: "rental-yield-calculator.html",
      category: "calculators",
      title: "Rental Yield Calculator — Gross Yield on Property",
      desc: "Calculate gross rental yield from annual rent and property price. Free buy-to-let yield calculator.",
      card: "Rental yield",
      cardDesc: "Rent ÷ price.",
      body: `<h1>Rental yield calculator</h1>${ad}
<div class="tool-panel">
<label for="rent">Annual rent ($)</label><input id="rent" type="number" value="24000" />
<label for="price">Property price ($)</label><input id="price" type="number" value="350000" />
<button type="button" class="primary" id="go">Gross yield</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const y=(+document.getElementById('rent').value/+document.getElementById('price').value)*100;
  document.getElementById('out').textContent='Gross rental yield: '+y.toFixed(2)+'% (before expenses).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/savings-goal-calculator.html",
      file: "savings-goal-calculator.html",
      category: "calculators",
      title: "Savings Goal Calculator — Monthly Save to Reach Target",
      desc: "Calculate monthly savings needed to reach a goal with expected annual return. Free savings planner.",
      card: "Savings goal",
      cardDesc: "Monthly to hit target.",
      body: `<h1>Savings goal calculator</h1>${ad}
<div class="tool-panel">
<label for="goal">Goal amount ($)</label><input id="goal" type="number" value="50000" />
<label for="r">Expected annual return (%)</label><input id="r" type="number" step="0.1" value="5" />
<label for="y">Years to save</label><input id="y" type="number" value="5" />
<button type="button" class="primary" id="go">Monthly savings</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const fv=+document.getElementById('goal').value;
  const r=+document.getElementById('r').value/100/12;
  const n=+document.getElementById('y').value*12;
  const pmt=r? fv*r/(Math.pow(1+r,n)-1): fv/n;
  document.getElementById('out').textContent='Save about $'+pmt.toFixed(2)+'/month to reach $'+fv.toLocaleString()+'.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/mortgage-payment-calculator.html",
      file: "mortgage-payment-calculator.html",
      category: "calculators",
      title: "Mortgage Payment Calculator — Monthly P&I Payment",
      desc: "Calculate monthly mortgage principal and interest payment from loan amount, rate, and term.",
      card: "Mortgage payment",
      cardDesc: "Monthly P&amp;I.",
      body: `<h1>Mortgage payment calculator</h1>${ad}
<div class="tool-panel">
<label for="p">Loan amount ($)</label><input id="p" type="number" value="320000" />
<label for="rate">Annual interest rate (%)</label><input id="rate" type="number" step="0.001" value="6.5" />
<label for="yr">Term (years)</label><input id="yr" type="number" value="30" />
<button type="button" class="primary" id="go">Monthly payment</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=+document.getElementById('p').value;
  const r=+document.getElementById('rate').value/100/12;
  const n=+document.getElementById('yr').value*12;
  const m=r? P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1): P/n;
  document.getElementById('out').textContent='Monthly P&I: $'+m.toFixed(2)+' (excludes tax, insurance, HOA).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/rent-vs-buy-calculator.html",
      file: "rent-vs-buy-calculator.html",
      category: "calculators",
      title: "Rent vs Buy Calculator — Simple 5-Year Comparison",
      desc: "Compare rough 5-year cost of renting vs buying with down payment and mortgage. Illustration only.",
      card: "Rent vs buy",
      cardDesc: "5-year cost sketch.",
      body: `<h1>Rent vs buy calculator</h1>${ad}
<div class="tool-panel">
<label for="rent">Monthly rent ($)</label><input id="rent" type="number" value="2200" />
<label for="price">Home price ($)</label><input id="price" type="number" value="450000" />
<label for="down">Down payment (%)</label><input id="down" type="number" value="20" />
<label for="rate">Mortgage rate (%)</label><input id="rate" type="number" step="0.01" value="6.5" />
<button type="button" class="primary" id="go">Compare 5 years</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const rent=+document.getElementById('rent').value*60;
  const price=+document.getElementById('price').value;
  const loan=price*(1-(+document.getElementById('down').value/100));
  const r=+document.getElementById('rate').value/100/12;
  const n=360;
  const m=r? loan*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1): loan/n;
  const buy=price*(+document.getElementById('down').value/100)+m*60;
  const diff=buy-rent;
  document.getElementById('out').textContent='5y rent ~$'+rent.toFixed(0)+' · 5y buy cash out ~$'+buy.toFixed(0)+' (down + 60 payments, no equity/sale). Difference ~$'+diff.toFixed(0)+'.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/fence-calculator.html",
      file: "fence-calculator.html",
      category: "calculators",
      title: "Fence Calculator — Posts Needed for Fence Length",
      desc: "Estimate fence posts and sections from total length and post spacing. Free fence planning calculator.",
      card: "Fence calculator",
      cardDesc: "Posts & sections.",
      body: `<h1>Fence calculator</h1>${ad}
<div class="tool-panel">
<label for="len">Fence length (ft)</label><input id="len" type="number" value="120" />
<label for="space">Post spacing (ft)</label><input id="space" type="number" value="8" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const L=+document.getElementById('len').value, s=+document.getElementById('space').value;
  const posts=Math.ceil(L/s)+1;
  const sections=posts-1;
  document.getElementById('out').textContent=posts+' posts · '+sections+' sections (8 ft panels assumed between posts).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/deck-calculator.html",
      file: "deck-calculator.html",
      category: "calculators",
      title: "Deck Board Calculator — Decking Boards Needed",
      desc: "Estimate deck boards from area, board width, and waste percent. Free decking material calculator.",
      card: "Deck boards",
      cardDesc: "Boards for deck area.",
      body: `<h1>Deck board calculator</h1>${ad}
<div class="tool-panel">
<label for="sq">Deck area (sq ft)</label><input id="sq" type="number" value="200" />
<label for="w">Board width (in)</label><input id="w" type="number" step="0.25" value="5.5" />
<label for="len">Board length (ft)</label><input id="len" type="number" value="12" />
<label for="gap">Waste (%)</label><input id="gap" type="number" value="10" />
<button type="button" class="primary" id="go">Board count</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const sq=+document.getElementById('sq').value*(1+(+document.getElementById('gap').value/100));
  const cov=(+document.getElementById('w').value/12)*(+document.getElementById('len').value);
  document.getElementById('out').textContent='About '+Math.ceil(sq/cov)+' boards ('+document.getElementById('len').value+' ft lengths).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/stair-calculator.html",
      file: "stair-calculator.html",
      category: "calculators",
      title: "Stair Calculator — Risers and Tread Count",
      desc: "Calculate number of stair risers from total rise and target riser height. Free stair rise calculator.",
      card: "Stair calculator",
      cardDesc: "Risers & treads.",
      body: `<h1>Stair calculator</h1>${ad}
<div class="tool-panel">
<label for="rise">Total rise (in)</label><input id="rise" type="number" value="108" />
<label for="r">Target riser height (in)</label><input id="r" type="number" step="0.125" value="7.5" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const total=+document.getElementById('rise').value;
  const n=Math.round(total/+document.getElementById('r').value);
  const actual=total/n;
  document.getElementById('out').textContent=n+' risers · actual riser height '+actual.toFixed(2)+' in · '+ (n-1)+' treads (typical).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/roof-pitch-calculator.html",
      file: "roof-pitch-calculator.html",
      category: "calculators",
      title: "Roof Pitch Calculator — Rise Run to Angle & Factor",
      desc: "Convert roof pitch rise and run to angle and pitch multiplier for area. Free roof pitch tool.",
      card: "Roof pitch",
      cardDesc: "Angle & multiplier.",
      body: `<h1>Roof pitch calculator</h1>${ad}
<div class="tool-panel">
<label for="rise">Rise (in per 12 in run)</label><input id="rise" type="number" step="0.5" value="6" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const rise=+document.getElementById('rise').value;
  const rad=Math.atan(rise/12);
  const deg=rad*180/Math.PI;
  const factor=1/Math.cos(rad);
  document.getElementById('out').textContent='Pitch '+rise+':12 · '+deg.toFixed(1)+'° · area factor ×'+factor.toFixed(3)+' vs flat footprint.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/drywall-calculator.html",
      file: "drywall-calculator.html",
      category: "calculators",
      title: "Drywall Calculator — 4×8 Sheets for Wall Area",
      desc: "Estimate 4×8 drywall sheets from wall square footage and waste. Free sheetrock calculator.",
      card: "Drywall sheets",
      cardDesc: "4×8 sheet count.",
      body: `<h1>Drywall calculator</h1>${ad}
<div class="tool-panel">
<label for="sq">Wall area (sq ft)</label><input id="sq" type="number" value="800" />
<label for="w">Waste (%)</label><input id="w" type="number" value="10" />
<button type="button" class="primary" id="go">Sheets needed</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const sheets=Math.ceil((+document.getElementById('sq').value*(1+(+document.getElementById('w').value/100)))/32);
  document.getElementById('out').textContent='About '+sheets+' sheets of 4×8 (32 sq ft each).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/board-feet-calculator.html",
      file: "board-feet-calculator.html",
      category: "calculators",
      title: "Board Feet Calculator — Lumber Board Footage",
      desc: "Calculate board feet from thickness, width, and length in inches. Free lumber calculator.",
      card: "Board feet",
      cardDesc: "Lumber volume.",
      body: `<h1>Board feet calculator</h1>${ad}
<div class="tool-panel">
<label for="t">Thickness (in)</label><input id="t" type="number" step="0.25" value="2" />
<label for="w">Width (in)</label><input id="w" type="number" step="0.25" value="6" />
<label for="l">Length (ft)</label><input id="l" type="number" value="10" />
<label for="n">Number of pieces</label><input id="n" type="number" value="1" />
<button type="button" class="primary" id="go">Board feet</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const bf=(+document.getElementById('t').value*+document.getElementById('w').value*(+document.getElementById('l').value*12))/144*+document.getElementById('n').value;
  document.getElementById('out').textContent=bf.toFixed(2)+' board feet total.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/horsepower-calculator.html",
      file: "horsepower-calculator.html",
      category: "calculators",
      title: "Horsepower Calculator — Torque and RPM to HP",
      desc: "Calculate horsepower from torque (lb-ft) and RPM. Free engine HP estimator.",
      card: "Horsepower",
      cardDesc: "Torque × RPM.",
      body: `<h1>Horsepower calculator</h1>${ad}
<div class="tool-panel">
<label for="tq">Torque (lb-ft)</label><input id="tq" type="number" value="250" />
<label for="rpm">RPM</label><input id="rpm" type="number" value="5500" />
<button type="button" class="primary" id="go">HP</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const hp=(+document.getElementById('tq').value*+document.getElementById('rpm').value)/5252;
  document.getElementById('out').textContent='Estimated horsepower: '+hp.toFixed(1)+' hp';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/nautical-mile-converter.html",
      file: "nautical-mile-converter.html",
      category: "calculators",
      title: "Nautical Mile Converter — NM to Miles and KM",
      desc: "Convert nautical miles to statute miles and kilometers. Free marine distance converter.",
      card: "Nautical miles",
      cardDesc: "NM ↔ mi / km.",
      body: `<h1>Nautical mile converter</h1>${ad}
<div class="tool-panel">
<label for="nm">Nautical miles</label><input id="nm" type="number" step="0.01" value="10" />
<label for="mi">Statute miles</label><input id="mi" type="number" step="0.01" />
<label for="km">Kilometers</label><input id="km" type="number" step="0.01" />
</div>
<script>
const nm=document.getElementById('nm'), mi=document.getElementById('mi'), km=document.getElementById('km');
let l=false;
nm.oninput=()=>{ if(l)return; l=true; mi.value=nm.value!==''?(nm.value*1.15078).toFixed(3):''; km.value=nm.value!==''?(nm.value*1.852).toFixed(3):''; l=false; };
mi.oninput=()=>{ if(l)return; l=true; nm.value=mi.value!==''?(mi.value/1.15078).toFixed(4):''; km.value=nm.value!==''?(nm.value*1.852).toFixed(3):''; l=false; };
km.oninput=()=>{ if(l)return; l=true; nm.value=km.value!==''?(km.value/1.852).toFixed(4):''; mi.value=nm.value!==''?(nm.value*1.15078).toFixed(3):''; l=false; };
nm.oninput();
</script>`,
    },
    {
      path: "/sample-size-calculator.html",
      file: "sample-size-calculator.html",
      category: "calculators",
      title: "Sample Size Calculator — Survey Sample for Proportion",
      desc: "Estimate survey sample size for a proportion with margin of error. Free statistics sample calculator.",
      card: "Sample size",
      cardDesc: "Survey n for MOE.",
      body: `<h1>Sample size calculator</h1>${ad}
<div class="tool-panel">
<label for="p">Expected proportion (0–1, use 0.5 if unsure)</label><input id="p" type="number" step="0.01" min="0.01" max="0.99" value="0.5" />
<label for="moe">Margin of error (e.g. 0.05 = ±5%)</label><input id="moe" type="number" step="0.01" value="0.05" />
<label for="z">Z-score (1.96 = 95%)</label><input id="z" type="number" step="0.01" value="1.96" />
<button type="button" class="primary" id="go">Sample size n</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=+document.getElementById('p').value, e=+document.getElementById('moe').value, z=+document.getElementById('z').value;
  const n=Math.ceil(z*z*p*(1-p)/(e*e));
  document.getElementById('out').textContent='Minimum sample size ≈ '+n+' (simple random sample, no finite correction).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/molarity-calculator.html",
      file: "molarity-calculator.html",
      category: "calculators",
      title: "Molarity Calculator — Moles per Liter from Mass",
      desc: "Calculate molarity (M) from solute mass, molar mass, and solution volume. Free chemistry calculator.",
      card: "Molarity (M)",
      cardDesc: "Mass → mol/L.",
      body: `<h1>Molarity calculator</h1>${ad}
<div class="tool-panel">
<label for="mass">Mass of solute (g)</label><input id="mass" type="number" step="any" value="58.44" />
<label for="mw">Molar mass (g/mol)</label><input id="mw" type="number" step="any" value="58.44" />
<label for="vol">Solution volume (L)</label><input id="vol" type="number" step="any" value="1" />
<button type="button" class="primary" id="go">Molarity</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const M=(+document.getElementById('mass').value/+document.getElementById('mw').value)/+document.getElementById('vol').value;
  document.getElementById('out').textContent='Molarity = '+M.toFixed(4)+' M';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/led-resistor-calculator.html",
      file: "led-resistor-calculator.html",
      category: "calculators",
      title: "LED Resistor Calculator — Series Resistor Value",
      desc: "Calculate series resistor for LED from supply voltage, forward voltage, and current.",
      card: "LED resistor",
      cardDesc: "Ohms for LED.",
      body: `<h1>LED resistor calculator</h1>${ad}
<div class="tool-panel">
<label for="vs">Supply voltage (V)</label><input id="vs" type="number" step="0.1" value="5" />
<label for="vf">LED forward voltage (V)</label><input id="vf" type="number" step="0.1" value="2" />
<label for="ma">LED current (mA)</label><input id="ma" type="number" value="20" />
<button type="button" class="primary" id="go">Resistor</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const I=+document.getElementById('ma').value/1000;
  const R=(+document.getElementById('vs').value-+document.getElementById('vf').value)/I;
  const P=I*I*R;
  document.getElementById('out').textContent='Resistor ≈ '+Math.round(R)+' Ω · use ≥'+(P*2).toFixed(2)+' W rated (2× headroom).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/voltage-divider-calculator.html",
      file: "voltage-divider-calculator.html",
      category: "calculators",
      title: "Voltage Divider Calculator — Output Voltage from Resistors",
      desc: "Calculate output voltage of a resistive voltage divider. Free electronics calculator.",
      card: "Voltage divider",
      cardDesc: "Vout from R1 R2.",
      body: `<h1>Voltage divider calculator</h1>${ad}
<div class="tool-panel">
<label for="vin">Input voltage Vin (V)</label><input id="vin" type="number" step="any" value="12" />
<label for="r1">R1 (Ω) top</label><input id="r1" type="number" value="10000" />
<label for="r2">R2 (Ω) bottom</label><input id="r2" type="number" value="10000" />
<button type="button" class="primary" id="go">Vout</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const r1=+document.getElementById('r1').value, r2=+document.getElementById('r2').value;
  const vout=+document.getElementById('vin').value*r2/(r1+r2);
  document.getElementById('out').textContent='Vout = '+vout.toFixed(4)+' V';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/shoe-size-converter.html",
      file: "shoe-size-converter.html",
      category: "calculators",
      title: "Shoe Size Converter — US UK EU Men's Sizes",
      desc: "Convert men's shoe sizes between US, UK, and EU scales. Approximate sizing—try shoes on when possible.",
      card: "Shoe size",
      cardDesc: "US · UK · EU.",
      body: `<h1>Shoe size converter (men's)</h1>${ad}
<div class="tool-panel">
<label for="us">US size</label><input id="us" type="number" step="0.5" value="10" />
<label for="uk">UK size</label><input id="uk" type="number" step="0.5" />
<label for="eu">EU size</label><input id="eu" type="number" step="0.5" />
<p class="prose" style="font-size:0.85rem">Approximate: EU ≈ US + 33, UK ≈ US − 1</p>
</div>
<script>
const us=document.getElementById('us'), uk=document.getElementById('uk'), eu=document.getElementById('eu');
let l=false;
us.oninput=()=>{ if(l)return; l=true; uk.value=us.value!==''?(+us.value-1).toFixed(1):''; eu.value=us.value!==''?(+us.value+33).toFixed(0):''; l=false; };
uk.oninput=()=>{ if(l)return; l=true; us.value=uk.value!==''?(+uk.value+1).toFixed(1):''; eu.value=us.value!==''?(+us.value+33).toFixed(0):''; l=false; };
eu.oninput=()=>{ if(l)return; l=true; us.value=eu.value!==''?(+eu.value-33).toFixed(1):''; uk.value=us.value!==''?(+us.value-1).toFixed(1):''; l=false; };
us.oninput();
</script>`,
    },
    {
      path: "/golden-ratio-calculator.html",
      file: "golden-ratio-calculator.html",
      category: "design",
      title: "Golden Ratio Calculator — Divide a Line φ (1.618)",
      desc: "Split a length into golden ratio segments. Free φ proportion calculator for design.",
      card: "Golden ratio",
      cardDesc: "φ segment split.",
      body: `<h1>Golden ratio calculator</h1>${ad}
<div class="tool-panel">
<label for="len">Total length</label><input id="len" type="number" value="1000" />
<button type="button" class="primary" id="go">Split</button>
<p id="out" class="ok"></p>
</div>
<script>
const PHI=(1+Math.sqrt(5))/2;
document.getElementById('go').onclick=()=>{
  const L=+document.getElementById('len').value;
  const a=L/PHI, b=L-a;
  document.getElementById('out').textContent='Long segment: '+a.toFixed(3)+' · short: '+b.toFixed(3)+' (ratio ≈ '+PHI.toFixed(4)+').';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/marathon-pace-calculator.html",
      file: "marathon-pace-calculator.html",
      category: "calculators",
      title: "Marathon Pace Calculator — Min per Mile from Finish Time",
      desc: "Calculate marathon pace in minutes per mile from goal finish time. Free running pace calculator.",
      card: "Marathon pace",
      cardDesc: "Min/mile from time.",
      body: `<h1>Marathon pace calculator</h1>${ad}
<div class="tool-panel">
<label for="h">Hours</label><input id="h" type="number" value="4" />
<label for="m">Minutes</label><input id="m" type="number" value="0" />
<label for="dist">Distance (miles)</label><input id="dist" type="number" step="0.1" value="26.2" />
<button type="button" class="primary" id="go">Pace</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const min=(+document.getElementById('h').value*60)+(+document.getElementById('m').value);
  const pace=min/+document.getElementById('dist').value;
  const pm=Math.floor(pace);
  const ps=Math.round((pace-pm)*60);
  document.getElementById('out').textContent='Pace: '+pm+':'+String(ps).padStart(2,'0')+' min/mile ('+pace.toFixed(2)+' min/mi).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/heart-rate-zone-calculator.html",
      file: "heart-rate-zone-calculator.html",
      category: "calculators",
      title: "Heart Rate Zone Calculator — Max HR and Training Zones",
      desc: "Estimate max heart rate from age and show simple training zones. Not medical advice.",
      card: "HR zones",
      cardDesc: "Max HR by age.",
      body: `<h1>Heart rate zone calculator</h1>${ad}
<div class="tool-panel">
<label for="age">Age</label><input id="age" type="number" value="35" />
<button type="button" class="primary" id="go">Zones</button>
<p id="out" class="ok" style="white-space:pre-line"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const max=220-(+document.getElementById('age').value);
  const z=(lo,hi,p)=>Math.round(max*lo)+'–'+Math.round(max*hi)+' bpm ('+p+'%)';
  document.getElementById('out').textContent='Est. max HR: '+max+' bpm\\nZone 1 (easy): '+z(0.5,0.6,'50–60')+'\\nZone 2 (aerobic): '+z(0.6,0.7,'60–70')+'\\nZone 3 (tempo): '+z(0.7,0.8,'70–80')+'\\nZone 4 (hard): '+z(0.8,0.9,'80–90');
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
