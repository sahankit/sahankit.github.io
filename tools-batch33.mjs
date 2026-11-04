/** Batch 33 — high-volume utilities: calculator, wheel, device tests, image/OCR, India savings. */

const toolComplete = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch33Tools(ad) {
  return [
    {
      path: "/scientific-calculator.html",
      file: "scientific-calculator.html",
      category: "calculators",
      title: "Scientific Calculator Online — Free with Trig, Log & History",
      desc: "Free online scientific calculator with sin, cos, tan, log, ln, powers, roots, factorial, degree/radian mode and history. Works with keyboard and touch.",
      card: "Scientific calculator",
      cardDesc: "Trig, log, powers, history.",
      body: `<h1>Scientific calculator</h1>${ad}
<div class="tool-panel sci" data-no-live>
<div class="sci-screen">
<label class="sr-only" for="expr">Expression</label>
<input id="expr" type="text" autocomplete="off" spellcheck="false" autocapitalize="off" placeholder="0" />
<output id="res" class="sci-res" aria-live="polite"></output>
</div>
<div class="sci-keys" id="keys">
<button type="button" class="key key-fn" data-k="mode" id="mode" aria-pressed="false" title="Toggle degrees / radians">DEG</button>
<button type="button" class="key key-fn" data-k="(">(</button>
<button type="button" class="key key-fn" data-k=")">)</button>
<button type="button" class="key key-fn" data-k="%">%</button>
<button type="button" class="key key-clear" data-k="ac">AC</button>
<button type="button" class="key key-fn" data-k="sin(">sin</button>
<button type="button" class="key key-fn" data-k="cos(">cos</button>
<button type="button" class="key key-fn" data-k="tan(">tan</button>
<button type="button" class="key key-fn" data-k="ln(">ln</button>
<button type="button" class="key key-fn" data-k="log(">log</button>
<button type="button" class="key key-fn" data-k="√(">√</button>
<button type="button" class="key key-fn" data-k="^2">x²</button>
<button type="button" class="key key-fn" data-k="^">xʸ</button>
<button type="button" class="key key-fn" data-k="!">n!</button>
<button type="button" class="key key-fn" data-k="π">π</button>
<button type="button" class="key" data-k="7">7</button>
<button type="button" class="key" data-k="8">8</button>
<button type="button" class="key" data-k="9">9</button>
<button type="button" class="key key-op" data-k="÷">÷</button>
<button type="button" class="key key-fn" data-k="back" aria-label="Backspace">⌫</button>
<button type="button" class="key" data-k="4">4</button>
<button type="button" class="key" data-k="5">5</button>
<button type="button" class="key" data-k="6">6</button>
<button type="button" class="key key-op" data-k="×">×</button>
<button type="button" class="key key-fn" data-k="e">e</button>
<button type="button" class="key" data-k="1">1</button>
<button type="button" class="key" data-k="2">2</button>
<button type="button" class="key" data-k="3">3</button>
<button type="button" class="key key-op" data-k="−">−</button>
<button type="button" class="key key-fn" data-k="Ans">Ans</button>
<button type="button" class="key" data-k="0">0</button>
<button type="button" class="key" data-k=".">.</button>
<button type="button" class="key key-fn" data-k="E" title="Times ten to the power">EXP</button>
<button type="button" class="key key-op" data-k="+">+</button>
<button type="button" class="key key-eq" data-k="=">=</button>
</div>
<div class="sci-history" id="hist" hidden><h2>History</h2><ol id="histList"></ol></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const expr=$('expr'), res=$('res');
let deg=true, ans=0, justEvaluated=false, reported=false;
const hist=[];
const FUN={sin:1,cos:1,tan:1,asin:1,acos:1,atan:1,ln:1,log:1,sqrt:1,cbrt:1,abs:1};
const NAMES=['asin','acos','atan','sqrt','cbrt','sin','cos','tan','abs','log','ans','ln','pi','e'];
function tokenize(src){
  const s=src.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/√/g,'sqrt').replace(/π/g,'pi').replace(/x/gi,'*');
  const t=[]; let i=0;
  const digit=c=>c>='0'&&c<='9';
  while(i<s.length){
    const c=s[i];
    if(c===' '){ i++; continue; }
    if(digit(c)||c==='.'){
      let j=i; while(j<s.length&&(digit(s[j])||s[j]==='.')) j++;
      if(s[j]==='E'){ let k=j+1; if(s[k]==='+'||s[k]==='-') k++; if(digit(s[k]||'')){ while(digit(s[k]||'')) k++; j=k; } }
      const num=s.slice(i,j);
      if(num.split('.').length>2||num==='.') throw new Error('Invalid number');
      t.push({type:'num',v:parseFloat(num)}); i=j; continue;
    }
    if(/[a-zA-Z]/.test(c)){
      const low=s.slice(i).toLowerCase();
      const name=NAMES.find(n=>low.startsWith(n));
      if(!name) throw new Error('Unknown function');
      t.push({type:FUN[name]?'fn':'const',v:name}); i+=name.length; continue;
    }
    if('+-*/^()!%'.includes(c)){ t.push({type:'op',v:c}); i++; continue; }
    throw new Error('Unexpected '+c);
  }
  return t;
}
const toRad=x=>deg?x*Math.PI/180:x, fromRad=x=>deg?x*180/Math.PI:x;
const clean=x=>Math.abs(x)<1e-12?0:x;
function fact(n){ if(n<0||!Number.isInteger(n)) return NaN; if(n>170) return Infinity; let r=1; for(let i=2;i<=n;i++) r*=i; return r; }
function fn(n,a){
  switch(n){
    case 'sin': return clean(Math.sin(toRad(a)));
    case 'cos': return clean(Math.cos(toRad(a)));
    case 'tan': if(deg&&Math.abs((((a%180)+180)%180)-90)<1e-9) return NaN; return clean(Math.tan(toRad(a)));
    case 'asin': return fromRad(Math.asin(a));
    case 'acos': return fromRad(Math.acos(a));
    case 'atan': return fromRad(Math.atan(a));
    case 'ln': return Math.log(a);
    case 'log': return Math.log10(a);
    case 'sqrt': return Math.sqrt(a);
    case 'cbrt': return Math.cbrt(a);
    case 'abs': return Math.abs(a);
  }
  return NaN;
}
function parse(tokens){
  let p=0;
  const peek=()=>tokens[p], next=()=>tokens[p++];
  const isOp=v=>peek()&&peek().type==='op'&&peek().v===v;
  const startsFactor=()=>{ const t=peek(); return t&&(t.type==='num'||t.type==='fn'||t.type==='const'||(t.type==='op'&&t.v==='(')); };
  function expression(){ let v=term(); while(isOp('+')||isOp('-')){ const o=next().v, r=term(); v=o==='+'?v+r:v-r; } return v; }
  function term(){ let v=unary(); for(;;){ if(isOp('*')||isOp('/')){ const o=next().v, r=unary(); v=o==='*'?v*r:v/r; } else if(startsFactor()){ v*=unary(); } else break; } return v; }
  function unary(){ if(isOp('-')){ next(); return -unary(); } if(isOp('+')){ next(); return unary(); } return power(); }
  function power(){ const b=postfix(); if(isOp('^')){ next(); return Math.pow(b,unary()); } return b; }
  function postfix(){ let v=primary(); for(;;){ if(isOp('!')){ next(); v=fact(v); } else if(isOp('%')){ next(); v=v/100; } else break; } return v; }
  function primary(){
    const t=next();
    if(!t) throw new Error('Incomplete expression');
    if(t.type==='num') return t.v;
    if(t.type==='const') return t.v==='pi'?Math.PI:t.v==='e'?Math.E:ans;
    if(t.type==='fn'){ let a; if(isOp('(')){ next(); a=expression(); if(isOp(')')) next(); else throw new Error('Missing )'); } else a=power(); return fn(t.v,a); }
    if(t.type==='op'&&t.v==='('){ const v=expression(); if(isOp(')')) next(); else throw new Error('Missing )'); return v; }
    throw new Error('Unexpected '+t.v);
  }
  const v=expression();
  if(p<tokens.length) throw new Error('Unexpected '+tokens[p].v);
  return v;
}
function evaluate(s){
  const open=(s.match(/[(]/g)||[]).length-(s.match(/[)]/g)||[]).length;
  if(open>0) s+=')'.repeat(open);
  return parse(tokenize(s));
}
function fmt(x){
  if(!Number.isFinite(x)) return null;
  if(x!==0&&(Math.abs(x)>=1e15||Math.abs(x)<1e-9)) return x.toExponential(10).replace(/[.]?0+e/,'e');
  return String(parseFloat(x.toPrecision(14)));
}
function preview(){
  const s=expr.value.trim();
  res.className='sci-res';
  if(!s){ res.textContent=''; return; }
  try{ const v=fmt(evaluate(s)); res.textContent=v===null?'':'= '+v; res.className='sci-res is-preview'; }catch(e){ res.textContent=''; }
}
function renderHist(){
  const list=$('histList'); list.innerHTML='';
  hist.forEach(h=>{ const li=document.createElement('li'); const b=document.createElement('button'); b.type='button'; b.className='hist-item'; b.textContent=h.e+' = '+h.r; b.onclick=()=>{ expr.value=h.e; justEvaluated=false; preview(); }; li.appendChild(b); list.appendChild(li); });
  $('hist').hidden=!hist.length;
}
function equals(){
  const s=expr.value.trim(); if(!s) return;
  try{
    const v=evaluate(s), f=fmt(v);
    if(f===null) throw new Error(Number.isNaN(v)?'Math error':'Result too large');
    ans=v; hist.unshift({e:s,r:f}); if(hist.length>10) hist.length=10;
    expr.value=f; res.textContent=s+' ='; res.className='sci-res is-done';
    justEvaluated=true; renderHist();
    if(!reported){ reported=true; ${toolComplete} }
  }catch(err){ res.textContent=err.message||'Error'; res.className='sci-res is-error'; }
}
function insert(k){
  if(justEvaluated){ if(!'+−×÷^%!)'.includes(k[0])) expr.value=''; justEvaluated=false; }
  const focused=document.activeElement===expr;
  const a=focused?expr.selectionStart:expr.value.length, b=focused?expr.selectionEnd:expr.value.length;
  expr.value=expr.value.slice(0,a)+k+expr.value.slice(b);
  if(focused) expr.setSelectionRange(a+k.length,a+k.length);
  preview();
}
const keys=$('keys');
keys.addEventListener('mousedown',e=>{ if(e.target.closest('.key')&&document.activeElement===expr) e.preventDefault(); });
keys.addEventListener('click',e=>{
  const b=e.target.closest('.key'); if(!b) return;
  const k=b.dataset.k;
  if(k==='=') return equals();
  if(k==='ac'){ expr.value=''; res.textContent=''; justEvaluated=false; return; }
  if(k==='back'){ expr.value=justEvaluated?'':expr.value.slice(0,-1); justEvaluated=false; preview(); return; }
  if(k==='mode'){ deg=!deg; b.textContent=deg?'DEG':'RAD'; b.setAttribute('aria-pressed',String(!deg)); preview(); return; }
  insert(k);
});
expr.addEventListener('keydown',e=>{
  if(e.key==='Enter'||e.key==='='){ e.preventDefault(); equals(); }
  else if(e.key==='Escape'){ expr.value=''; preview(); }
});
expr.addEventListener('input',()=>{ justEvaluated=false; preview(); });
if(window.matchMedia&&matchMedia('(pointer: fine)').matches) expr.focus({preventScroll:true});
})();
</script>`,
    },
    {
      path: "/spin-the-wheel.html",
      file: "spin-the-wheel.html",
      category: "productivity",
      title: "Spin the Wheel — Random Name Picker Wheel Online",
      desc: "Free spin the wheel random picker. Add names or choices, spin, and get a fair random winner. Remove winners, shuffle, and save your list in the browser.",
      card: "Spin the wheel",
      cardDesc: "Wheel of names random picker.",
      body: `<h1>Spin the wheel</h1>${ad}
<div class="tool-panel wheel-tool" data-no-live>
<div class="wheel-wrap">
<canvas id="wheel" width="600" height="600" role="img" aria-label="Wheel of names"></canvas>
<span class="wheel-pointer" aria-hidden="true"></span>
<button type="button" class="wheel-hub" id="hub" aria-label="Spin the wheel">SPIN</button>
</div>
<p id="out" class="wheel-result" role="status" aria-live="polite"></p>
<label for="names">Entries — one per line (names, numbers or choices)</label>
<textarea id="names" rows="8" spellcheck="false">Aarav
Diya
Kabir
Meera
Rohan
Sara
Vihaan
Zoya</textarea>
<label><input type="checkbox" id="remove" /> Remove the winner after each spin</label>
<div class="row">
<button type="button" class="primary" id="go">Spin the wheel</button>
<button type="button" class="primary" id="shuffle">Shuffle</button>
<button type="button" class="primary" id="sort">Sort A–Z</button>
</div>
<p class="tool-feedback" id="count"></p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const cv=$('wheel'), ctx=cv.getContext('2d'), ta=$('names');
const KEY='tools:wheel';
const COLORS=['#7c3aed','#f59e0b','#10b981','#ef4444','#3b82f6','#ec4899','#14b8a6','#f97316','#6366f1','#84cc16'];
let rot=0, spinning=false, saveT=0;
try{ const saved=localStorage.getItem(KEY); if(saved) ta.value=saved; }catch(e){}
const entries=()=>ta.value.split('\\n').map(s=>s.trim()).filter(Boolean).slice(0,300);
function rand(){ const a=new Uint32Array(1); crypto.getRandomValues(a); return a[0]/4294967296; }
function draw(){
  const list=entries(), n=list.length, W=cv.width, r=W/2;
  ctx.clearRect(0,0,W,W);
  $('count').textContent=n>=2?n+' entries':'Add at least two entries (one per line).';
  if(!n){ ctx.fillStyle='#e7e2ee'; ctx.beginPath(); ctx.arc(r,r,r-4,0,Math.PI*2); ctx.fill(); return; }
  const seg=Math.PI*2/n;
  const fs=Math.max(12,Math.min(30,r*seg*0.42));
  ctx.font='600 '+fs+'px system-ui, -apple-system, Segoe UI, sans-serif';
  for(let i=0;i<n;i++){
    const a0=rot+i*seg;
    ctx.beginPath(); ctx.moveTo(r,r); ctx.arc(r,r,r-4,a0,a0+seg); ctx.closePath();
    let color=COLORS[i%COLORS.length];
    if(i===n-1&&n>1&&n%COLORS.length===1) color=COLORS[3];
    ctx.fillStyle=color; ctx.fill();
    ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke();
    ctx.save(); ctx.translate(r,r); ctx.rotate(a0+seg/2);
    ctx.fillStyle='#fff'; ctx.textAlign='right'; ctx.textBaseline='middle';
    let label=list[i]; const maxW=r-80;
    if(ctx.measureText(label).width>maxW){ while(label.length>1&&ctx.measureText(label+'…').width>maxW) label=label.slice(0,-1); label+='…'; }
    ctx.fillText(label,r-26,0);
    ctx.restore();
  }
}
function save(){ clearTimeout(saveT); saveT=setTimeout(()=>{ try{ localStorage.setItem(KEY,ta.value); }catch(e){} },300); }
function winnerIndex(n){ const seg=Math.PI*2/n, TAU=Math.PI*2; const a=(((-Math.PI/2-rot)%TAU)+TAU)%TAU; return Math.floor(a/seg)%n; }
function spin(){
  if(spinning) return;
  const list=entries(), out=$('out');
  if(list.length<2){ out.className='error'; out.textContent='Add at least two entries to spin.'; return; }
  spinning=true; out.className='wheel-result'; out.textContent='Spinning…';
  const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dur=reduce?600:4200+rand()*1200;
  const start=rot, delta=Math.PI*2*(reduce?1:5+Math.floor(rand()*3))+rand()*Math.PI*2;
  const t0=performance.now();
  return new Promise(resolve=>{
    function frame(now){
      const k=Math.min(1,(now-t0)/dur), ease=1-Math.pow(1-k,4);
      rot=start+delta*ease; draw();
      if(k<1){ requestAnimationFrame(frame); return; }
      rot%=Math.PI*2; spinning=false;
      const w=list[winnerIndex(list.length)];
      out.textContent=''; const b=document.createElement('strong'); b.textContent=w; out.append('Winner: ',b);
      if($('remove').checked){
        const lines=ta.value.split('\\n'); const idx=lines.findIndex(l=>l.trim()===w);
        if(idx>-1){ lines.splice(idx,1); ta.value=lines.join('\\n'); save(); setTimeout(draw,900); }
      }
      resolve();
    }
    requestAnimationFrame(frame);
  });
}
$('go').onclick=spin;
$('hub').onclick=()=>$('go').click();
$('shuffle').onclick=()=>{ const l=entries(); for(let i=l.length-1;i>0;i--){ const j=Math.floor(rand()*(i+1)); [l[i],l[j]]=[l[j],l[i]]; } ta.value=l.join('\\n'); save(); draw(); };
$('sort').onclick=()=>{ ta.value=entries().sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).join('\\n'); save(); draw(); };
ta.addEventListener('input',()=>{ save(); if(!spinning) draw(); });
draw();
})();
</script>`,
    },
    {
      path: "/click-speed-test.html",
      file: "click-speed-test.html",
      category: "tests",
      title: "Click Speed Test — CPS Test in 1, 5, 10, 30 or 60 Seconds",
      desc: "Free CPS test: check how many clicks per second you can do in 1, 5, 10, 30 or 60 seconds. Tracks your best score and rates your click speed.",
      card: "Click speed test (CPS)",
      cardDesc: "Clicks per second test.",
      body: `<h1>Click speed test (CPS)</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="seg" role="radiogroup" aria-label="Test length">
<label><input type="radio" name="dur" value="1" /> 1 s</label>
<label><input type="radio" name="dur" value="5" checked /> 5 s</label>
<label><input type="radio" name="dur" value="10" /> 10 s</label>
<label><input type="radio" name="dur" value="30" /> 30 s</label>
<label><input type="radio" name="dur" value="60" /> 60 s</label>
</div>
<button type="button" class="test-pad" id="pad">Click here to start</button>
<div class="stats">
<div class="stat"><strong id="clicks">0</strong>Clicks</div>
<div class="stat"><strong id="left">5.0</strong>Seconds left</div>
<div class="stat"><strong id="cps">0.0</strong>Clicks / second</div>
<div class="stat"><strong id="best">—</strong>Your best</div>
</div>
<p id="out" role="status" aria-live="polite"></p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const pad=$('pad');
let state='idle', clicks=0, t0=0, dur=5, raf=0, lockUntil=0;
const dsel=()=>+document.querySelector('input[name=dur]:checked').value;
const bestKey=()=>'tools:cps:'+dsel();
function showBest(){ let b=null; try{ b=localStorage.getItem(bestKey()); }catch(e){} $('best').textContent=b?(+b).toFixed(2):'—'; }
function reset(){ cancelAnimationFrame(raf); state='idle'; clicks=0; dur=dsel(); $('clicks').textContent='0'; $('left').textContent=dur.toFixed(1); $('cps').textContent='0.0'; pad.textContent='Click here to start'; pad.className='test-pad'; showBest(); }
function finish(){
  state='done'; cancelAnimationFrame(raf);
  const cps=clicks/dur;
  $('cps').textContent=cps.toFixed(2); $('left').textContent='0.0';
  let best=0; try{ best=+localStorage.getItem(bestKey())||0; }catch(e){}
  const isBest=cps>best;
  if(isBest){ try{ localStorage.setItem(bestKey(),String(cps)); }catch(e){} }
  showBest();
  const rating=cps>=10?'Lightning fast':cps>=8?'Excellent':cps>=6.5?'Above average':cps>=4.5?'Average':'Warming up';
  $('out').className='ok';
  $('out').textContent=clicks+' clicks in '+dur+' s = '+cps.toFixed(2)+' CPS · '+rating+(isBest&&clicks?' · New personal best!':'');
  pad.textContent='Done! Click to try again'; pad.className='test-pad is-done';
  lockUntil=performance.now()+900;
  ${toolComplete}
}
function tick(){
  const el=(performance.now()-t0)/1000, left=Math.max(0,dur-el);
  $('left').textContent=left.toFixed(1);
  $('cps').textContent=el>0.25?(clicks/el).toFixed(1):'…';
  if(left<=0) return finish();
  raf=requestAnimationFrame(tick);
}
pad.addEventListener('pointerdown',e=>{
  e.preventDefault();
  const now=performance.now();
  if(state==='done'){ if(now<lockUntil) return; reset(); $('out').textContent=''; return; }
  if(state==='idle'){ state='running'; t0=now; clicks=0; dur=dsel(); pad.className='test-pad is-running'; pad.textContent='Click! Click! Click!'; raf=requestAnimationFrame(tick); }
  clicks++; $('clicks').textContent=clicks;
});
document.querySelectorAll('input[name=dur]').forEach(r=>r.addEventListener('change',()=>{ reset(); $('out').textContent=''; }));
reset();
})();
</script>`,
    },
    {
      path: "/reaction-time-test.html",
      file: "reaction-time-test.html",
      category: "tests",
      title: "Reaction Time Test — How Fast Are Your Reflexes? (ms)",
      desc: "Free reaction time test: click when the box turns green and see your reaction speed in milliseconds. Five-try average, best score, and how you compare.",
      card: "Reaction time test",
      cardDesc: "Reflex speed in milliseconds.",
      body: `<h1>Reaction time test</h1>${ad}
<div class="tool-panel" data-no-live>
<button type="button" class="test-pad react-pad" id="pad"><span class="pad-big" id="padTitle">Click to start</span><span class="pad-small" id="padSub">When the box turns green, click as fast as you can.</span></button>
<div class="stats">
<div class="stat"><strong id="last">—</strong>Last (ms)</div>
<div class="stat"><strong id="avg">—</strong>Average (ms)</div>
<div class="stat"><strong id="best">—</strong>Best ever (ms)</div>
<div class="stat"><strong id="tries">0 / 5</strong>Attempts</div>
</div>
<p id="out" role="status" aria-live="polite"></p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const pad=$('pad');
let state='idle', t0=0, timer=0, times=[];
function set(cls,title,sub){ pad.className='test-pad react-pad '+cls; $('padTitle').textContent=title; $('padSub').textContent=sub; }
function updateStats(){
  $('tries').textContent=times.length+' / 5';
  $('avg').textContent=times.length?Math.round(times.reduce((a,b)=>a+b,0)/times.length):'—';
  let best=null; try{ best=+localStorage.getItem('tools:react:best')||null; }catch(e){}
  const m=times.length?Math.min.apply(null,times):null;
  if(m&&(!best||m<best)){ best=m; try{ localStorage.setItem('tools:react:best',String(m)); }catch(e){} }
  $('best').textContent=best||'—';
}
function wait(){ state='waiting'; set('is-wait','Wait for green…','Do not click yet.'); timer=setTimeout(()=>{ state='go'; t0=performance.now(); set('is-go','CLICK!',''); },1200+Math.random()*3300); }
function press(){
  if(state==='idle'||state==='result'){ if(times.length>=5){ times=[]; updateStats(); $('out').textContent=''; } wait(); return; }
  if(state==='waiting'){ clearTimeout(timer); state='result'; set('is-early','Too soon!','Click to try again.'); return; }
  if(state==='go'){
    const ms=Math.round(performance.now()-t0); times.push(ms); state='result';
    set('is-result',ms+' ms',times.length<5?'Click to keep going.':'Click to start a new round.');
    $('last').textContent=ms; updateStats();
    if(times.length===5){
      const avg=Math.round(times.reduce((a,b)=>a+b,0)/5);
      const r=avg<200?'Exceptional reflexes':avg<250?'Faster than most people':avg<300?'About average':avg<400?'A little slow—try again':'Slow—check for input lag';
      $('out').className='ok'; $('out').textContent='Average of 5: '+avg+' ms · '+r;
      ${toolComplete}
    }
  }
}
pad.addEventListener('pointerdown',e=>{ e.preventDefault(); press(); });
pad.addEventListener('keydown',e=>{ if(e.key===' '||e.key==='Enter'){ e.preventDefault(); if(!e.repeat) press(); } });
updateStats();
})();
</script>`,
    },
    {
      path: "/keyboard-tester.html",
      file: "keyboard-tester.html",
      category: "tests",
      title: "Keyboard Tester — Test Every Key Online (Keyboard Test)",
      desc: "Free online keyboard tester. Press keys to check they work: keys light up while held and stay marked once tested. Shows event key, code and keyCode.",
      card: "Keyboard tester",
      cardDesc: "Check every key works.",
      body: `<h1>Keyboard tester</h1>${ad}
<div class="tool-panel" data-no-live>
<p class="tool-hint">Press any key. Keys turn purple while held and stay green once tested. Nothing you type is sent anywhere.</p>
<div class="stats">
<div class="stat"><strong id="key">—</strong>event.key</div>
<div class="stat"><strong id="code">—</strong>event.code</div>
<div class="stat"><strong id="which">—</strong>keyCode</div>
<div class="stat"><strong id="tested">0</strong>Keys tested</div>
</div>
<div class="kb" id="kb" aria-hidden="true"></div>
<div class="row"><button type="button" class="primary" id="reset">Reset test</button></div>
<p id="out" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const L=s=>s.split('').map(c=>['Key'+c,c]);
const D=s=>s.split('').map(c=>['Digit'+c,c]);
const F=[]; for(let i=1;i<=12;i++){ F.push(['F'+i,'F'+i]); if(i%4===0&&i<12) F.push(0); }
const rows=[
  [['Escape','Esc'],0].concat(F),
  [['Backquote',String.fromCharCode(96)]].concat(D('1234567890'),[['Minus','-'],['Equal','='],['Backspace','Backspace',2]]),
  [['Tab','Tab',1.5]].concat(L('QWERTYUIOP'),[['BracketLeft','['],['BracketRight',']'],['Backslash',String.fromCharCode(92),1.5]]),
  [['CapsLock','Caps',1.8]].concat(L('ASDFGHJKL'),[['Semicolon',';'],['Quote',"'"],['Enter','Enter',2.2]]),
  [['ShiftLeft','Shift',2.3]].concat(L('ZXCVBNM'),[['Comma',','],['Period','.'],['Slash','/'],['ShiftRight','Shift',2.7]]),
  [['ControlLeft','Ctrl',1.4],['MetaLeft','Win',1.3],['AltLeft','Alt',1.3],['Space','Space',6.4],['AltRight','Alt',1.3],['MetaRight','Win',1.3],['ContextMenu','Menu',1.3],['ControlRight','Ctrl',1.4]],
  [['Insert','Ins'],['Home','Home'],['PageUp','PgUp'],['Delete','Del'],['End','End'],['PageDown','PgDn'],0,['ArrowLeft','←'],['ArrowUp','↑'],['ArrowDown','↓'],['ArrowRight','→']]
];
const kb=$('kb'), map={}, tested=new Set();
rows.forEach(r=>{ const row=document.createElement('div'); row.className='kb-row'; r.forEach(k=>{ const el=document.createElement('div'); if(!k){ el.className='kb-gap'; } else { el.className='kb-key'; el.textContent=k[1]; el.style.flexGrow=k[2]||1; map[k[0]]=el; } row.appendChild(el); }); kb.appendChild(row); });
const PREVENT=/^(Tab|Space|Backspace|Quote|Slash|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|PageUp|PageDown|Home|End|F[0-9]+|AltLeft|AltRight|ContextMenu)$/;
function editable(t){ return t&&t.closest&&t.closest('input,textarea,select,[contenteditable]'); }
document.addEventListener('keydown',e=>{
  if(editable(e.target)) return;
  if(PREVENT.test(e.code)) e.preventDefault();
  $('key').textContent=e.key===' '?'Space':e.key; $('code').textContent=e.code||'—'; $('which').textContent=e.keyCode||'—';
  const el=map[e.code];
  if(el) el.classList.add('is-down','is-tested');
  $('out').textContent=el||!e.code?'':'Detected '+e.code+' (not drawn on this layout).';
  if(e.code&&!tested.has(e.code)){ tested.add(e.code); $('tested').textContent=tested.size; if(tested.size===1){ ${toolComplete} } }
},true);
document.addEventListener('keyup',e=>{ const el=map[e.code]; if(el) el.classList.remove('is-down'); if(e.code==='PrintScreen'){ tested.add(e.code); $('tested').textContent=tested.size; } },true);
window.addEventListener('blur',()=>kb.querySelectorAll('.is-down').forEach(k=>k.classList.remove('is-down')));
$('reset').onclick=()=>{ tested.clear(); kb.querySelectorAll('.kb-key').forEach(k=>k.classList.remove('is-down','is-tested')); ['key','code','which'].forEach(id=>$(id).textContent='—'); $('tested').textContent='0'; $('out').textContent=''; $('reset').blur(); };
})();
</script>`,
    },
    {
      path: "/webcam-test.html",
      file: "webcam-test.html",
      category: "tests",
      title: "Webcam Test — Check Your Camera Online (Resolution & FPS)",
      desc: "Free webcam test: check that your camera works and see its resolution, frame rate and megapixels. Switch cameras and take a snapshot. Video stays on your device.",
      card: "Webcam test",
      cardDesc: "Camera check, resolution, FPS.",
      body: `<h1>Webcam test</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="media-stage"><video id="video" playsinline muted autoplay></video><p class="media-placeholder" id="ph">Your camera preview appears here</p></div>
<div class="row">
<button type="button" class="primary" id="go">Test my webcam</button>
<button type="button" class="primary" id="snap" disabled>Take snapshot</button>
<button type="button" class="primary" id="stop" disabled>Stop camera</button>
</div>
<label for="cam">Camera</label><select id="cam" disabled><option>Allow camera access to list devices</option></select>
<label><input type="checkbox" id="mirror" checked /> Mirror preview</label>
<p id="out" class="tool-feedback" role="status" aria-live="polite"></p>
<div class="stats" id="stats" hidden>
<div class="stat"><strong id="res">—</strong>Resolution</div>
<div class="stat"><strong id="fps">—</strong>Frame rate</div>
<div class="stat"><strong id="ar">—</strong>Aspect ratio</div>
<div class="stat"><strong id="mp">—</strong>Megapixels</div>
</div>
<div id="shots" class="shots"></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const video=$('video'), out=$('out');
let stream=null, rafId=0;
const hasRvfc='requestVideoFrameCallback' in HTMLVideoElement.prototype;
function msg(t,c){ out.className=c||'tool-feedback'; out.textContent=t; }
function gcd(a,b){ return b?gcd(b,a%b):a; }
async function listCams(selected){
  const devs=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='videoinput');
  const sel=$('cam'); sel.innerHTML='';
  devs.forEach((d,i)=>{ const o=document.createElement('option'); o.value=d.deviceId; o.textContent=d.label||('Camera '+(i+1)); if(d.deviceId===selected) o.selected=true; sel.appendChild(o); });
  sel.disabled=!devs.length;
}
function stop(){ if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; } cancelAnimationFrame(rafId); video.srcObject=null; $('ph').hidden=false; $('snap').disabled=true; $('stop').disabled=true; }
function measureFps(){
  let frames=0, t0=performance.now();
  const step=()=>{ if(!stream) return; frames++; const el=performance.now()-t0; if(el>=1000){ $('fps').textContent=Math.round(frames*1000/el)+' fps'; frames=0; t0=performance.now(); } video.requestVideoFrameCallback(step); };
  if(hasRvfc) video.requestVideoFrameCallback(step);
}
function showInfo(){
  const w=video.videoWidth, h=video.videoHeight; if(!w) return;
  const g=gcd(w,h), track=stream.getVideoTracks()[0], s=track.getSettings();
  $('res').textContent=w+' × '+h; $('ar').textContent=(w/g)+':'+(h/g); $('mp').textContent=(w*h/1e6).toFixed(2)+' MP';
  if(!hasRvfc) $('fps').textContent=s.frameRate?Math.round(s.frameRate)+' fps':'—';
  $('stats').hidden=false;
  msg('Your webcam is working'+(track.label?': '+track.label:'')+'.','ok');
  ${toolComplete}
}
async function start(deviceId){
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ msg('This browser cannot access cameras. Use a recent Chrome, Edge, Firefox or Safari over HTTPS.','error'); return; }
  stop(); msg('Requesting camera permission…');
  const size={width:{ideal:1920},height:{ideal:1080}};
  try{
    stream=await navigator.mediaDevices.getUserMedia({video:deviceId?Object.assign({deviceId:{exact:deviceId}},size):size,audio:false});
    video.srcObject=stream; $('ph').hidden=true;
    if(video.readyState<1) await new Promise(r=>video.addEventListener('loadedmetadata',r,{once:true}));
    await video.play().catch(()=>{});
    showInfo(); measureFps();
    $('snap').disabled=false; $('stop').disabled=false;
    await listCams(stream.getVideoTracks()[0].getSettings().deviceId);
  }catch(err){
    stop();
    const n=err&&err.name;
    msg(n==='NotAllowedError'?'Camera permission was blocked. Click the camera icon in the address bar, allow access, then try again.':n==='NotFoundError'||n==='OverconstrainedError'?'No camera was found. Check that a webcam is connected and enabled.':n==='NotReadableError'?'The camera is in use by another app (Zoom, Teams, etc.). Close it and try again.':'Could not start the camera: '+((err&&err.message)||n),'error');
  }
}
$('go').onclick=()=>start();
$('stop').onclick=()=>{ stop(); $('stats').hidden=true; msg('Camera stopped.'); };
$('cam').onchange=()=>start($('cam').value);
$('mirror').onchange=()=>video.classList.toggle('is-mirrored',$('mirror').checked);
video.classList.add('is-mirrored');
$('snap').onclick=()=>{
  if(!video.videoWidth) return;
  const c=document.createElement('canvas'); c.width=video.videoWidth; c.height=video.videoHeight;
  const x=c.getContext('2d'); if($('mirror').checked){ x.translate(c.width,0); x.scale(-1,1); } x.drawImage(video,0,0);
  c.toBlob(b=>{ if(!b) return; const url=URL.createObjectURL(b); const a=document.createElement('a'); a.href=url; a.download='webcam-snapshot.png'; a.className='shot'; a.title='Download snapshot'; const img=new Image(); img.src=url; img.alt='Webcam snapshot'; a.appendChild(img); $('shots').prepend(a); },'image/png');
};
window.addEventListener('pagehide',stop);
})();
</script>`,
    },
    {
      path: "/mic-test.html",
      file: "mic-test.html",
      category: "tests",
      title: "Mic Test — Check Your Microphone Online with Live Level Meter",
      desc: "Free online mic test: see a live input level and waveform, pick a microphone, and record a 5-second clip to hear yourself. Audio never leaves your device.",
      card: "Mic test",
      cardDesc: "Microphone check with level meter.",
      body: `<h1>Mic test</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="row">
<button type="button" class="primary" id="go">Test my microphone</button>
<button type="button" class="primary" id="rec" disabled>Record 5 seconds</button>
<button type="button" class="primary" id="stop" disabled>Stop</button>
</div>
<label for="mic">Microphone</label><select id="mic" disabled><option>Allow microphone access to list devices</option></select>
<div class="level" aria-hidden="true"><span class="level-fill" id="fill"></span><span class="level-peak" id="peak"></span></div>
<canvas id="wave" class="wave" width="800" height="120" aria-hidden="true"></canvas>
<p id="out" class="tool-feedback" role="status" aria-live="polite"></p>
<div class="stats" id="stats" hidden>
<div class="stat"><strong id="lvl">—</strong>Level (dBFS)</div>
<div class="stat"><strong id="pk">—</strong>Peak (dBFS)</div>
<div class="stat"><strong id="sr">—</strong>Sample rate</div>
<div class="stat"><strong id="ch">—</strong>Channels</div>
</div>
<audio id="play" controls hidden></audio>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const out=$('out');
let stream=null, ctx=null, an=null, raf=0, peak=-100, heard=false, rec=null, silentT=0;
function msg(t,c){ out.className=c||'tool-feedback'; out.textContent=t; }
function stop(){ cancelAnimationFrame(raf); clearTimeout(silentT); if(rec&&rec.state==='recording') rec.stop(); if(stream) stream.getTracks().forEach(t=>t.stop()); stream=null; if(ctx){ ctx.close().catch(()=>{}); ctx=null; } $('rec').disabled=true; $('stop').disabled=true; $('fill').style.width='0%'; }
async function listMics(id){ const devs=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='audioinput'); const s=$('mic'); s.innerHTML=''; devs.forEach((d,i)=>{ const o=document.createElement('option'); o.value=d.deviceId; o.textContent=d.label||('Microphone '+(i+1)); if(d.deviceId===id) o.selected=true; s.appendChild(o); }); s.disabled=!devs.length; }
function loop(){
  const buf=new Float32Array(an.fftSize); an.getFloatTimeDomainData(buf);
  let sum=0, mx=0; for(let i=0;i<buf.length;i++){ const v=buf[i]; sum+=v*v; const a=Math.abs(v); if(a>mx) mx=a; }
  const rms=Math.sqrt(sum/buf.length), db=rms>0?20*Math.log10(rms):-100, pdb=mx>0?20*Math.log10(mx):-100;
  peak=Math.max(peak-0.4,pdb);
  $('fill').style.width=Math.max(0,Math.min(100,(db+60)/60*100))+'%';
  $('peak').style.left=Math.max(0,Math.min(100,(peak+60)/60*100))+'%';
  $('lvl').textContent=db<=-99?'silent':db.toFixed(0); $('pk').textContent=peak<=-99?'—':peak.toFixed(0);
  if(!heard&&db>-50){ heard=true; clearTimeout(silentT); msg('Your microphone is working — we can hear you.','ok'); ${toolComplete} }
  const cv=$('wave'), g=cv.getContext('2d'); g.clearRect(0,0,cv.width,cv.height); g.strokeStyle='#720e9e'; g.lineWidth=2; g.beginPath();
  const step=buf.length/cv.width; for(let x=0;x<cv.width;x++){ const y=cv.height/2+buf[Math.floor(x*step)]*cv.height*0.47; if(x) g.lineTo(x,y); else g.moveTo(x,y); } g.stroke();
  raf=requestAnimationFrame(loop);
}
async function start(id){
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ msg('This browser cannot access microphones. Use a recent browser over HTTPS.','error'); return; }
  stop(); heard=false; peak=-100; msg('Requesting microphone permission…');
  const opts={echoCancellation:false,noiseSuppression:false,autoGainControl:false};
  try{
    stream=await navigator.mediaDevices.getUserMedia({audio:id?Object.assign({deviceId:{exact:id}},opts):opts});
    ctx=new (window.AudioContext||window.webkitAudioContext)(); await ctx.resume();
    const src=ctx.createMediaStreamSource(stream); an=ctx.createAnalyser(); an.fftSize=2048; src.connect(an);
    const s=stream.getAudioTracks()[0].getSettings();
    $('sr').textContent=((s.sampleRate||ctx.sampleRate)/1000)+' kHz'; $('ch').textContent=s.channelCount||'—';
    $('stats').hidden=false; $('rec').disabled=!window.MediaRecorder; $('stop').disabled=false;
    msg('Listening… say something.');
    loop();
    silentT=setTimeout(()=>{ if(stream&&!heard) msg('No sound detected yet. Check the microphone selected below, any mute switch, and your system input volume.','error'); },6000);
    await listMics(s.deviceId);
  }catch(err){
    stop(); const n=err&&err.name;
    msg(n==='NotAllowedError'?'Microphone permission was blocked. Click the icon in the address bar, allow the microphone, then try again.':n==='NotFoundError'?'No microphone was found. Plug one in or enable it in system settings.':n==='NotReadableError'?'The microphone is in use by another app. Close it and retry.':'Could not start the microphone: '+((err&&err.message)||n),'error');
  }
}
$('go').onclick=()=>start();
$('stop').onclick=()=>{ stop(); msg('Microphone stopped.'); };
$('mic').onchange=()=>start($('mic').value);
$('rec').onclick=()=>new Promise(resolve=>{
  if(!stream){ resolve(); return; }
  const chunks=[]; rec=new MediaRecorder(stream);
  rec.ondataavailable=e=>{ if(e.data.size) chunks.push(e.data); };
  rec.onstop=()=>{ const a=$('play'); if(a.src) URL.revokeObjectURL(a.src); a.src=URL.createObjectURL(new Blob(chunks,{type:rec.mimeType||'audio/webm'})); a.hidden=false; msg('Recording ready — press play to hear yourself.','ok'); resolve(); };
  rec.start(); msg('Recording 5 seconds…');
  setTimeout(()=>{ if(rec&&rec.state==='recording') rec.stop(); },5000);
});
window.addEventListener('pagehide',stop);
})();
</script>`,
    },
    {
      path: "/screen-resolution.html",
      file: "screen-resolution.html",
      category: "tests",
      title: "What Is My Screen Resolution? — Check Screen Size & Viewport",
      desc: "Instantly see your screen resolution, physical pixels, browser viewport size, device pixel ratio, colour depth and orientation. Updates live as you resize.",
      card: "Screen resolution",
      cardDesc: "Screen, viewport and pixel ratio.",
      body: `<h1>What is my screen resolution?</h1>${ad}
<div class="tool-panel" data-no-live>
<p class="big-answer" id="big">—</p>
<div class="stats">
<div class="stat"><strong id="scr">—</strong>Screen (CSS px)</div>
<div class="stat"><strong id="phys">—</strong>Physical pixels</div>
<div class="stat"><strong id="vp">—</strong>Browser viewport</div>
<div class="stat"><strong id="dpr">—</strong>Pixel ratio</div>
<div class="stat"><strong id="avail">—</strong>Available screen</div>
<div class="stat"><strong id="depth">—</strong>Colour depth</div>
<div class="stat"><strong id="orient">—</strong>Orientation</div>
<div class="stat"><strong id="touch">—</strong>Touch points</div>
</div>
<div class="row"><button type="button" class="primary" id="copy">Copy details</button></div>
<p class="tool-feedback">Resize the window or rotate your device—values update live.</p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
function gcd(a,b){ return b?gcd(b,a%b):a; }
let summary='';
function update(){
  const w=screen.width, h=screen.height, dpr=window.devicePixelRatio||1, g=gcd(w,h);
  const pw=Math.round(w*dpr), ph=Math.round(h*dpr);
  const ratio=(w/g)+':'+(h/g);
  $('big').textContent=pw+' × '+ph+(dpr!==1?' physical':'')+' · '+ratio;
  $('scr').textContent=w+' × '+h; $('phys').textContent=pw+' × '+ph;
  $('vp').textContent=window.innerWidth+' × '+window.innerHeight;
  $('dpr').textContent=(Math.round(dpr*100)/100)+'×';
  $('avail').textContent=screen.availWidth+' × '+screen.availHeight;
  $('depth').textContent=screen.colorDepth+'-bit';
  $('orient').textContent=screen.orientation&&screen.orientation.type?screen.orientation.type.replace('-primary','').replace('-secondary',' (flipped)'):(w>=h?'landscape':'portrait');
  $('touch').textContent=navigator.maxTouchPoints||0;
  summary='Screen: '+w+'x'+h+' CSS px ('+pw+'x'+ph+' physical, '+ratio+')\\nViewport: '+window.innerWidth+'x'+window.innerHeight+'\\nDevice pixel ratio: '+dpr+'\\nColour depth: '+screen.colorDepth+'-bit';
}
$('copy').onclick=async()=>{ await navigator.clipboard.writeText(summary); };
window.addEventListener('resize',update);
if(screen.orientation) screen.orientation.addEventListener('change',update);
update();
${toolComplete}
})();
</script>`,
    },
    {
      path: "/online-notepad.html",
      file: "online-notepad.html",
      category: "productivity",
      title: "Online Notepad — Free Notes That Save Automatically",
      desc: "Free online notepad that autosaves in your browser. Write notes, see word and character counts, copy or download as a .txt file. No login, nothing uploaded.",
      card: "Online notepad",
      cardDesc: "Autosaving notes in your browser.",
      body: `<h1>Online notepad</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="note">Your note (saved automatically in this browser)</label>
<textarea id="note" class="notepad" rows="16" placeholder="Start typing… your text is saved on this device as you type."></textarea>
<p class="note-bar"><span id="stat">0 words · 0 characters</span><span id="saved" aria-live="polite"></span></p>
<div class="row">
<button type="button" class="primary" id="dl">Download .txt</button>
<button type="button" class="primary" id="copy">Copy all</button>
<button type="button" class="primary" id="clear">Clear note</button>
</div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const KEY='tools:notepad', ta=$('note');
let t=0, used=false;
try{ ta.value=localStorage.getItem(KEY)||''; }catch(e){ $('saved').textContent='Storage is blocked—notes will not be saved.'; }
function stats(){ const s=ta.value; const words=(s.trim().match(/[^ \\n\\t]+/g)||[]).length; $('stat').textContent=words.toLocaleString()+' words · '+s.length.toLocaleString()+' characters'; }
function save(){ try{ localStorage.setItem(KEY,ta.value); $('saved').textContent='Saved '+new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); }catch(e){ $('saved').textContent='Could not save (storage full or blocked).'; } }
ta.addEventListener('input',()=>{ stats(); $('saved').textContent='Saving…'; clearTimeout(t); t=setTimeout(save,400); if(!used){ used=true; ${toolComplete} } });
window.addEventListener('storage',e=>{ if(e.key===KEY&&e.newValue!==ta.value){ ta.value=e.newValue||''; stats(); } });
$('dl').onclick=()=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([ta.value],{type:'text/plain;charset=utf-8'})); a.download='note-'+new Date().toISOString().slice(0,10)+'.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),3000); };
$('copy').onclick=async()=>{ if(ta.value) await navigator.clipboard.writeText(ta.value); };
$('clear').onclick=()=>{ if(!ta.value||confirm('Clear this note? This cannot be undone.')){ ta.value=''; save(); stats(); ta.focus(); } };
stats();
})();
</script>`,
    },
    {
      path: "/fancy-text-generator.html",
      file: "fancy-text-generator.html",
      category: "writing",
      title: "Fancy Text Generator — Cool Fonts to Copy & Paste (𝐁𝐨𝐥𝐝, 𝓈𝒸𝓇𝒾𝓅𝓉)",
      desc: "Free fancy text generator: turn text into bold, italic, script, bubble, small caps and more Unicode fonts to copy and paste into Instagram, WhatsApp and bios.",
      card: "Fancy text generator",
      cardDesc: "Cool fonts to copy & paste.",
      body: `<h1>Fancy text generator</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="src">Type your text</label>
<input id="src" type="text" value="Fancy Text 123" maxlength="300" autocomplete="off" />
<div class="fancy-list" id="list"></div>
</div>
<script>
(function(){
const cp=String.fromCodePoint;
function math(A,a,d,ex){ ex=ex||{}; return s=>Array.from(s).map(ch=>{ if(ex[ch]) return cp(ex[ch]); const c=ch.codePointAt(0); if(c>=65&&c<=90&&A) return cp(A+c-65); if(c>=97&&c<=122&&a) return cp(a+c-97); if(c>=48&&c<=57&&d) return cp(d+c-48); return ch; }).join(''); }
function upperOnly(base){ return s=>Array.from(s.toUpperCase()).map(ch=>{ const c=ch.codePointAt(0); return c>=65&&c<=90?cp(base+c-65):ch; }).join(''); }
const smallCaps='ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ';
const flip={a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z','.':'˙',',':"'","'":',','?':'¿','!':'¡','(':')',')':'(','[':']',']':'[','<':'>','>':'<','_':'‾','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6','0':'0'};
const styles=[
  ['Bold',math(0x1D400,0x1D41A,0x1D7CE)],
  ['Italic',math(0x1D434,0x1D44E,0,{h:0x210E})],
  ['Bold italic',math(0x1D468,0x1D482,0)],
  ['Script',math(0x1D49C,0x1D4B6,0,{B:0x212C,E:0x2130,F:0x2131,H:0x210B,I:0x2110,L:0x2112,M:0x2133,R:0x211B,e:0x212F,g:0x210A,o:0x2134})],
  ['Bold script',math(0x1D4D0,0x1D4EA,0)],
  ['Gothic (Fraktur)',math(0x1D504,0x1D51E,0,{C:0x212D,H:0x210C,I:0x2111,R:0x211C,Z:0x2128})],
  ['Bold gothic',math(0x1D56C,0x1D586,0)],
  ['Double-struck',math(0x1D538,0x1D552,0x1D7D8,{C:0x2102,H:0x210D,N:0x2115,P:0x2119,Q:0x211A,R:0x211D,Z:0x2124})],
  ['Sans-serif',math(0x1D5A0,0x1D5BA,0x1D7E2)],
  ['Sans bold',math(0x1D5D4,0x1D5EE,0x1D7EC)],
  ['Sans italic',math(0x1D608,0x1D622,0)],
  ['Sans bold italic',math(0x1D63C,0x1D656,0)],
  ['Monospace',math(0x1D670,0x1D68A,0x1D7F6)],
  ['Bubble',s=>Array.from(s).map(ch=>{ const c=ch.codePointAt(0); if(c>=65&&c<=90) return cp(0x24B6+c-65); if(c>=97&&c<=122) return cp(0x24D0+c-97); if(c===48) return cp(0x24EA); if(c>=49&&c<=57) return cp(0x2460+c-49); return ch; }).join('')],
  ['Bubble dark',upperOnly(0x1F150)],
  ['Squares',upperOnly(0x1F130)],
  ['Squares dark',upperOnly(0x1F170)],
  ['Full width',s=>Array.from(s).map(ch=>{ const c=ch.codePointAt(0); return c===32?cp(0x3000):c>32&&c<127?cp(c+0xFEE0):ch; }).join('')],
  ['Small caps',s=>Array.from(s.toLowerCase()).map(ch=>{ const c=ch.codePointAt(0); return c>=97&&c<=122?smallCaps[c-97]:ch; }).join('')],
  ['Upside down',s=>Array.from(s.toLowerCase()).map(ch=>flip[ch]||ch).reverse().join('')],
  ['Strikethrough',s=>Array.from(s).map(ch=>ch===' '?ch:ch+cp(0x336)).join('')],
  ['Underline',s=>Array.from(s).map(ch=>ch+cp(0x332)).join('')],
  ['Spaced out',s=>Array.from(s).join(' ')]
];
const list=document.getElementById('list'), src=document.getElementById('src');
const rows=styles.map(st=>{ const row=document.createElement('div'); row.className='fancy-row'; row.innerHTML='<span class="fancy-name"></span><span class="fancy-out"></span><button type="button" class="copy-mini">Copy</button>'; row.querySelector('.fancy-name').textContent=st[0]; list.appendChild(row); return row; });
let used=false;
function render(){ const s=src.value||'Fancy Text'; styles.forEach((st,i)=>{ rows[i].querySelector('.fancy-out').textContent=st[1](s); }); }
list.addEventListener('click',async e=>{
  const b=e.target.closest('button'); if(!b) return;
  const text=b.parentElement.querySelector('.fancy-out').textContent;
  try{ await navigator.clipboard.writeText(text); b.textContent='Copied ✓'; b.classList.add('is-copied'); }
  catch(err){ const r=document.createRange(); r.selectNodeContents(b.parentElement.querySelector('.fancy-out')); const sel=getSelection(); sel.removeAllRanges(); sel.addRange(r); b.textContent='Press Ctrl+C'; }
  setTimeout(()=>{ b.textContent='Copy'; b.classList.remove('is-copied'); },1400);
  if(!used){ used=true; ${toolComplete} }
});
src.addEventListener('input',render);
render();
})();
</script>`,
    },
    {
      path: "/text-to-speech.html",
      file: "text-to-speech.html",
      category: "writing",
      title: "Text to Speech Online — Free Natural Voices, Read Aloud",
      desc: "Free text to speech: paste text and hear it read aloud with your device's voices. Choose voice and language, adjust speed and pitch, pause or stop anytime.",
      card: "Text to speech",
      cardDesc: "Read text aloud with natural voices.",
      body: `<h1>Text to speech</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="text">Text to read aloud</label>
<textarea id="text" rows="7">Welcome! Paste any text here and press Speak to hear it read aloud in your browser.</textarea>
<label for="voice">Voice</label><select id="voice"><option value="">Default voice</option></select>
<label for="rate">Speed</label><div class="range-row"><input id="rate" type="range" min="0.5" max="2" step="0.1" value="1" /><span id="rateV" class="range-val">1.0×</span></div>
<label for="pitch">Pitch</label><div class="range-row"><input id="pitch" type="range" min="0.5" max="2" step="0.1" value="1" /><span id="pitchV" class="range-val">1.0</span></div>
<div class="row">
<button type="button" class="primary" id="speak">Speak</button>
<button type="button" class="primary" id="pause">Pause</button>
<button type="button" class="primary" id="stop">Stop</button>
</div>
<p id="out" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const out=$('out');
function msg(t,c){ out.className=c||'tool-feedback'; out.textContent=t; }
if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance){ msg('Your browser does not support text to speech. Try Chrome, Edge or Safari.','error'); $('speak').disabled=true; return; }
const synth=window.speechSynthesis; let voices=[];
function loadVoices(){
  voices=synth.getVoices().slice().sort((a,b)=>(a.lang||'').localeCompare(b.lang||'')||a.name.localeCompare(b.name));
  const sel=$('voice'), prev=sel.value; sel.innerHTML='<option value="">Default voice</option>';
  voices.forEach((v,i)=>{ const o=document.createElement('option'); o.value=String(i); o.textContent=v.name+' ('+v.lang+')'; sel.appendChild(o); });
  if(prev&&voices[+prev]) sel.value=prev;
  else { const lang=(navigator.language||'en').toLowerCase(); const i=voices.findIndex(v=>(v.lang||'').toLowerCase()===lang); if(i>-1) sel.value=String(i); }
}
loadVoices();
if('onvoiceschanged' in synth) synth.onvoiceschanged=loadVoices;
$('rate').oninput=()=>{ $('rateV').textContent=(+$('rate').value).toFixed(1)+'×'; };
$('pitch').oninput=()=>{ $('pitchV').textContent=(+$('pitch').value).toFixed(1); };
function chunks(text){ const parts=text.match(/[^.!?।]+[.!?।]*/g)||[text]; const res=[]; let cur=''; parts.forEach(p=>{ if((cur+p).length>220&&cur){ res.push(cur); cur=p; } else cur+=p; }); if(cur.trim()) res.push(cur); return res; }
$('speak').onclick=()=>{
  const text=$('text').value.trim();
  if(!text){ msg('Type or paste some text first.','error'); return; }
  synth.cancel();
  const v=$('voice').value===''?null:voices[+$('voice').value];
  const parts=chunks(text);
  msg('Speaking…'); $('pause').textContent='Pause';
  parts.forEach((part,i)=>{
    const u=new SpeechSynthesisUtterance(part);
    if(v){ u.voice=v; u.lang=v.lang; }
    u.rate=+$('rate').value; u.pitch=+$('pitch').value;
    if(i===parts.length-1) u.onend=()=>msg('Finished.');
    u.onerror=e=>{ if(e.error!=='interrupted'&&e.error!=='canceled') msg('Speech error: '+e.error+'. Try another voice.','error'); };
    synth.speak(u);
  });
};
$('pause').onclick=()=>{ if(synth.paused){ synth.resume(); $('pause').textContent='Pause'; msg('Speaking…'); } else if(synth.speaking){ synth.pause(); $('pause').textContent='Resume'; msg('Paused.'); } };
$('stop').onclick=()=>{ synth.cancel(); $('pause').textContent='Pause'; msg('Stopped.'); };
window.addEventListener('pagehide',()=>synth.cancel());
})();
</script>`,
    },
    {
      path: "/image-cropper.html",
      file: "image-cropper.html",
      category: "documents",
      title: "Crop Image Online — Free Image Cropper (1:1, 16:9, 4:5)",
      desc: "Free online image cropper: crop JPG, PNG or WebP photos to square, 16:9, 4:5 Instagram or any size, then download at full quality. Images never leave your device.",
      card: "Crop image",
      cardDesc: "Crop photos to any ratio.",
      body: `<h1>Crop image</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="file">Choose an image (JPG, PNG, WebP or GIF)</label>
<input id="file" type="file" accept="image/*" />
<div class="crop-stage" id="stage" hidden>
<img id="img" alt="Image to crop" draggable="false" />
<div class="crop-box" id="box" tabindex="0" role="group" aria-label="Crop area. Drag to move, drag corners to resize, arrow keys to nudge."><span class="crop-h" data-h="nw"></span><span class="crop-h" data-h="ne"></span><span class="crop-h" data-h="sw"></span><span class="crop-h" data-h="se"></span></div>
</div>
<div id="controls" hidden>
<label for="ratio">Aspect ratio</label>
<select id="ratio"><option value="0">Free</option><option value="1">1:1 square</option><option value="1.333333">4:3</option><option value="1.777778">16:9</option><option value="1.5">3:2</option><option value="0.8">4:5 Instagram portrait</option><option value="0.5625">9:16 story / reel</option><option value="3">3:1 banner</option></select>
<label for="fmt">Save as</label>
<select id="fmt"><option value="image/png">PNG (lossless)</option><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option></select>
<p id="info" class="tool-feedback"></p>
<div class="row"><button type="button" class="primary" id="go">Download cropped image</button><button type="button" class="primary" id="resetCrop">Reset crop</button></div>
</div>
<p id="out" role="status" aria-live="polite"></p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const img=$('img'), box=$('box'), out=$('out');
let rect={x:0,y:0,w:1,h:1}, natW=0, natH=0, fileName='image', drag=null, objUrl='';
const ratio=()=>+$('ratio').value;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function apply(){
  box.style.left=rect.x*100+'%'; box.style.top=rect.y*100+'%'; box.style.width=rect.w*100+'%'; box.style.height=rect.h*100+'%';
  $('info').textContent='Crop: '+Math.round(rect.w*natW)+' × '+Math.round(rect.h*natH)+' px  (original '+natW+' × '+natH+')';
}
function fitRatio(){
  const r=ratio();
  if(!r){ rect={x:0.05,y:0.05,w:0.9,h:0.9}; apply(); return; }
  let w=natW, h=w/r; if(h>natH){ h=natH; w=h*r; }
  w*=0.9; h*=0.9;
  rect={x:(natW-w)/2/natW,y:(natH-h)/2/natH,w:w/natW,h:h/natH}; apply();
}
$('file').onchange=()=>{
  const f=$('file').files[0]; if(!f) return;
  if(!/^image[/]/.test(f.type)){ out.className='error'; out.textContent='Please choose an image file.'; return; }
  fileName=f.name.replace(/[.][^.]+$/,'')||'image';
  if(objUrl) URL.revokeObjectURL(objUrl);
  objUrl=URL.createObjectURL(f);
  img.onload=()=>{ natW=img.naturalWidth; natH=img.naturalHeight; $('stage').hidden=false; $('controls').hidden=false; out.textContent=''; out.className=''; fitRatio(); };
  img.onerror=()=>{ out.className='error'; out.textContent='This image could not be opened. Try a JPG or PNG.'; };
  img.src=objUrl;
};
function point(e){ const r=img.getBoundingClientRect(); return {x:clamp((e.clientX-r.left)/r.width,0,1),y:clamp((e.clientY-r.top)/r.height,0,1)}; }
box.addEventListener('pointerdown',e=>{ e.preventDefault(); box.setPointerCapture(e.pointerId); drag={mode:e.target.dataset.h||'move',start:point(e),rect:Object.assign({},rect)}; });
box.addEventListener('pointermove',e=>{
  if(!drag) return;
  const p=point(e), r0=drag.rect, m=drag.mode;
  if(m==='move'){
    rect.x=clamp(r0.x+p.x-drag.start.x,0,1-r0.w); rect.y=clamp(r0.y+p.y-drag.start.y,0,1-r0.h);
  } else {
    const west=m.includes('w'), north=m.includes('n');
    const ax=west?r0.x+r0.w:r0.x, ay=north?r0.y+r0.h:r0.y;
    const maxW=west?ax:1-ax, maxH=north?ay:1-ay;
    let w=clamp(west?ax-p.x:p.x-ax,0,maxW), h=clamp(north?ay-p.y:p.y-ay,0,maxH);
    const rr=ratio();
    if(rr){
      const hFromW=w*natW/rr/natH;
      if(hFromW>=h) h=hFromW; else w=h*natH*rr/natW;
      if(w>maxW){ w=maxW; h=w*natW/rr/natH; }
      if(h>maxH){ h=maxH; w=h*natH*rr/natW; }
    }
    w=Math.max(w,20/Math.max(1,img.clientWidth)); h=Math.max(h,20/Math.max(1,img.clientHeight));
    rect.w=Math.min(w,1); rect.h=Math.min(h,1);
    rect.x=clamp(west?ax-rect.w:ax,0,1-rect.w); rect.y=clamp(north?ay-rect.h:ay,0,1-rect.h);
  }
  apply();
});
['pointerup','pointercancel'].forEach(t=>box.addEventListener(t,()=>{ drag=null; }));
box.addEventListener('keydown',e=>{ const s=e.shiftKey?0.05:0.01; const d={ArrowLeft:[-s,0],ArrowRight:[s,0],ArrowUp:[0,-s],ArrowDown:[0,s]}[e.key]; if(!d) return; e.preventDefault(); rect.x=clamp(rect.x+d[0],0,1-rect.w); rect.y=clamp(rect.y+d[1],0,1-rect.h); apply(); });
$('ratio').onchange=fitRatio;
$('resetCrop').onclick=()=>{ if(ratio()) fitRatio(); else { rect={x:0,y:0,w:1,h:1}; apply(); } };
$('go').onclick=()=>new Promise(resolve=>{
  if(!natW){ resolve(); return; }
  const sx=Math.round(rect.x*natW), sy=Math.round(rect.y*natH), sw=Math.max(1,Math.min(natW-sx,Math.round(rect.w*natW))), sh=Math.max(1,Math.min(natH-sy,Math.round(rect.h*natH)));
  const c=document.createElement('canvas'); c.width=sw; c.height=sh; const g=c.getContext('2d');
  const type=$('fmt').value;
  if(type==='image/jpeg'){ g.fillStyle='#fff'; g.fillRect(0,0,sw,sh); }
  g.drawImage(img,sx,sy,sw,sh,0,0,sw,sh);
  c.toBlob(b=>{
    if(!b){ out.className='error'; out.textContent='Could not export this image.'; resolve(); return; }
    const ext=type==='image/jpeg'?'jpg':type.split('/')[1];
    const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=fileName+'-cropped.'+ext; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href),4000);
    out.className='ok'; out.textContent='Downloaded '+sw+' × '+sh+' px '+ext.toUpperCase()+' ('+Math.max(1,Math.round(b.size/1024))+' KB).';
    resolve();
  },type,0.92);
});
window.addEventListener('resize',()=>{ if(natW) apply(); });
})();
</script>`,
    },
    {
      path: "/image-to-text.html",
      file: "image-to-text.html",
      category: "documents",
      title: "Image to Text Converter — Free OCR Online (JPG, PNG, Screenshot)",
      desc: "Free image to text converter (OCR). Extract text from photos, screenshots and scanned documents in English, Hindi and 12 more languages—processed in your browser.",
      card: "Image to text (OCR)",
      cardDesc: "Extract text from images.",
      body: `<h1>Image to text (OCR)</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="file">Choose an image or screenshot (or paste one with Ctrl+V)</label>
<input id="file" type="file" accept="image/*" />
<label for="lang">Text language</label>
<select id="lang"><option value="eng" selected>English</option><option value="hin">Hindi</option><option value="eng+hin">English + Hindi</option><option value="ben">Bengali</option><option value="mar">Marathi</option><option value="tam">Tamil</option><option value="tel">Telugu</option><option value="guj">Gujarati</option><option value="spa">Spanish</option><option value="fra">French</option><option value="deu">German</option><option value="por">Portuguese</option><option value="ara">Arabic</option><option value="chi_sim">Chinese (Simplified)</option><option value="jpn">Japanese</option></select>
<img id="preview" class="ocr-preview" alt="Selected image" hidden />
<button type="button" class="primary" id="go" disabled>Extract text</button>
<div class="progress" id="prog" hidden><span id="bar"></span></div>
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<label for="out">Extracted text</label>
<textarea id="out" rows="10" readonly placeholder="Recognised text appears here"></textarea>
<div class="row"><button type="button" class="primary" id="copy">Copy text</button><button type="button" class="primary" id="dl">Download .txt</button></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const st=$('status');
let current=null, worker=null, workerLang='', libPromise=null;
function msg(t,c){ st.className=c||'tool-feedback'; st.textContent=t; }
function loadLib(){
  if(window.Tesseract) return Promise.resolve(window.Tesseract);
  libPromise=libPromise||new Promise((res,rej)=>{ const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js'; s.onload=()=>res(window.Tesseract); s.onerror=()=>{ libPromise=null; rej(new Error('Could not load the OCR engine. Check your connection and try again.')); }; document.head.appendChild(s); });
  return libPromise;
}
function setFile(f){
  if(!f||!/^image[/]/.test(f.type)){ msg('Please choose an image file (JPG, PNG, WebP, BMP or GIF).','error'); return; }
  current=f; const p=$('preview'); if(p.src) URL.revokeObjectURL(p.src); p.src=URL.createObjectURL(f); p.hidden=false;
  $('go').disabled=false; msg('Image ready—press Extract text.');
}
$('file').onchange=()=>setFile($('file').files[0]);
document.addEventListener('paste',e=>{
  const items=Array.from((e.clipboardData&&e.clipboardData.items)||[]);
  const item=items.find(i=>i.type.indexOf('image/')===0); if(!item) return;
  const f=item.getAsFile(); if(!f) return;
  try{ const dt=new DataTransfer(); dt.items.add(f); $('file').files=dt.files; }catch(err){}
  setFile(f);
});
$('go').onclick=async()=>{
  if(!current){ msg('Choose an image first.','error'); return; }
  const lang=$('lang').value; $('prog').hidden=false; $('bar').style.width='3%';
  try{
    msg('Loading OCR engine (first run downloads a few MB)…');
    const T=await loadLib();
    if(!worker||workerLang!==lang){
      if(worker){ await worker.terminate(); worker=null; }
      worker=await T.createWorker(lang,1,{logger:m=>{ if(m.status) msg(m.status.charAt(0).toUpperCase()+m.status.slice(1)+'…'); if(typeof m.progress==='number') $('bar').style.width=Math.max(3,Math.round(m.progress*100))+'%'; }});
      workerLang=lang;
    }
    msg('Reading text…');
    const r=await worker.recognize(current);
    const text=(r.data.text||'').trim();
    $('out').value=text; $('bar').style.width='100%';
    if(text) msg('Done—'+text.split(/\\s+/).filter(Boolean).length+' words found (confidence '+Math.round(r.data.confidence)+'%).','ok');
    else msg('No text found. Try a sharper, higher-contrast image or another language.','error');
  }catch(err){
    msg((err&&err.message)||'OCR failed. Try a smaller image.','error');
    if(worker){ worker.terminate().catch(()=>{}); worker=null; workerLang=''; }
  }finally{ setTimeout(()=>{ $('prog').hidden=true; },600); }
};
$('copy').onclick=async()=>{ if($('out').value) await navigator.clipboard.writeText($('out').value); };
$('dl').onclick=()=>{ const t=$('out').value; if(!t) return; const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([t],{type:'text/plain;charset=utf-8'})); a.download='extracted-text.txt'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),3000); };
window.addEventListener('pagehide',()=>{ if(worker) worker.terminate(); });
})();
</script>`,
    },
    {
      path: "/qr-code-scanner.html",
      file: "qr-code-scanner.html",
      category: "documents",
      title: "QR Code Scanner Online — Scan with Camera or Upload Image",
      desc: "Free online QR code scanner. Scan a QR code with your phone or laptop camera, or upload a screenshot or photo to decode it. Works in the browser, nothing uploaded.",
      card: "QR code scanner",
      cardDesc: "Scan QR codes by camera or image.",
      body: `<h1>QR code scanner</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="row"><button type="button" class="primary" id="cam">Scan with camera</button><button type="button" class="primary" id="stop" disabled>Stop camera</button></div>
<div class="media-stage" id="stage" hidden><video id="video" playsinline muted></video><span class="scan-frame" aria-hidden="true"></span></div>
<label for="file">Or upload a QR code image or screenshot</label>
<input id="file" type="file" accept="image/*" />
<p id="status" class="tool-feedback" role="status" aria-live="polite"></p>
<label for="out">Decoded content</label>
<textarea id="out" rows="4" readonly placeholder="The QR code content appears here"></textarea>
<div class="row"><button type="button" class="primary" id="copy">Copy result</button><a class="btn-link" id="open" href="#" target="_blank" rel="noopener noreferrer nofollow" hidden>Open link ↗</a></div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const st=$('status'), video=$('video');
let stream=null, raf=0, detector=null, jsqrP=null, busy=false;
function msg(t,c){ st.className=c||'tool-feedback'; st.textContent=t; }
if('BarcodeDetector' in window){ try{ detector=new BarcodeDetector({formats:['qr_code']}); }catch(e){ detector=null; } }
function loadJsQR(){
  if(window.jsQR) return Promise.resolve(window.jsQR);
  jsqrP=jsqrP||new Promise((res,rej)=>{ const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js'; s.onload=()=>res(window.jsQR); s.onerror=()=>{ jsqrP=null; rej(new Error('Could not load the QR decoder. Check your connection.')); }; document.head.appendChild(s); });
  return jsqrP;
}
const canvas=document.createElement('canvas'), g=canvas.getContext('2d',{willReadFrequently:true});
async function decode(source,w,h,thorough){
  if(detector){ try{ const codes=await detector.detect(source); if(codes.length) return codes[0].rawValue; if(!thorough) return null; }catch(e){} }
  const jsQR=await loadJsQR();
  const scale=Math.min(1,1200/Math.max(w,h));
  canvas.width=Math.max(1,Math.round(w*scale)); canvas.height=Math.max(1,Math.round(h*scale));
  g.drawImage(source,0,0,canvas.width,canvas.height);
  const d=g.getImageData(0,0,canvas.width,canvas.height);
  const r=jsQR(d.data,d.width,d.height,{inversionAttempts:thorough?'attemptBoth':'dontInvert'});
  return r?r.data:null;
}
function show(text){
  $('out').value=text; msg('QR code found.','ok');
  const t=text.trim(), isUrl=/^https?:[/][/][^ ]+$/i.test(t), a=$('open');
  a.hidden=!isUrl; a.href=isUrl?t:'#';
  window.__toolCompleteFired=true; document.dispatchEvent(new CustomEvent('tool:complete'));
}
function stopCam(){ cancelAnimationFrame(raf); if(stream) stream.getTracks().forEach(t=>t.stop()); stream=null; video.srcObject=null; $('stage').hidden=true; $('stop').disabled=true; }
async function scanLoop(){
  if(!stream) return;
  if(!busy&&video.readyState>=2&&video.videoWidth){
    busy=true;
    try{ const t=await decode(video,video.videoWidth,video.videoHeight,false); busy=false; if(t){ show(t); stopCam(); return; } }
    catch(e){ busy=false; msg(e.message,'error'); stopCam(); return; }
  }
  raf=requestAnimationFrame(scanLoop);
}
async function startCam(){
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ msg('Camera access is not available in this browser. Upload an image instead.','error'); return; }
  stopCam(); msg('Requesting camera permission…');
  try{
    stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});
    video.srcObject=stream; $('stage').hidden=false; await video.play(); $('stop').disabled=false;
    msg('Point the camera at a QR code…'); scanLoop();
  }catch(err){ stopCam(); msg(err&&err.name==='NotAllowedError'?'Camera permission was blocked. Allow it from the address bar, or upload an image instead.':'Could not start the camera. Upload an image instead.','error'); }
}
$('cam').onclick=()=>{ startCam(); };
$('stop').onclick=()=>{ stopCam(); msg('Camera stopped.'); };
$('file').onchange=async()=>{
  const f=$('file').files[0]; if(!f) return;
  msg('Reading image…');
  try{
    const bmp=await createImageBitmap(f);
    const t=await decode(bmp,bmp.width,bmp.height,true);
    if(t) show(t); else msg('No QR code found in this image. Try a sharper photo or crop closer to the code.','error');
  }catch(e){ msg((e&&e.message)||'Could not read this image.','error'); }
};
$('copy').onclick=async()=>{ if($('out').value) await navigator.clipboard.writeText($('out').value); };
window.addEventListener('pagehide',stopCam);
})();
</script>`,
    },
    {
      path: "/color-contrast-checker.html",
      file: "color-contrast-checker.html",
      category: "design",
      title: "Color Contrast Checker — WCAG AA & AAA Contrast Ratio",
      desc: "Free WCAG color contrast checker. Enter text and background colours to get the contrast ratio and AA/AAA pass or fail for normal text, large text and UI elements.",
      card: "Color contrast checker",
      cardDesc: "WCAG AA/AAA contrast ratio.",
      body: `<h1>Color contrast checker</h1>${ad}
<div class="tool-panel" data-no-live>
<div class="contrast-inputs">
<div><label for="fgHex">Text colour</label><div class="input-group"><input id="fg" type="color" value="#1d1527" aria-label="Pick text colour" /><input id="fgHex" type="text" value="#1D1527" maxlength="7" spellcheck="false" autocomplete="off" /></div></div>
<div><label for="bgHex">Background colour</label><div class="input-group"><input id="bg" type="color" value="#ffffff" aria-label="Pick background colour" /><input id="bgHex" type="text" value="#FFFFFF" maxlength="7" spellcheck="false" autocomplete="off" /></div></div>
</div>
<button type="button" class="primary" id="swap">Swap colours</button>
<div class="contrast-preview" id="preview"><p class="cp-large">Large text sample (24px)</p><p class="cp-normal">Normal body text at 16px. The quick brown fox jumps over the lazy dog.</p><span class="cp-ui">Button</span></div>
<p class="big-answer" id="ratio">—</p>
<div class="stats">
<div class="stat"><strong id="aaN">—</strong>AA normal text (4.5:1)</div>
<div class="stat"><strong id="aaL">—</strong>AA large text (3:1)</div>
<div class="stat"><strong id="aaaN">—</strong>AAA normal text (7:1)</div>
<div class="stat"><strong id="aaaL">—</strong>AAA large text (4.5:1)</div>
<div class="stat"><strong id="ui">—</strong>UI components (3:1)</div>
</div>
<p id="out" class="tool-feedback" role="status" aria-live="polite"></p>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
let used=false;
function parse(s){ s=String(s).trim().replace(/^#/,''); if(/^[0-9a-f]{3}$/i.test(s)) s=s.split('').map(c=>c+c).join(''); return /^[0-9a-f]{6}$/i.test(s)?'#'+s.toUpperCase():null; }
function lum(hex){ const v=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(c=>c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4)); return 0.2126*v[0]+0.7152*v[1]+0.0722*v[2]; }
function badge(id,ok){ const el=$(id); el.textContent=ok?'Pass':'Fail'; el.className=ok?'pass':'fail'; }
function update(src){
  const fg=parse($('fgHex').value), bg=parse($('bgHex').value);
  $('fgHex').classList.toggle('is-invalid',!fg); $('bgHex').classList.toggle('is-invalid',!bg);
  if(!fg||!bg){ $('out').className='error'; $('out').textContent='Enter colours as hex, for example #333 or #1D1527.'; return; }
  $('out').className='tool-feedback'; $('out').textContent='';
  if(src!=='picker'){ $('fg').value=fg.toLowerCase(); $('bg').value=bg.toLowerCase(); }
  const L1=lum(fg), L2=lum(bg), r=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
  $('ratio').textContent=(Math.floor(r*100)/100).toFixed(2)+' : 1';
  badge('aaN',r>=4.5); badge('aaL',r>=3); badge('aaaN',r>=7); badge('aaaL',r>=4.5); badge('ui',r>=3);
  const p=$('preview'); p.style.color=fg; p.style.background=bg; p.querySelector('.cp-ui').style.borderColor=fg;
  if(src&&!used){ used=true; ${toolComplete} }
}
$('fg').addEventListener('input',()=>{ $('fgHex').value=$('fg').value.toUpperCase(); update('picker'); });
$('bg').addEventListener('input',()=>{ $('bgHex').value=$('bg').value.toUpperCase(); update('picker'); });
['fgHex','bgHex'].forEach(id=>{ $(id).addEventListener('input',()=>update('text')); $(id).addEventListener('keydown',e=>{ if(e.key==='Enter') e.preventDefault(); }); });
$('swap').onclick=()=>{ const a=$('fgHex').value; $('fgHex').value=$('bgHex').value; $('bgHex').value=a; update('swap'); };
update();
})();
</script>`,
    },
    {
      path: "/sukanya-samriddhi-calculator.html",
      file: "sukanya-samriddhi-calculator.html",
      category: "india",
      title: "Sukanya Samriddhi Yojana Calculator — SSY Maturity Amount",
      desc: "Free SSY calculator: enter yearly deposit, interest rate and your daughter's age to see Sukanya Samriddhi maturity value, interest earned and a year-wise table.",
      card: "Sukanya Samriddhi (SSY)",
      cardDesc: "SSY maturity & interest.",
      body: `<h1>Sukanya Samriddhi Yojana calculator</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="dep">Yearly deposit (₹250 to ₹1,50,000)</label><input id="dep" type="number" min="250" max="150000" step="500" inputmode="numeric" value="150000" />
<label for="rate">Interest rate (% per year)</label><input id="rate" type="number" min="1" max="15" step="0.1" inputmode="decimal" value="8.2" />
<label for="age">Girl's age at account opening (0–10 years)</label><input id="age" type="number" min="0" max="10" step="1" inputmode="numeric" value="2" />
<label for="year">Account opening year</label><input id="year" type="number" min="2015" max="2100" step="1" inputmode="numeric" />
<button type="button" class="primary" id="go">Calculate maturity</button>
<p id="out" role="status" aria-live="polite"></p>
<div class="stats">
<div class="stat"><strong id="inv">—</strong>Total deposited</div>
<div class="stat"><strong id="int">—</strong>Interest earned</div>
<div class="stat"><strong id="mat">—</strong>Maturity value</div>
<div class="stat"><strong id="my">—</strong>Maturity year</div>
</div>
<details class="schedule"><summary>Year-by-year balance</summary><div id="sched"></div></details>
</div>
<p class="prose" style="font-size:0.88rem">The SSY interest rate is notified by the Government of India every quarter (8.2% in recent quarters). Confirm the current rate with India Post or your bank.</p>
<script>
(function(){
const $=id=>document.getElementById(id);
const inr=x=>'₹'+Math.round(x).toLocaleString('en-IN');
$('year').value=new Date().getFullYear();
function calc(){
  const dep=+$('dep').value, rate=+$('rate').value, age=+$('age').value, y0=Math.round(+$('year').value)||new Date().getFullYear();
  const out=$('out');
  const bad=!(dep>=250&&dep<=150000)?'Yearly deposit must be between ₹250 and ₹1,50,000.':!(rate>0&&rate<=15)?'Enter an interest rate between 0 and 15%.':!(age>=0&&age<=10&&Number.isInteger(age))?'The account can be opened for a girl aged 0 to 10 years.':'';
  if(bad){ out.className='error'; out.textContent=bad; ['inv','int','mat','my'].forEach(id=>$(id).textContent='—'); $('sched').innerHTML=''; return; }
  const r=rate/100; let bal=0, invested=0, rows='';
  for(let y=1;y<=21;y++){
    const d=y<=15?dep:0; invested+=d;
    const interest=(bal+d)*r; bal+=d+interest;
    rows+='<tr><td>'+y+'</td><td>'+(y0+y-1)+'</td><td>'+(age+y)+'</td><td>'+inr(d)+'</td><td>'+inr(interest)+'</td><td>'+inr(bal)+'</td></tr>';
  }
  out.className='';
  out.textContent='Deposit '+inr(dep)+' a year for 15 years. The account matures after 21 years, when your daughter is about '+(age+21)+'.';
  $('inv').textContent=inr(invested); $('int').textContent=inr(bal-invested); $('mat').textContent=inr(bal); $('my').textContent=y0+21;
  $('sched').innerHTML='<table><thead><tr><th>Year</th><th>Calendar year</th><th>Girl’s age</th><th>Deposit</th><th>Interest</th><th>Balance</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
$('go').onclick=calc;
['dep','rate','age','year'].forEach(id=>$(id).addEventListener('input',()=>$('go').click()));
calc();
})();
</script>`,
    },
    {
      path: "/home-loan-prepayment-calculator.html",
      file: "home-loan-prepayment-calculator.html",
      category: "india",
      title: "Home Loan Prepayment Calculator — Interest Saved & New Tenure",
      desc: "Free home loan prepayment calculator: see how much interest a one-time or yearly part-payment saves, and whether reducing tenure or EMI is better for you.",
      card: "Home loan prepayment",
      cardDesc: "Interest saved by part-payment.",
      body: `<h1>Home loan prepayment calculator</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="p">Outstanding loan amount (₹)</label><input id="p" type="number" min="10000" step="10000" inputmode="numeric" value="3000000" />
<label for="r">Interest rate (% per year)</label><input id="r" type="number" min="1" max="20" step="0.05" inputmode="decimal" value="8.5" />
<label for="n">Remaining tenure (years)</label><input id="n" type="number" min="1" max="40" step="1" inputmode="numeric" value="20" />
<label for="pp">Prepayment amount (₹)</label><input id="pp" type="number" min="0" step="10000" inputmode="numeric" value="200000" />
<label for="freq">Prepayment frequency</label><select id="freq"><option value="once">One time</option><option value="year">Every year</option></select>
<label for="after">First prepayment after (months)</label><input id="after" type="number" min="1" max="480" step="1" inputmode="numeric" value="12" />
<div class="seg" role="radiogroup" aria-label="After prepayment">
<label><input type="radio" name="mode" value="tenure" checked /> Reduce tenure (keep EMI)</label>
<label><input type="radio" name="mode" value="emi" /> Reduce EMI (keep tenure)</label>
</div>
<button type="button" class="primary" id="go">Calculate savings</button>
<p id="out" role="status" aria-live="polite"></p>
<div class="stats">
<div class="stat"><strong id="emi">—</strong>Current EMI</div>
<div class="stat"><strong id="saved">—</strong>Interest saved</div>
<div class="stat"><strong id="newT">—</strong>New tenure</div>
<div class="stat"><strong id="newE">—</strong>New EMI</div>
<div class="stat"><strong id="i0">—</strong>Interest without prepayment</div>
<div class="stat"><strong id="i1">—</strong>Interest with prepayment</div>
</div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const inr=x=>'₹'+Math.round(x).toLocaleString('en-IN');
const emiOf=(P,i,n)=>i?P*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1):P/n;
const dur=m=>{ const y=Math.floor(m/12), mo=m%12; return ((y?y+' yr ':'')+(mo?mo+' mo':'')).trim()||'0 mo'; };
function simulate(P,i,n,pp,after,yearly,mode){
  let bal=P, emi=emiOf(P,i,n), interest=0, m=0, firstNewEmi=null;
  while(bal>0.5&&m<1200){
    m++;
    const int=bal*i; interest+=int;
    bal=bal+int-Math.min(emi,bal+int);
    const isPrepay=pp>0&&m>=after&&(yearly?(m-after)%12===0:m===after);
    if(isPrepay&&bal>0){
      bal=Math.max(0,bal-pp);
      if(mode==='emi'&&bal>0&&n-m>0){ emi=emiOf(bal,i,n-m); if(firstNewEmi===null) firstNewEmi=emi; }
    }
  }
  return {months:m,interest:interest,emi:firstNewEmi,lastEmi:emi};
}
function calc(){
  const P=+$('p').value, rate=+$('r').value, years=+$('n').value, pp=+$('pp').value||0, after=Math.round(+$('after').value), yearly=$('freq').value==='year';
  const mode=document.querySelector('input[name=mode]:checked').value, out=$('out');
  const n=Math.round(years*12), i=rate/100/12;
  const bad=!(P>0)?'Enter the outstanding loan amount.':!(rate>0&&rate<=20)?'Enter an interest rate between 0 and 20%.':!(n>=1&&n<=480)?'Enter a remaining tenure between 1 and 40 years.':pp<0?'Prepayment cannot be negative.':!(after>=1&&after<=n)?'The first prepayment must fall within the loan tenure.':'';
  if(bad){ out.className='error'; out.textContent=bad; ['emi','saved','newT','newE','i0','i1'].forEach(id=>$(id).textContent='—'); return; }
  const base=simulate(P,i,n,0,1,false,'tenure'), w=simulate(P,i,n,pp,after,yearly,mode);
  const emi=emiOf(P,i,n), saved=Math.max(0,base.interest-w.interest);
  $('emi').textContent=inr(emi); $('saved').textContent=inr(saved);
  $('i0').textContent=inr(base.interest); $('i1').textContent=inr(w.interest);
  $('newT').textContent=dur(w.months);
  $('newE').textContent=mode==='emi'&&w.emi?inr(w.emi)+(yearly&&Math.round(w.lastEmi)!==Math.round(w.emi)?' → '+inr(w.lastEmi):''):inr(emi);
  if(!(pp>0)){ out.className=''; out.textContent='Enter a prepayment amount to see how much interest you save.'; return; }
  out.className='ok';
  out.textContent='You save '+inr(saved)+' in interest'+(mode==='tenure'?' and close the loan '+dur(Math.max(0,base.months-w.months))+' early.':' and your EMI drops to '+inr(w.emi||emi)+'.');
}
$('go').onclick=calc;
['p','r','n','pp','freq','after'].forEach(id=>$(id).addEventListener('input',()=>$('go').click()));
document.querySelectorAll('input[name=mode]').forEach(r=>r.addEventListener('change',()=>$('go').click()));
calc();
})();
</script>`,
    },
    {
      path: "/xirr-calculator.html",
      file: "xirr-calculator.html",
      category: "india",
      title: "XIRR Calculator — Annualised Return for SIP & Irregular Cash Flows",
      desc: "Free XIRR calculator: enter investment dates and amounts to get the annualised return (XIRR) for SIPs, stocks and irregular cash flows, just like Excel's XIRR.",
      card: "XIRR calculator",
      cardDesc: "Annualised return for SIPs.",
      body: `<h1>XIRR calculator</h1>${ad}
<div class="tool-panel" data-no-live>
<p class="tool-hint">Enter each investment as a <strong>negative</strong> amount and each withdrawal or the current value as a <strong>positive</strong> amount.</p>
<table class="cf-table"><thead><tr><th>Date</th><th>Amount (₹)</th><th><span class="sr-only">Remove</span></th></tr></thead><tbody id="rows"></tbody></table>
<div class="row"><button type="button" class="primary" id="go">Calculate XIRR</button><button type="button" class="primary" id="add">Add row</button><button type="button" class="primary" id="sample">Load SIP example</button></div>
<p id="out" role="status" aria-live="polite"></p>
<div class="stats">
<div class="stat"><strong id="x">—</strong>XIRR (annualised)</div>
<div class="stat"><strong id="inv">—</strong>Total invested</div>
<div class="stat"><strong id="ret">—</strong>Total received / value</div>
<div class="stat"><strong id="gain">—</strong>Absolute gain</div>
</div>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const tbody=$('rows');
const inr=x=>'₹'+Math.round(x).toLocaleString('en-IN');
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
let t=0;
function addRow(date,amt){
  const tr=document.createElement('tr');
  tr.innerHTML='<td><input type="date" aria-label="Date" /></td><td><input type="number" step="any" inputmode="decimal" aria-label="Amount" /></td><td><button type="button" class="row-del" aria-label="Remove row">×</button></td>';
  tr.querySelector('input[type=date]').value=date||'';
  tr.querySelector('input[type=number]').value=amt==null?'':amt;
  tbody.appendChild(tr);
}
function sample(){
  tbody.innerHTML='';
  const now=new Date();
  for(let k=12;k>=1;k--) addRow(iso(new Date(now.getFullYear(),now.getMonth()-k,5)),-10000);
  addRow(iso(now),131500);
}
function xirr(flows){
  const t0=flows[0].t;
  const f=r=>flows.reduce((s,c)=>s+c.a/Math.pow(1+r,(c.t-t0)/365),0);
  const df=r=>flows.reduce((s,c)=>{ const y=(c.t-t0)/365; return s-y*c.a/Math.pow(1+r,y+1); },0);
  let r=0.1;
  for(let k=0;k<60;k++){
    const v=f(r), d=df(r);
    if(!Number.isFinite(v)||!Number.isFinite(d)||d===0) break;
    const nr=r-v/d;
    if(!Number.isFinite(nr)||nr<=-0.9999) break;
    if(Math.abs(nr-r)<1e-10) return nr;
    r=nr;
  }
  let lo=-0.9999, hi=10, flo=f(lo), fhi=f(hi);
  if(flo*fhi>0){ hi=1000; fhi=f(hi); if(flo*fhi>0) return NaN; }
  for(let k=0;k<400;k++){ const mid=(lo+hi)/2, fm=f(mid); if(Math.abs(fm)<1e-7) return mid; if(flo*fm<0){ hi=mid; } else { lo=mid; flo=fm; } }
  return (lo+hi)/2;
}
function calc(){
  const flows=[]; let bad='';
  tbody.querySelectorAll('tr').forEach((tr,i)=>{
    const d=tr.querySelector('input[type=date]').value, a=tr.querySelector('input[type=number]').value;
    if(!d&&a==='') return;
    if(!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(d)||a===''||!Number.isFinite(+a)){ bad=bad||'Row '+(i+1)+' needs both a date and an amount.'; return; }
    flows.push({t:Date.UTC(+d.slice(0,4),+d.slice(5,7)-1,+d.slice(8,10))/864e5,a:+a});
  });
  const out=$('out'), clear=()=>['x','inv','ret','gain'].forEach(id=>$(id).textContent='—');
  if(!bad&&flows.length<2) bad='Add at least two cash flows.';
  if(!bad&&!(flows.some(f=>f.a<0)&&flows.some(f=>f.a>0))) bad='You need at least one negative amount (investment) and one positive amount (value or withdrawal).';
  if(bad){ out.className='error'; out.textContent=bad; clear(); return; }
  flows.sort((a,b)=>a.t-b.t);
  if(flows[flows.length-1].t===flows[0].t){ out.className='error'; out.textContent='Cash flows must span more than one day.'; clear(); return; }
  const inv=-flows.filter(f=>f.a<0).reduce((s,f)=>s+f.a,0), ret=flows.filter(f=>f.a>0).reduce((s,f)=>s+f.a,0);
  $('inv').textContent=inr(inv); $('ret').textContent=inr(ret); $('gain').textContent=(ret<inv?'−':'')+inr(Math.abs(ret-inv));
  const r=xirr(flows);
  if(!Number.isFinite(r)){ out.className='error'; out.textContent='XIRR could not be solved for these cash flows. Check the signs and dates.'; $('x').textContent='—'; return; }
  $('x').textContent=(r*100).toFixed(2)+'%';
  out.className='ok'; out.textContent='Your money grew at an annualised '+(r*100).toFixed(2)+'% (XIRR) across '+flows.length+' cash flows.';
}
tbody.addEventListener('click',e=>{ const b=e.target.closest('.row-del'); if(!b) return; b.closest('tr').remove(); if(!tbody.children.length) addRow(); $('go').click(); });
tbody.addEventListener('input',()=>{ clearTimeout(t); t=setTimeout(()=>$('go').click(),300); });
$('go').onclick=calc;
$('add').onclick=()=>{ addRow(); tbody.lastElementChild.querySelector('input').focus(); };
$('sample').onclick=()=>{ sample(); calc(); };
sample(); calc();
})();
</script>`,
    },
    {
      path: "/time-zone-converter.html",
      file: "time-zone-converter.html",
      category: "productivity",
      title: "Time Zone Converter — IST, EST, PST, GMT & World Time",
      desc: "Free time zone converter: convert a date and time between IST, EST, PST, GMT and any world time zone, with automatic daylight saving and a saved comparison list.",
      card: "Time zone converter",
      cardDesc: "IST ↔ EST, PST, GMT & more.",
      body: `<h1>Time zone converter</h1>${ad}
<div class="tool-panel" data-no-live>
<label for="when">Date and time</label><input id="when" type="datetime-local" />
<label for="from">From time zone</label><select id="from"></select>
<label for="add">Compare with</label>
<div class="input-group"><select id="add"></select><button type="button" class="btn-small" id="addBtn">+ Add</button></div>
<div class="row"><button type="button" class="primary" id="go">Convert</button><button type="button" class="primary" id="now">Use current time</button></div>
<p id="out" role="status" aria-live="polite"></p>
<ul class="tz-list" id="list"></ul>
</div>
<script>
(function(){
const $=id=>document.getElementById(id);
const local=Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC';
let zones=[]; try{ zones=Intl.supportedValuesOf('timeZone').slice(); }catch(e){}
if(!zones.length) zones=['Asia/Kolkata','America/New_York','America/Chicago','America/Denver','America/Los_Angeles','Europe/London','Europe/Paris','Europe/Berlin','Asia/Dubai','Asia/Singapore','Asia/Tokyo','Asia/Shanghai','Australia/Sydney','Pacific/Auckland'];
if(!zones.includes('UTC')) zones.unshift('UTC');
if(!zones.includes(local)) zones.unshift(local);
const NEW_NAME={'Asia/Calcutta':'Asia/Kolkata','Asia/Saigon':'Asia/Ho_Chi_Minh','Asia/Katmandu':'Asia/Kathmandu','Asia/Rangoon':'Asia/Yangon','Europe/Kiev':'Europe/Kyiv','America/Buenos_Aires':'America/Argentina/Buenos_Aires'};
const OLD_NAME={}; Object.keys(NEW_NAME).forEach(k=>{ OLD_NAME[NEW_NAME[k]]=k; });
const norm=z=>zones.includes(z)?z:(zones.includes(NEW_NAME[z])?NEW_NAME[z]:(zones.includes(OLD_NAME[z])?OLD_NAME[z]:null));
function city(z){ const parts=(NEW_NAME[z]||z).split('/'); const c=parts[parts.length-1].replace(/_/g,' '); return parts.length>1?c+' ('+parts[0]+')':c; }
function zoneName(z,ms){ try{ const p=new Intl.DateTimeFormat('en-US',{timeZone:z,timeZoneName:'long'}).formatToParts(new Date(ms)).find(x=>x.type==='timeZoneName'); return p?p.value:''; }catch(e){ return ''; } }
const label=(z,ms)=>{ const n=zoneName(z,ms==null?Date.now():ms); return n&&n!==city(z)?city(z)+' — '+n:city(z); };
const POPULAR=['Asia/Kolkata','America/New_York','America/Chicago','America/Los_Angeles','Europe/London','Europe/Berlin','Asia/Dubai','Asia/Singapore','Asia/Tokyo','Australia/Sydney','UTC'].map(norm).filter(Boolean);
['from','add'].forEach(id=>{
  const s=$(id), now=Date.now();
  const mk=(parent,z)=>{ const o=document.createElement('option'); o.value=z; o.textContent=label(z,now); parent.appendChild(o); };
  const pop=document.createElement('optgroup'); pop.label='Popular'; POPULAR.forEach(z=>mk(pop,z)); s.appendChild(pop);
  const all=document.createElement('optgroup'); all.label='All time zones'; zones.forEach(z=>mk(all,z)); s.appendChild(all);
});
$('from').value=local;
const KEY='tools:tz';
let targets=null; try{ targets=JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){}
if(!Array.isArray(targets)||!targets.length) targets=['Asia/Kolkata','America/New_York','Europe/London','America/Los_Angeles','Asia/Tokyo'].map(norm).filter(z=>z&&z!==norm(local)).slice(0,4);
targets=[...new Set(targets.map(norm).filter(Boolean))];
$('add').value=norm('Europe/Berlin')||zones[0];
const pad=n=>String(n).padStart(2,'0');
function offsetMin(ms,tz){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).formatToParts(new Date(ms));
  const v={}; parts.forEach(p=>{ v[p.type]=p.value; });
  return Math.round((Date.UTC(+v.year,+v.month-1,+v.day,+v.hour%24,+v.minute)-Math.floor(ms/60000)*60000)/60000);
}
function zonedToUtc(str,tz){
  const d=str.split('T')[0].split('-').map(Number), t=(str.split('T')[1]||'00:00').split(':').map(Number);
  const guess=Date.UTC(d[0],d[1]-1,d[2],t[0],t[1]);
  const first=guess-offsetMin(guess,tz)*60000;
  return guess-offsetMin(first,tz)*60000;
}
function fmtOff(m){ const s=m<0?'−':'+'; m=Math.abs(m); return 'UTC'+s+pad(Math.floor(m/60))+':'+pad(m%60); }
function setNow(){ const ms=Math.floor(Date.now()/60000)*60000, w=new Date(ms+offsetMin(ms,$('from').value)*60000); $('when').value=w.getUTCFullYear()+'-'+pad(w.getUTCMonth()+1)+'-'+pad(w.getUTCDate())+'T'+pad(w.getUTCHours())+':'+pad(w.getUTCMinutes()); }
function save(){ try{ localStorage.setItem(KEY,JSON.stringify(targets)); }catch(e){} }
function render(){
  const v=$('when').value, from=$('from').value, out=$('out'), list=$('list');
  if(!/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/.test(v)){ out.className='error'; out.textContent='Pick a date and time.'; list.innerHTML=''; return; }
  const ms=zonedToUtc(v,from), fromOff=offsetMin(ms,from);
  out.className='';
  out.textContent=new Intl.DateTimeFormat(undefined,{timeZone:from,dateStyle:'full',timeStyle:'short'}).format(ms)+' — '+label(from,ms)+' ('+fmtOff(fromOff)+')';
  list.innerHTML='';
  if(!targets.length){ list.innerHTML='<li class="tz-empty">Add a time zone above to compare.</li>'; return; }
  targets.forEach((z,i)=>{
    const off=offsetMin(ms,z), diff=(off-fromOff)/60;
    const li=document.createElement('li'); li.className='tz-item';
    li.innerHTML='<div class="tz-main"><strong class="tz-time"></strong><span class="tz-day"></span></div><div class="tz-meta"><span class="tz-name"></span><span class="tz-off"></span></div><button type="button" class="row-del" aria-label="Remove time zone">×</button>';
    li.querySelector('.tz-time').textContent=new Intl.DateTimeFormat(undefined,{timeZone:z,hour:'numeric',minute:'2-digit'}).format(ms);
    li.querySelector('.tz-day').textContent=new Intl.DateTimeFormat(undefined,{timeZone:z,weekday:'short',day:'numeric',month:'short'}).format(ms);
    li.querySelector('.tz-name').textContent=city(z);
    li.querySelector('.tz-off').textContent=[zoneName(z,ms),fmtOff(off),diff===0?'same time':(diff>0?'+':'−')+Math.abs(diff)+' h'].filter(Boolean).join(' · ');
    li.querySelector('button').onclick=()=>{ targets.splice(i,1); save(); render(); };
    list.appendChild(li);
  });
}
$('addBtn').onclick=()=>{ const z=$('add').value; if(z&&!targets.includes(z)){ targets.push(z); save(); render(); } };
$('go').onclick=render;
$('now').onclick=()=>{ setNow(); render(); };
$('from').addEventListener('change',()=>$('go').click());
$('when').addEventListener('input',()=>$('go').click());
setNow(); render();
})();
</script>`,
    },
  ];
}
