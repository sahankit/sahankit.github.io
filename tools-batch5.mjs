/** Fifth batch of tools. */
export function batch5Tools(ad) {
  return [
    {
      path: "/morse-code.html",
      file: "morse-code.html",
      category: "writing",
      title: "Morse Code Translator — Text to Morse",
      desc: "Encode and decode Morse code for letters and numbers.",
      card: "Morse code",
      cardDesc: "Text ↔ Morse.",
      body: `
<h1>Morse code translator</h1>${ad}
<div class="tool-panel">
  <label for="text">Text</label><textarea id="text">SOS</textarea>
  <div class="row">
    <button type="button" class="primary" id="enc">To Morse</button>
    <button type="button" class="primary" id="dec">To text</button>
  </div>
  <textarea id="out" rows="4" readonly></textarea>
</div>
<script>
const M={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..','0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.'};
const R=Object.fromEntries(Object.entries(M).map(([k,v])=>[v,k]));
document.getElementById('enc').onclick=()=>{
  const s=document.getElementById('text').value.toUpperCase().split(/\\s+/).join(' ');
  document.getElementById('out').value=s.split('').map(c=>M[c]||(c===' '?'/':'')).filter(Boolean).join(' ');
};
document.getElementById('dec').onclick=()=>{
  const s=document.getElementById('text').value.trim().split(/\\s+/);
  document.getElementById('out').value=s.map(x=>x==='/'?' ':R[x]||'?').join('');
};
document.getElementById('enc').click();
</script>`,
    },
    {
      path: "/text-to-binary.html",
      file: "text-to-binary.html",
      category: "developer",
      title: "Text to Binary Converter — UTF-8 Bits",
      desc: "Convert text to binary and binary back to text.",
      card: "Text ↔ binary",
      cardDesc: "UTF-8 binary string.",
      body: `
<h1>Text to binary</h1>${ad}
<div class="tool-panel">
  <textarea id="text">Hi</textarea>
  <div class="row">
    <button type="button" class="primary" id="enc">To binary</button>
    <button type="button" class="primary" id="dec">To text</button>
  </div>
  <textarea id="out" rows="4" spellcheck="false"></textarea>
</div>
<script>
document.getElementById('enc').onclick=()=>{
  const bytes=new TextEncoder().encode(document.getElementById('text').value);
  document.getElementById('out').value=[...bytes].map(b=>b.toString(2).padStart(8,'0')).join(' ');
};
document.getElementById('dec').onclick=()=>{
  try{
    const bytes=Uint8Array.from(document.getElementById('out').value.trim().split(/\\s+/).map(b=>parseInt(b,2)));
    document.getElementById('text').value=new TextDecoder().decode(bytes);
  }catch(e){ alert('Invalid binary'); }
};
document.getElementById('enc').click();
</script>`,
    },
    {
      path: "/hex-encoder.html",
      file: "hex-encoder.html",
      category: "developer",
      title: "Text to Hex Converter — Hex Encode",
      desc: "Encode text to hexadecimal bytes and decode hex to text.",
      card: "Text ↔ hex",
      cardDesc: "UTF-8 hex bytes.",
      body: `
<h1>Text to hex</h1>${ad}
<div class="tool-panel">
  <textarea id="text">Hello</textarea>
  <div class="row">
    <button type="button" class="primary" id="enc">To hex</button>
    <button type="button" class="primary" id="dec">To text</button>
  </div>
  <textarea id="out" rows="3" spellcheck="false"></textarea>
</div>
<script>
document.getElementById('enc').onclick=()=>{
  const bytes=new TextEncoder().encode(document.getElementById('text').value);
  document.getElementById('out').value=[...bytes].map(b=>b.toString(16).padStart(2,'0')).join(' ');
};
document.getElementById('dec').onclick=()=>{
  try{
    const bytes=Uint8Array.from(document.getElementById('out').value.trim().split(/\\s+/).map(h=>parseInt(h,16)));
    document.getElementById('text').value=new TextDecoder().decode(bytes);
  }catch(e){ alert('Invalid hex'); }
};
document.getElementById('enc').click();
</script>`,
    },
    {
      path: "/regex-tester.html",
      file: "regex-tester.html",
      category: "developer",
      title: "Regex Tester — Regular Expression Online",
      desc: "Test regular expressions against sample text with match highlights.",
      card: "Regex tester",
      cardDesc: "Test regex matches.",
      body: `
<h1>Regex tester</h1>${ad}
<div class="tool-panel">
  <label for="re">Pattern</label><input id="re" value="\\\\w+" spellcheck="false" />
  <label><input type="checkbox" id="g" checked /> global</label>
  <label><input type="checkbox" id="i" /> ignore case</label>
  <label for="text">Text</label><textarea id="text" rows="5">hello world 123</textarea>
  <button type="button" class="primary" id="go">Test</button>
  <p id="msg" class="ok"></p>
  <pre id="matches"></pre>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let flags=''; if(document.getElementById('g').checked) flags+='g'; if(document.getElementById('i').checked) flags+='i';
  try{
    const re=new RegExp(document.getElementById('re').value, flags);
    const text=document.getElementById('text').value;
    const m=[...text.matchAll(re)];
    document.getElementById('msg').textContent=m.length+' match(es)';
    document.getElementById('matches').textContent=m.map(x=>x[0]+' @'+x.index).join('\\n')||'(none)';
  }catch(e){
    document.getElementById('msg').className='error';
    document.getElementById('msg').textContent=e.message;
  }
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/password-strength.html",
      file: "password-strength.html",
      category: "developer",
      title: "Password Strength Checker",
      desc: "Check password length and character mix locally.",
      card: "Password strength",
      cardDesc: "Strength meter.",
      body: `
<h1>Password strength</h1>${ad}
<div class="tool-panel">
  <label for="p">Password</label><input id="p" type="password" autocomplete="off" />
  <p id="out"></p>
  <ul id="tips"></ul>
</div>
<script>
document.getElementById('p').oninput=()=>{
  const s=document.getElementById('p').value;
  let score=0; const tips=[];
  if(s.length>=12) score++; else tips.push('Use 12+ characters');
  if(/[a-z]/.test(s)&&/[A-Z]/.test(s)) score++; else tips.push('Mix upper & lower case');
  if(/\\d/.test(s)) score++; else tips.push('Add numbers');
  if(/[^A-Za-z0-9]/.test(s)) score++; else tips.push('Add symbols');
  const labels=['Weak','Fair','Good','Strong','Very strong'];
  document.getElementById('out').className=score<2?'error':score<3?'':'ok';
  document.getElementById('out').textContent=labels[score]||labels[0];
  document.getElementById('tips').innerHTML=tips.map(t=>'<li>'+t+'</li>').join('');
};
</script>`,
    },
    {
      path: "/luhn-checker.html",
      file: "luhn-checker.html",
      category: "india",
      title: "Credit Card Luhn Checker — Format Only",
      desc: "Validate card number checksum with Luhn algorithm. Not a bank check.",
      card: "Luhn checker",
      cardDesc: "Card number checksum.",
      body: `
<h1>Luhn checker</h1>${ad}
<div class="tool-panel">
  <label for="n">Card number (digits only)</label>
  <input id="n" inputmode="numeric" placeholder="4111111111111111" />
  <button type="button" class="primary" id="go">Check</button>
  <p id="out"></p>
  <p class="prose" style="font-size:0.85rem">Passes Luhn only—does not verify with issuers.</p>
</div>
<script>
function luhn(s){
  s=s.replace(/\\D/g,'');
  let sum=0, alt=false;
  for(let i=s.length-1;i>=0;i--){
    let d=+s[i];
    if(alt){ d*=2; if(d>9) d-=9; }
    sum+=d; alt=!alt;
  }
  return sum%10===0&&s.length>=13;
}
document.getElementById('go').onclick=()=>{
  const ok=luhn(document.getElementById('n').value);
  const o=document.getElementById('out');
  o.className=ok?'ok':'error';
  o.textContent=ok?'Luhn check passed.':'Failed Luhn check.';
};
</script>`,
    },
    {
      path: "/split-bill.html",
      file: "split-bill.html",
      category: "calculators",
      title: "Split Bill Calculator — Tip & Per Person",
      desc: "Split restaurant bill with tip across people.",
      card: "Split bill",
      cardDesc: "Bill + tip ÷ people.",
      body: `
<h1>Split bill calculator</h1>${ad}
<div class="tool-panel">
  <label for="bill">Bill total</label><input id="bill" type="number" value="2000" />
  <label for="tip">Tip (%)</label><input id="tip" type="number" value="10" />
  <label for="p">People</label><input id="p" type="number" min="1" value="4" />
  <button type="button" class="primary" id="go">Split</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const b=Number(document.getElementById('bill').value);
  const t=b*(Number(document.getElementById('tip').value)/100);
  const n=Math.max(1,Number(document.getElementById('p').value));
  const each=(b+t)/n;
  document.getElementById('out').textContent='Each pays ₹'+each.toFixed(2)+' (total with tip ₹'+(b+t).toFixed(2)+')';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/electricity-bill.html",
      file: "electricity-bill.html",
      category: "india",
      title: "Electricity Bill Estimate — Units × Rate",
      desc: "Estimate bill from meter units and price per unit.",
      card: "Electricity estimate",
      cardDesc: "Units × ₹/unit.",
      body: `
<h1>Electricity bill estimate</h1>${ad}
<div class="tool-panel">
  <label for="u">Units (kWh)</label><input id="u" type="number" value="250" />
  <label for="r">Rate per unit (₹)</label><input id="r" type="number" step="0.01" value="8" />
  <label for="f">Fixed charge (₹)</label><input id="f" type="number" value="50" />
  <button type="button" class="primary" id="go">Estimate</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const u=Number(document.getElementById('u').value), r=Number(document.getElementById('r').value), f=Number(document.getElementById('f').value);
  const total=u*r+f;
  document.getElementById('out').textContent='≈ ₹'+total.toLocaleString('en-IN',{maximumFractionDigits:2});
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/average-calculator.html",
      file: "average-calculator.html",
      category: "calculators",
      title: "Average Calculator — Mean of Numbers",
      desc: "Calculate average (mean) from a list of numbers.",
      card: "Average calculator",
      cardDesc: "Mean of numbers.",
      body: `
<h1>Average calculator</h1>${ad}
<div class="tool-panel">
  <label for="nums">Numbers (comma or space separated)</label>
  <textarea id="nums">10, 20, 30, 40</textarea>
  <button type="button" class="primary" id="go">Average</button>
  <p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const a=document.getElementById('nums').value.split(/[\\s,]+/).map(Number).filter(n=>Number.isFinite(n));
  const avg=a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
  document.getElementById('out').textContent='Average: '+avg+' (n='+a.length+')';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/gcd-lcm-calculator.html",
      file: "gcd-lcm-calculator.html",
      category: "calculators",
      title: "GCD & LCM Calculator",
      desc: "Find greatest common divisor and least common multiple.",
      card: "GCD & LCM",
      cardDesc: "Two-number GCD/LCM.",
      body: `
<h1>GCD & LCM</h1>${ad}
<div class="tool-panel">
  <label for="a">A</label><input id="a" type="number" value="48" />
  <label for="b">B</label><input id="b" type="number" value="18" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok"></p>
</div>
<script>
function gcd(x,y){ while(y){ const t=y; y=x%y; x=t; } return Math.abs(x); }
document.getElementById('go').onclick=()=>{
  const a=Number(document.getElementById('a').value), b=Number(document.getElementById('b').value);
  const g=gcd(a,b);
  document.getElementById('out').textContent='GCD='+g+' · LCM='+(g?Math.abs(a*b)/g:0);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/factorial-calculator.html",
      file: "factorial-calculator.html",
      category: "calculators",
      title: "Factorial Calculator — n!",
      desc: "Compute factorial for n up to 170.",
      card: "Factorial n!",
      cardDesc: "Factorial calculator.",
      body: `
<h1>Factorial calculator</h1>${ad}
<div class="tool-panel">
  <label for="n">n</label><input id="n" type="number" min="0" max="170" value="10" />
  <button type="button" class="primary" id="go">Calculate</button>
  <p id="out" class="ok" style="word-break:break-all"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let n=Number(document.getElementById('n').value);
  if(n<0||n>170){ document.getElementById('out').textContent='Use 0–170'; return; }
  let r=1n;
  for(let i=2n;i<=BigInt(n);i++) r*=i;
  document.getElementById('out').textContent=String(r);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/prime-checker.html",
      file: "prime-checker.html",
      category: "calculators",
      title: "Prime Number Checker",
      desc: "Check if a number is prime.",
      card: "Prime checker",
      cardDesc: "Is it prime?",
      body: `
<h1>Prime checker</h1>${ad}
<div class="tool-panel">
  <label for="n">Number</label><input id="n" type="number" value="97" />
  <button type="button" class="primary" id="go">Check</button>
  <p id="out" class="ok"></p>
</div>
<script>
function isPrime(n){
  if(n<2) return false;
  if(n%2===0) return n===2;
  for(let i=3;i*i<=n;i+=2) if(n%i===0) return false;
  return true;
}
document.getElementById('go').onclick=()=>{
  const n=Number(document.getElementById('n').value);
  document.getElementById('out').textContent=isPrime(n)?n+' is prime.':n+' is not prime.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/normalize-spaces.html",
      file: "normalize-spaces.html",
      category: "writing",
      title: "Normalize Whitespace — Clean Text",
      desc: "Collapse extra spaces and trim lines.",
      card: "Normalize spaces",
      cardDesc: "Clean whitespace.",
      body: `
<h1>Normalize whitespace</h1>${ad}
<div class="tool-panel">
  <textarea id="text"></textarea>
  <button type="button" class="primary" id="go">Clean</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  document.getElementById('text').value=document.getElementById('text').value
    .split(/\\n/).map(l=>l.trim().replace(/\\s+/g,' ')).join('\\n').trim();
};
</script>`,
    },
    {
      path: "/line-numbers.html",
      file: "line-numbers.html",
      category: "writing",
      title: "Add Line Numbers to Text",
      desc: "Prefix each line with line numbers.",
      card: "Line numbers",
      cardDesc: "Number each line.",
      body: `
<h1>Add line numbers</h1>${ad}
<div class="tool-panel">
  <textarea id="text" rows="8">alpha
beta
gamma</textarea>
  <button type="button" class="primary" id="go">Number lines</button>
  <textarea id="out" rows="8" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const lines=document.getElementById('text').value.split(/\\n/);
  document.getElementById('out').value=lines.map((l,i)=>String(i+1).padStart(3,' ')+' | '+l).join('\\n');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/extract-emails.html",
      file: "extract-emails.html",
      category: "developer",
      title: "Extract Email Addresses from Text",
      desc: "Find email addresses in pasted text.",
      card: "Extract emails",
      cardDesc: "List emails in text.",
      body: `
<h1>Extract emails</h1>${ad}
<div class="tool-panel">
  <textarea id="text" rows="8"></textarea>
  <button type="button" class="primary" id="go">Extract</button>
  <textarea id="out" rows="6" readonly></textarea>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const m=document.getElementById('text').value.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g)||[];
  document.getElementById('out').value=[...new Set(m)].join('\\n');
};
</script>`,
    },
    {
      path: "/rgb-hex-converter.html",
      file: "rgb-hex-converter.html",
      category: "design",
      title: "RGB to Hex Color Converter",
      desc: "Convert RGB values to hex color codes and back.",
      card: "RGB ↔ hex",
      cardDesc: "Color code convert.",
      body: `
<h1>RGB ↔ hex</h1>${ad}
<div class="tool-panel">
  <label>R <input id="r" type="number" min="0" max="255" value="114" /></label>
  <label>G <input id="g" type="number" min="0" max="255" value="14" /></label>
  <label>B <input id="b" type="number" min="0" max="255" value="158" /></label>
  <label>Hex <input id="hex" value="#720E9E" spellcheck="false" /></label>
  <div id="sw" style="height:48px;border-radius:8px;margin:12px 0"></div>
  <button type="button" class="primary" id="fromRgb">RGB → hex</button>
  <button type="button" class="primary" id="fromHex">Hex → RGB</button>
</div>
<script>
function paint(){
  const r=+document.getElementById('r').value,g=+document.getElementById('g').value,b=+document.getElementById('b').value;
  document.getElementById('sw').style.background='rgb('+r+','+g+','+b+')';
}
document.getElementById('fromRgb').onclick=()=>{
  const r=Math.min(255,Math.max(0,+document.getElementById('r').value));
  const g=Math.min(255,Math.max(0,+document.getElementById('g').value));
  const b=Math.min(255,Math.max(0,+document.getElementById('b').value));
  document.getElementById('hex').value='#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase();
  paint();
};
document.getElementById('fromHex').onclick=()=>{
  const h=document.getElementById('hex').value.replace('#','');
  if(h.length!==6) return;
  document.getElementById('r').value=parseInt(h.slice(0,2),16);
  document.getElementById('g').value=parseInt(h.slice(2,4),16);
  document.getElementById('b').value=parseInt(h.slice(4,6),16);
  paint();
};
document.getElementById('fromRgb').click();
</script>`,
    },
  ];
}
