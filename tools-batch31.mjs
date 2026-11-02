/** Batch 31 — India loans/tax, health, dev, and finance calculators. */

export function batch31Tools(ad) {
  return [
    {
      path: "/stamp-duty-calculator.html",
      file: "stamp-duty-calculator.html",
      category: "india",
      title: "Stamp Duty Calculator India — Property Registration Estimate",
      desc: "Estimate stamp duty from property value and state rate percent. Illustration only—rates vary by state and property type.",
      card: "Stamp duty (India)",
      cardDesc: "Property duty estimate.",
      body: `<h1>Stamp duty calculator (India)</h1>
<p class="prose" style="font-size:0.9rem">Enter your state’s stamp duty rate (check state registration websites). This is not legal or tax advice.</p>${ad}
<div class="tool-panel">
<label for="val">Property value (₹)</label><input id="val" type="number" value="5000000" />
<label for="rate">Stamp duty rate (%)</label><input id="rate" type="number" step="0.01" value="5" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const v=+document.getElementById('val').value, r=+document.getElementById('rate').value/100;
  document.getElementById('out').textContent='Est. stamp duty ₹'+(v*r).toLocaleString('en-IN',{maximumFractionDigits:0});
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/education-loan-calculator.html",
      file: "education-loan-calculator.html",
      category: "india",
      title: "Education Loan EMI Calculator — Student Loan India",
      desc: "Calculate education loan EMI from amount, interest rate, and tenure in months. Free student loan EMI calculator.",
      card: "Education loan EMI",
      cardDesc: "Student loan payment.",
      body: `<h1>Education loan EMI calculator</h1>${ad}
<div class="tool-panel">
<label for="p">Loan amount (₹)</label><input id="p" type="number" value="800000" />
<label for="r">Interest (% p.a.)</label><input id="r" type="number" step="0.01" value="9.5" />
<label for="n">Tenure (months)</label><input id="n" type="number" value="84" />
<button type="button" class="primary" id="go">Calculate EMI</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=+document.getElementById('p').value, r=+document.getElementById('r').value/100/12, n=+document.getElementById('n').value;
  const emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  document.getElementById('out').textContent='EMI ₹'+emi.toFixed(0)+' · Total ₹'+(emi*n).toFixed(0);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/bike-loan-calculator.html",
      file: "bike-loan-calculator.html",
      category: "india",
      title: "Bike Loan EMI Calculator — Two-Wheeler Loan India",
      desc: "Estimate two-wheeler loan EMI from price, down payment, rate, and tenure. Free bike loan calculator.",
      card: "Bike loan EMI",
      cardDesc: "Two-wheeler EMI.",
      body: `<h1>Bike loan EMI calculator</h1>${ad}
<div class="tool-panel">
<label for="price">On-road price (₹)</label><input id="price" type="number" value="120000" />
<label for="down">Down payment (₹)</label><input id="down" type="number" value="20000" />
<label for="r">Interest (% p.a.)</label><input id="r" type="number" value="12" />
<label for="n">Tenure (months)</label><input id="n" type="number" value="36" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=Math.max(0,+document.getElementById('price').value-+document.getElementById('down').value);
  const r=+document.getElementById('r').value/100/12, n=+document.getElementById('n').value;
  const emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  document.getElementById('out').textContent='Loan ₹'+P.toLocaleString('en-IN')+' · EMI ₹'+emi.toFixed(0);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/business-loan-calculator.html",
      file: "business-loan-calculator.html",
      category: "india",
      title: "Business Loan EMI Calculator — MSME Loan Estimate",
      desc: "Calculate business loan EMI for MSME and working capital loans. Free India business loan EMI calculator.",
      card: "Business loan EMI",
      cardDesc: "MSME EMI estimate.",
      body: `<h1>Business loan EMI calculator</h1>${ad}
<div class="tool-panel">
<label for="p">Loan amount (₹)</label><input id="p" type="number" value="1000000" />
<label for="r">Interest (% p.a.)</label><input id="r" type="number" value="16" />
<label for="n">Tenure (months)</label><input id="n" type="number" value="48" />
<button type="button" class="primary" id="go">Calculate EMI</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=+document.getElementById('p').value, r=+document.getElementById('r').value/100/12, n=+document.getElementById('n').value;
  const emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  document.getElementById('out').textContent='EMI ₹'+emi.toFixed(0);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/gold-loan-calculator.html",
      file: "gold-loan-calculator.html",
      category: "india",
      title: "Gold Loan EMI Calculator — Loan Against Gold India",
      desc: "Estimate EMI for a gold loan from principal, annual rate, and tenure. Illustration for jewel-loan planning.",
      card: "Gold loan EMI",
      cardDesc: "Loan against gold.",
      body: `<h1>Gold loan EMI calculator</h1>${ad}
<div class="tool-panel">
<label for="p">Loan amount (₹)</label><input id="p" type="number" value="200000" />
<label for="r">Interest (% p.a.)</label><input id="r" type="number" value="11" />
<label for="n">Tenure (months)</label><input id="n" type="number" value="24" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const P=+document.getElementById('p').value, r=+document.getElementById('r').value/100/12, n=+document.getElementById('n').value;
  const emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
  document.getElementById('out').textContent='EMI ₹'+emi.toFixed(0)+' · Interest cost ₹'+((emi*n)-P).toFixed(0);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/tds-calculator.html",
      file: "tds-calculator.html",
      category: "india",
      title: "TDS Calculator India — Tax Deducted at Source",
      desc: "Calculate TDS amount from payment and TDS rate percent. Simple India TDS illustration—not filing software.",
      card: "TDS calculator",
      cardDesc: "Deduct TDS on payment.",
      body: `<h1>TDS calculator (India)</h1>${ad}
<div class="tool-panel">
<label for="pay">Payment amount (₹)</label><input id="pay" type="number" value="100000" />
<label for="rate">TDS rate (%)</label><input id="rate" type="number" step="0.01" value="10" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const pay=+document.getElementById('pay').value, r=+document.getElementById('rate').value/100;
  const tds=pay*r;
  document.getElementById('out').textContent='TDS ₹'+tds.toFixed(2)+' · Net payable ₹'+(pay-tds).toFixed(2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/stcg-tax-calculator.html",
      file: "stcg-tax-calculator.html",
      category: "india",
      title: "STCG Tax Calculator India — Short-Term Capital Gains",
      desc: "Rough STCG tax on listed equity (20% on gain illustration). Not tax advice—rules vary by asset and holding period.",
      card: "STCG tax (India)",
      cardDesc: "Equity STCG estimate.",
      body: `<h1>STCG tax calculator (India)</h1>
<p class="prose" style="font-size:0.9rem">Illustration using 20% on listed equity STCG gain—confirm current law with a CA.</p>${ad}
<div class="tool-panel">
<label for="buy">Purchase (₹)</label><input id="buy" type="number" value="200000" />
<label for="sell">Sale (₹)</label><input id="sell" type="number" value="240000" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const gain=Math.max(0,+document.getElementById('sell').value-+document.getElementById('buy').value);
  const tax=gain*0.2;
  document.getElementById('out').textContent='Gain ₹'+gain.toLocaleString('en-IN')+' · Est. tax ₹'+tax.toFixed(0)+' (20% illustration)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/mutual-fund-returns-calculator.html",
      file: "mutual-fund-returns-calculator.html",
      category: "calculators",
      title: "Mutual Fund Returns Calculator — Lump Sum Growth",
      desc: "Project mutual fund value from lump sum, expected annual return, and years. Illustration only—not SEBI advice.",
      card: "MF returns",
      cardDesc: "Lump sum growth.",
      body: `<h1>Mutual fund returns calculator</h1>${ad}
<div class="tool-panel">
<label for="p">Investment (₹)</label><input id="p" type="number" value="100000" />
<label for="r">Expected return (% p.a.)</label><input id="r" type="number" step="0.1" value="12" />
<label for="y">Years</label><input id="y" type="number" value="10" />
<button type="button" class="primary" id="go">Project</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=+document.getElementById('p').value, r=+document.getElementById('r').value/100, y=+document.getElementById('y').value;
  const fv=p*Math.pow(1+r,y);
  document.getElementById('out').textContent='Future value ₹'+fv.toFixed(0)+' · Gain ₹'+(fv-p).toFixed(0);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/salary-slip-generator.html",
      file: "salary-slip-generator.html",
      category: "india",
      title: "Salary Slip Generator India — Simple Payslip Template",
      desc: "Generate a basic printable salary slip with earnings and deductions. Browser template—not payroll software.",
      card: "Salary slip",
      cardDesc: "Printable payslip.",
      body: `<h1>Salary slip generator</h1>${ad}
<div class="tool-panel no-print">
<label for="name">Employee name</label><input id="name" type="text" placeholder="Employee name" />
<label for="basic">Basic (₹)</label><input id="basic" type="number" value="30000" />
<label for="hra">HRA (₹)</label><input id="hra" type="number" value="12000" />
<label for="ded">Deductions (₹)</label><input id="ded" type="number" value="5000" />
<div class="row">
<div style="flex:1"><label for="month-from">From month</label><input id="month-from" type="month" /></div>
<div style="flex:1"><label for="month-to">To month</label><input id="month-to" type="month" /></div>
</div>
<button type="button" class="primary" id="go">Preview slip(s)</button>
<button type="button" class="primary rs-secondary" id="print" hidden>Print slip(s)</button>
<p id="slip-status" class="tool-feedback" role="status"></p>
</div>
<div id="preview" class="print-stack" hidden></div>
<script>
function buildSlips(){
  const P=window.Printable;
  const name=document.getElementById('name').value.trim();
  const status=document.getElementById('slip-status');
  if(!name){ status.className='error'; status.textContent='Enter employee name.'; return false; }
  const basic=+document.getElementById('basic').value, hra=+document.getElementById('hra').value, ded=+document.getElementById('ded').value;
  const gross=basic+hra, net=gross-ded;
  const months=P.monthRange(document.getElementById('month-from').value,document.getElementById('month-to').value);
  const blocks=months.map(m=>'<article class="print-document payslip-doc"><h2>Salary slip — '+P.escapeHtml(P.formatMonth(m))+'</h2>'
    +'<p><strong>'+P.escapeHtml(name)+'</strong></p>'
    +'<p>Basic ₹'+basic.toLocaleString('en-IN')+' · HRA ₹'+hra.toLocaleString('en-IN')+' · Gross ₹'+gross.toLocaleString('en-IN')+' · Deductions ₹'+ded.toLocaleString('en-IN')+' · <strong>Net ₹'+net.toLocaleString('en-IN')+'</strong></p>'
    +'<p><em>Template only—not payroll advice.</em></p></article>').join('');
  document.getElementById('preview').innerHTML=blocks;
  document.getElementById('preview').hidden=false;
  document.getElementById('print').hidden=false;
  status.className='ok';
  status.textContent=months.length+' slip(s) ready.';
  return true;
}
document.getElementById('go').onclick=()=>buildSlips();
document.getElementById('print').onclick=()=>{ if(buildSlips()) Printable.printPage(); };
</script>`,
    },
    {
      path: "/property-tax-calculator.html",
      file: "property-tax-calculator.html",
      category: "india",
      title: "Property Tax Calculator — Annual Tax Estimate",
      desc: "Estimate annual property tax from assessed value and local rate percent. Rates vary by municipality.",
      card: "Property tax",
      cardDesc: "Annual tax estimate.",
      body: `<h1>Property tax calculator</h1>${ad}
<div class="tool-panel">
<label for="av">Assessed value (₹)</label><input id="av" type="number" value="2500000" />
<label for="rate">Annual tax rate (%)</label><input id="rate" type="number" step="0.01" value="0.2" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const tax=+document.getElementById('av').value*(+document.getElementById('rate').value/100);
  document.getElementById('out').textContent='Est. annual property tax ₹'+tax.toFixed(0);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/form-16-calculator.html",
      file: "form-16-calculator.html",
      category: "india",
      title: "Form 16 Tax Summary Calculator — TDS vs Tax Due",
      desc: "Compare annual tax liability with TDS already deducted. Simple India salary tax illustration.",
      card: "Form 16 summary",
      cardDesc: "Tax vs TDS paid.",
      body: `<h1>Form 16 tax summary (illustration)</h1>${ad}
<div class="tool-panel">
<label for="inc">Taxable income (₹)</label><input id="inc" type="number" value="900000" />
<label for="tds">TDS already deducted (₹)</label><input id="tds" type="number" value="75000" />
<label for="rate">Effective tax rate (%)</label><input id="rate" type="number" value="15" />
<button type="button" class="primary" id="go">Compare</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const tax=+document.getElementById('inc').value*(+document.getElementById('rate').value/100);
  const tds=+document.getElementById('tds').value;
  const diff=tax-tds;
  document.getElementById('out').textContent='Est. tax ₹'+tax.toFixed(0)+' · TDS ₹'+tds+' · '+(diff>=0?'Pay ₹'+diff.toFixed(0):'Refund ₹'+Math.abs(diff).toFixed(0));
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/waist-to-hip-ratio-calculator.html",
      file: "waist-to-hip-ratio-calculator.html",
      category: "calculators",
      title: "Waist to Hip Ratio Calculator — WHR Health Metric",
      desc: "Calculate waist-to-hip ratio and a simple risk category. Not a medical diagnosis.",
      card: "Waist–hip ratio",
      cardDesc: "WHR calculator.",
      body: `<h1>Waist to hip ratio</h1>${ad}
<div class="tool-panel">
<label for="w">Waist (cm)</label><input id="w" type="number" value="85" />
<label for="h">Hip (cm)</label><input id="h" type="number" value="100" />
<label for="sex">Sex</label><select id="sex"><option value="m">Male</option><option value="f">Female</option></select>
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const whr=+document.getElementById('w').value/+document.getElementById('h').value;
  const m=document.getElementById('sex').value==='m';
  let cat='Moderate';
  if(m){ if(whr<0.9) cat='Lower'; else if(whr>=1) cat='Higher'; }
  else { if(whr<0.8) cat='Lower'; else if(whr>=0.85) cat='Higher'; }
  document.getElementById('out').textContent='WHR '+whr.toFixed(2)+' · '+cat+' risk band (general guidance)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/blood-pressure-category.html",
      file: "blood-pressure-category.html",
      category: "calculators",
      title: "Blood Pressure Category — BP Chart Checker",
      desc: "See blood pressure category from systolic and diastolic readings. Educational—ask a clinician for health advice.",
      card: "BP category",
      cardDesc: "Systolic / diastolic.",
      body: `<h1>Blood pressure category</h1>${ad}
<div class="tool-panel">
<label for="sys">Systolic (mmHg)</label><input id="sys" type="number" value="128" />
<label for="dia">Diastolic (mmHg)</label><input id="dia" type="number" value="82" />
<button type="button" class="primary" id="go">Check</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const s=+document.getElementById('sys').value, d=+document.getElementById('dia').value;
  let cat='Normal';
  if(s>=180||d>=120) cat='Crisis — seek care';
  else if(s>=140||d>=90) cat='High (Stage 2)';
  else if(s>=130||d>=80) cat='High (Stage 1)';
  else if(s>=120&&d<80) cat='Elevated';
  document.getElementById('out').textContent=cat+' ('+s+'/'+d+' mmHg)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/running-pace-calculator.html",
      file: "running-pace-calculator.html",
      category: "productivity",
      title: "Running Pace Calculator — Min per km from Time & Distance",
      desc: "Calculate running pace in minutes per kilometer from distance and time. Free pace calculator for runners.",
      card: "Running pace",
      cardDesc: "Min/km from time.",
      body: `<h1>Running pace calculator</h1>${ad}
<div class="tool-panel">
<label for="km">Distance (km)</label><input id="km" type="number" step="0.01" value="5" />
<label for="min">Time (minutes)</label><input id="min" type="number" step="0.1" value="28" />
<button type="button" class="primary" id="go">Pace</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const pace=+document.getElementById('min').value/+document.getElementById('km').value;
  const m=Math.floor(pace), s=Math.round((pace-m)*60);
  document.getElementById('out').textContent=m+' min '+s+' sec per km ('+pace.toFixed(2)+' min/km)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/steps-to-calories-calculator.html",
      file: "steps-to-calories-calculator.html",
      category: "calculators",
      title: "Steps to Calories Calculator — Walking Calorie Estimate",
      desc: "Estimate calories burned from step count and body weight. Rough MET-based illustration.",
      card: "Steps → calories",
      cardDesc: "Walk calorie estimate.",
      body: `<h1>Steps to calories</h1>${ad}
<div class="tool-panel">
<label for="steps">Steps</label><input id="steps" type="number" value="8000" />
<label for="kg">Weight (kg)</label><input id="kg" type="number" value="70" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const km=(+document.getElementById('steps').value)*0.000762;
  const kcal=km*(+document.getElementById('kg').value)*0.9;
  document.getElementById('out').textContent='≈ '+kcal.toFixed(0)+' kcal (rough estimate for flat walking)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/daily-compound-interest-calculator.html",
      file: "daily-compound-interest-calculator.html",
      category: "calculators",
      title: "Daily Compound Interest Calculator — Compounding Frequency",
      desc: "Future value with daily compounding from principal, annual rate, and years. Free compound interest calculator.",
      card: "Daily compound",
      cardDesc: "FV with daily comp.",
      body: `<h1>Daily compound interest</h1>${ad}
<div class="tool-panel">
<label for="p">Principal</label><input id="p" type="number" value="10000" />
<label for="r">Annual rate (%)</label><input id="r" type="number" value="8" />
<label for="y">Years</label><input id="y" type="number" value="5" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const p=+document.getElementById('p').value, r=+document.getElementById('r').value/100, y=+document.getElementById('y').value;
  const fv=p*Math.pow(1+r/365,365*y);
  document.getElementById('out').textContent='Future value '+fv.toFixed(2)+' · Interest '+(fv-p).toFixed(2);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/download-time-calculator.html",
      file: "download-time-calculator.html",
      category: "productivity",
      title: "Download Time Calculator — File Size & Internet Speed",
      desc: "Estimate download time from file size (MB) and connection speed (Mbps). Free download speed calculator.",
      card: "Download time",
      cardDesc: "Size + Mbps → time.",
      body: `<h1>Download time calculator</h1>${ad}
<div class="tool-panel">
<label for="mb">File size (MB)</label><input id="mb" type="number" value="1500" />
<label for="mbps">Speed (Mbps)</label><input id="mbps" type="number" value="50" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const bits=+document.getElementById('mb').value*8*1024*1024;
  const sec=bits/(+document.getElementById('mbps').value*1000000);
  const m=Math.floor(sec/60), s=Math.round(sec%60);
  document.getElementById('out').textContent=(m?m+' min ':'')+s+' sec ('+sec.toFixed(0)+' seconds)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/htaccess-redirect-generator.html",
      file: "htaccess-redirect-generator.html",
      category: "developer",
      title: ".htaccess Redirect Generator — 301 & 302 Rules",
      desc: "Generate Apache .htaccess redirect lines for 301 or 302 moves. Copy into your server config.",
      card: ".htaccess redirect",
      cardDesc: "301/302 rewrite rules.",
      body: `<h1>.htaccess redirect generator</h1>${ad}
<div class="tool-panel">
<label for="from">From path</label><input id="from" type="text" value="/old-page" />
<label for="to">To URL</label><input id="to" type="text" value="https://example.com/new-page" />
<label for="code">Type</label><select id="code"><option value="301">301 permanent</option><option value="302">302 temporary</option></select>
<button type="button" class="primary" id="go">Generate</button>
<pre id="out" class="ok" style="white-space:pre-wrap;font-size:0.85rem"></pre>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const from=document.getElementById('from').value.replace(/^\\//,'');
  const to=document.getElementById('to').value;
  const c=document.getElementById('code').value;
  document.getElementById('out').textContent='Redirect '+c+' /'+from+' '+to;
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
