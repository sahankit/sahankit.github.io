/** Batch 27 — More high-search-intent tools. */

export function batch27Tools(ad) {
  return [
    {
      path: "/reddit-title-character-counter.html",
      file: "reddit-title-character-counter.html",
      category: "seo",
      title: "Reddit Title Character Counter — Post Title Length",
      desc: "Count Reddit post title characters with ~300 character guidance. Free Reddit title counter.",
      card: "Reddit title counter",
      cardDesc: "~300 char guide.",
      body: `<h1>Reddit title character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Post title</label><textarea id="text" rows="3"></textarea>
<div class="stats" id="stats"></div>
</div>
<script>
const G=300;
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML='<div class="stat"><strong>'+n+'</strong>Characters</div><div class="stat"><strong>'+(G-n)+'</strong>Left of ~300</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/ebay-title-character-counter.html",
      file: "ebay-title-character-counter.html",
      category: "seo",
      title: "eBay Title Character Counter — Listing Title Limit",
      desc: "Count eBay listing title characters with 80-character guidance for sellers.",
      card: "eBay title counter",
      cardDesc: "80 char guide.",
      body: `<h1>eBay title character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Listing title</label><input id="text" type="text" />
<div class="stats" id="stats"></div>
</div>
<script>
const G=80;
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML='<div class="stat"><strong>'+n+'</strong>Used</div><div class="stat"><strong>'+(G-n)+'</strong>Left of 80</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/etsy-title-character-counter.html",
      file: "etsy-title-character-counter.html",
      category: "seo",
      title: "Etsy Title Character Counter — Listing SEO Length",
      desc: "Count Etsy product title characters. Free Etsy listing title counter for handmade sellers.",
      card: "Etsy title counter",
      cardDesc: "Listing title length.",
      body: `<h1>Etsy title character counter</h1>${ad}
<div class="tool-panel">
<label for="text">Listing title</label><textarea id="text" rows="3"></textarea>
<div class="stats" id="stats"></div>
<p class="prose" style="font-size:0.85rem">Etsy allows long titles; many sellers target readable length under ~140 characters.</p>
</div>
<script>
const G=140;
function upd(){
  const n=document.getElementById('text').value.length;
  document.getElementById('stats').innerHTML='<div class="stat"><strong>'+n+'</strong>Chars</div><div class="stat"><strong>'+(G-n)+'</strong>Left of ~140 guide</div>';
}
document.getElementById('text').oninput=upd; upd();
</script>`,
    },
    {
      path: "/meta-keywords-from-text.html",
      file: "meta-keywords-from-text.html",
      category: "seo",
      title: "Meta Keywords Generator — Keywords from Page Text",
      desc: "Extract meta keyword ideas from article text by word frequency. Free SEO keyword list generator.",
      card: "Meta keywords",
      cardDesc: "Keywords from copy.",
      body: `<h1>Meta keywords from text</h1>${ad}
<div class="tool-panel">
<label for="text">Page content</label><textarea id="text" rows="8" placeholder="Paste article…"></textarea>
<button type="button" class="primary" id="go">Suggest keywords</button>
<p id="out" class="ok" style="word-break:break-word"></p>
</div>
<script>
const stop=new Set('the and for that with this from your have are was not but can will our you all any out about into than them they been their more also just like when what how who get has its new one two use using online free tool tools page site'.split(' '));
document.getElementById('go').onclick=()=>{
  const map=new Map();
  for(const w of (document.getElementById('text').value.toLowerCase().match(/[a-z0-9]{3,}/g)||[])){
    if(stop.has(w)) continue;
    map.set(w,(map.get(w)||0)+1);
  }
  const list=[...map.entries()].sort((a,b)=>b[1]-a[1]).slice(0,15).map(x=>x[0]);
  document.getElementById('out').textContent=list.length?list.join(', '):'Paste more text to extract keywords.';
};
</script>`,
    },
    {
      path: "/pounds-to-stone-converter.html",
      file: "pounds-to-stone-converter.html",
      category: "calculators",
      title: "Pounds to Stone Converter — UK Weight Calculator",
      desc: "Convert pounds to stone and pounds (st lb) and back. Free UK weight converter.",
      card: "Pounds to stone",
      cardDesc: "lb ↔ st + lb.",
      body: `<h1>Pounds to stone converter</h1>${ad}
<div class="tool-panel">
<label for="lb">Pounds (total)</label><input id="lb" type="number" step="0.1" value="154" />
<label for="st">Stone</label><input id="st" type="number" step="1" />
<label for="rem">Pounds remainder</label><input id="rem" type="number" step="0.1" />
<p class="prose" style="font-size:0.85rem">1 stone = 14 lb</p>
</div>
<script>
const lb=document.getElementById('lb'), st=document.getElementById('st'), rem=document.getElementById('rem');
let lock=false;
function fromLb(){
  if(lock) return; lock=true;
  const v=+lb.value; if(!isNaN(v)){ st.value=Math.floor(v/14); rem.value=(v%14).toFixed(1); }
  lock=false;
}
function fromSt(){
  if(lock) return; lock=true;
  lb.value=( (+st.value||0)*14+(+rem.value||0) ).toFixed(1);
  lock=false;
}
lb.oninput=fromLb; st.oninput=fromSt; rem.oninput=fromSt;
fromLb();
</script>`,
    },
    {
      path: "/pool-volume-calculator.html",
      file: "pool-volume-calculator.html",
      category: "calculators",
      title: "Pool Volume Calculator — Gallons in Rectangular Pool",
      desc: "Calculate swimming pool volume in gallons from length, width, and average depth. Free pool calculator.",
      card: "Pool volume",
      cardDesc: "Gallons in pool.",
      body: `<h1>Pool volume calculator</h1>${ad}
<div class="tool-panel">
<label for="L">Length (ft)</label><input id="L" type="number" value="30" />
<label for="W">Width (ft)</label><input id="W" type="number" value="15" />
<label for="D">Average depth (ft)</label><input id="D" type="number" step="0.1" value="5" />
<button type="button" class="primary" id="go">Calculate gallons</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const gal=+document.getElementById('L').value*+document.getElementById('W').value*+document.getElementById('D').value*7.48052;
  document.getElementById('out').textContent='About '+Math.round(gal).toLocaleString()+' US gallons ('+(gal*3.785411784/1000).toFixed(1)+' m³).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/wallpaper-calculator.html",
      file: "wallpaper-calculator.html",
      category: "calculators",
      title: "Wallpaper Calculator — Rolls Needed for Room",
      desc: "Estimate wallpaper rolls from wall area and roll coverage. Free wallpaper quantity calculator.",
      card: "Wallpaper calculator",
      cardDesc: "Rolls needed.",
      body: `<h1>Wallpaper calculator</h1>${ad}
<div class="tool-panel">
<label for="sq">Wall area (sq ft)</label><input id="sq" type="number" value="400" />
<label for="cov">Roll coverage (sq ft)</label><input id="cov" type="number" value="28" />
<label for="w">Waste (%)</label><input id="w" type="number" value="10" />
<button type="button" class="primary" id="go">Calculate rolls</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const rolls=Math.ceil((+document.getElementById('sq').value*(1+(+document.getElementById('w').value/100)))/+document.getElementById('cov').value);
  document.getElementById('out').textContent='Order about '+rolls+' single rolls (check pattern repeat on label).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/brick-calculator.html",
      file: "brick-calculator.html",
      category: "calculators",
      title: "Brick Calculator — Bricks Needed for Wall",
      desc: "Estimate number of bricks for a wall from area and brick size. Free masonry calculator.",
      card: "Brick calculator",
      cardDesc: "Bricks for wall area.",
      body: `<h1>Brick calculator</h1>${ad}
<div class="tool-panel">
<label for="sq">Wall area (sq ft)</label><input id="sq" type="number" value="100" />
<label for="brick">Brick face area (sq in)</label><input id="brick" type="number" value="32" />
<label for="joint">Mortar joint (in)</label><input id="joint" type="number" step="0.01" value="0.375" />
<button type="button" class="primary" id="go">Estimate bricks</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const sqin=+document.getElementById('sq').value*144;
  const eff=+document.getElementById('brick').value+ +document.getElementById('joint').value*2;
  const n=Math.ceil(sqin/eff*1.05);
  document.getElementById('out').textContent='About '+n.toLocaleString()+' bricks (includes ~5% waste).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/roofing-calculator.html",
      file: "roofing-calculator.html",
      category: "calculators",
      title: "Roofing Calculator — Squares of Shingles from Area",
      desc: "Convert roof square footage to roofing squares (100 sq ft). Free shingle quantity estimator.",
      card: "Roofing squares",
      cardDesc: "Squares from sq ft.",
      body: `<h1>Roofing calculator</h1>${ad}
<div class="tool-panel">
<label for="sq">Roof area (sq ft)</label><input id="sq" type="number" value="2000" />
<label for="pitch">Pitch factor (1.0 = flat estimate)</label><input id="pitch" type="number" step="0.01" value="1.15" />
<button type="button" class="primary" id="go">Calculate squares</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const adj=+document.getElementById('sq').value*+document.getElementById('pitch').value;
  const squares=adj/100;
  const bundles=Math.ceil(squares*3);
  document.getElementById('out').textContent=adj.toFixed(0)+' sq ft adjusted · '+squares.toFixed(2)+' squares · ~'+bundles+' shingle bundles (3/square rule of thumb).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/npv-calculator.html",
      file: "npv-calculator.html",
      category: "calculators",
      title: "NPV Calculator — Net Present Value Online",
      desc: "Calculate net present value from initial investment, discount rate, and yearly cash flows.",
      card: "NPV calculator",
      cardDesc: "Net present value.",
      body: `<h1>NPV calculator</h1>${ad}
<div class="tool-panel">
<label for="inv">Initial investment ($)</label><input id="inv" type="number" value="10000" />
<label for="r">Discount rate (% per year)</label><input id="r" type="number" step="0.1" value="10" />
<label for="cf">Annual cash flows (comma-separated, year 1…)</label><input id="cf" type="text" value="3000,4000,5000,6000" />
<button type="button" class="primary" id="go">Calculate NPV</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const inv=+document.getElementById('inv').value;
  const r=+document.getElementById('r').value/100;
  const flows=document.getElementById('cf').value.split(',').map(x=>+x.trim()).filter(x=>!isNaN(x));
  let npv=-inv;
  flows.forEach((cf,i)=>{ npv+=cf/Math.pow(1+r,i+1); });
  document.getElementById('out').textContent='NPV: $'+npv.toFixed(2)+(npv>=0?' (project adds value at this rate)':' (negative at this rate)');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/present-value-calculator.html",
      file: "present-value-calculator.html",
      category: "calculators",
      title: "Present Value Calculator — PV of Future Money",
      desc: "Calculate present value from future value, interest rate, and years. Free PV calculator.",
      card: "Present value (PV)",
      cardDesc: "FV → today's value.",
      body: `<h1>Present value calculator</h1>${ad}
<div class="tool-panel">
<label for="fv">Future value ($)</label><input id="fv" type="number" value="10000" />
<label for="r">Annual rate (%)</label><input id="r" type="number" step="0.01" value="7" />
<label for="y">Years</label><input id="y" type="number" value="10" />
<button type="button" class="primary" id="go">Calculate PV</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const pv=+document.getElementById('fv').value/Math.pow(1+(+document.getElementById('r').value/100), +document.getElementById('y').value);
  document.getElementById('out').textContent='Present value: $'+pv.toFixed(2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/lumpsum-investment-calculator.html",
      file: "lumpsum-investment-calculator.html",
      category: "india",
      title: "Lumpsum Investment Calculator — Mutual Fund FV India",
      desc: "Calculate future value of one-time investment with expected return. Free India lumpsum SIP alternative.",
      card: "Lumpsum calculator",
      cardDesc: "One-time investment FV.",
      body: `<h1>Lumpsum investment calculator</h1>${ad}
<div class="tool-panel">
<label for="p">Investment amount (₹)</label><input id="p" type="number" value="100000" />
<label for="r">Expected annual return (%)</label><input id="r" type="number" step="0.1" value="12" />
<label for="y">Years</label><input id="y" type="number" value="10" />
<button type="button" class="primary" id="go">Calculate FV</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const fv=+document.getElementById('p').value*Math.pow(1+(+document.getElementById('r').value/100), +document.getElementById('y').value);
  document.getElementById('out').textContent='Future value ≈ ₹'+Math.round(fv).toLocaleString('en-IN')+' (not guaranteed).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/speed-distance-time-calculator.html",
      file: "speed-distance-time-calculator.html",
      category: "calculators",
      title: "Speed Distance Time Calculator — Travel Math",
      desc: "Calculate speed, distance, or time when you know two of the three. Free motion calculator.",
      card: "Speed · distance · time",
      cardDesc: "Solve missing value.",
      body: `<h1>Speed, distance, time</h1>${ad}
<div class="tool-panel">
<label for="d">Distance (miles)</label><input id="d" type="number" step="any" value="120" />
<label for="s">Speed (mph)</label><input id="s" type="number" step="any" value="60" />
<label for="t">Time (hours)</label><input id="t" type="number" step="any" placeholder="leave blank to solve" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let d=+document.getElementById('d').value, s=+document.getElementById('s').value, t=+document.getElementById('t').value;
  const blank=[!d,'d',!s,'s',!t,'t'].filter((x,i)=>i%2===0);
  if(blank.length!==1){ document.getElementById('out').className='error'; document.getElementById('out').textContent='Leave exactly one field empty to solve.'; return; }
  document.getElementById('out').className='ok';
  if(!d) document.getElementById('out').textContent='Distance = '+(s*t).toFixed(2)+' miles';
  else if(!s) document.getElementById('out').textContent='Speed = '+(d/t).toFixed(2)+' mph';
  else document.getElementById('out').textContent='Time = '+(d/s).toFixed(2)+' hours ('+((d/s)*60).toFixed(0)+' min)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/kw-to-hp-converter.html",
      file: "kw-to-hp-converter.html",
      category: "calculators",
      title: "KW to HP Converter — Kilowatts to Horsepower",
      desc: "Convert kilowatts to mechanical horsepower and hp to kW. Free power unit converter.",
      card: "kW to HP",
      cardDesc: "kW ↔ horsepower.",
      body: `<h1>kW to HP converter</h1>${ad}
<div class="tool-panel">
<label for="kw">Kilowatts (kW)</label><input id="kw" type="number" step="0.001" value="75" />
<label for="hp">Horsepower (hp)</label><input id="hp" type="number" step="0.001" />
<p class="prose" style="font-size:0.85rem">1 hp ≈ 0.745699872 kW</p>
</div>
<script>
const kw=document.getElementById('kw'), hp=document.getElementById('hp'); let l=false;
kw.oninput=()=>{ if(l)return; l=true; hp.value=kw.value!==''?(kw.value/0.745699872).toFixed(3):''; l=false; };
hp.oninput=()=>{ if(l)return; l=true; kw.value=hp.value!==''?(hp.value*0.745699872).toFixed(3):''; l=false; };
kw.oninput(); kw.dispatchEvent(new Event('input'));
</script>`,
    },
    {
      path: "/bar-to-psi-converter.html",
      file: "bar-to-psi-converter.html",
      category: "calculators",
      title: "Bar to PSI Converter — Pressure Units",
      desc: "Convert bar to PSI and pounds per square inch to bar. Free pressure converter.",
      card: "Bar to PSI",
      cardDesc: "bar ↔ psi.",
      body: `<h1>Bar to PSI converter</h1>${ad}
<div class="tool-panel">
<label for="bar">Bar</label><input id="bar" type="number" step="0.001" value="2" />
<label for="psi">PSI</label><input id="psi" type="number" step="0.01" />
</div>
<script>
const bar=document.getElementById('bar'), psi=document.getElementById('psi'); let l=false;
bar.oninput=()=>{ if(l)return; l=true; psi.value=bar.value!==''?(bar.value*14.5038).toFixed(2):''; l=false; };
psi.oninput=()=>{ if(l)return; l=true; bar.value=psi.value!==''?(psi.value/14.5038).toFixed(4):''; l=false; };
bar.oninput(); bar.dispatchEvent(new Event('input'));
</script>`,
    },
    {
      path: "/emergency-fund-calculator.html",
      file: "emergency-fund-calculator.html",
      category: "calculators",
      title: "Emergency Fund Calculator — Months of Expenses Saved",
      desc: "Calculate emergency fund target from monthly expenses and months of coverage. Free savings goal.",
      card: "Emergency fund",
      cardDesc: "Months × expenses.",
      body: `<h1>Emergency fund calculator</h1>${ad}
<div class="tool-panel">
<label for="exp">Monthly expenses ($)</label><input id="exp" type="number" value="3500" />
<label for="mo">Months to cover</label><input id="mo" type="number" value="6" />
<button type="button" class="primary" id="go">Target fund</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const t=+document.getElementById('exp').value*+document.getElementById('mo').value;
  document.getElementById('out').textContent='Target emergency fund: $'+t.toLocaleString('en-US')+' ('+document.getElementById('mo').value+' months).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/age-in-days-calculator.html",
      file: "age-in-days-calculator.html",
      category: "calculators",
      title: "Age in Days Calculator — Days Old from Birth Date",
      desc: "Calculate exact age in days, weeks, and months from date of birth. Free age day counter.",
      card: "Age in days",
      cardDesc: "Days since birth.",
      body: `<h1>Age in days calculator</h1>${ad}
<div class="tool-panel">
<label for="d">Date of birth</label><input id="d" type="date" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=document.getElementById('d').value; if(!v) return;
  const birth=new Date(v+'T12:00:00');
  const days=Math.floor((Date.now()-birth)/86400000);
  document.getElementById('out').textContent=days.toLocaleString()+' days old (~'+(days/365.25).toFixed(2)+' years).';
};
</script>`,
    },
    {
      path: "/calories-burned-running-calculator.html",
      file: "calories-burned-running-calculator.html",
      category: "calculators",
      title: "Calories Burned Running Calculator — By Distance & Weight",
      desc: "Estimate calories burned running from weight and distance. MET-based illustration.",
      card: "Running calories",
      cardDesc: "Calories on a run.",
      body: `<h1>Calories burned running</h1>${ad}
<div class="tool-panel">
<label for="kg">Body weight (kg)</label><input id="kg" type="number" value="70" />
<label for="mi">Distance (miles)</label><input id="mi" type="number" step="0.1" value="5" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const met=9.8;
  const hours=(+document.getElementById('mi').value)/6;
  const kcal=met*3.5*(+document.getElementById('kg').value)/200*hours*60;
  document.getElementById('out').textContent='About '+Math.round(kcal)+' kcal (moderate run pace estimate).';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/protein-intake-calculator.html",
      file: "protein-intake-calculator.html",
      category: "calculators",
      title: "Protein Intake Calculator — Daily Protein Grams",
      desc: "Estimate daily protein grams from body weight and activity level. General fitness guidance only.",
      card: "Protein intake",
      cardDesc: "g protein per day.",
      body: `<h1>Protein intake calculator</h1>${ad}
<div class="tool-panel">
<label for="kg">Body weight (kg)</label><input id="kg" type="number" value="70" />
<label for="lvl">Activity</label><select id="lvl"><option value="0.8">Sedentary (0.8 g/kg)</option><option value="1.2" selected>Active (1.2 g/kg)</option><option value="1.6">Strength training (1.6 g/kg)</option><option value="2.0">High volume (2.0 g/kg)</option></select>
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const g=+document.getElementById('kg').value*+document.getElementById('lvl').value;
  document.getElementById('out').textContent='About '+Math.round(g)+' g protein per day. Adjust with a dietitian if needed.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/cap-rate-calculator.html",
      file: "cap-rate-calculator.html",
      category: "calculators",
      title: "Cap Rate Calculator — Capitalization Rate Real Estate",
      desc: "Calculate cap rate from net operating income and property value. Free rental property metric.",
      card: "Cap rate",
      cardDesc: "NOI ÷ value.",
      body: `<h1>Cap rate calculator</h1>${ad}
<div class="tool-panel">
<label for="noi">Net operating income ($/year)</label><input id="noi" type="number" value="24000" />
<label for="val">Property value ($)</label><input id="val" type="number" value="300000" />
<button type="button" class="primary" id="go">Calculate cap rate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const cap=(+document.getElementById('noi').value/+document.getElementById('val').value)*100;
  document.getElementById('out').textContent='Cap rate: '+cap.toFixed(2)+'%';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/ohms-law-calculator.html",
      file: "ohms-law-calculator.html",
      category: "calculators",
      title: "Ohm's Law Calculator — Voltage, Current, Resistance",
      desc: "Calculate voltage, current, or resistance using Ohm's law (V = I × R). Free electronics calculator.",
      card: "Ohm's law",
      cardDesc: "V · I · R.",
      body: `<h1>Ohm's law calculator</h1>${ad}
<div class="tool-panel">
<label for="v">Voltage (V)</label><input id="v" type="number" step="any" placeholder="optional" />
<label for="i">Current (A)</label><input id="i" type="number" step="any" value="2" />
<label for="r">Resistance (Ω)</label><input id="r" type="number" step="any" value="10" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  let v=document.getElementById('v').value, i=document.getElementById('i').value, r=document.getElementById('r').value;
  const set=(id,val)=>document.getElementById(id).value=val.toFixed(4).replace(/\\.0000$/,'');
  if(!v&&i&&r) set('v',+i*+r);
  else if(v&&!i&&r) set('i',+v/+r);
  else if(v&&i&&!r) set('r',+v/+i);
  else if(v&&i&&r) document.getElementById('out').textContent='V='+v+', I='+i+', R='+r+' (all filled)';
  else { document.getElementById('out').className='error'; document.getElementById('out').textContent='Enter any two values; leave the third blank.'; return; }
  document.getElementById('out').className='ok';
  document.getElementById('out').textContent='Updated missing value using V = I × R.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/title-case-converter.html",
      file: "title-case-converter.html",
      category: "writing",
      title: "Title Case Converter — Capitalize Headlines Online",
      desc: "Convert text to title case for headlines and blog titles. Free title capitalization tool.",
      card: "Title case",
      cardDesc: "Headline capitalization.",
      body: `<h1>Title case converter</h1>${ad}
<div class="tool-panel">
<label for="text">Text</label><textarea id="text" rows="6" placeholder="the quick brown fox"></textarea>
<button type="button" class="primary" id="go">To title case</button>
<textarea id="out" rows="6" readonly></textarea>
</div>
<script>
const small=new Set('a an the and but or for nor on at to from by of in out over with'.split(' '));
document.getElementById('go').onclick=()=>{
  const words=document.getElementById('text').value.toLowerCase().split(/\\s+/);
  const out=words.map((w,i)=>{
    if(!w) return w;
    if(i>0&&small.has(w)) return w;
    return w.charAt(0).toUpperCase()+w.slice(1);
  }).join(' ');
  document.getElementById('out').value=out;
};
</script>`,
    },
    {
      path: "/px-to-rem-converter.html",
      file: "px-to-rem-converter.html",
      category: "design",
      title: "PX to REM Converter — CSS Font Size Units",
      desc: "Convert pixels to rem and rem to px using a base font size. Free CSS unit converter for web design.",
      card: "PX to REM",
      cardDesc: "CSS px ↔ rem.",
      body: `<h1>PX to REM converter</h1>${ad}
<div class="tool-panel">
<label for="base">Root font size (px)</label><input id="base" type="number" value="16" />
<label for="px">Pixels</label><input id="px" type="number" step="0.1" value="18" />
<label for="rem">Rem</label><input id="rem" type="number" step="0.001" />
</div>
<script>
const base=document.getElementById('base'), px=document.getElementById('px'), rem=document.getElementById('rem');
let l=false;
function syncFromPx(){ if(l)return; l=true; rem.value=px.value!==''?(px.value/base.value).toFixed(4):''; l=false; }
function syncFromRem(){ if(l)return; l=true; px.value=rem.value!==''?(rem.value*base.value).toFixed(2):''; l=false; }
px.oninput=syncFromPx; rem.oninput=syncFromRem; base.oninput=syncFromPx;
syncFromPx();
</script>`,
    },
    {
      path: "/passphrase-generator.html",
      file: "passphrase-generator.html",
      category: "developer",
      title: "Passphrase Generator — Random Word Passphrases",
      desc: "Generate memorable random passphrases from common words. Created locally in your browser.",
      card: "Passphrase generator",
      cardDesc: "Random word phrases.",
      body: `<h1>Passphrase generator</h1>${ad}
<div class="tool-panel">
<label for="n">Number of words</label><input id="n" type="number" min="3" max="8" value="4" />
<button type="button" class="primary" id="go">Generate</button>
<p id="out" class="ok" style="font-family:monospace;font-size:1.05rem"></p>
<button type="button" class="primary rs-secondary" id="copy">Copy</button>
</div>
<script>
const words='time year people way day man woman life child world school state family student group country problem hand part place case week company system program question work government number night point home water room mother area money story fact month lot right study book eye job word business issue side kind head house service friend father power hour game line end member law car city community name president team minute idea kid body information back parent face others level office door health person art war history party result change morning reason research girl guy moment air teacher force education foot boy age policy process music market sense nation plan college interest death experience effect use class control care field development role effort rate heart drug show leader light voice wife police mind price report decision son view relationship town road arm difference value building action model season society tax director position player record paper space ground form support event official whose matter center couple site project activity star table court produce eat teach oil half situation easy cost industry figure street image itself phone data picture clear practice piece land product doctor wall patient worker news test movie north love personal open support simply third technology catch step baby dog computer type attention film Republican tree source organization happy science join teach share fly wall'.split(' ');
document.getElementById('go').onclick=()=>{
  const n=+document.getElementById('n').value||4;
  const arr=new Uint32Array(n); crypto.getRandomValues(arr);
  const pick=arr.map(x=>words[x%words.length]);
  document.getElementById('out').textContent=pick.join('-');
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').textContent);
document.getElementById('go').click();
</script>`,
    },
  ];
}
