/** Unit tests for income tax slab + rebate logic (mirrors tools-batch11). */
const STD_NEW = 75000;
const STD_OLD = 50000;
const CESS = 0.04;
const NEW_SLABS = [
  [300000, 0],
  [700000, 0.05],
  [1000000, 0.1],
  [1200000, 0.15],
  [1500000, 0.2],
  [Infinity, 0.3],
];
const OLD_SLABS = [
  [250000, 0],
  [500000, 0.05],
  [1000000, 0.2],
  [Infinity, 0.3],
];

function slabTax(taxable, slabs) {
  if (taxable <= 0) return 0;
  let tax = 0,
    lower = 0;
  for (const [upper, rate] of slabs) {
    if (taxable <= lower) break;
    tax += (Math.min(taxable, upper) - lower) * rate;
    lower = upper;
    if (taxable <= upper) break;
  }
  return tax;
}

function rebate87A(tax, incomeForRebate, regime) {
  if (regime === "new") {
    if (incomeForRebate <= 700000) return tax;
    return 0;
  }
  if (incomeForRebate <= 500000) return Math.min(tax, 12500);
  return 0;
}

function calcRegime(gross, regime, ded) {
  const std = regime === "new" ? STD_NEW : STD_OLD;
  let taxable = gross - std;
  if (regime === "old") {
    taxable -=
      Math.min(Math.max(ded.c80c, 0), 150000) +
      Math.min(Math.max(ded.nps, 0), 50000) +
      Math.max(ded.d80d, 0) +
      Math.max(ded.hra, 0) +
      Math.max(ded.other, 0);
  }
  taxable = Math.max(0, taxable);
  const raw = slabTax(taxable, regime === "new" ? NEW_SLABS : OLD_SLABS);
  const reb = rebate87A(raw, taxable, regime);
  const afterReb = Math.max(0, raw - reb);
  return afterReb + afterReb * CESS;
}

let failed = 0;
const neu7 = calcRegime(700000, "new", {});
if (neu7 > 1) {
  console.error("Expected ~0 tax for 7L new regime, got", neu7);
  failed++;
}
const t8 = calcRegime(800000, "new", {});
const t10 = calcRegime(1000000, "new", {});
if (t10 <= t8) {
  console.error("Tax should increase with income in new regime");
  failed++;
}
const oldNoDed = calcRegime(500000, "old", { c80c: 0, nps: 0, d80d: 0, hra: 0, other: 0 });
if (oldNoDed > 1) {
  console.error("Expected ~0 tax for 5L taxable old (87A), got", oldNoDed);
  failed++;
}
if (failed) process.exit(1);
console.log("income-tax: 2 scenario checks passed");
