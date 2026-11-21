/** Landing SEO for exact KB/dimension upload intents (exam & govt portals). */

export const IMAGE_KB_PRESETS = [
  {
    file: "compress-photo-to-20kb.html",
    path: "/compress-photo-to-20kb/",
    kb: 20,
    metaTitle: "Compress Photo to 20 KB Online — Passport & Exam Upload",
    metaDescription:
      "Free browser tool to compress a photo to 20 KB or less for SSC, UPSC, NEET and job portal uploads. No server upload—optional exact pixel size.",
    keywords:
      "compress photo to 20kb, reduce image size 20 kb, passport photo 20kb, ssc photo 20 kb, compress jpg to 20kb online",
    h1: "Compress photo to 20 KB",
    lead: "Hit a 20 KB (or smaller) limit for government and exam form photo uploads—processed on your device only.",
  },
  {
    file: "compress-photo-to-50kb.html",
    path: "/compress-photo-to-50kb/",
    kb: 50,
    metaTitle: "Compress Photo to 50 KB Online — Form & ID Upload",
    metaDescription:
      "Shrink a JPG or PNG to 50 KB or less for online forms. Free, private compression in the browser with optional width × height limits.",
    keywords:
      "compress photo to 50kb, reduce image 50 kb, photo compressor 50kb online, resize image under 50kb",
    h1: "Compress photo to 50 KB",
    lead: "Common 50 KB cap for admission, recruitment and ID uploads—open the compressor with 50 KB pre-selected.",
  },
  {
    file: "compress-signature-10-20kb.html",
    path: "/compress-signature-10-20kb/",
    kb: 20,
    metaTitle: "Compress Signature to 10–20 KB — Exam & Portal Upload",
    metaDescription:
      "Reduce a scanned signature image to about 10 KB or 20 KB for online exam and application portals. Runs locally in your browser.",
    keywords:
      "signature resize 10kb to 20kb, compress signature 20kb, reduce signature image size kb, exam signature upload",
    h1: "Compress signature to 10–20 KB",
    lead: "Crop tight around ink, then compress to 10 KB or 20 KB—typical limits for signature uploads on Indian exam sites.",
  },
  {
    file: "compress-pdf-under-200kb.html",
    path: "/compress-pdf-under-200kb/",
    kb: null,
    toolHref: "/compress-pdf/",
    metaTitle: "Compress PDF Under 200 KB Online — Free & Private",
    metaDescription:
      "Reduce PDF file size below 200 KB for email attachments and government uploads. Merge, remove metadata, and re-save in your browser.",
    keywords:
      "compress pdf under 200kb, reduce pdf size 200 kb, pdf compressor 200kb online, small pdf for upload",
    h1: "Compress PDF under 200 KB",
    lead: "When a portal caps PDFs at 200 KB, open the PDF compressor and export a smaller file—nothing uploaded to our servers.",
  },
];

const commonExamFaqs = (kb) =>
  kb
    ? [
        {
          q: `How do I compress a photo to exactly ${kb} KB?`,
          a: `Open the reduce-image tool with a ${kb} KB target. It adjusts JPEG quality until the file is at or under ${kb} KB. Crop empty background first if quality drops too low.`,
        },
        {
          q: "Will my photo leave my device?",
          a: "No. Compression uses canvas in your browser. The image is not sent to ToolHQ servers.",
        },
        {
          q: "What if the portal also requires pixel dimensions?",
          a: "On the compressor, expand “Optional: exact size in pixels” and set width × height (e.g. 200×230) before reducing KB.",
        },
      ]
    : [
        {
          q: "How do I get a PDF under 200 KB?",
          a: "Open the PDF compressor, upload your file, and use a lower quality preset. Remove unused pages or merge only needed pages first if still too large.",
        },
        {
          q: "Is this the same as a government PDF validator?",
          a: "No. This only changes file size locally. Always check the official portal’s rules for DPI, fonts, and signatures.",
        },
      ];

export const kbPresetPageSeo = Object.fromEntries(
  IMAGE_KB_PRESETS.map((p) => [
    p.file,
    {
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      keywords: p.keywords,
      sitemapPriority: "0.85",
      sitemapChangefreq: "monthly",
      directAnswer: p.lead,
      sections: [
        {
          h2: "Typical upload limits (India portals)",
          list: [
            "<strong>Photo:</strong> often 20 KB, 50 KB, or 100 KB with fixed width × height",
            "<strong>Signature:</strong> often 10–20 KB, sometimes 1 KB minimum dimension",
            "<strong>PDF:</strong> 100–500 KB for certificates; 200 KB is a common email-style cap",
          ],
        },
        {
          h2: "Quick preset sizes",
          list: [
            '<a href="/compress-photo-to-20kb/">Compress photo to 20 KB</a>',
            '<a href="/compress-photo-to-50kb/">Compress photo to 50 KB</a>',
            '<a href="/reduce-image-size-in-kb/">Reduce image size in KB</a> (any target)',
            '<a href="/compress-pdf-under-200kb/">Compress PDF under 200 KB</a>',
            '<a href="/passport-size-photo/">Passport size photo maker</a>',
            '<a href="/signature-maker/">Signature maker</a>',
          ],
        },
      ],
      faqs: commonExamFaqs(p.kb),
      related: [
        { href: "/reduce-image-size-in-kb/", label: "Reduce image size in KB" },
        { href: "/passport-size-photo/", label: "Passport size photo" },
        { href: "/signature-maker/", label: "Signature maker" },
        { href: "/compress-pdf/", label: "Compress PDF" },
        { href: "/image-compress/", label: "JPEG quality compressor" },
      ],
    },
  ]),
);