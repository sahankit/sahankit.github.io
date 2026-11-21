/** SEO metadata for batch 42 — US finance and tax calculators. */

const usFinanceRelated = [
  { href: "/mortgage-payment-calculator/", label: "Mortgage payment" },
  { href: "/paycheck-calculator/", label: "Paycheck calculator" },
  { href: "/finance/", label: "Finance hub" },
];

export const batch42PageSeo = {
  "mortgage-calculator.html": {
    metaTitle: "Mortgage Calculator — PITI Monthly Payment (US)",
    metaDescription:
      "Free US mortgage calculator with principal, interest, property tax, insurance, and HOA. Estimate full PITI payment.",
    keywords: "mortgage calculator, piti calculator, monthly mortgage payment calculator, home loan calculator usa",
    sitemapPriority: "0.9",
    related: [
      { href: "/mortgage-payment-calculator/", label: "P&I only" },
      { href: "/pmi-calculator/", label: "PMI calculator" },
      { href: "/down-payment-calculator/", label: "Down payment" },
    ],
  },
  "fha-loan-calculator.html": {
    metaTitle: "FHA Loan Calculator — Payment With MIP",
    metaDescription: "Calculate FHA mortgage payment with 3.5% down and FHA mortgage insurance (MIP).",
    keywords: "fha loan calculator, fha mortgage calculator, fha mip calculator, fha payment calculator",
    sitemapPriority: "0.9",
    related: usFinanceRelated,
  },
  "va-loan-calculator.html": {
    metaTitle: "VA Loan Calculator — VA Mortgage Payment",
    metaDescription: "Estimate VA home loan payment with funding fee and zero-down option.",
    keywords: "va loan calculator, va mortgage calculator, va funding fee calculator",
    sitemapPriority: "0.9",
    related: usFinanceRelated,
  },
  "pmi-calculator.html": {
    metaTitle: "PMI Calculator — Private Mortgage Insurance Cost",
    metaDescription: "Estimate monthly PMI until 80% LTV on a US conventional mortgage.",
    keywords: "pmi calculator, private mortgage insurance calculator, pmi cost calculator",
    sitemapPriority: "0.85",
    related: [
      { href: "/down-payment-calculator/", label: "Down payment" },
      { href: "/mortgage-calculator/", label: "Mortgage calculator" },
      { href: "/loan-to-value-calculator/", label: "LTV calculator" },
    ],
  },
  "down-payment-calculator.html": {
    metaTitle: "Down Payment Calculator — Home Down Payment Amount",
    metaDescription: "Calculate down payment dollars and loan amount from home price and percentage.",
    keywords: "down payment calculator, house down payment calculator, how much down payment",
    sitemapPriority: "0.85",
    related: usFinanceRelated,
  },
  "closing-cost-calculator.html": {
    metaTitle: "Closing Cost Calculator — Buyer Closing Costs US",
    metaDescription: "Estimate buyer closing costs on a US home purchase as percent of price.",
    keywords: "closing cost calculator, home closing costs calculator, buyer closing costs",
    sitemapPriority: "0.85",
    related: [
      { href: "/seller-net-proceeds-calculator/", label: "Seller net proceeds" },
      { href: "/mortgage-calculator/", label: "Mortgage calculator" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "social-security-calculator.html": {
    metaTitle: "Social Security Calculator — Benefit Estimate",
    metaDescription:
      "Estimate monthly Social Security retirement benefits at ages 62, 67, or 70 from benefit at full retirement age.",
    keywords: "social security calculator, social security benefits calculator, retirement benefit calculator",
    sitemapPriority: "0.9",
    related: [
      { href: "/401k-calculator/", label: "401(k) calculator" },
      { href: "/rmd-calculator/", label: "RMD calculator" },
      { href: "/roth-ira-calculator/", label: "Roth IRA" },
    ],
  },
  "cd-calculator.html": {
    metaTitle: "CD Calculator — Certificate of Deposit Interest",
    metaDescription: "Calculate CD maturity value and interest from deposit, APY, and term.",
    keywords: "cd calculator, certificate of deposit calculator, cd interest calculator",
    sitemapPriority: "0.85",
    related: [
      { href: "/compound-interest/", label: "Compound interest" },
      { href: "/savings-goal-calculator/", label: "Savings goal" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "debt-snowball-calculator.html": {
    metaTitle: "Debt Snowball Calculator — Dave Ramsey Payoff",
    metaDescription: "Debt snowball payoff calculator: pay smallest balance first with extra payments.",
    keywords: "debt snowball calculator, snowball debt payoff calculator, debt snowball method",
    sitemapPriority: "0.85",
    related: [
      { href: "/debt-avalanche-calculator/", label: "Debt avalanche" },
      { href: "/credit-card-payoff-calculator/", label: "Credit card payoff" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "debt-avalanche-calculator.html": {
    metaTitle: "Debt Avalanche Calculator — Highest Interest First",
    metaDescription: "Debt avalanche calculator: apply extra payments to highest APR debt first.",
    keywords: "debt avalanche calculator, debt payoff calculator avalanche, highest interest debt",
    sitemapPriority: "0.85",
    related: [
      { href: "/debt-snowball-calculator/", label: "Debt snowball" },
      { href: "/credit-card-payoff-calculator/", label: "Credit card payoff" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "car-lease-calculator.html": {
    metaTitle: "Car Lease Calculator — Monthly Lease Payment",
    metaDescription: "US car lease payment calculator from MSRP, residual, money factor, and term.",
    keywords: "car lease calculator, auto lease calculator, lease payment calculator, money factor calculator",
    sitemapPriority: "0.9",
    related: [
      { href: "/car-payment-calculator/", label: "Car loan payment" },
      { href: "/rent-vs-buy-calculator/", label: "Rent vs buy" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "federal-income-tax-calculator.html": {
    metaTitle: "Federal Income Tax Calculator — US Single Filer",
    metaDescription: "Estimate US federal income tax for single filers with 2024 brackets and standard deduction.",
    keywords: "federal income tax calculator, us tax calculator, income tax estimator usa, tax bracket calculator",
    sitemapPriority: "0.9",
    related: [
      { href: "/paycheck-calculator/", label: "Paycheck calculator" },
      { href: "/eitc-calculator/", label: "EITC calculator" },
      { href: "/child-tax-credit-calculator/", label: "Child tax credit" },
    ],
  },
  "capital-gains-tax-calculator.html": {
    metaTitle: "Capital Gains Tax Calculator — US Stock & Asset Gains",
    metaDescription: "Estimate US federal tax on short-term and long-term capital gains.",
    keywords: "capital gains tax calculator, stock tax calculator, long term capital gains tax calculator",
    sitemapPriority: "0.9",
    related: [
      { href: "/federal-income-tax-calculator/", label: "Federal income tax" },
      { href: "/401k-calculator/", label: "401(k)" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "net-worth-calculator.html": {
    metaTitle: "Net Worth Calculator — Assets Minus Debt",
    metaDescription: "Calculate personal net worth from assets and liabilities.",
    keywords: "net worth calculator, personal net worth calculator, asset liability calculator",
    sitemapPriority: "0.85",
    related: [
      { href: "/home-equity-calculator/", label: "Home equity" },
      { href: "/401k-calculator/", label: "401(k)" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "home-equity-calculator.html": {
    metaTitle: "Home Equity Calculator — LTV and Borrowing Power",
    metaDescription: "Calculate home equity, LTV, and borrowable equity at 80% LTV.",
    keywords: "home equity calculator, ltv calculator home, how much equity can i borrow",
    sitemapPriority: "0.85",
    related: [
      { href: "/loan-to-value-calculator/", label: "LTV calculator" },
      { href: "/refinance-calculator/", label: "Refinance" },
      { href: "/mortgage-calculator/", label: "Mortgage" },
    ],
  },
  "student-loan-refinance-calculator.html": {
    metaTitle: "Student Loan Refinance Calculator — Savings",
    metaDescription: "Compare student loan payments before and after refinancing.",
    keywords: "student loan refinance calculator, student loan refi calculator, refinance student loans calculator",
    sitemapPriority: "0.85",
    related: [
      { href: "/student-loan-calculator/", label: "Student loan payment" },
      { href: "/refinance-calculator/", label: "Mortgage refinance" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "rmd-calculator.html": {
    metaTitle: "RMD Calculator — Required Minimum Distribution",
    metaDescription: "Estimate IRA RMD from age and account balance using IRS divisors.",
    keywords: "rmd calculator, required minimum distribution calculator, ira rmd calculator",
    sitemapPriority: "0.85",
    related: [
      { href: "/401k-calculator/", label: "401(k)" },
      { href: "/social-security-calculator/", label: "Social Security" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "seller-net-proceeds-calculator.html": {
    metaTitle: "Seller Net Proceeds Calculator — Home Sale",
    metaDescription: "Estimate seller net cash after commission, mortgage payoff, and closing.",
    keywords: "seller net sheet calculator, home sale proceeds calculator, real estate commission calculator seller",
    sitemapPriority: "0.85",
    related: [
      { href: "/closing-cost-calculator/", label: "Buyer closing costs" },
      { href: "/commission-calculator/", label: "Commission calculator" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "eitc-calculator.html": {
    metaTitle: "EITC Calculator — Earned Income Tax Credit",
    metaDescription: "Rough earned income tax credit estimate by income and number of children.",
    keywords: "eitc calculator, earned income tax credit calculator, eic calculator 2024",
    sitemapPriority: "0.9",
    related: [
      { href: "/federal-income-tax-calculator/", label: "Federal tax" },
      { href: "/child-tax-credit-calculator/", label: "Child tax credit" },
      { href: "/paycheck-calculator/", label: "Paycheck" },
    ],
  },
  "child-tax-credit-calculator.html": {
    metaTitle: "Child Tax Credit Calculator — US CTC",
    metaDescription: "Estimate US child tax credit with phase-out by MAGI.",
    keywords: "child tax credit calculator, ctc calculator, child tax credit 2024 calculator",
    sitemapPriority: "0.85",
    related: [
      { href: "/eitc-calculator/", label: "EITC" },
      { href: "/federal-income-tax-calculator/", label: "Federal tax" },
      { href: "/finance/", label: "Finance" },
    ],
  },
  "cost-of-living-calculator.html": {
    metaTitle: "Cost of Living Calculator — Salary By City",
    metaDescription: "Compare salaries between two US cities using cost of living indexes.",
    keywords: "cost of living calculator, salary comparison by city, cost of living comparison calculator",
    sitemapPriority: "0.9",
    related: [
      { href: "/hourly-wage-calculator/", label: "Hourly wage" },
      { href: "/inflation-calculator/", label: "Inflation calculator" },
      { href: "/finance/", label: "Calculators" },
    ],
  },
};