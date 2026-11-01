/** Eighth batch of useful tools. */
export function batch8Tools(ad) {
  return [
    {
      path: "/salary-to-hourly.html",
      file: "salary-to-hourly.html",
      category: "calculators",
      title: "Salary to Hourly Calculator",
      desc: "Convert annual salary to hourly rate by hours worked per week.",
      card: "Salary → hourly",
      cardDesc: "Annual pay to hourly.",
      body: `
<h1>Salary to hourly</h1>${ad}
<div class="tool-panel">
  <label for="sal">Annual salary</label><input id="sal" type="number" value="1200000" />
  <label for="hrs">Hours per week</label><input id="hrs" type="number" value="40" />
  <label for="wks">Weeks per year</label><input id="wks" type="number" value="52" />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const sal=+document.getElementById('sal').value, hrs=+document.getElementById('hrs').value, wks=+document.getElementById('wks').value;
  const h=hrs*wks;
  document.getElementById('out').textContent=h?('≈ '+(sal/h).toFixed(2)+' per hour'):'—';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/break-even-calculator.html",
      file: "break-even-calculator.html",
      category: "calculators",
      title: "Break-Even Point Calculator",
      desc: "Find break-even units from fixed costs, price, and variable cost per unit.",
      card: "Break-even",
      cardDesc: "Units to break even.",
      body: `
<h1>Break-even calculator</h1>${ad}
<div class="tool-panel">
  <label for="fixed">Fixed costs</label><input id="fixed" type="number" value="50000" />
  <label for="price">Price per unit</label><input id="price" type="number" value="120" />
  <label for="var">Variable cost per unit</label><input id="var" type="number" value="70" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const f=+document.getElementById('fixed').value, p=+document.getElementById('price').value, v=+document.getElementById('var').value;
  const m=p-v;
  document.getElementById('out').textContent=m>0?('Break-even: '+(f/m).toFixed(2)+' units'):'Margin must be positive';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/sales-tax-calculator.html",
      file: "sales-tax-calculator.html",
      category: "calculators",
      title: "Sales Tax Calculator — Add Tax to Price",
      desc: "Add a sales tax percentage to a subtotal.",
      card: "Sales tax",
      cardDesc: "Subtotal + tax %.",
      body: `
<h1>Sales tax calculator</h1>${ad}
<div class="tool-panel">
  <label for="sub">Subtotal</label><input id="sub" type="number" value="100" />
  <label for="tax">Tax rate (%)</label><input id="tax" type="number" step="0.01" value="8.25" />
  <button type="button" class="primary" id="go">Calculate</button>
  <div class="stats">
    <div class="stat"><strong id="t">—</strong>Tax</div>
    <div class="stat"><strong id="tot">—</strong>Total</div>
  </div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=+document.getElementById('sub').value, r=+document.getElementById('tax').value/100;
  const t=s*r;
  document.getElementById('t').textContent=t.toFixed(2);
  document.getElementById('tot').textContent=(s+t).toFixed(2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/download-time-calculator.html",
      file: "download-time-calculator.html",
      category: "developer",
      title: "Download Time Calculator — File Size & Speed",
      desc: "Estimate download time from file size and connection speed.",
      card: "Download time",
      cardDesc: "Size ÷ speed.",
      body: `
<h1>Download time calculator</h1>${ad}
<div class="tool-panel">
  <label for="mb">File size (MB)</label><input id="mb" type="number" value="500" />
  <label for="mbps">Download speed (Mbps)</label><input id="mbps" type="number" value="50" />
  <button type="button" class="primary" id="go">Estimate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const bytes=+document.getElementById('mb').value*1e6;
  const bps=+document.getElementById('mbps').value*1e6/8;
  const sec=bytes/bps;
  const m=Math.floor(sec/60), s=Math.round(sec%60);
  document.getElementById('out').textContent=m+' min '+s+' sec (approx)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/string-case-converter.html",
      file: "string-case-converter.html",
      category: "developer",
      title: "camelCase, snake_case, kebab-case Converter",
      desc: "Convert identifiers between camelCase, PascalCase, snake_case, and kebab-case.",
      card: "Case styles",
      cardDesc: "camel · snake · kebab.",
      body: `
<h1>String case converter</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label><input id="text" value="hello world example" />
  <div class="row">
    <button type="button" class="primary" data-m="camel">camelCase</button>
    <button type="button" class="primary" data-m="pascal">PascalCase</button>
    <button type="button" class="primary" data-m="snake">snake_case</button>
    <button type="button" class="primary" data-m="kebab">kebab-case</button>
  </div>
  <input id="out" readonly />
</div>
<script>
const parts=s=>s.trim().split(/[\\s_\\-]+/).filter(Boolean).map(w=>w.toLowerCase());
document.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{
  const p=parts(document.getElementById('text').value);
  let o='';
  if(b.dataset.m==='camel') o=p.map((w,i)=>i?w[0].toUpperCase()+w.slice(1):w).join('');
  if(b.dataset.m==='pascal') o=p.map(w=>w[0].toUpperCase()+w.slice(1)).join('');
  if(b.dataset.m==='snake') o=p.join('_');
  if(b.dataset.m==='kebab') o=p.join('-');
  document.getElementById('out').value=o;
});
</script>`,
    },
    {
      path: "/duplicate-word-finder.html",
      file: "duplicate-word-finder.html",
      category: "writing",
      title: "Duplicate Word Finder in Text",
      desc: "List words that appear more than once in your text.",
      card: "Duplicate words",
      cardDesc: "Find repeated words.",
      body: `
<h1>Duplicate word finder</h1>${ad}
<div class="tool-panel">
  <textarea id="text" rows="6">the quick the brown fox</textarea>
  <button type="button" class="primary" id="go">Find</button>
  <pre id="out"></pre>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const m=new Map();
  for(const w of document.getElementById('text').value.toLowerCase().match(/[a-z']+/g)||[]){
    m.set(w,(m.get(w)||0)+1);
  }
  const d=[...m.entries()].filter(([,c])=>c>1).sort((a,b)=>b[1]-a[1]);
  document.getElementById('out').textContent=d.length?d.map(([w,c])=>c+'× '+w).join('\\n'):'No duplicates';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/acronym-generator.html",
      file: "acronym-generator.html",
      category: "writing",
      title: "Acronym Generator from Phrase",
      desc: "Create an acronym from the first letters of each word.",
      card: "Acronym generator",
      cardDesc: "First letters acronym.",
      body: `
<h1>Acronym generator</h1>${ad}
<div class="tool-panel">
  <input id="text" value="Portable Document Format" />
  <button type="button" class="primary" id="go">Generate</button>
  <p id="out" class="ok" style="font-size:1.5rem"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const a=document.getElementById('text').value.match(/\\b\\w/g)||[];
  document.getElementById('out').textContent=a.join('').toUpperCase();
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/api-key-generator.html",
      file: "api-key-generator.html",
      category: "developer",
      title: "Random API Key Generator",
      desc: "Generate random API keys and secrets in the browser.",
      card: "API key generator",
      cardDesc: "Random secret strings.",
      body: `
<h1>API key generator</h1>${ad}
<div class="tool-panel">
  <label for="len">Length</label><input id="len" type="number" min="16" max="128" value="32" />
  <button type="button" class="primary" id="go">Generate</button>
  <input id="out" readonly spellcheck="false" />
  <button type="button" class="primary" id="copy">Copy</button>
</div>
<script>
const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
document.getElementById('go').onclick=()=>{
  const len=Math.min(128,Math.max(16,+document.getElementById('len').value||32));
  const arr=new Uint32Array(len); crypto.getRandomValues(arr);
  document.getElementById('out').value=Array.from(arr,x=>chars[x%chars.length]).join('');
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/wifi-qr-generator.html",
      file: "wifi-qr-generator.html",
      category: "developer",
      title: "WiFi QR Code Generator",
      desc: "Create a QR code to join a WiFi network (WPA).",
      card: "WiFi QR code",
      cardDesc: "Scan to join WiFi.",
      body: `
<h1>WiFi QR code</h1>${ad}
<div class="tool-panel">
  <label for="ssid">Network name (SSID)</label><input id="ssid" value="MyNetwork" />
  <label for="pass">Password</label><input id="pass" type="password" autocomplete="off" />
  <label for="auth">Security</label><select id="auth"><option>WPA</option><option>WEP</option><option>NOPASS</option></select>
  <button type="button" class="primary" id="go">Generate QR</button>
  <div id="box"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js"></script>
<script>
document.getElementById('go').onclick=async()=>{
  const s=document.getElementById('ssid').value, p=document.getElementById('pass').value, a=document.getElementById('auth').value;
  const esc=x=>x.replace(/([\\\\;,:"])/g,'\\\\$1');
  const payload='WIFI:T:'+a+';S:'+esc(s)+';'+(a==='NOPASS'?'':'P:'+esc(p)+';')+';';
  const box=document.getElementById('box'); box.innerHTML='';
  const c=document.createElement('canvas');
  await QRCode.toCanvas(c,payload,{width:256});
  box.appendChild(c);
};
</script>`,
    },
    {
      path: "/md5-hash.html",
      file: "md5-hash.html",
      category: "developer",
      title: "MD5 Hash Generator",
      desc: "Generate MD5 hash from text. For checksums only—not for passwords.",
      card: "MD5 hash",
      cardDesc: "MD5 hex digest.",
      body: `
<h1>MD5 hash</h1>${ad}
<div class="tool-panel">
  <textarea id="text" rows="4"></textarea>
  <button type="button" class="primary" id="go">Hash</button>
  <input id="out" readonly spellcheck="false" />
  <p class="prose" style="font-size:0.85rem">MD5 is not secure for passwords.</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/blueimp-md5@2.19.0/js/md5.min.js"></script>
<script>
document.getElementById('go').onclick=()=>{
  document.getElementById('out').value=md5(document.getElementById('text').value);
};
</script>`,
    },
    {
      path: "/hmac-generator.html",
      file: "hmac-generator.html",
      category: "developer",
      title: "HMAC-SHA256 Generator",
      desc: "Compute HMAC-SHA256 with a secret key in the browser.",
      card: "HMAC-SHA256",
      cardDesc: "Keyed hash.",
      body: `
<h1>HMAC-SHA256</h1>${ad}
<div class="tool-panel">
  <label for="key">Secret key</label><input id="key" type="password" autocomplete="off" />
  <label for="msg">Message</label><textarea id="msg" rows="3"></textarea>
  <button type="button" class="primary" id="go">Compute</button>
  <input id="out" readonly spellcheck="false" />
</div>
<script>
document.getElementById('go').onclick=async()=>{
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(document.getElementById('key').value),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const sig=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(document.getElementById('msg').value));
  document.getElementById('out').value=[...new Uint8Array(sig)].map(b=>b.toString(16).padStart(2,'0')).join('');
};
</script>`,
    },
    {
      path: "/image-resizer.html",
      file: "image-resizer.html",
      category: "documents",
      title: "Image Resizer — Max Width or Height",
      desc: "Resize images by max width while keeping aspect ratio. Download PNG.",
      card: "Image resizer",
      cardDesc: "Scale image locally.",
      body: `
<h1>Image resizer</h1>${ad}
<div class="tool-panel">
  <input id="file" type="file" accept="image/*" />
  <label for="w">Max width (px)</label><input id="w" type="number" value="800" />
  <button type="button" class="primary" id="go" disabled>Resize &amp; download</button>
</div>
<script>
let img=null;
document.getElementById('file').onchange=e=>{
  const f=e.target.files[0]; if(!f) return;
  img=new Image();
  img.onload=()=>document.getElementById('go').disabled=false;
  img.src=URL.createObjectURL(f);
};
document.getElementById('go').onclick=()=>{
  if(!img) return;
  const max=+document.getElementById('w').value||800;
  const scale=Math.min(1,max/img.width);
  const c=document.createElement('canvas');
  c.width=Math.round(img.width*scale); c.height=Math.round(img.height*scale);
  c.getContext('2d').drawImage(img,0,0,c.width,c.height);
  c.toBlob(b=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='resized.png'; a.click(); });
};
</script>`,
    },
    {
      path: "/date-add-days.html",
      file: "date-add-days.html",
      category: "calculators",
      title: "Date Calculator — Add or Subtract Days",
      desc: "Add days to a date or find date N days from today.",
      card: "Date +/- days",
      cardDesc: "Shift calendar dates.",
      body: `
<h1>Date calculator</h1>${ad}
<div class="tool-panel">
  <label for="d">Start date</label><input id="d" type="date" />
  <label for="n">Days to add (negative subtracts)</label><input id="n" type="number" value="30" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('d').value=new Date().toISOString().slice(0,10);
document.getElementById('go').onclick=()=>{
  const dt=new Date(document.getElementById('d').value+'T12:00:00');
  dt.setDate(dt.getDate()+(+document.getElementById('n').value));
  document.getElementById('out').textContent=dt.toLocaleDateString(undefined,{dateStyle:'full'});
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/time-difference.html",
      file: "time-difference.html",
      category: "productivity",
      title: "Time Difference Calculator — Hours & Minutes",
      desc: "Find duration between two times on the same day.",
      card: "Time difference",
      cardDesc: "Hours between times.",
      body: `
<h1>Time difference</h1>${ad}
<div class="tool-panel">
  <label for="a">Start</label><input id="a" type="time" value="09:00" />
  <label for="b">End</label><input id="b" type="time" value="17:30" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const [ah,am]=document.getElementById('a').value.split(':').map(Number);
  const [bh,bm]=document.getElementById('b').value.split(':').map(Number);
  let mins=(bh*60+bm)-(ah*60+am);
  if(mins<0) mins+=24*60;
  document.getElementById('out').textContent=Math.floor(mins/60)+' h '+(mins%60)+' min';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/fuel-efficiency.html",
      file: "fuel-efficiency.html",
      category: "calculators",
      title: "Fuel Efficiency Calculator — km/L",
      desc: "Calculate km per litre from distance and fuel used.",
      card: "Fuel efficiency",
      cardDesc: "km per litre.",
      body: `
<h1>Fuel efficiency (km/L)</h1>${ad}
<div class="tool-panel">
  <label for="km">Distance (km)</label><input id="km" type="number" value="400" />
  <label for="l">Fuel used (litres)</label><input id="l" type="number" step="0.1" value="28" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const km=+document.getElementById('km').value, l=+document.getElementById('l').value;
  document.getElementById('out').textContent=l?((km/l).toFixed(2)+' km/L'):'—';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/inflation-calculator.html",
      file: "inflation-calculator.html",
      category: "calculators",
      title: "Inflation Calculator — Future Value of Money",
      desc: "Estimate how much money needs to grow to match inflation over years.",
      card: "Inflation estimate",
      cardDesc: "Purchasing power.",
      body: `
<h1>Inflation calculator</h1>${ad}
<div class="tool-panel">
  <label for="amt">Amount today</label><input id="amt" type="number" value="10000" />
  <label for="rate">Inflation (% per year)</label><input id="rate" type="number" step="0.1" value="6" />
  <label for="y">Years</label><input id="y" type="number" value="10" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const a=+document.getElementById('amt').value, r=+document.getElementById('rate').value/100, y=+document.getElementById('y').value;
  const fv=a*Math.pow(1+r,y);
  document.getElementById('out').textContent='Need ≈ '+fv.toFixed(2)+' for same buying power';
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
