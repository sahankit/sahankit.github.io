function t(kw, h2, p) {
  return { keywords: kw, sections: [{ h2, paragraphs: [p] }], faqs: [], related: [] };
}

export const batch9PageSeo = {
  "hourly-to-salary.html": t("hourly to salary calculator annual", "Annualize hourly pay", "Multiply hourly rate by hours per year."),
  "cagr-calculator.html": t("cagr calculator compound annual growth", "Investment CAGR", "Growth rate between two values over time."),
  "rule-of-72.html": t("rule of 72 calculator double money", "Quick doubling estimate", "72 divided by annual return percent."),
  "fraction-calculator.html": t("fraction calculator add fractions", "Fraction math", "Add, subtract, multiply, divide fractions."),
  "ratio-simplifier.html": t("ratio simplifier lowest terms", "Simplify ratios", "Divide by greatest common divisor."),
  "mod-calculator.html": t("modulo calculator remainder", "Mod math", "Remainder after integer division."),
  "ipv4-to-decimal.html": t("ipv4 to decimal converter", "IP integer form", "Useful for databases and range checks."),
  "rot13-encoder.html": t("rot13 encoder decoder", "ROT13 cipher", "Apply twice to decode."),
  "base32-encoder.html": t("base32 encode decode online", "Base32", "Common for secrets and tokens."),
  "lottery-numbers.html": t("lottery number generator random", "Random picks", "Unique numbers in a range."),
  "list-shuffler.html": t("shuffle list random order", "Randomize lines", "Fisher–Yates shuffle in browser."),
  "text-joiner.html": t("join lines delimiter comma", "Combine lines", "CSV-style joining."),
  "cooking-converter.html": t("cooking unit converter cups ml", "Kitchen measures", "US cup/tablespoon approximations."),
  "gratuity-calculator.html": {
    metaTitle: "Gratuity Calculator India — Payment of Gratuity Act (15/26 Formula)",
    metaDescription:
      "Estimate gratuity for eligible employees: (15/26) × last drawn salary × years of service. Free gratuity calculator India—5+ years rule explained.",
    keywords:
      "gratuity calculator india, payment of gratuity act calculator, gratuity formula 15/26, gratuity for 5 years, gratuity on basic and da",
    directAnswer:
      "Eligible employees often use gratuity ≈ (15 ÷ 26) × (monthly basic + DA) × completed years of service. You usually need 5+ continuous years (with exceptions). This page is an illustration—not HR or legal advice.",
    sections: [
      {
        h2: "Gratuity formula (simplified)",
        list: [
          "<strong>Common formula:</strong> (15/26) × last drawn basic + DA × years of service",
          "<strong>Eligibility:</strong> typically minimum 5 years under the Payment of Gratuity Act (death/disablement exceptions apply)",
          "<strong>Cap:</strong> law sets a maximum gratuity amount—verify current notified limit with HR",
        ],
        paragraphs: [
          "Enter monthly basic + DA and completed years. For partial years, employers may round per policy and statute—confirm with HR.",
        ],
      },
      {
        h2: "Related payroll tools",
        paragraphs: [
          "Pair with CTC breakup, EPF calculator, income tax calculator, and leave encashment for full exit planning.",
        ],
      },
    ],
    faqs: [
      { q: "What is the 15/26 in gratuity?", a: "It reflects 15 days’ wages per year of service expressed as a fraction of a 26-day working month in the standard formula." },
      { q: "Is gratuity taxable?", a: "Statutory exemption limits apply to qualified gratuity. Tax treatment depends on employer type and amount—consult a CA." },
      { q: "Does resignation after 5 years qualify?", a: "Often yes if continuous service and eligibility tests are met. Employer records prevail." },
      { q: "Is last drawn salary only basic?", a: "The Act focuses on basic wages and dearness allowance—not full CTC. This tool uses basic + DA as you enter it." },
    ],
    related: [
      { href: "/leave-encashment-calculator/", label: "Leave encashment" },
      { href: "/salary-breakup-calculator/", label: "Salary breakup (CTC)" },
      { href: "/epf-calculator/", label: "EPF calculator" },
      { href: "/income-tax-calculator/", label: "Income tax calculator" },
    ],
  },
  "upi-id-format.html": t("upi id format validator vpa", "UPI VPA pattern", "Not NPCI verification."),
  "isbn-validator.html": t("isbn validator isbn 13 check", "ISBN checksum", "Validate 10 or 13 digit ISBN."),
  "cpm-calculator.html": t("cpm calculator advertising", "Cost per mille", "Spend per thousand impressions."),
  "ctr-calculator.html": t("ctr calculator click through rate", "CTR from analytics", "Clicks divided by impressions."),
};
