/** Tenth batch of useful tools. */
export function batch10Tools(ad) {
  return [
    {
      path: "/haversine-distance.html",
      file: "haversine-distance.html",
      category: "calculators",
      title: "Haversine Distance — km Between Coordinates",
      desc: "Great-circle distance between two latitude/longitude points.",
      card: "GPS distance",
      cardDesc: "Lat/long km.",
      body: `
<h1>Haversine distance</h1>${ad}
<div class="tool-panel">
  <label>Point A lat <input id="lat1" type="number" step="any" value="28.6139" /> lon <input id="lon1" type="number" step="any" value="77.209" /></label>
  <label>Point B lat <input id="lat2" type="number" step="any" value="19.076" /> lon <input id="lon2" type="number" step="any" value="72.8777" /></label>
  <button type="button" class="primary" id="go">Distance</button>
  <p id="out" class="ok"></p>
</div>
<script>
const R=6371;
function rad(d){ return d*Math.PI/180; }
document.getElementById('go').onclick=()=>{
  const a1=+document.getElementById('lat1').value, o1=+document.getElementById('lon1').value;
  const a2=+document.getElementById('lat2').value, o2=+document.getElementById('lon2').value;
  const dLat=rad(a2-a1), dLon=rad(o2-o1);
  const x=Math.sin(dLat/2)**2+Math.cos(rad(a1))*Math.cos(rad(a2))*Math.sin(dLon/2)**2;
  const km=2*R*Math.asin(Math.sqrt(x));
  document.getElementById('out').textContent=km.toFixed(2)+' km ('+(km*0.621371).toFixed(2)+' mi)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/dms-to-decimal.html",
      file: "dms-to-decimal.html",
      category: "calculators",
      title: "DMS to Decimal Degrees Converter",
      desc: "Convert degrees, minutes, seconds to decimal latitude or longitude.",
      card: "DMS → decimal",
      cardDesc: "Coordinate convert.",
      body: `
<h1>DMS to decimal</h1>${ad}
<div class="tool-panel">
  <label>D° <input id="d" type="number" value="28" /> M' <input id="m" type="number" value="36" /> S" <input id="s" type="number" step="any" value="50" /></label>
  <label><select id="hem"><option value="1">N / E</option><option value="-1">S / W</option></select></label>
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const d=+document.getElementById('d').value, m=+document.getElementById('m').value, s=+document.getElementById('s').value;
  const h=+document.getElementById('hem').value;
  const dec=h*(d+m/60+s/3600);
  document.getElementById('out').textContent=dec.toFixed(6)+'°';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/google-maps-link.html",
      file: "google-maps-link.html",
      category: "productivity",
      title: "Google Maps Link Generator — Lat Long",
      desc: "Build a Google Maps URL from coordinates or a place query.",
      card: "Maps link",
      cardDesc: "Share location URL.",
      body: `
<h1>Google Maps link</h1>${ad}
<div class="tool-panel">
  <label for="q">Place or address</label><input id="q" placeholder="India Gate, Delhi" />
  <label for="lat">Or lat</label><input id="lat" type="number" step="any" placeholder="28.6129" />
  <label for="lng">lng</label><input id="lng" type="number" step="any" placeholder="77.2295" />
  <button type="button" class="primary" id="go">Generate</button>
  <input id="url" readonly spellcheck="false" />
  <button type="button" class="primary" id="copy">Copy</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const q=document.getElementById('q').value.trim();
  const lat=document.getElementById('lat').value, lng=document.getElementById('lng').value;
  let u;
  if(lat!==''&&lng!=='') u='https://www.google.com/maps?q='+encodeURIComponent(lat+','+lng);
  else if(q) u='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);
  else return;
  document.getElementById('url').value=u;
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('url').value);
</script>`,
    },
    {
      path: "/churn-rate-calculator.html",
      file: "churn-rate-calculator.html",
      category: "seo",
      title: "Churn Rate Calculator — Customer Churn %",
      desc: "Calculate monthly or period churn from customers lost and starting base.",
      card: "Churn rate",
      cardDesc: "Lost ÷ base %.",
      body: `
<h1>Churn rate</h1>${ad}
<div class="tool-panel">
  <label for="lost">Customers lost</label><input id="lost" type="number" value="50" />
  <label for="start">Customers at start</label><input id="start" type="number" value="1000" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const l=+document.getElementById('lost').value, s=+document.getElementById('start').value;
  document.getElementById('out').textContent=s?('Churn = '+(100*l/s).toFixed(2)+'%'):'—';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/nps-calculator.html",
      file: "nps-calculator.html",
      category: "seo",
      title: "NPS Calculator — Net Promoter Score",
      desc: "Compute NPS from counts of promoters, passives, and detractors.",
      card: "NPS calculator",
      cardDesc: "0–10 survey score.",
      body: `
<h1>NPS calculator</h1>${ad}
<div class="tool-panel">
  <label for="p">Promoters (9–10)</label><input id="p" type="number" value="60" />
  <label for="pa">Passives (7–8)</label><input id="pa" type="number" value="25" />
  <label for="d">Detractors (0–6)</label><input id="d" type="number" value="15" />
  <button type="button" class="primary" id="go">NPS</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=+document.getElementById('p').value, pa=+document.getElementById('pa').value, d=+document.getElementById('d').value;
  const t=p+pa+d;
  const nps=t?Math.round(100*(p/t)-100*(d/t)):0;
  document.getElementById('out').textContent='NPS = '+nps;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/payback-period.html",
      file: "payback-period.html",
      category: "calculators",
      title: "Payback Period Calculator — Simple Payback",
      desc: "Years to recover an investment from equal annual cash inflows.",
      card: "Payback period",
      cardDesc: "Investment recovery.",
      body: `
<h1>Payback period</h1>${ad}
<div class="tool-panel">
  <label for="inv">Initial investment</label><input id="inv" type="number" value="100000" />
  <label for="cash">Annual cash inflow</label><input id="cash" type="number" value="25000" />
  <button type="button" class="primary" id="go">Payback</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const inv=+document.getElementById('inv').value, c=+document.getElementById('cash').value;
  document.getElementById('out').textContent=c>0?('≈ '+(inv/c).toFixed(2)+' years'):'Enter positive inflow';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/effective-interest-rate.html",
      file: "effective-interest-rate.html",
      category: "calculators",
      title: "Effective Annual Rate (EAR) Calculator",
      desc: "Convert nominal annual rate and compounding periods to effective rate.",
      card: "Effective rate",
      cardDesc: "EAR from APR.",
      body: `
<h1>Effective annual rate</h1>${ad}
<div class="tool-panel">
  <label for="nom">Nominal rate (%)</label><input id="nom" type="number" step="0.01" value="12" />
  <label for="n">Compounds per year</label><input id="n" type="number" value="12" />
  <button type="button" class="primary" id="go">EAR</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const r=+document.getElementById('nom').value/100, n=+document.getElementById('n').value;
  const ear=(Math.pow(1+r/n,n)-1)*100;
  document.getElementById('out').textContent='EAR = '+ear.toFixed(4)+'%';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/rent-affordability.html",
      file: "rent-affordability.html",
      category: "calculators",
      title: "Rent Affordability — 30% Rule",
      desc: "Suggested max rent from monthly income using the 30% guideline.",
      card: "Rent affordability",
      cardDesc: "30% of income.",
      body: `
<h1>Rent affordability</h1>${ad}
<div class="tool-panel">
  <label for="inc">Monthly gross income</label><input id="inc" type="number" value="80000" />
  <label for="pct">Max % for housing</label><input id="pct" type="number" value="30" />
  <button type="button" class="primary" id="go">Max rent</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const inc=+document.getElementById('inc').value, pct=+document.getElementById('pct').value;
  document.getElementById('out').textContent='Suggested max rent: '+(inc*pct/100).toLocaleString(undefined,{maximumFractionDigits:0});
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/ppf-calculator.html",
      file: "ppf-calculator.html",
      category: "india",
      title: "PPF Maturity Calculator India — 15 Year Estimate",
      desc: "Estimate Public Provident Fund maturity with fixed annual deposit (simplified).",
      card: "PPF calculator",
      cardDesc: "India PPF estimate.",
      body: `
<h1>PPF calculator (India)</h1>${ad}
<div class="tool-panel">
  <label for="y">Annual deposit (₹)</label><input id="y" type="number" value="150000" />
  <label for="r">Interest rate (% p.a.)</label><input id="r" type="number" step="0.1" value="7.1" />
  <label for="t">Years</label><input id="t" type="number" value="15" />
  <button type="button" class="primary" id="go">Maturity</button>
  <p id="out" class="ok"></p>
  <p class="prose" style="font-size:0.85rem">Annual compounding illustration—not official bank quote.</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=+document.getElementById('y').value, r=+document.getElementById('r').value/100, t=+document.getElementById('t').value;
  let bal=0;
  for(let i=0;i<t;i++){ bal=(bal+P)*(1+r); }
  document.getElementById('out').textContent='≈ ₹'+Math.round(bal).toLocaleString('en-IN')+' after '+t+' years';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/prime-factorization.html",
      file: "prime-factorization.html",
      category: "calculators",
      title: "Prime Factorization Calculator",
      desc: "Factor a positive integer into prime factors.",
      card: "Prime factors",
      cardDesc: "Factor integer.",
      body: `
<h1>Prime factorization</h1>${ad}
<div class="tool-panel">
  <label for="n">Number</label><input id="n" type="number" value="360" min="2" />
  <button type="button" class="primary" id="go">Factor</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let n=Math.floor(+document.getElementById('n').value);
  if(n<2){ document.getElementById('out').textContent='Enter n ≥ 2'; return; }
  const f=[]; let d=2;
  while(d*d<=n){
    while(n%d===0){ f.push(d); n/=d; }
    d+=d===2?1:2;
  }
  if(n>1) f.push(n);
  document.getElementById('out').textContent=f.join(' × ');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/number-to-words.html",
      file: "number-to-words.html",
      category: "writing",
      title: "Number to Words — English",
      desc: "Convert integers to English words (e.g. 1234 → one thousand…).",
      card: "Number to words",
      cardDesc: "English spelling.",
      body: `
<h1>Number to words</h1>${ad}
<div class="tool-panel">
  <label for="n">Number</label><input id="n" type="number" value="1234567" />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
const ones=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
function chunk(n){
  if(n<20) return ones[n];
  if(n<100) return tens[Math.floor(n/10)]+(n%10?'-'+ones[n%10]:'');
  if(n<1000) return ones[Math.floor(n/100)]+' hundred'+(n%100?' '+chunk(n%100):'');
  return '';
}
function words(n){
  if(n===0) return 'zero';
  if(n<0) return 'minus '+words(-n);
  const parts=[];
  const b=[[' billion',1e9],[' million',1e6],[' thousand',1e3]];
  for(const [name, div] of b){
    const q=Math.floor(n/div);
    if(q){ parts.push(chunk(q)+name); n%=div; }
  }
  if(n) parts.push(chunk(n));
  return parts.join(' ').replace(/\\s+/g,' ').trim();
}
document.getElementById('go').onclick=()=>{
  const n=Math.floor(+document.getElementById('n').value);
  document.getElementById('out').textContent=words(n);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/leetspeak-converter.html",
      file: "leetspeak-converter.html",
      category: "writing",
      title: "Leetspeak Converter",
      desc: "Convert text to simple leetspeak (1337) substitutions.",
      card: "Leetspeak",
      cardDesc: "1337 text.",
      body: `
<h1>Leetspeak converter</h1>${ad}
<div class="tool-panel">
  <textarea id="text">Hello</textarea>
  <button type="button" class="primary" id="go">Leet</button>
  <textarea id="out" readonly></textarea>
</div>
<script>
const map={a:'4',e:'3',i:'1',o:'0',s:'5',t:'7',l:'1'};
document.getElementById('go').onclick=()=>{
  document.getElementById('out').value=document.getElementById('text').value.replace(/[aeiostl]/gi,c=>map[c.toLowerCase()]||c);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/levenshtein-distance.html",
      file: "levenshtein-distance.html",
      category: "developer",
      title: "Levenshtein Distance Calculator",
      desc: "Edit distance between two strings.",
      card: "Levenshtein",
      cardDesc: "String edit distance.",
      body: `
<h1>Levenshtein distance</h1>${ad}
<div class="tool-panel">
  <input id="a" value="kitten" spellcheck="false" />
  <input id="b" value="sitting" spellcheck="false" />
  <button type="button" class="primary" id="go">Distance</button>
  <p id="out" class="ok"></p>
</div>
<script>
function lev(a,b){
  const m=a.length,n=b.length;
  const dp=Array.from({length:m+1},(_,i)=>Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i;
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++)
    for(let j=1;j<=n;j++){
      const c=a[i-1]===b[j-1]?0:1;
      dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+c);
    }
  return dp[m][n];
}
document.getElementById('go').onclick=()=>{
  document.getElementById('out').textContent='Distance: '+lev(document.getElementById('a').value,document.getElementById('b').value);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/extract-phone-numbers.html",
      file: "extract-phone-numbers.html",
      category: "writing",
      title: "Extract Phone Numbers from Text",
      desc: "Find phone-like number sequences in pasted text.",
      card: "Extract phones",
      cardDesc: "Regex extract.",
      body: `
<h1>Extract phone numbers</h1>${ad}
<div class="tool-panel">
  <textarea id="text" rows="6">Call +91 98765 43210 or (555) 123-4567</textarea>
  <button type="button" class="primary" id="go">Extract</button>
  <textarea id="out" rows="4" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const re=/(?:\\+?\\d{1,3}[\\s.-]?)?(?:\\(\\d{2,4}\\)|\\d{2,4})[\\s.-]?\\d{3,4}[\\s.-]?\\d{3,4}\\b/g;
  const m=document.getElementById('text').value.match(re)||[];
  document.getElementById('out').value=[...new Set(m)].join('\\n');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/sql-string-escape.html",
      file: "sql-string-escape.html",
      category: "developer",
      title: "SQL String Escape — Single Quotes",
      desc: "Escape single quotes for SQL string literals.",
      card: "SQL escape",
      cardDesc: "Quote doubling.",
      body: `
<h1>SQL string escape</h1>${ad}
<div class="tool-panel">
  <textarea id="text">O'Brien's data</textarea>
  <button type="button" class="primary" id="go">Escape</button>
  <textarea id="out" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  document.getElementById('out').value=document.getElementById('text').value.replace(/'/g,"''");
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/semver-compare.html",
      file: "semver-compare.html",
      category: "developer",
      title: "Semver Compare — Version Ordering",
      desc: "Compare two semantic version strings.",
      card: "Semver compare",
      cardDesc: "Which version is newer.",
      body: `
<h1>Semver compare</h1>${ad}
<div class="tool-panel">
  <input id="a" value="1.10.0" spellcheck="false" />
  <input id="b" value="1.9.0" spellcheck="false" />
  <button type="button" class="primary" id="go">Compare</button>
  <p id="out" class="ok"></p>
</div>
<script>
function parse(v){
  const m=v.trim().match(/^(\\d+)\\.(\\d+)\\.(\\d+)/);
  if(!m) throw new Error('use major.minor.patch');
  return m.slice(1,4).map(Number);
}
document.getElementById('go').onclick=()=>{
  try{
    const a=parse(document.getElementById('a').value), b=parse(document.getElementById('b').value);
    for(let i=0;i<3;i++){
      if(a[i]>b[i]) return document.getElementById('out').textContent='A is greater';
      if(a[i]<b[i]) return document.getElementById('out').textContent='B is greater';
    }
    document.getElementById('out').textContent='Versions are equal';
  }catch(e){ document.getElementById('out').textContent=e.message; }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/netmask-to-cidr.html",
      file: "netmask-to-cidr.html",
      category: "developer",
      title: "Subnet Mask to CIDR Prefix",
      desc: "Convert dotted subnet mask to CIDR prefix length.",
      card: "Mask → CIDR",
      cardDesc: "Prefix length.",
      body: `
<h1>Netmask to CIDR</h1>${ad}
<div class="tool-panel">
  <label for="mask">Subnet mask</label><input id="mask" value="255.255.255.0" spellcheck="false" />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=document.getElementById('mask').value.trim().split('.').map(Number);
  if(p.length!==4||p.some(x=>x<0||x>255)) { document.getElementById('out').textContent='Invalid mask'; return; }
  const bits=p.map(o=>(o>>>0).toString(2).padStart(8,'0')).join('');
  if(!/^1*0*$/.test(bits)) { document.getElementById('out').textContent='Not a valid netmask'; return; }
  document.getElementById('out').textContent='/'+bits.replace(/0/g,'').length;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/mbps-to-mbs.html",
      file: "mbps-to-mbs.html",
      category: "developer",
      title: "Mbps to MB/s Converter — Download Speed",
      desc: "Convert megabits per second to megabytes per second.",
      card: "Mbps → MB/s",
      cardDesc: "Speed units.",
      body: `
<h1>Mbps to MB/s</h1>${ad}
<div class="tool-panel">
  <label for="mbps">Mbps</label><input id="mbps" type="number" value="100" />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=+document.getElementById('mbps').value;
  document.getElementById('out').textContent=(v/8).toFixed(3)+' MB/s';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/json-minifier.html",
      file: "json-minifier.html",
      category: "developer",
      title: "JSON Minifier — Compact JSON",
      desc: "Minify JSON by removing whitespace.",
      card: "JSON minify",
      cardDesc: "Compact JSON.",
      body: `
<h1>JSON minifier</h1>${ad}
<div class="tool-panel">
  <textarea id="json" rows="8" spellcheck="false">{
  "hello": "world"
}</textarea>
  <button type="button" class="primary" id="go">Minify</button>
  <p id="msg" class="error" hidden></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  document.getElementById('msg').hidden=true;
  try{
    document.getElementById('json').value=JSON.stringify(JSON.parse(document.getElementById('json').value));
  }catch(e){
    document.getElementById('msg').textContent=e.message;
    document.getElementById('msg').hidden=false;
  }
};
</script>`,
    },
    {
      path: "/sha1-hash.html",
      file: "sha1-hash.html",
      category: "developer",
      title: "SHA-1 Hash Generator",
      desc: "Compute SHA-1 hex digest of text in the browser.",
      card: "SHA-1 hash",
      cardDesc: "Web Crypto SHA-1.",
      body: `
<h1>SHA-1 hash</h1>${ad}
<div class="tool-panel">
  <textarea id="text">hello</textarea>
  <button type="button" class="primary" id="go">Hash</button>
  <input id="out" readonly spellcheck="false" />
</div>
<script>
document.getElementById('go').onclick=async()=>{
  const buf=await crypto.subtle.digest('SHA-1', new TextEncoder().encode(document.getElementById('text').value));
  document.getElementById('out').value=[...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/telegram-link.html",
      file: "telegram-link.html",
      category: "productivity",
      title: "Telegram Link Generator — t.me",
      desc: "Build a Telegram share or channel link.",
      card: "Telegram link",
      cardDesc: "t.me URL builder.",
      body: `
<h1>Telegram link</h1>${ad}
<div class="tool-panel">
  <label for="user">Username (no @)</label><input id="user" placeholder="durov" autocapitalize="none" />
  <label for="msg">Optional start message</label><input id="msg" placeholder="Hello" />
  <button type="button" class="primary" id="go">Generate</button>
  <input id="url" readonly />
  <button type="button" class="primary" id="copy">Copy</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const u=document.getElementById('user').value.trim().replace(/^@/,'');
  const m=document.getElementById('msg').value.trim();
  let url='https://t.me/'+encodeURIComponent(u);
  if(m) url+='?text='+encodeURIComponent(m);
  document.getElementById('url').value=url;
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('url').value);
</script>`,
    },
    {
      path: "/twitter-intent.html",
      file: "twitter-intent.html",
      category: "seo",
      title: "Twitter/X Intent Link Generator",
      desc: "Create a tweet intent URL with text and optional URL.",
      card: "Tweet intent",
      cardDesc: "Share on X.",
      body: `
<h1>Twitter / X intent link</h1>${ad}
<div class="tool-panel">
  <label for="text">Tweet text</label><textarea id="text" rows="3">Check out this tool</textarea>
  <label for="url">URL (optional)</label><input id="url" placeholder="https://sahankit.github.io/" />
  <button type="button" class="primary" id="go">Generate</button>
  <input id="out" readonly spellcheck="false" />
  <button type="button" class="primary" id="copy">Copy</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=new URLSearchParams();
  const t=document.getElementById('text').value.trim();
  const u=document.getElementById('url').value.trim();
  if(t) p.set('text', u? t+' '+u : t);
  else if(u) p.set('url', u);
  document.getElementById('out').value='https://twitter.com/intent/tweet?'+p.toString();
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
</script>`,
    },
  ];
}
