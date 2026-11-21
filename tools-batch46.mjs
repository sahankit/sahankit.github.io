/** Batch 46: India (HSN/SAC/UPI), dev (JWT exp, cron runs, HMAC), PDF/image utilities. */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch46Tools(ad) {
  return [
    {
      path: "/hsn-code-validator.html",
      file: "hsn-code-validator.html",
      category: "india",
      title: "HSN Code Validator — Format Check India",
      desc: "Validate Harmonized System of Nomenclature (HSN) code length for GST invoices: 2, 4, 6, or 8 digits.",
      card: "HSN validator",
      cardDesc: "HSN digit format for GST.",
      body: `<h1>HSN code validator</h1>${ad}
<div class="tool-panel">
<label for="hsn">HSN code</label>
<input id="hsn" type="text" inputmode="numeric" maxlength="8" placeholder="e.g. 8517" spellcheck="false" />
<button type="button" class="primary" id="go">Validate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const s=document.getElementById('hsn').value.trim().replace(/\\s/g,'');
  const out=document.getElementById('out');
  if(!/^\\d{2,8}$/.test(s)){ out.textContent='HSN must be 2–8 digits (often 4, 6, or 8 on invoices).'; return; }
  const len=s.length;
  const tier=len<=4? 'chapter/heading level' : len===6? 'sub-heading (common on B2B)' : 'tariff item (8-digit)';
  out.textContent='Valid numeric HSN ('+len+' digits) · '+tier+'. Cross-check GST rate separately.';
  ${done}
};
</script>`,
    },
    {
      path: "/sac-code-validator.html",
      file: "sac-code-validator.html",
      category: "india",
      title: "SAC Code Validator — Services Accounting Code",
      desc: "Validate 6-digit SAC codes used for GST on services in India.",
      card: "SAC validator",
      cardDesc: "6-digit service SAC format.",
      body: `<h1>SAC code validator</h1>${ad}
<div class="tool-panel">
<label for="sac">SAC code</label>
<input id="sac" type="text" inputmode="numeric" maxlength="6" placeholder="e.g. 998314" spellcheck="false" />
<button type="button" class="primary" id="go">Validate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const s=document.getElementById('sac').value.trim().replace(/\\s/g,'');
  const out=document.getElementById('out');
  if(!/^\\d{6}$/.test(s)){ out.textContent='SAC must be exactly 6 digits for services.'; return; }
  out.textContent='Format OK · 6-digit SAC. Match description and GST rate to your invoice.';
  ${done}
};
</script>`,
    },
    {
      path: "/hsn-gst-rate-finder.html",
      file: "hsn-gst-rate-finder.html",
      category: "india",
      title: "HSN GST Rate Finder — Common Codes",
      desc: "Search common HSN codes and indicative GST rates for India. Reference only—confirm on CBIC/GST portal.",
      card: "HSN GST finder",
      cardDesc: "Common HSN & GST %.",
      body: `<h1>HSN GST rate finder</h1>${ad}
<p class="tool-hint">Indicative rates for common goods. Not legal advice—verify before filing.</p>
<div class="tool-panel">
<label for="q">HSN or keyword</label>
<input id="q" type="search" placeholder="8517, rice, medicine…" spellcheck="false" />
<div id="list" class="search-results" style="max-height:240px;overflow:auto"></div>
</div>
<script>
const ROWS=[
  {h:'1006',n:'Rice (non-basmati)',g:0},{h:'100630',n:'Basmati rice',g:0},{h:'1701',n:'Sugar',g:5},
  {h:'1905',n:'Bread, biscuits',g:5},{h:'2202',n:'Soft drinks',g:40},{h:'3004',n:'Medicaments',g:12},
  {h:'3304',n:'Beauty / skincare',g:18},{h:'3401',n:'Soap',g:18},{h:'3923',n:'Plastic articles',g:18},
  {h:'4011',n:'Tyres',g:28},{h:'4901',n:'Printed books',g:0},{h:'6109',n:'T-shirts',g:5},
  {h:'6203',n:'Men’s suits',g:12},{h:'6403',n:'Footwear',g:18},{h:'7013',n:'Glassware',g:18},
  {h:'7214',n:'Steel bars',g:18},{h:'8415',n:'AC / refrigeration',g:28},{h:'8471',n:'Computers',g:18},
  {h:'8504',n:'Transformers',g:18},{h:'8517',n:'Phones & parts',g:18},{h:'8528',n:'Monitors / TVs',g:18},
  {h:'8703',n:'Motor cars',g:28},{h:'8708',n:'Auto parts',g:28},{h:'9403',n:'Furniture',g:18},
  {h:'998311',n:'IT design (SAC)',g:18},{h:'998312',n:'IT support (SAC)',g:18},
];
function render(){
  const q=document.getElementById('q').value.trim().toLowerCase();
  const list=document.getElementById('list');
  const hits=q? ROWS.filter(r=>r.h.includes(q)||r.n.toLowerCase().includes(q)):ROWS;
  list.innerHTML=hits.slice(0,30).map(r=>'<p class="recent-chip" style="display:block;margin:6px 0"><strong>'+r.h+'</strong> · '+r.n+' · GST '+r.g+'%</p>').join('')||'<p>No match—try phone, rice, or 8517.</p>';
}
document.getElementById('q').oninput=render;
render();
</script>`,
    },
    {
      path: "/upi-payment-link-generator.html",
      file: "upi-payment-link-generator.html",
      category: "india",
      title: "UPI Payment Link Generator — upi:// Pay URI",
      desc: "Build a UPI deep link (pa, pn, am, cu, tn) for QR or WhatsApp. Does not move money—link builder only.",
      card: "UPI payment link",
      cardDesc: "Build upi://pay URI.",
      body: `<h1>UPI payment link generator</h1>${ad}
<div class="tool-panel">
<label for="pa">Payee VPA (pa)</label><input id="pa" type="text" placeholder="merchant@paytm" spellcheck="false" />
<label for="pn">Payee name (pn)</label><input id="pn" type="text" placeholder="Shop name" />
<label for="am">Amount ₹ (am, optional)</label><input id="am" type="number" step="0.01" min="0" />
<label for="tn">Note (tn)</label><input id="tn" type="text" placeholder="Invoice 123" />
<button type="button" class="primary" id="go">Build link</button>
<textarea id="out" rows="3" readonly spellcheck="false"></textarea>
</div>
<script>
document.getElementById('go').onclick=function(){
  const pa=document.getElementById('pa').value.trim();
  const pn=document.getElementById('pn').value.trim();
  if(!pa){ document.getElementById('out').value='Enter payee UPI ID (pa).'; return; }
  const p=new URLSearchParams();
  p.set('pa',pa);
  if(pn) p.set('pn',pn);
  const am=document.getElementById('am').value;
  if(am) p.set('am',Number(am).toFixed(2));
  p.set('cu','INR');
  const tn=document.getElementById('tn').value.trim();
  if(tn) p.set('tn',tn);
  document.getElementById('out').value='upi://pay?'+p.toString();
  ${done}
};
</script>`,
    },
    {
      path: "/jwt-expiry-checker.html",
      file: "jwt-expiry-checker.html",
      category: "developer",
      title: "JWT Expiry Checker — exp & iat Timestamps",
      desc: "Decode JWT payload and show issued/expiry times, seconds until expiry. Does not verify signatures.",
      card: "JWT expiry checker",
      cardDesc: "exp / iat human-readable.",
      body: `<h1>JWT expiry checker</h1>${ad}
<div class="tool-panel">
<label for="jwt">JWT</label>
<textarea id="jwt" rows="4" spellcheck="false" placeholder="eyJhbG…"></textarea>
<button type="button" class="primary" id="go">Check expiry</button>
<pre id="out" style="white-space:pre-wrap"></pre>
</div>
<script>
function b64url(s){
  s=s.replace(/-/g,'+').replace(/_/g,'/');
  while(s.length%4) s+='=';
  return JSON.parse(atob(s));
}
document.getElementById('go').onclick=function(){
  const parts=document.getElementById('jwt').value.trim().split('.');
  const out=document.getElementById('out');
  if(parts.length<2){ out.textContent='Paste a JWT with header.payload.signature.'; return; }
  try{
    const payload=b64url(parts[1]);
    const lines=['Payload: '+JSON.stringify(payload,null,2),''];
    const now=Date.now();
    if(payload.iat) lines.push('iat: '+new Date(payload.iat*1000).toLocaleString());
    if(payload.exp){
      const expMs=payload.exp*1000;
      lines.push('exp: '+new Date(expMs).toLocaleString());
      const left=Math.round((expMs-now)/1000);
      lines.push(left>0? ('Expires in ~'+left+' seconds ('+Math.round(left/60)+' min).') : ('Expired ~'+Math.abs(left)+' seconds ago.'));
    } else lines.push('No exp claim in token.');
    out.textContent=lines.join('\\n');
    ${done}
  }catch(e){ out.textContent='Invalid JWT: '+e.message; }
};
</script>`,
    },
    {
      path: "/cron-next-run-calculator.html",
      file: "cron-next-run-calculator.html",
      category: "developer",
      title: "Cron Next Run Calculator — Upcoming Fire Times",
      desc: "Show the next scheduled run times for a standard 5-field cron expression in your local timezone.",
      card: "Cron next runs",
      cardDesc: "Next 5 cron fire times.",
      body: `<h1>Cron next run calculator</h1>${ad}
<div class="tool-panel">
<label for="cron">Cron (min hour dom month dow)</label>
<input id="cron" type="text" spellcheck="false" value="0 9 * * 1-5" />
<button type="button" class="primary" id="go">Next runs</button>
<pre id="out" style="white-space:pre-wrap"></pre>
<p class="prose" style="font-size:0.85rem">Uses your local timezone. For human-readable text, see <a href="/cron-helper/">cron helper</a>.</p>
</div>
<script type="module">
import parser from 'https://cdn.jsdelivr.net/npm/cron-parser@4.9.0/+esm';
document.getElementById('go').onclick=function(){
  const c=document.getElementById('cron').value.trim();
  const out=document.getElementById('out');
  try{
    const it=parser.parseExpression(c);
    const lines=[];
    for(let i=0;i<5;i++) lines.push((i+1)+'. '+it.next().toString());
    out.textContent=lines.join('\\n');
    ${done}
  }catch(e){ out.textContent=e.message||'Invalid cron'; }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/hmac-sha256-generator.html",
      file: "hmac-sha256-generator.html",
      category: "developer",
      title: "HMAC SHA-256 Generator — Sign Text Online",
      desc: "Compute HMAC-SHA256 hex digest of a message with a secret key. Runs locally with Web Crypto.",
      card: "HMAC SHA-256",
      cardDesc: "HMAC digest in hex.",
      body: `<h1>HMAC SHA-256 generator</h1>${ad}
<div class="tool-panel">
<label for="key">Secret key</label><input id="key" type="password" autocomplete="off" spellcheck="false" />
<label for="msg">Message</label><textarea id="msg" rows="4" spellcheck="false"></textarea>
<button type="button" class="primary" id="go">Compute HMAC</button>
<input id="out" type="text" readonly spellcheck="false" />
</div>
<script>
async function hmac(key,msg){
  const enc=new TextEncoder();
  const cryptoKey=await crypto.subtle.importKey('raw',enc.encode(key),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const sig=await crypto.subtle.sign('HMAC',cryptoKey,enc.encode(msg));
  return [...new Uint8Array(sig)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
document.getElementById('go').onclick=async function(){
  const key=document.getElementById('key').value;
  const msg=document.getElementById('msg').value;
  if(!key){ document.getElementById('out').value='Enter a secret key.'; return; }
  document.getElementById('out').value=await hmac(key,msg);
  ${done}
};
</script>`,
    },
    {
      path: "/pem-certificate-viewer.html",
      file: "pem-certificate-viewer.html",
      category: "developer",
      title: "PEM Certificate Viewer — Parse X.509 PEM",
      desc: "Read subject, issuer, and validity dates from a PEM X.509 certificate in the browser.",
      card: "PEM certificate viewer",
      cardDesc: "Parse PEM cert fields.",
      body: `<h1>PEM certificate viewer</h1>${ad}
<div class="tool-panel">
<label for="pem">PEM certificate</label>
<textarea id="pem" rows="10" spellcheck="false" placeholder="-----BEGIN CERTIFICATE-----\\n…"></textarea>
<button type="button" class="primary" id="go">Parse</button>
<pre id="out" style="white-space:pre-wrap"></pre>
</div>
<script src="https://cdn.jsdelivr.net/npm/node-forge@1.3.1/dist/forge.min.js"></script>
<script>
document.getElementById('go').onclick=function(){
  const pem=document.getElementById('pem').value.trim();
  const out=document.getElementById('out');
  try{
    const cert=forge.pki.certificateFromPem(pem);
    const subj=cert.subject.attributes.map(a=>a.shortName+'='+a.value).join(', ');
    const iss=cert.issuer.attributes.map(a=>a.shortName+'='+a.value).join(', ');
    out.textContent=['Subject: '+subj,'Issuer: '+iss,'Valid from: '+cert.validity.notBefore,'Valid to: '+cert.validity.notAfter,'Serial: '+cert.serialNumber].join('\\n');
    ${done}
  }catch(e){ out.textContent='Could not parse PEM: '+(e.message||e); }
};
</script>`,
    },
    {
      path: "/pdf-info-viewer.html",
      file: "pdf-info-viewer.html",
      category: "documents",
      title: "PDF Info Viewer — Pages, Title, Size",
      desc: "Upload a PDF to see page count, file size, and document metadata in your browser.",
      card: "PDF info viewer",
      cardDesc: "Page count & metadata.",
      body: `<h1>PDF info viewer</h1>${ad}
<div class="tool-panel">
<label for="file">PDF file</label>
<input id="file" type="file" accept="application/pdf" />
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script type="module">
document.getElementById('file').onchange=async function(){
  const f=this.files?.[0];
  const out=document.getElementById('out');
  if(!f){ out.textContent=''; return; }
  const { PDFDocument }=await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
  const bytes=await f.arrayBuffer();
  const doc=await PDFDocument.load(bytes,{ignoreEncryption:true});
  const kb=Math.round(f.size/1024);
  out.textContent='Pages: '+doc.getPageCount()+' · Size: '+kb+' KB · Title: '+(doc.getTitle()||'—')+' · Author: '+(doc.getAuthor()||'—');
  ${done}
};
</script>`,
    },
    {
      path: "/image-dimensions-analyzer.html",
      file: "image-dimensions-analyzer.html",
      category: "design",
      title: "Image Dimensions Analyzer — Width, Height, Ratio",
      desc: "Upload an image to see pixel dimensions, aspect ratio, and megapixels. No upload to server.",
      card: "Image dimensions",
      cardDesc: "W×H, ratio, MP.",
      body: `<h1>Image dimensions analyzer</h1>${ad}
<div class="tool-panel">
<label for="file">Image</label>
<input id="file" type="file" accept="image/*" />
<p id="out" class="tool-feedback" role="status"></p>
<img id="preview" alt="" hidden style="max-width:100%;margin-top:12px;border-radius:8px" />
</div>
<script>
document.getElementById('file').onchange=function(){
  const f=this.files?.[0];
  const out=document.getElementById('out');
  const img=document.getElementById('preview');
  if(!f){ out.textContent=''; img.hidden=true; return; }
  const url=URL.createObjectURL(f);
  img.onload=function(){
    const w=img.naturalWidth,h=img.naturalHeight;
    const g=(w*h/1e6).toFixed(2);
    const gcd=(a,b)=>b?gcd(b,a%b):a;
    const d=gcd(w,h);
    out.textContent=w+' × '+h+' px · ratio '+ (w/d)+':'+(h/d)+' · ~'+g+' MP · type '+f.type+' · '+Math.round(f.size/1024)+' KB';
    img.hidden=false;
    URL.revokeObjectURL(url);
    ${done}
  };
  img.src=url;
};
</script>`,
    },
    {
      path: "/svg-to-png-converter.html",
      file: "svg-to-png-converter.html",
      category: "design",
      title: "SVG to PNG Converter — Export PNG",
      desc: "Convert an SVG file to a PNG download using canvas. Best for icons and simple graphics.",
      card: "SVG to PNG",
      cardDesc: "Export SVG as PNG.",
      body: `<h1>SVG to PNG converter</h1>${ad}
<div class="tool-panel">
<label for="file">SVG file</label>
<input id="file" type="file" accept="image/svg+xml,.svg" />
<label for="scale">Scale</label><input id="scale" type="number" min="1" max="8" value="2" />
<button type="button" class="primary" id="go" disabled>Download PNG</button>
<p id="msg" class="tool-feedback" role="status"></p>
</div>
<script>
let svgUrl='';
const file=document.getElementById('file'), btn=document.getElementById('go');
file.onchange=function(){
  if(svgUrl) URL.revokeObjectURL(svgUrl);
  const f=file.files?.[0];
  btn.disabled=!f;
  svgUrl=f? URL.createObjectURL(f):'';
};
btn.onclick=function(){
  if(!svgUrl) return;
  const scale=Math.min(8,Math.max(1,Number(document.getElementById('scale').value)||1));
  const img=new Image();
  img.onload=function(){
    const w=img.naturalWidth||512, h=img.naturalHeight||512;
    const c=document.createElement('canvas');
    c.width=w*scale; c.height=h*scale;
    const ctx=c.getContext('2d');
    ctx.scale(scale,scale);
    ctx.drawImage(img,0,0);
    c.toBlob(function(b){
      const a=document.createElement('a');
      a.href=URL.createObjectURL(b);
      a.download='image.png';
      a.click();
      document.getElementById('msg').textContent='Saved PNG at '+c.width+'×'+c.height+' px.';
      ${done}
    },'image/png');
  };
  img.onerror=function(){ document.getElementById('msg').textContent='Could not render SVG (external refs may fail).'; };
  img.src=svgUrl;
};
</script>`,
    },
    {
      path: "/webp-to-png-converter.html",
      file: "webp-to-png-converter.html",
      category: "design",
      title: "WebP to PNG Converter — Download PNG",
      desc: "Convert WebP images to PNG in the browser. Private conversion, no server upload.",
      card: "WebP to PNG",
      cardDesc: "Convert WebP → PNG.",
      body: `<h1>WebP to PNG converter</h1>${ad}
<div class="tool-panel">
<label for="file">WebP image</label>
<input id="file" type="file" accept="image/webp" />
<button type="button" class="primary" id="go" disabled>Download PNG</button>
<p id="msg" class="tool-feedback" role="status"></p>
</div>
<script>
const inp=document.getElementById('file'), btn=document.getElementById('go');
inp.onchange=()=>{ btn.disabled=!inp.files?.length; };
btn.onclick=function(){
  const f=inp.files?.[0];
  if(!f) return;
  const img=new Image();
  img.onload=function(){
    const c=document.createElement('canvas');
    c.width=img.naturalWidth; c.height=img.naturalHeight;
    c.getContext('2d').drawImage(img,0,0);
    c.toBlob(function(b){
      const a=document.createElement('a');
      a.href=URL.createObjectURL(b);
      a.download=f.name.replace(/\\.webp$/i,'')+'.png';
      a.click();
      document.getElementById('msg').textContent='Converted '+img.naturalWidth+'×'+img.naturalHeight+' to PNG.';
      ${done}
    },'image/png');
  };
  img.src=URL.createObjectURL(f);
};
</script>`,
    },
  ];
}