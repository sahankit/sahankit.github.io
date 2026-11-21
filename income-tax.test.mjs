/** Unit tests for income tax slab + rebate logic (mirrors tools-batch11). */
import {
  CESS_RATE,
  NEW_REGIME_SLABS,
  OLD_REGIME_SLABS,
  REBATE_87A_NEW_TAXABLE_MAX,
  REBATE_87A_OLD_CAP,
  REBATE_87A_OLD_TAXABLE_MAX,
  STD_DED_NEW,
  STD_DED_OLD,
} from "./india-tax-fy.mjs";

const STD_NEW = STD_DED_NEW;
const STD_OLD = STD_DED_OLD;
const CESS = CESS_RATE;
const NEW_SLABS = NEW_REGIME_SLABS;
const OLD_SLABS = OLD_REGIME_SLABS;

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
    if (incomeForRebate <= REBATE_87A_NEW_TAXABLE_MAX) return tax;
    const cap = Math.max(0, incomeForRebate - REBATE_87A_NEW_TAXABLE_MAX);
    return tax > cap ? tax - cap : 0;
  }
  if (incomeForRebate <= REBATE_87A_OLD_TAXABLE_MAX) return Math.min(tax, REBATE_87A_OLD_CAP);
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
const neu1275 = calcRegime(1275000, "new", {});
if (neu1275 > 1) {
  console.error("Expected ~0 tax for 12.75L gross new regime (12L taxable), got", neu1275);
  failed++;
}
const neu13 = calcRegime(1350000, "new", {});
const neu11 = calcRegime(1150000, "new", {});
if (neu13 <= neu11) {
  console.error("Tax should increase with income above 87A limit in new regime");
  failed++;
}
const justOver = calcRegime(1280000, "new", {});
const excess = 1280000 - 75000 - 1200000;
if (justOver > excess * 1.04 + 1) {
  console.error("Marginal relief should cap tax near excess over 12L taxable, got", justOver);
  failed++;
}
const oldNoDed = calcRegime(500000, "old", { c80c: 0, nps: 0, d80d: 0, hra: 0, other: 0 });
if (oldNoDed > 1) {
  console.error("Expected ~0 tax for 5L taxable old (87A), got", oldNoDed);
  failed++;
}
if (failed) process.exit(1);
console.log("income-tax: 2 scenario checks passed");