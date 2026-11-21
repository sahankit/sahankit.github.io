/** Batch 44: high-search calculators from top SERP lists (margin, BMR, volume, math, health, FIRE). */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch44Tools(ad) {
  return [
    {
      path: "/margin-calculator.html",
      file: "margin-calculator.html",
      category: "calculators",
      title: "Margin Calculator — Profit Margin & Markup",
      desc: "Calculate profit margin percent, markup, and profit from cost and selling price.",
      card: "Margin calculator",
      cardDesc: "Profit margin from cost and price.",
      body: `<h1>Margin calculator</h1>${ad}
<div class="tool-panel">
<label for="cost">Cost</label><input id="cost" type="number" step="0.01" value="40" />
<label for="price">Selling price</label><input id="price" type="number" step="0.01" value="79.99" />
<button type="button" class="primary" id="go">Calculate margin</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const cost=Number(document.getElementById('cost').value)||0;
  const price=Number(document.getElementById('price').value)||0;
  if(price<=0){ document.getElementById('out').textContent='Enter a selling price.'; return; }
  const profit=price-cost;
  const margin=profit/price*100;
  const markup=cost>0?profit/cost*100:0;
  document.getElementById('out').textContent='Margin '+margin.toFixed(2)+'% · markup '+markup.toFixed(2)+'% · profit '+profit.toFixed(2);
  ${done}
};
</script>`,
    },
    {
      path: "/discount-calculator.html",
      file: "discount-calculator.html",
      category: "calculators",
      title: "Discount Calculator — Sale Price After Percent Off",
      desc: "Calculate price after a percent discount and amount saved.",
      card: "Discount calculator",
      cardDesc: "Price after % off.",
      body: `<h1>Discount calculator</h1>${ad}
<div class="tool-panel">
<label for="price">Original price</label><input id="price" type="number" step="0.01" value="129.99" />
<label for="off">Discount (%)</label><input id="off" type="number" step="0.1" value="25" />
<button type="button" class="primary" id="go">Sale price</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const price=Number(document.getElementById('price').value)||0;
  const off=Number(document.getElementById('off').value)/100;
  const sale=price*(1-off);
  document.getElementById('out').textContent='Sale price '+sale.toFixed(2)+' · save '+(price-sale).toFixed(2)+' ('+(off*100).toFixed(1)+'% off)';
  ${done}
};
</script>`,
    },
    {
      path: "/volume-calculator.html",
      file: "volume-calculator.html",
      category: "calculators",
      title: "Volume Calculator — Box & Cylinder",
      desc: "Calculate volume of a rectangular box or cylinder from dimensions.",
      card: "Volume calculator",
      cardDesc: "Box or cylinder volume.",
      body: `<h1>Volume calculator</h1>${ad}
<div class="tool-panel">
<label for="shape">Shape</label>
<select id="shape"><option value="box" selected>Box (L×W×H)</option><option value="cyl">Cylinder (r×h)</option></select>
<div id="box">
<label for="l">Length</label><input id="l" type="number" value="12" />
<label for="w">Width</label><input id="w" type="number" value="8" />
<label for="h">Height</label><input id="h" type="number" value="6" />
</div>
<div id="cyl" hidden>
<label for="r">Radius</label><input id="r" type="number" value="5" />
<label for="ch">Height</label><input id="ch" type="number" value="10" />
</div>
<button type="button" class="primary" id="go">Volume</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
const shape=document.getElementById('shape');
shape.onchange=function(){
  document.getElementById('box').hidden=shape.value!=='box';
  document.getElementById('cyl').hidden=shape.value!=='cyl';
};
document.getElementById('go').onclick=function(){
  let v=0;
  if(shape.value==='box'){
    v=Number(document.getElementById('l').value)*Number(document.getElementById('w').value)*Number(document.getElementById('h').value);
  }else{
    const r=Number(document.getElementById('r').value);
    v=Math.PI*r*r*Number(document.getElementById('ch').value);
  }
  document.getElementById('out').textContent='Volume ≈ '+v.toFixed(2)+' cubic units';
  ${done}
};
</script>`,
    },
    {
      path: "/calorie-calculator.html",
      file: "calorie-calculator.html",
      category: "calculators",
      title: "Calorie Calculator — Daily Calories (Mifflin-St Jeor)",
      desc: "Estimate daily calorie needs for weight maintenance from age, sex, weight, height, and activity.",
      card: "Calorie calculator",
      cardDesc: "Daily maintenance calories.",
      body: `<h1>Calorie calculator</h1>${ad}
<div class="tool-panel">
<label for="sex">Sex</label><select id="sex"><option value="m">Male</option><option value="f">Female</option></select>
<label for="age">Age (years)</label><input id="age" type="number" value="30" />
<label for="kg">Weight (kg)</label><input id="kg" type="number" step="0.1" value="72" />
<label for="cm">Height (cm)</label><input id="cm" type="number" value="175" />
<label for="act">Activity</label>
<select id="act">
<option value="1.2">Sedentary</option>
<option value="1.375">Light exercise</option>
<option value="1.55" selected>Moderate</option>
<option value="1.725">Very active</option>
<option value="1.9">Athlete</option>
</select>
<button type="button" class="primary" id="go">Daily calories</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const m=document.getElementById('sex').value==='m';
  const kg=Number(document.getElementById('kg').value);
  const cm=Number(document.getElementById('cm').value);
  const age=Number(document.getElementById('age').value);
  let bmr=10*kg+6.25*cm-5*age+(m?5:-161);
  const tdee=bmr*Number(document.getElementById('act').value);
  document.getElementById('out').textContent='About '+Math.round(tdee)+' kcal/day to maintain · BMR '+Math.round(bmr)+' kcal';
  ${done}
};
</script>`,
    },
    {
      path: "/bmr-calculator.html",
      file: "bmr-calculator.html",
      category: "calculators",
      title: "BMR Calculator — Basal Metabolic Rate",
      desc: "Calculate basal metabolic rate in calories per day using the Mifflin-St Jeor equation.",
      card: "BMR calculator",
      cardDesc: "Basal metabolic rate.",
      body: `<h1>BMR calculator</h1>${ad}
<div class="tool-panel">
<label for="sex">Sex</label><select id="sex"><option value="m">Male</option><option value="f">Female</option></select>
<label for="age">Age</label><input id="age" type="number" value="28" />
<label for="kg">Weight (kg)</label><input id="kg" type="number" value="68" />
<label for="cm">Height (cm)</label><input id="cm" type="number" value="165" />
<button type="button" class="primary" id="go">Calculate BMR</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const m=document.getElementById('sex').value==='m';
  const bmr=10*Number(document.getElementById('kg').value)+6.25*Number(document.getElementById('cm').value)-5*Number(document.getElementById('age').value)+(m?5:-161);
  document.getElementById('out').textContent='BMR ≈ '+Math.round(bmr)+' calories per day at rest';
  ${done}
};
</script>`,
    },
    {
      path: "/percentage-change-calculator.html",
      file: "percentage-change-calculator.html",
      category: "calculators",
      title: "Percentage Change Calculator",
      desc: "Find percent increase or decrease from old value to new value.",
      card: "Percentage change",
      cardDesc: "% increase or decrease.",
      body: `<h1>Percentage change calculator</h1>${ad}
<div class="tool-panel">
<label for="old">Old value</label><input id="old" type="number" value="80" />
<label for="nw">New value</label><input id="nw" type="number" value="92" />
<button type="button" class="primary" id="go">Percent change</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const o=Number(document.getElementById('old').value);
  const n=Number(document.getElementById('nw').value);
  if(o===0){ document.getElementById('out').textContent='Old value cannot be 0.'; return; }
  const p=((n-o)/Math.abs(o))*100;
  document.getElementById('out').textContent=(p>=0?'Increase ':'Decrease ')+Math.abs(p).toFixed(2)+'% ('+o+' → '+n+')';
  ${done}
};
</script>`,
    },
    {
      path: "/percentage-difference-calculator.html",
      file: "percentage-difference-calculator.html",
      category: "calculators",
      title: "Percentage Difference Calculator",
      desc: "Calculate percent difference between two values (relative to their average).",
      card: "Percentage difference",
      cardDesc: "% diff between two numbers.",
      body: `<h1>Percentage difference calculator</h1>${ad}
<div class="tool-panel">
<label for="a">Value A</label><input id="a" type="number" value="45" />
<label for="b">Value B</label><input id="b" type="number" value="52" />
<button type="button" class="primary" id="go">Difference</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const a=Number(document.getElementById('a').value);
  const b=Number(document.getElementById('b').value);
  const avg=(a+b)/2;
  if(!avg){ document.getElementById('out').textContent='Enter non-zero values.'; return; }
  const p=Math.abs(a-b)/avg*100;
  document.getElementById('out').textContent='Difference '+p.toFixed(2)+'% between '+a+' and '+b;
  ${done}
};
</script>`,
    },
    {
      path: "/square-root-calculator.html",
      file: "square-root-calculator.html",
      category: "calculators",
      title: "Square Root Calculator",
      desc: "Compute the square root of a number.",
      card: "Square root",
      cardDesc: "√x online.",
      body: `<h1>Square root calculator</h1>${ad}
<div class="tool-panel">
<label for="n">Number</label><input id="n" type="number" step="any" value="144" />
<button type="button" class="primary" id="go">Square root</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const n=Number(document.getElementById('n').value);
  if(n<0){ document.getElementById('out').textContent='Enter a non-negative number for real square root.'; return; }
  document.getElementById('out').textContent='√'+n+' = '+Math.sqrt(n);
  ${done}
};
</script>`,
    },
    {
      path: "/standard-deviation-calculator.html",
      file: "standard-deviation-calculator.html",
      category: "calculators",
      title: "Standard Deviation Calculator",
      desc: "Calculate sample standard deviation and variance from a list of numbers.",
      card: "Standard deviation",
      cardDesc: "SD and variance.",
      body: `<h1>Standard deviation calculator</h1>${ad}
<div class="tool-panel">
<label for="nums">Numbers (comma or space separated)</label>
<textarea id="nums" rows="3">12, 15, 18, 20, 22, 25, 30</textarea>
<button type="button" class="primary" id="go">Calculate SD</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const arr=document.getElementById('nums').value.split(/[,\\s]+/).map(Number).filter(n=>!Number.isNaN(n));
  if(arr.length<2){ document.getElementById('out').textContent='Enter at least 2 numbers.'; return; }
  const mean=arr.reduce((a,b)=>a+b,0)/arr.length;
  const varSample=arr.reduce((s,x)=>s+(x-mean)**2,0)/(arr.length-1);
  const sd=Math.sqrt(varSample);
  document.getElementById('out').textContent='Sample SD '+sd.toFixed(4)+' · variance '+varSample.toFixed(4)+' · mean '+mean.toFixed(4)+' (n='+arr.length+')';
  ${done}
};
</script>`,
    },
    {
      path: "/mean-median-mode-calculator.html",
      file: "mean-median-mode-calculator.html",
      category: "calculators",
      title: "Mean Median Mode Calculator",
      desc: "Find mean, median, mode, and range from a data set.",
      card: "Mean median mode",
      cardDesc: "Statistics summary.",
      body: `<h1>Mean median mode calculator</h1>${ad}
<div class="tool-panel">
<label for="nums">Numbers</label>
<textarea id="nums" rows="3">3, 5, 5, 7, 9, 11, 5</textarea>
<button type="button" class="primary" id="go">Summarize</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const arr=document.getElementById('nums').value.split(/[,\\s]+/).map(Number).filter(n=>!Number.isNaN(n)).sort((a,b)=>a-b);
  if(!arr.length){ document.getElementById('out').textContent='Enter numbers.'; return; }
  const mean=arr.reduce((a,b)=>a+b,0)/arr.length;
  const mid=Math.floor(arr.length/2);
  const median=arr.length%2?arr[mid]:(arr[mid-1]+arr[mid])/2;
  const freq={};
  arr.forEach(n=>{ freq[n]=(freq[n]||0)+1; });
  const maxF=Math.max(...Object.values(freq));
  const mode=Object.keys(freq).filter(k=>freq[k]===maxF).join(', ');
  const range=arr[arr.length-1]-arr[0];
  document.getElementById('out').textContent='Mean '+mean.toFixed(4)+' · median '+median+' · mode '+mode+' · range '+range;
  ${done}
};
</script>`,
    },
    {
      path: "/time-card-calculator.html",
      file: "time-card-calculator.html",
      category: "productivity",
      title: "Time Card Calculator — Work Hours",
      desc: "Calculate total hours worked from clock-in and clock-out times, minus break minutes.",
      card: "Time card calculator",
      cardDesc: "Hours on a shift.",
      body: `<h1>Time card calculator</h1>${ad}
<div class="tool-panel">
<label for="in">Clock in</label><input id="in" type="time" value="09:00" />
<label for="out">Clock out</label><input id="out" type="time" value="17:30" />
<label for="br">Break (minutes)</label><input id="br" type="number" value="30" />
<button type="button" class="primary" id="go">Hours worked</button>
<p id="out2" class="tool-feedback" role="status"></p>
</div>
<script>
function mins(t){ const p=t.split(':'); return Number(p[0])*60+Number(p[1]); }
document.getElementById('go').onclick=function(){
  let diff=mins(document.getElementById('out').value)-mins(document.getElementById('in').value);
  if(diff<0) diff+=24*60;
  diff-=Number(document.getElementById('br').value)||0;
  const h=Math.floor(diff/60), m=diff%60;
  document.getElementById('out2').textContent=h+' h '+m+' min ('+(diff/60).toFixed(2)+' hours)';
  ${done}
};
</script>`,
    },
    {
      path: "/days-between-dates-calculator.html",
      file: "days-between-dates-calculator.html",
      category: "productivity",
      title: "Days Between Dates Calculator",
      desc: "Count days, weeks, and months between two calendar dates.",
      card: "Days between dates",
      cardDesc: "Date difference.",
      body: `<h1>Days between dates</h1>${ad}
<div class="tool-panel">
<label for="d1">Start date</label><input id="d1" type="date" />
<label for="d2">End date</label><input id="d2" type="date" />
<button type="button" class="primary" id="go">Count days</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
const today=new Date().toISOString().slice(0,10);
document.getElementById('d1').value=today;
document.getElementById('d2').value=today;
document.getElementById('go').onclick=function(){
  const a=new Date(document.getElementById('d1').value+'T12:00:00');
  const b=new Date(document.getElementById('d2').value+'T12:00:00');
  const days=Math.round(Math.abs(b-a)/86400000);
  document.getElementById('out').textContent=days+' days · '+(days/7).toFixed(2)+' weeks · about '+(days/30.44).toFixed(1)+' months';
  ${done}
};
</script>`,
    },
    {
      path: "/pregnancy-due-date-calculator.html",
      file: "pregnancy-due-date-calculator.html",
      category: "calculators",
      title: "Pregnancy Due Date Calculator",
      desc: "Estimate due date from last menstrual period (LMP) using Naegele's rule.",
      card: "Pregnancy due date",
      cardDesc: "Due date from LMP.",
      body: `<h1>Pregnancy due date calculator</h1>${ad}
<div class="tool-panel">
<label for="lmp">First day of last period (LMP)</label><input id="lmp" type="date" />
<button type="button" class="primary" id="go">Due date</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Adds 280 days (40 weeks) to LMP. Ultrasound dating may differ—confirm with your clinician.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const lmp=new Date(document.getElementById('lmp').value+'T12:00:00');
  if(Number.isNaN(lmp.getTime())){ document.getElementById('out').textContent='Choose LMP date.'; return; }
  const due=new Date(lmp); due.setDate(due.getDate()+280);
  const now=new Date(); const days=Math.floor((now-lmp)/86400000);
  const weeks=Math.floor(days/7);
  document.getElementById('out').textContent='Estimated due '+due.toDateString()+' · about '+weeks+' weeks since LMP';
  ${done}
};
</script>`,
    },
    {
      path: "/blood-alcohol-calculator.html",
      file: "blood-alcohol-calculator.html",
      category: "calculators",
      title: "Blood Alcohol Calculator — BAC Estimate",
      desc: "Rough blood alcohol estimate from drinks, weight, and time. Not for driving decisions.",
      card: "Blood alcohol (BAC)",
      cardDesc: "Estimated BAC.",
      body: `<h1>Blood alcohol calculator</h1>${ad}
<div class="tool-panel">
<label for="drinks">Standard drinks</label><input id="drinks" type="number" step="0.5" value="2" />
<label for="kg">Weight (kg)</label><input id="kg" type="number" value="75" />
<label for="sex">Sex</label><select id="sex"><option value="0.68">Male</option><option value="0.55">Female</option></select>
<label for="hrs">Hours since first drink</label><input id="hrs" type="number" step="0.25" value="1" />
<button type="button" class="primary" id="go">Estimate BAC</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Estimate only. Do not drive if impaired. Metabolism ~0.015%/hr assumed.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const r=Number(document.getElementById('sex').value);
  const grams=Number(document.getElementById('drinks').value)*14;
  const bac=(grams/(Number(document.getElementById('kg').value)*r*10))-Number(document.getElementById('hrs').value)*0.015;
  const b=Math.max(0,bac);
  document.getElementById('out').textContent='Estimated BAC ≈ '+(b*100).toFixed(3)+'%';
  ${done}
};
</script>`,
    },
    {
      path: "/investment-calculator.html",
      file: "investment-calculator.html",
      category: "calculators",
      title: "Investment Calculator — Future Value With Contributions",
      desc: "Project investment growth with initial deposit, monthly contributions, annual return, and years.",
      card: "Investment calculator",
      cardDesc: "Future value with monthly adds.",
      body: `<h1>Investment calculator</h1>${ad}
<div class="tool-panel">
<label for="init">Starting amount</label><input id="init" type="number" value="5000" />
<label for="mon">Monthly contribution</label><input id="mon" type="number" value="300" />
<label for="rate">Expected return (% / year)</label><input id="rate" type="number" step="0.1" value="7" />
<label for="yr">Years</label><input id="yr" type="number" value="20" />
<button type="button" class="primary" id="go">Project growth</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const P=Number(document.getElementById('init').value)||0;
  const PMT=Number(document.getElementById('mon').value)||0;
  const r=Number(document.getElementById('rate').value)/100/12;
  const n=Number(document.getElementById('yr').value)*12;
  const fv=P*Math.pow(1+r,n)+PMT*(r?((Math.pow(1+r,n)-1)/r):n);
  const contributed=P+PMT*n;
  document.getElementById('out').textContent='Future value ≈ '+fv.toFixed(0)+' · contributed '+contributed.toFixed(0)+' · growth '+(fv-contributed).toFixed(0);
  ${done}
};
</script>`,
    },
    {
      path: "/roof-pitch-calculator.html",
      file: "roof-pitch-calculator.html",
      category: "calculators",
      title: "Roof Pitch Calculator — Rise, Run, Angle",
      desc: "Calculate roof pitch, slope percent, and angle in degrees from rise and run.",
      card: "Roof pitch calculator",
      cardDesc: "Pitch from rise &amp; run.",
      body: `<h1>Roof pitch calculator</h1>${ad}
<div class="tool-panel">
<label for="rise">Rise (inches)</label><input id="rise" type="number" value="6" />
<label for="run">Run (inches, often 12)</label><input id="run" type="number" value="12" />
<button type="button" class="primary" id="go">Pitch</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const rise=Number(document.getElementById('rise').value);
  const run=Number(document.getElementById('run').value)||12;
  const deg=Math.atan(rise/run)*180/Math.PI;
  const pct=rise/run*100;
  document.getElementById('out').textContent='Pitch '+rise+'/'+run+' ('+pct.toFixed(1)+'% slope) · angle '+deg.toFixed(2)+'°';
  ${done}
};
</script>`,
    },
    {
      path: "/coast-fire-calculator.html",
      file: "coast-fire-calculator.html",
      category: "calculators",
      title: "Coast FIRE Calculator — Coasting to Retirement",
      desc: "Estimate portfolio needed today so it can grow to a retirement goal with no further savings (Coast FIRE).",
      card: "Coast FIRE calculator",
      cardDesc: "Coast to financial independence.",
      body: `<h1>Coast FIRE calculator</h1>${ad}
<div class="tool-panel">
<label for="target">Retirement portfolio goal</label><input id="target" type="number" value="1000000" />
<label for="yr">Years until retirement</label><input id="yr" type="number" value="20" />
<label for="rate">Expected return (% / year)</label><input id="rate" type="number" step="0.1" value="7" />
<button type="button" class="primary" id="go">Coast number</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Amount needed now so it compounds to your goal with no more contributions.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const FV=Number(document.getElementById('target').value);
  const n=Number(document.getElementById('yr').value);
  const r=Number(document.getElementById('rate').value)/100;
  const pv=FV/Math.pow(1+r,n);
  document.getElementById('out').textContent='Coast FIRE ≈ '+pv.toFixed(0)+' today to reach '+FV.toLocaleString()+' in '+n+' years at '+(r*100).toFixed(1)+'%';
  ${done}
};
</script>`,
    },
    {
      path: "/hourly-to-salary-calculator.html",
      file: "hourly-to-salary-calculator.html",
      category: "calculators",
      title: "Hourly to Salary Calculator — Annual Income",
      desc: "Convert hourly wage to annual salary from hours per week and weeks per year.",
      card: "Hourly to salary",
      cardDesc: "Annual pay from hourly wage.",
      body: `<h1>Hourly to salary calculator</h1>${ad}
<div class="tool-panel">
<label for="hr">Hourly wage</label><input id="hr" type="number" step="0.01" value="28.5" />
<label for="wks">Hours per week</label><input id="wks" type="number" value="40" />
<label for="weeks">Weeks per year</label><input id="weeks" type="number" value="52" />
<button type="button" class="primary" id="go">Annual salary</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const ann=Number(document.getElementById('hr').value)*Number(document.getElementById('wks').value)*Number(document.getElementById('weeks').value);
  document.getElementById('out').textContent='Annual salary ≈ '+ann.toFixed(0)+' · monthly '+(ann/12).toFixed(0);
  ${done}
};
</script>`,
    },
    {
      path: "/etsy-fee-calculator.html",
      file: "etsy-fee-calculator.html",
      category: "calculators",
      title: "Etsy Fee Calculator — Listing & Transaction Fees",
      desc: "Estimate Etsy seller fees: listing, transaction percent, and payment processing on an order.",
      card: "Etsy fee calculator",
      cardDesc: "Seller fees on a sale.",
      body: `<h1>Etsy fee calculator</h1>${ad}
<div class="tool-panel">
<label for="price">Item price</label><input id="price" type="number" step="0.01" value="34.99" />
<label for="ship">Shipping charged to buyer</label><input id="ship" type="number" value="5.99" />
<label for="cur">Currency</label><select id="cur"><option value="usd">USD</option><option value="eur">EUR</option><option value="gbp">GBP</option></select>
<button type="button" class="primary" id="go">Etsy fees</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Uses typical rates: $0.20 listing, 6.5% transaction on item+shipping, ~3% + $0.25 processing (US). Etsy changes fees—verify on Etsy.com.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const price=Number(document.getElementById('price').value)||0;
  const ship=Number(document.getElementById('ship').value)||0;
  const sub=price+ship;
  const listing=0.20;
  const txn=sub*0.065;
  const proc=sub*0.03+0.25;
  const fees=listing+txn+proc;
  document.getElementById('out').textContent='Fees ~'+fees.toFixed(2)+' · you keep ~'+(sub-fees).toFixed(2)+' on '+sub.toFixed(2)+' order';
  ${done}
};
</script>`,
    },
  ];
}