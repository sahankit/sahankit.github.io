/**
 * Site UX: tool search on the home page (loads assets/tools-search.json).
 */
(function () {
  const finder = document.getElementById("tool-finder");
  if (!finder) return;

  const input = finder.querySelector('input[type="search"]');
  const results = finder.querySelector("[data-results]");
  const empty = finder.querySelector("[data-empty]");
  if (!input || !results) return;

  let index = [];
  let ready = false;

  function normalize(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function render(list) {
    results.innerHTML = "";
    if (!list.length) {
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    const frag = document.createDocumentFragment();
    for (const item of list.slice(0, 24)) {
      const a = document.createElement("a");
      a.className = "search-hit";
      a.href = item.href;
      a.innerHTML =
        "<strong>" +
        item.name +
        "</strong><span>" +
        (item.cat ? item.cat + " · " : "") +
        item.desc +
        "</span>";
      frag.appendChild(a);
    }
    results.appendChild(frag);
  }

  function filter(q) {
    const n = normalize(q);
    if (!n) {
      render([]);
      if (empty) {
        empty.textContent = "Type to search tools by name or topic.";
        empty.hidden = false;
      }
      return;
    }
    const hits = index.filter((item) => {
      const blob = normalize(item.name + " " + item.desc + " " + item.cat);
      return blob.includes(n);
    });
    if (!hits.length && empty) {
      empty.textContent = "No match—try GST, PDF, word, hash, or tax.";
      empty.hidden = false;
    }
    render(hits);
  }

  function openFinder() {
    setTimeout(() => {
      input.focus({ preventScroll: false });
      finder.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  const params = new URLSearchParams(location.search);
  const qParam = params.get("q");
  if (qParam) input.value = qParam;

  fetch("/assets/tools-search.json")
    .then((r) => r.json())
    .then((data) => {
      index = data;
      ready = true;
      if (input.value) filter(input.value);
      if (qParam || location.hash === "#find-tool" || params.get("find") === "1") openFinder();
    })
    .catch(() => {
      if (empty) {
        empty.textContent = "Search index failed to load. Browse categories below.";
        empty.hidden = false;
      }
      if (qParam || location.hash === "#find-tool" || params.get("find") === "1") openFinder();
    });

  input.addEventListener("input", () => {
    if (!ready) return;
    filter(input.value);
  });

  input.addEventListener("focus", () => {
    if (ready && input.value) filter(input.value);
  });
})();
