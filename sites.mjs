/** Micro-site hubs (separate landing “sites” on the same domain). */

import { canonicalFromFile } from "./seo-build.mjs";

export const micrositeDefs = [
  {
    slug: "finance",
    title: "Sahankit Finance — Income Tax, GST, SIP, FD & EMI Tools",
    desc: "Free India finance calculators: income tax new vs old regime, GST, SIP, FD, RD, EMI, salary, invoice, and rupees in words.",
    keywords: "India finance calculator, income tax calculator, GST SIP FD EMI, Sahankit Finance",
    hero: "India finance calculators",
    blurb: "Browser-only tools for invoices, tax math, loans, and savings estimates. Not financial advice.",
    toolPaths: [
      "/income-tax-calculator.html",
      "/gst-calculator.html",
      "/india-invoice.html",
      "/inr-words.html",
      "/sip-calculator.html",
      "/emi-calculator.html",
      "/fd-calculator.html",
      "/rd-calculator.html",
      "/compound-interest.html",
      "/simple-interest.html",
      "/salary-calculator.html",
    ],
    faqs: [
      { q: "Are these official bank or tax tools?", a: "No. They are quick calculators for education and planning." },
    ],
  },
  {
    slug: "dev",
    title: "Sahankit Dev — Hash, Base64, UUID, JSON & Cron",
    desc: "Developer utilities in the browser: SHA-256, Base64, UUID, password generator, JSON formatter, cron helper, QR codes.",
    keywords: "developer tools online, hash base64 uuid, Sahankit Dev",
    hero: "Developer utilities",
    blurb: "Encode, hash, and generate identifiers locally—nothing sent to a server.",
    toolPaths: [
      "/hash-generator.html",
      "/base64-encoder.html",
      "/uuid-generator.html",
      "/password-generator.html",
      "/json-formatter.html",
      "/jwt-decoder.html",
      "/url-encoder.html",
      "/html-entities.html",
      "/random-number.html",
      "/cron-helper.html",
      "/qr-code-generator.html",
      "/barcode-generator.html",
      "/csv-to-json.html",
      "/json-to-csv.html",
      "/number-base-converter.html",
      "/extract-urls.html",
      "/user-agent.html",
      "/epoch-converter.html",
    ],
    faqs: [{ q: "Is input uploaded?", a: "No for hash, Base64, UUID, and password tools—they run in your browser." }],
  },
  {
    slug: "seo-lab",
    title: "Sahankit SEO Lab — Domain Age & Writing for SEO",
    desc: "SEO helpers: domain age lookup, word counter, character counter, reading time, and SEO checklist guide.",
    keywords: "SEO tools free, domain age, word counter SEO",
    hero: "SEO lab",
    blurb: "Research domains and tune on-page content length before you publish.",
    toolPaths: [
      "/osint-search.html",
      "/domain-age.html",
      "/meta-tag-generator.html",
      "/robots-txt-generator.html",
      "/word-counter.html",
      "/character-counter.html",
      "/reading-time.html",
      "/word-frequency.html",
      "/slug-generator.html",
      "/days-between-dates.html",
    ],
    guidePaths: ["/guides/seo-checklist.html"],
    faqs: [{ q: "Does domain age guarantee rankings?", a: "No. Content quality and relevance matter more." }],
  },
  {
    slug: "osint",
    title: "Sahankit OSINT — Username, Domain & Public Search Tools",
    desc: "Free OSINT hub: username links, domain certs, DNS, IP lookups, Google dorks, and breach index links. Public sources only.",
    keywords: "osint tools, osint search hub, domain investigation, username search",
    hero: "OSINT research hub",
    blurb: "Build links to public OSINT sources. For authorized security research and due diligence only.",
    toolPaths: [
      "/osint-search.html",
      "/domain-age.html",
      "/extract-urls.html",
      "/extract-emails.html",
      "/extract-phone-numbers.html",
      "/url-parser.html",
      "/cidr-calculator.html",
      "/netmask-to-cidr.html",
      "/ipv4-to-decimal.html",
      "/user-agent.html",
    ],
    faqs: [
      {
        q: "Does this hub run OSINT scans?",
        a: "No. It lists tools and link builders. Lookups happen on third-party sites you open yourself.",
      },
    ],
  },
  {
    slug: "india",
    title: "Sahankit India — Tax, GST, UPI, PAN & Finance Tools",
    desc: "India toolkit: income tax new vs old regime, GST, PPF, gratuity, UPI/PAN/IFSC checks, invoices, SIP, EMI, and rupees in words.",
    keywords: "India tools online, income tax India, GST calculator, UPI PAN IFSC",
    hero: "India utilities",
    blurb: "Tax, IDs, invoices, and savings calculators for India—browser-only, not government official.",
    toolPaths: [
      "/income-tax-calculator.html",
      "/gst-calculator.html",
      "/gratuity-calculator.html",
      "/ppf-calculator.html",
      "/upi-id-format.html",
      "/pan-format.html",
      "/ifsc-format.html",
      "/pincode-format.html",
      "/india-invoice.html",
      "/inr-words.html",
      "/sip-calculator.html",
      "/emi-calculator.html",
      "/fd-calculator.html",
      "/rd-calculator.html",
      "/electricity-bill.html",
    ],
    faqs: [
      { q: "Are PAN or UPI checks official?", a: "No. Format and pattern helpers only—not NPCI or Income Tax verification." },
    ],
  },
  {
    slug: "security",
    title: "Sahankit Security — Hash, JWT, Passwords & Crypto Tools",
    desc: "Security utilities in the browser: SHA-256, SHA-1, MD5, HMAC, JWT decode, password generator, Luhn, and API keys.",
    keywords: "security tools online, hash generator, jwt decoder, password strength",
    hero: "Security & crypto tools",
    blurb: "Hash, encode, and audit strings locally. Secrets stay on your device unless you paste them elsewhere.",
    toolPaths: [
      "/hash-generator.html",
      "/sha1-hash.html",
      "/md5-hash.html",
      "/hmac-generator.html",
      "/jwt-decoder.html",
      "/password-generator.html",
      "/password-strength.html",
      "/api-key-generator.html",
      "/luhn-checker.html",
      "/base64-encoder.html",
      "/base32-encoder.html",
      "/rot13-encoder.html",
      "/hex-encoder.html",
    ],
    faqs: [
      { q: "Are hashes sent to a server?", a: "No for Web Crypto tools on this site—they run in your browser." },
    ],
  },
  {
    slug: "design",
    title: "Sahankit Design — Colors, Gradients, QR, PDF & Images",
    desc: "Design and file tools: color contrast, CSS gradients, QR codes, PDF merge, and image compression.",
    keywords: "design tools online, gradient generator, compress image",
    hero: "Design & media",
    blurb: "Pick colors, export gradients, merge PDFs, and compress images on your device.",
    toolPaths: [
      "/color-picker.html",
      "/gradient-generator.html",
      "/qr-code-generator.html",
      "/pdf-merge.html",
      "/image-compress.html",
      "/aspect-ratio.html",
    ],
    guidePaths: ["/guides/design-pdf-tools.html"],
    faqs: [],
  },
  {
    slug: "student",
    title: "Sahankit Student — CGPA, Typing, Study Chat",
    desc: "Student tools: CGPA converter, typing test, word counter, age calculator, and free study chat via Y-Chat.",
    keywords: "student tools online, CGPA calculator, study chat",
    hero: "Student toolkit",
    blurb: "Calculators for school and college plus free browser chat for study groups.",
    toolPaths: [
      "/cgpa-calculator.html",
      "/typing-test.html",
      "/word-counter.html",
      "/age-calculator.html",
      "/percentage-calculator.html",
    ],
    extraLinks: [
      { href: "/study-chat.html", card: "Study chat", cardDesc: "Group study on Y-Chat." },
      { href: "/y-chat/", card: "Open Y-Chat", cardDesc: "Free chat rooms." },
    ],
    faqs: [],
  },
  {
    slug: "chat",
    title: "Sahankit Chat — Free Online Chat Rooms (Y-Chat)",
    desc: "Free browser chat: public rooms, private IM, Hindi-friendly and study landing pages. 18+ terms.",
    keywords: "free chat online, chat rooms browser, Y-Chat",
    hero: "Free chat (Y-Chat)",
    blurb: "No download. Accept terms and join rooms on /y-chat/.",
    toolPaths: ["/free-online-chat.html", "/hindi-chat.html", "/study-chat.html"],
    extraLinks: [{ href: "/y-chat/", card: "Launch Y-Chat", cardDesc: "Start chatting now." }],
    guidePaths: ["/guides/y-chat-guide.html"],
    faqs: [{ q: "Is chat moderated?", a: "Follow on-site terms; users must be 18+." }],
  },
  {
    slug: "ai-writing",
    title: "AI Writing Lab — Chrome Built-in Grammar & Summarize",
    desc: "Chrome on-device AI: grammar checker, summarizer, rewriter, writer, language detector, plus sentence tools.",
    keywords: "chrome ai writing, grammar checker proofreader, summarizer browser",
    hero: "Chrome AI writing",
    blurb: "Uses Chrome built-in AI when available—private on-device processing. Splitters work in any browser.",
    toolPaths: [
      "/grammar-checker.html",
      "/text-summarizer.html",
      "/text-rewriter.html",
      "/ai-writer.html",
      "/language-detector.html",
      "/sentence-splitter.html",
      "/paragraph-splitter.html",
    ],
    faqs: [
      {
        q: "Why does AI say unavailable?",
        a: "You need desktop Chrome, sufficient disk/RAM, and sometimes chrome://flags for Proofreader, Writer, or Rewriter.",
      },
    ],
  },
  {
    slug: "writing",
    title: "Writing — Word Count, Markdown & Text Tools",
    desc: "Writing utilities: word counter, Markdown preview, sort lines, dedupe, reverse text, lorem ipsum, reading time.",
    keywords: "writing tools online, markdown preview, word counter",
    hero: "Writing toolkit",
    blurb: "Count, clean, and preview text before you publish.",
    toolPaths: [
      "/grammar-checker.html",
      "/sentence-splitter.html",
      "/text-summarizer.html",
      "/word-counter.html",
      "/character-counter.html",
      "/reading-time.html",
      "/markdown-preview.html",
      "/sort-lines.html",
      "/dedupe-lines.html",
      "/reverse-text.html",
      "/word-frequency.html",
      "/lorem-ipsum.html",
      "/case-converter.html",
      "/strip-html.html",
      "/roman-numerals.html",
      "/slug-generator.html",
    ],
    guidePaths: ["/guides/writing-tools.html"],
    faqs: [],
  },
  {
    slug: "productivity",
    title: "Sahankit Productivity — Typing, Meetings & Quick Tools",
    desc: "Productivity tools: typing speed test, time zone meeting planner, dice roller, discount and ROI calculators.",
    keywords: "productivity tools online, typing test, meeting planner",
    hero: "Productivity",
    blurb: "Type faster, plan meetings, and run quick everyday calculations.",
    toolPaths: [
      "/typing-test.html",
      "/meeting-planner.html",
      "/pomodoro-timer.html",
      "/countdown-timer.html",
      "/coin-flip.html",
      "/dice-roller.html",
      "/discount-calculator.html",
      "/roi-calculator.html",
      "/unit-converter.html",
    ],
    faqs: [],
  },
];

