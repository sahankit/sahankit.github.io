/** Inline SVG icons (Lucide-style strokes) for categories and hubs. */

const PATHS = {
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  calculator:
    '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
  rupee: '<path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.67 0 6.67-10 0-10"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  palette:
    '<path d="M12 22a10 10 0 1 1 10-10c0 2.5-2 3.5-4 3.5h-2a2 2 0 0 0-1.5 3.3A2 2 0 0 1 12 22Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="11.5" cy="7" r="1"/><circle cx="16" cy="9.5" r="1"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="M19 3v4M17 5h4"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  news: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9h4"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8Z"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
};

/** Category id → icon + colour tone (see .tone-* in site.css). */
export const CATEGORY_ICON = {
  writing: ["pen", "violet"],
  calculators: ["calculator", "blue"],
  india: ["rupee", "orange"],
  productivity: ["clock", "green"],
  design: ["palette", "pink"],
  documents: ["file", "red"],
  seo: ["trend", "teal"],
  developer: ["code", "slate"],
  chat: ["chat", "indigo"],
};

export const HUB_ICON = {
  finance: ["rupee", "orange"],
  dev: ["code", "slate"],
  "seo-lab": ["trend", "teal"],
  osint: ["search", "slate"],
  "ai-writing": ["sparkles", "violet"],
  student: ["cap", "blue"],
  brief: ["news", "red"],
  quiz: ["help", "green"],
  india: ["rupee", "orange"],
  design: ["palette", "pink"],
  security: ["shield", "slate"],
  writing: ["pen", "violet"],
  productivity: ["clock", "green"],
  chat: ["chat", "indigo"],
};

export function iconSvg(name) {
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name] || PATHS.calculator}</svg>`;
}

/** Coloured icon tile for a [icon, tone] pair. */
export function iconTile(pair, extraClass = "") {
  const [name, tone] = pair || ["calculator", "violet"];
  return `<span class="icon-tile tone-${tone}${extraClass ? ` ${extraClass}` : ""}">${iconSvg(name)}</span>`;
}

export function categoryTile(category, extraClass) {
  return iconTile(CATEGORY_ICON[category], extraClass);
}

export function hubTile(slug, extraClass) {
  return iconTile(HUB_ICON[slug] || ["book", "violet"], extraClass);
}

/** Standard tool card used on home, hubs and related sections. */
export function toolCardHtml({ href, title, desc, category, kind = "" }, headingTag = "h3") {
  return `<a class="card tool-card" href="${href}">${categoryTile(category)}<span class="card-body">${kind ? `<span class="card-kind">${kind}</span>` : ""}<${headingTag} class="card-title">${title}</${headingTag}>${desc ? `<p>${desc}</p>` : ""}</span></a>`;
}

export function hubCardHtml({ slug, title, desc }, headingTag = "h3") {
  return `<a class="card tool-card hub-card" href="/${slug}/">${hubTile(slug)}<span class="card-body"><${headingTag} class="card-title">${title}</${headingTag}>${desc ? `<p>${desc}</p>` : ""}</span></a>`;
}
