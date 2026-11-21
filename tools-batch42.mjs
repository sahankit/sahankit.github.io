/** Batch 42: high-search US finance, mortgage, tax, and debt calculators. */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch42Tools(ad) {
  return [
    {
      path: "/mortgage-calculator.html",
      file: "mortgage-calculator.html",
      category: "calculators",
      title: "Mortgage Calculator — PITI Monthly Payment (US)",
      desc: "Estimate full monthly mortgage payment: principal and interest, property tax, homeowners insurance, and HOA. US home loan calculator.",
      card: "Mortgage calculator (PITI)",
      cardDesc: "Monthly payment with tax and insurance.",
      body: `<h1>Mortgage calculator (PITI)</h1>${ad}
<div class="tool-panel">
<label for="price">Home price ($)</label><input id="price" type="number" min="0" value="450000" />
<label for="down">Down payment ($)</label><input id="down" type="number" min="0" value="90000" />
<label for="rate">Interest rate (% APR)</label><input id="rate" type="number" step="0.001" value="6.75" />
<label for="yr">Loan term (years)</label><input id="yr" type="number" min="1" value="30" />
<label for="tax">Property tax ($ / year)</label><input id="tax" type="number" min="0" value="5400" />
<label for="ins">Homeowners insurance ($ / year)</label><input id="ins" type="number" min="0" value="1800" />
<label for="hoa">HOA ($ / month)</label><input id="hoa" type="number" min="0" value="0" />
<button type="button" class="primary" id="go">Calculate PITI</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function pmt(p,r,n){ if(!r) return p/n; return p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); }
document.getElementById('go').onclick=function(){
  const price=Number(document.getElementById('price').value)||0;
  const down=Number(document.getElementById('down').value)||0;
  const loan=Math.max(0,price-down);
  const apr=Number(document.getElementById('rate').value)/100;
  const yrs=Number(document.getElementById('yr').value)||30;
  const tax=Number(document.getElementById('tax').value)||0;
  const ins=Number(document.getElementById('ins').value)||0;
  const hoa=Number(document.getElementById('hoa').value)||0;
  const pi=pmt(loan,apr/12,yrs*12);
  const piti=pi+tax/12+ins/12+hoa;
  const usd=function(n){return '$'+n.toFixed(2);};
  document.getElementById('out').textContent='Total '+usd(piti)+'/mo · P&I '+usd(pi)+' · tax '+usd(tax/12)+' · insurance '+usd(ins/12)+(hoa?' · HOA '+usd(hoa):'')+' · loan '+usd(loan);
  ${done}
};
</script>`,
    },
    {
      path: "/fha-loan-calculator.html",
      file: "fha-loan-calculator.html",
      category: "calculators",
      title: "FHA Loan Calculator — Payment With MIP",
      desc: "Estimate FHA mortgage payment with minimum 3.5% down, upfront mortgage insurance, and annual MIP.",
      card: "FHA loan calculator",
      cardDesc: "FHA payment with MIP.",
      body: `<h1>FHA loan calculator</h1>${ad}
<div class="tool-panel">
<label for="price">Home price ($)</label><input id="price" type="number" value="350000" />
<label for="downpct">Down payment (%)</label><input id="downpct" type="number" min="3.5" max="100" step="0.1" value="3.5" />
<label for="rate">Interest rate (%)</label><input id="rate" type="number" step="0.01" value="6.5" />
<label for="yr">Term (years)</label><input id="yr" type="number" value="30" />
<label for="mip">Annual MIP (% of loan)</label><input id="mip" type="number" step="0.01" value="0.55" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Upfront MIP is modeled at 1.75% financed into the loan. Actual FHA limits and MIP depend on loan amount and term.</p>
</div>
<script>
function pmt(p,r,n){ return r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); }
document.getElementById('go').onclick=function(){
  const price=Number(document.getElementById('price').value);
  const dp=Number(document.getElementById('downpct').value)/100;
  const down=price*dp;
  let loan=price-down;
  loan+=loan*0.0175;
  const apr=Number(document.getElementById('rate').value)/100;
  const yrs=Number(document.getElementById('yr').value);
  const mip=Number(document.getElementById('mip').value)/100;
  const n=yrs*12;
  const pi=pmt(loan,apr/12,n);
  const mipMo=loan*mip/12;
  const tot=pi+mipMo;
  document.getElementById('out').textContent='Payment about $'+(tot).toFixed(2)+'/mo (P&I $'+pi.toFixed(2)+' + MIP $'+mipMo.toFixed(2)+') · base loan $'+loan.toFixed(0);
  ${done}
};
</script>`,
    },
    {
      path: "/va-loan-calculator.html",
      file: "va-loan-calculator.html",
      category: "calculators",
      title: "VA Loan Calculator — Payment With Funding Fee",
      desc: "Estimate VA home loan monthly payment with optional zero down and VA funding fee rolled into the loan.",
      card: "VA loan calculator",
      cardDesc: "VA mortgage with funding fee.",
      body: `<h1>VA loan calculator</h1>${ad}
<div class="tool-panel">
<label for="price">Home price ($)</label><input id="price" type="number" value="400000" />
<label for="down">Down payment ($)</label><input id="down" type="number" value="0" />
<label for="rate">Interest rate (%)</label><input id="rate" type="number" step="0.01" value="6.25" />
<label for="yr">Term (years)</label><input id="yr" type="number" value="30" />
<label for="fee">VA funding fee (%)</label><input id="fee" type="number" step="0.01" value="2.15" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function pmt(p,r,n){ return r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); }
document.getElementById('go').onclick=function(){
  const price=Number(document.getElementById('price').value);
  const down=Number(document.getElementById('down').value)||0;
  let loan=Math.max(0,price-down);
  const feePct=Number(document.getElementById('fee').value)/100;
  loan+=loan*feePct;
  const pi=pmt(loan,Number(document.getElementById('rate').value)/100/12,Number(document.getElementById('yr').value)*12);
  document.getElementById('out').textContent='About $'+pi.toFixed(2)+'/mo · loan with funding fee $'+loan.toFixed(0);
  ${done}
};
</script>`,
    },
    {
      path: "/pmi-calculator.html",
      file: "pmi-calculator.html",
      category: "calculators",
      title: "PMI Calculator — Private Mortgage Insurance Cost",
      desc: "Estimate monthly PMI until your loan reaches 80% LTV. Common when down payment is under 20%.",
      card: "PMI calculator",
      cardDesc: "Monthly PMI until 80% LTV.",
      body: `<h1>PMI calculator</h1>${ad}
<div class="tool-panel">
<label for="price">Home price ($)</label><input id="price" type="number" value="400000" />
<label for="down">Down payment ($)</label><input id="down" type="number" value="40000" />
<label for="rate">Mortgage rate (%)</label><input id="rate" type="number" value="6.5" />
<label for="yr">Term (years)</label><input id="yr" type="number" value="30" />
<label for="pmi">PMI rate (% of loan / year)</label><input id="pmi" type="number" step="0.01" value="0.6" />
<button type="button" class="primary" id="go">Estimate PMI</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const price=Number(document.getElementById('price').value);
  const down=Number(document.getElementById('down').value)||0;
  const loan=price-down;
  const ltv0=loan/price*100;
  const pmiRate=Number(document.getElementById('pmi').value)/100;
  const pmiMo=loan*pmiRate/12;
  const target=price*0.8;
  const apr=Number(document.getElementById('rate').value)/100/12;
  const n=Number(document.getElementById('yr').value)*12;
  const pay=apr===0?loan/n:loan*apr*Math.pow(1+apr,n)/(Math.pow(1+apr,n)-1);
  let bal=loan, mo=0;
  while(bal>target+0.01&&mo<n*2){
    const int=bal*apr;
    const pr=pay-int;
    bal=Math.max(0,bal-pr);
    mo++;
    if(mo>600) break;
  }
  document.getElementById('out').textContent='PMI about $'+pmiMo.toFixed(2)+'/mo · start LTV '+ltv0.toFixed(1)+'% · rough cancel around month '+mo+' (80% LTV)';
  ${done}
};
</script>`,
    },
    {
      path: "/down-payment-calculator.html",
      file: "down-payment-calculator.html",
      category: "calculators",
      title: "Down Payment Calculator — Amount and Loan Size",
      desc: "Calculate down payment dollars from home price and percentage, or loan amount after down payment.",
      card: "Down payment calculator",
      cardDesc: "Down payment % and loan amount.",
      body: `<h1>Down payment calculator</h1>${ad}
<div class="tool-panel">
<label for="price">Home price ($)</label><input id="price" type="number" value="425000" />
<label for="pct">Down payment (%)</label><input id="pct" type="number" min="0" max="100" step="0.1" value="20" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const price=Number(document.getElementById('price').value);
  const pct=Number(document.getElementById('pct').value)/100;
  const down=price*pct;
  const loan=price-down;
  document.getElementById('out').textContent='Down $'+down.toLocaleString('en-US',{maximumFractionDigits:0})+' ('+(pct*100).toFixed(1)+'%) · loan $'+loan.toLocaleString('en-US',{maximumFractionDigits:0})+(pct<0.2?' · under 20% often needs PMI.':'');
  ${done}
};
</script>`,
    },
    {
      path: "/closing-cost-calculator.html",
      file: "closing-cost-calculator.html",
      category: "calculators",
      title: "Closing Cost Calculator — Buyer Closing Costs US",
      desc: "Rough estimate of US home buyer closing costs as a percent of purchase price plus optional lender points.",
      card: "Closing cost calculator",
      cardDesc: "Buyer closing costs estimate.",
      body: `<h1>Buyer closing cost calculator</h1>${ad}
<div class="tool-panel">
<label for="price">Purchase price ($)</label><input id="price" type="number" value="400000" />
<label for="pct">Closing costs (% of price)</label><input id="pct" type="number" min="0" step="0.1" value="3" />
<label for="points">Lender points ($)</label><input id="points" type="number" min="0" value="0" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Typical buyer closing costs are often 2–5% of the purchase price depending on state, loan type, and escrows.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const price=Number(document.getElementById('price').value);
  const pct=Number(document.getElementById('pct').value)/100;
  const pts=Number(document.getElementById('points').value)||0;
  const close=price*pct+pts;
  document.getElementById('out').textContent='About $'+close.toLocaleString('en-US',{maximumFractionDigits:0})+' cash to close (fees $'+(price*pct).toFixed(0)+' + points $'+pts+')';
  ${done}
};
</script>`,
    },
    {
      path: "/social-security-calculator.html",
      file: "social-security-calculator.html",
      category: "calculators",
      title: "Social Security Calculator — Benefit Estimate",
      desc: "Rough monthly Social Security retirement benefit from estimated benefit at full retirement age and claiming age.",
      card: "Social Security calculator",
      cardDesc: "Retirement benefit estimate.",
      body: `<h1>Social Security calculator</h1>${ad}
<div class="tool-panel">
<label for="fra">Benefit at full retirement age ($ / month)</label><input id="fra" type="number" value="2400" />
<label for="claim">Claiming age</label>
<select id="claim"><option value="62">62 (early)</option><option value="67" selected>67 (full)</option><option value="70">70 (delayed)</option></select>
<button type="button" class="primary" id="go">Estimate benefit</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Uses common reduction and delayed credits vs age 67. For a personal estimate use SSA.gov.</p>
</div>
<script>
var mult={62:0.7,63:0.75,64:0.8,65:0.867,66:0.933,67:1,68:1.08,69:1.16,70:1.24};
document.getElementById('go').onclick=function(){
  const fra=Number(document.getElementById('fra').value);
  const age=Number(document.getElementById('claim').value);
  const m=mult[age]||1;
  const mo=fra*m;
  const yr=mo*12;
  document.getElementById('out').textContent='About $'+mo.toFixed(0)+'/mo ($'+yr.toFixed(0)+'/year) at age '+age;
  ${done}
};
</script>`,
    },
    {
      path: "/cd-calculator.html",
      file: "cd-calculator.html",
      category: "calculators",
      title: "CD Calculator — Certificate of Deposit Interest",
      desc: "Calculate certificate of deposit maturity value from deposit, APY, and term in months or years.",
      card: "CD calculator",
      cardDesc: "CD interest and maturity.",
      body: `<h1>CD calculator</h1>${ad}
<div class="tool-panel">
<label for="dep">Deposit ($)</label><input id="dep" type="number" value="10000" />
<label for="apy">APY (%)</label><input id="apy" type="number" step="0.01" value="4.5" />
<label for="mo">Term (months)</label><input id="mo" type="number" min="1" value="12" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const p=Number(document.getElementById('dep').value);
  const apy=Number(document.getElementById('apy').value)/100;
  const mo=Number(document.getElementById('mo').value);
  const yrs=mo/12;
  const end=p*Math.pow(1+apy,yrs);
  document.getElementById('out').textContent='Maturity $'+end.toFixed(2)+' · interest $'+(end-p).toFixed(2)+' over '+mo+' months at '+ (apy*100).toFixed(2)+'% APY';
  ${done}
};
</script>`,
    },
    {
      path: "/debt-snowball-calculator.html",
      file: "debt-snowball-calculator.html",
      category: "calculators",
      title: "Debt Snowball Calculator — Pay Smallest Balance First",
      desc: "Estimate months to debt-free using the debt snowball method: minimum payments plus extra to the smallest balance first.",
      card: "Debt snowball calculator",
      cardDesc: "Smallest balance first payoff.",
      body: `<h1>Debt snowball calculator</h1>${ad}
<div class="tool-panel">
<label for="extra">Extra payment ($ / month)</label><input id="extra" type="number" value="200" />
<div id="debts"></div>
<button type="button" id="add">Add debt</button>
<button type="button" class="primary" id="go">Calculate payoff</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
var box=document.getElementById('debts');
function row(bal,apr,min){
  var d=document.createElement('div'); d.style.marginBottom='0.5rem';
  d.innerHTML='Bal $<input class="b" type="number" value="'+(bal??3000)+'" style="width:5rem"/> APR <input class="a" type="number" step="0.1" value="'+(apr??18)+'" style="width:3.5rem"/>% Min $<input class="m" type="number" value="'+(min??90)+'" style="width:4rem"/>';
  box.appendChild(d);
}
row(4500,22,120); row(1200,15,35); row(8000,12,160);
document.getElementById('add').onclick=function(){ row(0,18,50); };
function sim(orderFn){
  var list=[].map.call(box.querySelectorAll('div'),function(d){
    return {b:Number(d.querySelector('.b').value)||0,r:Number(d.querySelector('.a').value)/100/12,m:Number(d.querySelector('.m').value)||0};
  }).filter(function(x){return x.b>0;});
  var extra=Number(document.getElementById('extra').value)||0;
  if(!list.length) return null;
  var mo=0, paid=0;
  while(list.some(function(d){return d.b>0.01;})&&mo<600){
    list.forEach(function(d){ if(d.b<=0) return;
      var int=d.b*d.r; var pr=Math.min(d.b,Math.max(d.m-int,0)); d.b-=pr; paid+=pr+int;
    });
    list=list.filter(function(d){return d.b>0.01;});
    if(!list.length) break;
    list.sort(orderFn);
    var target=list[0];
    var pay=extra;
    while(pay>0&&target&&target.b>0){
      var u=Math.min(pay,target.b); target.b-=u; pay-=u; paid+=u;
    }
    mo++;
  }
  return {mo:mo,paid:paid};
}
document.getElementById('go').onclick=function(){
  var r=sim(function(a,b){return a.b-b.b;});
  if(!r){ document.getElementById('out').textContent='Add debts with balances.'; return; }
  document.getElementById('out').textContent='Debt-free in about '+r.mo+' months · total paid $'+r.paid.toFixed(0)+' (snowball order)';
  ${done}
};
</script>`,
    },
    {
      path: "/debt-avalanche-calculator.html",
      file: "debt-avalanche-calculator.html",
      category: "calculators",
      title: "Debt Avalanche Calculator — Highest APR First",
      desc: "Estimate payoff time when extra payments go to the highest interest rate debt first.",
      card: "Debt avalanche calculator",
      cardDesc: "Highest APR first payoff.",
      body: `<h1>Debt avalanche calculator</h1>${ad}
<div class="tool-panel">
<label for="extra">Extra payment ($ / month)</label><input id="extra" type="number" value="200" />
<div id="debts"></div>
<button type="button" id="add">Add debt</button>
<button type="button" class="primary" id="go">Calculate payoff</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
var box=document.getElementById('debts');
function row(bal,apr,min){
  var d=document.createElement('div'); d.style.marginBottom='0.5rem';
  d.innerHTML='Bal $<input class="b" type="number" value="'+(bal??8000)+'" style="width:5rem"/> APR <input class="a" type="number" step="0.1" value="'+(apr??24)+'" style="width:3.5rem"/>% Min $<input class="m" type="number" value="'+(min??180)+'" style="width:4rem"/>';
  box.appendChild(d);
}
row(8000,24,180); row(3000,19,75); row(1500,12,40);
document.getElementById('add').onclick=function(){ row(0,18,50); };
document.getElementById('go').onclick=function(){
  var list=[].map.call(box.querySelectorAll('div'),function(d){
    return {b:Number(d.querySelector('.b').value)||0,r:Number(d.querySelector('.a').value)/100/12,m:Number(d.querySelector('.m').value)||0,a:Number(d.querySelector('.a').value)};
  }).filter(function(x){return x.b>0;});
  var extra=Number(document.getElementById('extra').value)||0;
  if(!list.length){ document.getElementById('out').textContent='Add debts.'; return; }
  var mo=0, paid=0;
  while(list.some(function(d){return d.b>0.01;})&&mo<600){
    list.forEach(function(d){ if(d.b<=0) return;
      var int=d.b*d.r; var pr=Math.min(d.b,Math.max(d.m-int,0)); d.b-=pr; paid+=pr+int;
    });
    list=list.filter(function(d){return d.b>0.01;});
    if(!list.length) break;
    list.sort(function(a,b){return b.a-a.a;});
    var target=list[0], pay=extra;
    while(pay>0&&target&&target.b>0){ var u=Math.min(pay,target.b); target.b-=u; pay-=u; paid+=u; }
    mo++;
  }
  document.getElementById('out').textContent='Debt-free in about '+mo+' months · total paid $'+paid.toFixed(0)+' (avalanche)';
  ${done}
};
</script>`,
    },
    {
      path: "/car-lease-calculator.html",
      file: "car-lease-calculator.html",
      category: "calculators",
      title: "Car Lease Calculator — Monthly Lease Payment",
      desc: "Estimate US auto lease payment from MSRP, residual, money factor, and term.",
      card: "Car lease calculator",
      cardDesc: "Monthly auto lease payment.",
      body: `<h1>Car lease calculator</h1>${ad}
<div class="tool-panel">
<label for="msrp">MSRP / capitalized cost ($)</label><input id="msrp" type="number" value="38000" />
<label for="res">Residual value ($)</label><input id="res" type="number" value="22800" />
<label for="mf">Money factor</label><input id="mf" type="number" step="0.00001" value="0.00165" />
<label for="mo">Term (months)</label><input id="mo" type="number" value="36" />
<label for="down">Due at signing ($)</label><input id="down" type="number" value="2500" />
<button type="button" class="primary" id="go">Calculate lease</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Depreciation charge = (cap cost − residual) ÷ months. Finance charge = (cap cost + residual) × money factor. APR ≈ money factor × 2400.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const cap=Number(document.getElementById('msrp').value);
  const res=Number(document.getElementById('res').value);
  const mf=Number(document.getElementById('mf').value);
  const mo=Number(document.getElementById('mo').value);
  const depr=(cap-res)/mo;
  const fin=(cap+res)*mf;
  const pay=depr+fin;
  const apr=mf*2400;
  document.getElementById('out').textContent='About $'+pay.toFixed(2)+'/mo · ~'+apr.toFixed(2)+'% APR equivalent · depreciation $'+depr.toFixed(2)+' + finance $'+fin.toFixed(2);
  ${done}
};
</script>`,
    },
    {
      path: "/federal-income-tax-calculator.html",
      file: "federal-income-tax-calculator.html",
      category: "calculators",
      title: "Federal Income Tax Calculator — US Single Filer",
      desc: "Estimate US federal income tax for a single filer using 2024 brackets and standard deduction. Simplified — not a full 1040.",
      card: "Federal income tax calculator",
      cardDesc: "US federal tax estimate.",
      body: `<h1>Federal income tax calculator (single)</h1>${ad}
<div class="tool-panel">
<label for="wage">Taxable wages ($ / year)</label><input id="wage" type="number" value="85000" />
<label for="std">Standard deduction ($)</label><input id="std" type="number" value="14600" />
<label for="pre">Pre-tax 401(k) ($)</label><input id="pre" type="number" value="0" />
<button type="button" class="primary" id="go">Estimate tax</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function fedTax(t){
  var b=[[11600,0.1],[47150,0.12],[100525,0.22],[191950,0.24],[243725,0.32],[609350,0.35],[Infinity,0.37]];
  var tax=0, prev=0;
  for(var i=0;i<b.length;i++){
    var lim=b[i][0], rate=b[i][1];
    if(t<=prev) break;
    var band=Math.min(t,lim)-prev;
    if(band>0) tax+=band*rate;
    prev=lim;
  }
  return tax;
}
document.getElementById('go').onclick=function(){
  const wage=Number(document.getElementById('wage').value);
  const std=Number(document.getElementById('std').value);
  const pre=Number(document.getElementById('pre').value)||0;
  const taxable=Math.max(0,wage-pre-std);
  const tax=fedTax(taxable);
  const eff=wage>0?tax/wage*100:0;
  document.getElementById('out').textContent='Federal tax about $'+tax.toFixed(0)+' · taxable $'+taxable.toLocaleString('en-US')+' · effective '+eff.toFixed(1)+'% on wages';
  ${done}
};
</script>`,
    },
    {
      path: "/capital-gains-tax-calculator.html",
      file: "capital-gains-tax-calculator.html",
      category: "calculators",
      title: "Capital Gains Tax Calculator — US Long & Short Term",
      desc: "Estimate US federal tax on short-term and long-term capital gains for a single filer with other ordinary income.",
      card: "Capital gains tax calculator",
      cardDesc: "Stock and asset gain tax.",
      body: `<h1>Capital gains tax calculator</h1>${ad}
<div class="tool-panel">
<label for="income">Ordinary taxable income ($)</label><input id="income" type="number" value="75000" />
<label for="st">Short-term gain ($)</label><input id="st" type="number" value="0" />
<label for="lt">Long-term gain ($)</label><input id="lt" type="number" value="15000" />
<button type="button" class="primary" id="go">Estimate tax</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Long-term rates 0%, 15%, or 20% for singles use approximate thresholds $47,025 and $518,900 taxable income (2024). Short-term gains taxed as ordinary income (simplified 22% shown if not computed with brackets).</p>
</div>
<script>
function ordTax(t){
  var b=[[11600,0.1],[47150,0.12],[100525,0.22],[191950,0.24],[243725,0.32],[609350,0.35],[Infinity,0.37]];
  var tax=0, prev=0;
  for(var i=0;i<b.length;i++){ var lim=b[i][0], rate=b[i][1]; if(t<=prev) break; var band=Math.min(t,lim)-prev; if(band>0) tax+=band*rate; prev=lim; }
  return tax;
}
function ltRate(income){
  if(income<=47025) return 0;
  if(income<=518900) return 0.15;
  return 0.2;
}
document.getElementById('go').onclick=function(){
  const inc=Number(document.getElementById('income').value);
  const st=Number(document.getElementById('st').value)||0;
  const lt=Number(document.getElementById('lt').value)||0;
  const stTax=ordTax(inc+st)-ordTax(inc);
  const ltTax=lt*ltRate(inc);
  const tot=stTax+ltTax;
  document.getElementById('out').textContent='Gain tax about $'+tot.toFixed(0)+' (short $'+stTax.toFixed(0)+' · long $'+ltTax.toFixed(0)+' at '+(ltRate(inc)*100)+'%)';
  ${done}
};
</script>`,
    },
    {
      path: "/net-worth-calculator.html",
      file: "net-worth-calculator.html",
      category: "calculators",
      title: "Net Worth Calculator — Assets Minus Liabilities",
      desc: "Calculate personal net worth from assets and debts. US household net worth snapshot.",
      card: "Net worth calculator",
      cardDesc: "Assets minus liabilities.",
      body: `<h1>Net worth calculator</h1>${ad}
<div class="tool-panel">
<label for="cash">Cash & savings ($)</label><input id="cash" type="number" value="25000" />
<label for="invest">Investments & retirement ($)</label><input id="invest" type="number" value="120000" />
<label for="home">Home value ($)</label><input id="home" type="number" value="400000" />
<label for="other">Other assets ($)</label><input id="other" type="number" value="15000" />
<label for="mort">Mortgage & loans ($)</label><input id="mort" type="number" value="310000" />
<label for="card">Credit cards & other debt ($)</label><input id="card" type="number" value="8000" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  var a=0, l=0;
  ['cash','invest','home','other'].forEach(function(id){ a+=Number(document.getElementById(id).value)||0; });
  ['mort','card'].forEach(function(id){ l+=Number(document.getElementById(id).value)||0; });
  var nw=a-l;
  document.getElementById('out').textContent='Net worth $'+nw.toLocaleString('en-US')+' · assets $'+a.toLocaleString('en-US')+' · liabilities $'+l.toLocaleString('en-US');
  ${done}
};
</script>`,
    },
    {
      path: "/home-equity-calculator.html",
      file: "home-equity-calculator.html",
      category: "calculators",
      title: "Home Equity Calculator — LTV and Available Equity",
      desc: "Estimate home equity, loan-to-value ratio, and borrowable equity at a max LTV for US homeowners.",
      card: "Home equity calculator",
      cardDesc: "Equity and LTV.",
      body: `<h1>Home equity calculator</h1>${ad}
<div class="tool-panel">
<label for="value">Home value ($)</label><input id="value" type="number" value="500000" />
<label for="mort">Mortgage balance ($)</label><input id="mort" type="number" value="320000" />
<label for="maxltv">Max LTV for borrowing (%)</label><input id="maxltv" type="number" value="80" />
<button type="button" class="primary" id="go">Calculate equity</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const v=Number(document.getElementById('value').value);
  const m=Number(document.getElementById('mort').value)||0;
  const max=Number(document.getElementById('maxltv').value)/100;
  const eq=v-m;
  const ltv=m/v*100;
  const maxLoan=v*max;
  const borrow=Math.max(0,maxLoan-m);
  document.getElementById('out').textContent='Equity $'+eq.toLocaleString('en-US')+' · LTV '+ltv.toFixed(1)+'% · borrowable about $'+borrow.toLocaleString('en-US')+' at '+ (max*100)+'% LTV';
  ${done}
};
</script>`,
    },
    {
      path: "/student-loan-refinance-calculator.html",
      file: "student-loan-refinance-calculator.html",
      category: "calculators",
      title: "Student Loan Refinance Calculator — Payment Savings",
      desc: "Compare current student loan payment and interest to a refinanced rate and term.",
      card: "Student loan refinance",
      cardDesc: "Refi payment savings.",
      body: `<h1>Student loan refinance calculator</h1>${ad}
<div class="tool-panel">
<label for="bal">Current balance ($)</label><input id="bal" type="number" value="42000" />
<label for="oldR">Current rate (%)</label><input id="oldR" type="number" value="6.8" />
<label for="newR">New rate (%)</label><input id="newR" type="number" value="5.2" />
<label for="yr">Years remaining</label><input id="yr" type="number" value="10" />
<button type="button" class="primary" id="go">Compare</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function pay(p,annual,yrs){ var r=annual/100/12, n=yrs*12; return r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); }
document.getElementById('go').onclick=function(){
  const b=Number(document.getElementById('bal').value);
  const y=Number(document.getElementById('yr').value);
  const oldP=pay(b,Number(document.getElementById('oldR').value),y);
  const newP=pay(b,Number(document.getElementById('newR').value),y);
  const save=(oldP-newP)*y*12;
  document.getElementById('out').textContent='Old $'+oldP.toFixed(2)+'/mo · new $'+newP.toFixed(2)+'/mo · save $'+save.toFixed(0)+' over '+y+' years';
  ${done}
};
</script>`,
    },
    {
      path: "/rmd-calculator.html",
      file: "rmd-calculator.html",
      category: "calculators",
      title: "RMD Calculator — Required Minimum Distribution",
      desc: "Estimate required minimum distribution from a traditional IRA or 401(k) using IRS uniform lifetime divisor by age.",
      card: "RMD calculator",
      cardDesc: "IRA required minimum distribution.",
      body: `<h1>RMD calculator</h1>${ad}
<div class="tool-panel">
<label for="age">Your age</label><input id="age" type="number" min="73" max="120" value="75" />
<label for="bal">Prior Dec 31 account balance ($)</label><input id="bal" type="number" value="480000" />
<button type="button" class="primary" id="go">Calculate RMD</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Divisors from the IRS Uniform Lifetime Table (simplified). RMDs generally start at age 73.</p>
</div>
<script>
var div={73:26.5,74:25.5,75:24.6,76:23.7,77:22.9,78:22.0,79:21.1,80:20.2,81:19.4,82:18.5,83:17.7,84:16.8,85:16.0,86:15.2,87:14.4,88:13.7,89:12.9,90:12.2,91:11.5,92:10.8,93:10.1,94:9.5,95:8.9,96:8.4,97:7.8,98:7.3,99:6.8,100:6.4};
document.getElementById('go').onclick=function(){
  const age=Number(document.getElementById('age').value);
  const bal=Number(document.getElementById('bal').value);
  if(age<73){ document.getElementById('out').textContent='RMDs generally begin at age 73 for many accounts.'; return; }
  const d=div[Math.min(100,Math.max(73,Math.round(age)))]||10;
  const rmd=bal/d;
  document.getElementById('out').textContent='RMD about $'+rmd.toFixed(0)+' this year (divisor '+d+')';
  ${done}
};
</script>`,
    },
    {
      path: "/seller-net-proceeds-calculator.html",
      file: "seller-net-proceeds-calculator.html",
      category: "calculators",
      title: "Seller Net Proceeds Calculator — Home Sale",
      desc: "Estimate cash to seller after real estate commission, mortgage payoff, and closing costs.",
      card: "Seller net proceeds",
      cardDesc: "Home sale net to seller.",
      body: `<h1>Seller net proceeds calculator</h1>${ad}
<div class="tool-panel">
<label for="sale">Sale price ($)</label><input id="sale" type="number" value="525000" />
<label for="comm">Commission (%)</label><input id="comm" type="number" step="0.1" value="5.5" />
<label for="payoff">Mortgage payoff ($)</label><input id="payoff" type="number" value="298000" />
<label for="close">Seller closing costs ($)</label><input id="close" type="number" value="3500" />
<button type="button" class="primary" id="go">Calculate net</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const sale=Number(document.getElementById('sale').value);
  const comm=sale*Number(document.getElementById('comm').value)/100;
  const payoff=Number(document.getElementById('payoff').value)||0;
  const close=Number(document.getElementById('close').value)||0;
  const net=sale-comm-payoff-close;
  document.getElementById('out').textContent='Net proceeds about $'+net.toLocaleString('en-US')+' · commission $'+comm.toFixed(0)+' · payoff $'+payoff.toLocaleString('en-US');
  ${done}
};
</script>`,
    },
    {
      path: "/eitc-calculator.html",
      file: "eitc-calculator.html",
      category: "calculators",
      title: "EITC Calculator — Earned Income Tax Credit Estimate",
      desc: "Rough US earned income tax credit estimate for tax year 2024 from income and number of qualifying children.",
      card: "EITC calculator",
      cardDesc: "Earned income tax credit.",
      body: `<h1>EITC calculator</h1>${ad}
<div class="tool-panel">
<label for="income">Earned income ($)</label><input id="income" type="number" value="32000" />
<label for="kids">Qualifying children</label>
<select id="kids"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3" selected>3+</option></select>
<button type="button" class="primary" id="go">Estimate EITC</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Uses simplified 2024 maximum credits ($632, $4,213, $6,960, $7,830) and phase-out starts. Not IRS exact.</p>
</div>
<script>
var maxC=[632,4213,6960,7830];
var phase=[18591,49084,55768,59899];
var range=[10330,19299,19299,21559];
document.getElementById('go').onclick=function(){
  var inc=Number(document.getElementById('income').value);
  var k=Number(document.getElementById('kids').value);
  if(k>3) k=3;
  var max=maxC[k];
  var start=phase[k];
  var cred=max;
  if(inc>start){ cred=Math.max(0,max-(inc-start)/(range[k]||10000)*max*0.5); }
  if(inc<1000) cred=0;
  document.getElementById('out').textContent='Estimated EITC about $'+Math.round(cred).toLocaleString('en-US');
  ${done}
};
</script>`,
    },
    {
      path: "/child-tax-credit-calculator.html",
      file: "child-tax-credit-calculator.html",
      category: "calculators",
      title: "Child Tax Credit Calculator — US CTC Estimate",
      desc: "Estimate US child tax credit from number of qualifying children and modified adjusted gross income.",
      card: "Child tax credit calculator",
      cardDesc: "US CTC estimate.",
      body: `<h1>Child tax credit calculator</h1>${ad}
<div class="tool-panel">
<label for="kids">Qualifying children under 17</label><input id="kids" type="number" min="0" value="2" />
<label for="magi">MAGI ($)</label><input id="magi" type="number" value="95000" />
<label for="single">Filing</label>
<select id="single"><option value="1" selected>Single / other</option><option value="0">Married filing jointly</option></select>
<button type="button" class="primary" id="go">Estimate CTC</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const kids=Number(document.getElementById('kids').value)||0;
  const magi=Number(document.getElementById('magi').value);
  const single=Number(document.getElementById('single').value)===1;
  var cred=kids*2000;
  var start=single?200000:400000;
  if(magi>start){ cred=Math.max(0,cred-(magi-start)/1000*50); }
  document.getElementById('out').textContent='Child tax credit about $'+Math.round(cred).toLocaleString('en-US')+' ('+kids+' children)';
  ${done}
};
</script>`,
    },
    {
      path: "/cost-of-living-calculator.html",
      file: "cost-of-living-calculator.html",
      category: "calculators",
      title: "Cost of Living Calculator — Salary Comparison",
      desc: "Compare salaries between two US cities using cost of living index values.",
      card: "Cost of living calculator",
      cardDesc: "Salary equivalent across cities.",
      body: `<h1>Cost of living calculator</h1>${ad}
<div class="tool-panel">
<label for="sal">Salary in city A ($)</label><input id="sal" type="number" value="90000" />
<label for="idxA">Cost of living index — city A</label><input id="idxA" type="number" step="0.1" value="100" />
<label for="idxB">Cost of living index — city B</label><input id="idxB" type="number" step="0.1" value="128" />
<button type="button" class="primary" id="go">Compare</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Use indexes from Numbeo or BLS-style comparisons (100 = national average). Example: Austin 100, San Francisco 128.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const sal=Number(document.getElementById('sal').value);
  const a=Number(document.getElementById('idxA').value);
  const b=Number(document.getElementById('idxB').value);
  if(!(a>0)){ document.getElementById('out').textContent='Enter a city A index.'; return; }
  const equiv=sal*b/a;
  document.getElementById('out').textContent='$'+sal.toLocaleString('en-US')+' in city A ≈ $'+equiv.toFixed(0).toLocaleString('en-US')+' in city B · moving the other way needs $'+(sal*a/b).toFixed(0);
  ${done}
};
</script>`,
    },
  ];
}