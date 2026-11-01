/** Batch 24 — More high-search-intent tools. */

export function batch24Tools(ad) {
  return [
    {
      path: "/youtube-title-character-counter.html",
      file: "youtube-title-character-counter.html",
      category: "seo",
      title: "YouTube Title Character Counter — Video Title Length",
      desc: "Count characters for YouTube video titles. Free counter with ~100 character SEO guidance for creators.",
      card: "YouTube title counter",
      cardDesc: "Video title length.",
      body: `<h1>YouTube title character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Video title</label><input id="text" type="text" placeholder="How to…" />
<div class="stats" id="stats"></div>
<p class="prose" style="font-size:0.85rem">Many creators aim for ~60–70 visible characters; YouTube allows longer titles.</p>
</div>
<script>
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+n+'</strong>Characters</div>'
    +'<div class="stat"><strong>'+(n<=70?'Good':'Long')+'</strong>~70 char guide</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/youtube-description-counter.html",
      file: "youtube-description-counter.html",
      category: "seo",
      title: "YouTube Description Character Counter — 5,000 Limit",
      desc: "Count characters in YouTube video descriptions. Free counter with 5,000 character limit reminder.",
      card: "YouTube description",
      cardDesc: "5,000 char limit.",
      body: `<h1>YouTube description character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Description</label><textarea id="text" rows="10" placeholder="Paste video description…"></textarea>
<div class="stats" id="stats"></div>
</div>
<script>
const LIM=5000;
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+n+'</strong>Used</div><div class="stat"><strong>'+(LIM-n)+'</strong>Left of 5,000</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/tiktok-caption-counter.html",
      file: "tiktok-caption-counter.html",
      category: "seo",
      title: "TikTok Caption Character Counter — Post Limit Checker",
      desc: "Count TikTok caption characters. Free counter for video captions and hashtags.",
      card: "TikTok caption counter",
      cardDesc: "Caption character count.",
      body: `<h1>TikTok caption character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Caption</label><textarea id="text" rows="6" placeholder="Caption + hashtags…"></textarea>
<div class="stats" id="stats"></div>
<p class="prose" style="font-size:0.85rem">TikTok captions are often cited around 2,200 characters (app limits may vary).</p>
</div>
<script>
const LIM=2200;
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML='<div class="stat"><strong>'+n+'</strong>Characters</div><div class="stat"><strong>'+(LIM-n)+'</strong>Left (2,200 guide)</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/open-graph-tag-generator.html",
      file: "open-graph-tag-generator.html",
      category: "seo",
      title: "Open Graph Tag Generator — OG Meta Tags for SEO",
      desc: "Generate Open Graph and Twitter Card meta tags for link previews. Copy HTML for your page head.",
      card: "Open Graph generator",
      cardDesc: "OG + Twitter meta tags.",
      body: `<h1>Open Graph tag generator</h1>${ad}
<div class="tool-panel">
<label for="title">og:title</label><input id="title" type="text" placeholder="Page title" />
<label for="desc">og:description</label><textarea id="desc" rows="3" placeholder="Short summary"></textarea>
<label for="url">og:url</label><input id="url" type="url" placeholder="https://example.com/page" />
<label for="img">og:image URL</label><input id="img" type="url" placeholder="https://example.com/og.png" />
<button type="button" class="primary" id="go">Generate tags</button>
<textarea id="out" rows="12" readonly style="font-family:monospace;font-size:0.82rem"></textarea>
<button type="button" class="primary rs-secondary" id="copy">Copy HTML</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const t=document.getElementById('title').value.trim();
  const d=document.getElementById('desc').value.trim();
  const u=document.getElementById('url').value.trim();
  const i=document.getElementById('img').value.trim();
  const lines=[
    t&&'<meta property="og:title" content="'+t.replace(/"/g,'&quot;')+'" />',
    d&&'<meta property="og:description" content="'+d.replace(/"/g,'&quot;')+'" />',
    u&&'<meta property="og:url" content="'+u.replace(/"/g,'&quot;')+'" />',
    i&&'<meta property="og:image" content="'+i.replace(/"/g,'&quot;')+'" />',
    '<meta property="og:type" content="website" />',
    t&&'<meta name="twitter:card" content="summary_large_image" />',
    t&&'<meta name="twitter:title" content="'+t.replace(/"/g,'&quot;')+'" />',
    d&&'<meta name="twitter:description" content="'+d.replace(/"/g,'&quot;')+'" />',
    i&&'<meta name="twitter:image" content="'+i.replace(/"/g,'&quot;')+'" />',
  ].filter(Boolean);
  document.getElementById('out').value=lines.join('\\n');
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/hashtag-generator.html",
      file: "hashtag-generator.html",
      category: "seo",
      title: "Hashtag Generator — Instagram & TikTok Hashtags from Text",
      desc: "Generate hashtag ideas from keywords in your caption. Free hashtag helper for social posts.",
      card: "Hashtag generator",
      cardDesc: "Tags from keywords.",
      body: `<h1>Hashtag generator</h1>${ad}
<div class="tool-panel">
<label for="text">Topic or caption keywords</label><textarea id="text" rows="4" placeholder="coffee shop latte art morning"></textarea>
<button type="button" class="primary" id="go">Suggest hashtags</button>
<p id="out" class="ok" style="word-break:break-word"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const words=(document.getElementById('text').value.toLowerCase().match(/[a-z0-9]{3,}/g)||[]);
  const uniq=[...new Set(words)].slice(0,12);
  if(!uniq.length){ document.getElementById('out').textContent='Enter a few keywords.'; return; }
  const tags=uniq.flatMap(w=>['#'+w,'#'+w+'s','#'+w+'tips']).slice(0,20);
  document.getElementById('out').textContent=[...new Set(tags)].join(' ');
};
</script>`,
    },
    {
      path: "/concrete-calculator.html",
      file: "concrete-calculator.html",
      category: "calculators",
      title: "Concrete Calculator — Cubic Yards & Bags Estimate",
      desc: "Estimate concrete volume for slabs from length, width, and thickness. Free cubic yard calculator.",
      card: "Concrete calculator",
      cardDesc: "Slab volume & bags.",
      body: `<h1>Concrete calculator</h1>${ad}
<div class="tool-panel">
<label for="L">Length (feet)</label><input id="L" type="number" value="10" />
<label for="W">Width (feet)</label><input id="W" type="number" value="10" />
<label for="T">Thickness (inches)</label><input id="T" type="number" value="4" />
<button type="button" class="primary" id="go">Calculate</button>
<div class="stats" id="stats"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const cuft=+document.getElementById('L').value*+document.getElementById('W').value*(+document.getElementById('T').value/12);
  const cuyd=cuft/27;
  const bags80=Math.ceil(cuft/0.6);
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+cuyd.toFixed(2)+'</strong>Cubic yards</div>'
    +'<div class="stat"><strong>'+cuft.toFixed(1)+'</strong>Cubic feet</div>'
    +'<div class="stat"><strong>~'+bags80+'</strong>80-lb bags (rule of thumb)</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/paint-calculator.html",
      file: "paint-calculator.html",
      category: "calculators",
      title: "Paint Calculator — Gallons for Room Walls",
      desc: "Estimate paint gallons from wall square footage and coats. Free paint coverage calculator.",
      card: "Paint calculator",
      cardDesc: "Gallons needed.",
      body: `<h1>Paint calculator</h1>${ad}
<div class="tool-panel">
<label for="sq">Wall area (square feet)</label><input id="sq" type="number" value="400" />
<label for="coats">Number of coats</label><input id="coats" type="number" min="1" value="2" />
<label for="cov">Coverage (sq ft per gallon)</label><input id="cov" type="number" value="350" />
<button type="button" class="primary" id="go">Estimate paint</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const gal=(+document.getElementById('sq').value*+document.getElementById('coats').value)/+document.getElementById('cov').value;
  document.getElementById('out').textContent='About '+gal.toFixed(2)+' gallons needed (add 10% for waste on big jobs).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/water-intake-calculator.html",
      file: "water-intake-calculator.html",
      category: "calculators",
      title: "Water Intake Calculator — Daily Hydration in Liters & Oz",
      desc: "Estimate daily water intake from body weight. Free hydration calculator—general guidance only.",
      card: "Water intake",
      cardDesc: "Daily hydration estimate.",
      body: `<h1>Water intake calculator</h1>${ad}
<div class="tool-panel">
<label for="kg">Body weight (kg)</label><input id="kg" type="number" value="70" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
<p class="prose" style="font-size:0.85rem">Common rule: ~30–35 ml per kg per day (adjust for activity and climate).</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const kg=+document.getElementById('kg').value;
  const ml=kg*33;
  const oz=ml/29.5735;
  const cups=oz/8;
  document.getElementById('out').textContent='About '+Math.round(ml)+' ml/day (~'+oz.toFixed(0)+' fl oz, ~'+cups.toFixed(1)+' cups).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/body-fat-calculator.html",
      file: "body-fat-calculator.html",
      category: "calculators",
      title: "Body Fat Calculator — US Navy Method Estimate",
      desc: "Estimate body fat percentage from height, neck, waist, and hip measurements. Illustration only.",
      card: "Body fat %",
      cardDesc: "Navy method estimate.",
      body: `<h1>Body fat calculator (US Navy)</h1>${ad}
<div class="tool-panel">
<label for="sex">Sex</label><select id="sex"><option value="m">Male</option><option value="f">Female</option></select>
<label for="h">Height (cm)</label><input id="h" type="number" value="175" />
<label for="neck">Neck (cm)</label><input id="neck" type="number" step="0.1" value="38" />
<label for="waist">Waist (cm, at navel)</label><input id="waist" type="number" step="0.1" value="85" />
<label for="hip">Hip (cm, women only)</label><input id="hip" type="number" step="0.1" value="95" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const male=document.getElementById('sex').value==='m';
  const h=+document.getElementById('h').value/2.54;
  const neck=+document.getElementById('neck').value/2.54;
  const waist=+document.getElementById('waist').value/2.54;
  const hip=+document.getElementById('hip').value/2.54;
  let bf;
  if(male){
    bf=495/(1.0324-0.19077*Math.log10(waist-neck)+0.15456*Math.log10(h))-450;
  }else{
    bf=495/(1.29579-0.35004*Math.log10(waist+hip-neck)+0.22100*Math.log10(h))-450;
  }
  document.getElementById('out').textContent='Estimated body fat: '+bf.toFixed(1)+'%. Not a medical measurement.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/one-rep-max-calculator.html",
      file: "one-rep-max-calculator.html",
      category: "calculators",
      title: "One Rep Max Calculator — 1RM from Weight & Reps",
      desc: "Estimate your one-rep max (1RM) from submaximal weight and reps. Free strength calculator (Epley formula).",
      card: "One rep max (1RM)",
      cardDesc: "Epley 1RM estimate.",
      body: `<h1>One rep max calculator</h1>${ad}
<div class="tool-panel">
<label for="w">Weight lifted</label><input id="w" type="number" value="100" />
<label for="r">Reps completed</label><input id="r" type="number" min="1" max="12" value="5" />
<button type="button" class="primary" id="go">Estimate 1RM</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const w=+document.getElementById('w').value, r=+document.getElementById('r').value;
  const rm=w*(1+r/30);
  document.getElementById('out').textContent='Estimated 1RM: '+rm.toFixed(1)+' (Epley). Use a spotter for true max tests.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/steps-to-miles-calculator.html",
      file: "steps-to-miles-calculator.html",
      category: "calculators",
      title: "Steps to Miles Calculator — Convert Steps to Distance",
      desc: "Convert step count to miles or kilometers using stride length. Free steps-to-miles calculator.",
      card: "Steps to miles",
      cardDesc: "Steps → distance.",
      body: `<h1>Steps to miles calculator</h1>${ad}
<div class="tool-panel">
<label for="steps">Steps</label><input id="steps" type="number" value="10000" />
<label for="stride">Stride (inches)</label><input id="stride" type="number" step="0.1" value="30" />
<button type="button" class="primary" id="go">Convert</button>
<div class="stats" id="stats"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const miles=(+document.getElementById('steps').value*+document.getElementById('stride').value)/63360;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>'+miles.toFixed(2)+'</strong>Miles</div>'
    +'<div class="stat"><strong>'+(miles*1.60934).toFixed(2)+'</strong>Kilometers</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/dti-calculator.html",
      file: "dti-calculator.html",
      category: "calculators",
      title: "DTI Calculator — Debt-to-Income Ratio",
      desc: "Calculate debt-to-income (DTI) ratio from monthly debt payments and gross income. Free mortgage qualifier helper.",
      card: "DTI calculator",
      cardDesc: "Debt-to-income ratio.",
      body: `<h1>Debt-to-income (DTI) calculator</h1>${ad}
<div class="tool-panel">
<label for="inc">Gross monthly income ($)</label><input id="inc" type="number" value="6000" />
<label for="debt">Total monthly debt payments ($)</label><input id="debt" type="number" value="1800" />
<button type="button" class="primary" id="go">Calculate DTI</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const dti=(+document.getElementById('debt').value/+document.getElementById('inc').value)*100;
  let note=dti<=36?'Often considered strong for lenders.':'High for many mortgage programs—pay down debt or increase income.';
  document.getElementById('out').textContent='DTI: '+dti.toFixed(1)+'%. '+note;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/loan-to-value-calculator.html",
      file: "loan-to-value-calculator.html",
      category: "calculators",
      title: "Loan to Value (LTV) Calculator — LTV Ratio",
      desc: "Calculate LTV ratio from loan amount and property value. Free LTV calculator for home and auto loans.",
      card: "LTV calculator",
      cardDesc: "Loan ÷ property value.",
      body: `<h1>Loan-to-value (LTV) calculator</h1>${ad}
<div class="tool-panel">
<label for="loan">Loan amount ($)</label><input id="loan" type="number" value="360000" />
<label for="val">Property value ($)</label><input id="val" type="number" value="450000" />
<button type="button" class="primary" id="go">Calculate LTV</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const ltv=(+document.getElementById('loan').value/+document.getElementById('val').value)*100;
  document.getElementById('out').textContent='LTV: '+ltv.toFixed(2)+'%. Equity ~ '+(100-ltv).toFixed(1)+'%.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/epf-calculator.html",
      file: "epf-calculator.html",
      category: "india",
      title: "EPF Calculator India — Employee PF Contribution Estimate",
      desc: "Estimate monthly EPF (Provident Fund) employee and employer shares from basic salary. Illustration for India payroll.",
      card: "EPF calculator",
      cardDesc: "Employee PF estimate.",
      body: `<h1>EPF calculator (India)</h1>${ad}
<div class="tool-panel">
<label for="basic">Monthly basic salary (₹)</label><input id="basic" type="number" value="30000" />
<label for="rate">Employee PF rate (%)</label><input id="rate" type="number" step="0.01" value="12" />
<button type="button" class="primary" id="go">Calculate</button>
<div class="stats" id="stats"></div>
<p class="prose" style="font-size:0.85rem">Simplified: 12% of basic (wage ceiling rules not applied). Not payroll advice.</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const basic=+document.getElementById('basic').value;
  const r=+document.getElementById('rate').value/100;
  const emp=basic*r;
  const er=basic*r;
  document.getElementById('stats').innerHTML=
    '<div class="stat"><strong>₹'+Math.round(emp)+'</strong>Employee/month</div>'
    +'<div class="stat"><strong>₹'+Math.round(er)+'</strong>Employer/month (typical match)</div>'
    +'<div class="stat"><strong>₹'+Math.round(emp*12)+'</strong>Employee/year</div>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/military-time-converter.html",
      file: "military-time-converter.html",
      category: "productivity",
      title: "Military Time Converter — 24-Hour ↔ 12-Hour Clock",
      desc: "Convert between military time (24-hour) and standard 12-hour AM/PM time. Free time format converter.",
      card: "Military time",
      cardDesc: "24h ↔ 12h clock.",
      body: `<h1>Military time converter</h1>${ad}
<div class="tool-panel">
<label for="h24">24-hour time (HH:MM)</label><input id="h24" type="time" value="14:30" />
<label for="h12">12-hour result</label><input id="h12" type="text" readonly />
<button type="button" class="primary" id="go">Convert</button>
</div>
<script>
function conv(){
  const v=document.getElementById('h24').value; if(!v) return;
  const [H,M]=v.split(':').map(Number);
  const ap=H>=12?'PM':'AM';
  const h=H%12||12;
  document.getElementById('h12').value=h+':'+String(M).padStart(2,'0')+' '+ap+' ('+String(H).padStart(2,'0')+':'+String(M).padStart(2,'0')+' hrs)';
}
document.getElementById('h24').oninput=conv;
document.getElementById('go').onclick=conv;
conv();
</script>`,
    },
    {
      path: "/random-string-generator.html",
      file: "random-string-generator.html",
      category: "developer",
      title: "Random String Generator — Letters & Numbers",
      desc: "Generate random alphanumeric strings for IDs, tokens, and test data. Created locally in your browser.",
      card: "Random string",
      cardDesc: "Alphanumeric strings.",
      body: `<h1>Random string generator</h1>${ad}
<div class="tool-panel">
<label for="len">Length</label><input id="len" type="number" min="4" max="256" value="16" />
<label><input type="checkbox" id="sym" /> Include symbols</label>
<button type="button" class="primary" id="go">Generate</button>
<p id="out" class="ok" style="font-family:monospace;word-break:break-all"></p>
<button type="button" class="primary rs-secondary" id="copy" hidden>Copy</button>
</div>
<script>
function gen(){
  let chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  if(document.getElementById('sym').checked) chars+='!@#$%^&*-_=+';
  const n=+document.getElementById('len').value||16;
  const arr=new Uint32Array(n); crypto.getRandomValues(arr);
  let s=''; for(let i=0;i<n;i++) s+=chars[arr[i]%chars.length];
  document.getElementById('out').textContent=s;
  document.getElementById('copy').hidden=false;
}
document.getElementById('go').onclick=gen;
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').textContent);
gen();
</script>`,
    },
    {
      path: "/jpg-to-pdf.html",
      file: "jpg-to-pdf.html",
      category: "documents",
      title: "JPG to PDF — Convert Image to PDF Online",
      desc: "Convert JPG or PNG images to a PDF in your browser. Private conversion with pdf-lib—no cloud upload.",
      card: "JPG to PDF",
      cardDesc: "Image → PDF file.",
      body: `<h1>JPG to PDF</h1>${ad}
<div class="tool-panel">
<label for="file">Image (JPG or PNG)</label><input id="file" type="file" accept="image/jpeg,image/png,image/jpg" />
<button type="button" class="primary" id="go" disabled>Convert to PDF</button>
<p id="msg" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script type="module">
const f=document.getElementById('file'), btn=document.getElementById('go'), msg=document.getElementById('msg');
f.onchange=()=>{ btn.disabled=!f.files.length; msg.textContent=''; };
btn.onclick=async()=>{
  msg.textContent='Converting…';
  try{
    const { PDFDocument }=await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
    const file=f.files[0];
    const bytes=await file.arrayBuffer();
    const pdf=await PDFDocument.create();
    const img=file.type==='image/png'?await pdf.embedPng(bytes):await pdf.embedJpg(bytes);
    const { width, height }=img.scale(1);
    const page=pdf.addPage([width,height]);
    page.drawImage(img,{x:0,y:0,width,height});
    const saved=await pdf.save();
    const base=(file.name||'image').replace(/\\.(jpe?g|png)$/i,'');
    const a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([saved],{type:'application/pdf'}));
    a.download=base+'.pdf';
    a.click();
    msg.className='ok';
    msg.textContent='Downloaded '+base+'.pdf';
  }catch(e){ msg.className='error'; msg.textContent='Could not convert image.'; }
};
</script>`,
    },
  ];
}
