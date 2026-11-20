/** SEO metadata for batch 35 tools. */

export const batch35PageSeo = {
  "box-shadow-generator.html": {
    metaTitle: "CSS Box Shadow Generator — Copy the Declaration",
    metaDescription:
      "Make a CSS box-shadow with horizontal and vertical offset, blur, spread, colour, opacity and inset. Preview it and copy the box-shadow line.",
    keywords: "box shadow generator, css box shadow, box-shadow css, css shadow generator, inset box shadow",
    sitemapPriority: "0.7",
    sections: [
      {
        h2: "What each number does",
        paragraphs: [
          "Horizontal and vertical offsets move the shadow. Blur softens the edge. Spread grows or shrinks it before the blur. Opacity is the alpha of the colour. Inset paints the shadow inside the box instead of behind it.",
        ],
      },
    ],
    faqs: [
      { q: "Can I use a hex colour in the CSS?", a: "The copied line uses rgba so the opacity slider is included. The colour picker starts from a hex value and converts it." },
    ],
    related: [
      { href: "/gradient-generator/", label: "Gradient generator" },
      { href: "/color-picker/", label: "Color picker" },
      { href: "/design/", label: "Design tools" },
    ],
  },
  "leap-year-checker.html": {
    metaTitle: "Leap Year Checker — 366 or 365 Days",
    metaDescription:
      "Check if a year is a leap year. Divisible by 4, but century years must also be divisible by 400. 2000 was a leap year. 1900 was not.",
    keywords: "leap year checker, is it a leap year, leap year calculator, 366 days, leap year rules",
    sitemapPriority: "0.7",
    sections: [
      {
        h2: "The rule",
        paragraphs: [
          "A year is a leap year when it divides by 4. If it also divides by 100, it is not a leap year, unless it divides by 400. 2024 and 2028 are leap years. 2100 is not.",
        ],
      },
    ],
    faqs: [
      { q: "Was 2000 a leap year?", a: "Yes. 2000 divides by 400, so the century exception does not apply." },
    ],
    related: [
      { href: "/age-calculator/", label: "Age calculator" },
      { href: "/days-between-dates/", label: "Days between dates" },
    ],
  },
  "age-difference-calculator.html": {
    metaTitle: "Age Difference Calculator — Years, Months and Days",
    metaDescription:
      "Calculate the age gap between two dates in years, months and days, and the total number of days. Both dates are included in the span.",
    keywords: "age difference calculator, age gap calculator, difference between two ages, years months days between dates",
    sitemapPriority: "0.7",
    sections: [
      {
        h2: "How months and days are counted",
        paragraphs: [
          "Whole years come first, then whole months, then the remaining days. If the day of the later date is earlier in the month, a month is borrowed. The total days is the straight count from the earlier date to the later one.",
        ],
      },
    ],
    faqs: [
      { q: "Does the order of the dates matter?", a: "No. The earlier date is treated as the start, so the gap is never negative." },
    ],
    related: [
      { href: "/age-calculator/", label: "Age calculator" },
      { href: "/business-days-calculator/", label: "Business days" },
    ],
  },
  "notice-period-calculator.html": {
    metaTitle: "Notice Period Calculator — Last Working Day in India",
    metaDescription:
      "Find a last working day from a resignation date and a notice period in calendar days. Day one is the resignation date. Confirm the count in your appointment letter.",
    keywords: "notice period calculator, last working day calculator, resignation date calculator, 30 day notice period, 60 day notice period, 90 day notice period",
    sitemapPriority: "0.8",
    sections: [
      {
        h2: "How the last day is counted",
        paragraphs: [
          "A 30-day notice that starts on 1 March ends on 30 March, because the resignation date is day 1. Weekends are included. If your company starts the notice the next working day, add one day to the result.",
          "Garden leave, public holidays and a buyout are in the contract, not in this count.",
        ],
      },
    ],
    faqs: [
      { q: "Is Saturday counted?", a: "Yes. This is calendar days. Use the business-days calculator if you only want weekdays, and only if the letter says weekdays." },
    ],
    related: [
      { href: "/business-days-calculator/", label: "Business days calculator" },
      { href: "/leave-encashment-calculator/", label: "Leave encashment" },
      { href: "/india/", label: "India utilities" },
    ],
  },
  "business-days-calculator.html": {
    metaTitle: "Business Days Calculator — Count Weekdays Between Dates",
    metaDescription:
      "Count Monday to Friday days between two dates, including both ends. Saturdays and Sundays are left out. Add public holidays yourself.",
    keywords: "business days calculator, working days calculator, weekdays between two dates, number of working days",
    sitemapPriority: "0.7",
    sections: [
      {
        h2: "What is included",
        paragraphs: [
          "Every Monday, Tuesday, Wednesday, Thursday and Friday from the start date through the end date is counted. A range that is only a Saturday and Sunday is zero weekdays. National and state holidays still fall on weekdays, so subtract those if your count should exclude them.",
        ],
      },
    ],
    faqs: [
      { q: "Does it know Indian holidays?", a: "No. Holiday lists change by state and employer. Subtract those dates from the weekday total." },
    ],
    related: [
      { href: "/notice-period-calculator/", label: "Notice period calculator" },
      { href: "/days-between-dates/", label: "Days between dates" },
    ],
  },
  "data-usage-calculator.html": {
    metaTitle: "Data Usage Calculator — GB Left Per Day",
    metaDescription:
      "Work out how much mobile data you can use per day for the rest of a plan, and whether your current pace will last until the cycle ends.",
    keywords: "data usage calculator, data calculator, how much data per day, mobile data calculator, gb per day calculator",
    sitemapPriority: "0.7",
    sections: [
      {
        h2: "The daily allowance",
        paragraphs: [
          "Remaining data is the plan size minus what you have used. Divide that by the days still left in the cycle, including today if you have not finished it. If used data divided by days already passed is higher than that allowance, the plan runs out early.",
        ],
      },
    ],
    faqs: [
      { q: "Are MB and GB mixed?", a: "Enter every amount in GB. 500 MB is 0.5 GB. 1 GB is 1024 MB only if your operator uses that definition; many plans now use 1000 MB." },
    ],
    related: [
      { href: "/internet-speed-test/", label: "Internet speed test" },
      { href: "/mbps-to-mbs/", label: "Mbps to MB/s" },
    ],
  },
  "dpi-calculator.html": {
    metaTitle: "DPI Calculator — Pixels and Inches for Print",
    metaDescription:
      "Calculate DPI from a pixel width and a print width in inches, or calculate the pixel width from inches and DPI. 300 DPI is a usual print target.",
    keywords: "dpi calculator, ppi calculator, pixels to dpi, print resolution calculator, 300 dpi pixels",
    sitemapPriority: "0.7",
    sections: [
      {
        h2: "DPI from a photo",
        paragraphs: [
          "DPI is pixels divided by inches. A 1200-pixel-wide image printed 4 inches wide is 300 DPI. The same image printed 10 inches wide is 120 DPI and will look soft up close. The calculator also shows the width in millimetres.",
        ],
      },
    ],
    faqs: [
      { q: "Is DPI the same as PPI?", a: "For this sum, yes. PPI is pixels per inch on a screen or file. DPI is the matching print term. The number is pixels ÷ inches either way." },
    ],
    related: [
      { href: "/passport-size-photo/", label: "Passport size photo" },
      { href: "/aspect-ratio/", label: "Aspect ratio" },
      { href: "/design/", label: "Design tools" },
    ],
  },
  "team-generator.html": {
    metaTitle: "Random Team Generator — Split Names into Groups",
    metaDescription:
      "Paste a list of names and split them into random teams. The shuffle uses your browser’s random generator. Names are not uploaded.",
    keywords: "random team generator, random group generator, team picker, split into teams, random name groups",
    sitemapPriority: "0.7",
    sections: [
      {
        h2: "How teams are filled",
        paragraphs: [
          "Names are shuffled, then dealt one by one across the teams, like cards. If the list does not divide evenly, some teams have one extra person. Running it again makes a new shuffle.",
        ],
      },
    ],
    faqs: [
      { q: "Can two teams end up the same?", a: "Only by chance. Each click shuffles again." },
    ],
    related: [
      { href: "/spin-the-wheel/", label: "Spin the wheel" },
      { href: "/random-number/", label: "Random number" },
    ],
  },
  "meta-length-checker.html": {
    metaTitle: "Meta Length Checker — Title and Description Characters",
    metaDescription:
      "Count characters in a page title and meta description. See if they sit in the range Google usually displays: about 50–60 for titles and 120–160 for descriptions.",
    keywords: "meta description length checker, title tag length checker, meta length, seo title length, character count meta description",
    sitemapPriority: "0.7",
    sections: [
      {
        h2: "What the ranges mean",
        paragraphs: [
          "Search results cut long titles and descriptions. A title around 50–60 characters and a description around 120–160 characters usually fits. Google rewrites both when it wants to, so a perfect count does not guarantee the text you wrote is the text that is shown.",
        ],
      },
    ],
    faqs: [
      { q: "Do spaces count?", a: "Yes. The count is every character, including spaces." },
    ],
    related: [
      { href: "/serp-snippet-preview/", label: "SERP snippet preview" },
      { href: "/word-counter/", label: "Word counter" },
      { href: "/seo-lab/", label: "SEO lab" },
    ],
  },
};
