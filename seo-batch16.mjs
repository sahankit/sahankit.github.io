/** SEO metadata for batch 16 tools. */

import { INDIA_INCOME_TAX_FY } from "./india-tax-fy.mjs";

const FY = INDIA_INCOME_TAX_FY.fyShort;
const FY_DISP = INDIA_INCOME_TAX_FY.fyLabel;

export const batch16PageSeo = {
  "hra-calculator.html": {
    metaTitle: `HRA Calculator India ${FY} — House Rent Allowance Exemption`,
    metaDescription:
      "Free HRA exemption calculator for salaried taxpayers in India. Enter basic salary, HRA received, rent paid, and metro city to estimate exempt HRA under the old regime.",
    keywords:
      "hra calculator india, house rent allowance exemption, hra tax exemption metro, old regime hra, rent paid 10 percent basic",
    sections: [
      {
        h2: "How HRA exemption is calculated",
        paragraphs: [
          "For many salaried employees under the old income tax regime, exempt HRA is the minimum of three amounts: actual HRA received, rent paid minus 10% of basic salary, and 50% of basic (metro) or 40% of basic (non-metro).",
          "Use this with our income tax calculator to compare new vs old regime when HRA is a large deduction.",
        ],
      },
    ],
    faqs: [
      { q: "Does HRA apply in the new tax regime?", a: "Generally no—HRA exemption is not available under the new regime. This tool is for old-regime planning." },
      { q: "Is rent receipt mandatory?", a: "Employers and the tax department may require rent agreements and receipts for claimed HRA—this page only estimates math." },
    ],
    related: [
      { href: "/income-tax-calculator/", label: "Income tax calculator" },
      { href: "/finance/", label: "India finance hub" },
      { href: "/salary-calculator/", label: "Salary estimator" },
    ],
  },
  "home-loan-calculator.html": {
    metaTitle: "Home Loan EMI Calculator India — Housing Loan Interest & EMI",
    metaDescription:
      "Calculate home loan EMI, total interest, and total repayment for India housing loans. Free mortgage EMI calculator—enter amount, rate, and tenure.",
    keywords: "home loan emi calculator india, housing loan calculator, mortgage emi india, home loan interest total",
    sections: [
      {
        h2: "Home loan EMI formula",
        paragraphs: [
          "Monthly EMI uses the standard reducing-balance formula on principal, annual interest rate, and tenure in years. Results are estimates—banks may add fees, insurance, or floating rates.",
        ],
      },
    ],
    faqs: [{ q: "Is this official bank EMI?", a: "No. It is a quick illustration; confirm with your lender's amortization schedule." }],
    related: [
      { href: "/emi-calculator/", label: "EMI calculator" },
      { href: "/amortization-schedule/", label: "Amortization table" },
      { href: "/finance/", label: "Finance hub" },
    ],
  },
  "car-loan-calculator.html": {
    metaTitle: "Car Loan EMI Calculator — Auto Loan Payment Online",
    metaDescription: "Free car loan EMI calculator. Vehicle price, down payment, interest rate, and tenure → monthly EMI and total cost.",
    keywords: "car loan emi calculator, auto loan calculator india, vehicle finance emi, car emi online",
    related: [{ href: "/emi-calculator/", label: "EMI calculator" }, { href: "/home-loan-calculator/", label: "Home loan EMI" }],
  },
  "step-up-sip-calculator.html": {
    metaTitle: "Step-Up SIP Calculator India — Increase SIP Every Year",
    metaDescription:
      "Estimate mutual fund SIP maturity when you increase the monthly investment each year. Step-up SIP calculator with expected return—illustration only.",
    keywords: "step up sip calculator, increasing sip calculator india, sip calculator annual increment",
    related: [{ href: "/sip-calculator/", label: "SIP calculator" }, { href: "/finance/", label: "Finance hub" }],
  },
  "gst-inclusive-calculator.html": {
    metaTitle: "GST Inclusive Price Calculator — Remove GST from MRP India",
    metaDescription:
      "Split a GST-inclusive price into taxable value and GST amount. India rates 5%, 12%, 18%, 28%—reverse GST calculator for invoices.",
    keywords: "gst inclusive calculator, reverse gst calculator, remove gst from price, mrp gst split india",
    directAnswer:
      "If MRP already includes GST, taxable value = inclusive ÷ (1 + rate%). Example: ₹1,180 inclusive @ 18% → about ₹1,000 taxable + ₹180 GST.",
    sections: [
      {
        h2: "Inclusive vs exclusive quick examples",
        list: [
          "₹1,050 inclusive @ 5% → taxable ≈ ₹1,000",
          "₹1,120 inclusive @ 12% → taxable ≈ ₹1,000",
          "₹1,180 inclusive @ 18% → taxable ≈ ₹1,000",
          "₹1,280 inclusive @ 28% → taxable ≈ ₹1,000",
        ],
      },
    ],
    faqs: [
      { q: "CGST and SGST vs IGST?", a: "This tool splits total GST; your invoice still needs correct CGST/SGST or IGST labels per place of supply." },
      { q: "Difference from reverse GST calculator?", a: "Both back out tax from inclusive amounts. Use whichever page matches your workflow." },
    ],
    related: [
      { href: "/gst-calculator/", label: "Add GST (exclusive)" },
      { href: "/reverse-gst-calculator/", label: "Reverse GST" },
      { href: "/guides/india-gst-rates-reference/", label: "GST rates reference" },
    ],
  },
  "meta-description-checker.html": {
    metaTitle: "Meta Description Length Checker — SEO Title & Snippet Tool",
    metaDescription:
      "Count characters for SEO page titles and meta descriptions. Stay near Google snippet limits (≈30–60 title, ≈120–160 description).",
    keywords: "meta description length checker, seo title character count, google snippet length, meta description counter",
    sections: [
      {
        h2: "SEO snippet length guidelines",
        paragraphs: [
          "Search engines truncate long titles and descriptions. Aim for concise, unique copy on every page—this tool counts characters as you type.",
        ],
      },
    ],
    related: [
      { href: "/meta-tag-generator/", label: "Meta tag generator" },
      { href: "/slug-generator/", label: "Slug generator" },
      { href: "/seo-lab/", label: "SEO lab" },
    ],
  },
  "html-to-markdown.html": {
    metaTitle: "HTML to Markdown Converter — Free Online",
    metaDescription: "Convert HTML to Markdown in your browser. Paste HTML, download clean MD for GitHub, docs, and CMS.",
    keywords: "html to markdown converter, html to md online, convert html to markdown free",
    related: [{ href: "/markdown-to-text/", label: "Markdown to text" }, { href: "/markdown-preview/", label: "Markdown preview" }],
  },
  "markdown-to-text.html": {
    metaTitle: "Markdown to Plain Text — Strip Markdown Online",
    metaDescription: "Remove Markdown formatting and get plain text for word counts, email, and paste into Word or Google Docs.",
    keywords: "markdown to plain text, strip markdown, remove markdown formatting online",
    related: [{ href: "/html-to-markdown/", label: "HTML to Markdown" }, { href: "/word-counter/", label: "Word counter" }],
  },
  "tdee-calculator.html": {
    metaTitle: "TDEE Calculator — Daily Calories & BMR (Mifflin-St Jeor)",
    metaDescription:
      "Calculate BMR and TDEE (total daily energy expenditure) from age, sex, weight, height, and activity level. Free calorie calculator.",
    keywords: "tdee calculator, bmr calculator, daily calorie calculator, maintenance calories online",
    related: [{ href: "/bmr-calculator/", label: "BMR calculator" }, { href: "/bmi-calculator/", label: "BMI calculator" }],
  },
  "iban-validator.html": {
    metaTitle: "IBAN Validator — Check IBAN Number Online",
    metaDescription: "Validate international bank account numbers (IBAN) with format and MOD-97 checksum in your browser.",
    keywords: "iban validator, check iban online, iban checksum, sepa iban verify",
    related: [{ href: "/ifsc-format/", label: "IFSC format (India)" }, { href: "/dev/", label: "Developer hub" }],
  },
  "jwt-generator.html": {
    metaTitle: "JWT Generator — Create HS256 Token Online",
    metaDescription: "Generate a signed JSON Web Token (HS256) from payload and secret locally. For API testing with our JWT decoder.",
    keywords: "jwt generator online, create jwt hs256, json web token generator test",
    related: [{ href: "/jwt-decoder/", label: "JWT decoder" }, { href: "/hash-generator/", label: "SHA-256 hash" }],
  },
  "test-credit-card-generator.html": {
    metaTitle: "Test Credit Card Number Generator — Luhn Valid (Sandbox)",
    metaDescription:
      "Generate Luhn-valid Visa and Mastercard test numbers for payment sandbox and QA. Not real cards—developer testing only.",
    keywords: "test credit card number generator, fake card number luhn, visa test card sandbox",
    faqs: [{ q: "Are these real cards?", a: "No. They are algorithmically generated test numbers for developer sandboxes only." }],
    related: [{ href: "/luhn-checker/", label: "Luhn checker" }, { href: "/dev/", label: "Developer hub" }],
  },
};
