import assert from "assert";
import { QUIZ_BANK } from "./quiz-bank.mjs";
import { hourSlotKey, pickQuestions, seedFromHourSlot } from "./quiz-hourly.mjs";

const d1 = new Date(2026, 10, 1, 14, 30, 0);
const d2 = new Date(2026, 10, 1, 14, 59, 0);
const d3 = new Date(2026, 10, 1, 15, 0, 0);

assert.strictEqual(hourSlotKey(d1), hourSlotKey(d2));
assert.notStrictEqual(hourSlotKey(d1), hourSlotKey(d3));

const setA = pickQuestions(QUIZ_BANK, d1, 10);
const setB = pickQuestions(QUIZ_BANK, d2, 10);
const setC = pickQuestions(QUIZ_BANK, d3, 10);

assert.strictEqual(setA.length, 10);
assert.deepStrictEqual(setA.map((q) => q.q), setB.map((q) => q.q));
assert.notDeepStrictEqual(setA.map((q) => q.q), setC.map((q) => q.q));

const keys = new Set();
for (let h = 0; h < 48; h++) {
  const d = new Date(2026, 0, 5, h, 0, 0);
  keys.add(pickQuestions(QUIZ_BANK, d, 10).map((q) => q.q).join("|"));
}
assert.ok(keys.size >= 20, "expected varied hourly sets over 48 hours");

assert.ok(seedFromHourSlot("2026-01-01T00") !== seedFromHourSlot("2026-01-01T01"));

console.log("quiz-hourly: hourly selection checks passed");
