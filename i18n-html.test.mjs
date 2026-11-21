import assert from "assert";
import { localizeHtml, rewriteHrefs, extractTextStrings } from "./i18n-html.mjs";

const dict = new Map([
  ["GST calculator", "GST कैलकुलेटर"],
  ["Calculate", "गणना करें"],
  ["Search tools", "टूल खोजें"],
]);

const html = `<a href="/gst-calculator/">GST calculator</a>
<button>Calculate</button>
<script>const x="/gst-calculator/";</script>
<input placeholder="Search tools" />
<link href="/assets/site.css" />`;

const out = localizeHtml(html, "hi", dict);
assert.match(out, /href="\/hi\/gst-calculator\/"/);
assert.match(out, />GST कैलकुलेटर</);
assert.match(out, />गणना करें</);
assert.match(out, /placeholder="टूल खोजें"/);
assert.match(out, /<script>const x="\/gst-calculator\/";<\/script>/);
assert.match(out, /href="\/assets\/site.css"/);
assert.deepEqual(extractTextStrings(html).sort(), ["Calculate", "GST calculator", "Search tools"].sort());
assert.equal(rewriteHrefs(`<a href="/finance/">x</a>`, "zh"), `<a href="/zh/finance/">x</a>`);
assert.equal(rewriteHrefs(`<a href="/word-counter.html">x</a>`, "zh"), `<a href="/zh/word-counter/">x</a>`);

console.log("i18n-html tests passed");
