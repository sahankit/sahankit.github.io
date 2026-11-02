/** Batch 32 — India tax/IDs, fuel, dev formatters, and security helpers. */

export function batch32Tools(ad) {
  return [
    {
      path: "/kmpl-calculator.html",
      file: "kmpl-calculator.html",
      category: "india",
      title: "KMPL Calculator — Fuel Efficiency km per Litre",
      desc: "Calculate kilometers per litre from distance driven and fuel used. Free KMPL calculator for cars and bikes.",
      card: "KMPL calculator",
      cardDesc: "km per litre fuel.",
      body: `<h1>KMPL calculator</h1>${ad}
<div class="tool-panel">
<label for="km">Distance (km)</label><input id="km" type="number" value="450" />
<label for="l">Fuel used (litres)</label><input id="l" type="number" step="0.1" value="30" />
<button type="button" class="primary" id="go">Calculate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const l=+document.getElementById('l').value;
  document.getElementById('out').textContent=l?((+document.getElementById('km').value/l).toFixed(2)+' km/l'):'Enter fuel used';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/gas-mileage-calculator.html",
      file: "gas-mileage-calculator.html",
      category: "calculators",
      title: "Gas Mileage Calculator — MPG Fuel Economy",
      desc: "Calculate miles per gallon from trip distance and gallons used. Free MPG calculator.",
      card: "Gas mileage (MPG)",
      cardDesc: "Miles per gallon.",
      body: `<h1>Gas mileage calculator</h1>${ad}
<div class="tool-panel">
<label for="mi">Distance (miles)</label><input id="mi" type="number" value="300" />
<label for="gal">Gallons used</label><input id="gal" type="number" step="0.01" value="10" />
<button type="button" class="primary" id="go">MPG</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const g=+document.getElementById('gal').value;
  document.getElementById('out').textContent=g?((+document.getElementById('mi').value/g).toFixed(2)+' MPG'):'—';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/ctc-to-in-hand-calculator.html",
      file: "ctc-to-in-hand-calculator.html",
      category: "india",
      title: "CTC to In-Hand Salary Calculator India",
      desc: "Rough in-hand salary from annual CTC with basic, HRA, and deduction percent. Planning illustration only.",
      card: "CTC to in-hand",
      cardDesc: "Monthly take-home est.",
      body: `<h1>CTC to in-hand calculator</h1>${ad}
<div class="tool-panel">
<label for="ctc">Annual CTC (₹)</label><input id="ctc" type="number" value="1200000" />
<label for="ded">Total deductions (% of CTC)</label><input id="ded" type="number" value="18" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const ctc=+document.getElementById('ctc').value;
  const net=ctc*(1-+document.getElementById('ded').value/100);
  document.getElementById('out').textContent='Est. in-hand ₹'+(net/12).toFixed(0)+'/month · ₹'+net.toFixed(0)+'/year';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/advance-tax-calculator.html",
      file: "advance-tax-calculator.html",
      category: "india",
      title: "Advance Tax Calculator India — Quarterly Installments",
      desc: "Split estimated annual tax into four advance tax installments (25% each). Illustration—not filing software.",
      card: "Advance tax",
      cardDesc: "Quarterly tax split.",
      body: `<h1>Advance tax calculator</h1>${ad}
<div class="tool-panel">
<label for="tax">Estimated annual tax (₹)</label><input id="tax" type="number" value="200000" />
<button type="button" class="primary" id="go">Split</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const q=(+document.getElementById('tax').value)/4;
  document.getElementById('out').textContent='Each installment ≈ ₹'+q.toFixed(0)+' (4 equal parts—due dates vary by FY rules)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/section-80c-calculator.html",
      file: "section-80c-calculator.html",
      category: "india",
      title: "Section 80C Calculator — Deduction Cap India",
      desc: "Sum 80C investments and see remaining headroom below ₹1.5 lakh limit. Tax planning illustration.",
      card: "Section 80C",
      cardDesc: "₹1.5L deduction cap.",
      body: `<h1>Section 80C calculator</h1>${ad}
<div class="tool-panel">
<label for="elss">ELSS / PPF / etc. (₹)</label><input id="elss" type="number" value="80000" />
<label for="lic">Life insurance premium (₹)</label><input id="lic" type="number" value="40000" />
<label for="other">Other 80C (₹)</label><input id="other" type="number" value="20000" />
<button type="button" class="primary" id="go">Total</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const cap=150000;
  const sum=['elss','lic','other'].reduce((a,id)=>a+(+document.getElementById(id).value),0);
  const allowed=Math.min(sum,cap);
  document.getElementById('out').textContent='Claimable 80C ₹'+allowed.toLocaleString('en-IN')+' · Remaining room ₹'+Math.max(0,cap-sum).toLocaleString('en-IN');
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/gstin-format-checker.html",
      file: "gstin-format-checker.html",
      category: "india",
      title: "GSTIN Format Checker — 15-Digit GST Number",
      desc: "Validate GSTIN pattern (15 characters). Format check only—not GST portal verification.",
      card: "GSTIN format",
      cardDesc: "15-char GST pattern.",
      body: `<h1>GSTIN format checker</h1>${ad}
<div class="tool-panel">
<label for="g">GSTIN</label><input id="g" type="text" maxlength="15" placeholder="22AAAAA0000A1Z5" />
<button type="button" class="primary" id="go">Check</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const g=document.getElementById('g').value.trim().toUpperCase();
  const ok=/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(g);
  const out=document.getElementById('out');
  out.className=ok?'ok':'error';
  out.textContent=ok?'Pattern matches GSTIN format. Not verified on GST portal.':'Invalid GSTIN pattern.';
};
</script>`,
    },
    {
      path: "/e-way-bill-format-checker.html",
      file: "e-way-bill-format-checker.html",
      category: "india",
      title: "E-Way Bill Format Checker — 12-Digit Number",
      desc: "Check whether an e-way bill number is 12 digits. Format helper—not NIC portal lookup.",
      card: "E-way bill format",
      cardDesc: "12-digit pattern.",
      body: `<h1>E-way bill format checker</h1>${ad}
<div class="tool-panel">
<label for="e">E-way bill number</label><input id="e" type="text" inputmode="numeric" maxlength="12" />
<button type="button" class="primary" id="go">Validate</button>
<p id="out" class="tool-feedback" role="status"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const e=document.getElementById('e').value.replace(/\\s/g,'');
  const ok=/^\\d{12}$/.test(e);
  const out=document.getElementById('out');
  out.className=ok?'ok':'error';
  out.textContent=ok?'12-digit format OK. Status not checked on government portal.':'Enter exactly 12 digits.';
};
</script>`,
    },
    {
      path: "/pf-withdrawal-calculator.html",
      file: "pf-withdrawal-calculator.html",
      category: "india",
      title: "PF Withdrawal Calculator — EPF Corpus Estimate",
      desc: "Estimate withdrawable EPF amount from corpus and withdrawal percent. Rules vary—illustration only.",
      card: "PF withdrawal",
      cardDesc: "Corpus × withdraw %.",
      body: `<h1>PF withdrawal calculator</h1>${ad}
<div class="tool-panel">
<label for="corpus">EPF balance (₹)</label><input id="corpus" type="number" value="500000" />
<label for="pct">Withdrawal allowed (%)</label><input id="pct" type="number" value="75" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const w=+document.getElementById('corpus').value*(+document.getElementById('pct').value/100);
  document.getElementById('out').textContent='Est. withdrawable ₹'+w.toFixed(0)+' (confirm EPFO rules for your case)';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/solar-savings-calculator.html",
      file: "solar-savings-calculator.html",
      category: "calculators",
      title: "Solar Savings Calculator — Electricity Bill Reduction",
      desc: "Estimate annual savings from solar kWh generation and electricity tariff. Rough ROI planning.",
      card: "Solar savings",
      cardDesc: "kWh × tariff savings.",
      body: `<h1>Solar savings calculator</h1>${ad}
<div class="tool-panel">
<label for="kwh">Monthly solar kWh</label><input id="kwh" type="number" value="350" />
<label for="rate">Tariff (₹/kWh)</label><input id="rate" type="number" step="0.01" value="8" />
<button type="button" class="primary" id="go">Annual savings</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const y=+document.getElementById('kwh').value*+document.getElementById('rate').value*12;
  document.getElementById('out').textContent='Est. annual savings ₹'+y.toFixed(0);
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/carbon-footprint-calculator.html",
      file: "carbon-footprint-calculator.html",
      category: "calculators",
      title: "Carbon Footprint Calculator — Driving CO₂ Estimate",
      desc: "Rough CO₂ from km driven using a simple kg/km factor. Educational estimate—not certified carbon audit.",
      card: "Carbon footprint",
      cardDesc: "Driving CO₂ est.",
      body: `<h1>Carbon footprint (driving)</h1>${ad}
<div class="tool-panel">
<label for="km">Distance per month (km)</label><input id="km" type="number" value="800" />
<label for="f">kg CO₂ per km</label><input id="f" type="number" step="0.001" value="0.12" />
<button type="button" class="primary" id="go">Estimate</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const kg=+document.getElementById('km').value*+document.getElementById('f').value;
  document.getElementById('out').textContent='≈ '+kg.toFixed(1)+' kg CO₂/month';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/percentage-to-cgpa-calculator.html",
      file: "percentage-to-cgpa-calculator.html",
      category: "student",
      title: "Percentage to CGPA Calculator — 10 Point Scale",
      desc: "Convert percentage marks to CGPA on 10-point scale (÷9.5 rule used in many Indian universities).",
      card: "Percentage → CGPA",
      cardDesc: "10-point scale.",
      body: `<h1>Percentage to CGPA</h1>${ad}
<div class="tool-panel">
<label for="pct">Percentage (%)</label><input id="pct" type="number" step="0.01" value="76" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="ok"></p>
<p class="prose" style="font-size:0.85rem">Uses CGPA = percentage ÷ 9.5 (common rule—your university may differ).</p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const cg=(+document.getElementById('pct').value/9.5);
  document.getElementById('out').textContent='CGPA ≈ '+cg.toFixed(2)+' / 10';
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/english-number-to-words.html",
      file: "english-number-to-words.html",
      category: "writing",
      title: "Number to Words — English (International)",
      desc: "Convert numbers to English words for cheques and documents. For INR rupee words use the rupee amount tool.",
      card: "Number to words",
      cardDesc: "English word form.",
      body: `<h1>Number to words (English)</h1>${ad}
<div class="tool-panel">
<label for="n">Number</label><input id="n" type="number" value="1234" />
<button type="button" class="primary" id="go">Convert</button>
<p id="out" class="ok"></p>
</div>
<script>
const ones=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
function words(n){
  n=Math.floor(Math.abs(n));
  if(n<20) return ones[n];
  if(n<100) return tens[Math.floor(n/10)]+(n%10?'-'+ones[n%10]:'');
  if(n<1000) return words(Math.floor(n/100))+' hundred'+(n%100?' '+words(n%100):'');
  if(n<1000000) return words(Math.floor(n/1000))+' thousand'+(n%1000?' '+words(n%1000):'');
  return words(Math.floor(n/1000000))+' million'+(n%1000000?' '+words(n%1000000):'');
}
document.getElementById('go').onclick=()=>{
  const v=+document.getElementById('n').value;
  document.getElementById('out').textContent=words(v).replace(/\\s+/g,' ').trim();
};
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/json-to-xml-converter.html",
      file: "json-to-xml-converter.html",
      category: "developer",
      title: "JSON to XML Converter — Simple Object to XML",
      desc: "Convert flat JSON objects to a simple XML string in the browser. Not for deeply nested schemas.",
      card: "JSON to XML",
      cardDesc: "Simple conversion.",
      body: `<h1>JSON to XML</h1>${ad}
<div class="tool-panel">
<label for="json">JSON</label><textarea id="json" rows="8">{"name":"Ada","id":42}</textarea>
<button type="button" class="primary" id="go">Convert</button>
<pre id="out" class="ok" style="white-space:pre-wrap;font-size:0.85rem"></pre>
</div>
<script>
document.getElementById('go').onclick=()=>{
  try{
    const o=JSON.parse(document.getElementById('json').value);
    let x='<?xml version="1.0"?><root>';
    for(const [k,v] of Object.entries(o)) x+='<'+k+'>'+String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</'+k+'>';
    x+='</root>';
    document.getElementById('out').textContent=x;
  }catch(e){ document.getElementById('out').textContent='Invalid JSON'; }
};
</script>`,
    },
    {
      path: "/xml-to-json-converter.html",
      file: "xml-to-json-converter.html",
      category: "developer",
      title: "XML to JSON Converter — Simple XML Parse",
      desc: "Parse simple XML into JSON in the browser. Best for small config snippets.",
      card: "XML to JSON",
      cardDesc: "Simple XML parse.",
      body: `<h1>XML to JSON</h1>${ad}
<div class="tool-panel">
<label for="xml">XML</label><textarea id="xml" rows="8"><root><name>Ada</name><id>42</id></root></textarea>
<button type="button" class="primary" id="go">Convert</button>
<pre id="out" class="ok" style="white-space:pre-wrap;font-size:0.85rem"></pre>
</div>
<script>
document.getElementById('go').onclick=()=>{
  try{
    const doc=new DOMParser().parseFromString(document.getElementById('xml').value,'application/xml');
    if(doc.querySelector('parsererror')) throw new Error('parse');
    const root=doc.documentElement;
    const o={};
    [...root.children].forEach(c=>{ o[c.tagName]=c.textContent; });
    document.getElementById('out').textContent=JSON.stringify(o,null,2);
  }catch(e){ document.getElementById('out').textContent='Could not parse XML'; }
};
</script>`,
    },
    {
      path: "/sql-formatter.html",
      file: "sql-formatter.html",
      category: "developer",
      title: "SQL Formatter — Uppercase Keywords & Line Breaks",
      desc: "Format SQL with uppercase keywords and line breaks before common clauses. Free online SQL formatter.",
      card: "SQL formatter",
      cardDesc: "Keyword case & breaks.",
      body: `<h1>SQL formatter</h1>${ad}
<div class="tool-panel">
<label for="sql">SQL</label><textarea id="sql" rows="8">select id, name from users where active = 1 order by name</textarea>
<button type="button" class="primary" id="go">Format</button>
<textarea id="out" rows="8" readonly></textarea>
</div>
<script>
const kw=['SELECT','FROM','WHERE','JOIN','LEFT','RIGHT','INNER','OUTER','ON','GROUP','ORDER','BY','HAVING','LIMIT','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','AND','OR'];
document.getElementById('go').onclick=()=>{
  let s=document.getElementById('sql').value;
  kw.forEach(k=>{ s=s.replace(new RegExp('\\\\b'+k+'\\\\b','gi'),k); });
  s=s.replace(/\\b(FROM|WHERE|JOIN|GROUP BY|ORDER BY|HAVING|LIMIT|SET|VALUES)\\b/g,'\\n$1');
  document.getElementById('out').value=s.trim();
};
</script>`,
    },
    {
      path: "/mock-data-generator.html",
      file: "mock-data-generator.html",
      category: "developer",
      title: "Mock Data Generator — Fake Names & Emails",
      desc: "Generate random mock user rows for testing APIs and demos. Browser-only random data.",
      card: "Mock data",
      cardDesc: "Fake test users.",
      body: `<h1>Mock data generator</h1>${ad}
<div class="tool-panel">
<label for="n">Rows</label><input id="n" type="number" min="1" max="50" value="5" />
<button type="button" class="primary" id="go">Generate</button>
<pre id="out" class="ok" style="white-space:pre-wrap;font-size:0.85rem"></pre>
</div>
<script>
const first='Alex Sam Jordan Riley Casey Morgan Taylor'.split(' ');
const last='Lee Kim Patel Singh Chen Brown'.split(' ');
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
document.getElementById('go').onclick=()=>{
  const rows=[];
  const n=Math.min(50,Math.max(1,+document.getElementById('n').value));
  for(let i=0;i<n;i++){
    const f=pick(first), l=pick(last);
    rows.push({name:f+' '+l, email:(f+'.'+l+'@example.test').toLowerCase().replace(/\\s/g,'')});
  }
  document.getElementById('out').textContent=JSON.stringify(rows,null,2);
};
</script>`,
    },
    {
      path: "/random-token-generator.html",
      file: "random-token-generator.html",
      category: "security",
      title: "Random Token Generator — API Keys & Secrets",
      desc: "Generate cryptographically random hex tokens for API keys and test secrets. Free secure token generator.",
      card: "Random token",
      cardDesc: "Secure hex token.",
      body: `<h1>Random token generator</h1>${ad}
<div class="tool-panel">
<label for="bytes">Bytes (length)</label><input id="bytes" type="number" min="8" max="64" value="32" />
<button type="button" class="primary" id="go">Generate</button>
<input id="out" type="text" readonly spellcheck="false" style="width:100%;font-family:monospace" />
<button type="button" class="primary" id="copy">Copy</button>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const n=Math.min(64,Math.max(8,+document.getElementById('bytes').value));
  const arr=new Uint8Array(n); crypto.getRandomValues(arr);
  document.getElementById('out').value=Array.from(arr,x=>x.toString(16).padStart(2,'0')).join('');
};
document.getElementById('copy').onclick=()=>navigator.clipboard.writeText(document.getElementById('out').value);
document.getElementById('go').click();
</script>`,
    },
    {
      path: "/password-entropy-calculator.html",
      file: "password-entropy-calculator.html",
      category: "security",
      title: "Password Entropy Calculator — Strength Bits",
      desc: "Estimate password entropy in bits from length and character set size. Free password strength metric.",
      card: "Password entropy",
      cardDesc: "Bits of entropy.",
      body: `<h1>Password entropy calculator</h1>${ad}
<div class="tool-panel">
<label for="len">Length</label><input id="len" type="number" value="16" />
<label for="pool">Character pool size</label><input id="pool" type="number" value="94" />
<button type="button" class="primary" id="go">Entropy</button>
<p id="out" class="ok"></p>
</div>
<script>
document.getElementById('go').onclick=()=>{
  const bits=+document.getElementById('len').value*Math.log2(+document.getElementById('pool').value);
  document.getElementById('out').textContent=bits.toFixed(1)+' bits of entropy (approx)';
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
