function t(kw, h2, p) {
  return { keywords: kw, sections: [{ h2, paragraphs: [p] }], faqs: [], related: [] };
}

export const batch6PageSeo = {
  "stopwatch.html": t("stopwatch online, lap timer", "Browser stopwatch", "Time tasks and record lap splits."),
  "bytes-converter.html": t("bytes to mb converter, kb gb calculator", "File size units", "Binary 1024-based sizes common for storage."),
  "utm-builder.html": t("utm builder, campaign url generator", "Track marketing links", "Add UTM params for Google Analytics and similar tools."),
  "whatsapp-link.html": t("whatsapp link generator wa.me", "Click to chat", "Share prefilled WhatsApp messages."),
  "random-picker.html": t("random name picker, raffle generator", "Fair random choice", "Uses crypto random for picks."),
  "text-diff.html": t("text diff online, compare two texts", "Simple diff", "Line-based +/- comparison."),
  "standard-deviation.html": t("standard deviation calculator", "Sample SD", "Statistics for small datasets in the browser."),
  "median-calculator.html": t("median calculator", "Median value", "Sorts numbers and finds the middle."),
  "exchange-rate.html": t("currency converter custom rate", "Manual FX rate", "You supply the rate—no live forex feed."),
  "work-days.html": t("business days calculator", "Weekdays only", "Excludes Saturday and Sunday."),
  "running-pace.html": t("running pace calculator min per km", "Pace from time & distance", "For runners tracking km splits."),
  "vcard-generator.html": t("vcard generator vcf", "Contact cards", "Export .vcf for phone contacts."),
  "yaml-to-json.html": t("yaml to json converter", "YAML parse", "Uses js-yaml in the browser."),
  "xml-formatter.html": t("xml formatter online", "Pretty XML", "DOMParser-based indent."),
  "unicode-character.html": t("unicode code point lookup", "Character codes", "Code point and UTF-8 bytes."),
  "nato-alphabet.html": t("nato phonetic alphabet converter", "Spelling over radio", "Alpha, Bravo, Charlie…"),
};
