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

export function indiaTaxYearPrefix() {
  return `FY ${INDIA_INCOME_TAX_FY.fyLabel}`;
}