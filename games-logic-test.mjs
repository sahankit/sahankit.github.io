#!/usr/bin/env node
/** Quick logic tests for browser game rules (no DOM). */

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winner(b) {
  for (const L of lines) {
    const [a, c, d] = L;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return b.includes("") ? null : "draw";
}

function cpuTurn(cells) {
  const b = cells.slice();
  const empty = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
  for (const i of empty) {
    b[i] = "O";
    if (winner(b) === "O") {
      cells[i] = "O";
      return true;
    }
    b[i] = "";
  }
  for (const i of empty) {
    b[i] = "X";
    if (winner(b) === "X") {
      cells[i] = "O";
      return true;
    }
    b[i] = "";
  }
  if (empty.includes(4)) {
    cells[4] = "O";
    return true;
  }
  const pick = empty[Math.floor(Math.random() * empty.length)];
  if (pick === undefined) return false;
  cells[pick] = "O";
  return true;
}

let fail = 0;
const cells = ["", "", "", "", "", "", "", "", ""];
if (!cpuTurn(cells)) {
  console.error("tic-tac-toe: CPU did not place on empty board");
  fail++;
}
if (!cells.some((v) => v === "O")) {
  console.error("tic-tac-toe: no O after CPU turn");
  fail++;
}

let snake = [
  [5, 10],
  [4, 10],
  [3, 10],
];
const dir = [1, 0];
const head = [snake[0][0] + dir[0], snake[0][1] + dir[1]];
const badSelfHit = snake.some((s) => s[0] === head[0] && s[1] === head[1]);
if (badSelfHit) {
  console.error("snake: old code would false-positive self collision after unshift");
  fail++;
}
const goodCheck = !snake.some((s) => s[0] === head[0] && s[1] === head[1]);
if (!goodCheck) fail++;

if (fail) process.exit(1);
console.log("games-logic-test: OK");