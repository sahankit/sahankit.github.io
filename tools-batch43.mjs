/** Batch 43: EU & UK SEO — VAT, tax, mortgage, currency, fuel. */

const done = "window.__toolCompleteFired=true;document.dispatchEvent(new CustomEvent('tool:complete'));";

export function batch43Tools(ad) {
  return [
    {
      path: "/vat-calculator.html",
      file: "vat-calculator.html",
      category: "calculators",
      title: "VAT Calculator — Add VAT to Net Price (EU)",
      desc: "Add VAT to a net amount. Choose a standard EU VAT rate or enter a custom percentage.",
      card: "VAT calculator",
      cardDesc: "Net price plus VAT.",
      body: `<h1>VAT calculator</h1>${ad}
<div class="tool-panel">
<label for="net">Amount ex VAT (€)</label><input id="net" type="number" min="0" step="0.01" value="100" />
<label for="rate">VAT rate (%)</label><input id="rate" type="number" min="0" step="0.1" value="20" />
<button type="button" class="primary" id="go">Add VAT</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const net=Number(document.getElementById('net').value)||0;
  const r=Number(document.getElementById('rate').value)/100;
  const vat=net*r;
  const gross=net+vat;
  document.getElementById('out').textContent='VAT '+vat.toFixed(2)+' € · gross '+gross.toFixed(2)+' € (rate '+((r*100).toFixed(1))+'%)';
  ${done}
};
</script>`,
    },
    {
      path: "/reverse-vat-calculator.html",
      file: "reverse-vat-calculator.html",
      category: "calculators",
      title: "Reverse VAT Calculator — VAT From Gross Price",
      desc: "Remove VAT from a gross (VAT-inclusive) price. EU reverse VAT calculator.",
      card: "Reverse VAT calculator",
      cardDesc: "Gross price to net and VAT.",
      body: `<h1>Reverse VAT calculator</h1>${ad}
<div class="tool-panel">
<label for="gross">Gross amount incl. VAT (€)</label><input id="gross" type="number" min="0" step="0.01" value="120" />
<label for="rate">VAT rate (%)</label><input id="rate" type="number" min="0" step="0.1" value="20" />
<button type="button" class="primary" id="go">Remove VAT</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const gross=Number(document.getElementById('gross').value)||0;
  const r=Number(document.getElementById('rate').value)/100;
  const net=gross/(1+r);
  const vat=gross-net;
  document.getElementById('out').textContent='Net '+net.toFixed(2)+' € · VAT '+vat.toFixed(2)+' € · gross '+gross.toFixed(2)+' €';
  ${done}
};
</script>`,
    },
    {
      path: "/eu-vat-calculator.html",
      file: "eu-vat-calculator.html",
      category: "calculators",
      title: "EU VAT Calculator — VAT by Country",
      desc: "Calculate VAT using standard VAT rates for EU countries: Germany, France, Spain, Italy, Netherlands, and more.",
      card: "EU VAT by country",
      cardDesc: "Standard VAT rates by member state.",
      body: `<h1>EU VAT calculator by country</h1>${ad}
<div class="tool-panel">
<label for="amt">Amount ex VAT (€)</label><input id="amt" type="number" min="0" step="0.01" value="250" />
<label for="country">Country</label>
<select id="country">
<option value="19">Germany (19%)</option>
<option value="20" selected>France (20%)</option>
<option value="21">Spain (21%)</option>
<option value="22">Italy (22%)</option>
<option value="21">Netherlands (21%)</option>
<option value="21">Belgium (21%)</option>
<option value="23">Ireland (23%)</option>
<option value="25">Sweden (25%)</option>
<option value="27">Hungary (27%)</option>
<option value="23">Poland (23%)</option>
<option value="21">Portugal (21%)</option>
<option value="24">Finland (24%)</option>
<option value="21">Austria (21%)</option>
<option value="19">Romania (19%)</option>
</select>
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Uses common standard rates; reduced rates and cross-border B2B rules are not applied.</p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const net=Number(document.getElementById('amt').value)||0;
  const r=Number(document.getElementById('country').value)/100;
  const vat=net*r;
  document.getElementById('out').textContent='VAT '+vat.toFixed(2)+' € · total '+((net+vat).toFixed(2))+' € · rate '+(r*100)+'%';
  ${done}
};
</script>`,
    },
    {
      path: "/uk-mortgage-calculator.html",
      file: "uk-mortgage-calculator.html",
      category: "calculators",
      title: "UK Mortgage Calculator — Monthly Repayment",
      desc: "Estimate UK mortgage monthly payment in pounds from loan amount, interest rate, and term.",
      card: "UK mortgage calculator",
      cardDesc: "Monthly repayment in GBP.",
      body: `<h1>UK mortgage calculator</h1>${ad}
<div class="tool-panel">
<label for="loan">Loan amount (£)</label><input id="loan" type="number" min="0" value="320000" />
<label for="rate">Interest rate (% APR)</label><input id="rate" type="number" step="0.01" value="4.75" />
<label for="yr">Term (years)</label><input id="yr" type="number" min="1" value="25" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function pmt(p,r,n){ if(r===0) return p/n; return p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); }
document.getElementById('go').onclick=function(){
  const loan=Number(document.getElementById('loan').value)||0;
  const apr=Number(document.getElementById('rate').value)/100;
  const n=Number(document.getElementById('yr').value)*12;
  const m=pmt(loan,apr/12,n);
  document.getElementById('out').textContent='About £'+m.toFixed(2)+'/month · total interest £'+(m*n-loan).toFixed(0)+' · payments '+n;
  ${done}
};
</script>`,
    },
    {
      path: "/uk-stamp-duty-calculator.html",
      file: "uk-stamp-duty-calculator.html",
      category: "calculators",
      title: "UK Stamp Duty Calculator — SDLT (England & NI)",
      desc: "Estimate Stamp Duty Land Tax on UK residential property purchases in England and Northern Ireland.",
      card: "UK stamp duty (SDLT)",
      cardDesc: "SDLT on property price.",
      body: `<h1>UK stamp duty calculator (SDLT)</h1>${ad}
<div class="tool-panel">
<label for="price">Property price (£)</label><input id="price" type="number" min="0" value="425000" />
<label><input type="checkbox" id="ftb" /> First-time buyer</label>
<label><input type="checkbox" id="add" /> Additional property (+3% surcharge)</label>
<button type="button" class="primary" id="go">Calculate SDLT</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">England &amp; NI residential bands. Scotland/Land and Buildings Transaction Tax and Wales LTT use different rules.</p>
</div>
<script>
function sliceTax(amount,bands){
  let tax=0, rem=amount;
  for(const [w,rte] of bands){
    const slice=Math.min(rem,w);
    tax+=slice*rte;
    rem-=slice;
    if(rem<=0) break;
  }
  return tax;
}
function sdlt(price,ftb,add){
  let tax=0;
  if(ftb){
    if(price<=425000) tax=0;
    else if(price<=625000) tax=(price-425000)*0.05;
    else{
      tax=(625000-425000)*0.05;
      const rem=price-625000;
      tax+=sliceTax(rem,[[300000,0.05],[575000,0.10],[1e12,0.12]]);
    }
  }else{
    tax=sliceTax(price,[[250000,0],[675000,0.05],[575000,0.10],[1e12,0.12]]);
  }
  if(add) tax+=price*0.03;
  return tax;
}
document.getElementById('go').onclick=function(){
  const p=Number(document.getElementById('price').value)||0;
  const t=sdlt(p,document.getElementById('ftb').checked,document.getElementById('add').checked);
  const eff=p?((t/p)*100).toFixed(2):0;
  document.getElementById('out').textContent='SDLT about £'+t.toFixed(0)+' ('+eff+'% of price) on £'+p.toLocaleString('en-GB');
  ${done}
};
</script>`,
    },
    {
      path: "/uk-income-tax-calculator.html",
      file: "uk-income-tax-calculator.html",
      category: "calculators",
      title: "UK Income Tax Calculator — 2024/25 Estimate",
      desc: "Estimate UK income tax on annual earnings for England, Wales, and Northern Ireland.",
      card: "UK income tax",
      cardDesc: "Tax on salary (England/Wales/NI).",
      body: `<h1>UK income tax calculator</h1>${ad}
<div class="tool-panel">
<label for="inc">Annual income (£)</label><input id="inc" type="number" min="0" value="52000" />
<button type="button" class="primary" id="go">Estimate tax</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Scottish income tax uses different bands. Personal allowance tapers above £100,000.</p>
</div>
<script>
function ukIncomeTax(inc){
  let pa=12570;
  if(inc>100000) pa=Math.max(0,pa-(inc-100000)/2);
  const taxInc=Math.max(0,inc-pa);
  let tax=0, rem=taxInc;
  const b=[37700,0.2, 87440,0.4, 1e15,0.45];
  for(let i=0;i<b.length;i+=2){
    const w=b[i], rte=b[i+1];
    const slice=Math.min(rem,w); tax+=slice*rte; rem-=slice; if(rem<=0) break;
  }
  return {tax, pa};
}
document.getElementById('go').onclick=function(){
  const inc=Number(document.getElementById('inc').value)||0;
  const r=ukIncomeTax(inc);
  const net=inc-r.tax;
  document.getElementById('out').textContent='Income tax £'+r.tax.toFixed(0)+' · allowance £'+r.pa.toFixed(0)+' · after tax £'+net.toFixed(0)+' (excl. NI)';
  ${done}
};
</script>`,
    },
    {
      path: "/uk-national-insurance-calculator.html",
      file: "uk-national-insurance-calculator.html",
      category: "calculators",
      title: "UK National Insurance Calculator — Class 1 Employee",
      desc: "Estimate UK employee Class 1 National Insurance contributions on annual salary.",
      card: "UK National Insurance",
      cardDesc: "Employee NI estimate.",
      body: `<h1>UK National Insurance calculator</h1>${ad}
<div class="tool-panel">
<label for="inc">Annual salary (£)</label><input id="inc" type="number" value="52000" />
<button type="button" class="primary" id="go">Calculate NI</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function ukNI(inc){
  const pt=12570, uel=50270;
  if(inc<=pt) return 0;
  let ni=0;
  const band=Math.min(inc,uel)-pt;
  ni+=Math.max(0,band)*0.08;
  if(inc>uel) ni+=(inc-uel)*0.02;
  return ni;
}
document.getElementById('go').onclick=function(){
  const inc=Number(document.getElementById('inc').value)||0;
  const ni=ukNI(inc);
  document.getElementById('out').textContent='Employee NI about £'+ni.toFixed(0)+'/year · £'+(ni/12).toFixed(0)+'/month on £'+inc.toLocaleString('en-GB');
  ${done}
};
</script>`,
    },
    {
      path: "/uk-take-home-pay-calculator.html",
      file: "uk-take-home-pay-calculator.html",
      category: "calculators",
      title: "UK Take Home Pay Calculator — Salary After Tax",
      desc: "Estimate UK monthly take-home pay after income tax and employee National Insurance.",
      card: "UK take home pay",
      cardDesc: "Net salary after tax &amp; NI.",
      body: `<h1>UK take home pay calculator</h1>${ad}
<div class="tool-panel">
<label for="inc">Gross annual salary (£)</label><input id="inc" type="number" value="42000" />
<button type="button" class="primary" id="go">Take home</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function ukIncomeTax(inc){
  let pa=12570;
  if(inc>100000) pa=Math.max(0,pa-(inc-100000)/2);
  const taxInc=Math.max(0,inc-pa);
  let tax=0, rem=taxInc;
  for(const [w,rte] of [[37700,0.2],[87440,0.4],[1e15,0.45]]){
    const slice=Math.min(rem,w); tax+=slice*rte; rem-=slice; if(rem<=0) break;
  }
  return tax;
}
function ukNI(inc){
  const pt=12570, uel=50270;
  if(inc<=pt) return 0;
  let ni=Math.max(0,Math.min(inc,uel)-pt)*0.08;
  if(inc>uel) ni+=(inc-uel)*0.02;
  return ni;
}
document.getElementById('go').onclick=function(){
  const inc=Number(document.getElementById('inc').value)||0;
  const tax=ukIncomeTax(inc);
  const ni=ukNI(inc);
  const net=inc-tax-ni;
  document.getElementById('out').textContent='Take home £'+net.toFixed(0)+'/year · £'+(net/12).toFixed(0)+'/month · tax £'+tax.toFixed(0)+' · NI £'+ni.toFixed(0);
  ${done}
};
</script>`,
    },
    {
      path: "/euro-to-pound-calculator.html",
      file: "euro-to-pound-calculator.html",
      category: "calculators",
      title: "Euro to Pound Calculator — EUR to GBP",
      desc: "Convert euros to British pounds using your exchange rate or a reference rate.",
      card: "Euro to pound",
      cardDesc: "EUR → GBP conversion.",
      body: `<h1>Euro to pound calculator</h1>${ad}
<div class="tool-panel">
<label for="eur">Amount (€)</label><input id="eur" type="number" step="0.01" value="100" />
<label for="rate">GBP per 1 EUR</label><input id="rate" type="number" step="0.0001" value="0.85" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const e=Number(document.getElementById('eur').value)||0;
  const r=Number(document.getElementById('rate').value)||0;
  document.getElementById('out').textContent='€'+e.toFixed(2)+' ≈ £'+(e*r).toFixed(2)+' at rate '+r;
  ${done}
};
</script>`,
    },
    {
      path: "/euro-to-usd-calculator.html",
      file: "euro-to-usd-calculator.html",
      category: "calculators",
      title: "Euro to Dollar Calculator — EUR to USD",
      desc: "Convert euros to US dollars with your exchange rate.",
      card: "Euro to dollar",
      cardDesc: "EUR → USD conversion.",
      body: `<h1>Euro to dollar calculator</h1>${ad}
<div class="tool-panel">
<label for="eur">Amount (€)</label><input id="eur" type="number" value="100" />
<label for="rate">USD per 1 EUR</label><input id="rate" type="number" step="0.0001" value="1.08" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const e=Number(document.getElementById('eur').value)||0;
  const r=Number(document.getElementById('rate').value)||0;
  document.getElementById('out').textContent='€'+e.toFixed(2)+' ≈ $'+(e*r).toFixed(2);
  ${done}
};
</script>`,
    },
    {
      path: "/pound-to-euro-calculator.html",
      file: "pound-to-euro-calculator.html",
      category: "calculators",
      title: "Pound to Euro Calculator — GBP to EUR",
      desc: "Convert British pounds to euros using your exchange rate.",
      card: "Pound to euro",
      cardDesc: "GBP → EUR conversion.",
      body: `<h1>Pound to euro calculator</h1>${ad}
<div class="tool-panel">
<label for="gbp">Amount (£)</label><input id="gbp" type="number" value="100" />
<label for="rate">EUR per 1 GBP</label><input id="rate" type="number" step="0.0001" value="1.17" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const g=Number(document.getElementById('gbp').value)||0;
  const r=Number(document.getElementById('rate').value)||0;
  document.getElementById('out').textContent='£'+g.toFixed(2)+' ≈ €'+(g*r).toFixed(2);
  ${done}
};
</script>`,
    },
    {
      path: "/mph-to-kph-converter.html",
      file: "mph-to-kph-converter.html",
      category: "calculators",
      title: "MPH to KPH Converter — Miles to Kilometres per Hour",
      desc: "Convert speed from miles per hour to kilometres per hour.",
      card: "MPH to KPH",
      cardDesc: "mph → km/h.",
      body: `<h1>MPH to KPH converter</h1>${ad}
<div class="tool-panel">
<label for="mph">Speed (mph)</label><input id="mph" type="number" step="0.1" value="70" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const m=Number(document.getElementById('mph').value)||0;
  const k=m*1.609344;
  document.getElementById('out').textContent=m+' mph = '+k.toFixed(2)+' km/h';
  ${done}
};
</script>`,
    },
    {
      path: "/kph-to-mph-converter.html",
      file: "kph-to-mph-converter.html",
      category: "calculators",
      title: "KPH to MPH Converter — Kilometres to Miles per Hour",
      desc: "Convert speed from kilometres per hour to miles per hour.",
      card: "KPH to MPH",
      cardDesc: "km/h → mph.",
      body: `<h1>KPH to MPH converter</h1>${ad}
<div class="tool-panel">
<label for="kph">Speed (km/h)</label><input id="kph" type="number" value="130" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const k=Number(document.getElementById('kph').value)||0;
  document.getElementById('out').textContent=k+' km/h = '+(k/1.609344).toFixed(2)+' mph';
  ${done}
};
</script>`,
    },
    {
      path: "/l-per-100km-calculator.html",
      file: "l-per-100km-calculator.html",
      category: "calculators",
      title: "L/100km Calculator — Fuel Consumption",
      desc: "Calculate litres per 100 km from distance driven and fuel used.",
      card: "L/100km calculator",
      cardDesc: "EU fuel consumption.",
      body: `<h1>Litres per 100 km calculator</h1>${ad}
<div class="tool-panel">
<label for="km">Distance (km)</label><input id="km" type="number" value="320" />
<label for="lit">Fuel used (litres)</label><input id="lit" type="number" step="0.1" value="24" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const km=Number(document.getElementById('km').value)||0;
  const l=Number(document.getElementById('lit').value)||0;
  if(!km){ document.getElementById('out').textContent='Enter distance.'; return; }
  const c=(l/km)*100;
  document.getElementById('out').textContent=c.toFixed(2)+' L/100km · '+l+' L over '+km+' km';
  ${done}
};
</script>`,
    },
    {
      path: "/eu-fuel-cost-calculator.html",
      file: "eu-fuel-cost-calculator.html",
      category: "calculators",
      title: "EU Fuel Cost Calculator — Trip Cost in Euros",
      desc: "Estimate fuel cost for a trip from distance, L/100km consumption, and price per litre in euros.",
      card: "EU fuel trip cost",
      cardDesc: "Trip cost from L/100km.",
      body: `<h1>EU fuel cost calculator</h1>${ad}
<div class="tool-panel">
<label for="km">Distance (km)</label><input id="km" type="number" value="450" />
<label for="cons">Consumption (L/100km)</label><input id="cons" type="number" step="0.1" value="6.2" />
<label for="price">Fuel price (€ / litre)</label><input id="price" type="number" step="0.001" value="1.65" />
<button type="button" class="primary" id="go">Trip cost</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=function(){
  const km=Number(document.getElementById('km').value)||0;
  const cons=Number(document.getElementById('cons').value)/100;
  const price=Number(document.getElementById('price').value)||0;
  const litres=km*cons;
  const cost=litres*price;
  document.getElementById('out').textContent='Fuel ~'+litres.toFixed(1)+' L · cost €'+cost.toFixed(2)+' for '+km+' km';
  ${done}
};
</script>`,
    },
    {
      path: "/france-income-tax-calculator.html",
      file: "france-income-tax-calculator.html",
      category: "calculators",
      title: "France Income Tax Calculator — Impôt sur le Revenu Estimate",
      desc: "Simplified estimate of French income tax on annual net taxable income (one tax share).",
      card: "France income tax",
      cardDesc: "French tax estimate.",
      body: `<h1>France income tax calculator</h1>${ad}
<div class="tool-panel">
<label for="inc">Net taxable income (€ / year)</label><input id="inc" type="number" value="45000" />
<label for="parts">Tax household shares</label><input id="parts" type="number" min="1" step="0.5" value="1" />
<button type="button" class="primary" id="go">Estimate tax</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Uses 2024 barème slices on income per part; credits and local rules omitted.</p>
</div>
<script>
function frTax(perPart){
  const b=[[11294,0],[28797,0.11],[82341,0.30],[177106,0.41],[1e15,0.45]];
  let tax=0, rem=perPart, prev=0;
  for(let i=0;i<b.length;i++){
    const [cap,rte]=b[i];
    const slice=Math.min(rem,Math.max(0,cap-prev));
    tax+=slice*rte;
    rem-=slice; prev=cap;
    if(rem<=0) break;
  }
  return tax;
}
document.getElementById('go').onclick=function(){
  const inc=Number(document.getElementById('inc').value)||0;
  const parts=Math.max(0.5,Number(document.getElementById('parts').value)||1);
  const per=inc/parts;
  const perTax=frTax(per);
  const total=perTax*parts;
  document.getElementById('out').textContent='Income tax about €'+total.toFixed(0)+'/year · €'+(total/12).toFixed(0)+'/month (€'+per.toFixed(0)+' per part)';
  ${done}
};
</script>`,
    },
    {
      path: "/germany-income-tax-calculator.html",
      file: "germany-income-tax-calculator.html",
      category: "calculators",
      title: "Germany Income Tax Calculator — Einkommensteuer Estimate",
      desc: "Rough estimate of German income tax and solidarity surcharge on annual gross salary.",
      card: "Germany income tax",
      cardDesc: "German tax estimate.",
      body: `<h1>Germany income tax calculator</h1>${ad}
<div class="tool-panel">
<label for="inc">Annual gross income (€)</label><input id="inc" type="number" value="55000" />
<button type="button" class="primary" id="go">Estimate tax</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">Simplified; ignores church tax, deductions, and social contributions.</p>
</div>
<script>
function deTax(z){
  if(z<=11604) return 0;
  if(z<=17005) return (z-11604)*0.14;
  if(z<=66760) return (17005-11604)*0.14+(z-17005)*0.24;
  if(z<=277826) return (17005-11604)*0.14+(66760-17005)*0.24+(z-66760)*0.42;
  return (17005-11604)*0.14+(66760-17005)*0.24+(277826-66760)*0.42+(z-277826)*0.45;
}
document.getElementById('go').onclick=function(){
  const inc=Number(document.getElementById('inc').value)||0;
  const tax=deTax(inc);
  const soli=tax>16956?tax*0.055:0;
  const total=tax+soli;
  document.getElementById('out').textContent='Income tax ~€'+tax.toFixed(0)+' + solidarity €'+soli.toFixed(0)+' = €'+total.toFixed(0)+' on €'+inc.toLocaleString('de-DE');
  ${done}
};
</script>`,
    },
    {
      path: "/spain-income-tax-calculator.html",
      file: "spain-income-tax-calculator.html",
      category: "calculators",
      title: "Spain Income Tax Calculator — IRPF State Brackets",
      desc: "Estimate Spanish state income tax (IRPF) on annual taxable income.",
      card: "Spain income tax",
      cardDesc: "Spanish IRPF estimate.",
      body: `<h1>Spain income tax calculator</h1>${ad}
<div class="tool-panel">
<label for="inc">Taxable income (€ / year)</label><input id="inc" type="number" value="38000" />
<button type="button" class="primary" id="go">Estimate IRPF</button>
<p id="out" class="tool-feedback" role="status"></p>
<p class="tool-hint">State scale only; autonomous community surcharge not included.</p>
</div>
<script>
function esTax(inc){
  const b=[[12450,0.19],[20200,0.24],[35200,0.30],[60000,0.37],[300000,0.45],[1e15,0.47]];
  let tax=0, rem=inc, prev=0;
  for(const [cap,rte] of b){
    const slice=Math.min(rem,Math.max(0,cap-prev));
    tax+=slice*rte; rem-=slice; prev=cap;
    if(rem<=0) break;
  }
  return tax;
}
document.getElementById('go').onclick=function(){
  const inc=Number(document.getElementById('inc').value)||0;
  const tax=esTax(inc);
  document.getElementById('out').textContent='State IRPF about €'+tax.toFixed(0)+' · net ≈ €'+(inc-tax).toFixed(0);
  ${done}
};
</script>`,
    },
    {
      path: "/ireland-income-tax-calculator.html",
      file: "ireland-income-tax-calculator.html",
      category: "calculators",
      title: "Ireland Income Tax Calculator — PAYE Estimate",
      desc: "Estimate Irish income tax and USC on annual earnings for a single person.",
      card: "Ireland income tax",
      cardDesc: "Irish PAYE estimate.",
      body: `<h1>Ireland income tax calculator</h1>${ad}
<div class="tool-panel">
<label for="inc">Annual gross pay (€)</label><input id="inc" type="number" value="48000" />
<button type="button" class="primary" id="go">Estimate PAYE</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function ieTax(inc){
  const cut=42000;
  const tax=inc<=cut?inc*0.2:(cut*0.2+(inc-cut)*0.4);
  let usc=0;
  if(inc>12012) usc+=(Math.min(inc,25760)-12012)*0.02;
  if(inc>25760) usc+=(Math.min(inc,70044)-25760)*0.04;
  if(inc>70044) usc+=(inc-70044)*0.08;
  return {tax, usc: Math.max(0,usc)};
}
document.getElementById('go').onclick=function(){
  const inc=Number(document.getElementById('inc').value)||0;
  const r=ieTax(inc);
  const prsi=inc*0.04;
  const total=r.tax+r.usc+prsi;
  document.getElementById('out').textContent='Tax €'+r.tax.toFixed(0)+' · USC €'+r.usc.toFixed(0)+' · PRSI €'+prsi.toFixed(0)+' · take home €'+(inc-total).toFixed(0);
  ${done}
};
</script>`,
    },
    {
      path: "/netherlands-mortgage-calculator.html",
      file: "netherlands-mortgage-calculator.html",
      category: "calculators",
      title: "Netherlands Mortgage Calculator — Monthly Payment",
      desc: "Estimate monthly Dutch mortgage payment in euros from loan, interest rate, and term.",
      card: "Netherlands mortgage",
      cardDesc: "Monthly payment in €.",
      body: `<h1>Netherlands mortgage calculator</h1>${ad}
<div class="tool-panel">
<label for="loan">Mortgage amount (€)</label><input id="loan" type="number" value="385000" />
<label for="rate">Interest rate (%)</label><input id="rate" type="number" step="0.01" value="3.9" />
<label for="yr">Term (years)</label><input id="yr" type="number" value="30" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
function pmt(p,r,n){ return r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1); }
document.getElementById('go').onclick=function(){
  const loan=Number(document.getElementById('loan').value)||0;
  const m=pmt(loan,Number(document.getElementById('rate').value)/100/12,Number(document.getElementById('yr').value)*12);
  document.getElementById('out').textContent='About €'+m.toFixed(2)+'/month annuity mortgage on €'+loan.toLocaleString('de-DE');
  ${done}
};
</script>`,
    },
  ];
}