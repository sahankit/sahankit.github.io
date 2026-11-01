export const batch12PageSeo = {
  "osint-search.html": {
    metaTitle: "OSINT Search Hub — Free Username, Domain & Google Dork Links",
    metaDescription:
      "Free OSINT search page: build public links for username profiles, domain certs, DNS, IP info, breach checks, Google dorks, and Wayback. Runs in your browser.",
    keywords:
      "osint search, osint tools free, username search osint, google dork generator, domain osint, public records search, security research",
    sections: [
      {
        h2: "What is this OSINT search page?",
        paragraphs: [
          "OSINT (open-source intelligence) means gathering information from publicly available sources—websites, DNS, certificate transparency logs, search engines, and archives. This hub does not scrape data or bypass logins. It builds URLs you can open in a new tab to continue research on third-party services.",
          "Use it for legitimate purposes: securing your own accounts, bug-bounty scope checks, journalism, fraud investigation with authorization, and competitive research on public marketing sites.",
        ],
      },
      {
        h2: "Sections in the OSINT hub",
        paragraphs: ["Each block targets a common OSINT workflow:"],
        list: [
          "<strong>Username search</strong> — Quick links to public profile URLs on GitHub, Reddit, X, and similar sites, plus a Google query for pasted leaks (public index only).",
          "<strong>Domain OSINT</strong> — Certificate search (crt.sh), DNS, WHOIS-style pages, VirusTotal, and our <a href=\"/domain-age/\">domain age checker</a>.",
          "<strong>Email</strong> — Link to Have I Been Pwned and public search helpers (not verification of mailbox access).",
          "<strong>IP</strong> — Routing and reputation pages such as ipinfo.io and BGP tools.",
          "<strong>Google dork builder</strong> — Compose site: and filetype: style queries for authorized testing.",
          "<strong>Wayback Machine</strong> — Historical snapshots of a URL on archive.org.",
        ],
      },
      {
        h2: "Ethics and legal use",
        paragraphs: [
          "Do not use OSINT techniques to harass, stalk, or access private data without permission. Laws vary by country; when in doubt, get written authorization or stick to your own assets and public bug-bounty programs. Sahankit Tools is not responsible for how third-party sites use your queries.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does this OSINT tool search automatically?",
        a: "No. It only generates links. You click through to each external site. No queries are sent to Sahankit servers.",
      },
      {
        q: "Is OSINT legal?",
        a: "Research on publicly published information is often legal, but context matters. Unauthorized access to systems, bypassing paywalls, or misusing personal data can be illegal. Use ethical guidelines and local law.",
      },
      {
        q: "Can I find someone's private email password here?",
        a: "No. This page does not provide password cracking, breach downloads, or access to non-public databases.",
      },
      {
        q: "What is a Google dork?",
        a: "Advanced search operators (site:, filetype:, intitle:, etc.) that help find public pages indexed by Google. Use only on systems you may test.",
      },
    ],
    related: [
      { href: "/seo-lab/", label: "SEO lab hub" },
      { href: "/domain-age.html", label: "Domain age checker" },
      { href: "/extract-urls.html", label: "Extract URLs from text" },
      { href: "/extract-emails.html", label: "Extract emails from text" },
      { href: "/url-parser.html", label: "URL parser" },
      { href: "/user-agent.html", label: "User-agent string" },
    ],
  },
};
