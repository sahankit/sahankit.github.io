/** SEO metadata for batch 43 — EU & UK calculators. */

const euHub = [
  { href: "/eu/", label: "Europe calculators hub" },
  { href: "/vat-calculator/", label: "VAT calculator" },
  { href: "/finance/", label: "Finance hub" },
];

const ukFinance = [
  { href: "/uk-mortgage-calculator/", label: "UK mortgage" },
  { href: "/uk-take-home-pay-calculator/", label: "Take home pay" },
  { href: "/eu/", label: "Europe hub" },
];

export const batch43PageSeo = {
  "vat-calculator.html": {
    metaTitle: "VAT Calculator — Add VAT to Net Price (EU)",
    metaDescription: "Free VAT calculator: add VAT to net amount. Works for 19%, 20%, 21%, 23% and custom EU VAT rates.",
    keywords: "vat calculator, add vat calculator, vat calculator eu, net to gross vat",
    sitemapPriority: "0.9",
    related: [
      { href: "/reverse-vat-calculator/", label: "Reverse VAT" },
      { href: "/eu-vat-calculator/", label: "VAT by country" },
      ...euHub.slice(0, 2),
    ],
  },
  "reverse-vat-calculator.html": {
    metaTitle: "Reverse VAT Calculator — Gross to Net",
    metaDescription: "Remove VAT from a gross price. EU reverse charge calculator for invoices and receipts.",
    keywords: "reverse vat calculator, remove vat from gross price, vat inclusive calculator",
    sitemapPriority: "0.9",
    related: [
      { href: "/vat-calculator/", label: "Add VAT" },
      { href: "/eu-vat-calculator/", label: "EU VAT rates" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "eu-vat-calculator.html": {
    metaTitle: "EU VAT Calculator — VAT Rates by Country",
    metaDescription:
      "Calculate VAT with standard rates for Germany, France, Spain, Italy, Netherlands, Ireland, Poland, and more EU countries.",
    keywords: "eu vat calculator, vat rates europe, german vat calculator, french vat rate calculator",
    sitemapPriority: "0.92",
    related: euHub,
  },
  "uk-mortgage-calculator.html": {
    metaTitle: "UK Mortgage Calculator — Monthly Repayment GBP",
    metaDescription: "Free UK mortgage repayment calculator in pounds. Loan amount, interest rate, and term.",
    keywords: "uk mortgage calculator, mortgage calculator uk, monthly mortgage payment uk",
    sitemapPriority: "0.92",
    related: ukFinance,
  },
  "uk-stamp-duty-calculator.html": {
    metaTitle: "UK Stamp Duty Calculator — SDLT 2024",
    metaDescription:
      "Estimate Stamp Duty Land Tax on UK home purchases. First-time buyer relief and additional property surcharge.",
    keywords: "stamp duty calculator uk, sdlt calculator, stamp duty land tax calculator",
    sitemapPriority: "0.92",
    related: [
      { href: "/uk-mortgage-calculator/", label: "UK mortgage" },
      { href: "/mortgage-calculator/", label: "US mortgage" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "uk-income-tax-calculator.html": {
    metaTitle: "UK Income Tax Calculator — 2024/25",
    metaDescription: "Estimate UK income tax on annual salary. England, Wales, and Northern Ireland bands.",
    keywords: "uk income tax calculator, income tax calculator uk, salary tax calculator uk",
    sitemapPriority: "0.9",
    related: ukFinance,
  },
  "uk-national-insurance-calculator.html": {
    metaTitle: "UK National Insurance Calculator — Employee NI",
    metaDescription: "Estimate UK employee Class 1 National Insurance on annual earnings.",
    keywords: "national insurance calculator uk, ni calculator uk, class 1 ni calculator",
    sitemapPriority: "0.88",
    related: ukFinance,
  },
  "uk-take-home-pay-calculator.html": {
    metaTitle: "UK Take Home Pay Calculator — Net Salary",
    metaDescription: "Calculate monthly take-home pay after UK income tax and National Insurance.",
    keywords: "take home pay calculator uk, net salary calculator uk, salary after tax uk",
    sitemapPriority: "0.92",
    related: ukFinance,
  },
  "euro-to-pound-calculator.html": {
    metaTitle: "Euro to Pound Calculator — EUR to GBP",
    metaDescription: "Convert euros to British pounds with your exchange rate.",
    keywords: "euro to pound calculator, eur to gbp, euro pound converter",
    sitemapPriority: "0.88",
    related: [
      { href: "/pound-to-euro-calculator/", label: "Pound to euro" },
      { href: "/euro-to-usd-calculator/", label: "Euro to dollar" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "euro-to-usd-calculator.html": {
    metaTitle: "Euro to Dollar Calculator — EUR to USD",
    metaDescription: "Convert euros to US dollars at your exchange rate.",
    keywords: "euro to dollar calculator, eur to usd calculator, euro dollar converter",
    sitemapPriority: "0.85",
    related: [
      { href: "/euro-to-pound-calculator/", label: "Euro to pound" },
      { href: "/pound-to-euro-calculator/", label: "Pound to euro" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "pound-to-euro-calculator.html": {
    metaTitle: "Pound to Euro Calculator — GBP to EUR",
    metaDescription: "Convert British pounds to euros.",
    keywords: "pound to euro calculator, gbp to eur, pounds to euros calculator",
    sitemapPriority: "0.88",
    related: [
      { href: "/euro-to-pound-calculator/", label: "Euro to pound" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "mph-to-kph-converter.html": {
    metaTitle: "MPH to KPH Converter — Miles to km/h",
    metaDescription: "Convert speed from miles per hour to kilometres per hour instantly.",
    keywords: "mph to kph, mph to kmh, miles per hour to km per hour",
    sitemapPriority: "0.85",
    related: [
      { href: "/kph-to-mph-converter/", label: "KPH to MPH" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "kph-to-mph-converter.html": {
    metaTitle: "KPH to MPH Converter — km/h to mph",
    metaDescription: "Convert kilometres per hour to miles per hour.",
    keywords: "kph to mph, kmh to mph converter, speed converter",
    sitemapPriority: "0.85",
    related: [
      { href: "/mph-to-kph-converter/", label: "MPH to KPH" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "l-per-100km-calculator.html": {
    metaTitle: "L/100km Calculator — Fuel Consumption",
    metaDescription: "Calculate fuel consumption in litres per 100 km from distance and fuel used.",
    keywords: "l per 100km calculator, fuel consumption calculator europe, litres per 100km",
    sitemapPriority: "0.88",
    related: [
      { href: "/eu-fuel-cost-calculator/", label: "EU fuel trip cost" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "eu-fuel-cost-calculator.html": {
    metaTitle: "EU Fuel Cost Calculator — Trip Cost in Euros",
    metaDescription: "Estimate road trip fuel cost from km, L/100km, and diesel or petrol price per litre.",
    keywords: "fuel cost calculator europe, trip fuel cost calculator, diesel cost calculator eu",
    sitemapPriority: "0.88",
    related: [
      { href: "/l-per-100km-calculator/", label: "L/100km" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "france-income-tax-calculator.html": {
    metaTitle: "France Income Tax Calculator — Impôt sur le Revenu",
    metaDescription: "Simplified French income tax estimate from net taxable income and household parts.",
    keywords: "france income tax calculator, impot sur le revenu simulateur, french tax calculator",
    sitemapPriority: "0.9",
    related: [
      { href: "/germany-income-tax-calculator/", label: "Germany tax" },
      { href: "/vat-calculator/", label: "VAT (France 20%)" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "germany-income-tax-calculator.html": {
    metaTitle: "Germany Income Tax Calculator — Einkommensteuer",
    metaDescription: "Rough German income tax and solidarity surcharge estimate on gross salary.",
    keywords: "germany income tax calculator, einkommensteuer rechner, german tax calculator",
    sitemapPriority: "0.9",
    related: [
      { href: "/france-income-tax-calculator/", label: "France tax" },
      { href: "/eu-vat-calculator/", label: "EU VAT (Germany 19%)" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "spain-income-tax-calculator.html": {
    metaTitle: "Spain Income Tax Calculator — IRPF Estimate",
    metaDescription: "Estimate Spanish state income tax (IRPF) on annual taxable income.",
    keywords: "spain income tax calculator, irpf calculator, spanish tax calculator",
    sitemapPriority: "0.88",
    related: [
      { href: "/france-income-tax-calculator/", label: "France tax" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "ireland-income-tax-calculator.html": {
    metaTitle: "Ireland Income Tax Calculator — PAYE & USC",
    metaDescription: "Estimate Irish income tax, USC, and PRSI on gross pay.",
    keywords: "ireland income tax calculator, paye calculator ireland, usc calculator",
    sitemapPriority: "0.88",
    related: [
      { href: "/uk-income-tax-calculator/", label: "UK income tax" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
  "netherlands-mortgage-calculator.html": {
    metaTitle: "Netherlands Mortgage Calculator — Hypotheek Monthly Payment",
    metaDescription: "Estimate Dutch mortgage monthly payment in euros.",
    keywords: "netherlands mortgage calculator, hypotheek berekenen, dutch mortgage calculator",
    sitemapPriority: "0.88",
    related: [
      { href: "/uk-mortgage-calculator/", label: "UK mortgage" },
      { href: "/mortgage-calculator/", label: "US mortgage" },
      { href: "/eu/", label: "Europe hub" },
    ],
  },
};