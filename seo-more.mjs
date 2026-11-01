function t(kw, h2, p, faqs = [], related = []) {
  return { keywords: kw, sections: [{ h2, paragraphs: [p] }], faqs, related };
}

export const morePageSeo = {
  "random-number.html": t("random number generator, random int online", "Secure random", "Uses crypto.getRandomValues in the browser."),
  "discount-calculator.html": t("discount calculator, sale price percent off", "Shopping math", "Find final price after a percentage discount."),
  "profit-margin.html": t("profit margin calculator, markup calculator", "Margin vs markup", "Margin is profit divided by selling price; markup is profit divided by cost."),
  "unit-converter.html": t("unit converter km miles kg lb celsius fahrenheit", "Common conversions", "Quick conversions for travel and recipes."),
  "sort-lines.html": t("sort lines alphabetically online", "Sort lists", "Paste one item per line and sort A–Z or Z–A."),
  "dedupe-lines.html": t("remove duplicate lines online", "Clean lists", "Keeps the first occurrence of each line."),
  "reverse-text.html": t("reverse text online, backwards text", "Reverse strings", "Flip characters or reverse word order."),
  "word-frequency.html": t("word frequency counter, word count analysis", "Find repeated words", "Useful for editing and SEO keyword stuffing checks."),
  "markdown-preview.html": t("markdown preview online, markdown to html", "Preview Markdown", "Renders with marked.js in the browser—does not save files."),
  "jwt-decoder.html": t("JWT decoder online, read JWT payload", "Inspect JWTs", "Decodes header and payload only; never verifies signatures."),
  "meta-tag-generator.html": t("meta tag generator, SEO title description", "On-page meta HTML", "Copy generated tags into your page head."),
  "robots-txt-generator.html": t("robots.txt generator, sitemap line", "Crawler rules", "Starter robots.txt—adjust for your site structure."),
  "dice-roller.html": t("dice roller online, d20 roller", "Roll dice", "Tabletop games and random picks."),
  "roi-calculator.html": t("ROI calculator, return on investment", "ROI percent", "Simple (gain − cost) / cost formula."),
};
