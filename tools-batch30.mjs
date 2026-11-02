/** Batch 30 — High-search India finance, payroll, writing, and everyday calculators. */

export function batch30Tools(ad) {
  return [
    {
      path: "/personal-loan-calculator.html",
      file: "personal-loan-calculator.html",
      category: "india",
      title: "Personal Loan EMI Calculator — Monthly Payment India",
      desc: "Estimate personal loan EMI from principal, annual interest rate, and tenure in months. Free India EMI calculator.",
      card: "Personal loan EMI",
      cardDesc: "Monthly EMI estimate.",
      body: `<h1>Personal loan EMI calculator</h1>${ad}
<div class="tool-panel">
<label for="p">Loan amount (₹)</label><input id="p" type="number" value="500000" />
<label for="r">Interest rate (% per year)</label><input id="r" type="number" step="0.01" value="14" />
<label for="n">Tenure (months)</label><input id="n" type="number" value="36" />
<button type="button" class="primary" id="go">Calculate EMI</button>
<div class="stats"><div class="stat"><strong id="emi">—</strong>Monthly EMI</div><div class="stat"><strong id="tot">—</strong>Total payment</div></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=+document.getElementById('p').value, annual=+document.getElementById('r').value/100, n=+document.getElementById('n').value;
  const r=annual/12;
  let emi=0;
  if(r===0) emi=P/n; else emi=P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  document.getElementById('emi').textContent='₹'+emi.toFixed(0);
  document.getElementById('tot').textContent='₹'+(emi*n).toFixed(0);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/ltcg-tax-calculator.html",
      file: "ltcg-tax-calculator.html",
      category: "india",
      title: "LTCG Tax Calculator India — Long-Term Capital Gains Estimate",
      desc: "Rough LTCG tax on listed equity gains in India with ₹1.25 lakh exemption. Illustration only—not tax advice.",
      card: "LTCG tax (India)",
      cardDesc: "Equity LTCG estimate.",
      body: `<h1>LTCG tax calculator (India)</h1>
<p class="prose" style="font-size:0.9rem">Simplified illustration for listed equity LTCG (12.5% on taxable gain). Rules change—confirm with a CA.</p>${ad}
<div class="tool-panel">
<label for="buy">Purchase value (₹)</label><input id="buy" type="number" value="500000" />
<label for="sell">Sale value (₹)</label><input id="sell" type="number" value="750000" />
<label for="ex">Exemption (₹)</label><input id="ex" type="number" value="125000" />
<button type="button" class="primary" id="go">Estimate tax</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const gain=Math.max(0,+document.getElementById('sell').value-+document.getElementById('buy').value);
  const ex=+document.getElementById('ex').value;
  const taxable=Math.max(0,gain-ex);
  const tax=taxable*0.125;
  document.getElementById('out').textContent='Gain ₹'+gain.toLocaleString('en-IN')+' · Taxable ₹'+taxable.toLocaleString('en-IN')+' · Est. LTCG tax ₹'+tax.toFixed(0)+' (12.5%)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/rent-receipt-generator.html",
      file: "rent-receipt-generator.html",
      category: "india",
      title: "Rent Receipt Generator India — Printable HRA Receipt",
      desc: "Fill landlord, tenant, and rent details and print a simple rent receipt for HRA records. Browser-only template.",
      card: "Rent receipt",
      cardDesc: "Printable HRA receipt.",
      body: `<h1>Rent receipt generator (India)</h1>${ad}
<div class="tool-panel">
<label for="tenant">Tenant name</label><input id="tenant" type="text" />
<label for="landlord">Landlord name</label><input id="landlord" type="text" />
<label for="addr">Property address</label><textarea id="addr" rows="2"></textarea>
<label for="amt">Rent amount (₹)</label><input id="amt" type="number" value="15000" />
<label for="month">For month</label><input id="month" type="month" />
<button type="button" class="primary" id="go">Preview receipt</button>
</div>
<div id="preview" class="tool-panel" hidden></div>
<script>
document.getElementById('go').onclick=()=>{
  const m=document.getElementById('month').value||new Date().toISOString().slice(0,7);
  const html='<h2>Rent receipt</h2><p>Received from <strong>'+document.getElementById('tenant').value+'</strong> the sum of <strong>₹'+(+document.getElementById('amt').value).toLocaleString('en-IN')+'</strong> towards rent for '+m+'.</p><p>Property: '+document.getElementById('addr').value+'</p><p>Landlord: '+document.getElementById('landlord').value+'</p><p>Date: '+new Date().toLocaleDateString('en-IN')+'</p><p><em>Template only—use as per your lease and tax rules.</em></p>';
  const el=document.getElementById('preview');
  el.innerHTML=html; el.hidden=false;
  el.insertAdjacentHTML('beforeend','<button type="button" class="primary" id="print">Print</button>');
  document.getElementById('print').onclick=()=>window.print();
};
</script>`,
    },
    {
      path: "/leave-encashment-calculator.html",
      file: "leave-encashment-calculator.html",
      category: "india",
      title: "Leave Encashment Calculator India — Estimate Payout",
      desc: "Rough leave encashment from basic salary and unused leave days. Illustration for salary planning—not payroll advice.",
      card: "Leave encashment",
      cardDesc: "Basic × leave days.",
      body: `<h1>Leave encashment calculator</h1>${ad}
<div class="tool-panel">
<label for="basic">Monthly basic (₹)</label><input id="basic" type="number" value="40000" />
<label for="days">Unused leave days</label><input id="days" type="number" value="10" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const daily=+document.getElementById('basic').value/30;
  const encash=daily*(+document.getElementById('days').value);
  document.getElementById('out').textContent='Approx encashment ₹'+encash.toFixed(0)+' (basic÷30 × leave days). Tax rules vary—check employer policy.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/professional-tax-calculator.html",
      file: "professional-tax-calculator.html",
      category: "india",
      title: "Professional Tax Calculator India — State Slab Illustration",
      desc: "Illustrative monthly professional tax from gross salary using simplified Karnataka-style slabs. Not official for all states.",
      card: "Professional tax",
      cardDesc: "Monthly PT estimate.",
      body: `<h1>Professional tax (illustration)</h1>
<p class="prose" style="font-size:0.9rem">States set different slabs—this uses a simplified Karnataka-style monthly table for planning only.</p>${ad}
<div class="tool-panel">
<label for="g">Gross monthly salary (₹)</label><input id="g" type="number" value="75000" />
<button type="button" class="primary" id="go">Estimate PT</button>
<p id="out" class="ok"></p>
</div>
<script>
function pt(g){
  if(g<=15000) return 0;
  if(g<=25000) return 150;
  if(g<=50000) return 200;
  return 250;
}
document.getElementById('go').onclick=()=>{
  const g=+document.getElementById('g').value;
  document.getElementById('out').textContent='Illustrative monthly professional tax: ₹'+pt(g)+'. Verify your state’s official slab.';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/aadhaar-format-checker.html",
      file: "aadhaar-format-checker.html",
      category: "india",
      title: "Aadhaar Format Checker — 12-Digit UID Pattern",
      desc: "Check whether an Aadhaar number matches the 12-digit Verhoeff pattern. Format validation only—not UIDAI verification.",
      card: "Aadhaar format",
      cardDesc: "12-digit pattern check.",
      body: `<h1>Aadhaar format checker</h1>${ad}
<div class="tool-panel">
<label for="uid">Aadhaar number</label><input id="uid" type="text" inputmode="numeric" maxlength="14" placeholder="1234 5678 9012" />
<button type="button" class="primary" id="go">Validate format</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
const d=[[0,1,2,3,4,5,6,7,8,9],[1,2,3,4,0,6,7,8,9,5],[2,3,4,0,1,7,8,9,5,6],[3,4,0,1,2,8,9,5,6,7],[4,0,1,2,3,9,5,6,7,8],[5,9,8,7,6,0,4,3,2,1],[6,5,9,8,7,1,0,4,3,2],[7,6,5,9,8,2,1,0,4,3],[8,7,6,5,9,3,2,1,0,4],[9,8,7,6,5,4,3,2,1,0]];
const p=[[0,1,2,3,4,5,6,7,8,9],[1,5,7,6,2,8,3,0,9,4],[5,8,0,3,7,9,6,1,4,2],[8,9,1,6,0,4,3,5,2,7],[9,4,5,3,1,2,6,8,7,0],[4,2,8,6,5,7,3,9,0,1],[2,7,9,3,8,0,6,4,1,5],[7,0,4,6,9,1,3,2,5,8]];
function verhoeff(num){
  let c=0; const arr=num.split('').reverse().map(Number);
  for(let i=0;i<arr.length;i++) c=d[c][p[i%8][arr[i]]];
  return c===0;
}
document.getElementById('go').onclick=()=>{
  const raw=document.getElementById('uid').value.replace(/\\s/g,'');
  const out=document.getElementById('out');
  if(!/^\\d{12}$/.test(raw)){ out.className='error'; out.textContent='Enter exactly 12 digits.'; return; }
  if(verhoeff(raw)){ out.className='ok'; out.textContent='Format check passed (Verhoeff). Not verified with UIDAI.'; }
  else { out.className='error'; out.textContent='Check digit failed—likely typo. Not a government lookup.'; }
};
</script>`,
    },
    {
      path: "/work-hours-calculator.html",
      file: "work-hours-calculator.html",
      category: "productivity",
      title: "Work Hours Calculator — Daily Hours Minus Break",
      desc: "Calculate paid work hours from start time, end time, and break minutes. Free timesheet helper.",
      card: "Work hours",
      cardDesc: "Shift length minus break.",
      body: `<h1>Work hours calculator</h1>${ad}
<div class="tool-panel">
<label for="start">Start</label><input id="start" type="time" value="09:00" />
<label for="end">End</label><input id="end" type="time" value="18:00" />
<label for="brk">Break (minutes)</label><input id="brk" type="number" value="60" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const [sh,sm]=document.getElementById('start').value.split(':').map(Number);
  const [eh,em]=document.getElementById('end').value.split(':').map(Number);
  let mins=(eh*60+em)-(sh*60+sm)-(+document.getElementById('brk').value);
  if(mins<0) mins+=24*60;
  const h=Math.floor(mins/60), m=mins%60;
  document.getElementById('out').textContent=h+' h '+m+' m ('+(mins/60).toFixed(2)+' decimal hours)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/time-duration-calculator.html",
      file: "time-duration-calculator.html",
      category: "productivity",
      title: "Time Duration Calculator — Days, Hours & Minutes Between Dates",
      desc: "Find the duration between two date-times in days, hours, and minutes. Free elapsed time calculator.",
      card: "Time duration",
      cardDesc: "Elapsed time between dates.",
      body: `<h1>Time duration calculator</h1>${ad}
<div class="tool-panel">
<label for="a">From</label><input id="a" type="datetime-local" />
<label for="b">To</label><input id="b" type="datetime-local" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
const now=new Date(); const pad=n=>String(n).padStart(2,'0');
const local=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'T'+pad(d.getHours())+':'+pad(d.getMinutes());
document.getElementById('a').value=local(now);
document.getElementById('b').value=local(new Date(now.getTime()+86400000));
document.getElementById('go').onclick=()=>{
  const ms=new Date(document.getElementById('b').value)-new Date(document.getElementById('a').value);
  const abs=Math.abs(ms);
  const days=Math.floor(abs/86400000);
  const hrs=Math.floor((abs%86400000)/3600000);
  const mins=Math.floor((abs%3600000)/60000);
  document.getElementById('out').textContent=(ms<0?'−':'')+days+' days, '+hrs+' hours, '+mins+' minutes';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/net-pay-calculator.html",
      file: "net-pay-calculator.html",
      category: "calculators",
      title: "Net Pay Calculator — Hourly Wage to Paycheck",
      desc: "Estimate net pay from hourly rate, hours per week, and a simple tax/deduction percentage. Planning only.",
      card: "Net pay",
      cardDesc: "Hourly → paycheck.",
      body: `<h1>Net pay calculator</h1>${ad}
<div class="tool-panel">
<label for="rate">Hourly rate</label><input id="rate" type="number" step="0.01" value="25" />
<label for="hrs">Hours per week</label><input id="hrs" type="number" value="40" />
<label for="ded">Deductions (%)</label><input id="ded" type="number" value="22" />
<button type="button" class="primary" id="go">Calculate</button>
<div class="stats"><div class="stat"><strong id="gross">—</strong>Monthly gross</div><div class="stat"><strong id="net">—</strong>Monthly net</div></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const gross=+document.getElementById('rate').value*+document.getElementById('hrs').value*52/12;
  const net=gross*(1-+document.getElementById('ded').value/100);
  document.getElementById('gross').textContent=gross.toFixed(2);
  document.getElementById('net').textContent=net.toFixed(2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/pay-raise-calculator.html",
      file: "pay-raise-calculator.html",
      category: "calculators",
      title: "Pay Raise Calculator — New Salary After Increase",
      desc: "Calculate new salary and yearly difference after a percent raise. Free pay increase calculator.",
      card: "Pay raise",
      cardDesc: "% raise → new pay.",
      body: `<h1>Pay raise calculator</h1>${ad}
<div class="tool-panel">
<label for="sal">Current annual salary</label><input id="sal" type="number" value="60000" />
<label for="pct">Raise (%)</label><input id="pct" type="number" step="0.1" value="8" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=+document.getElementById('sal').value, r=+document.getElementById('pct').value/100;
  const neu=s*(1+r);
  document.getElementById('out').textContent='New salary '+neu.toFixed(2)+' · Increase '+(neu-s).toFixed(2)+' per year';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/reverse-percentage-calculator.html",
      file: "reverse-percentage-calculator.html",
      category: "calculators",
      title: "Reverse Percentage Calculator — Find the Original Number",
      desc: "If 20 is 10% of a number, what is the number? Free reverse percent calculator.",
      card: "Reverse percentage",
      cardDesc: "Part & % → whole.",
      body: `<h1>Reverse percentage calculator</h1>${ad}
<div class="tool-panel">
<label for="part">Part (result)</label><input id="part" type="number" value="20" />
<label for="pct">Is what percent?</label><input id="pct" type="number" value="10" />
<button type="button" class="primary" id="go">Find whole</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=+document.getElementById('pct').value;
  if(!p){ document.getElementById('out').className='error'; document.getElementById('out').textContent='Percent cannot be 0.'; return; }
  const whole=+document.getElementById('part').value/(p/100);
  document.getElementById('out').className='ok';
  document.getElementById('out').textContent='Whole = '+whole.toFixed(4)+' ('+document.getElementById('part').value+' is '+p+'%)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/mortgage-amortization-calculator.html",
      file: "mortgage-amortization-calculator.html",
      category: "calculators",
      title: "Mortgage Amortization Calculator — Payment Schedule",
      desc: "See monthly mortgage payment and first-year principal vs interest split. Free amortization estimate.",
      card: "Mortgage amortization",
      cardDesc: "Payment schedule.",
      body: `<h1>Mortgage amortization calculator</h1>${ad}
<div class="tool-panel">
<label for="p">Loan principal</label><input id="p" type="number" value="300000" />
<label for="r">Annual rate (%)</label><input id="r" type="number" step="0.01" value="6.5" />
<label for="y">Term (years)</label><input id="y" type="number" value="30" />
<button type="button" class="primary" id="go">Build schedule</button>
<p id="sum" class="ok"></p>
<div id="tbl" style="overflow:auto;max-height:280px"></div>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=+document.getElementById('p').value, r=+document.getElementById('r').value/100/12, n=+document.getElementById('y').value*12;
  const emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  let bal=P, ip=0, pr=0, rows='';
  for(let i=1;i<=Math.min(n,24);i++){
    const interest=bal*r; const principal=emi-interest; bal-=principal; ip+=interest; pr+=principal;
    rows+='<tr><td>'+i+'</td><td>'+emi.toFixed(2)+'</td><td>'+principal.toFixed(2)+'</td><td>'+interest.toFixed(2)+'</td><td>'+Math.max(0,bal).toFixed(2)+'</td></tr>';
  }
  document.getElementById('sum').textContent='EMI '+emi.toFixed(2)+' · First '+Math.min(n,24)+' mo: principal '+pr.toFixed(0)+', interest '+ip.toFixed(0);
  document.getElementById('tbl').innerHTML='<table><thead><tr><th>#</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead><tbody>'+rows+'</tbody></table>';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/car-depreciation-calculator.html",
      file: "car-depreciation-calculator.html",
      category: "calculators",
      title: "Car Depreciation Calculator — Value Over Years",
      desc: "Estimate car value decline with straight-line percent per year. Free vehicle depreciation calculator.",
      card: "Car depreciation",
      cardDesc: "Value after N years.",
      body: `<h1>Car depreciation calculator</h1>${ad}
<div class="tool-panel">
<label for="price">Purchase price</label><input id="price" type="number" value="800000" />
<label for="rate">Depreciation (% per year)</label><input id="rate" type="number" value="15" />
<label for="years">Years</label><input id="years" type="number" value="5" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=+document.getElementById('price').value, r=+document.getElementById('rate').value/100, y=+document.getElementById('years').value;
  const val=p*Math.pow(1-r,y);
  document.getElementById('out').textContent='Est. value after '+y+' years: '+val.toFixed(0)+' (lost '+(p-val).toFixed(0)+')';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/feet-inches-to-cm-converter.html",
      file: "feet-inches-to-cm-converter.html",
      category: "calculators",
      title: "Feet & Inches to CM Converter — Height Calculator",
      desc: "Convert feet and inches to centimeters and back. Free height unit converter.",
      card: "Feet & inches → cm",
      cardDesc: "Height conversion.",
      body: `<h1>Feet & inches to cm</h1>${ad}
<div class="tool-panel">
<label for="ft">Feet</label><input id="ft" type="number" value="5" />
<label for="in">Inches</label><input id="in" type="number" value="9" />
<button type="button" class="primary" id="go">To cm</button>
<p id="out" class="ok"></p>
<label for="cm">Centimeters</label><input id="cm" type="number" step="0.1" />
<button type="button" class="primary rs-secondary" id="back">Cm to ft/in</button>
<p id="out2" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const cm=(+document.getElementById('ft').value*12+ +document.getElementById('in').value)*2.54;
  document.getElementById('out').textContent=cm.toFixed(1)+' cm';
  document.getElementById('cm').value=cm.toFixed(1);
};
document.getElementById('back').onclick=()=>{
  const total=+document.getElementById('cm').value/2.54;
  const ft=Math.floor(total/12), inch=(total-ft*12).toFixed(1);
  document.getElementById('out2').textContent=ft+"' "+inch+'"';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/pregnancy-weight-gain-calculator.html",
      file: "pregnancy-weight-gain-calculator.html",
      category: "calculators",
      title: "Pregnancy Weight Gain Calculator — BMI-Based Range",
      desc: "Rough recommended total weight gain in pregnancy from pre-pregnancy BMI. Not medical advice.",
      card: "Pregnancy weight gain",
      cardDesc: "BMI-based range.",
      body: `<h1>Pregnancy weight gain calculator</h1>
<p class="prose" style="font-size:0.9rem">Uses common pre-pregnancy BMI bands (IOM-style). Ask your clinician for personal guidance.</p>${ad}
<div class="tool-panel">
<label for="h">Height (cm)</label><input id="h" type="number" value="165" />
<label for="w">Pre-pregnancy weight (kg)</label><input id="w" type="number" value="62" />
<button type="button" class="primary" id="go">Show range</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const bmi=+document.getElementById('w').value/Math.pow(+document.getElementById('h').value/100,2);
  let range='17–25 kg';
  if(bmi<18.5) range='12.5–18 kg';
  else if(bmi<25) range='11.5–16 kg';
  else if(bmi<30) range='7–11.5 kg';
  else range='5–9 kg';
  document.getElementById('out').textContent='BMI '+bmi.toFixed(1)+' · Suggested total gain: '+range;
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/words-to-pages-calculator.html",
      file: "words-to-pages-calculator.html",
      category: "writing",
      title: "Words to Pages Calculator — Page Count From Word Count",
      desc: "Convert word count to estimated pages for essays and manuscripts (250 words per page default).",
      card: "Words to pages",
      cardDesc: "Page count estimate.",
      body: `<h1>Words to pages calculator</h1>${ad}
<div class="tool-panel">
<label for="words">Word count</label><input id="words" type="number" value="1500" />
<label for="wpp">Words per page</label><input id="wpp" type="number" value="250" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const pages=+document.getElementById('words').value/+document.getElementById('wpp').value;
  document.getElementById('out').textContent=pages.toFixed(2)+' pages (≈ '+Math.ceil(pages)+' printed pages)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/currency-converter.html",
      file: "currency-converter.html",
      category: "calculators",
      title: "Currency Converter — Manual Exchange Rate",
      desc: "Multiply amount by an exchange rate you enter (from your bank or xe.com). No live rates—offline friendly.",
      card: "Currency converter",
      cardDesc: "Manual FX rate.",
      body: `<h1>Currency converter</h1>
<p class="prose" style="font-size:0.9rem">Enter the rate yourself (1 unit of “from” = rate units of “to”). We do not fetch live FX.</p>${ad}
<div class="tool-panel">
<label for="amt">Amount</label><input id="amt" type="number" value="100" />
<label for="rate">Rate (1 from = rate to)</label><input id="rate" type="number" step="0.0001" value="83.5" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=+document.getElementById('amt').value*+document.getElementById('rate').value;
  document.getElementById('out').textContent='Converted amount: '+v.toFixed(4);
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
