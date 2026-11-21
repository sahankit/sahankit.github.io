/** SEO for linkable India reference guides (citation-friendly). */

import { SITE_NAME } from "./seo-build.mjs";

export const referencePageSeo = {
  "guides/india-income-tax-slabs-fy-2025-26.html": {
    metaTitle: "India Income Tax Slabs FY 2025–26 — New & Old Regime Reference",
    metaDescription:
      "Current income tax slab rates for FY 2025–26 (AY 2026–27): new regime vs old regime for residents below 60. Quick reference—confirm on Income Tax portal.",
    keywords:
      "income tax slabs 2025-26, new tax regime slabs, old tax regime slabs India, FY 2025-26 tax rates, section 87A rebate",
    directAnswer:
      "For FY 2025–26, the new regime uses stepped slabs from nil up to ₹3 lakh through 30% above ₹15 lakh taxable income, with a higher salary standard deduction. The old regime keeps the classic 5%/20%/30% slabs and allows Chapter VI-A deductions such as 80C and HRA.",
    sections: [
      {
        h2: "New tax regime slabs (resident &lt; 60)",
        list: [
          "₹0–3 lakh: nil",
          "₹3–7 lakh: 5%",
          "₹7–10 lakh: 10%",
          "₹10–12 lakh: 15%",
          "₹12–15 lakh: 20%",
          "Above ₹15 lakh: 30%",
        ],
        paragraphs: [
          "Standard deduction on salary is ₹75,000 in the new regime. Section 87A can zero out tax when total income (after standard deduction) does not exceed ₹7 lakh, subject to current law.",
        ],
      },
      {
        h2: "Old tax regime slabs (resident &lt; 60)",
        list: [
          "₹0–2.5 lakh: nil",
          "₹2.5–5 lakh: 5%",
          "₹5–10 lakh: 20%",
          "Above ₹10 lakh: 30%",
        ],
        paragraphs: [
          "Standard deduction on salary is ₹50,000. Eligible deductions under Chapter VI-A (80C, 80D, HRA, housing loan interest, etc.) apply only in the old regime.",
        ],
      },
      {
        h2: "Cess and disclaimer",
        paragraphs: [
          "Health and education cess at 4% applies on tax after rebate. Surcharge and special incomes are not covered here. Last updated for illustration tools on " +
            SITE_NAME +
            "—verify before filing.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which regime is default for salaried employees?",
        a: "The new regime is often the default unless you opt into the old regime through your employer or return, subject to current rules.",
      },
      {
        q: "Can I switch regime every year?",
        a: "Many salaried taxpayers can choose each financial year. Business taxpayers may face lock-in—check current Income Tax rules.",
      },
    ],
    related: [
      { href: "/income-tax-calculator/", label: "Income tax calculator (compare regimes)" },
      { href: "/hra-calculator/", label: "HRA calculator" },
      { href: "/guides/india-advance-tax-calendar/", label: "Advance tax calendar" },
      { href: "/india/", label: "India utilities hub" },
    ],
  },
  "guides/india-gst-rates-reference.html": {
    metaTitle: "India GST Rates Reference — Common Goods & Services",
    metaDescription:
      "Quick reference for common GST rates in India: 0%, 5%, 12%, 18%, 28% and special rates. Confirm on GST portal or CBIC notifications before invoicing.",
    keywords: "GST rates India, GST rate list, 5 percent GST, 18 percent GST, GST on food, GST reference",
    directAnswer:
      "Most everyday goods fall under 5%, 12%, or 18% GST; luxury and sin goods can attract 28% or compensation cess. Exports and specified essentials may be nil-rated or exempt—always match HSN/SAC on the invoice.",
    sections: [
      {
        h2: "Standard rate bands (indicative)",
        list: [
          "<strong>0% / exempt:</strong> unbranded atta, unbranded rice, fresh milk, books (specified), healthcare services (rules vary)",
          "<strong>5%:</strong> packaged food staples, economy transport, some medicines",
          "<strong>12%:</strong> processed foods, business-class air travel (examples)",
          "<strong>18%:</strong> most services, electronics, soaps, IT services (SAC)",
          "<strong>28% + cess:</strong> luxury cars, aerated drinks, tobacco (compensation cess may apply)",
        ],
      },
      {
        h2: "Composition & reverse charge (remember)",
        paragraphs: [
          "Composition dealers pay tax at a fixed turnover percentage and generally cannot collect GST on invoices. Reverse charge applies when registered persons buy from unregistered suppliers in notified cases—use the GST calculator and your CA for filing decisions.",
        ],
      },
    ],
    faqs: [
      { q: "Is this an official GST rate list?", a: "No. It is a simplified reference for common categories. Use the GST portal or notifications for compliance." },
      { q: "How do I find GST for my HSN code?", a: "Use the HSN GST rate finder tool and cross-check the CBIC rate schedule for your exact code." },
    ],
    related: [
      { href: "/gst-calculator/", label: "GST calculator" },
      { href: "/hsn-gst-rate-finder/", label: "HSN GST rate finder" },
      { href: "/india-invoice/", label: "GST invoice template" },
      { href: "/india/", label: "India hub" },
    ],
  },
  "guides/india-advance-tax-calendar.html": {
    metaTitle: "Advance Tax Due Dates India FY 2025–26 — Instalment Calendar",
    metaDescription:
      "Advance tax instalment due dates for individuals and companies in India: 15 June, 15 Sept, 15 Dec, 15 March. Penalty notes under Sections 234B and 234C.",
    keywords: "advance tax due date, advance tax instalments India, 15 june advance tax, section 234C, FY 2025-26 advance tax",
    directAnswer:
      "Advance tax is paid in four instalments—typically 15% by 15 June, 45% by 15 September, 75% by 15 December, and 100% by 15 March for the financial year.",
    sections: [
      {
        h2: "Instalment schedule (FY)",
        list: [
          "<strong>15 June:</strong> 15% of annual tax liability",
          "<strong>15 September:</strong> 45% cumulative",
          "<strong>15 December:</strong> 75% cumulative",
          "<strong>15 March:</strong> 100% cumulative",
        ],
        paragraphs: [
          "If tax payable after TDS/TCS is ₹10,000 or more in a year, advance tax generally applies. Senior citizens without business income may be exempt—check current rules.",
        ],
      },
      {
        h2: "Penalties (overview)",
        paragraphs: [
          "Section 234B may apply for short payment of advance tax; Section 234C for deferment of instalments. Pay through the Income Tax portal challan (advance tax) and keep receipts.",
        ],
      },
    ],
    faqs: [
      { q: "Does salary TDS count toward advance tax?", a: "Employer TDS reduces your net advance tax due. Estimate balance liability with the income tax calculator." },
      { q: "Are these dates for companies too?", a: "Companies and many non-individual taxpayers follow the same quarterly pattern; verify for special cases." },
    ],
    related: [
      { href: "/income-tax-calculator/", label: "Income tax calculator" },
      { href: "/guides/india-income-tax-slabs-fy-2025-26/", label: "Tax slabs FY 2025–26" },
      { href: "/finance/", label: "Finance hub" },
    ],
  },
};