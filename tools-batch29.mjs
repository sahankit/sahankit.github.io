/** Batch 29 — Chrome built-in AI tools (Writer, Rewriter, Summarizer, Translator). */

const AI_HINT = `<p id="ai-hint" class="prose" style="font-size:0.85rem"></p>`;
const AI_SCRIPT = `<script src="/assets/chrome-ai-helper.js"></script>`;

export function batch29Tools(ad) {
  return [
    {
      path: "/ai-translator.html",
      file: "ai-translator.html",
      category: "writing",
      title: "AI Translator — Chrome On-Device Translation",
      desc: "Translate text with Chrome’s Translator API. Private on-device translation—no upload to Sahankit.",
      card: "AI translator",
      cardDesc: "Chrome Translator API.",
      body: `<h1>AI translator (Chrome)</h1>
<p class="prose" style="font-size:0.9rem">Uses the <strong>Translator</strong> API in desktop Chrome 138+. Language packs download on first use.</p>
${AI_HINT}${ad}
<div class="tool-panel">
<label for="text">Text</label>
<textarea id="text" rows="8">Hello, how can I help you today?</textarea>
<div class="row">
<div style="flex:1;min-width:120px"><label for="src">From</label>
<select id="src"><option value="en" selected>English</option><option value="es">Spanish</option><option value="fr">French</option><option value="de">German</option><option value="hi">Hindi</option><option value="ja">Japanese</option><option value="zh">Chinese</option><option value="pt">Portuguese</option><option value="ar">Arabic</option></select></div>
<div style="flex:1;min-width:120px"><label for="tgt">To</label>
<select id="tgt"><option value="en">English</option><option value="es" selected>Spanish</option><option value="fr">French</option><option value="de">German</option><option value="hi">Hindi</option><option value="ja">Japanese</option><option value="zh">Chinese</option><option value="pt">Portuguese</option><option value="ar">Arabic</option></select></div>
</div>
<button type="button" class="primary" id="go">Translate</button>
<button type="button" class="primary rs-secondary" id="swap">Swap languages</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<label for="out">Translation</label>
<textarea id="out" rows="8" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('swap').onclick=()=>{
  const s=document.getElementById('src'), t=document.getElementById('tgt');
  const v=s.value; s.value=t.value; t.value=v;
};
document.getElementById('go').onclick=()=>ChromeAi.runTranslator({
  text:document.getElementById('text').value,
  sourceLanguage:document.getElementById('src').value,
  targetLanguage:document.getElementById('tgt').value,
  statusEl:document.getElementById('status'),
  outEl:document.getElementById('out'),
  stream:true,
});
</script>`,
    },
    {
      path: "/ai-meta-description-generator.html",
      file: "ai-meta-description-generator.html",
      category: "writing",
      title: "AI Meta Description Generator — Chrome Writer",
      desc: "Generate SEO meta descriptions under 160 characters with Chrome’s Writer API. On-device, free.",
      card: "AI meta description",
      cardDesc: "SEO snippet writer.",
      body: `<h1>AI meta description generator</h1>
${AI_HINT}${ad}
<div class="tool-panel">
<label for="topic">Page topic or paste key points</label>
<textarea id="topic" rows="5" placeholder="Free online BMI calculator with metric and imperial units…"></textarea>
<button type="button" class="primary" id="go">Generate meta description</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="4" readonly></textarea>
<p id="len" class="prose" style="font-size:0.85rem"></p>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=async()=>{
  const topic=document.getElementById('topic').value.trim();
  const prompt='Write exactly one SEO meta description for a web page. Maximum 155 characters. No quotes. Topic:\\n'+topic;
  await ChromeAi.runWriter({
    prompt,
    context:'SEO meta description for sahankit.github.io style utility pages',
    tone:'neutral',
    length:'short',
    statusEl:document.getElementById('status'),
    outEl:document.getElementById('out'),
  });
  const n=document.getElementById('out').value.length;
  document.getElementById('len').textContent=n+' characters'+(n>160?' — trim for SERP display':'');
};
</script>`,
    },
    {
      path: "/ai-email-writer.html",
      file: "ai-email-writer.html",
      category: "writing",
      title: "AI Email Writer — Chrome Writer API",
      desc: "Draft professional emails from a short brief using Chrome’s on-device Writer API.",
      card: "AI email writer",
      cardDesc: "Draft emails locally.",
      body: `<h1>AI email writer</h1>
${AI_HINT}${ad}
<div class="tool-panel">
<label for="brief">What should the email say?</label>
<textarea id="brief" rows="4">Thank a client for their payment and confirm we received it.</textarea>
<label for="ctx">Context (optional)</label>
<input id="ctx" placeholder="Freelance designer to small business client" />
<label for="tone">Tone</label>
<select id="tone"><option value="formal">Formal</option><option value="neutral" selected>Neutral</option><option value="casual">Casual</option></select>
<button type="button" class="primary" id="go">Write email</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="12" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=()=>{
  const brief=document.getElementById('brief').value.trim();
  const prompt='Write a complete email (Subject line first, then body) for this request:\\n'+brief;
  ChromeAi.runWriter({
    prompt,
    context:document.getElementById('ctx').value.trim()||'Professional email',
    tone:document.getElementById('tone').value,
    length:'medium',
    statusEl:document.getElementById('status'),
    outEl:document.getElementById('out'),
  });
};
</script>`,
    },
    {
      path: "/ai-product-description-writer.html",
      file: "ai-product-description-writer.html",
      category: "writing",
      title: "AI Product Description Writer — E-commerce Copy",
      desc: "Generate product descriptions for online stores with Chrome Writer API. Private browser AI.",
      card: "Product description AI",
      cardDesc: "E-commerce copy.",
      body: `<h1>AI product description writer</h1>
${AI_HINT}${ad}
<div class="tool-panel">
<label for="name">Product name</label>
<input id="name" value="Stainless steel water bottle 32oz" />
<label for="facts">Features &amp; specs (bullet points OK)</label>
<textarea id="facts" rows="5">Insulated 24h cold / 12h hot, BPA-free, leak-proof lid, fits cup holders</textarea>
<button type="button" class="primary" id="go">Write description</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="10" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=()=>{
  const prompt='Write a compelling e-commerce product description (2 short paragraphs + 3 bullet features) for:\\nProduct: '+document.getElementById('name').value+'\\nDetails:\\n'+document.getElementById('facts').value;
  ChromeAi.runWriter({ prompt, tone:'neutral', length:'medium', statusEl:document.getElementById('status'), outEl:document.getElementById('out') });
};
</script>`,
    },
    {
      path: "/ai-cover-letter-writer.html",
      file: "ai-cover-letter-writer.html",
      category: "writing",
      title: "AI Cover Letter Writer — Chrome Writer",
      desc: "Draft a job cover letter from role and experience notes using Chrome’s Writer API.",
      card: "Cover letter AI",
      cardDesc: "Job application draft.",
      body: `<h1>AI cover letter writer</h1>
${AI_HINT}${ad}
<div class="tool-panel">
<label for="role">Role &amp; company</label>
<input id="role" value="Software engineer at Acme Corp" />
<label for="notes">Your background (short)</label>
<textarea id="notes" rows="6">5 years web dev, React/Node, led migration to TypeScript, interested in developer tools team.</textarea>
<button type="button" class="primary" id="go">Draft cover letter</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="14" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=()=>{
  const prompt='Write a professional cover letter (3–4 paragraphs) for:\\nRole: '+document.getElementById('role').value+'\\nCandidate notes:\\n'+document.getElementById('notes').value;
  ChromeAi.runWriter({ prompt, tone:'formal', length:'medium', statusEl:document.getElementById('status'), outEl:document.getElementById('out') });
};
</script>`,
    },
    {
      path: "/ai-paraphrase-tool.html",
      file: "ai-paraphrase-tool.html",
      category: "writing",
      title: "AI Paraphrase Tool — Chrome Rewriter",
      desc: "Paraphrase sentences and paragraphs with Chrome’s Rewriter API. On-device rewording.",
      card: "AI paraphrase",
      cardDesc: "Reword text locally.",
      body: `<h1>AI paraphrase tool</h1>
<p class="prose" style="font-size:0.9rem">Rewrites meaning while keeping tone and length similar (Rewriter “as-is” mode).</p>
${AI_HINT}${ad}
<div class="tool-panel">
<textarea id="text" rows="8">Our platform helps teams collaborate faster by keeping all project updates in one shared workspace.</textarea>
<button type="button" class="primary" id="go">Paraphrase</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="8" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=()=>ChromeAi.runRewriter({
  text:document.getElementById('text').value,
  tone:'as-is',
  length:'as-is',
  statusEl:document.getElementById('status'),
  outEl:document.getElementById('out'),
});
</script>`,
    },
    {
      path: "/ai-simplify-text.html",
      file: "ai-simplify-text.html",
      category: "writing",
      title: "AI Simplify Text — Plain Language Rewriter",
      desc: "Simplify complex text for easier reading with Chrome Rewriter (shorter, clearer).",
      card: "Simplify text",
      cardDesc: "Plain language AI.",
      body: `<h1>AI simplify text</h1>
${AI_HINT}${ad}
<div class="tool-panel">
<textarea id="text" rows="8">The implementation leverages asynchronous event-driven architecture to optimize throughput across distributed microservices.</textarea>
<button type="button" class="primary" id="go">Simplify</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="8" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=()=>ChromeAi.runRewriter({
  text:document.getElementById('text').value,
  tone:'more-casual',
  length:'shorter',
  statusEl:document.getElementById('status'),
  outEl:document.getElementById('out'),
});
</script>`,
    },
    {
      path: "/ai-formalize-text.html",
      file: "ai-formalize-text.html",
      category: "writing",
      title: "AI Formalize Text — Professional Tone Rewriter",
      desc: "Make informal text more formal with Chrome’s Rewriter API. Good for emails and reports.",
      card: "Formalize text",
      cardDesc: "More professional tone.",
      body: `<h1>AI formalize text</h1>
${AI_HINT}${ad}
<div class="tool-panel">
<textarea id="text" rows="8">Hey, just wanted to check if u got my files ok? Lemme know asap thx</textarea>
<button type="button" class="primary" id="go">Formalize</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="8" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=()=>ChromeAi.runRewriter({
  text:document.getElementById('text').value,
  tone:'more-formal',
  length:'as-is',
  statusEl:document.getElementById('status'),
  outEl:document.getElementById('out'),
});
</script>`,
    },
    {
      path: "/ai-tldr-generator.html",
      file: "ai-tldr-generator.html",
      category: "writing",
      title: "AI TL;DR Generator — Chrome Summarizer",
      desc: "Create a short TL;DR summary of long text with Chrome’s Summarizer API.",
      card: "AI TL;DR",
      cardDesc: "One-line summary.",
      body: `<h1>AI TL;DR generator</h1>
${AI_HINT}${ad}
<div class="tool-panel">
<textarea id="text" rows="10">Paste an article or thread…</textarea>
<button type="button" class="primary" id="go">Generate TL;DR</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="5" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=()=>ChromeAi.runSummarizer({
  text:document.getElementById('text').value,
  type:'tldr',
  length:'short',
  statusEl:document.getElementById('status'),
  outEl:document.getElementById('out'),
  stream:true,
});
</script>`,
    },
    {
      path: "/ai-meeting-notes-summarizer.html",
      file: "ai-meeting-notes-summarizer.html",
      category: "writing",
      title: "AI Meeting Notes Summarizer — Key Points",
      desc: "Summarize meeting notes into key points and action items with Chrome Summarizer.",
      card: "Meeting notes AI",
      cardDesc: "Key points summary.",
      body: `<h1>AI meeting notes summarizer</h1>
${AI_HINT}${ad}
<div class="tool-panel">
<textarea id="text" rows="12" placeholder="Paste raw meeting notes or transcript…">Team sync — Q4 roadmap. Alice: launch beta Nov 15. Bob: fix login bug P1. Carol: update docs. Next meeting Friday.</textarea>
<button type="button" class="primary" id="go">Summarize notes</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="10" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=()=>ChromeAi.runSummarizer({
  text:document.getElementById('text').value,
  type:'key-points',
  length:'medium',
  statusEl:document.getElementById('status'),
  outEl:document.getElementById('out'),
  stream:true,
});
</script>`,
    },
    {
      path: "/ai-social-post-writer.html",
      file: "ai-social-post-writer.html",
      category: "writing",
      title: "AI Social Post Writer — LinkedIn & Twitter Drafts",
      desc: "Generate social media post drafts from a brief using Chrome Writer API.",
      card: "Social post AI",
      cardDesc: "Post drafts locally.",
      body: `<h1>AI social post writer</h1>
${AI_HINT}${ad}
<div class="tool-panel">
<label for="platform">Platform</label>
<select id="platform"><option value="LinkedIn">LinkedIn</option><option value="Twitter/X">Twitter/X</option><option value="Instagram caption">Instagram caption</option></select>
<label for="brief">Topic or announcement</label>
<textarea id="brief" rows="4">We shipped 50 new free calculator tools on our site—browser-only, no signup.</textarea>
<button type="button" class="primary" id="go">Write post</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="8" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=()=>{
  const platform=document.getElementById('platform').value;
  const prompt='Write one '+platform+' post (no hashtag spam, max 280 chars if Twitter). Announcement:\\n'+document.getElementById('brief').value;
  ChromeAi.runWriter({ prompt, tone:'casual', length:'short', statusEl:document.getElementById('status'), outEl:document.getElementById('out') });
};
</script>`,
    },
    {
      path: "/ai-blog-intro-writer.html",
      file: "ai-blog-intro-writer.html",
      category: "writing",
      title: "AI Blog Intro Writer — Opening Paragraph Generator",
      desc: "Write a blog post introduction from title and outline using Chrome Writer API.",
      card: "Blog intro AI",
      cardDesc: "Opening paragraph.",
      body: `<h1>AI blog intro writer</h1>
${AI_HINT}${ad}
<div class="tool-panel">
<label for="title">Post title</label>
<input id="title" value="How to choose an emergency fund size" />
<label for="outline">Outline or bullet points</label>
<textarea id="outline" rows="5">Why emergency funds matter; 3–6 months rule; expenses to include; where to keep cash</textarea>
<button type="button" class="primary" id="go">Write intro</button>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<textarea id="out" rows="8" readonly></textarea>
</div>
${AI_SCRIPT}
<script>
document.getElementById('ai-hint').innerHTML=ChromeAi.hintHtml;
document.getElementById('go').onclick=()=>{
  const prompt='Write an engaging blog introduction (2–3 paragraphs, no heading) for this article:\\nTitle: '+document.getElementById('title').value+'\\nOutline:\\n'+document.getElementById('outline').value;
  ChromeAi.runWriter({ prompt, tone:'neutral', length:'medium', statusEl:document.getElementById('status'), outEl:document.getElementById('out') });
};
</script>`,
    },
  ];
}