export function micrositeMain(def, ad, tools, guides) {
  const byPath = (p) => tools.find((t) => t.path === p);
  const cards = (def.toolPaths || [])
    .map(byPath)
    .filter(Boolean)
    .map(
      (t) =>
        `<a class="card" href="${canonicalFromFile(t.file)}"><h2>${t.card}</h2><p>${t.cardDesc}</p></a>`,
    )
    .join("");
  const extra = (def.extraLinks || [])
    .map((l) => `<a class="card" href="${l.href}"><h2>${l.card}</h2><p>${l.cardDesc}</p></a>`)
    .join("");
  const gcards = (def.guidePaths || [])
    .map((p) => guides.find((g) => g.path === p))
    .filter(Boolean)
    .map(
      (g) =>
        `<a class="card" href="${g.path}"><h2>${g.title.split("—")[0].trim()}</h2><p>${g.desc.slice(0, 72)}…</p></a>`,
    )
    .join("");
  return `<div class="hero"><h1>${def.hero}</h1><p>${def.blurb}</p><p><a href="/">← Tools</a></p></div>
${ad}
<section><div class="grid">${cards}${extra}</div></section>
${gcards ? `<section style="margin-top:24px"><h2>Guides</h2><div class="grid">${gcards}</div></section>` : ""}`;
}

