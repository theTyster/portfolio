// Run: pnpm test  (node --experimental-strip-types --test)
// Checks the portfolio's ports against the originals they copy:
//   allocate()      vs stratify/docs/index.html render()
//   scopeAdjusted() vs artemis/src/scoring.ts scopeAdjustedPassRate()
import { test } from "node:test";
import assert from "node:assert/strict";
import { allocate, scopeAdjusted, orbitPosition, NICE_WEIGHTS } from "../site/src/landing-page/my-work/logic.ts";

// Verbatim arithmetic from stratify/docs/index.html (render()).
function stratifyReference(nice: number, n: number, usedPct: number) {
  const W = NICE_WEIGHTS;
  const CEIL = 90000, MIN_SPRINT = 500, MIN_SLEEP = 60, MAX_SLEEP = 3600, RUNWAY = 18000;
  const mine = W[nice + 20], total = mine + (n - 1) * 1000;
  const used = usedPct * 1000;
  const budget = Math.max(0, CEIL - used);
  const grant = Math.floor(budget * mine / total);
  const others = Math.floor(budget * (n - 1) * 1000 / total);
  const sprints = Math.max(1, Math.floor(grant / MIN_SPRINT));
  const per = Math.floor(grant / sprints);
  const sleep = grant === 0 ? MAX_SLEEP : Math.max(MIN_SLEEP, Math.min(MAX_SLEEP, Math.floor(RUNWAY / sprints)));
  return { grant, others, sprints: grant === 0 ? 0 : sprints, per, sleep };
}

test("allocator matches the Stratify microsite on every input", () => {
  for (let nice = -20; nice <= 19; nice++)
    for (let n = 1; n <= 20; n++)
      for (let used = 0; used <= 100; used += 5) {
        const a = allocate(nice, n, used);
        const r = stratifyReference(nice, n, used);
        assert.deepEqual(
          { grant: a.grant, others: a.others, sprints: a.sprints, per: a.perSprint, sleep: a.sleepSeconds },
          r,
        );
        assert.ok(a.grant + a.others <= 90000, "grants stay under the 90% ceiling");
        assert.ok(a.sleepSeconds >= 60 && a.sleepSeconds <= 3600);
      }
});

test("default allocator reading matches the canvas", () => {
  const a = allocate(0, 14, 37);
  assert.equal((a.grant / 1000).toFixed(1), "3.8");
  assert.equal(a.sprints, 7);
});

test("scope-adjusted pass rate matches artemis/src/scoring.ts", () => {
  // excessRatio = 600/900, scopeDeficit = 2/5, weight 0.25
  const r = scopeAdjusted(0.8, 3, 900);
  assert.ok(Math.abs(r.penalty - (2 / 5) * (600 / 900) * 0.25) < 1e-12);
  assert.ok(Math.abs(r.adjusted - (0.8 - r.penalty)) < 1e-12);
  assert.equal(scopeAdjusted(0.8, 5, 3000).penalty, 0);
  assert.equal(scopeAdjusted(0.8, 0, 300).penalty, 0);
  assert.equal(scopeAdjusted(0.01, 0, 3000).adjusted, 0);
});

test("the selected planet sits at the front of the orbit", () => {
  for (let sel = 0; sel < 4; sel++) {
    const rot = (sel * 2 * Math.PI) / 4;
    const front = orbitPosition(sel, 4, rot);
    assert.ok(Math.abs(front.depth - 1) < 1e-9);
  }
});
