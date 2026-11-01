function toolSeo(keywords, h2, p, faqs, related) {
  return { keywords, sections: [{ h2, paragraphs: [p] }], faqs: faqs || [], related: related || [] };
}

export const batch14PageSeo = {
  "pdf-to-word.html": {
    metaTitle: "PDF to Word — Free PDF to DOCX Converter Online",
    metaDescription:
      "Convert PDF to editable Word (.docx) in your browser. Text extraction with pdf.js—private, no account, no server upload.",
    keywords: "pdf to word, pdf to docx online, convert pdf to word free, pdf to doc browser",
    sections: [
      {
        h2: "PDF to DOCX in the browser",
        paragraphs: [
          "This tool extracts selectable text from each PDF page and packs it into a .docx file you can open in Microsoft Word, Google Docs, or LibreOffice.",
          "Scanned PDFs (image-only pages) have no text layer—use an OCR tool first, then convert again.",
        ],
      },
    ],
    faqs: [
      { q: "Is my PDF uploaded?", a: "No. Conversion runs entirely in your browser tab." },
      { q: "Will formatting match the PDF?", a: "Mostly plain text and page breaks. Columns, fonts, and images from the PDF are not recreated." },
    ],
    related: [
      { href: "/word-to-pdf/", label: "Word to PDF" },
      { href: "/pdf-merge/", label: "Merge PDF" },
    ],
  },
  "word-to-pdf.html": {
    metaTitle: "Word to PDF — Free DOCX to PDF Converter Online",
    metaDescription:
      "Convert Word .docx to PDF in your browser. Private DOCX to PDF—no signup, files stay on your device.",
    keywords: "word to pdf, docx to pdf online, convert word to pdf free, doc to pdf browser",
    sections: [
      {
        h2: "DOCX to PDF locally",
        paragraphs: [
          "Upload a .docx file. We convert it to HTML with mammoth, then render a PDF with html2pdf.js—all on your device.",
          "Legacy .doc files are not supported; open them in Word and Save As .docx first.",
        ],
      },
    ],
    faqs: [
      { q: "Does this support .doc?", a: "Only .docx (Office Open XML). Save older .doc files as .docx before converting." },
      { q: "Are images kept?", a: "Embedded images in DOCX are usually preserved; very complex layouts may shift slightly in the PDF." },
    ],
    related: [
      { href: "/pdf-to-word/", label: "PDF to Word" },
      { href: "/pdf-merge/", label: "Merge PDF" },
    ],
  },
  "image-converter.html": {
    metaTitle: "Image Converter — PNG to JPG, WebP, AVIF Online",
    metaDescription:
      "Free image format converter in your browser. PNG, JPEG, WebP, and AVIF—no upload, no account.",
    keywords: "image converter online, png to jpg, jpg to png, webp converter, avif convert free",
    sections: [
      {
        h2: "Convert image formats privately",
        paragraphs: [
          "Draw your image to a canvas and export the MIME type you need. JPEG conversion flattens transparency onto a white background.",
          "WebP and AVIF depend on browser support—if an option is disabled, use PNG or JPEG instead.",
        ],
      },
    ],
    faqs: [
      { q: "Are files uploaded?", a: "No. Conversion happens locally in your browser." },
      { q: "Can I convert SVG?", a: "Use raster sources (PNG, JPG, WebP, GIF). SVG may work in some browsers but is not guaranteed." },
    ],
    related: [
      { href: "/image-compress/", label: "Image compressor" },
      { href: "/image-resizer/", label: "Image resizer" },
    ],
  },
};