/** Inshorts-style headline reader (News / Sports / Business). */
export function briefSiteBody(ad) {
  return `<div class="hero">
  <h1>News brief</h1>
  <p>Latest headlines in short cards—News, Sports, and Business. Tap a story to read the full article at the publisher.</p>
  <p style="font-size:0.88rem"><a href="/">← Tools</a></p>
</div>
${ad}
<div class="brief-toolbar">
  <span id="brief-updated">Loading headlines…</span>
  <button type="button" class="primary" id="brief-refresh" style="padding:8px 14px;font-size:0.85rem">Refresh</button>
</div>
<div class="brief-tabs" role="tablist" aria-label="Categories">
  <button type="button" role="tab" id="tab-news" data-feed="news" aria-selected="true">News</button>
  <button type="button" role="tab" id="tab-sports" data-feed="sports" aria-selected="false">Sports</button>
  <button type="button" role="tab" id="tab-business" data-feed="business" aria-selected="false">Business</button>
</div>
<p id="brief-err" class="error" hidden></p>
<div id="brief-feed" class="brief-feed" aria-live="polite"></div>
<p class="prose" style="font-size:0.8rem;margin-top:20px">Headlines via public RSS (Google News). Sahankit does not write or host news content. Not affiliated with Inshorts.</p>
<script>
const FEEDS={
  news:'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
  sports:'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=en-IN&gl=IN&ceid=IN:en',
  business:'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-IN&gl=IN&ceid=IN:en',
};
let active='news';

function stripHtml(s){
  const d=document.createElement('div');
  d.innerHTML=s||'';
  return (d.textContent||'').replace(/\\s+/g,' ').trim();
}
function inshort(text, maxWords=55){
  const w=text.split(/\\s+/).filter(Boolean);
  if(w.length<=maxWords) return text;
  return w.slice(0,maxWords).join(' ')+'…';
}
function parseTitle(raw){
  const t=stripHtml(raw);
  const i=t.lastIndexOf(' - ');
  if(i>0) return { title:t.slice(0,i).trim(), source:t.slice(i+3).trim() };
  return { title:t, source:'' };
}
function timeAgo(pubDate){
  if(!pubDate) return '';
  const d=new Date(pubDate);
  if(isNaN(d)) return '';
  const m=Math.round((Date.now()-d)/60000);
  if(m<1) return 'Just now';
  if(m<60) return m+'m ago';
  const h=Math.round(m/60);
  if(h<48) return h+'h ago';
  return d.toLocaleDateString(undefined,{dateStyle:'medium'});
}

async function fetchRss(url){
  const proxy='https://api.allorigins.win/get?url='+encodeURIComponent(url);
  const res=await fetch(proxy);
  if(!res.ok) throw new Error('Could not load feed ('+res.status+').');
  const data=await res.json();
  if(!data.contents) throw new Error('Empty feed response.');
  return new DOMParser().parseFromString(data.contents,'text/xml');
}

function itemsFromXml(doc){
  const items=[...doc.querySelectorAll('item')];
  return items.map(el=>{
    const rawTitle=el.querySelector('title')?.textContent||'';
    const {title,source}=parseTitle(rawTitle);
    const link=el.querySelector('link')?.textContent?.trim()||'';
    const pub=el.querySelector('pubDate')?.textContent||'';
    const desc=stripHtml(el.querySelector('description')?.textContent||'');
    const srcEl=el.querySelector('source');
    const srcName=srcEl?.textContent?.trim()||source;
    return { title, link, pub, summary:inshort(desc||title), source:srcName };
  }).filter(x=>x.title&&x.link);
}

function renderCards(list){
  const box=document.getElementById('brief-feed');
  box.replaceChildren();
  if(!list.length){
    box.innerHTML='<p class="prose">No stories found. Try Refresh.</p>';
    return;
  }
  for(const it of list){
    const art=document.createElement('article');
    art.className='brief-card';
    const h=document.createElement('h2');
    h.textContent=it.title;
    const p=document.createElement('p');
    p.textContent=it.summary;
    const meta=document.createElement('div');
    meta.className='brief-meta';
    meta.innerHTML='<span>'+(it.source?it.source:'News')+'</span><span>'+timeAgo(it.pub)+'</span>';
    const a=document.createElement('a');
    a.className='brief-read';
    a.href=it.link;
    a.target='_blank';
    a.rel='noopener noreferrer';
    a.textContent='Read full story';
    art.append(h,p,meta,a);
    box.appendChild(art);
  }
}

async function loadFeed(key){
  active=key;
  document.querySelectorAll('.brief-tabs [role=tab]').forEach(b=>{
    b.setAttribute('aria-selected', b.dataset.feed===key?'true':'false');
  });
  const err=document.getElementById('brief-err');
  err.hidden=true;
  document.getElementById('brief-updated').textContent='Loading '+key+'…';
  document.getElementById('brief-feed').innerHTML='<p class="prose">Fetching headlines…</p>';
  try{
    const doc=await fetchRss(FEEDS[key]);
    const list=itemsFromXml(doc);
    renderCards(list.slice(0,25));
    document.getElementById('brief-updated').textContent='Updated '+new Date().toLocaleTimeString(undefined,{timeStyle:'short'})+' · '+list.length+' stories';
  }catch(e){
    err.textContent=e.message||'Failed to load headlines.';
    err.hidden=false;
    document.getElementById('brief-feed').replaceChildren();
    document.getElementById('brief-updated').textContent='Could not update';
  }
}

document.querySelectorAll('.brief-tabs [role=tab]').forEach(btn=>{
  btn.onclick=()=>loadFeed(btn.dataset.feed);
});
document.getElementById('brief-refresh').onclick=()=>loadFeed(active);
loadFeed('news');
</script>`;
}

