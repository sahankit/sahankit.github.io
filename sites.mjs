/** Micro-site hubs (separate landing “sites” on the same domain). */

export const micrositeDefs = [
  {
    slug: "finance",
    title: "Sahankit Finance — India GST, SIP, FD & EMI Tools",
    desc: "Free India finance calculators: GST, SIP, FD, RD, EMI, invoice template, salary estimate, and rupees in words.",
    keywords: "India finance calculator, GST SIP FD EMI, Sahankit Finance",
    hero: "India finance calculators",
    blurb: "Browser-only tools for invoices, tax math, loans, and savings estimates. Not financial advice.",
    toolPaths: [
      "/gst-calculator.html",
      "/india-invoice.html",
      "/inr-words.html",
      "/sip-calculator.html",
      "/emi-calculator.html",
      "/fd-calculator.html",
      "/rd-calculator.html",
      "/compound-interest.html",
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
      "/cron-helper.html",
      "/qr-code-generator.html",
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
      "/domain-age.html",
      "/word-counter.html",
      "/character-counter.html",
      "/reading-time.html",
    ],
    guidePaths: ["/guides/seo-checklist.html"],
    faqs: [{ q: "Does domain age guarantee rankings?", a: "No. Content quality and relevance matter more." }],
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
];

export function micrositeMain(def, ad, tools, guides) {
  const byPath = (p) => tools.find((t) => t.path === p);
  const cards = (def.toolPaths || [])
    .map(byPath)
    .filter(Boolean)
    .map(
      (t) => `<a class="card" href="${t.path}"><h2>${t.card}</h2><p>${t.cardDesc}</p></a>`,
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
  return `<div class="hero"><h1>${def.hero}</h1><p>${def.blurb}</p><p><a href="/">← All Sahankit Tools</a></p></div>
${ad}
<section><div class="grid">${cards}${extra}</div></section>
${gcards ? `<section style="margin-top:24px"><h2>Guides</h2><div class="grid">${gcards}</div></section>` : ""}`;
}

export function quizSiteBody(ad) {
  return `<div class="hero"><h1>Quick quiz</h1><p>Free trivia in your browser. <a href="/">← Sahankit Tools</a></p></div>${ad}
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
