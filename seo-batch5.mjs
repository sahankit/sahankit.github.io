function t(kw, h2, p) {
  return { keywords: kw, sections: [{ h2, paragraphs: [p] }], faqs: [], related: [] };
}

export const batch5PageSeo = {
  "morse-code.html": t("morse code translator online", "Morse code", "Encode messages for learning and hobby radio."),
  "text-to-binary.html": t("text to binary converter", "Binary encoding", "UTF-8 bytes as 8-bit groups."),
  "hex-encoder.html": t("text to hex converter", "Hex encoding", "View UTF-8 bytes in hexadecimal."),
  "regex-tester.html": {
    ...t("regex tester online", "Test regular expressions", "See matches and indexes in sample text."),
    related: [{ href: "/regex-builder/", label: "Regex builder" }],
  },
  "password-strength.html": t("password strength checker", "Password hygiene", "Local checklist—not a crack tool."),
  "luhn-checker.html": t("luhn algorithm credit card check", "Luhn checksum", "Format check only; not issuer validation."),
  "split-bill.html": t("split bill calculator tip", "Split with tip", "Divide total including tip by headcount."),
  "electricity-bill.html": t("electricity bill calculator units", "Bill estimate", "Simple units × rate plus fixed charge."),
  "average-calculator.html": t("average calculator mean", "Mean average", "Paste a list of numbers."),
  "gcd-lcm-calculator.html": t("gcd lcm calculator", "GCD and LCM", "Euclidean algorithm for two integers."),
  "factorial-calculator.html": t("factorial calculator n factorial", "Factorial", "Uses BigInt for large results."),
  "prime-checker.html": t("prime number checker", "Primality test", "Trial division for moderate integers."),
  "normalize-spaces.html": t("normalize whitespace text", "Clean text", "Trim and collapse spaces per line."),
  "line-numbers.html": t("add line numbers to text", "Line numbers", "Prefix lines for code or lists."),
  "extract-emails.html": t("extract emails from text", "Find emails", "Regex extraction; handle data responsibly."),
  "rgb-hex-converter.html": t("rgb to hex converter", "Color codes", "Convert RGB channels to #RRGGBB."),
};
