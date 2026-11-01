/** Batch 15 — Resume builder. */

export function batch15Tools(ad) {
  return [
    {
      path: "/resume-builder.html",
      file: "resume-builder.html",
      category: "productivity",
      title: "Resume Builder — Free CV Maker & PDF Download",
      desc: "Build a clean one-page resume in your browser. Live preview, auto-save draft, download PDF—no account, no upload.",
      card: "Resume builder",
      cardDesc: "CV maker · PDF export.",
      body: `
<h1>Resume builder</h1>
<p class="prose" style="font-size:0.88rem;color:var(--muted)">Fill in the form—preview updates instantly. Your draft saves in this browser only. Export PDF when ready.</p>
${ad}
<div class="resume-builder">
  <div class="resume-form tool-panel">
    <h2 class="resume-form-heading">Your details</h2>
    <label for="rs-name">Full name</label>
    <input id="rs-name" type="text" autocomplete="name" placeholder="Alex Kumar" />
    <label for="rs-headline">Headline</label>
    <input id="rs-headline" type="text" placeholder="Software engineer · Backend &amp; APIs" />
    <div class="row">
      <div style="flex:1"><label for="rs-email">Email</label><input id="rs-email" type="email" autocomplete="email" placeholder="you@email.com" /></div>
      <div style="flex:1"><label for="rs-phone">Phone</label><input id="rs-phone" type="tel" autocomplete="tel" placeholder="+91 98765 43210" /></div>
    </div>
    <div class="row">
      <div style="flex:1"><label for="rs-loc">Location</label><input id="rs-loc" type="text" placeholder="Bengaluru, India" /></div>
      <div style="flex:1"><label for="rs-link">LinkedIn or website</label><input id="rs-link" type="url" placeholder="https://linkedin.com/in/you" /></div>
    </div>
    <label for="rs-summary">Summary</label>
    <textarea id="rs-summary" rows="3" placeholder="2–3 sentences on your experience and strengths."></textarea>
    <h2 class="resume-form-heading">Experience</h2>
    <div id="rs-jobs"></div>
    <button type="button" class="primary rs-secondary" id="rs-add-job">+ Add role</button>
    <h2 class="resume-form-heading">Education</h2>
    <label for="rs-edu">Education (one line per entry)</label>
    <textarea id="rs-edu" rows="3" placeholder="B.Tech Computer Science — IIT Delhi — 2024&#10;Higher secondary — CBSE — 2020"></textarea>
    <label for="rs-skills">Skills</label>
    <textarea id="rs-skills" rows="2" placeholder="JavaScript, Python, SQL, Git, AWS"></textarea>
    <div class="row" style="margin-top:16px">
      <button type="button" class="primary" id="rs-pdf">Download PDF</button>
      <button type="button" class="primary rs-secondary" id="rs-clear">Clear draft</button>
    </div>
    <p id="rs-status" class="prose" style="font-size:0.85rem;margin-top:10px"></p>
  </div>
  <div class="resume-preview-outer">
    <p class="section-hint" style="margin:0 0 8px">Live preview</p>
    <article id="rs-preview" class="resume-preview" aria-label="Resume preview"></article>
  </div>
</div>
<script>
const STORAGE_KEY='tools-resume-v1';
function esc(s){
  return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function lines(s){
  return String(s??'').split(/\\n+/).map(x=>x.trim()).filter(Boolean);
}
function jobTemplate(j={}){
  const d=document.createElement('div');
  d.className='job-block';
  d.innerHTML='<label>Company</label><input data-k="company" type="text" value="'+esc(j.company||'')+'" placeholder="Acme Pvt Ltd" />'
    +'<label>Job title</label><input data-k="title" type="text" value="'+esc(j.title||'')+'" placeholder="Senior Engineer" />'
    +'<label>Dates</label><input data-k="dates" type="text" value="'+esc(j.dates||'')+'" placeholder="Jan 2022 – Present" />'
    +'<label>Bullet points (one per line)</label><textarea data-k="bullets" rows="3" placeholder="Shipped X which improved Y by Z%">'+esc(j.bullets||'')+'</textarea>'
    +'<button type="button" class="rs-link-btn" data-remove>Remove role</button>';
  d.querySelector('[data-remove]').onclick=()=>{ d.remove(); render(); saveDraft(); };
  d.querySelectorAll('input,textarea').forEach(el=>{ el.addEventListener('input',()=>{ render(); saveDraft(); }); });
  return d;
}
function collectJobs(){
  return [...document.querySelectorAll('#rs-jobs .job-block')].map(block=>{
    const o={};
    block.querySelectorAll('[data-k]').forEach(el=>{ o[el.dataset.k]=el.value; });
    return o;
  });
}
function field(id){ return document.getElementById(id); }
function readState(){
  return {
    name: field('rs-name').value,
    headline: field('rs-headline').value,
    email: field('rs-email').value,
    phone: field('rs-phone').value,
    loc: field('rs-loc').value,
    link: field('rs-link').value,
    summary: field('rs-summary').value,
    edu: field('rs-edu').value,
    skills: field('rs-skills').value,
    jobs: collectJobs(),
  };
}
function render(){
  const s=readState();
  const prev=document.getElementById('rs-preview');
  const contact=[s.email,s.phone,s.loc].filter(Boolean).map(esc).join(' · ');
  const link=s.link?('<p class="rs-contact"><a href="'+esc(s.link)+'">'+esc(s.link.replace(/^https?:\\/\\//i,''))+'</a></p>'):'';
  let jobsHtml='';
  for(const j of s.jobs){
    if(!j.company&&!j.title&&!j.bullets) continue;
    const bullets=lines(j.bullets).map(li=>'<li>'+esc(li)+'</li>').join('');
    jobsHtml+='<section class="rs-block"><h3>'+esc(j.title||'Role')+'</h3>'
      +'<p class="rs-meta"><strong>'+esc(j.company||'')+'</strong>'+(j.dates?' · '+esc(j.dates):'')+'</p>'
      +(bullets?'<ul>'+bullets+'</ul>':'')+'</section>';
  }
  const edu=lines(s.edu).map(e=>'<li>'+esc(e)+'</li>').join('');
  const skills=lines(s.skills.replace(/,/g,'\\n')).map(x=>'<span class="rs-skill">'+esc(x)+'</span>').join('');
  prev.innerHTML='<header class="rs-head"><p class="rs-name">'+esc(s.name||'Your name')+'</p>'
    +(s.headline?'<p class="rs-headline">'+esc(s.headline)+'</p>':'')
    +(contact?'<p class="rs-contact">'+contact+'</p>':'')
    +link+'</header>'
    +(s.summary?'<section class="rs-block"><h2>Summary</h2><p>'+esc(s.summary)+'</p></section>':'')
    +(jobsHtml?'<section class="rs-block"><h2>Experience</h2>'+jobsHtml+'</section>':'')
    +(edu?'<section class="rs-block"><h2>Education</h2><ul>'+edu+'</ul></section>':'')
    +(skills?'<section class="rs-block"><h2>Skills</h2><div class="rs-skills">'+skills+'</div></section>':'');
}
let saveTimer;
function saveDraft(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readState()));
      document.getElementById('rs-status').textContent='Draft saved in this browser.';
    }catch(e){
      document.getElementById('rs-status').textContent='Could not save draft (storage full or private mode).';
    }
  }, 400);
}
function loadDraft(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw) return false;
    const s=JSON.parse(raw);
    field('rs-name').value=s.name||'';
    field('rs-headline').value=s.headline||'';
    field('rs-email').value=s.email||'';
    field('rs-phone').value=s.phone||'';
    field('rs-loc').value=s.loc||'';
    field('rs-link').value=s.link||'';
    field('rs-summary').value=s.summary||'';
    field('rs-edu').value=s.edu||'';
    field('rs-skills').value=s.skills||'';
    const jobs=s.jobs?.length?s.jobs:[{company:'',title:'',dates:'',bullets:''}];
    const box=document.getElementById('rs-jobs');
    box.replaceChildren();
    jobs.forEach(j=>box.appendChild(jobTemplate(j)));
    return true;
  }catch(_){ return false; }
}
function bindFields(){
  ['rs-name','rs-headline','rs-email','rs-phone','rs-loc','rs-link','rs-summary','rs-edu','rs-skills'].forEach(id=>{
    field(id).addEventListener('input',()=>{ render(); saveDraft(); });
  });
}
document.getElementById('rs-add-job').onclick=()=>{
  document.getElementById('rs-jobs').appendChild(jobTemplate({}));
  render(); saveDraft();
};
document.getElementById('rs-clear').onclick=()=>{
  if(!confirm('Clear all fields and remove saved draft?')) return;
  localStorage.removeItem(STORAGE_KEY);
  ['rs-name','rs-headline','rs-email','rs-phone','rs-loc','rs-link','rs-summary','rs-edu','rs-skills'].forEach(id=>{ field(id).value=''; });
  document.getElementById('rs-jobs').replaceChildren();
  document.getElementById('rs-jobs').appendChild(jobTemplate({}));
  render();
  document.getElementById('rs-status').textContent='Draft cleared.';
};
document.getElementById('rs-pdf').onclick=async()=>{
  const status=document.getElementById('rs-status');
  status.className='tool-feedback';
  status.textContent='Preparing PDF…';
  try{
    const html2pdf=(await import('https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.3/+esm')).default;
    const el=document.getElementById('rs-preview');
    const name=(field('rs-name').value||'resume').replace(/[^a-z0-9-_]+/gi,'-').replace(/^-|-$/g,'')||'resume';
    await html2pdf().set({
      margin:[12,12,12,12],
      filename: name+'-resume.pdf',
      image:{ type:'jpeg', quality:0.95 },
      html2canvas:{ scale:2, useCORS:true },
      jsPDF:{ unit:'mm', format:'a4', orientation:'portrait' },
    }).from(el).save();
    status.className='ok';
    status.textContent='PDF downloaded.';
  }catch(e){
    status.className='error';
    status.textContent=e.message||String(e);
  }
};
if(!loadDraft()){
  document.getElementById('rs-jobs').appendChild(jobTemplate({
    company:'Example Corp',
    title:'Software Engineer',
    dates:'2023 – Present',
    bullets:'Built customer-facing features used by 50k+ users\\nReduced API latency 30% via caching',
  }));
  field('rs-name').value='Alex Kumar';
  field('rs-headline').value='Software engineer · Full stack';
  field('rs-summary').value='Engineer with 3+ years building web apps. Focus on clear APIs, performance, and maintainable code.';
  field('rs-skills').value='JavaScript, TypeScript, React, Node.js, SQL, Git';
}
bindFields();
render();
</script>`,
    },
  ];
}
