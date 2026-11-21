/** Batch 41: India finance, size converters, and student tools. */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch41Tools(ad) {
  return [
    {
      path: "/lta-calculator.html",
      file: "lta-calculator.html",
      category: "india",
      title: "LTA Calculator — Leave Travel Allowance Exemption",
      desc: "Estimate how much of your Leave Travel Allowance can be exempt from tax when travel costs and LTA received are known. Uses common salary-tax assumptions.",
      card: "LTA calculator",
      cardDesc: "Tax-free LTA exemption estimate.",
      body: `<h1>LTA calculator</h1>${ad}
<div class="tool-panel">
<label for="lta">LTA received from employer (₹ / year)</label><input id="lta" type="number" min="0" value="40000" />
<label for="travel">Actual eligible travel cost (₹)</label><input id="travel" type="number" min="0" value="35000" />
<label for="trips">Travel journeys claimed this block (max 2)</label><input id="trips" type="number" min="0" max="2" value="1" />
<button type="button" class="primary" id="go">Estimate exemption</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">LTA exemption is generally the lower of the allowance received and the cost of travel in India for you and family on the permitted routes. You can claim up to two journeys in a block of four calendar years. Save tickets and employer proofs.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const lta=Number(document.getElementById('lta').value)||0;
  const travel=Number(document.getElementById('travel').value)||0;
  const trips=Number(document.getElementById('trips').value)||0;
  if(trips>2){ document.getElementById('out').textContent='Only two journeys can be claimed in a block.'; return; }
  const exempt=Math.min(lta,travel);
  const taxable=Math.max(0,lta-exempt);
  const inr=function(n){return '₹'+Math.round(n).toLocaleString('en-IN');};
  document.getElementById('out').textContent='Exempt about '+inr(exempt)+' · taxable LTA '+inr(taxable)+(trips===0?' — no journey claimed, exemption may be zero in practice.':'');
  ${done}
};
</script>`,
    },
    {
      path: "/apy-calculator.html",
      file: "apy-calculator.html",
      category: "india",
      title: "APY Calculator — Atal Pension Yojana Monthly Contribution",
      desc: "Estimate the monthly APY contribution from your age at joining and the pension amount you choose (₹1,000–₹5,000 per month at age 60).",
      card: "APY calculator",
      cardDesc: "Atal Pension Yojana contribution.",
      body: `<h1>APY calculator</h1>${ad}
<div class="tool-panel">
<label for="age">Age when you join APY (18–40)</label><input id="age" type="number" min="18" max="40" value="25" />
<label for="pension">Monthly pension at 60 (₹)</label>
<select id="pension"><option value="1000">1,000</option><option value="2000">2,000</option><option value="3000" selected>3,000</option><option value="4000">4,000</option><option value="5000">5,000</option></select>
<button type="button" class="primary" id="go">Estimate contribution</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Indicative contributions from PFRDA/APY tables (rounded). Actual debit can differ slightly. Spouse pension and corpus return rules apply on death as per the scheme.</p>
</div>
<script>
var APY={
  1000:{18:42,25:76,30:116,35:183,40:291},
  2000:{18:84,25:151,30:231,35:366,40:582},
  3000:{18:126,25:226,30:347,35:539,40:846},
  4000:{18:168,25:301,30:462,35:732,40:1164},
  5000:{18:210,25:376,30:578,35:915,40:1455}
};
function interp(age,tab){
  const ages=[18,25,30,35,40];
  if(age<=ages[0]) return tab[ages[0]];
  if(age>=ages[ages.length-1]) return tab[ages[ages.length-1]];
  for(let i=0;i<ages.length-1;i++){
    if(age>=ages[i]&&age<=ages[i+1]){
      const t=(age-ages[i])/(ages[i+1]-ages[i]);
      return tab[ages[i]]+(tab[ages[i+1]]-tab[ages[i]])*t;
    }
  }
  return tab[30];
}
document.getElementById('go').onclick=function(){
  const age=Number(document.getElementById('age').value);
  const pen=Number(document.getElementById('pension').value);
  if(age<18||age>40){ document.getElementById('out').textContent='APY can be joined between age 18 and 40.'; return; }
  const monthly=Math.round(interp(age,APY[pen]));
  document.getElementById('out').textContent='About ₹'+monthly.toLocaleString('en-IN')+'/month until age 60 for ₹'+pen.toLocaleString('en-IN')+' pension';
  ${done}
};
</script>`,
    },
    {
      path: "/reverse-gst-calculator.html",
      file: "reverse-gst-calculator.html",
      category: "india",
      title: "Reverse GST Calculator — GST Inclusive to Taxable Value",
      desc: "Split a GST-inclusive price into taxable value and GST amount for rates 5%, 12%, 18% or 28%.",
      card: "Reverse GST calculator",
      cardDesc: "GST inclusive price breakdown.",
      body: `<h1>Reverse GST calculator</h1>${ad}
<div class="tool-panel">
<label for="incl">GST-inclusive amount (₹)</label><input id="incl" type="number" min="0" step="0.01" value="1180" />
<label for="rate">GST rate (%)</label>
<select id="rate"><option value="5">5</option><option value="12">12</option><option value="18" selected>18</option><option value="28">28</option></select>
<button type="button" class="primary" id="go">Split amount</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const incl=Number(document.getElementById('incl').value);
  const r=Number(document.getElementById('rate').value)/100;
  if(!(incl>=0)||!(r>=0)){ document.getElementById('out').textContent='Enter amount and rate.'; return; }
  const base=incl/(1+r);
  const gst=incl-base;
  const inr=function(n){return '₹'+n.toFixed(2);};
  document.getElementById('out').textContent='Taxable value '+inr(base)+' · GST '+inr(gst)+' · total '+inr(incl)+' at '+(r*100)+'%';
  ${done}
};
</script>`,
    },
    {
      path: "/old-vs-new-tax-regime-calculator.html",
      file: "old-vs-new-tax-regime-calculator.html",
      category: "india",
      title: "Old vs New Tax Regime Calculator — India Income Tax",
      desc: "Compare estimated income tax under India's old and new personal tax regimes for FY 2025-26. Includes standard deduction and common 80C/HRA inputs for the old regime.",
      card: "Old vs new tax regime",
      cardDesc: "Which regime saves more tax.",
      body: `<h1>Old vs new tax regime calculator</h1>${ad}
<div class="tool-panel">
<label for="income">Gross salary (₹ / year)</label><input id="income" type="number" min="0" value="1200000" />
<label for="ded80c">80C + 80CCD(1B) etc. (₹, old regime)</label><input id="ded80c" type="number" min="0" value="150000" />
<label for="hra">HRA + other exemptions (₹, old regime)</label><input id="hra" type="number" min="0" value="0" />
<button type="button" class="primary" id="go">Compare tax</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Simplified slabs for resident individuals under 60 (FY 2025-26). Standard deduction ₹75,000 in both regimes in recent rules; this tool applies ₹75,000. Surcharge, cess, special rates and deductions not listed are ignored.</p>
</div>
<script>
function taxSlab(taxable,slabs){
  var tax=0, prev=0;
  for(var i=0;i<slabs.length;i++){
    var limit=slabs[i][0], rate=slabs[i][1];
    if(taxable<=prev) break;
    var band=Math.min(taxable,limit)-prev;
    if(band>0) tax+=band*rate;
    prev=limit;
  }
  return tax;
}
function taxOld(t){
  return taxSlab(t,[[250000,0],[500000,0.05],[1000000,0.2],[Infinity,0.3]]);
}
function taxNew(t){
  return taxSlab(t,[[400000,0],[800000,0.05],[1200000,0.1],[1600000,0.15],[2000000,0.2],[2400000,0.25],[Infinity,0.3]]);
}
document.getElementById('go').onclick=function(){
  const inc=Number(document.getElementById('income').value)||0;
  const d80=Number(document.getElementById('ded80c').value)||0;
  const hra=Number(document.getElementById('hra').value)||0;
  const std=75000;
  const oldTaxable=Math.max(0,inc-std-d80-hra);
  const newTaxable=Math.max(0,inc-std);
  const oldT=Math.round(taxOld(oldTaxable)*1.04);
  const newT=Math.round(taxNew(newTaxable)*1.04);
  const save=oldT-newT;
  const inr=function(n){return '₹'+n.toLocaleString('en-IN');};
  let pick=newT<oldT?'New regime is lower by '+inr(Math.abs(save))+'.':'Old regime is lower by '+inr(Math.abs(save))+'.';
  if(oldT===newT) pick='Tax is about the same in both regimes.';
  document.getElementById('out').textContent='Old '+inr(oldTaxable)+' taxable → '+inr(oldT)+' · New '+inr(newTaxable)+' taxable → '+inr(newT)+'. '+pick;
  ${done}
};
</script>`,
    },
    {
      path: "/bra-size-calculator.html",
      file: "bra-size-calculator.html",
      category: "calculators",
      title: "Bra Size Calculator — US and UK From Underbust and Bust",
      desc: "Find bra band and cup size from underbust and bust measurements in inches or centimetres.",
      card: "Bra size calculator",
      cardDesc: "Band and cup from measurements.",
      body: `<h1>Bra size calculator</h1>${ad}
<div class="tool-panel">
<label for="unit">Units</label><select id="unit"><option value="in">Inches</option><option value="cm">Centimetres</option></select>
<label for="under">Underbust (band)</label><input id="under" type="number" min="1" step="0.1" value="32" />
<label for="bust">Bust (fullest part)</label><input id="bust" type="number" min="1" step="0.1" value="36" />
<button type="button" class="primary" id="go">Calculate size</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
var CUPS=['AA','A','B','C','D','DD','DDD'];
document.getElementById('go').onclick=function(){
  let u=Number(document.getElementById('under').value);
  let b=Number(document.getElementById('bust').value);
  if(document.getElementById('unit').value==='cm'){ u=u/2.54; b=b/2.54; }
  if(!(u>0)||!(b>u)){ document.getElementById('out').textContent='Bust must be larger than underbust.'; return; }
  const bandEven=Math.round(u);
  const band=bandEven%2===0?bandEven:bandEven+1;
  const diff=Math.round(b-band);
  const cup=CUPS[Math.max(0,Math.min(CUPS.length-1,diff))]||'D';
  const ukBand=Math.max(28,band-22);
  document.getElementById('out').textContent='US about '+band+cup+' · UK about '+ukBand+cup+' (diff '+diff+' in)';
  ${done}
};
</script>`,
    },
    {
      path: "/ring-size-calculator.html",
      file: "ring-size-calculator.html",
      category: "calculators",
      title: "Ring Size Calculator — US, UK and India From Circumference",
      desc: "Convert finger circumference in millimetres to US, UK and Indian ring sizes.",
      card: "Ring size calculator",
      cardDesc: "Ring size from mm circumference.",
      body: `<h1>Ring size calculator</h1>${ad}
<div class="tool-panel">
<label for="mm">Inner circumference (mm)</label><input id="mm" type="number" min="40" max="80" step="0.1" value="54" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Measure with string around the knuckle, then lay flat and measure length in mm, or use a plastic ring sizer.</p>
</div>
<script>
function usSize(mm){ return Math.round(((mm/3.14159)-15.7)*2)/2; }
function ukSize(mm){ return Math.round((mm-45.4)/0.81); }
function inSize(mm){ return Math.round((mm-10.7)*1.7); }
document.getElementById('go').onclick=function(){
  const mm=Number(document.getElementById('mm').value);
  if(!(mm>=40&&mm<=80)){ document.getElementById('out').textContent='Typical finger circumference is 44–70 mm.'; return; }
  document.getElementById('out').textContent='US ~'+usSize(mm)+' · UK ~'+ukSize(mm)+' · India ~'+inSize(mm)+' · diameter ~'+(mm/3.14159).toFixed(1)+' mm';
  ${done}
};
</script>`,
    },
    {
      path: "/eu-to-us-shoe-size.html",
      file: "eu-to-us-shoe-size.html",
      category: "calculators",
      title: "EU to US Shoe Size Converter",
      desc: "Convert EU shoe sizes to US men's and women's sizes with a standard size chart.",
      card: "EU to US shoe size",
      cardDesc: "European to US shoe sizes.",
      body: `<h1>EU to US shoe size</h1>${ad}
<div class="tool-panel">
<label for="eu">EU size</label><input id="eu" type="number" min="33" max="50" step="0.5" value="42" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const eu=Number(document.getElementById('eu').value);
  if(!(eu>=33&&eu<=50)){ document.getElementById('out').textContent='Enter an EU size between 33 and 50.'; return; }
  const usMen=Math.round((eu-33)*2)/2;
  const usWomen=Math.round((eu-32.5)*2)/2;
  document.getElementById('out').textContent='US men ~'+usMen+' · US women ~'+usWomen+' (EU '+eu+')';
  ${done}
};
</script>`,
    },
    {
      path: "/uk-to-us-shoe-size.html",
      file: "uk-to-us-shoe-size.html",
      category: "calculators",
      title: "UK to US Shoe Size Converter",
      desc: "Convert UK shoe sizes to US men's and women's sizes.",
      card: "UK to US shoe size",
      cardDesc: "British to US shoe sizes.",
      body: `<h1>UK to US shoe size</h1>${ad}
<div class="tool-panel">
<label for="uk">UK size</label><input id="uk" type="number" min="2" max="15" step="0.5" value="8" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const uk=Number(document.getElementById('uk').value);
  if(!(uk>=2&&uk<=15)){ document.getElementById('out').textContent='Enter a UK size between 2 and 15.'; return; }
  const usMen=Math.round((uk+0.5)*2)/2;
  const usWomen=Math.round((uk+2)*2)/2;
  document.getElementById('out').textContent='US men ~'+usMen+' · US women ~'+usWomen+' (UK '+uk+')';
  ${done}
};
</script>`,
    },
    {
      path: "/hat-size-calculator.html",
      file: "hat-size-calculator.html",
      category: "calculators",
      title: "Hat Size Calculator — Fitted US Size From Head Circumference",
      desc: "Convert head circumference in centimetres or inches to US fitted hat sizes.",
      card: "Hat size calculator",
      cardDesc: "Head circumference to hat size.",
      body: `<h1>Hat size calculator</h1>${ad}
<div class="tool-panel">
<label for="unit">Units</label><select id="unit"><option value="cm">Centimetres</option><option value="in">Inches</option></select>
<label for="circ">Head circumference</label><input id="circ" type="number" min="1" step="0.1" value="57" />
<button type="button" class="primary" id="go">Find hat size</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  let cm=Number(document.getElementById('circ').value);
  if(document.getElementById('unit').value==='in') cm=cm*2.54;
  if(!(cm>=48&&cm<=66)){ document.getElementById('out').textContent='Typical adult head circumference is about 52–62 cm.'; return; }
  const us=Math.round(((cm/3.14159)-21)*8)/8;
  const uk=Math.round((cm-1)/0.79);
  document.getElementById('out').textContent='US fitted ~'+us+' · UK ~'+uk+' · '+cm.toFixed(1)+' cm ('+(cm/2.54).toFixed(1)+' in)';
  ${done}
};
</script>`,
    },
    {
      path: "/semester-gpa-calculator.html",
      file: "semester-gpa-calculator.html",
      category: "student",
      title: "Semester GPA Calculator — Credit-Weighted GPA",
      desc: "Calculate semester GPA from course credits and letter grades on a 4.0 scale.",
      card: "Semester GPA calculator",
      cardDesc: "GPA from credits and grades.",
      body: `<h1>Semester GPA calculator</h1>${ad}
<div class="tool-panel">
<p class="tool-hint">Add each course credit hours and grade points (A=4, B=3, C=2, D=1, F=0).</p>
<div id="rows"></div>
<button type="button" id="add">Add course</button>
<button type="button" class="primary" id="go">Calculate GPA</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
var rows=document.getElementById('rows');
function addRow(cr,gp){
  var d=document.createElement('div');
  d.style.marginBottom='0.5rem';
  d.innerHTML='<input class="cr" type="number" min="0" step="0.5" value="'+(cr??3)+'" style="width:4rem" placeholder="Credits" /> <input class="gp" type="number" min="0" max="4" step="0.01" value="'+(gp??3.3)+'" style="width:4rem" placeholder="Grade pts" />';
  rows.appendChild(d);
}
addRow(3,4); addRow(4,3.7); addRow(3,3);
document.getElementById('add').onclick=function(){ addRow(3,3); };
document.getElementById('go').onclick=function(){
  var crs=[].map.call(document.querySelectorAll('.cr'),function(el){return Number(el.value)||0;});
  var gps=[].map.call(document.querySelectorAll('.gp'),function(el){return Number(el.value)||0;});
  var totC=0,totQ=0;
  for(var i=0;i<crs.length;i++){ totC+=crs[i]; totQ+=crs[i]*gps[i]; }
  if(totC<=0){ document.getElementById('out').textContent='Add at least one course with credits.'; return; }
  document.getElementById('out').textContent='Semester GPA '+ (totQ/totC).toFixed(3)+' · '+totC+' total credits';
  ${done}
};
</script>`,
    },
    {
      path: "/high-school-gpa-calculator.html",
      file: "high-school-gpa-calculator.html",
      category: "student",
      title: "High School GPA Calculator — Unweighted 4.0 Scale",
      desc: "Compute unweighted high school GPA from class grades. Optional +0.5 for honors/AP per course.",
      card: "High school GPA",
      cardDesc: "4.0 scale GPA with honors bump.",
      body: `<h1>High school GPA calculator</h1>${ad}
<div class="tool-panel">
<div id="rows"></div>
<button type="button" id="add">Add class</button>
<button type="button" class="primary" id="go">Calculate GPA</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
var LET={A:4,B:3,C:2,D:1,F:0};
function addRow(){
  var d=document.createElement('div');
  d.style.marginBottom='0.5rem';
  d.innerHTML='<select class="lg"><option>A</option><option>B</option><option>C</option><option>D</option><option>F</option></select> <input class="cr" type="number" min="0" value="1" style="width:4rem" title="Credits or weight" /> <label><input class="hon" type="checkbox" /> Honors/AP +0.5</label>';
  document.getElementById('rows').appendChild(d);
}
['A','B','A'].forEach(function(){ addRow(); });
document.getElementById('add').onclick=addRow;
document.getElementById('go').onclick=function(){
  var tot=0, cr=0;
  [].forEach.call(document.querySelectorAll('#rows > div'),function(d){
    var lg=d.querySelector('.lg').value;
    var c=Number(d.querySelector('.cr').value)||1;
    var pts=LET[lg]||0;
    if(d.querySelector('.hon').checked) pts=Math.min(5,pts+0.5);
    tot+=pts*c; cr+=c;
  });
  if(cr<=0){ document.getElementById('out').textContent='Add at least one class.'; return; }
  document.getElementById('out').textContent='GPA '+ (tot/cr).toFixed(2)+' on '+cr+' credit weights';
  ${done}
};
</script>`,
    },
    {
      path: "/letter-grade-calculator.html",
      file: "letter-grade-calculator.html",
      category: "student",
      title: "Letter Grade Calculator — Percentage to Letter Grade",
      desc: "Convert a percentage score to a US letter grade (A–F). Adjust cutoffs if your school uses different breakpoints.",
      card: "Letter grade calculator",
      cardDesc: "Percent to A B C D F.",
      body: `<h1>Letter grade calculator</h1>${ad}
<div class="tool-panel">
<label for="pct">Score (%)</label><input id="pct" type="number" min="0" max="100" step="0.1" value="87" />
<label for="ap">A minimum (%)</label><input id="ap" type="number" min="0" max="100" value="90" />
<label for="bp">B minimum (%)</label><input id="bp" type="number" min="0" max="100" value="80" />
<label for="cp">C minimum (%)</label><input id="cp" type="number" min="0" max="100" value="70" />
<label for="dp">D minimum (%)</label><input id="dp" type="number" min="0" max="100" value="60" />
<button type="button" class="primary" id="go">Get letter grade</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  var s=Number(document.getElementById('pct').value);
  var A=Number(document.getElementById('ap').value);
  var B=Number(document.getElementById('bp').value);
  var C=Number(document.getElementById('cp').value);
  var D=Number(document.getElementById('dp').value);
  var g='F';
  if(s>=A) g='A';
  else if(s>=B) g='B';
  else if(s>=C) g='C';
  else if(s>=D) g='D';
  var gp=g==='A'?4:g==='B'?3:g==='C'?2:g==='D'?1:0;
  document.getElementById('out').textContent=s+'% → '+g+' (about '+gp+' on a 4.0 scale)';
  ${done}
};
</script>`,
    },
    {
      path: "/weighted-average-calculator.html",
      file: "weighted-average-calculator.html",
      category: "student",
      title: "Weighted Average Calculator — Grades With Weights",
      desc: "Calculate a weighted average from scores and percentage weights (weights should total 100).",
      card: "Weighted average calculator",
      cardDesc: "Weighted mean of scores.",
      body: `<h1>Weighted average calculator</h1>${ad}
<div class="tool-panel">
<div id="rows"></div>
<button type="button" id="add">Add item</button>
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
var rows=document.getElementById('rows');
function addRow(s,w){
  var d=document.createElement('div');
  d.style.marginBottom='0.5rem';
  d.innerHTML='<input class="sc" type="number" min="0" max="100" value="'+(s??85)+'" style="width:4.5rem" placeholder="Score" /> <input class="wt" type="number" min="0" max="100" value="'+(w??20)+'" style="width:4rem" placeholder="Weight %" />';
  rows.appendChild(d);
}
addRow(92,30); addRow(78,20); addRow(88,50);
document.getElementById('add').onclick=function(){ addRow(0,0); };
document.getElementById('go').onclick=function(){
  var wSum=0, tot=0;
  [].forEach.call(document.querySelectorAll('#rows > div'),function(d){
    var sc=Number(d.querySelector('.sc').value)||0;
    var wt=Number(d.querySelector('.wt').value)||0;
    wSum+=wt; tot+=sc*wt;
  });
  if(wSum<=0){ document.getElementById('out').textContent='Add weights.'; return; }
  var avg=tot/wSum;
  document.getElementById('out').textContent='Weighted average '+avg.toFixed(2)+'% (weights sum '+wSum+'%)';
  ${done}
};
</script>`,
    },
    {
      path: "/class-rank-calculator.html",
      file: "class-rank-calculator.html",
      category: "student",
      title: "Class Rank Calculator — Percentile From Rank",
      desc: "Find your class percentile from rank and class size. Useful for college and scholarship forms.",
      card: "Class rank calculator",
      cardDesc: "Rank to percentile in class.",
      body: `<h1>Class rank calculator</h1>${ad}
<div class="tool-panel">
<label for="rank">Your rank (1 = top)</label><input id="rank" type="number" min="1" value="12" />
<label for="size">Students in class</label><input id="size" type="number" min="1" value="120" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  var rank=Number(document.getElementById('rank').value);
  var size=Number(document.getElementById('size').value);
  if(rank<1||rank>size){ document.getElementById('out').textContent='Rank must be between 1 and class size.'; return; }
  var pct=100*(size-rank+1)/size;
  var top=100*rank/size;
  document.getElementById('out').textContent=Math.round(pct*100)/100+' percentile · top '+top.toFixed(1)+'% of class (rank '+rank+' of '+size+')';
  ${done}
};
</script>`,
    },
  ];
}