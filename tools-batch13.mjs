/** Batch 13 — Chrome built-in AI writing tools + segmenters. */
const AI_HINT = `<p id="ai-hint" class="prose" style="font-size:0.85rem"></p>`;
const AI_SCRIPT = `<script src="/assets/chrome-ai-helper.js"></script>`;

export function batch13Tools(ad) {
  return [
    {
      path: "/grammar-checker.html",
      file: "grammar-checker.html",
      category: "writing",
      title: "Grammar Checker — Chrome AI Proofreader",
      desc: "Check grammar, spelling, and punctuation with Chrome’s built-in Proofreader API. Private, on-device when supported.",
      card: "Grammar checker",
      cardDesc: "Chrome AI proofread.",
      body: `
<h1>Grammar checker</h1>
<p class="prose">Fix grammar and spelling using Chrome’s on-device <strong>Proofreader</strong> API when available.</p>
${AI_HINT}
${ad}
<div class="tool-panel">
  <textarea id="text" rows="8" spellcheck="false">I seen him yesterday at the store, and he bought two loafs of bread.</textarea>
  <button type="button" class="primary" id="go">Check grammar</button>
  <p id="status" class="prose" style="font-size:0.88rem"></p>
  <div id="out"></div>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=async()=>{
  const text=document.getElementById('text').value;
  const status=document.getElementById('status');
  const out=document.getElementById('out');
  out.replaceChildren();
  if(!text.trim()) return;
  if(!ChromeAi.has('Proofreader')){
    status.className='error';
    status.textContent='Proofreader API not found. Use desktop Chrome and enable chrome://flags/#proofreader-api';
    return;
  }
  status.className='prose';
  status.textContent='Checking…';
  try{
    const avail=await ChromeAi.availability('Proofreader',{expectedInputLanguages:['en']});
    if(avail==='unavailable'){ status.className='error'; status.textContent=await ChromeAi.unavailableMessage('Proofreader'); return; }
    const proofreader=await ChromeAi.create('Proofreader',{expectedInputLanguages:['en']},p=>ChromeAi.setProgress(status,p));
    const result=await proofreader.proofread(text);
    const corrected=result.correctedText||result.text||text;
    if(corrected&&corrected!==text){
      const p=document.createElement('p');
      p.className='ok';
      p.innerHTML='<strong>Suggested text:</strong><br>';
      const ta=document.createElement('textarea');
      ta.rows=6; ta.style.width='100%'; ta.value=corrected;
      out.append(p,ta);
    }
    const fixes=result.corrections||result.matches||[];
    if(fixes.length){
      const ul=document.createElement('ul');
      ul.className='prose';
      for(const c of fixes){
        const li=document.createElement('li');
        li.textContent=(c.message||c.description||c.type||'Fix')+': '+(c.correction||c.suggestion||c.replacement||'');
        ul.appendChild(li);
      }
      out.appendChild(ul);
    } else if(!out.children.length){
      out.innerHTML='<p class="ok">No corrections returned—text may already be fine.</p>';
    }
    status.textContent='Done.';
    proofreader.destroy?.();
  }catch(e){
    status.className='error';
    status.textContent=e.message||String(e);
  }
};
</script>`,
    },
    {
      path: "/sentence-splitter.html",
      file: "sentence-splitter.html",
      category: "writing",
      title: "Sentence Splitter — One Sentence Per Line",
      desc: "Split paragraphs into sentences using the browser Intl Segmenter. Free, works in Chrome, Safari, and Firefox.",
      card: "Sentence splitter",
      cardDesc: "Split by sentence.",
      body: `
<h1>Sentence splitter</h1>
<p class="prose">Split text into sentences (one per line). Uses <code>Intl.Segmenter</code>—no upload.</p>
${ad}
<div class="tool-panel">
  <label for="lang">Language</label>
  <input id="lang" value="en" maxlength="10" />
  <textarea id="text" rows="8">Hello world. This is a test! Does it work? Yes.</textarea>
  <button type="button" class="primary" id="go">Split</button>
  <textarea id="out" rows="10" readonly></textarea>
  <p id="count" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const text=document.getElementById('text').value;
  const lang=document.getElementById('lang').value.trim()||'en';
  let lines=[];
  if(typeof Intl!=='undefined'&&Intl.Segmenter){
    const seg=new Intl.Segmenter(lang,{granularity:'sentence'});
    lines=[...seg.segment(text)].map(s=>s.segment.trim()).filter(Boolean);
  } else {
    lines=text.split(/(?<=[.!?…])\\s+/).map(s=>s.trim()).filter(Boolean);
  }
  document.getElementById('out').value=lines.join('\\n');
  document.getElementById('count').textContent=lines.length+' sentence(s)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/paragraph-splitter.html",
      file: "paragraph-splitter.html",
      category: "writing",
      title: "Paragraph Splitter — Split Text into Paragraphs",
      desc: "Split long text into paragraphs by blank lines or by sentence groups.",
      card: "Paragraph splitter",
      cardDesc: "Split blocks of text.",
      body: `
<h1>Paragraph splitter</h1>
${ad}
<div class="tool-panel">
  <textarea id="text" rows="8">First paragraph here.

Second paragraph after a blank line.

Third one.</textarea>
  <label><input type="radio" name="mode" value="blank" checked /> Split on blank lines</label>
  <label><input type="radio" name="mode" value="sentences" /> Every N sentences</label>
  <label for="n">N sentences</label><input id="n" type="number" value="3" min="1" />
  <button type="button" class="primary" id="go">Split</button>
  <textarea id="out" rows="10" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const text=document.getElementById('text').value;
  const mode=document.querySelector('input[name=mode]:checked').value;
  let paras=[];
  if(mode==='blank'){
    paras=text.split(/\\n\\s*\\n/).map(p=>p.trim()).filter(Boolean);
  } else {
    const n=Math.max(1,+document.getElementById('n').value);
    let sents=[];
    if(typeof Intl!=='undefined'&&Intl.Segmenter){
      sents=[...new Intl.Segmenter('en',{granularity:'sentence'}).segment(text)].map(x=>x.segment.trim()).filter(Boolean);
    } else sents=text.split(/(?<=[.!?])\\s+/).filter(Boolean);
    for(let i=0;i<sents.length;i+=n) paras.push(sents.slice(i,i+n).join(' '));
  }
  document.getElementById('out').value=paras.join('\\n\\n');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/text-summarizer.html",
      file: "text-summarizer.html",
      category: "writing",
      title: "Text Summarizer — Chrome AI Summarizer",
      desc: "Summarize long text with Chrome’s built-in Summarizer API. Key points stay on your device.",
      card: "AI summarizer",
      cardDesc: "Chrome Summarizer.",
      body: `
<h1>Text summarizer</h1>
${AI_HINT}
${ad}
<div class="tool-panel">
  <textarea id="text" rows="10">Paste an article or notes here.</textarea>
  <label for="type">Summary type</label>
  <select id="type"><option value="key-points">Key points</option><option value="tldr">TL;DR</option><option value="headline">Headline</option><option value="teaser">Teaser</option></select>
  <label for="len">Length</label>
  <select id="len"><option value="short">Short</option><option value="medium" selected>Medium</option><option value="long">Long</option></select>
  <button type="button" class="primary" id="go">Summarize</button>
  <p id="status" class="prose" style="font-size:0.88rem"></p>
  <textarea id="out" rows="8" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=async()=>{
  const text=document.getElementById('text').value.trim();
  const status=document.getElementById('status');
  document.getElementById('out').value='';
  if(!text) return;
  if(!ChromeAi.has('Summarizer')){
    status.className='error';
    status.textContent='Summarizer API not found. Use Chrome 138+ desktop.';
    return;
  }
  status.className='prose';
  status.textContent='Summarizing…';
  try{
    const opts={
      type:document.getElementById('type').value,
      format:'markdown',
      length:document.getElementById('len').value,
      expectedInputLanguages:['en'],
    };
    const avail=await ChromeAi.availability('Summarizer',opts);
    if(avail==='unavailable'){ status.className='error'; status.textContent=await ChromeAi.unavailableMessage('Summarizer'); return; }
    const summarizer=await ChromeAi.create('Summarizer',opts,p=>ChromeAi.setProgress(status,p));
    const summary=await summarizer.summarize(text);
    document.getElementById('out').value=summary;
    status.textContent='Done.';
    summarizer.destroy?.();
  }catch(e){
    status.className='error';
    status.textContent=e.message||String(e);
  }
};
</script>`,
    },
    {
      path: "/text-rewriter.html",
      file: "text-rewriter.html",
      category: "writing",
      title: "Text Rewriter — Chrome AI Rewriter",
      desc: "Rewrite text to be shorter, longer, or more formal with Chrome’s Rewriter API.",
      card: "AI rewriter",
      cardDesc: "Tone & length.",
      body: `
<h1>Text rewriter</h1>
${AI_HINT}
${ad}
<div class="tool-panel">
  <textarea id="text" rows="6">Hey, can u send me the report asap? thx</textarea>
  <label for="tone">Tone</label>
  <select id="tone"><option value="as-is">As-is</option><option value="more-formal">More formal</option><option value="more-casual">More casual</option></select>
  <label for="length">Length</label>
  <select id="length"><option value="as-is">As-is</option><option value="shorter">Shorter</option><option value="longer">Longer</option></select>
  <button type="button" class="primary" id="go">Rewrite</button>
  <p id="status" class="prose" style="font-size:0.88rem"></p>
  <textarea id="out" rows="8" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=async()=>{
  const text=document.getElementById('text').value.trim();
  const status=document.getElementById('status');
  document.getElementById('out').value='';
  if(!text) return;
  if(!ChromeAi.has('Rewriter')){
    status.className='error';
    status.textContent='Rewriter API not found. Enable chrome://flags/#rewriter-api in Chrome.';
    return;
  }
  status.textContent='Rewriting…';
  try{
    const opts={
      tone:document.getElementById('tone').value,
      length:document.getElementById('length').value,
      format:'plain-text',
      expectedInputLanguages:['en'],
    };
    const avail=await ChromeAi.availability('Rewriter',opts);
    if(avail==='unavailable'){ status.className='error'; status.textContent=await ChromeAi.unavailableMessage('Rewriter'); return; }
    const rewriter=await ChromeAi.create('Rewriter',opts,p=>ChromeAi.setProgress(status,p));
    document.getElementById('out').value=await rewriter.rewrite(text);
    status.textContent='Done.';
    rewriter.destroy?.();
  }catch(e){
    status.className='error';
    status.textContent=e.message||String(e);
  }
};
</script>`,
    },
    {
      path: "/ai-writer.html",
      file: "ai-writer.html",
      category: "writing",
      title: "AI Writer — Chrome Writer API",
      desc: "Generate text from a prompt with Chrome’s built-in Writer API. Formal or casual tone.",
      card: "AI writer",
      cardDesc: "Chrome Writer.",
      body: `
<h1>AI writer</h1>
${AI_HINT}
${ad}
<div class="tool-panel">
  <label for="prompt">What should I write?</label>
  <textarea id="prompt" rows="3">A polite email declining a meeting but suggesting next week.</textarea>
  <label for="context">Context (optional)</label>
  <input id="context" placeholder="Work email to a client" />
  <label for="tone">Tone</label>
  <select id="tone"><option value="neutral">Neutral</option><option value="formal">Formal</option><option value="casual">Casual</option></select>
  <label for="length">Length</label>
  <select id="length"><option value="short">Short</option><option value="medium" selected>Medium</option><option value="long">Long</option></select>
  <button type="button" class="primary" id="go">Write</button>
  <p id="status" class="prose" style="font-size:0.88rem"></p>
  <textarea id="out" rows="10" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=async()=>{
  const prompt=document.getElementById('prompt').value.trim();
  const status=document.getElementById('status');
  document.getElementById('out').value='';
  if(!prompt) return;
  if(!ChromeAi.has('Writer')){
    status.className='error';
    status.textContent='Writer API not found. Enable chrome://flags/#writer-api in Chrome.';
    return;
  }
  status.textContent='Writing…';
  try{
    const opts={
      tone:document.getElementById('tone').value,
      length:document.getElementById('length').value,
      format:'plain-text',
    };
    const avail=await ChromeAi.availability('Writer',opts);
    if(avail==='unavailable'){ status.className='error'; status.textContent=await ChromeAi.unavailableMessage('Writer'); return; }
    const writer=await ChromeAi.create('Writer',opts,p=>ChromeAi.setProgress(status,p));
    const ctx=document.getElementById('context').value.trim();
    document.getElementById('out').value=await writer.write(prompt, ctx?{context:ctx}:{});
    status.textContent='Done.';
    writer.destroy?.();
  }catch(e){
    status.className='error';
    status.textContent=e.message||String(e);
  }
};
</script>`,
    },
    {
      path: "/language-detector.html",
      file: "language-detector.html",
      category: "writing",
      title: "Language Detector — Chrome AI",
      desc: "Detect the language of text with Chrome’s Language Detector API.",
      card: "Language detector",
      cardDesc: "Chrome AI detect.",
      body: `
<h1>Language detector</h1>
${AI_HINT}
${ad}
<div class="tool-panel">
  <textarea id="text" rows="5">Bonjour, comment allez-vous?</textarea>
  <button type="button" class="primary" id="go">Detect</button>
  <p id="status" class="prose" style="font-size:0.88rem"></p>
  <ul id="out" class="prose"></ul>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=async()=>{
  const text=document.getElementById('text').value.trim();
  const out=document.getElementById('out');
  const status=document.getElementById('status');
  out.replaceChildren();
  if(!text) return;
  if(!ChromeAi.has('LanguageDetector')){
    status.className='error';
    status.textContent='LanguageDetector API not found. Use Chrome 138+ desktop.';
    return;
  }
  status.textContent='Detecting…';
  try{
    const avail=await ChromeAi.availability('LanguageDetector');
    if(avail==='unavailable'){ status.className='error'; status.textContent=await ChromeAi.unavailableMessage('LanguageDetector'); return; }
    const det=await ChromeAi.create('LanguageDetector',{},p=>ChromeAi.setProgress(status,p));
    const results=await det.detect(text);
    for(const r of results){
      const li=document.createElement('li');
      const pct=r.confidence!=null?(' ('+Math.round(r.confidence*100)+'%)'):'';
      li.textContent=(r.detectedLanguage||r.language||'?')+pct;
      out.appendChild(li);
    }
    status.textContent=results.length?'Done.':'No result.';
    det.destroy?.();
  }catch(e){
    status.className='error';
    status.textContent=e.message||String(e);
  }
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
