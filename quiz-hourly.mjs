/** Hourly quiz selection (local clock hour) + client script for /quiz/. */

export function hourSlotKey(d = new Date()) {
  const y = d.getFullYear();
  const mo = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  return `${y}-${String(mo).padStart(2, "0")}-${String(day).padStart(2, "0")}T${String(h).padStart(2, "0")}`;
}

export function seedFromHourSlot(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function mulberry32(a) {
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Pick `count` distinct questions for the calendar hour of `d`. */
export function pickQuestions(bank, d = new Date(), count = 10) {
  const n = Math.min(count, bank.length);
  const rng = mulberry32(seedFromHourSlot(hourSlotKey(d)));
  const idx = bank.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, n).map((i) => bank[i]);
}

export function nextHourLocal(d = new Date()) {
  const t = new Date(d);
  t.setMinutes(0, 0, 0);
  t.setHours(t.getHours() + 1);
  return t;
}

export function generateQuizClientScript(bank) {
  const bankJson = JSON.stringify(bank);
  return `
const bankFull=${bankJson};
function hourSlotKey(d){
  const y=d.getFullYear(), mo=d.getMonth()+1, day=d.getDate(), h=d.getHours();
  return y+'-'+String(mo).padStart(2,'0')+'-'+String(day).padStart(2,'0')+'T'+String(h).padStart(2,'0');
}
function seedFromHourSlot(key){
  let h=2166136261;
  for(let i=0;i<key.length;i++) h=Math.imul(h^key.charCodeAt(i),16777619);
  return h>>>0;
}
function mulberry32(a){
  return function(){
    a|=0; a=(a+0x6d2b79f5)|0;
    let t=Math.imul(a^(a>>>15),1|a);
    t=(t+Math.imul(t^(t>>>7),61|t))^t;
    return ((t^(t>>>14))>>>0)/4294967296;
  };
}
function pickQuestions(bank,d,count){
  const n=Math.min(count,bank.length);
  const rng=mulberry32(seedFromHourSlot(hourSlotKey(d)));
  const idx=bank.map((_,i)=>i);
  for(let i=idx.length-1;i>0;i--){
    const j=Math.floor(rng()*(i+1));
    [idx[i],idx[j]]=[idx[j],idx[i]];
  }
  return idx.slice(0,n).map(i=>bank[i]);
}
function nextHourLocal(d){
  const t=new Date(d);
  t.setMinutes(0,0,0);
  t.setHours(t.getHours()+1);
  return t;
}
const quizStart=new Date();
const bank=pickQuestions(bankFull,quizStart,10);
let idx=0, correct=0, picked=null;
function quizMetaLine(){
  const next=nextHourLocal(quizStart);
  const timeStr=next.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
  return 'New questions at '+timeStr;
}
function render(){
  const item=bank[idx];
  document.getElementById('meta').textContent='Question '+(idx+1)+' of '+bank.length+' · '+quizMetaLine();
  document.getElementById('q').textContent=item.q;
  const box=document.getElementById('opts'); box.innerHTML='';
  item.o.forEach((text,i)=>{
    const b=document.createElement('button');
    b.type='button'; b.className='quiz-opt'; b.textContent=text;
    b.onclick=()=>{
      if(picked!==null) return;
      picked=i;
      const ok=i===item.c;
      if(ok) correct++;
      b.classList.add(ok?'is-correct':'is-wrong');
      if(!ok) box.children[item.c].classList.add('is-correct');
      [...box.children].forEach(x=>x.disabled=true);
      const score=document.getElementById('score');
      score.className=ok?'ok':'error';
      score.textContent=ok?'Correct!':'Wrong — correct: '+item.o[item.c];
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
    document.getElementById('meta').textContent='New quiz at the start of the next hour ('+nextHourLocal(new Date()).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})+').';
    return;
  }
  render();
};
render();
`.trim();
}
