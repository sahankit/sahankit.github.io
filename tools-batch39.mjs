/** Batch 39: high-search finance, student and health calculators not already on the site. */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch39Tools(ad) {
  return [
    {
      path: "/paycheck-calculator.html",
      file: "paycheck-calculator.html",
      category: "calculators",
      title: "Paycheck Calculator — Estimate Net Pay After Taxes",
      desc: "Rough net pay from gross wages, federal and state tax rates, optional 401(k) deferral, and FICA. Not a substitute for your employer's payroll stub.",
      card: "Paycheck calculator",
      cardDesc: "Gross to net pay estimate.",
      body: `<h1>Paycheck calculator</h1>${ad}
<div class="tool-panel">
<label for="gross">Gross pay this period ($)</label><input id="gross" type="number" min="0" step="0.01" value="3500" />
<label for="fed">Federal income tax (%)</label><input id="fed" type="number" min="0" max="50" step="0.1" value="12" />
<label for="state">State income tax (%)</label><input id="state" type="number" min="0" max="20" step="0.1" value="5" />
<label for="k401">401(k) deferral (% of gross)</label><input id="k401" type="number" min="0" max="100" step="0.5" value="6" />
<button type="button" class="primary" id="go">Estimate net pay</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">FICA uses 7.65% on gross in this estimate (6.2% Social Security + 1.45% Medicare). Real withholding follows IRS tables, pre-tax benefits, and wage caps.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const gross=Number(document.getElementById('gross').value);
  const fed=Number(document.getElementById('fed').value)/100;
  const st=Number(document.getElementById('state').value)/100;
  const k401=Number(document.getElementById('k401').value)/100;
  if(!(gross>=0)){ document.getElementById('out').textContent='Enter a gross amount.'; return; }
  const defer=gross*k401;
  const taxable=gross-defer;
  const federal=taxable*fed;
  const state=taxable*st;
  const fica=gross*0.0765;
  const net=gross-defer-federal-state-fica;
  const usd=function(n){return '$'+n.toFixed(2);};
  document.getElementById('out').textContent='Net about '+usd(net)+' · federal '+usd(federal)+' · state '+usd(state)+' · FICA '+usd(fica)+(defer>0?' · 401(k) '+usd(defer):'');
  ${done}
};
</script>`,
    },
    {
      path: "/amortization-calculator.html",
      file: "amortization-calculator.html",
      category: "calculators",
      title: "Amortization Calculator — Loan Payment and Interest",
      desc: "Monthly payment, total interest, and a short amortization schedule for a fixed-rate loan.",
      card: "Amortization calculator",
      cardDesc: "Loan payment and interest schedule.",
      body: `<h1>Amortization calculator</h1>${ad}
<div class="tool-panel">
<label for="principal">Loan amount ($)</label><input id="principal" type="number" min="1" value="250000" />
<label for="rate">Annual interest rate (%)</label><input id="rate" type="number" min="0" step="0.01" value="6.5" />
<label for="years">Term (years)</label><input id="years" type="number" min="1" max="40" value="30" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
<pre id="table" class="tool-hint" style="white-space:pre-wrap;font-size:0.9em"></pre>
</div>
<script>
function pmt(p,annual,yrs){
  const r=annual/100/12;
  const n=yrs*12;
  if(r===0) return p/n;
  return p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
}
document.getElementById('go').onclick=function(){
  const p=Number(document.getElementById('principal').value);
  const annual=Number(document.getElementById('rate').value);
  const yrs=Number(document.getElementById('years').value);
  if(!(p>0)||!(yrs>0)){ document.getElementById('out').textContent='Enter a loan amount and term.'; return; }
  const pay=pmt(p,annual,yrs);
  const r=annual/100/12;
  const n=yrs*12;
  let bal=p, totalInt=0, lines=['Month · Payment · Interest · Principal · Balance'];
  for(let i=1;i<=Math.min(n,12);i++){
    const interest=bal*r;
    const principal=pay-interest;
    bal=Math.max(0,bal-principal);
    totalInt+=interest;
    lines.push(i+' · $'+pay.toFixed(2)+' · $'+interest.toFixed(2)+' · $'+principal.toFixed(2)+' · $'+bal.toFixed(2));
  }
  const fullInt=n*pay-p;
  document.getElementById('out').textContent='Payment $'+pay.toFixed(2)+'/mo · total interest $'+fullInt.toFixed(2)+' over '+n+' months';
  document.getElementById('table').textContent=lines.join('\\n')+(n>12?'\\n… first 12 months shown.':'');
  ${done}
};
</script>`,
    },
    {
      path: "/student-loan-calculator.html",
      file: "student-loan-calculator.html",
      category: "calculators",
      title: "Student Loan Calculator — Monthly Payment and Payoff",
      desc: "Estimate the monthly payment and total interest on a student loan balance at a fixed annual rate.",
      card: "Student loan calculator",
      cardDesc: "Payment on a student loan balance.",
      body: `<h1>Student loan calculator</h1>${ad}
<div class="tool-panel">
<label for="bal">Loan balance ($)</label><input id="bal" type="number" min="1" value="32000" />
<label for="rate">Annual interest rate (%)</label><input id="rate" type="number" min="0" step="0.01" value="5.5" />
<label for="years">Repayment (years)</label><input id="years" type="number" min="1" max="30" value="10" />
<button type="button" class="primary" id="go">Calculate payment</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const p=Number(document.getElementById('bal').value);
  const annual=Number(document.getElementById('rate').value);
  const yrs=Number(document.getElementById('years').value);
  if(!(p>0)||!(yrs>0)){ document.getElementById('out').textContent='Enter balance and years.'; return; }
  const r=annual/100/12;
  const n=yrs*12;
  const pay=r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  const total=pay*n;
  document.getElementById('out').textContent='Payment $'+pay.toFixed(2)+'/mo · total paid $'+total.toFixed(2)+' · interest $'+(total-p).toFixed(2);
  ${done}
};
</script>`,
    },
    {
      path: "/401k-calculator.html",
      file: "401k-calculator.html",
      category: "calculators",
      title: "401(k) Calculator — Growth With Employer Match",
      desc: "Project a 401(k) balance from monthly contributions, employer match, years to retire, and expected annual return.",
      card: "401(k) calculator",
      cardDesc: "Retirement account growth estimate.",
      body: `<h1>401(k) calculator</h1>${ad}
<div class="tool-panel">
<label for="monthly">Your monthly contribution ($)</label><input id="monthly" type="number" min="0" value="500" />
<label for="match">Employer match (% of your contribution)</label><input id="match" type="number" min="0" max="200" value="50" />
<label for="years">Years until retirement</label><input id="years" type="number" min="1" max="50" value="25" />
<label for="ret">Expected annual return (%)</label><input id="ret" type="number" min="0" max="20" step="0.1" value="7" />
<label for="start">Current balance ($)</label><input id="start" type="number" min="0" value="12000" />
<button type="button" class="primary" id="go">Project balance</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const m=Number(document.getElementById('monthly').value);
  const matchPct=Number(document.getElementById('match').value)/100;
  const yrs=Number(document.getElementById('years').value);
  const annual=Number(document.getElementById('ret').value)/100;
  const start=Number(document.getElementById('start').value)||0;
  const contrib=m*(1+matchPct);
  const r=annual/12;
  const n=yrs*12;
  const fvContrib=r===0?contrib*n:contrib*((Math.pow(1+r,n)-1)/r);
  const fvStart=start*Math.pow(1+r,n);
  const total=fvStart+fvContrib;
  const contributed=start+m*n+matchPct*m*n;
  document.getElementById('out').textContent='About $'+total.toFixed(0).toLocaleString('en-US')+' in '+yrs+' years · you put in $'+(m*n).toFixed(0)+' · employer match about $'+(matchPct*m*n).toFixed(0);
  ${done}
};
</script>`,
    },
    {
      path: "/roth-ira-calculator.html",
      file: "roth-ira-calculator.html",
      category: "calculators",
      title: "Roth IRA Calculator — Tax-Free Growth Projection",
      desc: "Estimate how a Roth IRA could grow from annual contributions and an expected rate of return.",
      card: "Roth IRA calculator",
      cardDesc: "Tax-free retirement savings growth.",
      body: `<h1>Roth IRA calculator</h1>${ad}
<div class="tool-panel">
<label for="annual">Annual contribution ($)</label><input id="annual" type="number" min="0" value="7000" />
<label for="years">Years</label><input id="years" type="number" min="1" max="50" value="30" />
<label for="ret">Expected annual return (%)</label><input id="ret" type="number" min="0" max="20" step="0.1" value="7" />
<label for="start">Current balance ($)</label><input id="start" type="number" min="0" value="0" />
<button type="button" class="primary" id="go">Project balance</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">IRS contribution limits change each year. This calculator does not test age or income phase-outs.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const annual=Number(document.getElementById('annual').value);
  const yrs=Number(document.getElementById('years').value);
  const ret=Number(document.getElementById('ret').value)/100;
  const start=Number(document.getElementById('start').value)||0;
  const r=ret;
  const fvStart=start*Math.pow(1+r,yrs);
  const fvAnn=r===0?annual*yrs:annual*((Math.pow(1+r,yrs)-1)/r);
  const total=fvStart+fvAnn;
  document.getElementById('out').textContent='About $'+total.toFixed(0).toLocaleString('en-US')+' · contributions $'+(annual*yrs+start).toFixed(0)+' · growth $'+(total-annual*yrs-start).toFixed(0);
  ${done}
};
</script>`,
    },
    {
      path: "/coast-fire-calculator.html",
      file: "coast-fire-calculator.html",
      category: "calculators",
      title: "Coast FIRE Calculator — When You Can Stop Saving",
      desc: "See whether invested assets are enough to grow to your FIRE number without more contributions, or how many years of saving remain at your current rate.",
      card: "Coast FIRE calculator",
      cardDesc: "Financial independence coast point.",
      body: `<h1>Coast FIRE calculator</h1>${ad}
<div class="tool-panel">
<label for="spend">Annual spending in retirement ($)</label><input id="spend" type="number" min="1" value="50000" />
<label for="swr">Safe withdrawal rate (%)</label><input id="swr" type="number" min="1" max="10" step="0.1" value="4" />
<label for="assets">Invested assets today ($)</label><input id="assets" type="number" min="0" value="180000" />
<label for="monthly">Monthly savings ($)</label><input id="monthly" type="number" min="0" value="1500" />
<label for="ret">Expected annual return (%)</label><input id="ret" type="number" min="0" max="15" step="0.1" value="7" />
<label for="years">Years until traditional retirement age</label><input id="years" type="number" min="1" max="50" value="15" />
<button type="button" class="primary" id="go">Check coast FIRE</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const spend=Number(document.getElementById('spend').value);
  const swr=Number(document.getElementById('swr').value)/100;
  const assets=Number(document.getElementById('assets').value);
  const monthly=Number(document.getElementById('monthly').value);
  const annualRet=Number(document.getElementById('ret').value)/100;
  const yrs=Number(document.getElementById('years').value);
  const target=spend/swr;
  const r=annualRet/12;
  const n=yrs*12;
  let fv=assets;
  for(let i=0;i<n;i++){ fv=fv*(1+r)+monthly; }
  const coastNow=assets*Math.pow(1+annualRet,yrs)>=target;
  const needCoast=target/Math.pow(1+annualRet,yrs);
  let msg='FIRE number about $'+target.toFixed(0).toLocaleString('en-US')+'. ';
  if(coastNow){ msg+='You are at or past Coast FIRE with today\\'s assets (no future savings needed for that number).'; }
  else if(fv>=target){ msg+='With $'+monthly+'/mo for '+yrs+' years, projected $'+fv.toFixed(0).toLocaleString('en-US')+' reaches the target.'; }
  else { msg+='Assets alone need about $'+needCoast.toFixed(0).toLocaleString('en-US')+' today to coast. Projected with savings: $'+fv.toFixed(0).toLocaleString('en-US')+'.'; }
  document.getElementById('out').textContent=msg;
  ${done}
};
</script>`,
    },
    {
      path: "/refinance-calculator.html",
      file: "refinance-calculator.html",
      category: "calculators",
      title: "Refinance Calculator — Compare Old and New Mortgage",
      desc: "Compare monthly payment and interest between your current mortgage and a refinanced loan for the remaining term.",
      card: "Refinance calculator",
      cardDesc: "Mortgage refinance savings estimate.",
      body: `<h1>Mortgage refinance calculator</h1>${ad}
<div class="tool-panel">
<label for="bal">Remaining loan balance ($)</label><input id="bal" type="number" min="1" value="280000" />
<label for="oldRate">Current rate (%)</label><input id="oldRate" type="number" min="0" step="0.01" value="7.25" />
<label for="newRate">New rate (%)</label><input id="newRate" type="number" min="0" step="0.01" value="6.0" />
<label for="years">Years left on loan</label><input id="years" type="number" min="1" max="40" value="28" />
<label for="cost">Refinance closing costs ($)</label><input id="cost" type="number" min="0" value="4000" />
<button type="button" class="primary" id="go">Compare loans</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function pmt(p,annual,yrs){ const r=annual/100/12; const n=yrs*12; if(!r) return p/n; return p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); }
document.getElementById('go').onclick=function(){
  const p=Number(document.getElementById('bal').value);
  const oldR=Number(document.getElementById('oldRate').value);
  const newR=Number(document.getElementById('newRate').value);
  const yrs=Number(document.getElementById('years').value);
  const cost=Number(document.getElementById('cost').value)||0;
  const n=yrs*12;
  const oldPay=pmt(p,oldR,yrs);
  const newPay=pmt(p,newR,yrs);
  const saveMo=oldPay-newPay;
  const saveLife=(oldPay-newPay)*n-cost;
  document.getElementById('out').textContent='Old $'+oldPay.toFixed(2)+'/mo · new $'+newPay.toFixed(2)+'/mo · save $'+saveMo.toFixed(2)+'/mo · life-of-loan savings after $'+cost+' costs about $'+saveLife.toFixed(0);
  ${done}
};
</script>`,
    },
    {
      path: "/car-payment-calculator.html",
      file: "car-payment-calculator.html",
      category: "calculators",
      title: "Car Payment Calculator — Auto Loan Monthly Payment",
      desc: "Estimate the monthly payment on a car loan from price, down payment, trade-in, APR, and loan term.",
      card: "Car payment calculator",
      cardDesc: "Auto loan monthly payment.",
      body: `<h1>Car payment calculator</h1>${ad}
<div class="tool-panel">
<label for="price">Vehicle price ($)</label><input id="price" type="number" min="0" value="32000" />
<label for="down">Down payment ($)</label><input id="down" type="number" min="0" value="5000" />
<label for="trade">Trade-in ($)</label><input id="trade" type="number" min="0" value="0" />
<label for="rate">APR (%)</label><input id="rate" type="number" min="0" step="0.01" value="6.9" />
<label for="years">Loan term (years)</label><input id="years" type="number" min="1" max="10" value="5" />
<button type="button" class="primary" id="go">Calculate payment</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const price=Number(document.getElementById('price').value);
  const down=Number(document.getElementById('down').value)||0;
  const trade=Number(document.getElementById('trade').value)||0;
  const apr=Number(document.getElementById('rate').value);
  const yrs=Number(document.getElementById('years').value);
  const loan=Math.max(0,price-down-trade);
  const r=apr/100/12;
  const n=yrs*12;
  const pay=r===0?loan/n:loan*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  document.getElementById('out').textContent='Loan amount $'+loan.toFixed(2)+' · payment about $'+pay.toFixed(2)+'/mo for '+n+' months';
  ${done}
};
</script>`,
    },
    {
      path: "/hourly-wage-calculator.html",
      file: "hourly-wage-calculator.html",
      category: "calculators",
      title: "Hourly Wage Calculator — Salary to Hourly and Back",
      desc: "Convert an annual salary to an hourly wage or an hourly rate to yearly pay. Uses 40 hours per week and 52 weeks unless you change them.",
      card: "Hourly wage calculator",
      cardDesc: "Salary ↔ hourly with custom hours.",
      body: `<h1>Hourly wage calculator</h1>${ad}
<div class="tool-panel">
<label for="mode">Convert</label>
<select id="mode"><option value="salary">Annual salary → hourly</option><option value="hourly">Hourly → annual salary</option></select>
<label for="amount">Amount ($)</label><input id="amount" type="number" min="0" step="0.01" value="65000" />
<label for="hours">Hours per week</label><input id="hours" type="number" min="1" max="80" value="40" />
<label for="weeks">Weeks per year</label><input id="weeks" type="number" min="1" max="52" value="52" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const mode=document.getElementById('mode').value;
  const amt=Number(document.getElementById('amount').value);
  const h=Number(document.getElementById('hours').value);
  const w=Number(document.getElementById('weeks').value);
  const annualHours=h*w;
  if(!(amt>=0)||!(annualHours>0)){ document.getElementById('out').textContent='Enter amount and hours.'; return; }
  if(mode==='salary'){
    const hourly=amt/annualHours;
    document.getElementById('out').textContent='$'+amt.toLocaleString('en-US')+'/year ≈ $'+hourly.toFixed(2)+'/hour ('+annualHours+' hours/year)';
  } else {
    const annual=amt*annualHours;
    document.getElementById('out').textContent='$'+amt.toFixed(2)+'/hour ≈ $'+annual.toLocaleString('en-US')+'/year';
  }
  ${done}
};
</script>`,
    },
    {
      path: "/unit-price-calculator.html",
      file: "unit-price-calculator.html",
      category: "calculators",
      title: "Unit Price Calculator — Compare Two Products",
      desc: "Compare price per unit for two package sizes to see which deal is cheaper per ounce, liter, or custom unit.",
      card: "Unit price calculator",
      cardDesc: "Which package is cheaper per unit.",
      body: `<h1>Unit price calculator</h1>${ad}
<div class="tool-panel">
<p><strong>Option A</strong></p>
<label for="priceA">Price ($)</label><input id="priceA" type="number" min="0" step="0.01" value="4.99" />
<label for="qtyA">Quantity (units)</label><input id="qtyA" type="number" min="0.001" step="0.001" value="12" />
<p><strong>Option B</strong></p>
<label for="priceB">Price ($)</label><input id="priceB" type="number" min="0" step="0.01" value="7.49" />
<label for="qtyB">Quantity (units)</label><input id="qtyB" type="number" min="0.001" step="0.001" value="24" />
<button type="button" class="primary" id="go">Compare</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const pA=Number(document.getElementById('priceA').value);
  const qA=Number(document.getElementById('qtyA').value);
  const pB=Number(document.getElementById('priceB').value);
  const qB=Number(document.getElementById('qtyB').value);
  if(!(qA>0)||!(qB>0)){ document.getElementById('out').textContent='Enter quantities greater than zero.'; return; }
  const uA=pA/qA, uB=pB/qB;
  const better=uA<uB?'A':'B';
  const pct=Math.abs(uA-uB)/Math.max(uA,uB)*100;
  document.getElementById('out').textContent='A $'+uA.toFixed(4)+'/unit · B $'+uB.toFixed(4)+'/unit · option '+better+' is cheaper by about '+pct.toFixed(1)+'% per unit';
  ${done}
};
</script>`,
    },
    {
      path: "/final-grade-calculator.html",
      file: "final-grade-calculator.html",
      category: "student",
      title: "Final Grade Calculator — Weighted Course Grade",
      desc: "Compute your course grade from weighted categories such as homework, midterms, and the final exam.",
      card: "Final grade calculator",
      cardDesc: "Weighted average course grade.",
      body: `<h1>Final grade calculator (weighted)</h1>${ad}
<div class="tool-panel">
<p class="tool-hint">Enter each category as percent grade and weight (weights should total 100).</p>
<div id="rows"></div>
<button type="button" id="add">Add category</button>
<button type="button" class="primary" id="go">Calculate grade</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
const rows=document.getElementById('rows');
function addRow(g,w){
  const d=document.createElement('div');
  d.style.marginBottom='0.5rem';
  d.innerHTML='<input type="number" class="g" min="0" max="100" value="'+(g??85)+'" placeholder="Grade %" style="width:5rem" /> <input type="number" class="w" min="0" max="100" value="'+(w??20)+'" placeholder="Weight %" style="width:5rem" />';
  rows.appendChild(d);
}
addRow(90,40); addRow(82,30); addRow(88,30);
document.getElementById('add').onclick=function(){ addRow(0,0); };
document.getElementById('go').onclick=function(){
  const gs=[].map.call(document.querySelectorAll('.g'),function(el){return Number(el.value);});
  const ws=[].map.call(document.querySelectorAll('.w'),function(el){return Number(el.value);});
  let wSum=0, weighted=0;
  for(let i=0;i<gs.length;i++){ wSum+=ws[i]||0; weighted+=(gs[i]||0)*(ws[i]||0); }
  if(!(wSum>0)){ document.getElementById('out').textContent='Add at least one weight.'; return; }
  const grade=weighted/wSum;
  document.getElementById('out').textContent='Course grade '+grade.toFixed(2)+'% (weights sum '+wSum+'%)';
  ${done}
};
</script>`,
    },
    {
      path: "/test-grade-calculator.html",
      file: "test-grade-calculator.html",
      category: "student",
      title: "Test Grade Calculator — Score Needed on the Final",
      desc: "Find the final exam score you need to reach a target course grade when the final has a fixed weight.",
      card: "Test grade calculator",
      cardDesc: "What you need on the final exam.",
      body: `<h1>What grade do I need on the final?</h1>${ad}
<div class="tool-panel">
<label for="current">Current course average (%)</label><input id="current" type="number" min="0" max="100" value="86" />
<label for="weight">Final exam weight (% of course)</label><input id="weight" type="number" min="1" max="100" value="30" />
<label for="target">Target course grade (%)</label><input id="target" type="number" min="0" max="100" value="90" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const cur=Number(document.getElementById('current').value);
  const w=Number(document.getElementById('weight').value)/100;
  const tgt=Number(document.getElementById('target').value);
  if(!(w>0)||w>1){ document.getElementById('out').textContent='Final weight should be between 1 and 100.'; return; }
  const need=(tgt-cur*(1-w))/w;
  let msg='You need '+need.toFixed(2)+'% on the final for a '+tgt+'% course grade.';
  if(need>100) msg='You would need '+need.toFixed(2)+'% on the final, which is above 100% — the target may not be reachable.';
  if(need<0) msg='You already reach '+tgt+'% without improving the final (need '+need.toFixed(2)+'%).';
  document.getElementById('out').textContent=msg;
  ${done}
};
</script>`,
    },
    {
      path: "/peptide-calculator.html",
      file: "peptide-calculator.html",
      category: "health",
      title: "Peptide Calculator — Reconstitution and Dose Volume",
      desc: "Peptide reconstitution math: concentration after adding bacteriostatic water and volume to draw for a dose in micrograms. For education only, not medical advice.",
      card: "Peptide calculator",
      cardDesc: "Reconstitution and dose volume.",
      body: `<h1>Peptide reconstitution calculator</h1>${ad}
<div class="tool-panel">
<label for="mg">Peptide in vial (mg)</label><input id="mg" type="number" min="0.001" step="0.001" value="5" />
<label for="ml">Bacteriostatic water added (ml)</label><input id="ml" type="number" min="0.1" step="0.1" value="2" />
<label for="dose">Desired dose (mcg)</label><input id="dose" type="number" min="1" value="250" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Concentration = (mg × 1000) ÷ ml mcg per ml. Volume = dose ÷ concentration. Confirm doses with a qualified clinician.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const mg=Number(document.getElementById('mg').value);
  const ml=Number(document.getElementById('ml').value);
  const dose=Number(document.getElementById('dose').value);
  if(!(mg>0)||!(ml>0)||!(dose>0)){ document.getElementById('out').textContent='Enter vial mg, water ml, and dose mcg.'; return; }
  const mcgPerMl=mg*1000/ml;
  const volMl=dose/mcgPerMl;
  const units100=volMl*100;
  document.getElementById('out').textContent=mcgPerMl.toFixed(0)+' mcg/ml · draw '+volMl.toFixed(3)+' ml ('+units100.toFixed(1)+' units on a U-100 insulin syringe)';
  ${done}
};
</script>`,
    },
    {
      path: "/bill-split-calculator.html",
      file: "bill-split-calculator.html",
      category: "calculators",
      title: "Bill Split Calculator — Split Check With Tip and Tax",
      desc: "Split a restaurant bill evenly with optional tip and sales tax added before dividing by the number of people.",
      card: "Bill split calculator",
      cardDesc: "Split the check with tip and tax.",
      body: `<h1>Bill split calculator</h1>${ad}
<div class="tool-panel">
<label for="sub">Subtotal ($)</label><input id="sub" type="number" min="0" step="0.01" value="86" />
<label for="tax">Tax (%)</label><input id="tax" type="number" min="0" step="0.1" value="8.25" />
<label for="tip">Tip (%)</label><input id="tip" type="number" min="0" step="0.5" value="18" />
<label for="people">People</label><input id="people" type="number" min="1" value="4" />
<button type="button" class="primary" id="go">Split bill</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const sub=Number(document.getElementById('sub').value);
  const tax=Number(document.getElementById('tax').value)/100;
  const tip=Number(document.getElementById('tip').value)/100;
  const n=Number(document.getElementById('people').value);
  if(!(sub>=0)||!(n>=1)){ document.getElementById('out').textContent='Enter subtotal and people.'; return; }
  const taxAmt=sub*tax;
  const tipAmt=(sub+taxAmt)*tip;
  const total=sub+taxAmt+tipAmt;
  const each=total/n;
  document.getElementById('out').textContent='Total $'+total.toFixed(2)+' · each pays $'+each.toFixed(2)+' ('+n+' people) · tax $'+taxAmt.toFixed(2)+' · tip $'+tipAmt.toFixed(2);
  ${done}
};
</script>`,
    },
  ];
}