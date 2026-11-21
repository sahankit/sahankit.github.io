import { INDIA_INCOME_TAX_FY } from "./india-tax-fy.mjs";

const FY = INDIA_INCOME_TAX_FY.fyShort;
const FY_DISP = INDIA_INCOME_TAX_FY.fyLabel;
const AY_DISP = INDIA_INCOME_TAX_FY.ayLabel;
const SLABS = INDIA_INCOME_TAX_FY.slabsGuidePath;

export const batch11PageSeo = {
  "income-tax-calculator.html": {
    metaTitle: `Income Tax Calculator India ${FY} — New vs Old Regime | Which Is Better?`,
    metaDescription: `Free income tax calculator for FY ${FY_DISP} (AY ${AY_DISP}). Compare new vs old tax regime with 80C, HRA, 80D. See total tax, cess, monthly in-hand, and which regime saves more.`,
    directAnswer: `For FY ${FY_DISP}, estimate salaried income tax under India's new and old regimes side by side—standard deduction, 87A rebate, 80C/HRA in the old column only—then see monthly in-hand and which regime is lower for your numbers.`,
    ogLocale: "en_IN",
    sitemapPriority: "0.9",
    sitemapChangefreq: "weekly",
    keywords:
      `income tax calculator india, new tax regime vs old regime, which tax regime is better, FY ${FY} tax slabs, 80C HRA calculator, section 115BAC, salaried tax comparison, 87A rebate, standard deduction 75000`,
    howTo: {
      name: "How to compare new and old income tax regime online",
      description:
        "Use Sahankit's free calculator to estimate Indian income tax under both regimes for salaried income.",
      steps: [
        {
          name: "Enter annual gross salary",
          text: "Type your yearly salary before tax (CTC or gross, as you use for planning).",
        },
        {
          name: "Add old-regime deductions",
          text: "Fill 80C (up to ₹1.5 lakh), optional NPS 80CCD(1B), 80D health insurance, HRA exemption, and other Chapter VI-A amounts. These apply only to the old regime column.",
        },
        {
          name: "Compare results",
          text: "Click Compare regimes to see taxable income, tax, cess, net in-hand, and a clear recommendation on which regime is advantageous for your numbers.",
        },
      ],
    },
    sections: [
      {
        h2: "Free income tax calculator for salaried employees in India",
        paragraphs: [
          `Use this page to estimate how much income tax you may pay under the new tax regime (section 115BAC) versus the old regime for financial year ${FY_DISP} (assessment year ${AY_DISP}). Enter your gross salary and deductions such as 80C investments, HRA, and 80D medical insurance. The tool shows side-by-side tax, health and education cess, annual take-home, and monthly in-hand so you can decide which regime is better for you before talking to your employer or chartered accountant.`,
          "Everything runs in your browser. We do not store salary or PAN data on a server.",
        ],
      },
      {
        h2: "New tax regime vs old tax regime — quick comparison",
        paragraphs: [
          "The new regime is the default for many salaried taxpayers but you can opt for the old regime if it reduces your tax. The new regime allows a higher standard deduction on salary (₹75,000) and simpler slabs, but most deductions under Chapter VI-A (including 80C and HRA) are not available. The old regime uses a ₹50,000 standard deduction and the traditional slabs, but you can claim 80C, HRA, 80D, extra NPS, and other eligible deductions.",
        ],
        list: [
          "<strong>New regime</strong> — Often better when you have few deductions (no or low HRA, minimal 80C/80D). Middle incomes may benefit from section 87A rebate when total income after standard deduction is up to ₹7 lakh.",
          "<strong>Old regime</strong> — Often better when HRA exemption is large (metros), you use full 80C, pay health premiums (80D), or have substantial housing loan interest and other VI-A deductions.",
          "<strong>Which is advantageous?</strong> — There is no fixed cutoff salary: run this calculator with your real deduction numbers. A ₹12 lakh package with high HRA may favour the old regime; the same salary with zero HRA may favour the new regime.",
        ],
      },
      {
        h2: `FY ${FY_DISP} income tax slab rates (reference)`,
        paragraphs: ["Slab rates used in this calculator for resident individuals below 60 years:"],
        list: [
          "<strong>New regime</strong> (on taxable income): 0–₹3L nil; ₹3–7L 5%; ₹7–10L 10%; ₹10–12L 15%; ₹12–15L 20%; above ₹15L 30%.",
          "<strong>Old regime</strong> (on taxable income): 0–₹2.5L nil; ₹2.5–5L 5%; ₹5–10L 20%; above ₹10L 30%.",
          "Health and education cess: 4% on tax after rebate. Section 87A rebate applied where eligible (new: income up to ₹7L; old: taxable up to ₹5L).",
        ],
      },
      {
        h2: "Deductions you can model (old regime only)",
        paragraphs: [
          "For the old regime column, include eligible amounts for 80C/80CCC/80CCD(1) combined (capped at ₹1.5 lakh in this tool), additional NPS under 80CCD(1B) (up to ₹50,000), 80D medical insurance, HRA exemption under section 10(13A), and a lump sum for other VI-A items (80E education loan interest, 80G donations, etc.). Home loan interest under section 24(b) can be added in “other” if you know the annual eligible amount.",
        ],
      },
      {
        h2: "Disclaimer",
        paragraphs: [
          "This calculator is for education and planning only. It does not handle surcharge, marginal relief, senior citizen slabs, capital gains, business income, or perquisite rules. Always confirm regime choice and TDS with your employer and a qualified tax professional or the Income Tax Department portal.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which is better — new tax regime or old tax regime in India?",
        a: "It depends on your gross income and deductions. Low deductions usually favour the new regime; high HRA, 80C, 80D, and housing interest usually favour the old regime. Use this calculator with your actual numbers to see estimated tax under both.",
      },
      {
        q: `What is the income tax slab for FY ${FY} new regime?`,
        a: "This tool uses the post–Budget 2024 style new regime slabs: nil up to ₹3 lakh taxable, then 5%, 10%, 15%, 20%, and 30% on higher bands, plus standard deduction on salary and eligible 87A rebate.",
      },
      {
        q: "Can I claim 80C in the new tax regime?",
        a: "No. Most Chapter VI-A deductions including 80C are not available in the new tax regime. Enter 80C only for the old-regime calculation.",
      },
      {
        q: "Is HRA exemption available in the new tax regime?",
        a: "No. HRA under section 10(13A) applies only in the old regime. Enter your annual HRA exemption in the old-regime deductions section.",
      },
      {
        q: "Why is tax zero when salary is around ₹7 lakh in the new regime?",
        a: "Section 87A can rebate tax to nil for eligible residents when total income (after standard deduction) does not exceed ₹7 lakh under the new regime, subject to current law.",
      },
      {
        q: "Can salaried employees switch between regimes every year?",
        a: "Salaried individuals can generally choose the regime each financial year through employer declaration or return filing, subject to current Income Tax rules. Business taxpayers have different lock-in rules.",
      },
      {
        q: "Does this calculator include 4% cess?",
        a: "Yes. Health and education cess at 4% is added on tax after section 87A rebate for both regimes.",
      },
      {
        q: "Is this an official Income Tax Department calculator?",
        a: "No. This site is independent and not affiliated with the CBDT or Income Tax India. Use official portals for filing and legal advice.",
      },
    ],
    related: [
      { href: "/finance/", label: "India finance tools hub" },
      { href: "/salary-breakup-calculator.html", label: "Salary breakup for tax" },
      { href: "/salary-calculator.html", label: "Salary in-hand (before tax)" },
      { href: "/gst-calculator.html", label: "GST calculator" },
      { href: "/ppf-calculator.html", label: "PPF maturity estimate" },
      { href: "/gratuity-calculator/", label: "Gratuity calculator (India)" },
      { href: "/sip-calculator.html", label: "SIP calculator" },
      { href: "/pan-format.html", label: "PAN format checker" },
    ],
  },
  "salary-breakup-calculator.html": {
    metaTitle: `Salary Breakup Calculator India — Tax-Saving CTC Structure FY ${FY}`,
    metaDescription:
      "Free salary breakup calculator for India. Enter CTC and rent to get Basic, HRA, PF, employer NPS, and allowance split vs a flat structure. Estimates old & new regime tax.",
    ogLocale: "en_IN",
    sitemapPriority: "0.88",
    sitemapChangefreq: "monthly",
    keywords:
      "salary breakup calculator, ctc breakup for tax saving, salary structure india, basic hra pf nps, tax optimized salary structure, in hand salary breakup",
    howTo: {
      name: "How to plan a tax-friendly salary breakup in India",
      description: "Use CTC, rent, and deductions to get a suggested salary structure for lower tax.",
      steps: [
        {
          name: "Enter annual CTC",
          text: "Type your yearly cost-to-company in rupees.",
        },
        {
          name: "Add rent and deductions",
          text: "Enter monthly rent, metro city, 80D premium, and any 80C beyond PF. Choose employer NPS if your company offers it.",
        },
        {
          name: "Compare optimized vs flat split",
          text: "Click Suggest breakup to see component-wise annual amounts, estimated tax, and in-hand under old and new regime.",
        },
      ],
    },
    sections: [
      {
        h2: "Why salary breakup matters for tax in India",
        paragraphs: [
          "CTC is not the same as taxable salary. How pay is split into Basic, HRA, special allowance, employer PF, and employer NPS changes exemptions under the old tax regime and deductions such as 80CCD(2) even in the new regime. A structure heavy on fully taxable special allowance often pays more TDS than one that uses eligible HRA, PF (80C), and employer NPS within company policy.",
        ],
      },
      {
        h2: "What this calculator suggests",
        paragraphs: [
          `Given your CTC, the tool searches a practical Basic percentage, sets HRA up to 50% of Basic (capped by CTC), includes optional exempt meal and phone perks, employer statutory costs in CTC, and employer NPS when selected. It compares that mix to a flat allowance-style split without employer NPS. Tax uses the same FY ${FY_DISP} slabs as our income tax calculator. Slab reference: <a href="${SLABS}">FY ${FY_DISP} tax slabs</a>.`,
        ],
        list: [
          "<strong>Old regime</strong> — Uses HRA exemption, employee PF toward 80C, your extra 80C and 80D, and employer NPS under 80CCD(2).",
          "<strong>New regime</strong> — Shows tax without HRA/80C benefits; employer NPS deduction still applies.",
          "<strong>Not payroll</strong> — Does not replace Form 16, perquisites, surcharge, or HR policy caps.",
        ],
      },
      {
        h2: "Disclaimer",
        paragraphs: [
          "Illustration for negotiation and planning only. Confirm final breakup and regime with your employer and a qualified tax professional.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the best Basic salary percentage for tax saving?",
        a: "There is no single answer: it depends on CTC, rent, metro city, and whether your employer offers NPS and reimbursements. This tool tests a range of Basic percentages and picks a lower old-regime tax estimate for your inputs.",
      },
      {
        q: "Does HRA save tax in the new regime?",
        a: "No. HRA exemption is generally not available in the new tax regime. The breakup table still shows HRA for old-regime planning.",
      },
      {
        q: "Is employer NPS part of CTC?",
        a: "Yes, employer contributions are usually part of CTC but can reduce taxable income under section 80CCD(2) subject to limits in law.",
      },
      {
        q: "Can I use this for offer letter negotiation?",
        a: "Yes, as a starting point. Share the suggested table with HR and adjust for company salary structure rules.",
      },
    ],
    related: [
      { href: "/income-tax-calculator.html", label: "Income tax (new vs old)" },
      { href: "/hra-calculator.html", label: "HRA exemption" },
      { href: "/salary-calculator.html", label: "In-hand salary estimate" },
      { href: "/epf-calculator.html", label: "EPF calculator" },
      { href: "/gratuity-calculator.html", label: "Gratuity calculator" },
      { href: "/finance/", label: "India finance hub" },
    ],
  },
};
