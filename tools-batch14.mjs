/** Batch 14 — PDF ↔ Word (DOCX) converters (in-browser). */

const LIMIT_NOTE = `<p class="prose" style="font-size:0.88rem;color:var(--muted)">Files stay on your device. Complex layouts, images, and tables may not transfer perfectly—best for text-heavy documents.</p>`;

export function batch14Tools(ad) {
  return [
    {
      path: "/pdf-to-word.html",
      file: "pdf-to-word.html",
      category: "documents",
      title: "PDF to Word — Convert PDF to DOCX Online",
      desc: "Extract text from a PDF and download an editable Word (.docx) file in your browser. Private—no upload to our servers.",
      card: "PDF to Word",
      cardDesc: "PDF → editable DOCX.",
      body: `
<h1>PDF to Word (DOCX)</h1>
${LIMIT_NOTE}
${ad}
<div class="tool-panel">
  <label for="pdf">PDF file</label>
  <input id="pdf" type="file" accept="application/pdf,.pdf" />
  <button type="button" class="primary" id="go" disabled>Convert to DOCX</button>
  <p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script type="module">
const inp=document.getElementById('pdf'), btn=document.getElementById('go'), status=document.getElementById('status');
inp.onchange=()=>{ btn.disabled=!inp.files.length; status.textContent=''; };
btn.onclick=async()=>{
  const f=inp.files[0];
  if(!f) return;
  btn.disabled=true;
  status.className='tool-feedback';
  status.textContent='Loading PDF…';
  try{
    const pdfjs=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/+esm');
    pdfjs.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
    const { Document, Packer, Paragraph, TextRun, PageBreak }=await import('https://cdn.jsdelivr.net/npm/docx@9.5.1/+esm');
    const buf=await f.arrayBuffer();
    const pdf=await pdfjs.getDocument({ data: buf }).promise;
    const blocks=[];
    for(let p=1;p<=pdf.numPages;p++){
      status.textContent='Reading page '+p+' of '+pdf.numPages+'…';
      const page=await pdf.getPage(p);
      const tc=await page.getTextContent();
      const line=tc.items.map(it=>it.str).join(' ').replace(/\\s+/g,' ').trim();
      if(line) blocks.push(new Paragraph({ children:[new TextRun(line)] }));
      else blocks.push(new Paragraph({ children:[new TextRun(' ')] }));
      if(p<pdf.numPages) blocks.push(new Paragraph({ children:[new PageBreak()] }));
    }
    if(!blocks.length) blocks.push(new Paragraph({ children:[new TextRun('(No extractable text in this PDF—it may be scanned images.)')] }));
    status.textContent='Building Word file…';
    const doc=new Document({ sections:[{ properties:{}, children: blocks }] });
    const blob=await Packer.toBlob(doc);
    const base=(f.name||'document').replace(/\\.pdf$/i,'')||'document';
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=base+'.docx';
    a.click();
    URL.revokeObjectURL(a.href);
    status.className='ok';
    status.textContent='Downloaded '+base+'.docx ('+pdf.numPages+' page(s)). Scanned PDFs need OCR elsewhere.';
  }catch(e){
    status.className='error';
    status.textContent=e.message||String(e);
  }finally{
    btn.disabled=!inp.files.length;
  }
};
</script>`,
    },
    {
      path: "/word-to-pdf.html",
      file: "word-to-pdf.html",
      category: "documents",
      title: "Word to PDF — Convert DOCX to PDF Online",
      desc: "Turn a Word .docx file into a PDF in your browser. Private conversion with mammoth and html2pdf—no cloud upload.",
      card: "Word to PDF",
      cardDesc: "DOCX → PDF download.",
      body: `
<h1>Word to PDF (DOCX)</h1>
${LIMIT_NOTE}
<p class="prose" style="font-size:0.88rem">Upload <strong>.docx</strong> only (modern Word). Legacy <code>.doc</code> is not supported—save as DOCX in Word or Google Docs first.</p>
${ad}
<div class="tool-panel">
  <label for="docx">Word file (.docx)</label>
  <input id="docx" type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
  <button type="button" class="primary" id="go" disabled>Convert to PDF</button>
  <p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<div id="render-host" class="tool-panel" hidden aria-hidden="true" style="position:fixed;left:-9999px;top:0;width:210mm;padding:16mm;background:#fff;color:#000;font-family:Georgia,serif;font-size:11pt;line-height:1.5"></div>
<script type="module">
const inp=document.getElementById('docx'), btn=document.getElementById('go'), status=document.getElementById('status'), host=document.getElementById('render-host');
inp.onchange=()=>{ btn.disabled=!inp.files.length; status.textContent=''; };
btn.onclick=async()=>{
  const f=inp.files[0];
  if(!f) return;
  btn.disabled=true;
  status.className='tool-feedback';
  status.textContent='Reading DOCX…';
  try{
    const mammoth=await import('https://cdn.jsdelivr.net/npm/mammoth@1.9.0/+esm');
    const html2pdf=(await import('https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.3/+esm')).default;
    const buf=await f.arrayBuffer();
    const result=await mammoth.convertToHtml({ arrayBuffer: buf });
    host.hidden=false;
    host.innerHTML=result.value||'<p>(Empty document)</p>';
    if(result.messages?.length){
      console.info('mammoth', result.messages);
    }
    status.textContent='Rendering PDF…';
    const base=(f.name||'document').replace(/\\.docx$/i,'')||'document';
    await html2pdf().set({
      margin:[10,10,10,10],
      filename: base+'.pdf',
      image:{ type:'jpeg', quality:0.92 },
      html2canvas:{ scale:2, useCORS:true },
      jsPDF:{ unit:'mm', format:'a4', orientation:'portrait' },
    }).from(host).save();
    host.hidden=true;
    host.innerHTML='';
    status.className='ok';
    status.textContent='Downloaded '+base+'.pdf';
  }catch(e){
    status.className='error';
    status.textContent=e.message||String(e);
    host.hidden=true;
    host.innerHTML='';
  }finally{
    btn.disabled=!inp.files.length;
  }
};
</script>`,
    },
    {
      path: "/image-converter.html",
      file: "image-converter.html",
      category: "documents",
      title: "Image Converter — PNG, JPG, WebP & AVIF Online",
      desc: "Convert images between PNG, JPEG, WebP, and AVIF in your browser. Private—files never leave your device.",
      card: "Image converter",
      cardDesc: "PNG · JPG · WebP · AVIF.",
      body: `
<h1>Image converter</h1>
<p class="prose" style="font-size:0.88rem;color:var(--muted)">Upload PNG, JPG, WebP, GIF, or BMP. Pick an output format and download—processing uses your browser canvas.</p>
${ad}
<div class="tool-panel">
  <label for="file">Image file</label>
  <input id="file" type="file" accept="image/*" />
  <div class="row" style="align-items:flex-end">
    <div style="flex:1;min-width:140px">
      <label for="fmt">Convert to</label>
      <select id="fmt">
        <option value="image/jpeg">JPEG (.jpg)</option>
        <option value="image/png">PNG (.png)</option>
        <option value="image/webp">WebP (.webp)</option>
        <option value="image/avif">AVIF (.avif)</option>
      </select>
    </div>
    <div style="flex:1;min-width:140px">
      <label for="q">Quality (JPEG / WebP / AVIF)</label>
      <input id="q" type="range" min="0.5" max="1" step="0.05" value="0.92" />
      <span id="qv" class="prose" style="font-size:0.85rem">92%</span>
    </div>
  </div>
  <p id="meta" class="prose" style="font-size:0.9rem"></p>
  <canvas id="preview" style="max-width:100%;height:auto;border-radius:8px;border:1px solid var(--line);display:none"></canvas>
  <button type="button" class="primary" id="go" disabled>Convert &amp; download</button>
  <p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script>
let img=null, srcName='image';
const fmtSel=document.getElementById('fmt'), qInp=document.getElementById('q'), qv=document.getElementById('qv');
const extFor={ 'image/jpeg':'.jpg', 'image/png':'.png', 'image/webp':'.webp', 'image/avif':'.avif' };
function syncQ(){ qv.textContent=Math.round(Number(qInp.value)*100)+'%'; }
qInp.oninput=syncQ; syncQ();
(async()=>{
  const c=document.createElement('canvas'); c.width=1; c.height=1;
  for(const mime of ['image/avif','image/webp']){
    const ok=await new Promise(r=>c.toBlob(b=>r(!!b),mime,0.8));
    if(!ok){
      const o=fmtSel.querySelector('option[value="'+mime+'"]');
      if(o){ o.disabled=true; o.textContent+= ' (unsupported)'; }
    }
  }
})();
document.getElementById('file').onchange=e=>{
  const f=e.target.files[0];
  img=null;
  document.getElementById('go').disabled=true;
  document.getElementById('status').textContent='';
  const prev=document.getElementById('preview');
  prev.style.display='none';
  if(!f) return;
  srcName=(f.name||'image').replace(/\\.[^.]+$/,'')||'image';
  const url=URL.createObjectURL(f);
  const im=new Image();
  im.onload=()=>{
    img=im;
    document.getElementById('meta').textContent=im.naturalWidth+'×'+im.naturalHeight+' px · '+Math.round(f.size/1024)+' KB · '+ (f.type||'image');
    prev.width=im.naturalWidth; prev.height=im.naturalHeight;
    const ctx=prev.getContext('2d');
    ctx.clearRect(0,0,prev.width,prev.height);
    ctx.drawImage(im,0,0);
    prev.style.display=im.naturalWidth>320?'block':'none';
    document.getElementById('go').disabled=false;
    URL.revokeObjectURL(url);
  };
  im.onerror=()=>{ document.getElementById('status').className='error'; document.getElementById('status').textContent='Could not load image.'; URL.revokeObjectURL(url); };
  im.src=url;
};
document.getElementById('go').onclick=()=>{
  if(!img) return;
  const mime=fmtSel.value;
  const q=Number(qInp.value);
  const c=document.createElement('canvas');
  c.width=img.naturalWidth; c.height=img.naturalHeight;
  const ctx=c.getContext('2d');
  if(mime==='image/jpeg'){
    ctx.fillStyle='#ffffff';
    ctx.fillRect(0,0,c.width,c.height);
  }
  ctx.drawImage(img,0,0);
  const status=document.getElementById('status');
  status.className='tool-feedback';
  status.textContent='Converting…';
  c.toBlob(b=>{
    if(!b){
      status.className='error';
      status.textContent='This browser cannot export '+mime+'. Try JPEG or PNG.';
      return;
    }
    const a=document.createElement('a');
    a.href=URL.createObjectURL(b);
    a.download=srcName+(extFor[mime]||'.bin');
    a.click();
    URL.revokeObjectURL(a.href);
    status.className='ok';
    status.textContent='Saved '+a.download+' ('+Math.round(b.size/1024)+' KB).';
  }, mime, mime==='image/png'?undefined:q);
};
</script>`,
    },
  ];
}
