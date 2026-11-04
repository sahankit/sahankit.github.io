/** Batch 34: more high-search-volume tools (speed test, PDF/image, audio, student, dev). */

const toolComplete = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch34Tools(ad) {
  return [
    {
      path: "/internet-speed-test.html",
      file: "internet-speed-test.html",
      category: "tests",
      title: "Internet Speed Test — Check Download, Upload & Ping",
      desc: "Free internet speed test: measure your download and upload speed in Mbps, plus ping and jitter. Works for broadband, Wi-Fi, 4G and 5G—no app needed.",
      card: "Internet speed test",
      cardDesc: "Download, upload, ping in Mbps.",
      body: `<h1>Internet speed test</h1>${ad}
<div class="tool-panel speed" data-no-live>
<div class="speed-dial"><span class="speed-phase" id="phase">Ready</span><strong class="speed-num" id="num">0</strong><span class="speed-unit">Mbps</span><div class="speed-bar"><span id="bar"></span></div></div>
<button type="button" class="primary" id="go">Start speed test</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<div class="stats">
<div class="stat"><strong id="down">—</strong>Download (Mbps)</div>
<div class="stat"><strong id="up">—</strong>Upload (Mbps)</div>
<div class="stat"><strong id="ping">—</strong>Ping (ms)</div>
<div class="stat"><strong id="jitter">—</strong>Jitter (ms)</div>
</div>
<p class="tool-hint" id="meta"></p>
<p class="tool-hint">Measured against Cloudflare’s global network. On very fast connections a full test can use 100–500 MB of data.</p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const BASE='https://speed.cloudflare.com', DUR=8000, WARM=1500, DL_CAP=400e6, UL_CAP=150e6;
const fmt=v=>!(v>0)?'0':v>=100?v.toFixed(0):v>=10?v.toFixed(1):v.toFixed(2);
const rnd=()=>Math.random().toString(36).slice(2);
function show(phase,v){ $('phase').textContent=phase; $('num').textContent=fmt(v); $('bar').style.width=Math.min(100,Math.log10(1+Math.max(0,v))/3*100)+'%'; }
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
async function latency(){
  const t=[]; let meta=null;
  for(let i=0;i<11;i++){
    const s=performance.now();
    const r=await fetch(BASE+'/__down?bytes=0&r='+rnd(),{cache:'no-store'});
    await r.arrayBuffer();
    let el=performance.now()-s;
    const m=(r.headers.get('server-timing')||'').match(/dur=([0-9.]+)/);
    if(m) el-=parseFloat(m[1]);
    if(i===0){ meta={colo:r.headers.get('cf-meta-colo'),city:r.headers.get('cf-meta-city'),country:r.headers.get('cf-meta-country')}; continue; }
    t.push(Math.max(0.1,el));
    $('ping').textContent=Math.round(Math.min.apply(null,t));
  }
  const sorted=t.slice().sort((a,b)=>a-b), med=sorted[Math.floor(sorted.length/2)];
  let j=0; for(let i=1;i<t.length;i++) j+=Math.abs(t[i]-t[i-1]);
  return {ping:med,jitter:j/(t.length-1),meta};
}
function dlWorker(signal,add,fail){
  return (async()=>{
    while(!signal.aborted){
      try{
        const r=await fetch(BASE+'/__down?bytes=25000000&r='+rnd(),{cache:'no-store',signal});
        if(!r.ok||!r.body) throw new Error('HTTP '+r.status);
        const rd=r.body.getReader();
        for(;;){ const x=await rd.read(); if(x.done) break; add(x.value.length); }
      }catch(e){ if(!signal.aborted) fail(e); return; }
    }
  })();
}
let payload=null;
function ulWorker(signal,add,fail){
  if(!payload) payload=new Blob([new Uint8Array(4*1024*1024)]);
  return new Promise(resolve=>{
    const one=()=>{
      if(signal.aborted) return resolve();
      const x=new XMLHttpRequest(); let sent=0;
      x.open('POST',BASE+'/__up?r='+rnd());
      x.upload.onprogress=e=>{ add(e.loaded-sent); sent=e.loaded; };
      x.onload=()=>{ if(payload.size>sent) add(payload.size-sent); one(); };
      x.onerror=()=>{ if(!signal.aborted) fail(new Error('Upload failed')); resolve(); };
      x.onabort=()=>resolve();
      signal.addEventListener('abort',()=>x.abort(),{once:true});
      x.send(payload);
    };
    one();
  });
}
function measure(label,worker,cap){
  return new Promise(resolve=>{
    const ctrl=new AbortController(); let bytes=0, err=null;
    const add=n=>{ bytes+=n; }, fail=e=>{ err=err||e; };
    for(let i=0;i<4;i++) worker(ctrl.signal,add,fail);
    const t0=performance.now(); let base=null, lastB=0, lastT=t0, result=0;
    const iv=setInterval(()=>{
      const now=performance.now();
      if(!base&&now-t0>=WARM) base={b:bytes,t:now};
      const v=base&&now-base.t>250?(bytes-base.b)*8/((now-base.t)/1000)/1e6:(bytes-lastB)*8/((now-lastT)/1000)/1e6;
      lastB=bytes; lastT=now; result=v; show(label,v);
      if(now-t0>=DUR+WARM||bytes>=cap||(err&&bytes===0&&now-t0>1500)){ clearInterval(iv); ctrl.abort(); resolve({mbps:result,bytes,err}); }
    },200);
  });
}
const COLO={BOM:'Mumbai',DEL:'New Delhi',MAA:'Chennai',BLR:'Bengaluru',HYD:'Hyderabad',CCU:'Kolkata',AMD:'Ahmedabad',COK:'Kochi',NAG:'Nagpur',IXC:'Chandigarh',SIN:'Singapore',DXB:'Dubai',LHR:'London',FRA:'Frankfurt',AMS:'Amsterdam',CDG:'Paris',IAD:'Ashburn',EWR:'Newark',ORD:'Chicago',DFW:'Dallas',LAX:'Los Angeles',SJC:'San Jose',SEA:'Seattle',YYZ:'Toronto',NRT:'Tokyo',HKG:'Hong Kong',SYD:'Sydney',KHI:'Karachi',DAC:'Dhaka',CMB:'Colombo',KTM:'Kathmandu'};
async function serverInfo(){
  try{
    const r=await fetch(BASE+'/cdn-cgi/trace',{cache:'no-store'}), kv={};
    (await r.text()).split(String.fromCharCode(10)).forEach(l=>{ const i=l.indexOf('='); if(i>0) kv[l.slice(0,i)]=l.slice(i+1); });
    if(!kv.colo) return;
    let country=kv.loc||''; try{ if(country) country=new Intl.DisplayNames(['en'],{type:'region'}).of(country)||country; }catch(e){}
    $('meta').textContent='Test server: Cloudflare '+(COLO[kv.colo]?COLO[kv.colo]+' ('+kv.colo+')':kv.colo)+(country?' · You’re connecting from '+country:'');
  }catch(e){}
}
function verdict(m){ if(m>=100) return 'Great for 4K streaming, gaming and big downloads.'; if(m>=25) return 'Good for 4K streaming and video calls.'; if(m>=10) return 'Fine for HD streaming and video calls.'; if(m>=3) return 'OK for browsing and SD video.'; return 'Slow — pages and video may struggle.'; }
$('go').onclick=async()=>{
  ['down','up','ping','jitter'].forEach(id=>$(id).textContent='—'); $('meta').textContent='';
  if(navigator.onLine===false){ msg('You appear to be offline.','error'); return; }
  try{
    msg('Measuring ping…'); show('Ping',0);
    const L=await latency();
    $('ping').textContent=L.ping.toFixed(0); $('jitter').textContent=L.jitter.toFixed(1);
    if(L.meta&&L.meta.colo) $('meta').textContent='Test server: Cloudflare '+L.meta.colo+(L.meta.city?' · Your location: '+L.meta.city+(L.meta.country?', '+L.meta.country:''):'');
    else serverInfo();
    msg('Testing download speed…');
    const d=await measure('Download',dlWorker,DL_CAP);
    if(d.err&&d.bytes<1e5) throw d.err;
    $('down').textContent=fmt(d.mbps);
    msg('Testing upload speed…');
    const u=await measure('Upload',ulWorker,UL_CAP);
    const upOk=!(u.err&&u.bytes<1e5);
    $('up').textContent=upOk?fmt(u.mbps):'—';
    show('Download',d.mbps);
    msg('Download '+fmt(d.mbps)+' Mbps · Upload '+(upOk?fmt(u.mbps):'—')+' Mbps · Ping '+L.ping.toFixed(0)+' ms. '+verdict(d.mbps),'ok');
  }catch(e){ show('Ready',0); msg('The test could not reach the speed test server. Check your connection, VPN or ad blocker and try again.','error'); }
};
})();
</script>`,
    },
    {
      path: "/compress-pdf.html",
      file: "compress-pdf.html",
      category: "documents",
      title: "Compress PDF — Reduce PDF File Size Online Free",
      desc: "Compress PDF files in your browser. Choose strong, recommended or lossless compression, see the size saved, and download. Your PDF is never uploaded.",
      card: "Compress PDF",
      cardDesc: "Reduce PDF size, private.",
      body: `<h1>Compress PDF</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="file">Choose a PDF</label>
<input id="file" type="file" accept="application/pdf,.pdf" />
<label for="level">Compression level</label>
<select id="level">
<option value="strong">Strong — smallest file (96 dpi)</option>
<option value="medium" selected>Recommended — good quality (130 dpi)</option>
<option value="light">Light — high quality (170 dpi)</option>
<option value="lossless">Lossless — keep text selectable (smaller savings)</option>
</select>
<p class="tool-hint">Strong, Recommended and Light turn each page into a compressed image, so text is no longer selectable. Choose Lossless to keep text and links.</p>
<button type="button" class="primary" id="go" disabled>Compress PDF</button>
<div class="progress" id="prog" hidden><span id="bar"></span></div>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<div class="stats" id="stats" hidden>
<div class="stat"><strong id="before">—</strong>Original</div>
<div class="stat"><strong id="after">—</strong>Compressed</div>
<div class="stat"><strong id="saved">—</strong>Saved</div>
<div class="stat"><strong id="pages">—</strong>Pages</div>
</div>
<div class="row"><a class="btn-link" id="dl" href="#" download hidden>Download compressed PDF</a></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const LV={strong:{dpi:96,q:0.5},medium:{dpi:130,q:0.65},light:{dpi:170,q:0.8}};
let url='';
const kb=n=>n>=1048576?(n/1048576).toFixed(2)+' MB':Math.max(1,Math.round(n/1024))+' KB';
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
$('file').onchange=()=>{
  const f=$('file').files[0]; $('dl').hidden=true; $('stats').hidden=true; $('go').disabled=!f;
  if(f&&!/pdf$/i.test(f.type)&&!/[.]pdf$/i.test(f.name)){ msg('Please choose a PDF file.','error'); $('go').disabled=true; return; }
  msg(f?f.name+' · '+kb(f.size):'');
};
$('level').onchange=()=>{ $('dl').hidden=true; };
function jpeg(c,q){ return new Promise((res,rej)=>c.toBlob(b=>b?res(b):rej(new Error('Image encoding failed')),'image/jpeg',q)); }
$('go').onclick=async()=>{
  const f=$('file').files[0]; if(!f) return;
  const level=$('level').value, prog=$('prog'), bar=$('bar');
  $('dl').hidden=true; $('stats').hidden=true; prog.hidden=false; bar.style.width='0%';
  try{
    const buf=new Uint8Array(await f.arrayBuffer());
    const { PDFDocument }=await import('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/+esm');
    let out, pages;
    if(level==='lossless'){
      msg('Optimising PDF structure…');
      const doc=await PDFDocument.load(buf,{ignoreEncryption:true});
      pages=doc.getPageCount();
      out=await doc.save({useObjectStreams:true});
      bar.style.width='100%';
    } else {
      msg('Loading PDF engine…');
      const pdfjs=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
      const pdf=await pdfjs.getDocument({data:buf}).promise;
      pages=pdf.numPages;
      const doc=await PDFDocument.create(), opt=LV[level];
      const canvas=document.createElement('canvas'), ctx=canvas.getContext('2d');
      for(let i=1;i<=pages;i++){
        msg('Compressing page '+i+' of '+pages+'…');
        const page=await pdf.getPage(i), base=page.getViewport({scale:1});
        let scale=opt.dpi/72; const side=Math.max(base.width,base.height)*scale; if(side>4000) scale*=4000/side;
        const vp=page.getViewport({scale});
        canvas.width=Math.ceil(vp.width); canvas.height=Math.ceil(vp.height);
        ctx.fillStyle='#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
        await page.render({canvasContext:ctx,viewport:vp}).promise;
        const img=await doc.embedJpg(await (await jpeg(canvas,opt.q)).arrayBuffer());
        doc.addPage([base.width,base.height]).drawImage(img,{x:0,y:0,width:base.width,height:base.height});
        page.cleanup();
        bar.style.width=Math.round(i/pages*100)+'%';
      }
      canvas.width=canvas.height=0;
      out=await doc.save();
    }
    const saved=1-out.length/f.size;
    $('before').textContent=kb(f.size); $('after').textContent=kb(out.length); $('pages').textContent=pages;
    $('saved').textContent=saved>0?Math.round(saved*100)+'%':'0%'; $('stats').hidden=false;
    if(url) URL.revokeObjectURL(url);
    if(out.length>=f.size*0.98){ msg(level==='lossless'?'This PDF is already well optimised — keep your original, or try Recommended if it contains scanned pages or photos.':level==='strong'?'This PDF is mostly text, so it’s already compact — image compression would make it larger. Try Lossless, or keep your original.':'The result would be larger than your original. Try Strong for scanned PDFs, or Lossless for text-based PDFs.'); prog.hidden=true; return; }
    url=URL.createObjectURL(new Blob([out],{type:'application/pdf'}));
    const a=$('dl'); a.href=url; a.download=f.name.replace(/[.]pdf$/i,'')+'-compressed.pdf'; a.hidden=false;
    msg('Done! Reduced from '+kb(f.size)+' to '+kb(out.length)+'.','ok');
  }catch(e){
    const pw=e&&(e.name==='PasswordException'||/password|encrypt/i.test(e.message||''));
    msg(pw?'This PDF is password-protected. Remove the password first, then try again.':'Could not compress this PDF: '+((e&&e.message)||'unknown error'),'error');
  }
  prog.hidden=true;
};
})();
</script>`,
    },
    {
      path: "/pdf-to-jpg.html",
      file: "pdf-to-jpg.html",
      category: "documents",
      title: "PDF to JPG — Convert PDF Pages to Images Free",
      desc: "Convert PDF to JPG, PNG or WebP images in your browser. Pick quality up to 300 dpi, choose pages, and download one by one or all as a ZIP. No upload.",
      card: "PDF to JPG",
      cardDesc: "PDF pages to JPG/PNG images.",
      body: `<h1>PDF to JPG</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="file">Choose a PDF</label>
<input id="file" type="file" accept="application/pdf,.pdf" />
<div class="two-col">
<div><label for="fmt">Image format</label><select id="fmt"><option value="image/jpeg">JPG</option><option value="image/png">PNG (lossless)</option><option value="image/webp">WebP</option></select></div>
<div><label for="dpi">Quality</label><select id="dpi"><option value="96">Screen — 96 dpi</option><option value="150" selected>Standard — 150 dpi</option><option value="300">Print — 300 dpi</option></select></div>
</div>
<label for="range">Pages (optional)</label>
<input id="range" type="text" placeholder="All pages, or e.g. 1-3, 5" autocomplete="off" />
<button type="button" class="primary" id="go" disabled>Convert to images</button>
<div class="progress" id="prog" hidden><span id="bar"></span></div>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<div class="row"><button type="button" class="primary" id="zip" hidden>Download all (ZIP)</button></div>
<div class="thumbs" id="thumbs"></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
let files=[], urls=[];
const kb=n=>n>=1048576?(n/1048576).toFixed(2)+' MB':Math.max(1,Math.round(n/1024))+' KB';
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
function reset(){ urls.forEach(u=>URL.revokeObjectURL(u)); urls=[]; files=[]; $('thumbs').innerHTML=''; $('zip').hidden=true; }
$('file').onchange=()=>{ reset(); const f=$('file').files[0]; $('go').disabled=!f; msg(f?f.name+' · '+kb(f.size):''); };
function parseRange(s,n){
  s=s.trim(); if(!s) return Array.from({length:n},(_,i)=>i+1);
  const set=new Set();
  for(const part of s.split(',')){
    const m=part.trim().match(/^([0-9]+)(?: *[-–] *([0-9]+))?$/);
    if(!m) throw new Error('Invalid page range: '+part.trim());
    let a=+m[1], b=m[2]?+m[2]:a; if(a>b){ const t=a; a=b; b=t; }
    for(let i=Math.max(1,a);i<=Math.min(b,n);i++) set.add(i);
  }
  if(!set.size) throw new Error('No pages in that range — this PDF has '+n+' page'+(n>1?'s':'')+'.');
  return [...set].sort((x,y)=>x-y);
}
function encode(c,type){ return new Promise((res,rej)=>c.toBlob(b=>b?res(b):rej(new Error('Image encoding failed')),type,0.92)); }
$('go').onclick=async()=>{
  const f=$('file').files[0]; if(!f) return; reset();
  const type=$('fmt').value, ext=type==='image/png'?'png':type==='image/webp'?'webp':'jpg', dpi=+$('dpi').value;
  const prog=$('prog'), bar=$('bar'); prog.hidden=false; bar.style.width='0%';
  try{
    msg('Loading PDF engine…');
    const pdfjs=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
    const pdf=await pdfjs.getDocument({data:new Uint8Array(await f.arrayBuffer())}).promise;
    let list=parseRange($('range').value,pdf.numPages), capped=false;
    if(list.length>150){ list=list.slice(0,150); capped=true; }
    const base=f.name.replace(/[.]pdf$/i,'')||'page';
    const canvas=document.createElement('canvas'), ctx=canvas.getContext('2d');
    for(let k=0;k<list.length;k++){
      const i=list[k]; msg('Converting page '+i+' ('+(k+1)+' of '+list.length+')…');
      const page=await pdf.getPage(i), b=page.getViewport({scale:1});
      let scale=dpi/72; const side=Math.max(b.width,b.height)*scale; if(side>5000) scale*=5000/side;
      const vp=page.getViewport({scale}); canvas.width=Math.ceil(vp.width); canvas.height=Math.ceil(vp.height);
      if(type==='image/png') ctx.clearRect(0,0,canvas.width,canvas.height); else { ctx.fillStyle='#fff'; ctx.fillRect(0,0,canvas.width,canvas.height); }
      await page.render({canvasContext:ctx,viewport:vp}).promise; page.cleanup();
      const blob=await encode(canvas,type), name=base+'-page-'+i+'.'+ext, url=URL.createObjectURL(blob);
      files.push({name,blob}); urls.push(url);
      const fig=document.createElement('figure'); fig.className='thumb';
      fig.innerHTML='<a target="_blank" rel="noopener"><img alt="" loading="lazy" /></a><figcaption><span></span><a class="thumb-dl">Download</a></figcaption>';
      fig.querySelector('a').href=url; fig.querySelector('img').src=url; fig.querySelector('img').alt='Page '+i;
      fig.querySelector('span').textContent='Page '+i+' · '+kb(blob.size);
      const d=fig.querySelector('.thumb-dl'); d.href=url; d.download=name;
      $('thumbs').appendChild(fig);
      bar.style.width=Math.round((k+1)/list.length*100)+'%';
    }
    canvas.width=canvas.height=0;
    $('zip').hidden=files.length<2;
    msg('Done! '+files.length+' image'+(files.length>1?'s':'')+' ready'+(capped?' (first 150 pages — use a page range for the rest)':'')+'.','ok');
  }catch(e){ msg(e&&e.name==='PasswordException'?'This PDF is password-protected. Remove the password first.':((e&&e.message)||'Could not read this PDF.'),'error'); }
  prog.hidden=true;
};
function loadZip(){ return window.JSZip?Promise.resolve(window.JSZip):new Promise((res,rej)=>{ const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js'; s.onload=()=>res(window.JSZip); s.onerror=()=>rej(new Error('Could not load the ZIP library.')); document.head.appendChild(s); }); }
$('zip').onclick=async()=>{
  if(!files.length) return;
  try{
    const JSZip=await loadZip(), z=new JSZip(); files.forEach(f=>z.file(f.name,f.blob));
    const blob=await z.generateAsync({type:'blob'}), a=document.createElement('a');
    a.href=URL.createObjectURL(blob); a.download=(($('file').files[0]||{}).name||'pdf').replace(/[.]pdf$/i,'')+'-images.zip';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),5000);
  }catch(e){ msg(e.message,'error'); }
};
})();
</script>`,
    },
    {
      path: "/reduce-image-size-in-kb.html",
      file: "reduce-image-size-in-kb.html",
      category: "documents",
      title: "Reduce Image Size in KB — Compress Photo to 20KB, 50KB, 100KB",
      desc: "Reduce photo size to an exact KB target—20 KB, 50 KB, 100 KB or any size—for exam, job and government form uploads. Optional exact pixel size. Free, no upload.",
      card: "Reduce image size in KB",
      cardDesc: "Compress photo to 20/50/100 KB.",
      body: `<h1>Reduce image size in KB</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="file">Choose a photo (JPG, PNG or WebP)</label>
<input id="file" type="file" accept="image/*" />
<label for="target">Target size</label>
<div class="input-group"><input id="target" type="number" min="2" max="10000" step="1" value="50" inputmode="numeric" /><span class="input-suffix">KB or less</span></div>
<div class="chips" id="chips">
<button type="button" class="chip" data-kb="20">20 KB</button><button type="button" class="chip is-on" data-kb="50">50 KB</button><button type="button" class="chip" data-kb="100">100 KB</button><button type="button" class="chip" data-kb="200">200 KB</button><button type="button" class="chip" data-kb="500">500 KB</button><button type="button" class="chip" data-kb="1024">1 MB</button>
</div>
<details class="schedule"><summary>Optional: exact size in pixels (e.g. 200 × 230 for photos)</summary>
<div class="two-col"><div><label for="w">Width (px)</label><input id="w" type="number" min="1" max="8000" placeholder="auto" /></div><div><label for="h">Height (px)</label><input id="h" type="number" min="1" max="8000" placeholder="auto" /></div></div>
<p class="tool-hint">Leave one blank to keep the aspect ratio. Set both to stretch to an exact size.</p>
</details>
<label for="fmt">Format</label>
<select id="fmt"><option value="image/jpeg">JPG — accepted by most forms</option><option value="image/webp">WebP — smaller, modern</option></select>
<button type="button" class="primary" id="go" disabled>Reduce size</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<div class="stats" id="stats" hidden>
<div class="stat"><strong id="before">—</strong>Original</div>
<div class="stat"><strong id="after">—</strong>New size</div>
<div class="stat"><strong id="dims">—</strong>Pixels</div>
<div class="stat"><strong id="qual">—</strong>Quality</div>
</div>
<img id="preview" class="ocr-preview" alt="Compressed preview" hidden />
<div class="row"><a class="btn-link" id="dl" href="#" download hidden>Download image</a></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const canvas=document.createElement('canvas'), ctx=canvas.getContext('2d');
let url='';
const kb=n=>n>=1048576?(n/1048576).toFixed(2)+' MB':(n/1024).toFixed(n<10240?1:0)+' KB';
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
const chips=[...document.querySelectorAll('#chips .chip')];
function markChip(){ chips.forEach(x=>x.classList.toggle('is-on',x.dataset.kb===String(+$('target').value))); }
chips.forEach(b=>b.onclick=()=>{ $('target').value=b.dataset.kb; markChip(); });
$('target').addEventListener('input',markChip);
function clearOut(){ $('dl').hidden=true; $('stats').hidden=true; $('preview').hidden=true; }
$('file').onchange=()=>{
  const f=$('file').files[0]; clearOut(); $('go').disabled=!f;
  if(f&&!/^image[/]/.test(f.type)){ msg('Please choose an image file (JPG, PNG or WebP).','error'); $('go').disabled=true; return; }
  msg(f?f.name+' · '+kb(f.size):'');
};
async function decode(f){
  if(window.createImageBitmap){ try{ return await createImageBitmap(f,{imageOrientation:'from-image'}); }catch(e){} }
  return await new Promise((res,rej)=>{ const i=new Image(); i.onload=()=>res(i); i.onerror=()=>rej(new Error('Your browser can’t open this image format. Convert it to JPG first.')); i.src=URL.createObjectURL(f); });
}
function encode(src,w,h,type,q){
  canvas.width=w; canvas.height=h; ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h);
  ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high'; ctx.drawImage(src,0,0,w,h);
  return new Promise((res,rej)=>canvas.toBlob(b=>b?res(b):rej(new Error('Encoding failed')),type,q));
}
async function fit(src,w,h,type,target,lock){
  for(let round=0;round<12;round++){
    const hi=await encode(src,w,h,type,0.92);
    if(hi.size<=target) return {blob:hi,q:0.92,w,h};
    const floor=lock||round>=10||Math.max(w,h)<=320?0.08:0.5;
    const lo=await encode(src,w,h,type,floor);
    if(lo.size<=target){
      let a=floor,b=0.92,best={blob:lo,q:floor};
      for(let i=0;i<7;i++){ const m=(a+b)/2, bl=await encode(src,w,h,type,m); if(bl.size<=target){ best={blob:bl,q:m}; a=m; } else b=m; }
      return {blob:best.blob,q:best.q,w,h};
    }
    if(lock) return null;
    const k=Math.max(0.5,Math.min(0.92,Math.sqrt(target/lo.size)*0.97));
    w=Math.round(w*k); h=Math.round(h*k);
    if(w<24||h<24) return null;
  }
  return null;
}
function offer(blob,name){ if(url) URL.revokeObjectURL(url); url=URL.createObjectURL(blob); const p=$('preview'); p.src=url; p.hidden=false; const a=$('dl'); a.href=url; a.download=name; a.hidden=false; }
$('go').onclick=async()=>{
  const f=$('file').files[0]; if(!f) return;
  const tKB=+$('target').value; if(!(tKB>=2)){ msg('Enter a target size of at least 2 KB.','error'); return; }
  const target=Math.floor(tKB*1024), type=$('fmt').value; clearOut();
  try{
    msg('Compressing…');
    const src=await decode(f), iw=src.width||src.naturalWidth, ih=src.height||src.naturalHeight;
    let w=Math.round(+$('w').value)||0, h=Math.round(+$('h').value)||0; const lock=!!(w||h);
    if(w&&!h) h=Math.max(1,Math.round(ih*w/iw)); else if(h&&!w) w=Math.max(1,Math.round(iw*h/ih));
    else if(!w&&!h){ const s=Math.min(1,4000/Math.max(iw,ih)); w=Math.round(iw*s); h=Math.round(ih*s); }
    if(w>8000||h>8000){ msg('Maximum size is 8000 × 8000 pixels.','error'); return; }
    if(!lock&&f.size<=target&&f.type===type){
      $('before').textContent=kb(f.size); $('after').textContent=kb(f.size); $('dims').textContent=iw+' × '+ih; $('qual').textContent='Original'; $('stats').hidden=false;
      offer(f,f.name); msg('Your image is already '+kb(f.size)+' — under '+tKB+' KB, so no compression is needed.','ok'); return;
    }
    const r=await fit(src,w,h,type,target,lock);
    if(!r){ msg(lock?'Can’t reach '+tKB+' KB at '+w+' × '+h+' px. Increase the target size or reduce the pixel size.':'Can’t reach '+tKB+' KB for this image. Try a larger target.','error'); return; }
    $('before').textContent=kb(f.size); $('after').textContent=kb(r.blob.size); $('dims').textContent=r.w+' × '+r.h; $('qual').textContent=Math.round(r.q*100)+'%'; $('stats').hidden=false;
    offer(r.blob,(f.name.replace(/[.][^.]+$/,'')||'image')+'-'+Math.max(1,Math.round(r.blob.size/1024))+'kb.'+(type==='image/webp'?'webp':'jpg'));
    msg('Done! '+kb(f.size)+' → '+kb(r.blob.size)+(r.w!==w||r.h!==h?' (resized to '+r.w+' × '+r.h+' px to fit)':'')+'.','ok');
  }catch(e){ msg(e.message||'Could not process this image.','error'); }
};
})();
</script>`,
    },
    {
      path: "/passport-size-photo.html",
      file: "passport-size-photo.html",
      category: "documents",
      title: "Passport Size Photo Maker — 35×45 mm & 2×2 inch, Print Sheet",
      desc: "Make passport size photos online: 35×45 mm (India passport), 2×2 inch (US), PAN card and more. Position your face, then download a 300 dpi photo or a 4×6 print sheet.",
      card: "Passport size photo",
      cardDesc: "35×45 mm, 2×2 in, print sheet.",
      body: `<h1>Passport size photo maker</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="file">Choose a photo (face the camera, plain light background)</label>
<input id="file" type="file" accept="image/*" />
<label for="size">Photo size</label>
<select id="size">
<option value="35x45" selected>35 × 45 mm — India passport, UK, Schengen/EU, Australia</option>
<option value="51x51">2 × 2 inch (51 × 51 mm) — US passport &amp; visa, India visa/OCI</option>
<option value="25x35">25 × 35 mm — PAN card / stamp size</option>
<option value="33x48">33 × 48 mm — China visa</option>
<option value="50x70">50 × 70 mm — Canada passport</option>
</select>
<div class="pp-editor" id="editor" hidden>
<div class="pp-frame"><canvas id="cv" class="pp-canvas" tabindex="0" aria-label="Photo preview. Drag or use arrow keys to position your face."></canvas></div>
<div class="pp-controls">
<label for="zoom">Zoom</label><input id="zoom" type="range" min="1" max="4" step="0.01" value="1" />
<label for="bright">Brightness</label><input id="bright" type="range" min="0.7" max="1.4" step="0.01" value="1" />
<label><input type="checkbox" id="guide" checked /> Show face guide</label>
<p class="tool-hint">Line up the top of the head with the upper line and the chin with the lower line.</p>
<label for="sheet">Print sheet</label>
<select id="sheet"><option value="4x6">4 × 6 inch photo paper</option><option value="a4">A4 paper</option></select>
</div>
</div>
<div class="row"><button type="button" class="primary" id="go" disabled>Download photo</button><button type="button" class="primary" id="print" disabled>Download print sheet</button></div>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const cv=$('cv'), g=cv.getContext('2d'), DPI=300;
let img=null, z=1, ox=0, oy=0, drag=null;
const mm2px=mm=>Math.round(mm/25.4*DPI);
function dims(){ const p=$('size').value.split('x').map(Number); return {wmm:p[0],hmm:p[1]}; }
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
function cover(W,H){ return Math.max(W/img.width,H/img.height); }
function clamp(){ if(!img) return; const W=cv.width,H=cv.height,s=cover(W,H)*z, mx=Math.max(0,(img.width*s-W)/2/W), my=Math.max(0,(img.height*s-H)/2/H); ox=Math.max(-mx,Math.min(mx,ox)); oy=Math.max(-my,Math.min(my,oy)); }
function paint(ctx,W,H){
  const s=cover(W,H)*z, dw=img.width*s, dh=img.height*s;
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H); ctx.save();
  const b=+$('bright').value; if(b!==1) ctx.filter='brightness('+b+')';
  ctx.imageSmoothingQuality='high'; ctx.drawImage(img,W/2+ox*W-dw/2,H/2+oy*H-dh/2,dw,dh); ctx.restore();
}
function draw(){
  if(!img) return; const W=cv.width,H=cv.height; paint(g,W,H);
  if(!$('guide').checked) return;
  g.save(); g.strokeStyle='rgba(255,255,255,0.95)'; g.lineWidth=W/120; g.setLineDash([W/30,W/45]);
  g.beginPath(); g.ellipse(W/2,H*0.46,W*0.3,H*0.36,0,0,Math.PI*2); g.stroke();
  g.setLineDash([]); g.strokeStyle='rgba(114,14,158,0.9)'; g.lineWidth=W/250;
  g.beginPath(); g.moveTo(0,H*0.1); g.lineTo(W,H*0.1); g.moveTo(0,H*0.82); g.lineTo(W,H*0.82); g.stroke(); g.restore();
}
function layout(){ const d=dims(), cssW=Math.min(300,(cv.parentElement.clientWidth||300)), cssH=cssW*d.hmm/d.wmm; cv.style.width=cssW+'px'; cv.style.height=cssH+'px'; cv.width=Math.round(cssW*2); cv.height=Math.round(cssH*2); clamp(); draw(); }
async function open(f){
  let im=null;
  if(window.createImageBitmap){ try{ im=await createImageBitmap(f,{imageOrientation:'from-image'}); }catch(e){} }
  if(!im) im=await new Promise(res=>{ const i=new Image(); i.onload=()=>res(i); i.onerror=()=>res(null); i.src=URL.createObjectURL(f); });
  return im;
}
$('file').onchange=async()=>{
  const f=$('file').files[0]; if(!f) return;
  const im=await open(f); if(!im){ msg('Could not open this image. Try a JPG or PNG.','error'); return; }
  img=im; z=1; ox=0; oy=0; $('zoom').value=1; $('editor').hidden=false; $('go').disabled=false; $('print').disabled=false;
  layout(); msg('Drag the photo to position your face, and use Zoom to adjust its size.');
};
cv.addEventListener('pointerdown',e=>{ if(!img) return; e.preventDefault(); cv.setPointerCapture(e.pointerId); drag={x:e.clientX,y:e.clientY,ox,oy}; });
cv.addEventListener('pointermove',e=>{ if(!drag) return; const r=cv.getBoundingClientRect(); ox=drag.ox+(e.clientX-drag.x)/r.width; oy=drag.oy+(e.clientY-drag.y)/r.height; clamp(); draw(); });
['pointerup','pointercancel'].forEach(t=>cv.addEventListener(t,()=>{ drag=null; }));
cv.addEventListener('wheel',e=>{ if(!img) return; e.preventDefault(); z=Math.max(1,Math.min(4,z*(e.deltaY<0?1.05:1/1.05))); $('zoom').value=z; clamp(); draw(); },{passive:false});
cv.addEventListener('keydown',e=>{ const s=0.01, d={ArrowLeft:[-s,0],ArrowRight:[s,0],ArrowUp:[0,-s],ArrowDown:[0,s]}[e.key]; if(!d||!img) return; e.preventDefault(); ox+=d[0]; oy+=d[1]; clamp(); draw(); });
$('zoom').addEventListener('input',()=>{ z=+$('zoom').value; clamp(); draw(); });
$('bright').addEventListener('input',draw);
$('guide').addEventListener('change',draw);
$('size').addEventListener('change',()=>{ if(img) layout(); });
window.addEventListener('resize',()=>{ if(img) layout(); });
function setDpi(buf){ const u=new Uint8Array(buf); if(u[0]===255&&u[1]===216&&u[2]===255&&u[3]===224&&u[6]===74&&u[7]===70&&u[8]===73&&u[9]===70){ u[13]=1; u[14]=DPI>>8; u[15]=DPI&255; u[16]=DPI>>8; u[17]=DPI&255; } return u; }
function save(c,name){ return new Promise(res=>c.toBlob(async b=>{ const u=setDpi(await b.arrayBuffer()), a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([u],{type:'image/jpeg'})); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),5000); res(); },'image/jpeg',0.95)); }
function photo(){ const d=dims(), c=document.createElement('canvas'); c.width=mm2px(d.wmm); c.height=mm2px(d.hmm); paint(c.getContext('2d'),c.width,c.height); return c; }
$('go').onclick=()=>{ if(!img) return; const d=dims(), c=photo(); return save(c,'passport-photo-'+d.wmm+'x'+d.hmm+'mm.jpg').then(()=>msg('Photo saved: '+c.width+' × '+c.height+' px at 300 dpi ('+d.wmm+' × '+d.hmm+' mm).','ok')); };
$('print').onclick=()=>{
  if(!img) return;
  const ph=photo(), PW=ph.width, PH=ph.height, a4=$('sheet').value==='a4', gap=mm2px(2), m=mm2px(3);
  const fitN=(SW,SH)=>{ const cols=Math.max(1,Math.floor((SW-2*m+gap)/(PW+gap))), rows=Math.max(1,Math.floor((SH-2*m+gap)/(PH+gap))); return {SW,SH,cols,rows,n:cols*rows}; };
  const A=a4?2480:1200, B=a4?3508:1800, p=fitN(A,B), l=fitN(B,A), L=l.n>p.n?l:p;
  const c=document.createElement('canvas'); c.width=L.SW; c.height=L.SH; const x=c.getContext('2d');
  x.fillStyle='#fff'; x.fillRect(0,0,L.SW,L.SH); x.strokeStyle='#bbb'; x.lineWidth=2;
  const gw=L.cols*PW+(L.cols-1)*gap, gh=L.rows*PH+(L.rows-1)*gap, x0=Math.round((L.SW-gw)/2), y0=Math.round((L.SH-gh)/2);
  for(let r=0;r<L.rows;r++) for(let k=0;k<L.cols;k++){ const px=x0+k*(PW+gap), py=y0+r*(PH+gap); x.drawImage(ph,px,py); x.strokeRect(px-1,py-1,PW+2,PH+2); }
  return save(c,'passport-photos-'+(a4?'A4':'4x6')+'-'+L.n+'.jpg').then(()=>msg(L.n+' photos on a '+(a4?'A4':'4 × 6 inch')+' sheet. Print at 100% / actual size, not “fit to page”.','ok'));
};
})();
</script>`,
    },
    {
      path: "/signature-maker.html",
      file: "signature-maker.html",
      category: "documents",
      title: "Signature Maker — Draw or Type Your Signature Online",
      desc: "Create a digital signature online: draw with mouse, finger or stylus, or type your name in handwriting fonts. Download a transparent PNG for documents and forms.",
      card: "Signature maker",
      cardDesc: "Draw or type, transparent PNG.",
      body: `<h1>Signature maker</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="seg" role="radiogroup" aria-label="Signature mode"><label><input type="radio" name="mode" value="draw" checked /> Draw</label><label><input type="radio" name="mode" value="type" /> Type</label></div>
<div id="drawBox"><canvas id="pad" class="sig-pad" aria-label="Signature pad. Draw with your mouse, finger or stylus."></canvas><p class="tool-hint">Sign inside the box with your mouse, finger or stylus.</p></div>
<div id="typeBox" hidden><label for="name">Your name</label><input id="name" type="text" maxlength="40" placeholder="Type your name" autocomplete="name" /><div class="sig-fonts" id="fonts"></div></div>
<div class="two-col">
<div><label for="color">Ink colour</label><select id="color"><option value="#111111">Black</option><option value="#1a3fa8">Blue</option><option value="#b00020">Red</option></select></div>
<div><label for="width">Pen thickness</label><input id="width" type="range" min="1" max="8" step="0.5" value="2.5" /></div>
</div>
<div class="row"><button type="button" class="primary" id="go">Download PNG (transparent)</button><button type="button" class="primary" id="jpg">Download JPG (white)</button><button type="button" class="primary" id="undo">Undo</button><button type="button" class="primary" id="clear">Clear</button></div>
<p id="out" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const pad=$('pad'), g=pad.getContext('2d');
const FONTS=['Dancing Script','Great Vibes','Allura','Sacramento','Caveat','Homemade Apple'];
let strokes=[], cur=null, mode='draw', font=FONTS[0], fontsLoaded=false, fired=false;
function msg(t,c){ const s=$('out'); s.className=c||'tool-feedback'; s.textContent=t; }
function line(ctx,pts,w,color){
  ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=w; ctx.lineCap='round'; ctx.lineJoin='round';
  if(pts.length===1){ ctx.beginPath(); ctx.arc(pts[0].x,pts[0].y,w/2,0,Math.PI*2); ctx.fill(); return; }
  ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
  for(let i=1;i<pts.length-1;i++){ ctx.quadraticCurveTo(pts[i].x,pts[i].y,(pts[i].x+pts[i+1].x)/2,(pts[i].y+pts[i+1].y)/2); }
  const l=pts[pts.length-1]; ctx.lineTo(l.x,l.y); ctx.stroke();
}
function redraw(){ g.save(); g.setTransform(1,0,0,1,0,0); g.clearRect(0,0,pad.width,pad.height); g.restore(); strokes.forEach(s=>line(g,s.pts,s.w,s.c)); }
function size(){ const r=window.devicePixelRatio||1; pad.width=Math.round(pad.clientWidth*r); pad.height=Math.round(pad.clientHeight*r); g.setTransform(r,0,0,r,0,0); redraw(); }
function pt(e){ const r=pad.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; }
pad.addEventListener('pointerdown',e=>{ e.preventDefault(); pad.setPointerCapture(e.pointerId); cur={pts:[pt(e)],w:+$('width').value,c:$('color').value}; strokes.push(cur); redraw(); });
pad.addEventListener('pointermove',e=>{ if(!cur) return; (e.getCoalescedEvents?e.getCoalescedEvents():[e]).forEach(ev=>cur.pts.push(pt(ev))); redraw(); });
['pointerup','pointercancel'].forEach(t=>pad.addEventListener(t,()=>{ if(!cur) return; cur=null; if(!fired){ fired=true; ${toolComplete} } }));
function loadFonts(){ if(fontsLoaded) return; fontsLoaded=true; const l=document.createElement('link'); l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?'+FONTS.map(f=>'family='+f.replace(/ /g,'+')).join('&')+'&display=swap'; document.head.appendChild(l); }
function renderFonts(){
  const box=$('fonts'), name=$('name').value.trim()||'Your Name'; box.innerHTML='';
  FONTS.forEach(f=>{ const b=document.createElement('button'); b.type='button'; b.className='sig-font'+(f===font?' is-on':''); b.style.fontFamily='"'+f+'", cursive'; b.style.color=$('color').value; b.textContent=name; b.setAttribute('aria-pressed',String(f===font)); b.title=f; b.onclick=()=>{ font=f; renderFonts(); }; box.appendChild(b); });
}
document.querySelectorAll('input[name="mode"]').forEach(r=>r.addEventListener('change',()=>{ mode=document.querySelector('input[name="mode"]:checked').value; $('drawBox').hidden=mode!=='draw'; $('typeBox').hidden=mode!=='type'; $('undo').hidden=mode!=='draw'; if(mode==='type'){ loadFonts(); renderFonts(); } else size(); msg(''); }));
$('name').addEventListener('input',renderFonts);
$('color').addEventListener('change',()=>{ strokes.forEach(s=>{ s.c=$('color').value; }); redraw(); renderFonts(); });
$('width').addEventListener('input',()=>{ strokes.forEach(s=>{ s.w=+$('width').value; }); redraw(); });
$('undo').onclick=()=>{ strokes.pop(); redraw(); };
$('clear').onclick=()=>{ strokes=[]; redraw(); if(mode==='type'){ $('name').value=''; renderFonts(); } msg(''); };
async function exportCanvas(bg){
  if(mode==='draw'){
    if(!strokes.length) return null;
    const S=3, P=12; let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
    strokes.forEach(s=>s.pts.forEach(p=>{ x0=Math.min(x0,p.x-s.w); y0=Math.min(y0,p.y-s.w); x1=Math.max(x1,p.x+s.w); y1=Math.max(y1,p.y+s.w); }));
    x0-=P; y0-=P; x1+=P; y1+=P;
    const c=document.createElement('canvas'); c.width=Math.ceil((x1-x0)*S); c.height=Math.ceil((y1-y0)*S); const x=c.getContext('2d');
    if(bg){ x.fillStyle=bg; x.fillRect(0,0,c.width,c.height); }
    x.setTransform(S,0,0,S,-x0*S,-y0*S); strokes.forEach(s=>line(x,s.pts,s.w,s.c)); return c;
  }
  const name=$('name').value.trim(); if(!name) return null;
  const fam='"'+font+'", cursive'; try{ await document.fonts.load('96px '+fam,name); }catch(e){}
  const c=document.createElement('canvas'), x=c.getContext('2d'); x.font='96px '+fam;
  const m=x.measureText(name), asc=m.actualBoundingBoxAscent||80, desc=m.actualBoundingBoxDescent||30, left=m.actualBoundingBoxLeft||0, right=m.actualBoundingBoxRight||m.width, P=24;
  c.width=Math.ceil(left+right+P*2); c.height=Math.ceil(asc+desc+P*2);
  if(bg){ x.fillStyle=bg; x.fillRect(0,0,c.width,c.height); }
  x.font='96px '+fam; x.fillStyle=$('color').value; x.fillText(name,P+left,P+asc); return c;
}
function download(c,type,name){ c.toBlob(b=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),5000); },type,0.95); }
function save(bg,type,name){ exportCanvas(bg).then(c=>{ if(!c){ msg(mode==='draw'?'Draw your signature first.':'Type your name first.','error'); return; } download(c,type,name); msg('Saved '+name+' ('+c.width+' × '+c.height+' px'+(bg?'':', transparent background')+').','ok'); }); }
$('go').onclick=()=>{ save(null,'image/png','signature.png'); };
$('jpg').onclick=()=>{ save('#ffffff','image/jpeg','signature.jpg'); };
window.addEventListener('resize',()=>{ if(mode==='draw') size(); });
size();
})();
</script>`,
    },
    {
      path: "/meme-generator.html",
      file: "meme-generator.html",
      category: "design",
      title: "Meme Generator — Add Top & Bottom Text to Any Image",
      desc: "Free meme generator: upload or paste an image, add classic top and bottom text, change size and colour, and download your meme as JPG or PNG. No watermark.",
      card: "Meme generator",
      cardDesc: "Top/bottom text, no watermark.",
      body: `<h1>Meme generator</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="file">Choose an image (or paste one with Ctrl+V)</label>
<input id="file" type="file" accept="image/*" />
<canvas id="cv" class="meme-canvas" width="800" height="800" aria-label="Meme preview"></canvas>
<label for="top">Top text</label><input id="top" type="text" value="When the code works" maxlength="140" autocomplete="off" />
<label for="bottom">Bottom text</label><input id="bottom" type="text" value="On the first try" maxlength="140" autocomplete="off" />
<div class="two-col">
<div><label for="size">Text size</label><input id="size" type="range" min="4" max="16" step="0.5" value="9" /></div>
<div><label for="color">Text colour</label><input id="color" type="color" value="#ffffff" /></div>
</div>
<label><input type="checkbox" id="caps" checked /> ALL CAPS</label>
<div class="row"><button type="button" class="primary" id="go">Download meme (JPG)</button><button type="button" class="primary" id="png">Download PNG</button></div>
<p id="out" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const cv=$('cv'), g=cv.getContext('2d');
let img=null;
function msg(t,c){ const s=$('out'); s.className=c||'tool-feedback'; s.textContent=t; }
function wrap(text,maxW){ const words=text.split(' '), lines=[]; let line=''; words.forEach(w=>{ const t=line?line+' '+w:w; if(g.measureText(t).width>maxW&&line){ lines.push(line); line=w; } else line=t; }); if(line) lines.push(line); return lines; }
function draw(){
  if(img){ const s=Math.min(1,1200/Math.max(img.width,img.height)); cv.width=Math.round(img.width*s); cv.height=Math.round(img.height*s); g.drawImage(img,0,0,cv.width,cv.height); }
  else { cv.width=800; cv.height=800; g.fillStyle='#2b2233'; g.fillRect(0,0,800,800); g.fillStyle='rgba(255,255,255,0.35)'; g.font='600 26px system-ui, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('Choose an image — or use this blank background',400,400); }
  const W=cv.width, H=cv.height, fs=Math.max(12,Math.round(Math.min(W,H)*(+$('size').value)/100)), caps=$('caps').checked;
  g.font='900 '+fs+'px Impact, Anton, "Arial Black", "Helvetica Neue", sans-serif'; g.textAlign='center'; g.textBaseline='alphabetic'; g.lineJoin='round';
  g.lineWidth=Math.max(2,fs/7); g.strokeStyle='#000'; g.fillStyle=$('color').value;
  const pad=W*0.04, lh=fs*1.08;
  const put=(txt,top)=>{ txt=(caps?txt.toUpperCase():txt).trim(); if(!txt) return; const lines=wrap(txt,W-pad*2); lines.forEach((l,i)=>{ const y=top?pad+fs+lh*i:H-pad-lh*(lines.length-1-i); g.strokeText(l,W/2,y); g.fillText(l,W/2,y); }); };
  put($('top').value,true); put($('bottom').value,false);
}
function load(f){
  if(!f||!/^image[/]/.test(f.type)){ msg('Please choose an image file.','error'); return; }
  const i=new Image(); i.onload=()=>{ img=i; draw(); msg(''); }; i.onerror=()=>msg('Could not open this image.','error'); i.src=URL.createObjectURL(f);
}
$('file').onchange=()=>load($('file').files[0]);
document.addEventListener('paste',e=>{ const items=(e.clipboardData&&e.clipboardData.items)||[]; for(const it of items){ if(it.type.indexOf('image/')===0){ e.preventDefault(); load(it.getAsFile()); return; } } });
['top','bottom','size','color'].forEach(id=>$(id).addEventListener('input',draw));
$('caps').addEventListener('change',draw);
function save(type,name){ draw(); cv.toBlob(b=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),5000); msg('Saved '+name+' ('+cv.width+' × '+cv.height+' px).','ok'); },type,0.92); }
$('go').onclick=()=>{ save('image/jpeg','meme.jpg'); };
$('png').onclick=()=>{ save('image/png','meme.png'); };
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(draw);
draw();
})();
</script>`,
    },
    {
      path: "/image-color-picker.html",
      file: "image-color-picker.html",
      category: "design",
      title: "Image Color Picker — Get HEX & RGB Colors from a Photo",
      desc: "Pick colours from any image: upload or paste a screenshot, click to get HEX, RGB and HSL codes, and see the image’s main colour palette. Free and private.",
      card: "Image color picker",
      cardDesc: "HEX/RGB from any photo.",
      body: `<h1>Image color picker</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="file">Choose an image or paste a screenshot (Ctrl+V)</label>
<input id="file" type="file" accept="image/*" />
<div class="picker-stage" id="stage" hidden><canvas id="cv" aria-label="Click the image to pick a colour"></canvas><canvas id="loupe" class="loupe" width="120" height="120" hidden></canvas></div>
<div class="picked" id="picked" hidden><span class="picked-swatch" id="sw"></span><div class="picked-vals"><button type="button" class="copy-val" id="hex">#000000</button><button type="button" class="copy-val" id="rgb">rgb(0, 0, 0)</button><button type="button" class="copy-val" id="hsl">hsl(0, 0%, 0%)</button></div></div>
<div class="row"><button type="button" class="btn-small" id="eyedrop" hidden>Pick from anywhere on screen</button></div>
<p id="status" class="tool-feedback" role="status" aria-live="polite">Click the image to pick a colour. Click any value to copy it.</p>
<h2 class="sub-h" id="palH" hidden>Main colours in this image</h2><div class="swatches" id="palette"></div>
<h2 class="sub-h" id="histH" hidden>Picked colours</h2><div class="swatches" id="hist"></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const cv=$('cv'), g=cv.getContext('2d',{willReadFrequently:true}), lp=$('loupe'), lg=lp.getContext('2d');
let hasImg=false; const picked=[];
const h2=n=>n.toString(16).padStart(2,'0');
const toHex=(r,gg,b)=>('#'+h2(r)+h2(gg)+h2(b)).toUpperCase();
function toHsl(r,gg,b){ r/=255; gg/=255; b/=255; const mx=Math.max(r,gg,b), mn=Math.min(r,gg,b), l=(mx+mn)/2; let h=0,s=0; if(mx!==mn){ const d=mx-mn; s=l>0.5?d/(2-mx-mn):d/(mx+mn); h=mx===r?(gg-b)/d+(gg<b?6:0):mx===gg?(b-r)/d+2:(r-gg)/d+4; h*=60; } return 'hsl('+Math.round(h)+', '+Math.round(s*100)+'%, '+Math.round(l*100)+'%)'; }
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
function fallback(t){ const ta=document.createElement('textarea'); ta.value=t; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); msg('Copied '+t); }catch(e){} ta.remove(); }
function copy(t){ if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(t).then(()=>msg('Copied '+t),()=>fallback(t)); else fallback(t); }
function renderSw(box,list){ box.innerHTML=''; list.forEach(hx=>{ const b=document.createElement('button'); b.type='button'; b.className='swatch'; b.style.background=hx; b.setAttribute('aria-label','Copy '+hx); const s=document.createElement('span'); s.textContent=hx; b.appendChild(s); b.onclick=()=>copy(hx); box.appendChild(b); }); }
function show(r,gg,b,add){
  const hx=toHex(r,gg,b); $('picked').hidden=false; $('sw').style.background=hx;
  $('hex').textContent=hx; $('rgb').textContent='rgb('+r+', '+gg+', '+b+')'; $('hsl').textContent=toHsl(r,gg,b);
  if(!add) return;
  if(!picked.includes(hx)){ picked.unshift(hx); if(picked.length>16) picked.pop(); }
  renderSw($('hist'),picked); $('histH').hidden=false; msg('Picked '+hx+' — click a value to copy it.');
  ${toolComplete}
}
['hex','rgb','hsl'].forEach(id=>{ $(id).onclick=()=>copy($(id).textContent); });
function at(e){ const r=cv.getBoundingClientRect(); return {x:Math.max(0,Math.min(cv.width-1,Math.floor((e.clientX-r.left)*cv.width/r.width))),y:Math.max(0,Math.min(cv.height-1,Math.floor((e.clientY-r.top)*cv.height/r.height))),cx:e.clientX-r.left,cy:e.clientY-r.top,w:r.width}; }
function pixel(x,y){ const d=g.getImageData(x,y,1,1).data; return [d[0],d[1],d[2]]; }
cv.addEventListener('pointermove',e=>{
  if(!hasImg) return; const p=at(e), c=pixel(p.x,p.y); show(c[0],c[1],c[2],false);
  lp.hidden=false; lg.imageSmoothingEnabled=false; lg.clearRect(0,0,120,120); lg.drawImage(cv,p.x-5,p.y-5,11,11,0,0,121,121);
  lg.strokeStyle='#fff'; lg.lineWidth=2; lg.strokeRect(55,55,11,11); lg.strokeStyle='#000'; lg.lineWidth=1; lg.strokeRect(53.5,53.5,14,14);
  lp.style.left=(p.cx+140>p.w?p.cx-140:p.cx+20)+'px'; lp.style.top=Math.max(0,p.cy-140)+'px';
});
cv.addEventListener('pointerleave',()=>{ lp.hidden=true; });
cv.addEventListener('click',e=>{ if(!hasImg) return; const p=at(e), c=pixel(p.x,p.y); show(c[0],c[1],c[2],true); });
function palette(){
  const s=Math.min(1,120/Math.max(cv.width,cv.height)), w=Math.max(1,Math.round(cv.width*s)), h=Math.max(1,Math.round(cv.height*s));
  const t=document.createElement('canvas'); t.width=w; t.height=h; const tg=t.getContext('2d'); tg.drawImage(cv,0,0,w,h);
  const d=tg.getImageData(0,0,w,h).data, m=new Map();
  for(let i=0;i<d.length;i+=4){ if(d[i+3]<128) continue; const k=((d[i]>>4)<<8)|((d[i+1]>>4)<<4)|(d[i+2]>>4); const e=m.get(k)||{n:0,r:0,g:0,b:0}; e.n++; e.r+=d[i]; e.g+=d[i+1]; e.b+=d[i+2]; m.set(k,e); }
  const arr=[...m.values()].sort((a,b)=>b.n-a.n).map(e=>[Math.round(e.r/e.n),Math.round(e.g/e.n),Math.round(e.b/e.n)]), out=[];
  for(const c of arr){ if(out.every(o=>Math.abs(o[0]-c[0])+Math.abs(o[1]-c[1])+Math.abs(o[2]-c[2])>60)) out.push(c); if(out.length>=8) break; }
  renderSw($('palette'),out.map(c=>toHex(c[0],c[1],c[2]))); $('palH').hidden=false;
}
function load(f){
  if(!f||!/^image[/]/.test(f.type)){ msg('Please choose an image file.','error'); return; }
  const i=new Image();
  i.onload=()=>{ const s=Math.min(1,2000/Math.max(i.naturalWidth,i.naturalHeight)); cv.width=Math.round(i.naturalWidth*s); cv.height=Math.round(i.naturalHeight*s); g.drawImage(i,0,0,cv.width,cv.height); hasImg=true; $('stage').hidden=false; palette(); msg('Move over the image and click to pick a colour.'); URL.revokeObjectURL(i.src); };
  i.onerror=()=>msg('Could not open this image.','error'); i.src=URL.createObjectURL(f);
}
$('file').onchange=()=>load($('file').files[0]);
document.addEventListener('paste',e=>{ const items=(e.clipboardData&&e.clipboardData.items)||[]; for(const it of items){ if(it.type.indexOf('image/')===0){ e.preventDefault(); load(it.getAsFile()); return; } } });
if('EyeDropper' in window){
  $('eyedrop').hidden=false;
  $('eyedrop').onclick=()=>{ new window.EyeDropper().open().then(r=>{ const hx=r.sRGBHex; let c; if(hx[0]==='#') c=[parseInt(hx.slice(1,3),16),parseInt(hx.slice(3,5),16),parseInt(hx.slice(5,7),16)]; else c=(hx.match(/[0-9.]+/g)||[0,0,0]).slice(0,3).map(Number); show(c[0],c[1],c[2],true); }).catch(()=>{}); };
}
})();
</script>`,
    },
    {
      path: "/favicon-generator.html",
      file: "favicon-generator.html",
      category: "design",
      title: "Favicon Generator — Create favicon.ico from Text, Emoji or Image",
      desc: "Generate a favicon from text, emoji or an image. Download favicon.ico, PNG icons (16 to 512 px), Apple touch icon, web manifest and ready-to-paste HTML tags.",
      card: "Favicon generator",
      cardDesc: "favicon.ico, PNGs, manifest.",
      body: `<h1>Favicon generator</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="seg" role="radiogroup" aria-label="Icon source"><label><input type="radio" name="src" value="text" checked /> Text or emoji</label><label><input type="radio" name="src" value="image" /> Image</label></div>
<div id="textBox">
<label for="txt">Letters or emoji (1–3 characters)</label><input id="txt" type="text" value="T" maxlength="4" autocomplete="off" />
<div class="two-col"><div><label for="bg">Background</label><input id="bg" type="color" value="#720e9e" /></div><div><label for="fg">Text colour</label><input id="fg" type="color" value="#ffffff" /></div></div>
<div class="two-col"><div><label for="shape">Shape</label><select id="shape"><option value="rounded">Rounded square</option><option value="circle">Circle</option><option value="square">Square</option><option value="none">No background</option></select></div><div><label for="font">Font</label><select id="font"><option value="system-ui, -apple-system, Segoe UI, Roboto, sans-serif">Sans-serif</option><option value="Georgia, Times New Roman, serif">Serif</option><option value="ui-monospace, Menlo, Consolas, monospace">Monospace</option></select></div></div>
</div>
<div id="imgBox" hidden><label for="file">Choose a square image (PNG or SVG works best)</label><input id="file" type="file" accept="image/*" /></div>
<div class="fav-previews" id="prev"></div>
<div class="row"><button type="button" class="primary" id="go">Download favicon package (ZIP)</button><button type="button" class="primary" id="ico">Download favicon.ico</button></div>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<label for="code">Paste this into your page’s &lt;head&gt;</label>
<textarea id="code" rows="6" readonly spellcheck="false"></textarea>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const NL=String.fromCharCode(10);
let src='text', img=null;
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
function shapePath(x,s,shape){ const r=shape==='circle'?s/2:shape==='rounded'?s*0.22:0; x.beginPath(); if(!r) x.rect(0,0,s,s); else if(x.roundRect) x.roundRect(0,0,s,s,r); else { x.moveTo(r,0); x.arcTo(s,0,s,s,r); x.arcTo(s,s,0,s,r); x.arcTo(0,s,0,0,r); x.arcTo(0,0,s,0,r); x.closePath(); } }
function render(s){
  const c=document.createElement('canvas'); c.width=c.height=s; const x=c.getContext('2d');
  if(src==='image'){ if(img){ const k=Math.min(s/img.width,s/img.height), w=img.width*k, h=img.height*k; x.imageSmoothingQuality='high'; x.drawImage(img,(s-w)/2,(s-h)/2,w,h); } return c; }
  const shape=$('shape').value; if(shape!=='none'){ x.fillStyle=$('bg').value; shapePath(x,s,shape); x.fill(); }
  const t=$('txt').value.trim()||'?', fam=$('font').value; let fs=s*([...t].length>1?0.5:0.66);
  x.font='700 '+fs+'px '+fam; const maxW=s*(shape==='circle'?0.72:0.84), w=x.measureText(t).width; if(w>maxW){ fs*=maxW/w; x.font='700 '+fs+'px '+fam; }
  const m=x.measureText(t), asc=m.actualBoundingBoxAscent||0, desc=m.actualBoundingBoxDescent||0;
  x.fillStyle=$('fg').value; x.textAlign='center'; x.textBaseline='alphabetic';
  x.fillText(t,s/2,(asc||desc)?s/2+(asc-desc)/2:s/2+fs*0.35); return c;
}
function preview(){
  const box=$('prev'); box.innerHTML='';
  const tab=document.createElement('div'); tab.className='fav-tab'; const c=render(32); c.style.width=c.style.height='16px'; tab.appendChild(c); const sp=document.createElement('span'); sp.textContent='My website'; tab.appendChild(sp); box.appendChild(tab);
  [16,32,48,64,180].forEach(s=>{ const f=document.createElement('figure'); f.className='fav-size'; const cc=render(s); cc.style.width=cc.style.height=Math.min(s,96)+'px'; f.appendChild(cc); const cap=document.createElement('figcaption'); cap.textContent=s+' × '+s; f.appendChild(cap); box.appendChild(f); });
  const tag=(attrs,file)=>'<link '+attrs+' href="/'+file+'">';
  $('code').value=[tag('rel="icon" sizes="any"','favicon.ico'),tag('rel="icon" type="image/png" sizes="32x32"','favicon-32x32.png'),tag('rel="icon" type="image/png" sizes="16x16"','favicon-16x16.png'),tag('rel="apple-touch-icon"','apple-touch-icon.png'),tag('rel="manifest"','site.webmanifest')].join(NL);
}
const png=c=>new Promise((res,rej)=>c.toBlob(b=>b?b.arrayBuffer().then(a=>res(new Uint8Array(a))):rej(new Error('PNG export failed')),'image/png'));
async function ico(sizes){
  const pngs=await Promise.all(sizes.map(s=>png(render(s)))), n=pngs.length; let off=6+16*n;
  const buf=new Uint8Array(off+pngs.reduce((a,p)=>a+p.length,0)), dv=new DataView(buf.buffer);
  dv.setUint16(0,0,true); dv.setUint16(2,1,true); dv.setUint16(4,n,true);
  pngs.forEach((p,i)=>{ const s=sizes[i], e=6+16*i; buf[e]=s>=256?0:s; buf[e+1]=s>=256?0:s; dv.setUint16(e+4,1,true); dv.setUint16(e+6,32,true); dv.setUint32(e+8,p.length,true); dv.setUint32(e+12,off,true); buf.set(p,off); off+=p.length; });
  return new Blob([buf],{type:'image/x-icon'});
}
function dl(blob,name){ const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),5000); }
function ready(){ if(src==='image'&&!img){ msg('Choose an image first.','error'); return false; } return true; }
function loadZip(){ return window.JSZip?Promise.resolve(window.JSZip):new Promise((res,rej)=>{ const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js'; s.onload=()=>res(window.JSZip); s.onerror=()=>rej(new Error('Could not load the ZIP library.')); document.head.appendChild(s); }); }
async function pack(){
  const JSZip=await loadZip(), z=new JSZip();
  z.file('favicon.ico',await ico([16,32,48]));
  const files={'favicon-16x16.png':16,'favicon-32x32.png':32,'apple-touch-icon.png':180,'android-chrome-192x192.png':192,'android-chrome-512x512.png':512};
  for(const name of Object.keys(files)) z.file(name,await png(render(files[name])));
  const theme=src==='text'&&$('shape').value!=='none'?$('bg').value:'#ffffff';
  z.file('site.webmanifest',JSON.stringify({name:'',short_name:'',icons:[{src:'/android-chrome-192x192.png',sizes:'192x192',type:'image/png'},{src:'/android-chrome-512x512.png',sizes:'512x512',type:'image/png'}],theme_color:theme,background_color:'#ffffff',display:'standalone'},null,2));
  z.file('README.txt','Upload these files to the root of your website, then add these tags to <head>:'+NL+NL+$('code').value+NL);
  dl(await z.generateAsync({type:'blob'}),'favicon-package.zip'); msg('Downloaded favicon-package.zip with favicon.ico, 5 PNG icons and site.webmanifest.','ok');
}
$('go').onclick=()=>{ if(ready()) pack().catch(e=>msg(e.message,'error')); };
$('ico').onclick=()=>{ if(ready()) ico([16,32,48]).then(b=>{ dl(b,'favicon.ico'); msg('Downloaded favicon.ico (16, 32 and 48 px).','ok'); }).catch(e=>msg(e.message,'error')); };
document.querySelectorAll('input[name="src"]').forEach(r=>r.addEventListener('change',()=>{ src=document.querySelector('input[name="src"]:checked').value; $('textBox').hidden=src!=='text'; $('imgBox').hidden=src!=='image'; preview(); }));
$('file').onchange=()=>{ const f=$('file').files[0]; if(!f) return; const i=new Image(); i.onload=()=>{ img=i; preview(); msg(''); }; i.onerror=()=>msg('Could not open this image.','error'); i.src=URL.createObjectURL(f); };
['txt','bg','fg','shape','font'].forEach(id=>$(id).addEventListener('input',preview));
preview();
})();
</script>`,
    },
    {
      path: "/speech-to-text.html",
      file: "speech-to-text.html",
      category: "writing",
      title: "Speech to Text — Free Online Voice Typing (Hindi & English)",
      desc: "Free speech to text: speak and watch your words appear. Voice typing in English, Hindi, Tamil, Bengali and more. Copy or download the transcript. Works in Chrome & Edge.",
      card: "Speech to text",
      cardDesc: "Voice typing, Hindi & English.",
      body: `<h1>Speech to text</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="lang">Language</label>
<select id="lang">
<option value="en-IN" selected>English (India)</option><option value="en-US">English (US)</option><option value="en-GB">English (UK)</option>
<option value="hi-IN">हिन्दी Hindi</option><option value="bn-IN">বাংলা Bengali</option><option value="ta-IN">தமிழ் Tamil</option><option value="te-IN">తెలుగు Telugu</option><option value="mr-IN">मराठी Marathi</option><option value="gu-IN">ગુજરાતી Gujarati</option><option value="kn-IN">ಕನ್ನಡ Kannada</option><option value="ml-IN">മലയാളം Malayalam</option><option value="pa-IN">ਪੰਜਾਬੀ Punjabi</option><option value="ur-IN">اردو Urdu</option>
<option value="es-ES">Español</option><option value="fr-FR">Français</option><option value="de-DE">Deutsch</option><option value="pt-BR">Português (Brasil)</option><option value="ar-SA">العربية</option><option value="ja-JP">日本語</option><option value="zh-CN">中文 (普通话)</option>
</select>
<div class="row"><button type="button" class="primary" id="go">Start dictation</button><button type="button" class="primary" id="stop" disabled>Stop</button></div>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<label for="out">Transcript</label>
<textarea id="out" rows="10" placeholder="Your words appear here as you speak…"></textarea>
<p class="tool-hint stt-interim" id="interim"></p>
<label><input type="checkbox" id="punct" checked /> Auto-capitalise and spoken punctuation (say “comma”, “full stop”, “question mark”, “new line”)</label>
<div class="row"><button type="button" class="primary" id="copy">Copy text</button><button type="button" class="primary" id="dl">Download .txt</button><button type="button" class="primary" id="clear">Clear</button></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const NL=String.fromCharCode(10);
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR){ msg('Speech recognition isn’t supported in this browser. Use Google Chrome or Microsoft Edge (desktop or Android), or Safari on iPhone.','error'); $('go').disabled=true; }
let rec=null, want=false, fired=false;
function spoken(t){
  if(!$('punct').checked||!/^en/.test($('lang').value)) return t;
  return t.replace(/ ?(full stop|period)( |$)/gi,'.$2').replace(/ ?comma( |$)/gi,',$1').replace(/ ?question mark( |$)/gi,'?$1').replace(/ ?exclamation (mark|point)( |$)/gi,'!$2').replace(/ ?new paragraph ?/gi,NL+NL).replace(/ ?new line ?/gi,NL);
}
function append(t){
  t=spoken(t.trim()); if(!t) return;
  const ta=$('out'), v=ta.value.replace(/[ ]+$/,'');
  if($('punct').checked){ if(!v||/[.!?।]$/.test(v)||v.slice(-1)===NL) t=t.charAt(0).toUpperCase()+t.slice(1); t=t.replace(/([.!?][ ]+)([a-z])/g,(m,a,b)=>a+b.toUpperCase()); }
  const glue=!v||v.slice(-1)===NL||/^[.,!?]/.test(t)||t.charAt(0)===NL?'':' ';
  ta.value=v+glue+t; ta.scrollTop=ta.scrollHeight;
  if(!fired){ fired=true; ${toolComplete} }
}
function ui(on){ $('go').disabled=on||!SR; $('stop').disabled=!on; $('lang').disabled=on; }
function start(){
  rec=new SR(); rec.lang=$('lang').value; rec.continuous=true; rec.interimResults=true;
  rec.onresult=e=>{ let interim=''; for(let i=e.resultIndex;i<e.results.length;i++){ const r=e.results[i]; if(r.isFinal) append(r[0].transcript); else interim+=r[0].transcript; } $('interim').textContent=interim; };
  rec.onerror=e=>{
    if(e.error==='not-allowed'||e.error==='service-not-allowed'){ want=false; msg('Microphone access was blocked. Allow it from the address bar and try again.','error'); }
    else if(e.error==='network'){ want=false; msg('The speech service is unavailable — check your internet connection.','error'); }
    else if(e.error==='audio-capture'){ want=false; msg('No microphone found.','error'); }
    else if(e.error==='no-speech'){ msg('Listening… no speech detected yet.'); }
  };
  rec.onend=()=>{ $('interim').textContent=''; if(want){ try{ rec.start(); }catch(err){ setTimeout(()=>{ if(want) start(); },300); } } else ui(false); };
  try{ rec.start(); ui(true); msg('Listening… speak now.'); }catch(e){ msg('Could not start listening: '+e.message,'error'); }
}
$('go').onclick=()=>{ if(!SR) return; want=true; start(); };
$('stop').onclick=()=>{ want=false; if(rec) rec.stop(); ui(false); msg('Stopped. Edit the text, then copy or download it.'); };
$('lang').onchange=()=>{ if(rec&&want){ want=false; rec.stop(); } };
function fallback(t){ const ta=$('out'); ta.select(); try{ document.execCommand('copy'); }catch(e){} }
$('copy').onclick=()=>{ const t=$('out').value; if(!t){ msg('Nothing to copy yet.','error'); return; } if(navigator.clipboard&&window.isSecureContext) return navigator.clipboard.writeText(t).catch(()=>fallback(t)); fallback(t); };
$('dl').onclick=()=>{ const t=$('out').value; if(!t){ msg('Nothing to download yet.','error'); return; } const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([t],{type:'text/plain;charset=utf-8'})); a.download='transcript.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),5000); };
$('clear').onclick=()=>{ $('out').value=''; $('interim').textContent=''; };
})();
</script>`,
    },
    {
      path: "/voice-recorder.html",
      file: "voice-recorder.html",
      category: "productivity",
      title: "Online Voice Recorder — Record Audio Free (Download WAV)",
      desc: "Record your voice online with a live level meter. Pause and resume, play it back, and download as WebM or WAV. Free, no sign-up—audio stays on your device.",
      card: "Voice recorder",
      cardDesc: "Record audio, download WAV.",
      body: `<h1>Online voice recorder</h1>${ad}
<div class="tool-panel" data-no-live>
<p class="big-answer rec-time" id="time">00:00</p>
<div class="level" aria-hidden="true"><span class="level-fill" id="fill"></span></div>
<div class="row"><button type="button" class="primary" id="go">Start recording</button><button type="button" class="primary" id="pause" disabled>Pause</button><button type="button" class="primary" id="stop" disabled>Stop</button></div>
<label for="mic">Microphone</label><select id="mic"><option value="">Default microphone</option></select>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<ol class="rec-list" id="list"></ol>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia||!window.MediaRecorder){ msg('Audio recording isn’t supported in this browser. Try Chrome, Edge, Firefox or Safari.','error'); $('go').disabled=true; return; }
let stream=null, rec=null, chunks=[], t0=0, acc=0, timer=0, ac=null, an=null, raf=0, count=0, mime='';
const pick=()=>['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus'].find(t=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(t))||'';
const fmtT=s=>{ s=Math.floor(s); return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); };
const kb=n=>n>=1048576?(n/1048576).toFixed(1)+' MB':Math.max(1,Math.round(n/1024))+' KB';
const elapsed=()=>acc+(rec&&rec.state==='recording'?(performance.now()-t0)/1000:0);
function ui(state){ $('go').disabled=state!=='idle'; $('pause').disabled=state==='idle'; $('stop').disabled=state==='idle'; $('pause').textContent=state==='paused'?'Resume':'Pause'; $('mic').disabled=state!=='idle'; }
function meter(){ if(!an) return; const d=new Float32Array(an.fftSize); an.getFloatTimeDomainData(d); let s=0; for(let i=0;i<d.length;i++) s+=d[i]*d[i]; const db=20*Math.log10(Math.sqrt(s/d.length)+1e-8); $('fill').style.width=Math.max(0,Math.min(100,(db+60)/60*100))+'%'; raf=requestAnimationFrame(meter); }
async function listMics(){ try{ const ds=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='audioinput'&&d.deviceId&&d.deviceId!=='default'); const s=$('mic'), cur=s.value; s.innerHTML='<option value="">Default microphone</option>'; ds.forEach((d,i)=>{ const o=document.createElement('option'); o.value=d.deviceId; o.textContent=d.label||('Microphone '+(i+1)); s.appendChild(o); }); s.value=cur; }catch(e){} }
function cleanup(){ cancelAnimationFrame(raf); clearInterval(timer); if(stream) stream.getTracks().forEach(t=>t.stop()); stream=null; if(ac){ ac.close().catch(()=>{}); ac=null; an=null; } $('fill').style.width='0%'; }
async function toWav(blob){
  const C=window.AudioContext||window.webkitAudioContext, ctx=new C();
  try{
    const ab=await ctx.decodeAudioData(await blob.arrayBuffer()), ch=Math.min(2,ab.numberOfChannels), len=ab.length, sr=ab.sampleRate;
    const buf=new ArrayBuffer(44+len*ch*2), dv=new DataView(buf), w=(o,s)=>{ for(let i=0;i<s.length;i++) dv.setUint8(o+i,s.charCodeAt(i)); };
    w(0,'RIFF'); dv.setUint32(4,36+len*ch*2,true); w(8,'WAVE'); w(12,'fmt '); dv.setUint32(16,16,true); dv.setUint16(20,1,true); dv.setUint16(22,ch,true); dv.setUint32(24,sr,true); dv.setUint32(28,sr*ch*2,true); dv.setUint16(32,ch*2,true); dv.setUint16(34,16,true); w(36,'data'); dv.setUint32(40,len*ch*2,true);
    const data=[]; for(let c=0;c<ch;c++) data.push(ab.getChannelData(c));
    let o=44; for(let i=0;i<len;i++){ for(let c=0;c<ch;c++){ const s=Math.max(-1,Math.min(1,data[c][i])); dv.setInt16(o,s<0?s*32768:s*32767,true); o+=2; } }
    return new Blob([buf],{type:'audio/wav'});
  } finally { ctx.close().catch(()=>{}); }
}
function addItem(blob,type,dur){
  count++; const ext=type.indexOf('mp4')>=0?'m4a':type.indexOf('ogg')>=0?'ogg':'webm', url=URL.createObjectURL(blob), name='recording-'+count;
  const li=document.createElement('li'); li.className='rec-item';
  li.innerHTML='<div class="rec-head"><strong></strong><span></span></div><audio controls preload="metadata"></audio><div class="rec-actions"><a class="btn-link"></a><button type="button" class="btn-small">Download WAV</button><button type="button" class="row-del" aria-label="Delete recording">×</button></div>';
  li.querySelector('strong').textContent='Recording '+count; li.querySelector('.rec-head span').textContent=fmtT(dur)+' · '+kb(blob.size); li.querySelector('audio').src=url;
  const a=li.querySelector('a'); a.href=url; a.download=name+'.'+ext; a.textContent='Download .'+ext;
  const wb=li.querySelector('.btn-small');
  wb.onclick=async()=>{ wb.disabled=true; wb.textContent='Converting…'; try{ const wv=await toWav(blob), u=URL.createObjectURL(wv), t=document.createElement('a'); t.href=u; t.download=name+'.wav'; document.body.appendChild(t); t.click(); t.remove(); setTimeout(()=>URL.revokeObjectURL(u),5000); wb.textContent='Download WAV'; }catch(e){ wb.textContent='WAV not available'; } wb.disabled=false; };
  li.querySelector('.row-del').onclick=()=>{ URL.revokeObjectURL(url); li.remove(); };
  $('list').prepend(li); msg('Saved Recording '+count+' — play it below or download it.','ok');
}
async function start(){
  if(rec&&rec.state!=='inactive') return;
  try{ const id=$('mic').value; stream=await navigator.mediaDevices.getUserMedia({audio:id?{deviceId:{exact:id}}:true}); }
  catch(e){ msg(e&&e.name==='NotAllowedError'?'Microphone access was blocked. Allow it from the address bar and try again.':'No microphone found, or it is being used by another app.','error'); return; }
  listMics(); mime=pick(); chunks=[];
  try{ rec=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream); }catch(e){ rec=new MediaRecorder(stream); }
  rec.ondataavailable=e=>{ if(e.data&&e.data.size) chunks.push(e.data); };
  rec.onstop=()=>{ const type=rec.mimeType||mime||'audio/webm'; cleanup(); addItem(new Blob(chunks,{type}),type,acc); ui('idle'); $('time').textContent='00:00'; };
  try{ const C=window.AudioContext||window.webkitAudioContext; ac=new C(); an=ac.createAnalyser(); an.fftSize=1024; ac.createMediaStreamSource(stream).connect(an); meter(); }catch(e){}
  acc=0; t0=performance.now(); rec.start(1000); timer=setInterval(()=>{ $('time').textContent=fmtT(elapsed()); },200); ui('rec'); msg('Recording… press Stop when you’re done.');
  ${toolComplete}
}
$('go').onclick=()=>{ start(); };
$('pause').onclick=()=>{ if(!rec) return; if(rec.state==='recording'){ acc+=(performance.now()-t0)/1000; rec.pause(); ui('paused'); msg('Paused.'); } else if(rec.state==='paused'){ t0=performance.now(); rec.resume(); ui('rec'); msg('Recording…'); } };
$('stop').onclick=()=>{ if(!rec||rec.state==='inactive') return; if(rec.state==='recording') acc+=(performance.now()-t0)/1000; rec.stop(); };
})();
</script>`,
    },
    {
      path: "/screen-recorder.html",
      file: "screen-recorder.html",
      category: "productivity",
      title: "Screen Recorder Online — Record Screen with Audio, Free",
      desc: "Record your screen, a window or a browser tab online with system audio and microphone. No download, no watermark, no time limit. Save the video to your device.",
      card: "Screen recorder",
      cardDesc: "Screen + audio, no watermark.",
      body: `<h1>Screen recorder</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="media-stage"><video id="video" playsinline muted></video><p class="media-placeholder" id="ph">Your recording preview appears here</p></div>
<label><input type="checkbox" id="sys" checked /> Record tab or system audio (when your browser offers it)</label>
<label><input type="checkbox" id="micOn" /> Record my microphone too</label>
<div class="row"><button type="button" class="primary" id="go">Start recording</button><button type="button" class="primary" id="stop" disabled>Stop recording</button></div>
<p class="big-answer rec-time" id="time" hidden>00:00</p>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<div class="row"><a class="btn-link" id="dl" href="#" download hidden>Download video</a></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const video=$('video');
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
if(!navigator.mediaDevices||!navigator.mediaDevices.getDisplayMedia||!window.MediaRecorder){ msg('Screen recording isn’t supported on this device. Use Chrome, Edge or Firefox on a computer.','error'); $('go').disabled=true; return; }
let display=null, mic=null, ac=null, rec=null, chunks=[], url='', t0=0, timer=0;
const pick=()=>['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm','video/mp4'].find(t=>MediaRecorder.isTypeSupported(t))||'';
const fmtT=s=>{ s=Math.floor(s); return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); };
function stopAll(){ clearInterval(timer); [display,mic].forEach(s=>{ if(s) s.getTracks().forEach(t=>t.stop()); }); display=null; mic=null; if(ac){ ac.close().catch(()=>{}); ac=null; } }
async function start(){
  if(rec&&rec.state==='recording') return;
  $('dl').hidden=true;
  try{ display=await navigator.mediaDevices.getDisplayMedia({video:{frameRate:{ideal:30}},audio:$('sys').checked}); }
  catch(e){ msg(e&&e.name==='NotAllowedError'?'Screen sharing was cancelled or blocked.':'Could not start screen capture: '+((e&&e.message)||e),'error'); return; }
  if($('micOn').checked){ try{ mic=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}}); }catch(e){ mic=null; } }
  const tracks=display.getVideoTracks().slice(), srcs=[display,mic].filter(s=>s&&s.getAudioTracks().length);
  if(srcs.length===1) tracks.push(srcs[0].getAudioTracks()[0]);
  else if(srcs.length>1){ const C=window.AudioContext||window.webkitAudioContext; ac=new C(); const dest=ac.createMediaStreamDestination(); srcs.forEach(s=>ac.createMediaStreamSource(s).connect(dest)); tracks.push(dest.stream.getAudioTracks()[0]); }
  const mime=pick(); chunks=[];
  try{ rec=mime?new MediaRecorder(new MediaStream(tracks),{mimeType:mime,videoBitsPerSecond:4000000}):new MediaRecorder(new MediaStream(tracks)); }catch(e){ rec=new MediaRecorder(new MediaStream(tracks)); }
  rec.ondataavailable=e=>{ if(e.data&&e.data.size) chunks.push(e.data); };
  rec.onstop=()=>{
    stopAll(); const type=(rec.mimeType||mime||'video/webm').split(';')[0], blob=new Blob(chunks,{type});
    if(url) URL.revokeObjectURL(url); url=URL.createObjectURL(blob);
    video.srcObject=null; video.src=url; video.controls=true; video.muted=false;
    const ext=type.indexOf('mp4')>=0?'mp4':'webm', a=$('dl'); a.href=url; a.download='screen-recording-'+new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')+'.'+ext;
    a.textContent='Download video (.'+ext+', '+(blob.size/1048576).toFixed(1)+' MB)'; a.hidden=false;
    $('go').disabled=false; $('stop').disabled=true; msg('Recording saved. Preview it above or download it.'+(mic===null&&$('micOn').checked?' (Microphone was unavailable.)':''),'ok');
  };
  display.getVideoTracks()[0].addEventListener('ended',()=>{ if(rec&&rec.state!=='inactive') rec.stop(); });
  video.srcObject=display; video.controls=false; video.muted=true; video.play().catch(()=>{}); $('ph').hidden=true;
  rec.start(1000); t0=Date.now(); $('time').hidden=false; $('time').textContent='00:00'; timer=setInterval(()=>{ $('time').textContent=fmtT((Date.now()-t0)/1000); },500);
  $('go').disabled=true; $('stop').disabled=false; msg('Recording… press Stop here, or “Stop sharing” in your browser, to finish.');
  ${toolComplete}
}
$('go').onclick=()=>{ start(); };
$('stop').onclick=()=>{ if(rec&&rec.state!=='inactive') rec.stop(); };
})();
</script>`,
    },
    {
      path: "/guitar-tuner.html",
      file: "guitar-tuner.html",
      category: "productivity",
      title: "Online Guitar Tuner — Tune with Your Microphone (Free)",
      desc: "Free online guitar tuner using your microphone. Tune standard EADGBE, drop D, bass, ukulele and violin, or use chromatic mode. Tap a string to hear a reference note.",
      card: "Guitar tuner",
      cardDesc: "Mic tuner, guitar/bass/uke.",
      body: `<h1>Online guitar tuner</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="inst">Instrument</label>
<select id="inst"><option value="guitar">Guitar — standard (E A D G B E)</option><option value="dropd">Guitar — drop D (D A D G B E)</option><option value="bass">Bass — 4 string (E A D G)</option><option value="ukulele">Ukulele (G C E A)</option><option value="violin">Violin (G D A E)</option><option value="chromatic">Chromatic (any note)</option></select>
<div class="tuner" id="tuner">
<div class="tuner-note" id="note">–</div>
<div class="tuner-meter"><span class="tuner-zero"></span><span class="tuner-needle" id="needle"></span></div>
<div class="tuner-scale"><span>−50</span><span>0</span><span>+50</span></div>
<p class="tuner-info" id="info">Press Start and play one string</p>
</div>
<div class="strings" id="strings"></div>
<div class="row"><button type="button" class="primary" id="go">Start tuner</button><button type="button" class="primary" id="stop" disabled>Stop</button></div>
<label for="a4">Reference pitch A4 (Hz)</label><input id="a4" type="number" min="415" max="466" step="1" value="440" />
<p id="status" class="tool-feedback" role="status" aria-live="polite">Tap a string above to hear its reference note.</p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const NOTES=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
const INST={guitar:[40,45,50,55,59,64],dropd:[38,45,50,55,59,64],bass:[28,33,38,43],ukulele:[67,60,64,69],violin:[55,62,69,76],chromatic:[]};
let stream=null, ac=null, an=null, buf=null, raf=0, frame=0, hist=[], quietN=0, playCtx=null, fired=false;
const name=m=>NOTES[((m%12)+12)%12]+(Math.floor(m/12)-1);
const letter=m=>NOTES[((m%12)+12)%12];
const a4=()=>{ const v=+$('a4').value; return v>=400&&v<=480?v:440; };
const freqOf=m=>a4()*Math.pow(2,(m-69)/12);
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
function tone(f){
  try{
    const C=window.AudioContext||window.webkitAudioContext; playCtx=playCtx||new C(); if(playCtx.state==='suspended') playCtx.resume();
    const t=playCtx.currentTime, o=playCtx.createOscillator(), o2=playCtx.createOscillator(), gn=playCtx.createGain(), g2=playCtx.createGain();
    o.type='triangle'; o.frequency.value=f; o2.type='sine'; o2.frequency.value=f*2; g2.gain.value=0.3;
    o2.connect(g2); g2.connect(gn); o.connect(gn); gn.connect(playCtx.destination);
    gn.gain.setValueAtTime(0.0001,t); gn.gain.exponentialRampToValueAtTime(0.4,t+0.02); gn.gain.exponentialRampToValueAtTime(0.0001,t+2.2);
    o.start(t); o2.start(t); o.stop(t+2.3); o2.stop(t+2.3);
  }catch(e){}
}
function strings(){
  const box=$('strings'), list=INST[$('inst').value]; box.innerHTML=''; box.hidden=!list.length;
  list.forEach(m=>{ const b=document.createElement('button'); b.type='button'; b.className='string-btn'; b.dataset.m=m; b.innerHTML='<strong></strong><span></span>'; b.querySelector('strong').textContent=letter(m); b.querySelector('span').textContent=name(m); b.title='Play '+name(m)+' ('+freqOf(m).toFixed(1)+' Hz)'; b.onclick=()=>tone(freqOf(m)); box.appendChild(b); });
}
function yin(b,sr){
  let rms=0; for(let i=0;i<b.length;i++) rms+=b[i]*b[i]; if(Math.sqrt(rms/b.length)<0.01) return 0;
  const W=b.length>>1, maxT=Math.min(W-1,Math.floor(sr/30)), minT=Math.max(2,Math.floor(sr/1500)), d=new Float32Array(maxT+2);
  for(let t=1;t<=maxT+1;t++){ let s=0; for(let j=0;j<W;j++){ const x=b[j]-b[j+t]; s+=x*x; } d[t]=s; }
  d[0]=1; let run=0; for(let t=1;t<=maxT+1;t++){ run+=d[t]; d[t]=run>0?d[t]*t/run:1; }
  let tau=-1; for(let t=minT;t<=maxT;t++){ if(d[t]<0.15){ while(t<maxT&&d[t+1]<d[t]) t++; tau=t; break; } }
  if(tau<0) return 0;
  const s0=d[tau-1], s1=d[tau], s2=d[tau+1], den=s0+s2-2*s1;
  return sr/(den>0?tau+(s0-s2)/(2*den):tau);
}
function quiet(){ if(++quietN>20){ $('tuner').classList.remove('is-tune'); $('info').textContent='Play a string…'; $('needle').style.transform='translateX(-50%) rotate(0deg)'; hist=[]; document.querySelectorAll('.string-btn').forEach(b=>b.classList.remove('is-target')); } }
function update(f){
  quietN=0; const midi=69+12*Math.log2(f/a4()), list=INST[$('inst').value];
  const target=list.length?list.reduce((b,m)=>Math.abs(m-midi)<Math.abs(b-midi)?m:b,list[0]):Math.round(midi);
  const cents=Math.round((midi-target)*100), shown=Math.max(-50,Math.min(50,cents)), ok=Math.abs(cents)<=5;
  $('note').textContent=letter(target); $('needle').style.transform='translateX(-50%) rotate('+(shown*0.9)+'deg)';
  $('tuner').classList.toggle('is-tune',ok);
  $('info').textContent=f.toFixed(1)+' Hz · '+(ok?'In tune':(cents<0?'Too low — tune up ':'Too high — tune down ')+Math.abs(cents)+' cents')+(list.length?' · target '+name(target)+' ('+freqOf(target).toFixed(1)+' Hz)':'');
  document.querySelectorAll('.string-btn').forEach(b=>b.classList.toggle('is-target',+b.dataset.m===target));
  if(!fired){ fired=true; ${toolComplete} }
}
function loop(){
  raf=requestAnimationFrame(loop); if((++frame)%3) return;
  an.getFloatTimeDomainData(buf); const f=yin(buf,ac.sampleRate);
  if(!f||f<25||f>1500){ quiet(); return; }
  hist.push(f); if(hist.length>5) hist.shift();
  update(hist.slice().sort((a,b)=>a-b)[Math.floor(hist.length/2)]);
}
async function start(){
  if(stream) return;
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ msg('Microphone access isn’t available in this browser.','error'); return; }
  try{ stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}}); }
  catch(e){ msg(e&&e.name==='NotAllowedError'?'Microphone access was blocked. Allow it from the address bar and try again.':'No microphone found.','error'); return; }
  const C=window.AudioContext||window.webkitAudioContext; ac=new C(); an=ac.createAnalyser(); an.fftSize=4096; buf=new Float32Array(an.fftSize);
  ac.createMediaStreamSource(stream).connect(an);
  $('go').disabled=true; $('stop').disabled=false; msg('Listening — play one string at a time and let it ring.'); loop();
}
function stop(){ cancelAnimationFrame(raf); if(stream) stream.getTracks().forEach(t=>t.stop()); stream=null; if(ac){ ac.close().catch(()=>{}); ac=null; } $('go').disabled=false; $('stop').disabled=true; quietN=99; quiet(); msg('Tuner stopped.'); }
$('go').onclick=()=>{ start(); };
$('stop').onclick=stop;
$('inst').addEventListener('change',strings);
$('a4').addEventListener('change',strings);
strings();
})();
</script>`,
    },
    {
      path: "/metronome.html",
      file: "metronome.html",
      category: "productivity",
      title: "Online Metronome — Free Metronome with Tap Tempo",
      desc: "Free online metronome: 30–300 BPM, tap tempo, time signatures, accented first beat, eighth-note and triplet subdivisions, and three sounds. Rock-steady timing.",
      card: "Metronome",
      cardDesc: "BPM, tap tempo, subdivisions.",
      body: `<h1>Online metronome</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="metro-display"><strong class="metro-bpm" id="bpmOut">100</strong><span>BPM · <span id="tempoName">Andante</span></span></div>
<div class="beats" id="beats" aria-hidden="true"></div>
<label for="bpm">Tempo</label>
<div class="range-row"><button type="button" class="btn-small" id="minus" aria-label="Slower">−</button><input id="bpm" type="range" min="30" max="300" step="1" value="100" /><button type="button" class="btn-small" id="plus" aria-label="Faster">+</button></div>
<div class="two-col">
<div><label for="beatsPer">Beats per bar</label><select id="beatsPer"><option>1</option><option>2</option><option>3</option><option selected>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>12</option></select></div>
<div><label for="sub">Subdivision</label><select id="sub"><option value="1">Quarter notes</option><option value="2">Eighth notes</option><option value="3">Triplets</option><option value="4">Sixteenth notes</option></select></div>
</div>
<div class="two-col">
<div><label for="sound">Sound</label><select id="sound"><option value="click">Click</option><option value="wood">Woodblock</option><option value="beep">Beep</option></select></div>
<div><label for="vol">Volume</label><input id="vol" type="range" min="0.05" max="1" step="0.01" value="0.8" /></div>
</div>
<label><input type="checkbox" id="accent" checked /> Accent the first beat of each bar</label>
<div class="row"><button type="button" class="primary" id="go" aria-pressed="false">Start</button><button type="button" class="primary" id="tap">Tap tempo</button></div>
<p class="tool-hint">Shortcuts: Space to start or stop, T to tap the tempo, ← → to change BPM.</p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const NAMES=[[40,'Grave'],[60,'Largo'],[66,'Larghetto'],[76,'Adagio'],[108,'Andante'],[120,'Moderato'],[168,'Allegro'],[200,'Presto']];
let ac=null, running=false, next=0, tick=0, timer=0, raf=0, queue=[], taps=[], fired=false;
const bpm=()=>+$('bpm').value;
function tempoName(v){ for(const n of NAMES) if(v<n[0]) return n[1]; return 'Prestissimo'; }
function setBpm(v){ v=Math.max(30,Math.min(300,Math.round(v)||100)); $('bpm').value=v; $('bpmOut').textContent=v; $('tempoName').textContent=tempoName(v); }
function dots(){ const n=+$('beatsPer').value, box=$('beats'); box.innerHTML=''; for(let i=0;i<n;i++){ const s=document.createElement('span'); s.className='beat'+(i===0&&$('accent').checked&&n>1?' is-accent':''); box.appendChild(s); } }
function click(time,kind){
  const o=ac.createOscillator(), g=ac.createGain(), snd=$('sound').value, vol=+$('vol').value;
  let f=kind===2?1600:kind===1?1100:800, dur=0.04;
  if(snd==='wood'){ o.type='sine'; f=kind===2?1250:kind===1?950:700; dur=0.08; } else if(snd==='beep'){ o.type='square'; f=kind===2?1320:kind===1?880:660; dur=0.06; } else o.type='triangle';
  o.frequency.setValueAtTime(f,time);
  const peak=Math.max(0.0002,(kind===0?0.35:1)*vol*(snd==='beep'?0.25:0.9));
  g.gain.setValueAtTime(0.0001,time); g.gain.exponentialRampToValueAtTime(peak,time+0.002); g.gain.exponentialRampToValueAtTime(0.0001,time+dur);
  o.connect(g); g.connect(ac.destination); o.start(time); o.stop(time+dur+0.02);
}
function schedule(){
  const sub=+$('sub').value, n=+$('beatsPer').value;
  while(next<ac.currentTime+0.12){
    const beat=Math.floor(tick/sub)%n, isBeat=tick%sub===0, kind=isBeat?(beat===0&&$('accent').checked&&n>1?2:1):0;
    click(next,kind); if(isBeat) queue.push({t:next,b:beat});
    next+=60/bpm()/sub; tick=(tick+1)%(n*sub);
  }
}
function draw(){ raf=requestAnimationFrame(draw); while(queue.length&&queue[0].t<=ac.currentTime){ const q=queue.shift(), ds=$('beats').children; for(let i=0;i<ds.length;i++) ds[i].classList.toggle('is-on',i===q.b); } }
function start(){
  const C=window.AudioContext||window.webkitAudioContext; ac=ac||new C(); if(ac.state==='suspended') ac.resume();
  running=true; tick=0; queue=[]; next=ac.currentTime+0.06; timer=setInterval(schedule,25); schedule(); draw();
  $('go').textContent='Stop'; $('go').setAttribute('aria-pressed','true');
  if(!fired){ fired=true; ${toolComplete} }
}
function stop(){ running=false; clearInterval(timer); cancelAnimationFrame(raf); queue=[]; [...$('beats').children].forEach(d=>d.classList.remove('is-on')); $('go').textContent='Start'; $('go').setAttribute('aria-pressed','false'); }
$('go').onclick=()=>{ if(running) stop(); else start(); };
$('tap').onclick=()=>{ const now=performance.now(); if(taps.length&&now-taps[taps.length-1]>2000) taps=[]; taps.push(now); if(taps.length>6) taps.shift(); if(taps.length>=2) setBpm(60000/((taps[taps.length-1]-taps[0])/(taps.length-1))); };
$('bpm').addEventListener('input',()=>setBpm(bpm()));
$('minus').onclick=()=>setBpm(bpm()-1);
$('plus').onclick=()=>setBpm(bpm()+1);
$('beatsPer').addEventListener('change',()=>{ tick=0; dots(); });
$('sub').addEventListener('change',()=>{ tick=0; });
$('accent').addEventListener('change',dots);
document.addEventListener('keydown',e=>{
  const t=e.target, typing=t&&t.closest&&t.closest('input[type="text"],input[type="number"],textarea,select,[contenteditable]');
  if(typing||e.metaKey||e.ctrlKey||e.altKey) return;
  if(e.code==='Space'&&!(t&&t.closest&&t.closest('button'))){ e.preventDefault(); $('go').click(); }
  else if(e.code==='KeyT'){ $('tap').click(); }
  else if(e.key==='ArrowRight'&&!(t&&t.type==='range')){ setBpm(bpm()+1); }
  else if(e.key==='ArrowLeft'&&!(t&&t.type==='range')){ setBpm(bpm()-1); }
});
document.addEventListener('visibilitychange',()=>{ if(running&&ac&&ac.state==='suspended') ac.resume(); });
setBpm(100); dots();
})();
</script>`,
    },
    {
      path: "/online-alarm-clock.html",
      file: "online-alarm-clock.html",
      category: "productivity",
      title: "Online Alarm Clock — Free Alarm with Sound & Snooze",
      desc: "Set a free online alarm clock: big live clock, multiple alarms with labels, four alarm sounds, snooze and 12/24-hour time. Alarms are saved in your browser.",
      card: "Online alarm clock",
      cardDesc: "Alarms with sound and snooze.",
      body: `<h1>Online alarm clock</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="clock-face"><strong class="clock-time" id="clock">--:--:--</strong><span class="clock-date" id="date"></span></div>
<div class="two-col">
<div><label for="at">Alarm time</label><input id="at" type="time" value="07:00" step="60" /></div>
<div><label for="sound">Sound</label><select id="sound"><option value="beep">Classic beep</option><option value="digital">Digital</option><option value="chime">Chime</option><option value="rise">Rising tone</option></select></div>
</div>
<label for="label">Label (optional)</label><input id="label" type="text" maxlength="60" placeholder="Wake up, meeting, medicine…" autocomplete="off" />
<div class="row"><button type="button" class="primary" id="go">Set alarm</button><button type="button" class="primary" id="test">Test sound</button></div>
<label><input type="checkbox" id="h24" /> 24-hour clock</label>
<label><input type="checkbox" id="notify" /> Also show a desktop notification</label>
<label><input type="checkbox" id="wake" /> Keep the screen awake while this tab is open</label>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<ul class="alarm-list" id="list"></ul>
<div class="alarm-ring" id="ring" hidden role="alertdialog" aria-labelledby="ringTitle"><p class="alarm-ring-title" id="ringTitle">Alarm</p><p id="ringLabel"></p><div class="row"><button type="button" class="btn-small" id="snooze">Snooze 5 min</button><button type="button" class="btn-small alarm-stop" id="dismiss">Stop alarm</button></div></div>
<p class="tool-hint">Keep this tab open and your device awake—browsers can’t ring an alarm after the tab is closed. The alarm plays at your device volume.</p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const KEY='tools:alarms', origTitle=document.title;
let alarms=[]; try{ alarms=JSON.parse(localStorage.getItem(KEY)||'[]'); }catch(e){} if(!Array.isArray(alarms)) alarms=[];
let ac=null, ringing=null, ringTimer=0, titleTimer=0, wake=null;
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
try{ $('h24').checked=localStorage.getItem('tools:alarm24')==='1'; }catch(e){}
const h24=()=>$('h24').checked;
function nextAt(hhmm,from){ const p=hhmm.split(':').map(Number), d=new Date(from); d.setHours(p[0],p[1],0,0); if(d.getTime()<=from) d.setDate(d.getDate()+1); return d.getTime(); }
function fmtClock(d,secs){ const o={hour:'numeric',minute:'2-digit',hour12:!h24()}; if(secs) o.second='2-digit'; return d.toLocaleTimeString(undefined,o); }
function fmtHM(hhmm){ const p=hhmm.split(':').map(Number), d=new Date(); d.setHours(p[0],p[1],0,0); return fmtClock(d,false); }
function left(ms){ const m=Math.max(0,Math.ceil(ms/60000)), h=Math.floor(m/60); return (h?h+' h ':'')+(m%60)+' min'; }
function save(){ try{ localStorage.setItem(KEY,JSON.stringify(alarms)); }catch(e){} }
function unlock(){ try{ const C=window.AudioContext||window.webkitAudioContext; ac=ac||new C(); if(ac.state==='suspended') ac.resume(); }catch(e){} }
function beep(t,f,d,type,vol){ const o=ac.createOscillator(), g=ac.createGain(); o.type=type; o.frequency.setValueAtTime(f,t); g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.01); g.gain.exponentialRampToValueAtTime(0.0001,t+d); o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t+d+0.05); }
function pattern(kind){
  if(!ac) return; const t=ac.currentTime+0.02;
  if(kind==='digital'){ for(let i=0;i<2;i++){ beep(t+i*0.4,1760,0.08,'square',0.2); beep(t+i*0.4+0.12,1760,0.08,'square',0.2); } }
  else if(kind==='chime'){ [523.25,659.25,783.99].forEach((f,i)=>beep(t+i*0.25,f,0.9,'sine',0.5)); }
  else if(kind==='rise'){ const o=ac.createOscillator(), g=ac.createGain(); o.type='sawtooth'; o.frequency.setValueAtTime(500,t); o.frequency.linearRampToValueAtTime(1200,t+0.8); g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.18,t+0.05); g.gain.exponentialRampToValueAtTime(0.0001,t+0.9); o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t+0.95); }
  else { for(let i=0;i<4;i++) beep(t+i*0.18,880,0.12,'square',0.25); }
}
function render(){
  const ul=$('list'); ul.innerHTML='';
  alarms.slice().sort((a,b)=>(a.on?a.next:Infinity)-(b.on?b.next:Infinity)).forEach(a=>{
    const li=document.createElement('li'); li.className='alarm-item'+(a.on?'':' is-off');
    li.innerHTML='<label class="alarm-toggle"><input type="checkbox" /><span class="alarm-t"></span></label><span class="alarm-meta"></span><button type="button" class="row-del" aria-label="Delete alarm">×</button>';
    const cb=li.querySelector('input'); cb.checked=!!a.on; cb.setAttribute('aria-label','Alarm '+fmtHM(a.time)+' on or off');
    cb.onchange=()=>{ a.on=cb.checked; if(a.on){ a.next=nextAt(a.time,Date.now()); unlock(); } save(); render(); };
    li.querySelector('.alarm-t').textContent=fmtHM(a.time);
    li.querySelector('.alarm-meta').textContent=(a.label?a.label+' · ':'')+(a.on?'rings in '+left(a.next-Date.now()):'off');
    li.querySelector('.row-del').onclick=()=>{ alarms=alarms.filter(x=>x!==a); save(); render(); };
    ul.appendChild(li);
  });
}
function dismiss(){ clearInterval(ringTimer); clearInterval(titleTimer); document.title=origTitle; $('ring').hidden=true; ringing=null; }
function ring(a){
  ringing=a; a.on=false; save(); render(); unlock();
  $('ring').hidden=false; $('ringLabel').textContent=fmtHM(a.time)+(a.label?' — '+a.label:'');
  pattern(a.sound); let n=0; clearInterval(ringTimer); ringTimer=setInterval(()=>{ pattern(a.sound); if(++n>600) dismiss(); },1200);
  let f=false; clearInterval(titleTimer); titleTimer=setInterval(()=>{ f=!f; document.title=f?'ALARM!':origTitle; },800);
  if(window.Notification&&Notification.permission==='granted'){ try{ new Notification('Alarm — '+fmtHM(a.time),{body:a.label||'Your alarm is ringing',requireInteraction:true}); }catch(e){} }
  if(navigator.vibrate) navigator.vibrate([400,200,400,200,400]);
  $('dismiss').focus();
}
function tick(){
  const now=new Date(), t=now.getTime();
  $('clock').textContent=fmtClock(now,true);
  $('date').textContent=now.toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  for(const a of alarms){ if(a.on&&a.next&&t>=a.next){ if(t-a.next<15*60000){ if(!ringing) ring(a); } else { a.next=nextAt(a.time,t); save(); } } }
  if(now.getSeconds()===0) render();
  setTimeout(tick,1000-(t%1000)+5);
}
function keepAwake(){ if(!$('wake').checked||!('wakeLock' in navigator)||document.visibilityState!=='visible') return; navigator.wakeLock.request('screen').then(l=>{ wake=l; }).catch(()=>{}); }
$('go').onclick=()=>{
  const tm=$('at').value; if(!/^[0-9]{2}:[0-9]{2}/.test(tm)){ msg('Pick an alarm time.','error'); return; }
  unlock();
  const a={id:Date.now(),time:tm.slice(0,5),label:$('label').value.trim().slice(0,60),sound:$('sound').value,on:true}; a.next=nextAt(a.time,Date.now());
  alarms.push(a); if(alarms.length>20) alarms.shift(); save(); render();
  msg('Alarm set for '+fmtHM(a.time)+' — rings in '+left(a.next-Date.now())+'. Keep this tab open.','ok');
  if($('notify').checked&&window.Notification&&Notification.permission==='default') Notification.requestPermission();
  keepAwake();
};
$('test').onclick=()=>{ unlock(); pattern($('sound').value); };
$('dismiss').onclick=dismiss;
$('snooze').onclick=()=>{ const a=ringing; dismiss(); if(!a) return; a.on=true; a.next=Date.now()+5*60000; save(); render(); msg('Snoozed for 5 minutes.'); };
$('h24').addEventListener('change',()=>{ try{ localStorage.setItem('tools:alarm24',h24()?'1':'0'); }catch(e){} render(); });
$('notify').addEventListener('change',()=>{ if($('notify').checked&&window.Notification&&Notification.permission==='default') Notification.requestPermission(); });
$('wake').addEventListener('change',()=>{ if($('wake').checked) keepAwake(); else if(wake){ wake.release().catch(()=>{}); wake=null; } });
document.addEventListener('visibilitychange',keepAwake);
const now=Date.now(); alarms.forEach(a=>{ if(a.on&&(!a.next||a.next<now-60000)) a.next=nextAt(a.time,now); }); save();
if(alarms.some(a=>a.on)){ msg('You have alarms set. Click anywhere on this page once so the alarm sound is allowed to play.'); document.addEventListener('pointerdown',()=>{ unlock(); msg(''); },{once:true}); }
render(); tick();
})();
</script>`,
    },
    {
      path: "/attendance-calculator.html",
      file: "attendance-calculator.html",
      category: "student",
      title: "Attendance Calculator — How Many Classes Can I Bunk? (75%)",
      desc: "Attendance calculator for students: enter classes held and attended to see your percentage, how many classes you can skip, or how many you must attend to reach 75%.",
      card: "Attendance calculator",
      cardDesc: "75% rule: bunk or attend?",
      body: `<h1>Attendance calculator</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="two-col">
<div><label for="held">Classes held so far</label><input id="held" type="number" min="1" step="1" value="40" inputmode="numeric" /></div>
<div><label for="att">Classes attended</label><input id="att" type="number" min="0" step="1" value="28" inputmode="numeric" /></div>
</div>
<label for="req">Required attendance</label>
<div class="input-group"><input id="req" type="number" min="1" max="100" step="1" value="75" inputmode="numeric" /><span class="input-suffix">%</span></div>
<div class="chips" id="chips"><button type="button" class="chip" data-v="60">60%</button><button type="button" class="chip" data-v="65">65%</button><button type="button" class="chip" data-v="70">70%</button><button type="button" class="chip is-on" data-v="75">75%</button><button type="button" class="chip" data-v="80">80%</button><button type="button" class="chip" data-v="85">85%</button></div>
<button type="button" class="primary" id="go">Calculate</button>
<p class="big-answer" id="pct">—</p>
<div class="split-bar att-bar" id="bar" hidden><span class="split-bar-a" id="barA"></span><span class="split-mark" id="mark"></span></div>
<p id="out" role="status" aria-live="polite"></p>
<details class="schedule"><summary>Plan ahead: what if I attend some of the next classes?</summary>
<div class="two-col"><div><label for="next">Upcoming classes</label><input id="next" type="number" min="0" step="1" value="10" inputmode="numeric" /></div><div><label for="will">I will attend</label><input id="will" type="number" min="0" step="1" value="8" inputmode="numeric" /></div></div>
<p id="plan" class="tool-feedback"></p>
</details>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const fmtP=v=>(Math.round(v*100)/100)+'%';
const pl=n=>n===1?'':'es';
function plan(held,att,r){
  const n=Math.floor(+$('next').value)||0, w=Math.floor(+$('will').value)||0, p=$('plan');
  if(w>n){ p.textContent='You can’t attend more classes than will be held.'; return; }
  const v=(att+w)/(held+n)*100; p.textContent='After '+n+' more class'+pl(n)+', attending '+w+': '+fmtP(v)+(v>=r*100?' — at or above':' — below')+' the required '+Math.round(r*100)+'%.';
}
function calc(){
  const hv=$('held').value, av=$('att').value, held=Math.floor(+hv), att=Math.floor(+av), req=+$('req').value, out=$('out'), bar=$('bar');
  const fail=t=>{ out.className='error'; out.textContent=t; $('pct').textContent='—'; bar.hidden=true; };
  if(hv===''||av===''||!(held>0)||att<0) return fail('Enter classes held (more than 0) and classes attended.');
  if(!(req>0&&req<=100)) return fail('Enter a required percentage between 1 and 100.');
  if(att>held) return fail('Classes attended can’t be more than classes held.');
  const r=req/100, cur=att/held*100;
  $('pct').textContent=fmtP(cur); bar.hidden=false;
  $('barA').style.width=Math.min(100,cur)+'%'; $('barA').className='split-bar-a '+(cur>=req?'is-good':'is-bad'); $('mark').style.left=req+'%';
  if(cur>=req){
    const can=Math.floor(att/r-held+1e-9); out.className='ok';
    out.textContent=can>0?'You’re above '+req+'%. You can skip the next '+can+' class'+pl(can)+' and still have '+fmtP(att/(held+can)*100)+'.':'You’re right at '+req+'% — attend the next class to stay safe.';
  } else if(r>=1){
    out.className='error'; out.textContent='You need 100% but have already missed '+(held-att)+' class'+pl(held-att)+', so 100% is no longer possible.';
  } else {
    const need=Math.ceil((r*held-att)/(1-r)-1e-9); out.className='error';
    out.textContent='You’re below '+req+'%. Attend the next '+need+' class'+pl(need)+' in a row to reach '+fmtP((att+need)/(held+need)*100)+'.';
  }
  plan(held,att,r);
}
$('go').onclick=calc;
const chips=[...document.querySelectorAll('#chips .chip')];
const mark=()=>chips.forEach(c=>c.classList.toggle('is-on',c.dataset.v===String(+$('req').value)));
chips.forEach(c=>c.onclick=()=>{ $('req').value=c.dataset.v; mark(); $('go').click(); });
['held','att','req','next','will'].forEach(id=>$(id).addEventListener('input',()=>{ mark(); $('go').click(); }));
calc();
})();
</script>`,
    },
    {
      path: "/love-calculator.html",
      file: "love-calculator.html",
      category: "calculators",
      title: "Love Calculator & FLAMES — Test Your Love Compatibility",
      desc: "Fun love calculator: enter two names to get a love percentage and your FLAMES result (Friends, Lovers, Affection, Marriage, Enemies, Siblings). Just for fun!",
      card: "Love calculator",
      cardDesc: "Love % and FLAMES game.",
      body: `<h1>Love calculator</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="two-col">
<div><label for="a">Your name</label><input id="a" type="text" maxlength="40" autocomplete="off" placeholder="e.g. Rahul" /></div>
<div><label for="b">Their name</label><input id="b" type="text" maxlength="40" autocomplete="off" placeholder="e.g. Priya" /></div>
</div>
<button type="button" class="primary" id="go">Calculate love</button>
<p id="out" class="tool-feedback" role="status" aria-live="polite"></p>
<div class="love-result" id="res" hidden>
<p class="love-pct" id="pct">0%</p>
<div class="love-bar"><span id="bar"></span></div>
<p class="love-msg" id="msg"></p>
<p class="love-flames">FLAMES result: <strong id="flames"></strong></p>
</div>
<p class="tool-hint">Just for fun—the score comes from the letters in your names, not science. The same two names always give the same result.</p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const MSG=[[90,'A match made in heaven!'],[75,'Strong chemistry — this could be something special.'],[60,'Good potential. Give it time.'],[45,'There’s a spark, but it needs work.'],[0,'Maybe better as friends?']];
function fnv(s){ let h=2166136261; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619)>>>0; } return h; }
function norm(s){ const t=s.trim().toLowerCase(), l=t.replace(/[^a-z]/g,''); return l||t.replace(/[ ]+/g,''); }
function flames(a,b){
  const x=a.split(''), y=b.split('');
  for(let i=0;i<x.length;i++){ const j=y.indexOf(x[i]); if(j>=0){ y.splice(j,1); x.splice(i,1); i--; } }
  const n=x.length+y.length; if(!n) return '';
  const s=['Friends','Lovers','Affection','Marriage','Enemies','Siblings']; let idx=0;
  while(s.length>1){ idx=(idx+n-1)%s.length; s.splice(idx,1); }
  return s[0];
}
function animate(p){
  const el=$('pct'), bar=$('bar');
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){ el.textContent=p+'%'; bar.style.width=p+'%'; return; }
  const t0=performance.now();
  (function step(t){ const k=Math.min(1,(t-t0)/900), v=Math.round(p*(1-Math.pow(1-k,3))); el.textContent=v+'%'; bar.style.width=v+'%'; if(k<1) requestAnimationFrame(step); })(t0);
}
$('go').onclick=()=>{
  const A=norm($('a').value), B=norm($('b').value), out=$('out');
  if(!A||!B){ out.className='error'; out.textContent='Enter both names.'; $('res').hidden=true; return; }
  out.className='tool-feedback'; out.textContent='';
  const pct=A===B?100:35+fnv([A,B].sort().join('+'))%66, fl=flames(A,B);
  $('res').hidden=false; $('msg').textContent=MSG.find(m=>pct>=m[0])[1]; $('flames').textContent=fl||'Same name!';
  animate(pct);
};
})();
</script>`,
    },
    {
      path: "/text-repeater.html",
      file: "text-repeater.html",
      category: "writing",
      title: "Text Repeater — Repeat Text or Emoji 100s of Times",
      desc: "Repeat any text, word or emoji up to 10,000 times. Separate with new lines, spaces or commas, number each line, then copy or send on WhatsApp. Free and instant.",
      card: "Text repeater",
      cardDesc: "Repeat text/emoji N times.",
      body: `<h1>Text repeater</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="txt">Text to repeat</label>
<textarea id="txt" rows="3">Happy birthday!</textarea>
<div class="two-col">
<div><label for="n">Repeat how many times?</label><input id="n" type="number" min="1" max="10000" step="1" value="10" inputmode="numeric" /></div>
<div><label for="sep">Separate with</label><select id="sep"><option value="nl">New line</option><option value="space">Space</option><option value="none">Nothing</option><option value="comma">Comma</option><option value="custom">Custom…</option></select></div>
</div>
<input id="custom" type="text" placeholder="Custom separator, e.g. | or ❤️" aria-label="Custom separator" hidden />
<label><input type="checkbox" id="num" /> Number each repetition (1. 2. 3.)</label>
<button type="button" class="primary" id="go">Repeat text</button>
<label for="out">Result</label>
<textarea id="out" rows="8" readonly></textarea>
<p class="tool-feedback" id="info"></p>
<div class="row"><button type="button" class="primary" id="copy">Copy text</button><a class="btn-link" id="wa" href="#" target="_blank" rel="noopener noreferrer" hidden>Send on WhatsApp</a></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const NL=String.fromCharCode(10), MAX=1000000;
function wa(res){ const a=$('wa'); if(res&&res.length<=3500){ a.href='https://wa.me/?text='+encodeURIComponent(res); a.hidden=false; } else a.hidden=true; }
function run(){
  const t=$('txt').value, n=Math.floor(+$('n').value), sv=$('sep').value, info=$('info');
  $('custom').hidden=sv!=='custom';
  if(!t){ $('out').value=''; info.textContent='Type some text to repeat.'; wa(''); return; }
  if(!(n>=1)){ info.textContent='Enter how many times (1 or more).'; return; }
  const sep=sv==='custom'?$('custom').value:{nl:NL,space:' ',none:'',comma:', '}[sv], cnt=Math.min(n,10000), parts=[];
  let len=0, capped=n>10000;
  for(let i=0;i<cnt;i++){ const piece=$('num').checked?(i+1)+'. '+t:t; len+=piece.length+sep.length; if(len>MAX){ capped=true; break; } parts.push(piece); }
  const res=parts.join(sep); $('out').value=res;
  info.textContent=parts.length.toLocaleString()+' repetitions · '+res.length.toLocaleString()+' characters'+(capped?' (limited to keep your browser fast)':'');
  wa(res);
}
$('go').onclick=run;
['txt','n','sep','custom','num'].forEach(id=>$(id).addEventListener('input',()=>$('go').click()));
function fallback(){ const ta=$('out'); ta.select(); try{ document.execCommand('copy'); }catch(e){} }
$('copy').onclick=()=>{ const t=$('out').value; if(!t) return; if(navigator.clipboard&&window.isSecureContext) return navigator.clipboard.writeText(t).catch(fallback); fallback(); };
run();
})();
</script>`,
    },
    {
      path: "/html-formatter.html",
      file: "html-formatter.html",
      category: "developer",
      title: "HTML Formatter & Beautifier — Also CSS and JavaScript",
      desc: "Format and beautify messy or minified HTML, CSS and JavaScript online. Choose 2 spaces, 4 spaces or tabs, or minify HTML, CSS and JSON. Runs in your browser.",
      card: "HTML formatter",
      cardDesc: "Beautify HTML, CSS, JS.",
      body: `<h1>HTML formatter</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="two-col">
<div><label for="lang">Language</label><select id="lang"><option value="auto">Auto-detect</option><option value="html">HTML</option><option value="css">CSS</option><option value="js">JavaScript / JSON</option></select></div>
<div><label for="indent">Indent</label><select id="indent"><option value="2">2 spaces</option><option value="4">4 spaces</option><option value="tab">Tabs</option></select></div>
</div>
<label for="src">Paste your code</label>
<textarea id="src" rows="12" spellcheck="false" class="code-area">&lt;!DOCTYPE html&gt;&lt;html lang="en"&gt;&lt;head&gt;&lt;meta charset="utf-8"&gt;&lt;title&gt;My page&lt;/title&gt;&lt;style&gt;body{margin:0;font-family:sans-serif}.card{padding:16px;border-radius:8px}&lt;/style&gt;&lt;/head&gt;&lt;body&gt;&lt;div class="card"&gt;&lt;h1&gt;Hello&lt;/h1&gt;&lt;p&gt;Paste your &lt;b&gt;HTML&lt;/b&gt;, CSS or JavaScript here.&lt;/p&gt;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;</textarea>
<div class="row"><button type="button" class="primary" id="go">Beautify</button><button type="button" class="primary" id="min">Minify</button><button type="button" class="primary" id="copy">Copy result</button></div>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<label for="out">Result</label>
<textarea id="out" rows="14" readonly spellcheck="false" class="code-area"></textarea>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const NL=String.fromCharCode(10), TAB=String.fromCharCode(9), WS='[ '+String.fromCharCode(9,10,13,12)+']';
const LABEL={html:'HTML',css:'CSS',js:'JavaScript'};
function msg(t,c){ const s=$('status'); s.className=c||'tool-feedback'; s.textContent=t; }
function load(){ if(window.beautifier) return Promise.resolve(window.beautifier); return new Promise((res,rej)=>{ const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/js-beautify@1.15.1/js/lib/beautifier.min.js'; s.onload=()=>window.beautifier?res(window.beautifier):rej(new Error('The formatter failed to load.')); s.onerror=()=>rej(new Error('Could not load the formatter. Check your connection.')); document.head.appendChild(s); }); }
function detect(s){
  const t=s.trim(); if(t[0]==='<') return 'html';
  if(t[0]==='{'||t[0]==='['){ try{ JSON.parse(t); return 'js'; }catch(e){} }
  if(/[{][^{}]*:[^{}]*[}]/.test(t)&&!/(function|=>|const |let |var |return |[(][)])/.test(t)) return 'css';
  return 'js';
}
function lang(src){ const v=$('lang').value; return v==='auto'?detect(src):v; }
function cssMin(c){ return c.replace(/[/][*][^]*?[*][/]/g,'').replace(new RegExp(WS+'+','g'),' ').replace(/ ?([{};,>]) ?/g,'$1').replace(/([;{])([a-z-]+) ?: ?/gi,'$1$2:').replace(/;}/g,'}').trim(); }
function htmlMin(src){
  const keep=[];
  let s=src.replace(/<(pre|textarea|script|style)([^>]*)>[^]*?<[/](?:pre|textarea|script|style)>/gi,m=>{ keep.push(m); return '@@KEEP'+(keep.length-1)+'@@'; });
  s=s.replace(/<!--(?![[]if)[^]*?-->/g,'');
  s=s.replace(new RegExp('>'+WS+'*'+NL+WS+'*<','g'),'><').replace(new RegExp(WS+'+','g'),' ').trim();
  return s.replace(/@@KEEP([0-9]+)@@/g,(m,i)=>{ const b=keep[+i]; return /^<style/i.test(b)?b.replace(/^(<style[^>]*>)([^]*?)(<[/]style>)$/i,(m2,a,c,z)=>a+cssMin(c)+z):b; });
}
$('go').onclick=async()=>{
  const src=$('src').value; if(!src.trim()){ msg('Paste some code first.','error'); return; }
  const l=lang(src), ind=$('indent').value;
  try{
    const b=await load(), o={indent_size:ind==='tab'?1:+ind,indent_char:ind==='tab'?TAB:' ',indent_with_tabs:ind==='tab',preserve_newlines:true,max_preserve_newlines:2,end_with_newline:false,wrap_line_length:0};
    const out=l==='html'?b.html(src,Object.assign({indent_inner_html:true,extra_liners:[]},o)):l==='css'?b.css(src,o):b.js(src,o);
    $('out').value=out; msg('Formatted as '+LABEL[l]+' · '+out.split(NL).length+' lines.','ok');
  }catch(e){ msg(e.message||'Could not format this code.','error'); }
};
$('min').onclick=()=>{
  const src=$('src').value; if(!src.trim()){ msg('Paste some code first.','error'); return; }
  const l=lang(src); let out;
  if(l==='html') out=htmlMin(src);
  else if(l==='css') out=cssMin(src);
  else { try{ out=JSON.stringify(JSON.parse(src)); }catch(e){ msg('Minifying JavaScript safely needs a full compiler such as Terser. Use Beautify for JavaScript, or minify JSON, HTML and CSS here.','error'); return; } }
  $('out').value=out; msg('Minified '+(l==='js'?'JSON':LABEL[l])+': '+src.length.toLocaleString()+' → '+out.length.toLocaleString()+' characters ('+Math.max(0,Math.round((1-out.length/src.length)*100))+'% smaller).','ok');
};
function fallback(){ const ta=$('out'); ta.select(); try{ document.execCommand('copy'); }catch(e){} }
$('copy').onclick=()=>{ const t=$('out').value; if(!t){ msg('Nothing to copy yet — press Beautify or Minify first.','error'); return; } if(navigator.clipboard&&window.isSecureContext) return navigator.clipboard.writeText(t).catch(fallback); fallback(); };
})();
</script>`,
    },
    {
      path: "/dead-pixel-test.html",
      file: "dead-pixel-test.html",
      category: "tests",
      title: "Dead Pixel Test — Check Your Screen for Stuck Pixels",
      desc: "Free dead pixel test: fill your screen with solid black, white, red, green, blue and more to spot dead or stuck pixels on a monitor, laptop, TV or phone.",
      card: "Dead pixel test",
      cardDesc: "Full-screen colours, stuck pixels.",
      body: `<h1>Dead pixel test</h1>${ad}
<div class="tool-panel" data-no-live>
<p class="tool-hint">Clean your screen, then start the test. Each colour fills the whole screen—look closely for dots that stay black, white or a different colour.</p>
<div class="pixel-swatches" id="sw"></div>
<button type="button" class="primary" id="go">Start full-screen test</button>
<p class="tool-hint">Controls: click, tap, Space or → for the next colour, ← for the previous one, Esc to exit.</p>
<p id="out" class="tool-feedback" role="status" aria-live="polite"></p>
<div class="pixel-overlay" id="ov" hidden tabindex="-1" aria-label="Full-screen test colour"><span class="pixel-tip" id="tip"></span></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const C=[['Black','#000000'],['White','#ffffff'],['Red','#ff0000'],['Green','#00ff00'],['Blue','#0000ff'],['Cyan','#00ffff'],['Magenta','#ff00ff'],['Yellow','#ffff00'],['Grey','#808080']];
const LIGHT={White:1,Green:1,Cyan:1,Yellow:1};
const ov=$('ov'), tip=$('tip'); let i=0, open=false, idle=0, fired=false;
C.forEach((c,k)=>{ const b=document.createElement('button'); b.type='button'; b.className='pixel-sw'; b.style.background=c[1]; b.title=c[0]; b.setAttribute('aria-label','Start with '+c[0]); b.onclick=()=>start(k); $('sw').appendChild(b); });
function hideLater(){ clearTimeout(idle); ov.classList.remove('is-idle'); idle=setTimeout(()=>{ tip.classList.remove('is-show'); ov.classList.add('is-idle'); },2200); }
function paint(){ ov.style.background=C[i][1]; tip.textContent=C[i][0]+' · '+(i+1)+' of '+C.length+' — click or press → for next, Esc to exit'; tip.style.color=LIGHT[C[i][0]]?'#000':'#fff'; tip.classList.add('is-show'); hideLater(); }
function start(k){
  i=k||0; open=true; ov.hidden=false; paint(); $('out').textContent='';
  const fs=ov.requestFullscreen||ov.webkitRequestFullscreen; if(fs){ try{ const p=fs.call(ov); if(p&&p.catch) p.catch(()=>{}); }catch(e){} }
  ov.focus(); if(!fired){ fired=true; ${toolComplete} }
}
function close(done){
  if(!open) return; open=false; ov.hidden=true; clearTimeout(idle);
  const ex=document.exitFullscreen||document.webkitExitFullscreen;
  if((document.fullscreenElement||document.webkitFullscreenElement)&&ex){ try{ const p=ex.call(document); if(p&&p.catch) p.catch(()=>{}); }catch(e){} }
  const o=$('out'); o.className=done?'ok':'tool-feedback';
  o.textContent=done?'Test complete. A dot that stays black on every colour is a dead pixel; a dot that stays lit or coloured is a stuck pixel.':'';
  $('go').focus();
}
function step(d){ const n=i+d; if(n>=C.length){ close(true); return; } if(n<0) return; i=n; paint(); }
ov.addEventListener('click',()=>step(1));
ov.addEventListener('mousemove',()=>{ if(open) hideLater(); });
document.addEventListener('keydown',e=>{
  if(!open) return;
  if(e.key==='ArrowRight'||e.key===' '||e.key==='Enter'||e.key==='PageDown'){ e.preventDefault(); step(1); }
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){ e.preventDefault(); step(-1); }
  else if(e.key==='Escape'){ e.preventDefault(); close(false); }
},true);
['fullscreenchange','webkitfullscreenchange'].forEach(ev=>document.addEventListener(ev,()=>{ if(open&&!(document.fullscreenElement||document.webkitFullscreenElement)) close(false); }));
$('go').onclick=()=>start(0);
})();
</script>`,
    },
    {
      path: "/refresh-rate-test.html",
      file: "refresh-rate-test.html",
      category: "tests",
      title: "Refresh Rate Test — Check Your Monitor’s Hz (60/120/144Hz)",
      desc: "Check your screen’s refresh rate in Hz online. See frames per second, frame time and dropped frames, with a motion test. Verify your 120 Hz, 144 Hz or 240 Hz monitor.",
      card: "Refresh rate test",
      cardDesc: "Monitor Hz, FPS, frame time.",
      body: `<h1>Refresh rate test</h1>${ad}
<div class="tool-panel" data-no-live>
<p class="big-answer" id="hz">— Hz</p>
<div class="stats">
<div class="stat"><strong id="fps">—</strong>Frames per second</div>
<div class="stat"><strong id="ft">—</strong>Frame time (ms)</div>
<div class="stat"><strong id="drop">0</strong>Dropped frames</div>
<div class="stat"><strong id="dpr">—</strong>Pixel ratio</div>
</div>
<canvas id="cv" class="rr-canvas" aria-hidden="true"></canvas>
<p id="out" class="tool-feedback" role="status" aria-live="polite">Measuring… keep this tab in front and don’t move the window.</p>
<button type="button" class="primary" id="go">Measure again</button>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const cv=$('cv'), g=cv.getContext('2d');
const RATES=[24,30,48,50,60,72,75,85,90,100,120,144,160,165,170,180,200,240,280,300,360,480,500];
let last=0, deltas=[], drops=0, frames=0, sec0=0, trail=[], fired=false, t0=performance.now();
$('dpr').textContent=String(Math.round((window.devicePixelRatio||1)*100)/100);
const median=a=>{ const s=a.slice().sort((p,q)=>p-q); return s[Math.floor(s.length/2)]; };
const typical=a=>{ const m=median(a), k=a.filter(x=>x>m*0.75&&x<m*1.25); return k.reduce((p,q)=>p+q,0)/k.length; };
function snap(hz){ const r=RATES.reduce((b,x)=>Math.abs(x-hz)<Math.abs(b-hz)?x:b,RATES[0]); return Math.abs(r-hz)/r<0.05?r:Math.round(hz); }
function size(){ const r=window.devicePixelRatio||1; cv.width=Math.max(1,Math.round(cv.clientWidth*r)); cv.height=Math.max(1,Math.round(cv.clientHeight*r)); }
function draw(t){
  const W=cv.width, H=cv.height, s=Math.round(H*0.32), speed=W/2, px=((t/1000)*speed)%(W+s)-s;
  trail.push(px); if(trail.length>14) trail.shift();
  g.fillStyle='#1d1527'; g.fillRect(0,0,W,H);
  trail.forEach((p,k)=>{ const a=(k+1)/trail.length; g.fillStyle='rgba(196,245,216,'+(a*0.22)+')'; g.fillRect(p,H*0.14,s,s); g.fillStyle='rgba(255,255,255,'+(0.2+a*0.6)+')'; g.fillRect(p+s/2-1,H*0.66,2,H*0.18); });
  g.fillStyle='#c4f5d8'; g.fillRect(px,H*0.14,s,s);
}
function frame(t){
  requestAnimationFrame(frame);
  if(last){ const d=t-last; if(d>0&&d<250){ deltas.push(d); if(deltas.length>240) deltas.shift(); if(deltas.length>30){ const m=median(deltas); if(d>m*1.6) drops+=Math.round(d/m)-1; } } }
  last=t; frames++;
  if(!sec0) sec0=t;
  if(t-sec0>=1000){ $('fps').textContent=Math.round(frames*1000/(t-sec0)); frames=0; sec0=t; }
  if(deltas.length>=20){
    const m=typical(deltas), v=snap(1000/m);
    $('hz').textContent=v+' Hz'; $('ft').textContent=m.toFixed(2); $('drop').textContent=drops;
    if(!fired&&t-t0>2500){ fired=true; const o=$('out'); o.className='ok'; o.textContent='Your display is refreshing at about '+v+' Hz'+(v<=65?'. Have a high-refresh monitor? Check your display settings, cable and that battery saver is off.':' — nice and smooth.'); ${toolComplete} }
  }
  draw(t);
}
function reset(){ last=0; deltas=[]; drops=0; frames=0; sec0=0; fired=false; t0=performance.now(); const o=$('out'); o.className='tool-feedback'; o.textContent='Measuring… keep this tab in front and don’t move the window.'; $('hz').textContent='— Hz'; }
$('go').onclick=reset;
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') reset(); });
window.addEventListener('resize',size);
size(); requestAnimationFrame(frame);
})();
</script>`,
    },
  ];
}
