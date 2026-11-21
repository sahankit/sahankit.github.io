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

const switcher = localizeHtml(
  `<div class="lang-switcher"><select><option>English</option><option>Français</option></select></div><p>GST calculator</p>`,
  "hi",
  new Map([
    ["GST calculator", "GST कैलकुलेटर"],
    ["English", "अंग्रेजी"],
    ["Français", "फ़्रांसीसी"],
  ]),
);
assert.match(switcher, /<option>English<\/option>/);
assert.match(switcher, />GST कैलकुलेटर</);

const code = localizeHtml(`<pre>.btn { color: red; }</pre><p>Calculate</p>`, "hi", dict);
assert.match(code, /<pre>\.btn \{ color: red; \}<\/pre>/);
assert.match(code, />गणना करें</);

const andOnly = localizeHtml(`<p>and</p>`, "hi", new Map([["and", "और"]]));
assert.match(andOnly, />and</);

console.log("i18n-html tests passed");
