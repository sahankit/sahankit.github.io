/** Batch 11 — India income tax and related. */
import { INDIA_INCOME_TAX_FY } from "./india-tax-fy.mjs";

const FY = INDIA_INCOME_TAX_FY.fyLabel;
const FY_AY = INDIA_INCOME_TAX_FY.fyAyLine;

export function batch11Tools(ad) {
  return [
    {
      path: "/income-tax-calculator.html",
      file: "income-tax-calculator.html",
      category: "india",
      title: "Income Tax Calculator India — New vs Old Regime",
      desc: "Compare tax under India's new and old regimes for salaried income. See which regime saves more.",
      card: "Income tax calculator",
      cardDesc: `FY ${FY} · new vs old regime.`,
      body: `
<h1>Income tax calculator India — new vs old regime (${FY_AY})</h1>
<p class="prose"><strong>Active financial year:</strong> ${FY_AY}. Compare <strong>new tax regime</strong> and <strong>old tax regime</strong> side by side for salaried income. Enter gross salary, 80C, HRA, and 80D to see estimated tax, monthly in-hand, and <strong>which regime saves more money</strong>. Part of our <a href="/finance/">India finance tools</a>.</p>
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
  <p id="hint" class="prose" style="font-size:0.85rem;margin-top:12px">Presets: <a href="/income-tax-calculator/?salary=1275000">₹12.75 LPA</a> · <a href="/guides/india-87a-marginal-relief/">87A / section 156 rebate</a> · <a href="/guides/india-new-vs-old-regime-breakeven/">regime breakeven</a>.</p>
</div>
<script src="/assets/india-tax.js"></script>
<script>
function calcRegime(gross, regime, ded){
  return IndiaTax.fromGross(gross, regime, ded);
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
    {
      path: "/salary-breakup-calculator.html",
      file: "salary-breakup-calculator.html",
      category: "india",
      title: "Salary Breakup Calculator — Tax-Optimized CTC Structure India",
      desc: "Get a suggested annual CTC salary breakup for tax savings: Basic, HRA, PF, employer NPS, and allowances. Compare with a flat structure.",
      card: "Salary breakup (tax)",
      cardDesc: "CTC split for HRA, PF & NPS.",
      body: `
<h1>Salary breakup calculator — tax-friendly CTC (India)</h1>
<p class="prose">Enter your <strong>annual CTC</strong>, rent, and deductions to see a suggested pay structure (Basic, HRA, employer NPS, PF, reimbursements) that lowers tax versus a flat allowance-heavy split. Pairs with our <a href="/income-tax-calculator/">income tax calculator</a> and <a href="/hra-calculator/">HRA calculator</a>.</p>
<p class="prose" style="font-size:0.9rem">${FY_AY} illustration · old regime breakup focus · not payroll or legal advice.</p>
${ad}
<div class="tool-panel">
  <label for="ctc">Annual CTC (₹)</label>
  <input id="ctc" type="number" value="2000000" step="10000" />

  <label for="rent">Rent paid per month (₹, 0 if not renting)</label>
  <input id="rent" type="number" value="25000" step="500" />

  <label><input id="metro" type="checkbox" checked /> Metro city (Delhi, Mumbai, Kolkata, Chennai)</label>

  <label for="c80d">80D — health insurance (annual ₹)</label>
  <input id="c80d" type="number" value="25000" />

  <label for="extra80c">Extra 80C beyond PF (ELSS, PPF, etc. ₹)</label>
  <input id="extra80c" type="number" value="50000" />

  <label><input id="perks" type="checkbox" checked /> Include typical exempt perks (meal ₹26,400 + phone/internet ₹24,000 / year)</label>

  <label for="nps">Employer NPS (80CCD(2))</label>
  <select id="nps"><option value="10" selected>10% of Basic (max tax benefit)</option><option value="0">None</option></select>

  <button type="button" class="primary" id="go">Suggest breakup</button>

  <p id="verdict" class="ok" style="margin-top:12px;font-size:1.05rem"></p>

  <table class="prose" style="width:100%;margin-top:16px;border-collapse:collapse;font-size:0.92rem" aria-label="Suggested CTC breakup">
    <thead>
      <tr><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px">Component (annual)</th><th style="border-bottom:1px solid #ccc;padding:6px;text-align:right">Optimized</th><th style="border-bottom:1px solid #ccc;padding:6px;text-align:right">Flat split</th></tr>
    </thead>
    <tbody id="tbl"></tbody>
  </table>

  <p id="taxline" class="prose" style="margin-top:12px"></p>
  <p id="hint" class="prose" style="font-size:0.85rem"></p>
</div>
<script src="/assets/india-tax.js"></script>
<script>
const STD_NEW = IndiaTax.STD_NEW, STD_OLD = IndiaTax.STD_OLD;
const MEAL = 26400, PHONE = 24000, HRA_OF_BASIC = 0.5;
const EMP_PF = 0.12, GRAT = 15/26, EMP_NPS_MAX = 0.10;
function totalTax(taxable, regime){ return IndiaTax.totalTax(taxable, regime); }
function hraExempt(basic, hra, rentAnnual, metro){
  const cap = metro ? 0.5*basic : 0.4*basic;
  const rentRule = Math.max(0, rentAnnual - 0.1*basic);
  return Math.min(hra, rentRule, cap);
}
function fmt(n){ return '₹'+Math.round(n).toLocaleString('en-IN'); }

function buildStruct(ctc, basicPct, rentAnnual, metro, perksOn, npsPct){
  const perks = perksOn ? MEAL+PHONE : 0;
  const basic = Math.max(0, ctc * basicPct);
  const empLoad = basic * (EMP_PF + GRAT + npsPct);
  const room = ctc - basic - empLoad - perks;
  let hra = basic * HRA_OF_BASIC;
  if (room < hra) hra = Math.max(0, room);
  const special = Math.max(0, ctc - basic - hra - empLoad - perks);
  if(special < 0) return null;
  const empPf = basic * EMP_PF;
  const empNps = basic * npsPct;
  const grat = basic * GRAT;
  const exHra = hraExempt(basic, hra, rentAnnual, metro);
  const grossSalary = basic + hra + special;
  return {
    basic, hra, special, perks, empPf, empNps, grat, empLoad, exHra,
    grossSalary,
    employeeCash: basic + hra + special + perks,
  };
}

function taxForStruct(s, regime, ded, perksOn){
  const std = regime==='new'?STD_NEW:STD_OLD;
  let gross = s.grossSalary + (regime==='new' && perksOn ? s.perks : 0);
  let taxable = gross - std;
  if(regime==='old'){
    const pf80 = Math.min(150000, s.empPf + Math.max(0, ded.extra80c));
    taxable -= pf80 + s.empNps + Math.max(0, ded.d80d) + s.exHra;
  } else {
    taxable -= s.empNps;
  }
  return totalTax(Math.max(0, taxable), regime);
}

function flatBaseline(ctc, rentAnnual, metro, perksOn, npsPct){
  const perks = perksOn ? MEAL+PHONE : 0;
  const guessBasic = Math.max(0, (ctc - perks) / (1 + HRA_OF_BASIC + EMP_PF + GRAT + npsPct));
  return buildStruct(ctc, guessBasic / ctc, rentAnnual, metro, perksOn, npsPct) || buildStruct(ctc, 0.4, rentAnnual, metro, perksOn, npsPct);
}

function optimize(ctc, rentAnnual, metro, perksOn, npsPct, ded){
  let best = null, bestTax = Infinity;
  for(let pct = 0.30; pct <= 0.52; pct += 0.005){
    const s = buildStruct(ctc, pct, rentAnnual, metro, perksOn, npsPct);
    if(!s) continue;
    const tax = taxForStruct(s, 'old', ded, perksOn);
    if(tax < bestTax){ bestTax = tax; best = s; }
  }
  return best || buildStruct(ctc, 0.4, rentAnnual, metro, perksOn, npsPct);
}

function row(label, a, b){
  return '<tr><td style="padding:6px;border-bottom:1px solid #eee">'+label+'</td><td style="padding:6px;border-bottom:1px solid #eee;text-align:right">'+a+'</td><td style="padding:6px;border-bottom:1px solid #eee;text-align:right">'+b+'</td></tr>';
}

document.getElementById('go').onclick=()=>{
  const ctc = +document.getElementById('ctc').value;
  const rentAnnual = Math.max(0, +document.getElementById('rent').value) * 12;
  const metro = document.getElementById('metro').checked;
  const ded = { d80d: +document.getElementById('c80d').value, extra80c: +document.getElementById('extra80c').value };
  const perksOn = document.getElementById('perks').checked;
  const npsPct = Number(document.getElementById('nps').value)/100;

  const opt = optimize(ctc, rentAnnual, metro, perksOn, npsPct, ded);
  const flat = flatBaseline(ctc, rentAnnual, metro, perksOn, 0);

  const taxOptOld = taxForStruct(opt, 'old', ded, perksOn);
  const taxFlatOld = taxForStruct(flat, 'old', ded, perksOn);
  const taxOptNew = taxForStruct(opt, 'new', ded, perksOn);
  const taxFlatNew = taxForStruct(flat, 'new', ded, perksOn);

  const save = taxFlatOld - taxOptOld;
  const v = document.getElementById('verdict');
  if(save > 500){
    v.textContent = 'Optimized breakup may save about '+fmt(save)+'/year vs flat split (old regime, before your 80D/extra 80C).';
  } else {
    v.textContent = 'Optimized and flat splits are close on tax—still compare in-hand and employer policy.';
  }

  document.getElementById('tbl').innerHTML =
    row('Basic', fmt(opt.basic), fmt(flat.basic)) +
    row('HRA', fmt(opt.hra), fmt(flat.hra)) +
    row('HRA exempt (est.)', fmt(opt.exHra), fmt(flat.exHra)) +
    row('Special / flexi allowance', fmt(opt.special), fmt(flat.special)) +
    row('Exempt perks (meal + phone)', fmt(opt.perks), fmt(flat.perks)) +
    row('Employee PF (12% Basic)', fmt(opt.empPf), fmt(flat.empPf)) +
    row('Employer PF + Gratuity + NPS (in CTC)', fmt(opt.empLoad), fmt(flat.empLoad)) +
  row('<strong>Cash to you (before tax)</strong>', '<strong>'+fmt(opt.employeeCash)+'</strong>', '<strong>'+fmt(flat.employeeCash)+'</strong>');

  const handOpt = opt.employeeCash - opt.empPf - taxOptOld;
  const handFlat = flat.employeeCash - flat.empPf - taxFlatOld;

  document.getElementById('taxline').innerHTML =
    '<strong>Old regime tax (with your 80D/80C):</strong> optimized '+fmt(taxOptOld)+' vs flat '+fmt(taxFlatOld)+'. '+
    '<strong>Est. annual in-hand (old):</strong> '+fmt(handOpt)+' vs '+fmt(handFlat)+'. '+
    'New regime taxes: '+fmt(taxOptNew)+' vs '+fmt(taxFlatNew)+' (no HRA/80C).';

  const bp = ctc>0 ? (opt.basic/ctc*100).toFixed(1) : '0';
  let hint = 'Suggested Basic is about '+bp+'% of CTC so employer PF, HRA, and ';
  hint += npsPct>0 ? 'employer NPS (80CCD(2)) ' : '';
  hint += 'fit inside CTC. Share this table with HR as a starting point—actual breakup depends on company policy.';
  if(rentAnnual<=0) hint += ' With no rent, HRA tax benefit is limited; consider negotiating reimbursements or employer NPS instead.';
  document.getElementById('hint').textContent = hint;
};
document.getElementById('go').click();
</script>`,
    },
  ];
}
