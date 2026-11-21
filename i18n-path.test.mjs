import assert from "assert";
import {
  DEFAULT_LOCALE,
  localeHomePath,
  localePath,
  localeHref,
  localeFile,
  stripLocalePrefix,
  hreflangHeadTags,
  sitemapHreflangXml,
  HREFLANG_LOCALES,
  LOCALES,
} from "./i18n.mjs";

assert.equal(localeHomePath("en"), "/");
assert.equal(localeHomePath("hi"), "/hi/");

assert.equal(stripLocalePrefix("/hi/gst-calculator/"), "/gst-calculator/");
assert.equal(stripLocalePrefix("/gst-calculator/"), "/gst-calculator/");
assert.equal(stripLocalePrefix("/hi/"), "/");
assert.equal(stripLocalePrefix("/hi"), "/");
assert.equal(stripLocalePrefix("/zh/finance/#hubs"), "/finance/#hubs");

assert.equal(localePath("en", "/gst-calculator/"), "/gst-calculator/");
assert.equal(localePath("hi", "/gst-calculator/"), "/hi/gst-calculator/");
assert.equal(localePath("hi", "/"), "/hi/");
assert.equal(localePath("hi", "/hi/gst-calculator/"), "/hi/gst-calculator/");
assert.equal(localePath("zh", "/hi/gst-calculator/"), "/zh/gst-calculator/");
assert.equal(localePath("hi", "/finance/#x"), "/hi/finance/#x");
assert.equal(localePath(DEFAULT_LOCALE, "/hi/"), "/");

assert.equal(localeFile("en", "/gst-calculator/"), "gst-calculator/index.html");
assert.equal(localeFile("hi", "/gst-calculator/"), "hi/gst-calculator/index.html");
assert.equal(localeFile("hi", "/"), "hi/index.html");
assert.equal(localeFile("en", "/"), "index.html");

assert.equal(localeHref("hi", "/assets/site.css"), "/assets/site.css");
assert.equal(localeHref("hi", "/sitemap.xml"), "/sitemap.xml");
assert.equal(localeHref("hi", "/y-chat/"), "/y-chat/");
assert.equal(localeHref("hi", "#find-tool"), "#find-tool");
assert.equal(localeHref("hi", "/gst-calculator/"), "/hi/gst-calculator/");
assert.equal(localeHref("en", "/gst-calculator/"), "/gst-calculator/");
assert.equal(localeHref("zh", "/word-counter.html"), "/zh/word-counter/");
assert.equal(localeHref("hi", "/gst-calculator.html?x=1"), "/hi/gst-calculator/?x=1");

const tags = hreflangHeadTags("https://thetoolhq.com", "/gst-calculator/");
assert.match(tags, /hreflang="hi" href="https:\/\/thetoolhq.com\/hi\/gst-calculator\/"/);
assert.match(tags, /hreflang="en" href="https:\/\/thetoolhq.com\/gst-calculator\/"/);
assert.match(tags, /hreflang="x-default" href="https:\/\/thetoolhq.com\/gst-calculator\/"/);
assert.doesNotMatch(tags, /hreflang="tr"/);

const alt = sitemapHreflangXml("https://thetoolhq.com", "/hi/gst-calculator/");
assert.match(alt, /hreflang="hi"/);
assert.match(alt, /hreflang="x-default"/);
assert.equal(HREFLANG_LOCALES.length, LOCALES.length - 2);

console.log("i18n-path tests passed");
