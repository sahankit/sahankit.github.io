/** Workflow clusters: contextual internal links (3–5 per tool) for topical authority. */

import { canonicalFromFile } from "./seo-build.mjs";
import { INDIA_INCOME_TAX_FY } from "./india-tax-fy.mjs";

function h(slug, label) {
  return { href: canonicalFromFile(`${slug}.html`), label };
}

const G = {
  slabs: {
    href: INDIA_INCOME_TAX_FY.slabsGuidePath,
    label: `FY ${INDIA_INCOME_TAX_FY.fyLabel} income tax slabs (reference)`,
  },
  gstRates: { href: "/guides/india-gst-rates-reference/", label: "India GST rates reference" },
  advanceTax: { href: "/guides/india-advance-tax-calendar/", label: "Advance tax instalment dates" },
  idGuide: { href: "/guides/india-id-formats/", label: "PAN, IFSC & GSTIN formats" },
};

/** @type {Record<string, Array<{ href: string, label: string }>>} */
export const WORKFLOW_CLUSTERS = {
  "income-tax-calculator.html": [
    h("hra-calculator", "HRA exemption calculator"),
    h("old-vs-new-tax-regime-calculator", "Old vs new tax regime"),
    h("salary-breakup-calculator", "Salary breakup (CTC)"),
    h("ctc-to-in-hand-calculator", "CTC to in-hand salary"),
    G.slabs,
  ],
  "salary-breakup-calculator.html": [
    h("income-tax-calculator", "Income tax (new vs old)"),
    h("hra-calculator", "HRA exemption"),
    h("epf-calculator", "EPF calculator"),
    h("gratuity-calculator", "Gratuity (15/26 formula)"),
    h("ctc-to-in-hand-calculator", "CTC to in-hand"),
  ],
  "ctc-to-in-hand-calculator.html": [
    h("salary-breakup-calculator", "Salary breakup"),
    h("income-tax-calculator", "Income tax calculator"),
    h("epf-calculator", "EPF calculator"),
    h("advance-tax-calculator", "Advance tax instalments"),
  ],
  "gratuity-calculator.html": [
    h("leave-encashment-calculator", "Leave encashment"),
    h("epf-calculator", "EPF / PF calculator"),
    h("salary-breakup-calculator", "Salary breakup"),
    h("income-tax-calculator", "Income tax"),
  ],
  "leave-encashment-calculator.html": [
    h("gratuity-calculator", "Gratuity calculator"),
    h("salary-breakup-calculator", "Salary breakup"),
    h("income-tax-calculator", "Income tax"),
  ],
  "advance-tax-calculator.html": [
    h("income-tax-calculator", "Income tax estimate"),
    G.advanceTax,
    G.slabs,
    h("tds-calculator", "TDS calculator"),
  ],
  "reverse-gst-calculator.html": [
    h("gst-inclusive-calculator", "GST inclusive split"),
    h("gst-calculator", "Add GST (exclusive)"),
    G.gstRates,
    h("india-invoice", "GST invoice template"),
  ],
  "hra-calculator.html": [
    h("income-tax-calculator", "Income tax (new vs old regime)"),
    h("salary-calculator", "Salary / in-hand estimator"),
    h("rent-receipt-generator", "Rent receipt generator"),
    G.slabs,
  ],
  "old-vs-new-tax-regime-calculator.html": [
    h("income-tax-calculator", "Full income tax calculator"),
    h("hra-calculator", "HRA calculator"),
    G.slabs,
    G.advanceTax,
  ],
  "gst-calculator.html": [
    h("gst-inclusive-calculator", "GST inclusive / exclusive"),
    h("india-invoice", "GST invoice template"),
    h("inr-words", "Amount in words (INR)"),
    G.gstRates,
  ],
  "gst-inclusive-calculator.html": [
    h("gst-calculator", "GST calculator"),
    h("india-invoice", "GST invoice template"),
    G.gstRates,
  ],
  "india-invoice.html": [
    h("gst-calculator", "GST calculator"),
    h("inr-words", "Amount in words (INR)"),
    h("gstin-validator", "GSTIN format checker"),
    G.gstRates,
  ],
  "salary-calculator.html": [
    h("income-tax-calculator", "Income tax calculator"),
    h("epf-calculator", "EPF calculator"),
    h("hra-calculator", "HRA calculator"),
    h("emi-calculator", "EMI calculator"),
  ],
  "emi-calculator.html": [
    h("home-loan-calculator", "Home loan EMI"),
    h("personal-loan-calculator", "Personal loan EMI"),
    h("sip-calculator", "SIP calculator"),
    h("fd-calculator", "FD calculator"),
  ],
  "home-loan-calculator.html": [
    h("emi-calculator", "EMI calculator"),
    h("home-loan-prepayment-calculator", "Home loan prepayment"),
    h("income-tax-calculator", "Income tax (section 24 interest)"),
    h("sip-calculator", "SIP calculator"),
  ],
  "sip-calculator.html": [
    h("step-up-sip-calculator", "Step-up SIP"),
    h("xirr-calculator", "XIRR calculator"),
    h("fd-calculator", "FD calculator"),
    h("compound-interest", "Compound interest"),
  ],
  "fd-calculator.html": [
    h("rd-calculator", "RD calculator"),
    h("sip-calculator", "SIP calculator"),
    h("compound-interest", "Compound interest"),
    h("ppf-calculator", "PPF calculator"),
  ],
  "pan-format.html": [
    h("ifsc-format", "IFSC format checker"),
    h("gstin-validator", "GSTIN validator"),
    h("pincode-format", "Pincode format checker"),
    G.idGuide,
  ],
  "ifsc-format.html": [
    h("pan-format", "PAN format checker"),
    h("upi-id-format", "UPI ID format checker"),
    G.idGuide,
  ],
  "gstin-validator.html": [
    h("gst-calculator", "GST calculator"),
    h("india-invoice", "GST invoice template"),
    G.gstRates,
    G.idGuide,
  ],
  "image-compress.html": [
    h("reduce-image-size-in-kb", "Compress photo to 20KB / 50KB"),
    h("image-cropper", "Crop image"),
    h("passport-size-photo", "Passport size photo maker"),
    h("compress-pdf", "Compress PDF"),
  ],
  "reduce-image-size-in-kb.html": [
    h("passport-size-photo", "Passport size photo"),
    h("signature-maker", "Signature maker"),
    h("image-cropper", "Crop image"),
    h("image-compress", "JPEG quality compressor"),
  ],
  "passport-size-photo.html": [
    h("reduce-image-size-in-kb", "Reduce image size in KB"),
    h("signature-maker", "Signature maker"),
    h("image-cropper", "Crop image"),
  ],
  "signature-maker.html": [
    h("reduce-image-size-in-kb", "Compress signature to 10–20 KB"),
    h("passport-size-photo", "Passport photo maker"),
    h("pdf-merge", "Merge PDF"),
  ],
  "pdf-merge.html": [
    h("split-pdf", "Split PDF by page range"),
    h("compress-pdf", "Compress PDF size"),
    h("pdf-to-word", "PDF to Word"),
    h("pdf-to-jpg", "PDF to JPG"),
  ],
  "split-pdf.html": [
    h("pdf-merge", "Merge PDF"),
    h("compress-pdf", "Compress PDF"),
    h("pdf-rotate", "Rotate PDF pages"),
    h("pdf-to-jpg", "PDF to JPG"),
  ],
  "compress-pdf.html": [
    h("split-pdf", "Split PDF"),
    h("pdf-merge", "Merge PDF"),
    h("reduce-image-size-in-kb", "Reduce image size in KB"),
    h("pdf-to-jpg", "PDF to JPG"),
  ],
  "pdf-to-jpg.html": [
    h("jpg-to-pdf", "JPG to PDF"),
    h("compress-pdf", "Compress PDF"),
    h("image-compress", "Compress image"),
  ],
  "word-counter.html": [
    h("character-counter", "Character counter"),
    h("reading-time", "Reading time"),
    h("case-converter", "Case converter"),
    h("ai-meta-description-generator", "AI meta description"),
  ],
  "json-formatter.html": [
    h("jwt-decoder", "JWT decoder"),
    h("base64-encoder", "Base64 encoder"),
    h("hash-generator", "SHA-256 hash"),
    h("uuid-generator", "UUID generator"),
  ],
  "hash-generator.html": [
    h("hmac-generator", "HMAC generator"),
    h("password-generator", "Password generator"),
    h("jwt-decoder", "JWT decoder"),
  ],
  "password-generator.html": [
    h("hash-generator", "Hash generator"),
    h("uuid-generator", "UUID generator"),
    h("password-strength", "Password strength checker"),
  ],
};

/**
 * @param {string} file - tool file e.g. image-compress.html
 * @param {string} [selfCanonical] - e.g. /image-compress/
 */
export function workflowRelatedFor(file, selfCanonical) {
  const cluster = WORKFLOW_CLUSTERS[file];
  if (!cluster?.length) return { links: [], workflow: false };
  const self = selfCanonical || canonicalFromFile(file);
  const links = cluster.filter((r) => r.href !== self).slice(0, 5);
  return { links, workflow: links.length > 0 };
}