export function quizSiteBody(ad) {
  return `<div class="hero"><h1>Quick quiz</h1><p>Free trivia in your browser. <a href="/">← Tools</a></p></div>${ad}
<div class="tool-panel">
  <p id="meta"></p>
  <p id="q" style="font-size:1.1rem;font-weight:600"></p>
  <div id="opts" class="grid"></div>
  <p id="score" class="ok"></p>
  <button type="button" class="primary" id="next" hidden>Next question</button>
</div>
<script>
const bank=[
  {q:"What does GST stand for in India?",o:["Goods and Services Tax","General Sales Tax","Government Service Tariff","Gross State Tax"],c:0},
  {q:"SHA-256 is a…",o:["Hash function","Compression codec","Encryption key","Database index"],c:0},
  {q:"1 lakh equals…",o:["100,000","10,000","1,000,000","10,000,000"],c:0},
  {q:"RDAP is used for…",o:["Domain registration data","Email routing","CDN caching","SSL issuance"],c:0},
  {q:"A UUID v4 is primarily…",o:["Random identifier","Sequential counter","MAC address","IP address"],c:0},
  {q:"Typical blog reading speed used online is about…",o:["200 WPM","50 WPM","500 WPM","1000 WPM"],c:0},
  {q:"Base64 encoding represents binary data as…",o:["ASCII text","Hexadecimal only","Unicode code points","JPEG pixels"],c:0},
  {q:"EMI stands for…",o:["Equated Monthly Installment","Estimated Market Index","Electronic Money Interface","Export Margin Income"],c:0},
  {q:"Which tool checks domain registration age on this site?",o:["Domain age checker","Tip calculator","PAN format","BMI calculator"],c:0},
  {q:"Y-Chat runs mainly under which path?",o:["/y-chat/","/chat-server/","/api/chat","/rooms.exe"],c:0},
];
let idx=0, correct=0, picked=null;
function render(){
  const item=bank[idx];
  document.getElementById('meta').textContent='Question '+(idx+1)+' of '+bank.length;
  document.getElementById('q').textContent=item.q;
  const box=document.getElementById('opts'); box.innerHTML='';
  item.o.forEach((text,i)=>{
    const b=document.createElement('button');
    b.type='button'; b.className='primary'; b.style.width='100%'; b.textContent=text;
    b.onclick=()=>{
      if(picked!==null) return;
      picked=i;
      const ok=i===item.c;
      if(ok) correct++;
      b.style.outline=ok?'3px solid #0d6b3a':'3px solid #b00020';
      document.getElementById('score').textContent=ok?'Correct!':'Wrong — correct: '+item.o[item.c];
      document.getElementById('next').hidden=false;
    };
    box.appendChild(b);
  });
  document.getElementById('next').hidden=true;
  document.getElementById('score').textContent='';
  picked=null;
}
document.getElementById('next').onclick=()=>{
  idx++;
  if(idx>=bank.length){
    document.getElementById('q').textContent='Done!';
    document.getElementById('opts').innerHTML='';
    document.getElementById('score').textContent='You scored '+correct+' / '+bank.length;
    document.getElementById('next').hidden=true;
    document.getElementById('meta').textContent='Play again by refreshing the page.';
    return;
  }
  render();
};
render();
</script>`;
}
