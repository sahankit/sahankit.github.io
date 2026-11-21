#!/usr/bin/env node
import { readFileSync } from "fs";

const html = readFileSync(new URL("./chess-game/index.html", import.meta.url), "utf8");
const inner = html.match(/<script>\n\(function\(\)\{([\s\S]*?)\}\)\(\);\n<\/script>/)[1];
const engine = inner
  .split("\n")
  .filter((l) => !l.includes("document.") && !l.includes("hintEl") && !l.includes("boardEl") && !l.includes("statusEl") && !l.includes("modeEl"))
  .join("\n")
  .replace(/function statusLine[\s\S]*?function pickCpuMove/, "function pickCpuMove");

function countMoves() {
  return new Function(
    `${engine}
    const b0 = START.map((row) => row.slice());
    return legalMoves(b0, true, null, { K: true, Q: true, k: true, q: true }).length;`,
  )();
}

const n = countMoves();
if (n !== 20) {
  console.error("expected 20 opening moves for white, got", n);
  process.exit(1);
}
console.log("chess-logic-test: OK (", n, "opening moves)");