/** Micro-site hubs (separate landing “sites” on the same domain). */

import { canonicalFromFile } from "./seo-build.mjs";
import { HUB_ICON, iconSvg, iconTile, toolCardHtml } from "./ui-icons.mjs";
import { QUIZ_BANK } from "./quiz-bank.mjs";
import { generateQuizClientScript } from "./quiz-hourly.mjs";

export const micrositeDefs = [
  {
    slug: "finance",
    title: "India Finance Calculators — Income Tax, GST, SIP, FD & EMI",
    desc: "Free India finance calculators: income tax new vs old regime, GST, SIP, FD, RD, EMI, salary, invoice, and rupees in words.",
    keywords: "India finance calculator, income tax calculator India, GST calculator, SIP FD EMI calculator",
    hero: "India finance calculators",
    blurb: "Browser-only tools for invoices, tax math, loans, and savings estimates. Not financial advice.",
    toolPaths: [
      "/income-tax-calculator.html",
      "/hra-calculator.html",
      "/home-loan-calculator.html",
      "/gst-inclusive-calculator.html",
      "/gst-calculator.html",
      "/india-invoice.html",
      "/inr-words.html",
      "/sip-calculator.html",
      "/step-up-sip-calculator.html",
      "/retirement-calculator.html",
      "/emi-calculator.html",
      "/home-loan-calculator.html",
      "/fd-calculator.html",
      "/rd-calculator.html",
      "/compound-interest.html",
      "/simple-interest.html",
      "/salary-calculator.html",
      "/epf-calculator.html",
      "/dti-calculator.html",
      "/loan-to-value-calculator.html",
      "/debt-payoff-calculator.html",
      "/credit-card-payoff-calculator.html",
      "/house-affordability-calculator.html",
      "/reverse-sales-tax-calculator.html",
      "/markup-calculator.html",
      "/overtime-calculator.html",
      "/commission-calculator.html",
      "/pro-rata-calculator.html",
      "/swp-calculator.html",
      "/npv-calculator.html",
      "/present-value-calculator.html",
      "/emergency-fund-calculator.html",
      "/cap-rate-calculator.html",
      "/irr-calculator.html",
      "/rental-yield-calculator.html",
      "/savings-goal-calculator.html",
      "/mortgage-payment-calculator.html",
      "/rent-vs-buy-calculator.html",
    ],
    faqs: [
      { q: "Are these official bank or tax tools?", a: "No. They are quick calculators for education and planning." },
    ],
  },
  {
    slug: "dev",
    title: "Developer Tools Online — Hash, Base64, UUID, JSON & Cron",
    desc: "Developer utilities in the browser: SHA-256, Base64, UUID, password generator, JSON formatter, cron helper, QR codes.",
    keywords: "developer tools online, hash generator, base64 encoder, uuid generator, json formatter",
    hero: "Developer utilities",
    blurb: "Encode, hash, and generate identifiers locally—nothing sent to a server.",
    toolPaths: [
      "/what-is-my-ip.html",
      "/regex-builder.html",
      "/regex-tester.html",
      "/jwt-generator.html",
      "/jwt-decoder.html",
      "/iban-validator.html",
      "/test-credit-card-generator.html",
      "/hash-generator.html",
      "/base64-encoder.html",
      "/uuid-generator.html",
      "/password-generator.html",
      "/random-string-generator.html",
      "/nanoid-generator.html",
      "/otp-generator.html",
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
      "/passphrase-generator.html",
      "/spf-record-generator.html",
      "/dmarc-record-generator.html",
      "/minify-css.html",
    ],
    faqs: [{ q: "Is input uploaded?", a: "No for hash, Base64, UUID, and password tools—they run in your browser." }],
  },
  {
    slug: "seo-lab",
    title: "Free SEO Tools — Domain Age, Meta Tags & Content Counters",
    desc: "SEO helpers: domain age lookup, word counter, character counter, reading time, and SEO checklist guide.",
    keywords: "SEO tools free, domain age, word counter SEO",
    hero: "SEO lab",
    blurb: "Research domains and tune on-page content length before you publish.",
    toolPaths: [
      "/youtube-title-character-counter.html",
      "/open-graph-tag-generator.html",
      "/serp-snippet-preview.html",
      "/schema-markup-generator.html",
      "/instagram-caption-counter.html",
      "/tiktok-caption-counter.html",
      "/facebook-character-counter.html",
      "/pinterest-description-counter.html",
      "/sitemap-xml-generator.html",
      "/canonical-tag-generator.html",
      "/hreflang-tag-generator.html",
      "/youtube-tags-generator.html",
      "/amazon-title-character-counter.html",
      "/reddit-title-character-counter.html",
      "/ebay-title-character-counter.html",
      "/etsy-title-character-counter.html",
      "/meta-keywords-from-text.html",
      "/ai-meta-description-generator.html",
      "/discord-character-counter.html",
      "/headline-analyzer.html",
      "/twitter-character-counter.html",
      "/linkedin-character-counter.html",
      "/keyword-density-checker.html",
      "/meta-description-checker.html",
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
    title: "OSINT Tools — Username, Domain & Public Search Links",
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
    title: "India Online Tools — Tax, GST, UPI, PAN & Finance Calculators",
    desc: "India toolkit: income tax new vs old regime, GST, PPF, gratuity, UPI/PAN/IFSC checks, invoices, SIP, EMI, and rupees in words.",
    keywords: "India tools online, income tax India, GST calculator, UPI PAN IFSC",
    hero: "India utilities",
    blurb: "Tax, IDs, invoices, and savings calculators for India—browser-only, not government official.",
    toolPaths: [
      "/income-tax-calculator.html",
      "/hra-calculator.html",
      "/home-loan-calculator.html",
      "/step-up-sip-calculator.html",
      "/gst-inclusive-calculator.html",
      "/gst-calculator.html",
      "/gratuity-calculator.html",
      "/epf-calculator.html",
      "/swp-calculator.html",
      "/lumpsum-investment-calculator.html",
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
      "/personal-loan-calculator.html",
      "/ltcg-tax-calculator.html",
      "/rent-receipt-generator.html",
      "/leave-encashment-calculator.html",
      "/professional-tax-calculator.html",
      "/aadhaar-format-checker.html",
    ],
    faqs: [
      { q: "Are PAN or UPI checks official?", a: "No. Format and pattern helpers only—not NPCI or Income Tax verification." },
    ],
  },
  {
    slug: "security",
    title: "Security Tools — Hash, JWT, Password & Crypto Utilities",
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
      "/passphrase-generator.html",
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
    title: "Design & PDF Tools — Colors, Gradients, QR & Image Utilities",
    desc: "Design and file tools: color contrast, CSS gradients, QR codes, PDF merge, and image compression.",
    keywords: "design tools online, gradient generator, compress image",
    hero: "Design & media",
    blurb: "Pick colors, export gradients, merge PDFs, and compress images on your device.",
    toolPaths: [
      "/color-picker.html",
      "/gradient-generator.html",
      "/qr-code-generator.html",
      "/pdf-merge.html",
      "/split-pdf.html",
      "/pdf-page-counter.html",
      "/jpg-to-pdf.html",
      "/png-to-pdf.html",
      "/pdf-rotate.html",
      "/pdf-to-word.html",
      "/word-to-pdf.html",
      "/image-compress.html",
      "/image-converter.html",
      "/video-to-mp3.html",
      "/image-resizer.html",
      "/aspect-ratio.html",
      "/px-to-rem-converter.html",
      "/em-to-px-converter.html",
      "/golden-ratio-calculator.html",
    ],
    guidePaths: ["/guides/design-pdf-tools.html"],
    faqs: [],
  },
  {
    slug: "student",
    title: "Student Tools — CGPA, Typing Test & Study Chat",
    desc: "Student tools: CGPA converter, typing test, word counter, age calculator, and free study chat via Y-Chat.",
    keywords: "student tools online, CGPA calculator, study chat",
    hero: "Student toolkit",
    blurb: "Calculators for school and college plus free browser chat for study groups.",
    toolPaths: [
      "/resume-builder.html",
      "/gpa-calculator.html",
      "/pregnancy-due-date-calculator.html",
      "/cgpa-calculator.html",
      "/typing-test.html",
      "/word-counter.html",
      "/age-calculator.html",
      "/percentage-calculator.html",
      "/sample-size-calculator.html",
      "/molarity-calculator.html",
    ],
    extraLinks: [
      { href: "/study-chat.html", card: "Study chat", cardDesc: "Group study on Y-Chat." },
      { href: "/y-chat/", card: "Open Y-Chat", cardDesc: "Free chat rooms." },
    ],
    faqs: [],
  },
  {
    slug: "chat",
    title: "Free Online Chat Rooms — Browser Chat (Y-Chat)",
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
    desc: "Chrome on-device AI: translator, grammar checker, summarizer, rewriter, writer, SEO and email generators, plus sentence tools.",
    keywords: "chrome ai writing, grammar checker proofreader, summarizer browser",
    hero: "Chrome AI writing",
    blurb: "Uses Chrome built-in AI when available—private on-device processing. Splitters work in any browser.",
    toolPaths: [
      "/summariser.html",
      "/grammar-checker.html",
      "/text-rewriter.html",
      "/ai-writer.html",
      "/language-detector.html",
      "/ai-translator.html",
      "/ai-meta-description-generator.html",
      "/ai-email-writer.html",
      "/ai-product-description-writer.html",
      "/ai-cover-letter-writer.html",
      "/ai-paraphrase-tool.html",
      "/ai-simplify-text.html",
      "/ai-formalize-text.html",
      "/ai-tldr-generator.html",
      "/ai-meeting-notes-summarizer.html",
      "/ai-social-post-writer.html",
      "/ai-blog-intro-writer.html",
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
      "/summariser.html",
      "/grammar-checker.html",
      "/ai-translator.html",
      "/ai-meta-description-generator.html",
      "/ai-email-writer.html",
      "/ai-tldr-generator.html",
      "/sentence-splitter.html",
      "/word-counter.html",
      "/character-counter.html",
      "/syllable-counter.html",
      "/sentence-counter.html",
      "/paragraph-counter.html",
      "/speaking-time-calculator.html",
      "/reading-time.html",
      "/markdown-preview.html",
      "/html-to-markdown.html",
      "/markdown-to-text.html",
      "/sort-lines.html",
      "/dedupe-lines.html",
      "/reverse-text.html",
      "/word-frequency.html",
      "/lorem-ipsum.html",
      "/case-converter.html",
      "/title-case-converter.html",
      "/snake-case-converter.html",
      "/kebab-case-converter.html",
      "/headline-analyzer.html",
      "/strip-html.html",
      "/roman-numerals.html",
      "/slug-generator.html",
    ],
    guidePaths: ["/guides/writing-tools.html"],
    faqs: [],
  },
  {
    slug: "productivity",
    title: "Productivity Tools — Typing, Meetings & Quick Calculators",
    desc: "Productivity tools: typing speed test, time zone meeting planner, dice roller, discount and ROI calculators.",
    keywords: "productivity tools online, typing test, meeting planner",
    hero: "Productivity",
    blurb: "Type faster, plan meetings, and run quick everyday calculations.",
    toolPaths: [
      "/resume-builder.html",
      "/video-to-mp3.html",
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
  const cards = [...new Set(def.toolPaths || [])]
    .map(byPath)
    .filter(Boolean)
    .map((t) =>
      toolCardHtml({ href: canonicalFromFile(t.file), title: t.card, desc: t.cardDesc, category: t.category }),
    )
    .join("");
  const extra = (def.extraLinks || [])
    .map((l) => toolCardHtml({ href: l.href, title: l.card, desc: l.cardDesc, category: "chat" }))
    .join("");
  const gcards = (def.guidePaths || [])
    .map((p) => guides.find((g) => g.path === p))
    .filter(Boolean)
    .map(
      (g) =>
        `<a class="card tool-card" href="${canonicalFromFile(g.file)}">${iconTile(["book", "violet"])}<span class="card-body"><h3 class="card-title">${g.title.split("—")[0].trim()}</h3><p>${g.desc.slice(0, 72)}…</p></span></a>`,
    )
    .join("");
  const tone = (HUB_ICON[def.slug] || ["book", "violet"])[1];
  return `<header class="page-hero hub-hero">
<span class="eyebrow tone-${tone}">${iconSvg((HUB_ICON[def.slug] || ["book"])[0])}Topic hub · ${new Set(def.toolPaths || []).size} tools</span>
<h1>${def.hero}</h1>
<p class="page-lead">${def.blurb}</p>
</header>
${ad}
<section class="home-section" aria-labelledby="hub-tools-heading">
<h2 id="hub-tools-heading">Tools in this hub</h2>
<div class="grid grid--compact">${cards}${extra}</div></section>
${gcards ? `<section class="home-section" aria-labelledby="hub-guides-heading"><h2 id="hub-guides-heading">Guides</h2><div class="grid grid--compact">${gcards}</div></section>` : ""}`;
}

/** Inshorts-style headline reader (News / Sports / Business). */
export function briefSiteBody(ad) {
  return `<header class="page-hero hub-hero">
<span class="eyebrow tone-red">Topic hub · live headlines</span>
<h1>News brief</h1>
<p class="page-lead">Latest headlines in short cards—News, Sports, and Business. Tap a story to read the full article at the publisher.</p>
</header>
${ad}
<div class="brief-toolbar">
  <span id="brief-updated">Loading headlines…</span>
  <button type="button" class="primary brief-refresh-btn" id="brief-refresh">Refresh</button>
</div>
<div class="brief-tabs" role="tablist" aria-label="Categories">
  <button type="button" role="tab" id="tab-news" data-feed="news" aria-selected="true">News</button>
  <button type="button" role="tab" id="tab-sports" data-feed="sports" aria-selected="false">Sports</button>
  <button type="button" role="tab" id="tab-business" data-feed="business" aria-selected="false">Business</button>
</div>
<p id="brief-err" class="error" hidden></p>
<div id="brief-feed" class="brief-feed" aria-live="polite"></div>
<p class="brief-note">Headlines from Google News RSS. We show a cached snapshot on load; Refresh tries a live fetch. Not affiliated with Inshorts.</p>
<script>
const FEEDS={
  news:'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
  sports:'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=en-IN&gl=IN&ceid=IN:en',
  business:'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-IN&gl=IN&ceid=IN:en',
};
let active='news';
let bundle={ updated:null, feeds:{} };

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

function normalizeItem(it){
  if(!it||!it.title||!it.link) return null;
  return {
    title: it.title,
    link: it.link,
    pub: it.pub || it.pubDate || '',
    source: it.source || it.author || 'News',
    summary: it.summary || inshort(stripHtml(it.description||it.content||it.title)),
  };
}

async function loadBundle(force){
  const url='/assets/brief-feeds.json'+(force?'?t='+Date.now():'');
  const res=await fetch(url,{cache:force?'no-store':'default'});
  if(!res.ok) throw new Error('Could not load headline snapshot.');
  bundle=await res.json();
  if(!bundle.feeds) throw new Error('Invalid headline snapshot.');
  return bundle;
}

async function fetchLiveItems(rssUrl){
  const api='https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(rssUrl);
  const res=await fetch(api);
  if(!res.ok) throw new Error('Live feed unavailable ('+res.status+').');
  const data=await res.json();
  if(data.status!=='ok') throw new Error(data.message||'Live feed error.');
  return (data.items||[]).map(it=>{
    const {title,source}=parseTitle(it.title||'');
    return normalizeItem({
      title,
      link: it.link,
      pub: it.pubDate,
      source: it.author||source,
      summary: inshort(stripHtml(it.description||it.content||title)),
    });
  }).filter(Boolean);
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

function setUpdatedLine(list, mode){
  const when=bundle.updated?new Date(bundle.updated):new Date();
  const stamp=when.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'});
  const tag=mode==='live'?'Live · ':mode==='cached'?'Snapshot · ':'';
  document.getElementById('brief-updated').textContent=tag+stamp+' · '+list.length+' stories';
}

async function loadFeed(key, opts){
  opts=opts||{};
  active=key;
  document.querySelectorAll('.brief-tabs [role=tab]').forEach(b=>{
    b.setAttribute('aria-selected', b.dataset.feed===key?'true':'false');
  });
  const err=document.getElementById('brief-err');
  err.hidden=true;
  document.getElementById('brief-updated').textContent='Loading '+key+'…';
  document.getElementById('brief-feed').innerHTML='<p class="prose">Fetching headlines…</p>';
  const refreshBtn=document.getElementById('brief-refresh');
  if(refreshBtn) refreshBtn.disabled=true;
  try{
    let list=[];
    let mode='cached';
    if(opts.live){
      try{
        list=await fetchLiveItems(FEEDS[key]);
        mode='live';
      }catch(liveErr){
        await loadBundle(true);
        list=(bundle.feeds[key]||[]).map(normalizeItem).filter(Boolean);
        if(!list.length) throw liveErr;
        err.textContent='Live refresh failed — showing latest snapshot. '+liveErr.message;
        err.hidden=false;
      }
    }else{
      if(!bundle.feeds[key]) await loadBundle(false);
      list=(bundle.feeds[key]||[]).map(normalizeItem).filter(Boolean);
    }
    renderCards(list.slice(0,25));
    setUpdatedLine(list, mode);
  }catch(e){
    err.textContent=e.message||'Failed to load headlines.';
    err.hidden=false;
    document.getElementById('brief-feed').replaceChildren();
    document.getElementById('brief-updated').textContent='Could not load headlines';
  }finally{
    if(refreshBtn) refreshBtn.disabled=false;
  }
}

document.querySelectorAll('.brief-tabs [role=tab]').forEach(btn=>{
  btn.onclick=()=>loadFeed(btn.dataset.feed);
});
document.getElementById('brief-refresh').onclick=()=>loadFeed(active,{live:true});
loadBundle(false).then(()=>loadFeed('news')).catch(()=>loadFeed('news',{live:true}));
</script>`;
}

export function quizSiteBody(ad) {
  return `<header class="page-hero hub-hero">
<span class="eyebrow tone-green">Topic hub · hourly</span>
<h1>Quick quiz</h1>
<p class="page-lead">Ten new questions every hour (your local time).</p>
</header>${ad}
<div class="tool-panel">
  <p id="meta"></p>
  <p id="q" style="font-size:1.1rem;font-weight:600"></p>
  <div id="opts" class="grid"></div>
  <p id="score" class="ok"></p>
  <button type="button" class="primary" id="next" hidden>Next question</button>
</div>
<script>
${generateQuizClientScript(QUIZ_BANK)}
</script>`;
}
