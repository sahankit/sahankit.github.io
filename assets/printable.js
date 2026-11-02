"use strict";

/** Helpers for printable templates (rent receipt, invoice, payslip). */
(function () {
  function escapeHtml(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Inclusive YYYY-MM range; defaults to single current month if empty. */
  function monthRange(from, to) {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const cur = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
    let f = String(from || to || cur).trim();
    let t = String(to || from || f).trim();
    if (f > t) {
      const swap = f;
      f = t;
      t = swap;
    }
    const out = [];
    let y = parseInt(f.slice(0, 4), 10);
    let m = parseInt(f.slice(5, 7), 10);
    const ye = parseInt(t.slice(0, 4), 10);
    const me = parseInt(t.slice(5, 7), 10);
    while (y < ye || (y === ye && m <= me)) {
      out.push(`${y}-${pad(m)}`);
      m += 1;
      if (m > 12) {
        m = 1;
        y += 1;
      }
      if (out.length > 36) break;
    }
    return out;
  }

  function formatMonth(ym) {
    const [ys, ms] = String(ym).split("-");
    const d = new Date(Number(ys), Number(ms) - 1, 1);
    return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  }

  function printPage() {
    window.print();
  }

  window.Printable = { escapeHtml, monthRange, formatMonth, printPage };
})();
