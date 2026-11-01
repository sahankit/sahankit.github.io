/** Batch 11 — India income tax and related. */
export function batch11Tools(ad) {
  return [
    {
      path: "/income-tax-calculator.html",
      file: "income-tax-calculator.html",
      category: "india",
      title: "Income Tax Calculator India — New vs Old Regime",
      desc: "Compare tax under India's new and old regimes for salaried income. See which regime saves more.",
      card: "Income tax calculator",
      cardDesc: "FY 2025-26 · new vs old regime.",
      body: `
<h1>Income tax calculator India — new vs old regime (FY 2025–26)</h1>
<p class="prose">Compare <strong>new tax regime</strong> and <strong>old tax regime</strong> side by side for salaried income. Enter gross salary, 80C, HRA, and 80D to see estimated tax, monthly in-hand, and <strong>which regime saves more money</strong>. Part of our <a href="/finance/">India finance tools</a>.</p>
<p class="prose" style="font-size:0.9rem">Resident individual below 60 · Illustration only—not tax or legal advice.</p>
${ad}
<div class="tool-panel">
  <label for="gross">Annual gross salary / income (₹)</label>
  <input id="gross" type="number" value="1200000" step="1000" />

  <details open style="margin:12px 0">
    <summary><strong>Deductions (old regime only)</strong></summary>
    <label for="c80c">80C + 80CCC + 80CCD(1) (max ₹1.5L)</label>
    <input id="c80c" type="number" value="150000" max="150000" />
    <label for="nps">80CCD(1B) — extra NPS (max ₹50k)</label>
    <input id="nps" type="number" value="0" max="50000" />
    <label for="d80d">80D — health insurance</label>
    <input id="d80d" type="number" value="25000" />
    <label for="hra">HRA exemption (₹)</label>
    <input id="hra" type="number" value="120000" />
    <label for="other">Other Chapter VI-A (80E, 80G, etc.)</label>
    <input id="other" type="number" value="0" />
  </details>

  <button type="button" class="primary" id="go">Compare regimes</button>

  <div id="verdict" class="ok" style="font-size:1.05rem;margin-top:12px"></div>

  <table class="prose" style="width:100%;margin-top:16px;border-collapse:collapse;font-size:0.95rem" aria-label="Tax comparison">
    <thead>
      <tr><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px"></th><th style="border-bottom:1px solid #ccc;padding:6px">New regime</th><th style="border-bottom:1px solid #ccc;padding:6px">Old regime</th></tr>
    </thead>
    <tbody id="tbl"></tbody>
  </table>
  <p id="hint" class="prose" style="font-size:0.85rem;margin-top:12px"></p>
</div>
<script>
const STD_NEW = 75000;
const STD_OLD = 50000;
const CESS = 0.04;

const NEW_SLABS = [[300000,0],[700000,0.05],[1000000,0.10],[1200000,0.15],[1500000,0.20],[Infinity,0.30]];
const OLD_SLABS = [[250000,0],[500000,0.05],[1000000,0.20],[Infinity,0.30]];

function slabTax(taxable, slabs){
  if(taxable<=0) return 0;
  let tax=0, lower=0;
  for(const [upper, rate] of slabs){
    if(taxable<=lower) break;
    tax += (Math.min(taxable, upper)-lower)*rate;
    lower=upper;
    if(taxable<=upper) break;
  }
  return tax;
}

function rebate87A(tax, incomeForRebate, regime){
  if(regime==='new'){
    if(incomeForRebate<=700000) return tax;
    return 0;
  }
  if(incomeForRebate<=500000) return Math.min(tax, 12500);
  return 0;
}

function calcRegime(gross, regime, ded){
  const std = regime==='new' ? STD_NEW : STD_OLD;
  let taxable = gross - std;
  if(regime==='old'){
    const cap80c = Math.min(Math.max(ded.c80c,0), 150000);
    const capNps = Math.min(Math.max(ded.nps,0), 50000);
    taxable -= cap80c + capNps + Math.max(ded.d80d,0) + Math.max(ded.hra,0) + Math.max(ded.other,0);
  }
  taxable = Math.max(0, taxable);
  const incomeForRebate = taxable;
  const slabs = regime==='new' ? NEW_SLABS : OLD_SLABS;
  const raw = slabTax(taxable, slabs);
  const reb = rebate87A(raw, incomeForRebate, regime);
  const afterReb = Math.max(0, raw - reb);
  const cessAmt = afterReb * CESS;
  const total = afterReb + cessAmt;
  return { taxable, raw, reb, afterReb, cessAmt, total };
}

function fmt(n){ return '₹'+Math.round(n).toLocaleString('en-IN'); }

function row(label, a, b){
  return '<tr><td style="padding:6px;border-bottom:1px solid #eee">'+label+'</td><td style="padding:6px;border-bottom:1px solid #eee">'+a+'</td><td style="padding:6px;border-bottom:1px solid #eee">'+b+'</td></tr>';
}

document.getElementById('go').onclick=()=>{
  const gross = +document.getElementById('gross').value;
  const ded = {
    c80c: +document.getElementById('c80c').value,
    nps: +document.getElementById('nps').value,
    d80d: +document.getElementById('d80d').value,
    hra: +document.getElementById('hra').value,
    other: +document.getElementById('other').value,
  };
  const neu = calcRegime(gross, 'new', ded);
  const old = calcRegime(gross, 'old', ded);
  const saveNew = old.total - neu.total;
  const v = document.getElementById('verdict');
  if(Math.abs(saveNew)<1){
    v.textContent='Both regimes result in about the same tax.';
    v.className='ok';
  } else if(saveNew>0){
    v.textContent='New regime is better — you save '+fmt(saveNew)+' per year ('+fmt(saveNew/12)+'/month less tax).';
    v.className='ok';
  } else {
    v.textContent='Old regime is better — you save '+fmt(-saveNew)+' per year ('+fmt(-saveNew/12)+'/month less tax).';
    v.className='ok';
  }
  const netNew = gross - neu.total;
  const netOld = gross - old.total;
  document.getElementById('tbl').innerHTML =
    row('Taxable income', fmt(neu.taxable), fmt(old.taxable)) +
    row('Tax before rebate', fmt(neu.raw), fmt(old.raw)) +
    row('Rebate u/s 87A', fmt(neu.reb), fmt(old.reb)) +
    row('Tax after rebate', fmt(neu.afterReb), fmt(old.afterReb)) +
    row('Health & education cess (4%)', fmt(neu.cessAmt), fmt(old.cessAmt)) +
    row('<strong>Total tax</strong>', '<strong>'+fmt(neu.total)+'</strong>', '<strong>'+fmt(old.total)+'</strong>') +
    row('Net in-hand (annual)', fmt(netNew), fmt(netOld)) +
    row('Net in-hand (monthly)', fmt(netNew/12), fmt(netOld/12));

  const hint = document.getElementById('hint');
  const dedSum = Math.min(ded.c80c,150000)+Math.min(ded.nps,50000)+ded.d80d+ded.hra+ded.other;
  if(saveNew>0 && dedSum<50000){
    hint.textContent='With few deductions, the new regime often wins because of higher standard deduction (₹75,000) and lower rates on middle incomes.';
  } else if(saveNew<=0){
    hint.textContent='Old regime wins when Chapter VI-A deductions (80C, HRA, 80D, home loan interest u/s 24(b) if included in “other”, etc.) reduce taxable income enough to offset higher slab rates.';
  } else {
    hint.textContent='Try increasing or decreasing deductions to see when the old regime overtakes the new one for your salary.';
  }
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
