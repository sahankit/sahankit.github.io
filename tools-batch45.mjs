/** Batch 45: everyday utilities — timestamps, MIME, subnet, India IDs, writing, PPI, distance. */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch45Tools(ad) {
  return [
    {
      path: "/unix-timestamp-converter.html",
      file: "unix-timestamp-converter.html",
      category: "developer",
      title: "Unix Timestamp Converter — Epoch to Date",
      desc: "Convert Unix epoch seconds (or milliseconds) to your local date and time, or convert a date picker value to a timestamp.",
      card: "Unix timestamp",
      cardDesc: "Epoch ↔ local date and time.",
      body: `<h1>Unix timestamp converter</h1>${ad}
<div class="tool-panel">
<label for="epoch">Unix timestamp</label>
<input id="epoch" type="text" inputmode="numeric" placeholder="e.g. 1700000000" spellcheck="false" />
<button type="button" class="primary" id="toDate">Timestamp → date</button>
<p id="fromEpoch" class="tool-feedback" role="status"></p>
<hr />
<label for="when">Date &amp; time</label>
<input id="when" type="datetime-local" />
<button type="button" class="primary" id="toEpoch">Date → timestamp</button>
<p id="fromDate" class="tool-feedback" role="status"></p>
</div>
<script>
function parseEpoch(raw){
  const n=Number(String(raw).replace(/\\s/g,''));
  if(!Number.isFinite(n)) return null;
  return Math.abs(n)>1e12? n : n*1000;
}
document.getElementById('toDate').onclick=function(){
  const ms=parseEpoch(document.getElementById('epoch').value);
  const el=document.getElementById('fromEpoch');
  if(ms==null){ el.textContent='Enter a valid number (seconds or milliseconds).'; return; }
  const d=new Date(ms);
  el.textContent='Local: '+d.toLocaleString()+' · ISO: '+d.toISOString()+' · ms: '+d.getTime();
  ${done}
};
document.getElementById('toEpoch').onclick=function(){
  const v=document.getElementById('when').value;
  const el=document.getElementById('fromDate');
  if(!v){ el.textContent='Pick a date and time.'; return; }
  const d=new Date(v);
  const ms=d.getTime();
  el.textContent='Seconds: '+Math.floor(ms/1000)+' · milliseconds: '+ms;
  ${done}
};
document.getElementById('epoch').value=String(Math.floor(Date.now()/1000));
</script>`,
    },
    {
      path: "/mime-type-lookup.html",
      file: "mime-type-lookup.html",
      category: "developer",
      title: "MIME Type Lookup — File Extension to MIME",
      desc: "Look up common MIME types from a file name or extension. Handy for HTTP headers, uploads, and APIs.",
      card: "MIME type lookup",
      cardDesc: "Extension → content-type.",
      body: `<h1>MIME type lookup</h1>${ad}
<div class="tool-panel">
<label for="name">File name or extension</label>
<input id="name" type="text" placeholder="report.pdf, .webp, audio/mpeg" spellcheck="false" />
<button type="button" class="primary" id="go">Lookup</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
const MAP={
  html:'text/html',htm:'text/html',css:'text/css',js:'text/javascript',mjs:'text/javascript',json:'application/json',
  xml:'application/xml',svg:'image/svg+xml',txt:'text/plain',csv:'text/csv',md:'text/markdown',
  pdf:'application/pdf',zip:'application/zip',gz:'application/gzip',tar:'application/x-tar',
  png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',webp:'image/webp',ico:'image/x-icon',
  mp3:'audio/mpeg',wav:'audio/wav',ogg:'audio/ogg',mp4:'video/mp4',webm:'video/webm',
  woff:'font/woff',woff2:'font/woff2',ttf:'font/ttf',otf:'font/otf',
  doc:'application/msword',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls:'application/vnd.ms-excel',xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt:'application/vnd.ms-powerpoint',pptx:'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};
const rev={};
Object.entries(MAP).forEach(([k,v])=>{ if(!rev[v]) rev[v]=k; });
document.getElementById('go').onclick=function(){
  let q=document.getElementById('name').value.trim().toLowerCase();
  const out=document.getElementById('out');
  if(!q){ out.textContent='Enter a file name, extension, or MIME type.'; return; }
  if(q.includes('/')){
    const ext=rev[q]||'—';
    out.textContent='MIME '+q+(ext!=='—' ? ' · common extension: .'+ext : '');
  }else{
    if(q.startsWith('.')) q=q.slice(1);
  const dot=q.lastIndexOf('.');
  const ext=(dot>=0? q.slice(dot+1): q).replace(/[^a-z0-9+]/g,'');
  const mime=MAP[ext];
  out.textContent=mime? 'MIME: '+mime+' (.'+ext+')' : 'No common MIME on file for .'+ext+'.';
  }
  ${done}
};
</script>`,
    },
    {
      path: "/subnet-calculator.html",
      file: "subnet-calculator.html",
      category: "developer",
      title: "IPv4 Subnet Calculator — CIDR & Network Range",
      desc: "Calculate network address, broadcast, host range, and usable hosts from an IPv4 address and CIDR prefix.",
      card: "Subnet calculator",
      cardDesc: "CIDR network and host count.",
      body: `<h1>IPv4 subnet calculator</h1>${ad}
<div class="tool-panel">
<label for="ip">IPv4 address</label><input id="ip" type="text" value="192.168.1.10" spellcheck="false" />
<label for="prefix">CIDR prefix (0–32)</label><input id="prefix" type="number" min="0" max="32" value="24" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function ipToInt(ip){
  const p=ip.trim().split('.').map(x=>Number(x));
  if(p.length!==4||p.some(n=>!Number.isInteger(n)||n<0||n>255)) return null;
  return ((p[0]<<24)>>>0)+(p[1]<<16)+(p[2]<<8)+p[3];
}
function intToIp(n){
  return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
}
document.getElementById('go').onclick=function(){
  const ip=document.getElementById('ip').value;
  const pre=Number(document.getElementById('prefix').value);
  const out=document.getElementById('out');
  const base=ipToInt(ip);
  if(base==null||!Number.isInteger(pre)||pre<0||pre>32){ out.textContent='Enter a valid IPv4 address and prefix (0–32).'; return; }
  const mask=pre===0?0:(0xffffffff<<(32-pre))>>>0;
  const net=(base&mask)>>>0;
  const bcast=(net|(~mask>>>0))>>>0;
  const hosts=pre>=31? (pre===31?2:1) : Math.max(0,bcast-net-1);
  const first=pre<=30? net+1 : net;
  const last=pre<=30? bcast-1 : bcast;
  out.textContent='Network '+intToIp(net)+'/'+pre+' · broadcast '+intToIp(bcast)+' · usable hosts ~'+hosts+' · range '+intToIp(first)+' – '+intToIp(last);
  ${done}
};
</script>`,
    },
    {
      path: "/gstin-validator.html",
      file: "gstin-validator.html",
      category: "india",
      title: "GSTIN Validator — Check GST Number Format",
      desc: "Validate a 15-character GSTIN format and checksum digit. For format checks only—not government verification.",
      card: "GSTIN validator",
      cardDesc: "Format & checksum check.",
      body: `<h1>GSTIN validator</h1>${ad}
<p class="tool-hint">Checks pattern and checksum only. Confirm on the official GST portal for legal use.</p>
<div class="tool-panel">
<label for="gstin">GSTIN</label><input id="gstin" type="text" maxlength="15" placeholder="15 characters" spellcheck="false" style="text-transform:uppercase" />
<button type="button" class="primary" id="go">Validate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
const chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function gstinOk(s){
  if(!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(s)) return false;
  let factor=1,sum=0;
  for(let i=0;i<14;i++){
    const code=chars.indexOf(s[i]);
    let add=factor*code;
    factor=factor===1?2:1;
    add=Math.floor(add/36)+(add%36);
    sum+=add;
  }
  const check=(36-(sum%36))%36;
  return chars[check]===s[14];
}
document.getElementById('go').onclick=function(){
  const s=document.getElementById('gstin').value.trim().toUpperCase().replace(/\\s/g,'');
  const out=document.getElementById('out');
  if(s.length!==15){ out.textContent='GSTIN must be exactly 15 characters.'; return; }
  out.textContent=gstinOk(s)? 'Looks valid (format + checksum).' : 'Invalid GSTIN pattern or checksum.';
  ${done}
};
</script>`,
    },
    {
      path: "/pan-card-validator.html",
      file: "pan-card-validator.html",
      category: "india",
      title: "PAN Card Validator — Format Check",
      desc: "Validate Indian PAN format (AAAAA9999A) and holder type from the fourth character.",
      card: "PAN validator",
      cardDesc: "Indian PAN format check.",
      body: `<h1>PAN card validator</h1>${ad}
<div class="tool-panel">
<label for="pan">PAN</label><input id="pan" type="text" maxlength="10" placeholder="ABCDE1234F" spellcheck="false" style="text-transform:uppercase" />
<button type="button" class="primary" id="go">Validate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
const TYPE={P:'Person',C:'Company',H:'HUF',F:'Firm',A:'Association of persons',T:'Trust',B:'Body of individuals',L:'Local authority',J:'Artificial juridical person',G:'Government'};
document.getElementById('go').onclick=function(){
  const s=document.getElementById('pan').value.trim().toUpperCase().replace(/\\s/g,'');
  const out=document.getElementById('out');
  if(!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(s)){ out.textContent='PAN must match AAAAA9999A (5 letters, 4 digits, 1 letter).'; return; }
  const t=TYPE[s[3]]||'Unknown type';
  out.textContent='Format OK · 4th letter suggests: '+t+' ('+s[3]+').';
  ${done}
};
</script>`,
    },
    {
      path: "/ifsc-validator.html",
      file: "ifsc-validator.html",
      category: "india",
      title: "IFSC Code Validator — Bank Branch Format",
      desc: "Validate 11-character Indian Financial System Code (IFSC) format: 4 letters, 0, then 6 alphanumeric.",
      card: "IFSC validator",
      cardDesc: "11-character IFSC format.",
      body: `<h1>IFSC code validator</h1>${ad}
<div class="tool-panel">
<label for="ifsc">IFSC</label><input id="ifsc" type="text" maxlength="11" placeholder="SBIN0001234" spellcheck="false" style="text-transform:uppercase" />
<button type="button" class="primary" id="go">Validate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const s=document.getElementById('ifsc').value.trim().toUpperCase().replace(/\\s/g,'');
  const out=document.getElementById('out');
  const ok=/^[A-Z]{4}0[A-Z0-9]{6}$/.test(s);
  out.textContent=ok? 'Format OK · bank code '+s.slice(0,4)+' · branch '+s.slice(5)+'.' : 'IFSC must be 4 letters + 0 + 6 alphanumeric (11 chars).';
  ${done}
};
</script>`,
    },
    {
      path: "/remove-duplicate-lines.html",
      file: "remove-duplicate-lines.html",
      category: "writing",
      title: "Remove Duplicate Lines — Deduplicate Text",
      desc: "Remove duplicate lines from a list or log while keeping the first occurrence. Case-sensitive option.",
      card: "Remove duplicate lines",
      cardDesc: "Dedupe line by line.",
      body: `<h1>Remove duplicate lines</h1>${ad}
<div class="tool-panel">
<label for="text">Text (one item per line)</label>
<textarea id="text" rows="10" spellcheck="false" placeholder="Paste lines…"></textarea>
<label><input type="checkbox" id="ins" checked /> Case-sensitive</label>
<button type="button" class="primary" id="go">Deduplicate</button>
<p id="stat" class="tool-feedback" role="status"></p>
<textarea id="out" rows="10" readonly spellcheck="false"></textarea>
</div>
<script>
document.getElementById('go').onclick=function(){
  const lines=document.getElementById('text').value.split(/\\n/);
  const ins=document.getElementById('ins').checked;
  const seen=new Set();
  const out=[];
  for(const line of lines){
    const key=ins? line : line.toLowerCase();
    if(seen.has(key)) continue;
    seen.add(key);
    out.push(line);
  }
  document.getElementById('out').value=out.join('\\n');
  document.getElementById('stat').textContent='Kept '+out.length+' of '+lines.length+' lines ('+(lines.length-out.length)+' removed).';
  ${done}
};
</script>`,
    },
    {
      path: "/json-path-finder.html",
      file: "json-path-finder.html",
      category: "developer",
      title: "JSON Path Finder — Dot Path Value",
      desc: "Extract a value from JSON using a simple dot path (e.g. user.name or items[0].id). Runs in your browser.",
      card: "JSON path finder",
      cardDesc: "Dot path into JSON.",
      body: `<h1>JSON path finder</h1>${ad}
<div class="tool-panel">
<label for="json">JSON</label>
<textarea id="json" rows="8" spellcheck="false" placeholder='{"user":{"name":"Ana"}}'></textarea>
<label for="path">Path</label>
<input id="path" type="text" value="user.name" spellcheck="false" />
<button type="button" class="primary" id="go">Get value</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function walk(obj, path){
  const parts=path.replace(/\\[(\\d+)\\]/g,'.$1').split('.').filter(Boolean);
  let cur=obj;
  for(const p of parts){
    if(cur==null) return undefined;
    cur=cur[(/^\\d+$/.test(p)? Number(p): p)];
  }
  return cur;
}
document.getElementById('go').onclick=function(){
  const out=document.getElementById('out');
  let data;
  try{ data=JSON.parse(document.getElementById('json').value); }
  catch(e){ out.textContent='Invalid JSON: '+e.message; return; }
  const v=walk(data, document.getElementById('path').value.trim());
  out.textContent=v===undefined? 'No value at that path.' : (typeof v==='object'? JSON.stringify(v): String(v));
  ${done}
};
</script>`,
    },
    {
      path: "/screen-ppi-calculator.html",
      file: "screen-ppi-calculator.html",
      category: "design",
      title: "Screen PPI Calculator — Pixels Per Inch",
      desc: "Calculate pixels per inch (PPI) from screen resolution and diagonal size in inches.",
      card: "Screen PPI",
      cardDesc: "PPI from resolution & size.",
      body: `<h1>Screen PPI calculator</h1>${ad}
<div class="tool-panel">
<label for="w">Width (px)</label><input id="w" type="number" value="1920" />
<label for="h">Height (px)</label><input id="h" type="number" value="1080" />
<label for="d">Diagonal (inches)</label><input id="d" type="number" step="0.1" value="24" />
<button type="button" class="primary" id="go">PPI</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const w=Number(document.getElementById('w').value)||0;
  const h=Number(document.getElementById('h').value)||0;
  const d=Number(document.getElementById('d').value)||0;
  const out=document.getElementById('out');
  if(w<=0||h<=0||d<=0){ out.textContent='Enter positive width, height, and diagonal.'; return; }
  const ppi=Math.sqrt(w*w+h*h)/d;
  out.textContent='≈ '+ppi.toFixed(2)+' PPI · '+w+'×'+h+' on '+d+'″ diagonal';
  ${done}
};
</script>`,
    },
    {
      path: "/haversine-distance-calculator.html",
      file: "haversine-distance-calculator.html",
      category: "calculators",
      title: "Haversine Distance — Lat/Lon to km & Miles",
      desc: "Calculate great-circle distance between two latitude/longitude points. Result in kilometres and miles.",
      card: "Haversine distance",
      cardDesc: "Distance between coordinates.",
      body: `<h1>Haversine distance calculator</h1>${ad}
<div class="tool-panel">
<label for="lat1">Point A latitude</label><input id="lat1" type="number" step="any" value="28.6139" />
<label for="lon1">Point A longitude</label><input id="lon1" type="number" step="any" value="77.209" />
<label for="lat2">Point B latitude</label><input id="lat2" type="number" step="any" value="19.076" />
<label for="lon2">Point B longitude</label><input id="lon2" type="number" step="any" value="72.8777" />
<button type="button" class="primary" id="go">Distance</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function hav(a,b,c,d){
  const R=6371000;
  const toRad=x=>x*Math.PI/180;
  const dLat=toRad(c-a), dLon=toRad(d-b);
  const lat1=toRad(a), lat2=toRad(c);
  const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));
}
document.getElementById('go').onclick=function(){
  const a=Number(document.getElementById('lat1').value);
  const b=Number(document.getElementById('lon1').value);
  const c=Number(document.getElementById('lat2').value);
  const d=Number(document.getElementById('lon2').value);
  const out=document.getElementById('out');
  if([a,b,c,d].some(n=>Number.isNaN(n))){ out.textContent='Enter valid coordinates.'; return; }
  const m=hav(a,b,c,d);
  out.textContent=(m/1000).toFixed(2)+' km · '+(m/1609.344).toFixed(2)+' miles';
  ${done}
};
</script>`,
    },
  ];
}