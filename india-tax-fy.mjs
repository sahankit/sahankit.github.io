/**
 * Single source for India income-tax financial year shown on calculators and guides.
 * Update here when a new FY is active; slab logic in tools-batch11 / income-tax.test.mjs may also need review.
 */
export const INDIA_INCOME_TAX_FY = {
  /** Display: FY 2026–27 */
  fyLabel: "2026–27",
  /** URL slug segment: 2026-27 */
  fySlug: "2026-27",
  /** Display: AY 2027–28 */
  ayLabel: "2027–28",
  /** Meta / keywords */
  fyShort: "2026-27",
  ayShort: "2027-28",
  fyAyLine: "FY 2026–27 (AY 2027–28)",
  slabsGuideFile: "guides/india-income-tax-slabs-fy-2026-27.html",
  slabsGuidePath: "/guides/india-income-tax-slabs-fy-2026-27/",
  /** Previous slabs guide — 301 target only */
  legacySlabsGuidePath: "/guides/india-income-tax-slabs-fy-2025-26/",
};

/** New regime slabs for FY 2026–27: [upper taxable bound, rate]. */
export const NEW_REGIME_SLABS = [
  [400000, 0],
  [800000, 0.05],
  [1200000, 0.1],
  [1600000, 0.15],
  [2000000, 0.2],
  [2400000, 0.25],
  [Infinity, 0.3],
];

/** Old regime slabs (unchanged bands). */
export const OLD_REGIME_SLABS = [
  [250000, 0],
  [500000, 0.05],
  [1000000, 0.2],
  [Infinity, 0.3],
];

export const STD_DED_NEW = 75000;
export const STD_DED_OLD = 50000;
export const CESS_RATE = 0.04;
/** Section 87A: new regime rebate when taxable income is up to ₹12 lakh. */
export const REBATE_87A_NEW_TAXABLE_MAX = 1200000;
export const REBATE_87A_OLD_TAXABLE_MAX = 500000;
export const REBATE_87A_OLD_CAP = 12500;

/** On-page slab summary (new regime, on taxable income). */
export const NEW_REGIME_SLAB_SUMMARY =
  "0–₹4L nil; ₹4–8L 5%; ₹8–12L 10%; ₹12–16L 15%; ₹16–20L 20%; ₹20–24L 25%; above ₹24L 30%.";

export const OLD_REGIME_SLAB_SUMMARY =
  "0–₹2.5L nil; ₹2.5–5L 5%; ₹5–10L 20%; above ₹10L 30%.";

export function indiaTaxYearPrefix() {
  return `FY ${INDIA_INCOME_TAX_FY.fyLabel}`;
}

function slabsLiteral(slabs) {
  return `[${slabs.map(([u, r]) => `[${u === Infinity ? "Infinity" : u},${r}]`).join(",")}]`;
}

/** Browser tax engine used by every India salary/tax calculator. */
export function indiaTaxEngineJs() {
  return `window.IndiaTax=(function(){
  var NEW_SLABS=${slabsLiteral(NEW_REGIME_SLABS)};
  var OLD_SLABS=${slabsLiteral(OLD_REGIME_SLABS)};
  var STD_NEW=${STD_DED_NEW}, STD_OLD=${STD_DED_OLD}, CESS=${CESS_RATE};
  var REBATE_NEW=${REBATE_87A_NEW_TAXABLE_MAX}, REBATE_OLD=${REBATE_87A_OLD_TAXABLE_MAX}, REBATE_OLD_CAP=${REBATE_87A_OLD_CAP};
  function slabTax(taxable, slabs){
    if(taxable<=0) return 0;
    var tax=0, lower=0, i, upper, rate;
    for(i=0;i<slabs.length;i++){
      upper=slabs[i][0]; rate=slabs[i][1];
      if(taxable<=lower) break;
      tax += (Math.min(taxable, upper)-lower)*rate;
      lower=upper;
      if(taxable<=upper) break;
    }
    return tax;
  }
  function rebate87A(tax, taxable, regime){
    if(regime==='new'){
      if(taxable<=REBATE_NEW) return tax;
      var cap=Math.max(0, taxable-REBATE_NEW);
      return tax>cap ? tax-cap : 0;
    }
    if(taxable<=REBATE_OLD) return Math.min(tax, REBATE_OLD_CAP);
    return 0;
  }
  function taxBeforeCess(taxable, regime){
    var slabs=regime==='new'?NEW_SLABS:OLD_SLABS;
    var raw=slabTax(taxable, slabs);
    var reb=rebate87A(raw, taxable, regime);
    return Math.max(0, raw-reb);
  }
  function totalTax(taxable, regime){
    var after=taxBeforeCess(taxable, regime);
    return after + after*CESS;
  }
  function fromGross(gross, regime, ded){
    ded=ded||{};
    var std=regime==='new'?STD_NEW:STD_OLD;
    var taxable=gross-std;
    if(regime==='old'){
      taxable -= Math.min(Math.max(ded.c80c||0,0),150000)
        + Math.min(Math.max(ded.nps||0,0),50000)
        + Math.max(ded.d80d||0,0) + Math.max(ded.hra||0,0) + Math.max(ded.other||0,0);
    }
    taxable=Math.max(0, taxable);
    var raw=slabTax(taxable, regime==='new'?NEW_SLABS:OLD_SLABS);
    var reb=rebate87A(raw, taxable, regime);
    var after=Math.max(0, raw-reb);
    var cessAmt=after*CESS;
    return { taxable:taxable, raw:raw, reb:reb, afterReb:after, cessAmt:cessAmt, total:after+cessAmt };
  }
  return {
    fy:'${INDIA_INCOME_TAX_FY.fyLabel}',
    STD_NEW:STD_NEW, STD_OLD:STD_OLD, CESS:CESS,
    NEW_SLABS:NEW_SLABS, OLD_SLABS:OLD_SLABS,
    REBATE_NEW:REBATE_NEW,
    slabTax:slabTax, rebate87A:rebate87A,
    taxBeforeCess:taxBeforeCess, totalTax:totalTax, fromGross:fromGross
  };
})();`;
}