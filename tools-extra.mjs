/** Additional tools (Tier 1–3 batch). `ad` is the shared ad aside HTML. */
export function extraTools(ad) {
  return [
    {
      path: "/qr-code-generator.html",
      file: "qr-code-generator.html",
      category: "developer",
      title: "QR Code Generator — Free Online QR",
      desc: "Create QR codes from URL or text. Download PNG. Free QR code generator in your browser.",
      card: "QR code generator",
      cardDesc: "URL or text to QR PNG.",
      body: `
<h1>QR code generator</h1>${ad}
<div class="tool-panel">
  <label for="txt">URL or text</label>
  <input id="txt" type="url" placeholder="https://example.com" value="https://sahankit.github.io/" />
  <label for="size">Size (px)</label><input id="size" type="number" min="128" max="512" value="256" />
  <button type="button" class="primary" id="go">Generate</button>
  <div id="box" style="margin-top:16px"></div>
  <p id="dl" hidden><a id="link" download="qrcode.png">Download PNG</a></p>
</div>
<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js"></script>
<script>
document.getElementById('go').onclick=async()=>{
  const text=document.getElementById('txt').value.trim();
  const size=Math.min(512,Math.max(128,Number(document.getElementById('size').value)||256));
  const box=document.getElementById('box'); box.innerHTML='';
  if(!text) return;
  if(typeof QRCode==='undefined'){
    box.textContent='Loading QR library… retry in a moment.';
    return;
  }
  const canvas=document.createElement('canvas');
  await QRCode.toCanvas(canvas,text,{width:size,margin:2});
  box.appendChild(canvas);
  const a=document.getElementById('link');
  a.href=canvas.toDataURL('image/png');
  document.getElementById('dl').hidden=false;
};
(function boot(){
  if(typeof QRCode!=='undefined') document.getElementById('go').click();
  else setTimeout(boot,50);
})();
</script>`,
    },
    {
      path: "/typing-test.html",
      file: "typing-test.html",
      category: "productivity",
      title: "Typing Speed Test — WPM & Accuracy",
      desc: "1-minute typing test. Measure words per minute and accuracy in the browser.",
      card: "Typing speed test",
      cardDesc: "1-minute WPM test.",
      body: `
<h1>Typing speed test</h1>${ad}
<div class="tool-panel">
  <p id="prompt" class="ok"></p>
  <label for="input">Type here</label>
  <textarea id="input" rows="4" autocomplete="off" autocorrect="off" spellcheck="false"></textarea>
  <div class="stats">
    <div class="stat"><strong id="time">60</strong>Seconds</div>
    <div class="stat"><strong id="wpm">0</strong>WPM</div>
    <div class="stat"><strong id="acc">100</strong>Accuracy</div>
  </div>
  <button type="button" class="primary" id="again">New test</button>
</div>
<script>
const words='the quick brown fox jumps over lazy dog time test typing speed practice keyboard skill online free tool'.split(' ');
function sample(n){ const a=[]; for(let i=0;i<n;i++) a.push(words[Math.floor(Math.random()*words.length)]); return a.join(' '); }
let target='', started=0, timer=null, left=60;
function reset(){
  clearInterval(timer); timer=null; started=0; left=60;
  target=sample(35);
  document.getElementById('prompt').textContent=target;
  const inp=document.getElementById('input'); inp.value=''; inp.disabled=false; inp.focus();
  document.getElementById('time').textContent='60';
  document.getElementById('wpm').textContent='0';
  document.getElementById('acc').textContent='100';
}
function score(){
  const typed=document.getElementById('input').value;
  const tw=typed.trim().split(/\\s+/).filter(Boolean).length;
  const elapsed=(60-left)||1;
  const wpm=Math.round(tw/(elapsed/60));
  const ref=target.split(' ');
  const ty=typed.trim().split(/\\s+/);
  let ok=0; for(let i=0;i<ty.length;i++) if(ty[i]===ref[i]) ok++;
  const acc=ty.length?Math.round(100*ok/ty.length):100;
  document.getElementById('wpm').textContent=String(wpm);
  document.getElementById('acc').textContent=String(acc);
}
document.getElementById('input').oninput=()=>{
  if(!started){ started=Date.now(); timer=setInterval(()=>{
    left--; document.getElementById('time').textContent=String(left); score();
    if(left<=0){ clearInterval(timer); document.getElementById('input').disabled=true; score(); }
  },1000); }
  score();
};
document.getElementById('again').onclick=reset; reset();
</script>`,
    },
    {
      path: "/color-picker.html",
      file: "color-picker.html",
      category: "design",
      title: "Color Picker & Contrast — Hex & RGB",
      desc: "Pick colors, copy HEX and RGB, and check contrast ratio against a second color.",
      card: "Color picker",
      cardDesc: "HEX, RGB, contrast ratio.",
      body: `
<h1>Color picker</h1>${ad}
<div class="tool-panel">
  <label>Foreground <input id="fg" type="color" value="#720e9e" /></label>
  <label>Background <input id="bg" type="color" value="#ffffff" /></label>
  <p id="hex"></p>
  <p id="contrast"></p>
  <div id="swatch" style="padding:24px;border-radius:12px;margin-top:12px">Sample text</div>
</div>
<script>
function lum(hex){
  const n=parseInt(hex.slice(1),16);
  const r=((n>>16)&255)/255,g=((n>>8)&255)/255,b=(n&255)/255;
  const f=c=>c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);
}
function upd(){
  const fg=document.getElementById('fg').value, bg=document.getElementById('bg').value;
  const n=parseInt(fg.slice(1),16);
  document.getElementById('hex').textContent='HEX '+fg+' · RGB '+(n>>16&255)+', '+(n>>8&255)+', '+(n&255);
  const L1=Math.max(lum(fg),lum(bg)), L2=Math.min(lum(fg),lum(bg));
  const ratio=((L1+0.05)/(L2+0.05)).toFixed(2);
  document.getElementById('contrast').textContent='Contrast ratio: '+ratio+' (aim ≥ 4.5 for body text)';
  const s=document.getElementById('swatch');
  s.style.color=fg; s.style.background=bg;
}
document.getElementById('fg').oninput=upd;
document.getElementById('bg').oninput=upd;
upd();
</script>`,
    },
    {
      path: "/gradient-generator.html",
      file: "gradient-generator.html",
      category: "design",
      title: "CSS Gradient Generator — Linear Gradients",
      desc: "Build linear CSS gradients and copy the background code. Free gradient generator.",
      card: "CSS gradient",
      cardDesc: "Linear gradient CSS snippet.",
      body: `
<h1>CSS gradient generator</h1>${ad}
<div class="tool-panel">
  <label>Color 1 <input id="c1" type="color" value="#720e9e" /></label>
  <label>Color 2 <input id="c2" type="color" value="#f4f1ec" /></label>
  <label for="deg">Angle (deg)</label><input id="deg" type="number" value="135" />
  <div id="preview" style="height:120px;border-radius:14px;margin:12px 0"></div>
  <label for="css">CSS</label>
  <input id="css" type="text" readonly />
  <button type="button" class="primary" id="copy">Copy CSS</button>
</div>
<script>
function upd(){
  const c1=document.getElementById('c1').value,c2=document.getElementById('c2').value,d=document.getElementById('deg').value;
  const css='linear-gradient('+d+'deg, '+c1+', '+c2+')';
  document.getElementById('preview').style.background=css;
  document.getElementById('css').value='background: '+css+';';
}
document.getElementById('c1').oninput=upd; document.getElementById('c2').oninput=upd; document.getElementById('deg').oninput=upd;
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('css').value);
upd();
</script>`,
    },
    {
      path: "/image-compress.html",
      file: "image-compress.html",
      category: "documents",
      title: "Image Compressor — JPEG Quality Online",
      desc: "Compress JPG/PNG images in the browser. Adjust quality and download. Files stay on your device.",
      card: "Image compressor",
      cardDesc: "Resize JPEG quality locally.",
      body: `
<h1>Image compressor</h1>${ad}
<div class="tool-panel">
  <label for="file">Image file</label><input id="file" type="file" accept="image/*" />
  <label for="q">JPEG quality</label><input id="q" type="range" min="0.1" max="1" step="0.05" value="0.8" />
  <p id="meta"></p>
  <button type="button" class="primary" id="go" disabled>Compress &amp; download</button>
</div>
<script>
let img=null;
document.getElementById('file').onchange=e=>{
  const f=e.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=()=>{ img=new Image(); img.onload=()=>document.getElementById('meta').textContent=img.width+'×'+img.height+' · '+Math.round(f.size/1024)+' KB'; img.src=r.result; document.getElementById('go').disabled=false; };
  r.readAsDataURL(f);
};
document.getElementById('go').onclick=()=>{
  if(!img) return;
  const q=Number(document.getElementById('q').value);
  const c=document.createElement('canvas'); c.width=img.width; c.height=img.height;
  c.getContext('2d').drawImage(img,0,0);
  c.toBlob(b=>{
    const a=document.createElement('a');
    a.href=URL.createObjectURL(b); a.download='compressed.jpg'; a.click();
    document.getElementById('meta').textContent+=' → '+Math.round(b.size/1024)+' KB';
  },'image/jpeg',q);
};
</script>`,
    },
    {
      path: "/pdf-merge.html",
      file: "pdf-merge.html",
      category: "documents",
      title: "Merge PDF Files — Combine PDFs Online",
      desc: "Combine multiple PDF files into one in the browser. Private merge with pdf-lib.",
      card: "Merge PDF",
      cardDesc: "Combine PDFs in browser.",
      body: `
<h1>Merge PDF files</h1>${ad}
<div class="tool-panel">
  <label for="files">PDF files (order = merge order)</label>
  <input id="files" type="file" accept="application/pdf" multiple />
  <button type="button" class="primary" id="go" disabled>Merge &amp; download</button>
  <p id="msg" class="ok"></p>
</div>
<script type="module">
const inp=document.getElementById('files'), btn=document.getElementById('go');
inp.onchange=()=>{ btn.disabled=!inp.files.length; };
btn.onclick=async()=>{
  const { PDFDocument }=await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
  const out=await PDFDocument.create();
  for(const f of inp.files){
    const bytes=await f.arrayBuffer();
    const doc=await PDFDocument.load(bytes);
    const pages=await out.copyPages(doc, doc.getPageIndices());
    pages.forEach(p=>out.addPage(p));
  }
  const merged=await out.save();
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([merged],{type:'application/pdf'}));
  a.download='merged.pdf'; a.click();
  document.getElementById('msg').textContent='Merged '+inp.files.length+' file(s).';
};
</script>`,
    },
    {
      path: "/meeting-planner.html",
      file: "meeting-planner.html",
      category: "productivity",
      title: "Time Zone Meeting Planner — Compare Times",
      desc: "Compare meeting times across time zones. Free timezone planner for remote teams.",
      card: "Meeting time zones",
      cardDesc: "Compare times across zones.",
      body: `
<h1>Time zone meeting planner</h1>${ad}
<div class="tool-panel">
  <label for="when">Your local date &amp; time</label>
  <input id="when" type="datetime-local" />
  <label for="tz">Compare zone</label>
  <select id="tz"></select>
  <button type="button" class="primary" id="go">Compare</button>
  <p id="out" class="ok"></p>
</div>
<script>
const zones=['America/New_York','America/Los_Angeles','Europe/London','Europe/Paris','Asia/Kolkata','Asia/Singapore','Asia/Tokyo','Australia/Sydney','UTC'];
const sel=document.getElementById('tz');
zones.forEach(z=>{ const o=document.createElement('option'); o.value=z; o.textContent=z; sel.appendChild(o); });
const now=new Date(); document.getElementById('when').value=now.toISOString().slice(0,16);
document.getElementById('go').onclick=()=>{
  const local=new Date(document.getElementById('when').value);
  const tz=sel.value;
  const fmt=new Intl.DateTimeFormat('en-GB',{dateStyle:'full',timeStyle:'short',timeZone:tz});
  document.getElementById('out').textContent='In '+tz+': '+fmt.format(local);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/cron-helper.html",
      file: "cron-helper.html",
      category: "developer",
      title: "Cron Expression Helper — Describe Cron Jobs",
      desc: "Validate cron syntax and read a plain-English description. Free cron helper.",
      card: "Cron helper",
      cardDesc: "Describe cron expressions.",
      body: `
<h1>Cron expression helper</h1>${ad}
<div class="tool-panel">
  <label for="cron">Cron (5 fields: min hour dom month dow)</label>
  <input id="cron" type="text" spellcheck="false" value="0 9 * * 1-5" />
  <button type="button" class="primary" id="go">Explain</button>
  <p id="out"></p>
</div>
<script src="https://cdn.jsdelivr.net/npm/cronstrue@2.50.0/dist/cronstrue.min.js"></script>
<script>
document.getElementById('go').onclick=()=>{
  const c=document.getElementById('cron').value.trim();
  const o=document.getElementById('out');
  try{ o.className='ok'; o.textContent=cronstrue.toString(c); }
  catch(e){ o.className='error'; o.textContent=e.message||'Invalid cron expression'; }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/india-invoice.html",
      file: "india-invoice.html",
      category: "india",
      title: "Simple GST Invoice Generator India — Print",
      desc: "Create a simple printable GST invoice for small businesses. Browser-only invoice template.",
      card: "GST invoice",
      cardDesc: "Printable invoice with GST.",
      body: `
<h1>Simple GST invoice (India)</h1>${ad}
<div class="tool-panel no-print">
  <label>Seller name<input id="seller" value="Your Business Pvt Ltd" /></label>
  <label>GSTIN<input id="gstin" placeholder="22AAAAA0000A1Z5" /></label>
  <label>Buyer<input id="buyer" value="Customer name" /></label>
  <label>Description<input id="desc" value="Services / goods" /></label>
  <label>Amount (₹, ex-GST)<input id="amt" type="number" value="1000" /></label>
  <label>GST %<select id="rate"><option>5</option><option>12</option><option selected>18</option><option>28</option></select></label>
  <label>Invoice #<input id="inv" value="INV-001" /></label>
  <button type="button" class="primary" id="fill">Update preview</button>
  <button type="button" class="primary" id="print">Print / Save PDF</button>
</div>
<div id="invout" class="tool-panel invoice-print"></div>
<style>
@media print{ .site-header,.site-footer,.ad-slot,.no-print,.breadcrumb,.seo-content{ display:none!important } body{ background:#fff } }
.invoice-print h2{ margin:0 0 8px } .invoice-print table{ width:100%; border-collapse:collapse; margin-top:12px }
.invoice-print td,.invoice-print th{ border:1px solid #ccc; padding:8px; text-align:left }
</style>
<script>
function fmt(n){ return '₹'+n.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function fill(){
  const base=Number(document.getElementById('amt').value)||0;
  const r=Number(document.getElementById('rate').value)/100;
  const gst=base*r, total=base+gst;
  document.getElementById('invout').innerHTML='<h2>Tax invoice</h2><p><strong>'+document.getElementById('seller').value+'</strong><br>GSTIN: '+document.getElementById('gstin').value+'</p><p>Bill to: '+document.getElementById('buyer').value+'</p><p>Invoice: '+document.getElementById('inv').value+' · Date: '+new Date().toLocaleDateString('en-IN')+'</p><table><tr><th>Description</th><th>Taxable</th><th>GST</th><th>Total</th></tr><tr><td>'+document.getElementById('desc').value+'</td><td>'+fmt(base)+'</td><td>'+fmt(gst)+'</td><td>'+fmt(total)+'</td></tr></table><p><small>Template only—not legal advice. Use your CA for compliance.</small></p>';
}
document.getElementById('fill').onclick=fill;
document.getElementById('print').onclick=()=>{ fill(); window.print(); };
fill();
</script>`,
    },
    {
      path: "/inr-words.html",
      file: "inr-words.html",
      category: "india",
      title: "Rupee Amount in Words — INR Number to Words",
      desc: "Convert Indian rupee amounts to words (lakhs, crores). For cheques and invoices.",
      card: "INR in words",
      cardDesc: "Rupees in words (India).",
      body: `
<h1>Rupee amount in words</h1>${ad}
<div class="tool-panel">
  <label for="amt">Amount (₹)</label><input id="amt" type="number" step="0.01" value="123456.78" />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
</div>
<script>
const ones=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
const tens=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
function two(n){ if(n<20) return ones[n]; return tens[Math.floor(n/10)]+(n%10?' '+ones[n%10]:''); }
function section(n,label){ if(!n) return ''; return two(n)+' '+label+' '; }
function inrWords(x){
  if(!Number.isFinite(x)) return '';
  if(x===0) return 'Zero Rupees Only';
  const ru=Math.floor(x), pa=Math.round((x-ru)*100);
  let n=ru, str='';
  str+=section(Math.floor(n/10000000),'Crore'); n%=10000000;
  str+=section(Math.floor(n/100000),'Lakh'); n%=100000;
  str+=section(Math.floor(n/1000),'Thousand'); n%=1000;
  str+=section(Math.floor(n/100),'Hundred'); n%=100;
  if(ru%100) str+=two(n)+' ';
  str=str.trim()+' Rupees';
  if(pa) str+=' and '+two(pa)+' Paise';
  return str+' Only';
}
document.getElementById('go').onclick=()=>{
  document.getElementById('out').textContent=inrWords(Number(document.getElementById('amt').value));
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/compound-interest.html",
      file: "compound-interest.html",
      category: "calculators",
      title: "Compound Interest Calculator — Lump Sum",
      desc: "Calculate maturity value for lump sum investment with compound interest. Free online calculator.",
      card: "Compound interest",
      cardDesc: "Lump sum FV calculator.",
      body: `
<h1>Compound interest calculator</h1>${ad}
<div class="tool-panel">
  <label for="p">Principal (₹)</label><input id="p" type="number" value="100000" />
  <label for="r">Annual rate (%)</label><input id="r" type="number" step="0.1" value="8" />
  <label for="y">Years</label><input id="y" type="number" value="5" />
  <label for="n">Compounds per year</label><select id="n"><option value="1">Yearly</option><option value="4" selected>Quarterly</option><option value="12">Monthly</option></select>
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=Number(document.getElementById('p').value), r=Number(document.getElementById('r').value)/100;
  const y=Number(document.getElementById('y').value), n=Number(document.getElementById('n').value);
  const fv=P*Math.pow(1+r/n,n*y);
  document.getElementById('out').textContent='Maturity: ₹'+Math.round(fv).toLocaleString('en-IN')+' (interest ₹'+Math.round(fv-P).toLocaleString('en-IN')+')';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/fd-calculator.html",
      file: "fd-calculator.html",
      category: "calculators",
      title: "FD Calculator India — Fixed Deposit Maturity",
      desc: "Estimate fixed deposit maturity with quarterly compounding. Illustration only.",
      card: "FD calculator",
      cardDesc: "Fixed deposit estimate.",
      body: `
<h1>FD calculator (India)</h1>${ad}
<div class="tool-panel">
  <label for="p">Deposit (₹)</label><input id="p" type="number" value="200000" />
  <label for="r">Rate (% p.a.)</label><input id="r" type="number" step="0.1" value="7" />
  <label for="y">Years</label><input id="y" type="number" value="3" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
  <p class="prose" style="font-size:0.85rem">Assumes quarterly compounding; bank rules vary.</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=Number(document.getElementById('p').value), r=Number(document.getElementById('r').value)/100;
  const y=Number(document.getElementById('y').value);
  const fv=P*Math.pow(1+r/4,4*y);
  document.getElementById('out').textContent='Maturity ≈ ₹'+Math.round(fv).toLocaleString('en-IN');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/rd-calculator.html",
      file: "rd-calculator.html",
      category: "calculators",
      title: "RD Calculator India — Recurring Deposit",
      desc: "Estimate recurring deposit maturity for monthly deposits. Free RD calculator.",
      card: "RD calculator",
      cardDesc: "Monthly RD maturity.",
      body: `
<h1>RD calculator (India)</h1>${ad}
<div class="tool-panel">
  <label for="p">Monthly deposit (₹)</label><input id="p" type="number" value="5000" />
  <label for="r">Rate (% p.a.)</label><input id="r" type="number" step="0.1" value="6.5" />
  <label for="m">Months</label><input id="m" type="number" value="36" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=Number(document.getElementById('p').value), m=Number(document.getElementById('m').value);
  const i=Number(document.getElementById('r').value)/100/12;
  const fv=i===0?P*m:P*((Math.pow(1+i,m)-1)/i)*(1+i);
  document.getElementById('out').textContent='Maturity ≈ ₹'+Math.round(fv).toLocaleString('en-IN')+' (deposited ₹'+(P*m).toLocaleString('en-IN')+')';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/cgpa-calculator.html",
      file: "cgpa-calculator.html",
      category: "india",
      title: "CGPA to Percentage Calculator — 10 Point Scale",
      desc: "Convert CGPA to percentage using common Indian formulas. Illustration for students.",
      card: "CGPA to %",
      cardDesc: "CGPA → percentage estimate.",
      body: `
<h1>CGPA to percentage</h1>${ad}
<div class="tool-panel">
  <label for="cgpa">CGPA (0–10)</label><input id="cgpa" type="number" step="0.01" max="10" value="8.2" />
  <label for="mult">Formula</label>
  <select id="mult"><option value="9.5">CGPA × 9.5 (common)</option><option value="10">CGPA × 10</option><option value="custom">Custom multiplier</option></select>
  <label for="custom" hidden>Multiplier</label><input id="custom" type="number" step="0.1" value="9.5" hidden />
  <button type="button" class="primary" id="go">Convert</button>
  <p id="out" class="ok"></p>
  <p class="prose" style="font-size:0.85rem">Universities use different rules—check your transcript.</p>
</div>
<script>
document.getElementById('mult').onchange=()=>{
  const c=document.getElementById('mult').value==='custom';
  document.getElementById('custom').hidden=!c;
};
document.getElementById('go').onclick=()=>{
  const g=Number(document.getElementById('cgpa').value);
  let m=document.getElementById('mult').value;
  if(m==='custom') m=Number(document.getElementById('custom').value);
  else m=Number(m);
  document.getElementById('out').textContent='≈ '+(g*m).toFixed(2)+'%';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/fuel-cost-calculator.html",
      file: "fuel-cost-calculator.html",
      category: "calculators",
      title: "Trip Fuel Cost Calculator — Petrol & Diesel",
      desc: "Estimate fuel cost from distance, mileage, and price per litre.",
      card: "Fuel trip cost",
      cardDesc: "Distance × mileage cost.",
      body: `
<h1>Trip fuel cost calculator</h1>${ad}
<div class="tool-panel">
  <label for="km">Distance (km)</label><input id="km" type="number" value="350" />
  <label for="mil">Mileage (km/l)</label><input id="mil" type="number" step="0.1" value="15" />
  <label for="price">Price per litre (₹)</label><input id="price" type="number" step="0.1" value="100" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const km=Number(document.getElementById('km').value), mil=Number(document.getElementById('mil').value);
  const price=Number(document.getElementById('price').value);
  const litres=km/mil, cost=litres*price;
  document.getElementById('out').textContent=litres.toFixed(1)+' L · about ₹'+Math.round(cost).toLocaleString('en-IN');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/salary-calculator.html",
      file: "salary-calculator.html",
      category: "india",
      title: "Simple In-Hand Salary Estimator India",
      desc: "Rough monthly in-hand from CTC with basic PF placeholder. Not a payroll system.",
      card: "Salary estimator",
      cardDesc: "Rough in-hand from CTC.",
      body: `
<h1>Simple salary estimator</h1>${ad}
<div class="tool-panel">
  <label for="ctc">CTC per year (₹)</label><input id="ctc" type="number" value="1200000" />
  <label for="pf">Employee PF (% of basic, approx)</label><input id="pf" type="number" value="12" />
  <button type="button" class="primary" id="go">Estimate</button>
  <p id="out" class="ok"></p>
  <p class="prose" style="font-size:0.85rem">Very rough: assumes 40% basic, standard PF slice only. Excludes tax, HRA, and benefits.</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const ctc=Number(document.getElementById('ctc').value);
  const monthly=ctc/12, basic=monthly*0.4;
  const pf=basic*(Number(document.getElementById('pf').value)/100);
  const hand=monthly-pf;
  document.getElementById('out').textContent='≈ ₹'+Math.round(hand).toLocaleString('en-IN')+' / month in-hand before income tax';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/free-online-chat.html",
      file: "free-online-chat.html",
      category: "chat",
      title: "Free Online Chat Rooms — Y-Chat",
      desc: "Join free browser chat rooms and private messenger. No download. 18+ terms apply.",
      card: "Free online chat",
      cardDesc: "Y-Chat rooms in browser.",
      body: `
<h1>Free online chat rooms</h1>${ad}
<p>Y-Chat is a free Yahoo-style chat experience in your browser—public rooms and private IM.</p>
<p><a class="primary" style="display:inline-block;padding:12px 20px;border-radius:10px;background:var(--purple);color:#fff;text-decoration:none" href="/y-chat/">Open Y-Chat</a></p>
<ul>
  <li>No app install—works on mobile and desktop</li>
  <li>Must accept 18+ terms before chatting</li>
  <li>Also browse our <a href="/">free calculators and writing tools</a></li>
</ul>`,
    },
    {
      path: "/hindi-chat.html",
      file: "hindi-chat.html",
      category: "chat",
      title: "Hindi Chat Room Online Free — Y-Chat",
      desc: "Free Hindi-friendly chat rooms in the browser via Y-Chat. 18+ only.",
      card: "Hindi chat",
      cardDesc: "Chat in Hindi on Y-Chat.",
      body: `
<h1>Hindi chat online</h1>${ad}
<p>Meet people in open chat rooms on <a href="/y-chat/">Y-Chat</a>. You can type in Hindi or any language your room supports.</p>
<p><a href="/y-chat/" class="primary" style="display:inline-block;padding:12px 20px;border-radius:10px;background:var(--purple);color:#fff;text-decoration:none">Start chatting</a></p>
<p>Be respectful; report abuse per site terms. Adults 18+ only.</p>`,
    },
    {
      path: "/study-chat.html",
      file: "study-chat.html",
      category: "chat",
      title: "Study Chat & Group Study Online — Y-Chat",
      desc: "Free study chat rooms for students to coordinate group study in the browser.",
      card: "Study chat",
      cardDesc: "Group study rooms on Y-Chat.",
      body: `
<h1>Study chat rooms</h1>${ad}
<p>Use Y-Chat to coordinate group study, share links, and stay accountable—without installing another app.</p>
<p><a href="/y-chat/">Join Y-Chat</a> and pick or create a room for your subject.</p>
<p>Pair with our <a href="/typing-test.html">typing test</a>, <a href="/word-counter.html">word counter</a>, and <a href="/cgpa-calculator.html">CGPA tool</a>.</p>`,
    },
    {
      path: "/lorem-ipsum.html",
      file: "lorem-ipsum.html",
      category: "writing",
      title: "Lorem Ipsum Generator — Placeholder Text",
      desc: "Generate lorem ipsum placeholder paragraphs for mockups and design.",
      card: "Lorem ipsum",
      cardDesc: "Placeholder paragraphs.",
      body: `
<h1>Lorem ipsum generator</h1>${ad}
<div class="tool-panel">
  <label for="p">Paragraphs</label><input id="p" type="number" min="1" max="10" value="3" />
  <button type="button" class="primary" id="go">Generate</button>
  <textarea id="out" rows="10" readonly></textarea>
  <button type="button" class="primary" id="copy">Copy</button>
</div>
<script>
const base='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';
document.getElementById('go').onclick=()=>{
  const n=Math.min(10,Math.max(1,Number(document.getElementById('p').value)||1));
  document.getElementById('out').value=Array.from({length:n},(_,i)=>base+' Paragraph '+(i+1)+'.').join('\\n\\n');
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/url-encoder.html",
      file: "url-encoder.html",
      category: "developer",
      title: "URL Encoder & Decoder — Percent Encoding",
      desc: "Encode or decode URLs and query strings with encodeURIComponent.",
      card: "URL encode/decode",
      cardDesc: "Percent-encode URLs.",
      body: `
<h1>URL encoder / decoder</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label><textarea id="text" spellcheck="false"></textarea>
  <div class="row">
    <button type="button" class="primary" id="enc">Encode</button>
    <button type="button" class="primary" id="dec">Decode</button>
  </div>
</div>
<script>
const t=document.getElementById('text');
document.getElementById('enc').onclick=()=>{ t.value=encodeURIComponent(t.value); };
document.getElementById('dec').onclick=()=>{ try{ t.value=decodeURIComponent(t.value); }catch(e){ alert('Invalid encoding'); } };
</script>`,
    },
    {
      path: "/html-entities.html",
      file: "html-entities.html",
      category: "developer",
      title: "HTML Entity Encoder & Decoder",
      desc: "Escape or unescape HTML entities for safe markup and snippets.",
      card: "HTML entities",
      cardDesc: "Escape HTML text.",
      body: `
<h1>HTML entity encoder</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label><textarea id="text" spellcheck="false"></textarea>
  <div class="row">
    <button type="button" class="primary" id="enc">Encode</button>
    <button type="button" class="primary" id="dec">Decode</button>
  </div>
</div>
<script>
const t=document.getElementById('text');
function enc(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }
function dec(s){ const d=document.createElement('div'); d.innerHTML=s; return d.textContent; }
document.getElementById('enc').onclick=()=>{ t.value=enc(t.value); };
document.getElementById('dec').onclick=()=>{ t.value=dec(t.value); };
</script>`,
    },
  ];
}
