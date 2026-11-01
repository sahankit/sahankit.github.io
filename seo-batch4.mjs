function t(kw, h2, p) {
  return { keywords: kw, sections: [{ h2, paragraphs: [p] }], faqs: [], related: [] };
}

export const batch4PageSeo = {
  "number-base-converter.html": t("binary hex decimal converter", "Programmer bases", "Convert between common radixes for debugging and learning."),
  "days-between-dates.html": t("days between dates calculator", "Calendar math", "Inclusive difference in days between two dates."),
  "simple-interest.html": t("simple interest calculator", "Simple interest formula", "Interest = principal × rate × time."),
  "percentage-change.html": t("percentage change calculator", "Percent increase decrease", "Compare old and new values as a percentage."),
  "roman-numerals.html": t("roman numerals converter", "Roman ↔ Arabic", "Supports values 1 through 3999."),
  "slug-generator.html": t("url slug generator seo", "SEO slugs", "Lowercase hyphenated slugs from titles."),
  "strip-html.html": t("strip html tags online", "Plain text from HTML", "Quickly remove tags from snippets."),
  "extract-urls.html": t("extract urls from text", "Find links", "Lists unique http(s) URLs in pasted content."),
  "csv-to-json.html": t("csv to json converter", "Simple CSV", "First row is headers; comma-separated."),
  "json-to-csv.html": t("json to csv converter", "Export CSV", "Array of objects to CSV download-style text."),
  "pomodoro-timer.html": t("pomodoro timer online", "Focus timer", "Classic 25-minute focus and 5-minute break cycles."),
  "countdown-timer.html": t("countdown timer online", "Minute timer", "Browser countdown with done message."),
  "coin-flip.html": t("coin flip online heads tails", "Random coin", "Fair heads/tails using crypto random."),
  "barcode-generator.html": t("barcode generator code 128", "Code 128 barcode", "Render SVG barcodes from text."),
  "aspect-ratio.html": t("aspect ratio calculator", "Resize dimensions", "Keep width/height proportional."),
  "user-agent.html": t("what is my user agent", "Browser UA", "Shows navigator.userAgent on your device."),
};
