/** Batch 21 — Regex builder. */

export function batch21Tools(ad) {
  return [
    {
      path: "/regex-builder.html",
      file: "regex-builder.html",
      category: "developer",
      title: "Regex Builder — Visual Regular Expression Maker",
      desc: "Build and test regular expressions with presets, pattern chips, flags, and live match highlights. Free browser regex builder.",
      card: "Regex builder",
      cardDesc: "Build & test patterns.",
      body: `
<h1>Regex builder</h1>
<p class="prose" style="font-size:0.88rem;color:var(--muted)">Pick a preset or stack pattern parts, then test against sample text. Also try the <a href="/regex-tester/">regex tester</a>.</p>
${ad}
<div class="tool-panel regex-builder">
  <label for="preset">Preset templates</label>
  <select id="preset">
    <option value="">Custom (use chips below)</option>
    <option value="email">Email address</option>
    <option value="url">URL (http/https)</option>
    <option value="ipv4">IPv4 address</option>
    <option value="date">Date YYYY-MM-DD</option>
    <option value="hex">Hex color #RGB</option>
    <option value="phone">Phone (10–15 digits)</option>
    <option value="username">Username (3–16 alnum _)</option>
    <option value="slug">URL slug (lowercase-dash)</option>
    <option value="password">Password (8+ mixed)</option>
  </select>
  <p class="section-hint" style="margin:8px 0">Quick parts (append to pattern)</p>
  <div class="regex-chips" id="chips"></div>
  <label for="lit">Insert escaped literal</label>
  <div class="row">
    <input id="lit" type="text" placeholder="e.g. @company.com" style="flex:1" spellcheck="false" />
    <button type="button" class="primary rs-secondary" id="add-lit">Add literal</button>
  </div>
  <label for="pattern">Regular expression</label>
  <input id="pattern" type="text" spellcheck="false" autocomplete="off" />
  <div class="row" style="margin-top:8px">
    <label><input type="checkbox" id="f-g" checked /> g global</label>
    <label><input type="checkbox" id="f-i" /> i ignore case</label>
    <label><input type="checkbox" id="f-m" /> m multiline</label>
    <label><input type="checkbox" id="f-s" /> s dotAll</label>
  </div>
  <p id="js-snippet" class="prose" style="font-size:0.82rem;font-family:ui-monospace,monospace"></p>
  <button type="button" class="primary rs-secondary" id="copy-re">Copy pattern</button>
  <label for="sample">Sample text</label>
  <textarea id="sample" rows="6">Contact: ada@example.com or visit https://example.com/path
IPv4 192.168.0.1 on 2026-03-15 #ff00aa</textarea>
  <button type="button" class="primary" id="go">Test matches</button>
  <p id="msg" class="tool-feedback" role="status" aria-live="polite"></p>
  <div id="highlight" class="regex-highlight" aria-live="polite"></div>
  <pre id="detail" class="prose" style="font-size:0.82rem;white-space:pre-wrap"></pre>
</div>
<script>
const PRESETS={
  email:'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}',
  url:'https?:\\\\/\\\\/[^\\\\s/$.?#][^\\\\s]*',
  ipv4:'(?:\\\\d{1,3}\\\\.){3}\\\\d{1,3}',
  date:'\\\\d{4}-\\\\d{2}-\\\\d{2}',
  hex:'#(?:[0-9a-fA-F]{3}){1,2}\\\\b',
  phone:'\\\\+?[\\\\d\\\\s-]{10,18}',
  username:'[a-zA-Z0-9_]{3,16}',
  slug:'[a-z0-9]+(?:-[a-z0-9]+)*',
  password:'(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d).{8,}',
};
const CHIPS=[
  { label:'^ start', v:'^' },
  { label:'$ end', v:'$' },
  { label:'\\\\d+ digits', v:'\\\\d+' },
  { label:'\\\\w+ word', v:'\\\\w+' },
  { label:'\\\\s+ space', v:'\\\\s+' },
  { label:'.+ any', v:'.+' },
  { label:'.*? lazy', v:'.*?' },
  { label:'( ) group', v:'()' },
  { label:'(?: ) non-cap', v:'(?:)' },
  { label:'[ ] class', v:'[]' },
  { label:'| or', v:'|' },
];
function escHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escReLiteral(s){
  return s.replace(/[.*+?^\${}()|[\\]\\\\]/g,'\\\\$&');
}
function flags(){
  let f='';
  if(document.getElementById('f-g').checked) f+='g';
  if(document.getElementById('f-i').checked) f+='i';
  if(document.getElementById('f-m').checked) f+='m';
  if(document.getElementById('f-s').checked) f+='s';
  return f;
}
function syncSnippet(){
  const p=document.getElementById('pattern').value;
  const f=flags();
  document.getElementById('js-snippet').textContent='JavaScript: /'+p+'/'+f;
}
const chipBox=document.getElementById('chips');
CHIPS.forEach(c=>{
  const b=document.createElement('button');
  b.type='button'; b.className='regex-chip'; b.textContent=c.label;
  b.onclick=()=>{
    const inp=document.getElementById('pattern');
    inp.value+=c.v;
    document.getElementById('preset').value='';
    syncSnippet();
    run();
  };
  chipBox.appendChild(b);
});
document.getElementById('preset').onchange=()=>{
  const k=document.getElementById('preset').value;
  if(k&&PRESETS[k]){
    document.getElementById('pattern').value=PRESETS[k];
    syncSnippet();
    run();
  }
};
document.getElementById('add-lit').onclick=()=>{
  const lit=document.getElementById('lit').value;
  if(!lit) return;
  document.getElementById('pattern').value+=escReLiteral(lit);
  document.getElementById('lit').value='';
  document.getElementById('preset').value='';
  syncSnippet();
  run();
};
document.getElementById('pattern').oninput=()=>{ document.getElementById('preset').value=''; syncSnippet(); };
['f-g','f-i','f-m','f-s'].forEach(id=>document.getElementById(id).onchange=()=>{ syncSnippet(); run(); });
document.getElementById('copy-re').onclick=()=>navigator.clipboard.writeText(document.getElementById('pattern').value);
function run(){
  const msg=document.getElementById('msg');
  const hi=document.getElementById('highlight');
  const detail=document.getElementById('detail');
  msg.className='tool-feedback';
  hi.innerHTML='';
  detail.textContent='';
  const text=document.getElementById('sample').value;
  const src=document.getElementById('pattern').value;
  if(!src){ msg.textContent='Enter a pattern.'; return; }
  try{
    const re=new RegExp(src, flags());
    const matches=[...text.matchAll(re)];
    msg.className='ok';
    msg.textContent=matches.length+' match(es)';
    if(!matches.length){
      hi.innerHTML='<span>'+escHtml(text)+'</span>';
      return;
    }
    let html='', last=0;
    for(const m of matches){
      const i=m.index??0;
      html+=escHtml(text.slice(last,i))+'<mark>'+escHtml(m[0])+'</mark>';
      last=i+m[0].length;
      if(!re.global) break;
    }
    html+=escHtml(text.slice(last));
    hi.innerHTML=html;
    detail.textContent=matches.map((m,i)=>'#'+(i+1)+': "'+m[0]+'" @'+m.index+(m.length>1?' groups: '+m.slice(1).join(', '):'')).join('\\n');
  }catch(e){
    msg.className='error';
    msg.textContent=e.message;
  }
}
document.getElementById('go').onclick=run;
document.getElementById('sample').oninput=run;
document.getElementById('pattern').value=PRESETS.email;
document.getElementById('preset').value='email';
syncSnippet();
run();
</script>`,
    },
  ];
}
