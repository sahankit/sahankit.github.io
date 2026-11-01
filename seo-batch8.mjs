function t(kw, h2, p) {
  return { keywords: kw, sections: [{ h2, paragraphs: [p] }], faqs: [], related: [] };
}

export const batch8PageSeo = {
  "salary-to-hourly.html": t("salary to hourly calculator", "Hourly rate", "Divide annual pay by working hours per year."),
  "break-even-calculator.html": t("break even calculator units", "Break-even point", "Fixed costs divided by contribution margin per unit."),
  "sales-tax-calculator.html": t("sales tax calculator add tax", "Sales tax total", "Add percentage tax to a subtotal."),
  "download-time-calculator.html": t("download time calculator mbps", "Transfer time", "Rough estimate from Mbps and file size."),
  "string-case-converter.html": t("camelcase snake_case converter", "Developer naming", "Switch identifier styles for code."),
  "duplicate-word-finder.html": t("duplicate word finder", "Editing aid", "Spot repeated words in prose."),
  "acronym-generator.html": t("acronym generator from phrase", "Acronyms", "First-letter abbreviation."),
  "api-key-generator.html": t("api key generator random", "Random secrets", "Use crypto random; store keys safely."),
  "wifi-qr-generator.html": t("wifi qr code generator", "Join WiFi by QR", "WIFI: QR payload for phones."),
  "md5-hash.html": t("md5 hash generator online", "MD5 checksum", "Not for password storage."),
  "hmac-generator.html": t("hmac sha256 generator", "Keyed hashes", "Web Crypto HMAC-SHA256."),
  "image-resizer.html": t("resize image online max width", "Image scale", "Aspect-preserving resize in browser."),
  "date-add-days.html": t("date calculator add days", "Calendar math", "Add or subtract whole days."),
  "time-difference.html": t("time difference calculator hours", "Duration", "Same-day time span in hours and minutes."),
  "fuel-efficiency.html": t("fuel efficiency km per litre", "km/L", "From trip distance and litres used."),
  "inflation-calculator.html": t("inflation calculator purchasing power", "Inflation estimate", "Compound inflation illustration."),
};
