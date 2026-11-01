/** Batch 17 — Chrome AI summariser (primary SEO page). */

const AI_HINT = `<p id="ai-hint" class="prose" style="font-size:0.85rem"></p>`;
const AI_SCRIPT = `<script src="/assets/chrome-ai-helper.js"></script>`;

export function batch17Tools(ad) {
  return [
    {
      path: "/summariser.html",
      file: "summariser.html",
      category: "writing",
      title: "AI Summariser — Chrome Built-in Text Summarizer",
      desc: "Summarise articles and long text with Chrome’s on-device Summarizer API. Key points, TL;DR, headline—private, no upload.",
      card: "AI summariser",
      cardDesc: "Chrome AI · summarise text.",
      body: `
<h1>AI summariser (Chrome)</h1>
<p class="prose" style="font-size:0.9rem">Uses the <strong>Summarizer</strong> API in desktop Chrome—processing stays on your device.</p>
${AI_HINT}
${ad}
<div class="tool-panel">
  <label for="text">Text to summarise</label>
  <textarea id="text" rows="12" spellcheck="true" placeholder="Paste an article, email thread, or notes…">Artificial intelligence is changing how people write, search, and build software. Large language models can draft text, summarise documents, and answer questions, but they also raise questions about accuracy, privacy, and energy use. On-device models in the browser aim to keep sensitive text local while still offering helpful writing features. When you summarise content, focus on the main claims, evidence, and actions the reader should take.</textarea>
  <p id="in-meta" class="prose" style="font-size:0.85rem;color:var(--muted)"></p>
  <div class="row">
    <div style="flex:1;min-width:140px">
      <label for="type">Summary type</label>
      <select id="type">
        <option value="key-points">Key points</option>
        <option value="tldr">TL;DR</option>
        <option value="headline">Headline</option>
        <option value="teaser">Teaser</option>
      </select>
    </div>
    <div style="flex:1;min-width:140px">
      <label for="len">Length</label>
      <select id="len">
        <option value="short">Short</option>
        <option value="medium" selected>Medium</option>
        <option value="long">Long</option>
      </select>
    </div>
  </div>
  <button type="button" class="primary" id="go">Summarise</button>
  <button type="button" class="primary rs-secondary" id="copy" disabled>Copy summary</button>
  <p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
  <label for="out">Summary</label>
  <textarea id="out" rows="10" readonly spellcheck="false"></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
function countIn(){
  const s=document.getElementById('text').value;
  const words=(s.trim().match(/\\S+/g)||[]).length;
  document.getElementById('in-meta').textContent=words+' words · '+s.length+' characters';
}
document.getElementById('text').addEventListener('input',countIn);
countIn();

async function writeSummary(summarizer, text, outEl){
  if(typeof summarizer.summarizeStreaming==='function'){
    outEl.value='';
    const stream=summarizer.summarizeStreaming(text);
    for await (const chunk of stream){
      const part=typeof chunk==='string'?chunk:(chunk&&chunk.text)||'';
      outEl.value+=part;
    }
    return;
  }
  const summary=await summarizer.summarize(text);
  outEl.value=typeof summary==='string'?summary:(summary&&summary.summary)||String(summary);
}

document.getElementById('go').onclick=async()=>{
  const text=document.getElementById('text').value.trim();
  const status=document.getElementById('status');
  const out=document.getElementById('out');
  const copyBtn=document.getElementById('copy');
  out.value='';
  copyBtn.disabled=true;
  if(!text){ status.className='error'; status.textContent='Paste some text first.'; return; }
  if(!ChromeAi.has('Summarizer')){
    status.className='error';
    status.textContent='Summarizer API not found. Use desktop Chrome 138+ and enable chrome://flags/#summarizer-api-for-gemini-nano if needed.';
    return;
  }
  status.className='tool-feedback';
  status.textContent='Summarising…';
  try{
    const opts={
      type:document.getElementById('type').value,
      format:'markdown',
      length:document.getElementById('len').value,
      expectedInputLanguages:['en'],
    };
    const avail=await ChromeAi.availability('Summarizer',opts);
    if(avail==='unavailable'){
      status.className='error';
      status.textContent=await ChromeAi.unavailableMessage('Summarizer');
      return;
    }
    if(avail==='downloadable'||avail==='downloading'){
      status.textContent='Preparing on-device model…';
    }
    const summarizer=await ChromeAi.create('Summarizer',opts,p=>ChromeAi.setProgress(status,p));
    await writeSummary(summarizer,text,out);
    status.className='ok';
    status.textContent='Done. Review the summary—AI can miss nuance.';
    copyBtn.disabled=!out.value;
    summarizer.destroy?.();
  }catch(e){
    status.className='error';
    status.textContent=e.message||String(e);
  }
};

document.getElementById('copy').onclick=async()=>{
  const v=document.getElementById('out').value;
  if(!v) return;
  await navigator.clipboard.writeText(v);
  document.getElementById('status').textContent='Summary copied to clipboard.';
};
</script>`,
    },
  ];
}
