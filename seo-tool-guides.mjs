/** Cross-links from tools to long-form guides + compact validator reference blocks. */

export const toolGuideLinks = {
  "income-tax-calculator.html": [
    { href: "/guides/india-income-tax-slabs-fy-2026-27/", label: "Guide: FY 2026–27 income tax slabs" },
    { href: "/guides/india-new-vs-old-regime-breakeven/", label: "Guide: New vs old regime breakeven" },
    { href: "/guides/india-87a-marginal-relief/", label: "Guide: Section 87A & marginal relief" },
  ],
  "old-vs-new-tax-regime-calculator.html": [
    { href: "/guides/india-new-vs-old-regime-breakeven/", label: "Guide: New vs old regime breakeven" },
    { href: "/guides/india-income-tax-slabs-fy-2026-27/", label: "Guide: FY 2026–27 slabs" },
  ],
  "salary-breakup-calculator.html": [
    { href: "/guides/india-income-tax-slabs-fy-2026-27/", label: "Guide: FY 2026–27 tax slabs" },
    { href: "/guides/india-new-vs-old-regime-breakeven/", label: "Guide: Regime comparison" },
  ],
  "advance-tax-calculator.html": [
    { href: "/guides/india-advance-tax-calendar/", label: "Guide: Advance tax calendar" },
    { href: "/guides/india-income-tax-slabs-fy-2026-27/", label: "Guide: FY 2026–27 slabs" },
  ],
  "gst-calculator.html": [
    { href: "/guides/india-gst-rates-reference/", label: "Guide: GST rates reference" },
    { href: "/guides/gst-inclusive-vs-exclusive/", label: "Guide: GST inclusive vs exclusive" },
  ],
  "gst-inclusive-calculator.html": [
    { href: "/guides/gst-inclusive-vs-exclusive/", label: "Guide: GST inclusive vs exclusive" },
    { href: "/guides/india-gst-rates-reference/", label: "Guide: GST rates reference" },
  ],
};

export const validatorRefSection = {
  "pan-format.html": {
    h2: "PAN format reference (10 characters)",
    paragraphs: [
      "Permanent Account Number (PAN) uses five letters, four digits, and one letter: <strong>AAAAA9999A</strong>. The fourth letter indicates holder type.",
    ],
    table: {
      headers: ["Position", "Rule", "Example"],
      rows: [
        ["1–5", "Letters A–Z (name)", "ABCDE"],
        ["6–9", "Digits 0–9", "1234"],
        ["10", "Letter A–Z (checksum)", "F"],
        ["4th char", "P=Person, C=Company, H=HUF, F=Firm, A=AOP, T=Trust", "P in EPAPS1234F"],
      ],
    },
  },
  "ifsc-format.html": {
    h2: "IFSC format reference (11 characters)",
    paragraphs: [
      "Indian Financial System Code identifies bank and branch for NEFT/RTGS/IMPS: <strong>AAAA0BBBBBB</strong> (4 bank + 0 + 6 branch).",
    ],
    table: {
      headers: ["Segment", "Rule", "Example"],
      rows: [
        ["1–4", "Bank code (letters)", "HDFC"],
        ["5", "Always 0", "0"],
        ["6–11", "Branch code (alphanumeric)", "000123"],
      ],
    },
  },
  "aadhaar-format-checker.html": {
    h2: "Aadhaar number reference",
    paragraphs: [
      "Aadhaar is a 12-digit identifier (often grouped 4-4-4). This tool checks pattern only—not UIDAI verification.",
    ],
    table: {
      headers: ["Field", "Rule"],
      rows: [
        ["Length", "12 digits"],
        ["Grouping", "XXXX XXXX XXXX (spaces optional)"],
        ["Verhoeff", "Last digit is checksum (not validated here on all builds)"],
      ],
    },
  },
  "gstin-format-checker.html": {
    h2: "GSTIN format reference (15 characters)",
    paragraphs: ["Goods and Services Tax Identification Number encodes state, PAN, entity type, and checksum."],
    table: {
      headers: ["Segment", "Meaning"],
      rows: [
        ["1–2", "State code"],
        ["3–12", "PAN of entity"],
        ["13", "Entity number / registration within PAN"],
        ["14", "Default Z"],
        ["15", "Check digit"],
      ],
    },
  },
};