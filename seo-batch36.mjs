/** SEO metadata for batch 36 tools. */

export const batch36PageSeo = {
  "percentile-calculator.html": {
    metaTitle: "Percentile Calculator — Exam Percentile from Your Rank",
    metaDescription:
      "Calculate percentile as 100 times the candidates who scored equal to or below you, divided by everyone who took the test. This is not a percentage of marks.",
    keywords: "percentile calculator, percentile rank calculator, how to calculate percentile, exam percentile, marks percentile calculator",
    sitemapPriority: "0.8",
    sections: [
      {
        h2: "Percentile is not a percentage of marks",
        paragraphs: [
          "If 80,000 of 100,000 candidates scored equal to or below you, the percentile is 80. Scoring 80 out of 100 marks is a percentage, and it can be a very different percentile when the paper is hard or easy.",
          "Result portals often use this same ratio. Round the way your exam authority does. Some show two decimals, some show more.",
        ],
      },
    ],
    faqs: [
      { q: "What is the 100th percentile?", a: "Everyone else scored equal to or below you, so the count of candidates at or below your score equals the total." },
      { q: "Can I enter marks instead of a count of people?", a: "No. Percentile needs how many people sat the test and how many were at or below your score." },
    ],
    related: [
      { href: "/cgpa-calculator/", label: "CGPA to percentage" },
      { href: "/percentage-calculator/", label: "Percentage calculator" },
      { href: "/student/", label: "Student toolkit" },
    ],
  },
  "nsc-calculator.html": {
    metaTitle: "NSC Calculator — National Savings Certificate Maturity",
    metaDescription:
      "Estimate NSC maturity at the October–December 2026 rate of 7.7% a year, compounded annually for 5 years. Change the rate if you bought in another quarter.",
    keywords: "nsc calculator, nsc maturity calculator, national savings certificate calculator, nsc interest calculator, nsc 7.7",
    sitemapPriority: "0.8",
    sections: [
      {
        h2: "How the maturity amount is built",
        paragraphs: [
          "Interest is added once a year and itself earns interest in later years. It is not paid out until maturity. At 7.7% for 5 years, ₹10,000 grows to about ₹14,490. The Finance Ministry notifies the rate each quarter. A certificate keeps the rate of the quarter in which you buy it, for the full five years.",
        ],
      },
    ],
    faqs: [
      { q: "Is NSC interest tax-free?", a: "No. Interest is taxable. The deposit, and interest treated as reinvested in the first four years, can count toward the old-regime deduction limit. This page does not compute tax." },
      { q: "What is the minimum?", a: "NSC VIII Issue is issued in multiples from ₹1,000. This calculator does not enforce the post-office minimum." },
    ],
    related: [
      { href: "/scss-calculator/", label: "SCSS calculator" },
      { href: "/ppf-calculator/", label: "PPF calculator" },
      { href: "/fd-calculator/", label: "FD calculator" },
    ],
  },
  "scss-calculator.html": {
    metaTitle: "SCSS Calculator — Senior Citizen Savings Scheme",
    metaDescription:
      "Calculate quarterly SCSS interest. The October–December 2026 rate is 8.2% a year, paid every quarter and not compounded. Principal comes back at the end of the term.",
    keywords: "scss calculator, senior citizen savings scheme calculator, scss interest calculator, senior citizen scheme 8.2",
    sitemapPriority: "0.8",
    sections: [
      {
        h2: "Why the quarterly amount does not grow",
        paragraphs: [
          "SCSS pays the interest out. It is not left in the account to compound. A ₹1,00,000 deposit at 8.2% pays ₹2,050 each quarter. Over 5 years that is ₹41,000 of interest, and the ₹1,00,000 comes back at maturity.",
          "8.2% is the rate notified for 1 October to 31 December 2026. The rate on a new deposit is the rate of the quarter you open it. The scheme is for people aged 60 and above, with exceptions for some earlier retirees. There is a maximum deposit.",
        ],
      },
    ],
    faqs: [
      { q: "Is the interest taxed?", a: "SCSS interest is taxable. Banks and post offices may deduct TDS above the threshold. This page shows the interest before tax." },
      { q: "Can I extend it?", a: "The basic term is 5 years, and the rules allow an extension. Use 8 in the years field only as a sketch of a longer payout, and check the current extension rule." },
    ],
    related: [
      { href: "/nsc-calculator/", label: "NSC calculator" },
      { href: "/fd-calculator/", label: "FD calculator" },
      { href: "/india/", label: "India utilities" },
    ],
  },
  "home-loan-eligibility-calculator.html": {
    metaTitle: "Home Loan Eligibility Calculator — Income to Loan Amount",
    metaDescription:
      "Estimate how much home loan a lender may offer from net monthly income, existing EMIs, rate and tenure. Default assumption: all EMIs stay within 50% of income.",
    keywords: "home loan eligibility calculator, housing loan eligibility, how much home loan can I get, loan eligibility on salary, home loan amount calculator",
    sitemapPriority: "0.8",
    sections: [
      {
        h2: "The income share used here",
        paragraphs: [
          "The calculator takes the share of net income you allow for all EMIs, subtracts EMIs you already pay, and treats what is left as the EMI of the new loan. It then converts that EMI into a loan amount at the rate and years you enter.",
          "A bank can use 40%, 50% or another cap, and it will reduce the figure for a low credit score, a short remaining working life, or a property it values below the price. Treat the result as a ceiling to discuss, not an offer.",
        ],
      },
    ],
    faqs: [
      { q: "Should I enter gross salary or take-home pay?", a: "Use take-home pay, the amount credited after tax and provident fund. Lenders start from income they can document." },
      { q: "Does this include the down payment?", a: "No. The figure is the loan. The property price is the loan plus the amount you pay yourself." },
    ],
    related: [
      { href: "/home-loan-calculator/", label: "Home loan EMI" },
      { href: "/emi-calculator/", label: "EMI calculator" },
      { href: "/home-loan-prepayment-calculator/", label: "Home loan prepayment" },
    ],
  },
  "brokerage-calculator.html": {
    metaTitle: "Brokerage Calculator — Profit After Brokerage and STT",
    metaDescription:
      "Estimate stock-trade profit from buy price, sell price and quantity, after a flat brokerage on each order and STT. Defaults are ₹20 an order and 0.1% STT.",
    keywords: "brokerage calculator, stock brokerage calculator, share profit calculator, stt calculator, delivery brokerage calculator, intraday charges calculator",
    sitemapPriority: "0.8",
    sections: [
      {
        h2: "What is subtracted",
        paragraphs: [
          "Gross profit is the sell value minus the buy value. The calculator then subtracts brokerage twice, once for the buy order and once for the sell order, and STT on both the buy value and the sell value at the percent you enter.",
          "A real contract note also has exchange transaction charges, GST on brokerage, stamp duty and a SEBI fee. Those differ by exchange and by state. Set brokerage to 0 if your plan does not charge it, and set STT to the rate in force on the day you trade.",
        ],
      },
    ],
    faqs: [
      { q: "Why is the default brokerage ₹20?", a: "Several discount brokers cap a charged order at ₹20. Delivery plans are often ₹0. Type the number from your broker’s pricing page." },
      { q: "Is 0.1% the right STT?", a: "0.1% on both sides is the usual equity-delivery figure people still use. Intraday STT is charged differently, often only on the sell side. Change the field to match the segment." },
    ],
    related: [
      { href: "/stcg-tax-calculator/", label: "STCG tax calculator" },
      { href: "/cagr-calculator/", label: "CAGR calculator" },
      { href: "/india/", label: "India utilities" },
    ],
  },
  "budget-50-30-20.html": {
    metaTitle: "50/30/20 Budget Calculator — Needs, Wants, Savings",
    metaDescription:
      "Split monthly take-home pay into needs, wants and savings. The starting split is 50%, 30% and 20%. The three shares must add up to 100.",
    keywords: "50 30 20 budget calculator, 50/30/20 rule calculator, budget calculator, needs wants savings calculator",
    sitemapPriority: "0.8",
    sections: [
      {
        h2: "What goes in each bucket",
        paragraphs: [
          "Needs are the bills you pay to keep the household going: rent, groceries, utilities, insurance and the commute. Wants are the spending you could cut: eating out, subscriptions, shopping. Savings is the money that leaves the spending account: an emergency fund, EPF top-up, mutual funds.",
          "In a high-rent city, needs can be more than half of take-home pay. Change the three percentages. They have to add up to 100 so the rupee amounts still equal your pay.",
        ],
      },
    ],
    faqs: [
      { q: "Do I use gross salary?", a: "Use take-home pay. Tax and provident fund are already gone, so they are not part of this split." },
    ],
    related: [
      { href: "/sip-calculator/", label: "SIP calculator" },
      { href: "/finance/", label: "Finance tools" },
    ],
  },
  "border-radius-generator.html": {
    metaTitle: "CSS Border Radius Generator — Copy border-radius",
    metaDescription:
      "Generate a CSS border-radius for four corners or one shared value. Preview the rounded box and copy the declaration.",
    keywords: "border radius generator, css border radius, border-radius generator, rounded corners css, border radius px",
    sitemapPriority: "0.7",
    sections: [
      {
        h2: "The four-value order",
        paragraphs: [
          "When the corners differ, CSS reads the four lengths clockwise from the top left: top left, top right, bottom right, bottom left. A single length applies to every corner. The copied line is ready to paste into a style rule.",
        ],
      },
    ],
    faqs: [
      { q: "Can I use percent instead of pixels?", a: "This generator writes pixels. A percentage radius is relative to the box size, which changes as the element grows." },
    ],
    related: [
      { href: "/box-shadow-generator/", label: "Box shadow generator" },
      { href: "/gradient-generator/", label: "Gradient generator" },
      { href: "/design/", label: "Design tools" },
    ],
  },
  "yes-or-no.html": {
    metaTitle: "Yes or No — Random Yes or No Answer",
    metaDescription:
      "Press once for a random yes or no. Each answer is a fresh 50/50 result from your browser. It does not give advice.",
    keywords: "yes or no, yes or no generator, random yes or no, ask yes or no, yes no decision",
    sitemapPriority: "0.8",
    sections: [
      {
        h2: "What the button does",
        paragraphs: [
          "Each click takes one random bit. Yes and no each have an even chance, and the previous answer does not affect the next one. Use it as a coin flip when you do not mind either result.",
        ],
      },
    ],
    faqs: [
      { q: "Is it fair?", a: "Yes. It uses the browser’s cryptographic random numbers, and the answer is whichever side that bit lands on." },
    ],
    related: [
      { href: "/coin-flip/", label: "Coin flip" },
      { href: "/spin-the-wheel/", label: "Spin the wheel" },
    ],
  },
  "username-generator.html": {
    metaTitle: "Username Generator — Ideas from Your Name",
    metaDescription:
      "Make username ideas from a name, with dots, underscores and numbers. The list is generated in your browser and is not checked for availability.",
    keywords: "username generator, username ideas, cool username generator, name to username, instagram username generator",
    sitemapPriority: "0.8",
    sections: [
      {
        h2: "How the ideas are made",
        paragraphs: [
          "The name is lowercased and split into words. The suggestions join those words, separate them with a dot or an underscore, and add a short number or the current year. Letters and digits are kept. Other characters are dropped.",
          "Instagram, Gmail, games and banks each have their own length rules and taken names. This page does not look any of them up.",
        ],
      },
    ],
    faqs: [
      { q: "Will this username be free?", a: "Unknown. Copy one you like and try it on the site where you want to use it." },
    ],
    related: [
      { href: "/fancy-text-generator/", label: "Fancy text generator" },
      { href: "/password-generator/", label: "Password generator" },
    ],
  },
};
