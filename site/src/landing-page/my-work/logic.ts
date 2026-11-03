// Pure logic behind the interactive project views. Kept free of React so it
// can be unit-tested against the originals.

// --- Stratify allocator -----------------------------------------------------
// Same tables and guards as stratify/lean/Stratify/Allocate.lean and Types.lean,
// as ported in stratify/docs/index.html.
export const NICE_WEIGHTS = [
  4000, 3732, 3482, 3249, 3031, 2828, 2639, 2462, 2297, 2144, 2000, 1866, 1741, 1625, 1516, 1414, 1320, 1231, 1149, 1072,
  1000, 933, 871, 812, 758, 707, 660, 616, 574, 536, 500, 467, 435, 406, 379, 354, 330, 308, 287, 268,
];
const CEIL = 90000;
const MIN_SPRINT = 500;
const MIN_SLEEP = 60;
const MAX_SLEEP = 3600;
const RUNWAY = 18000;

export type Allocation = {
  /** All amounts are thousandths of a percent of the window (100000 = 100%). */
  used: number;
  grant: number;
  others: number;
  reserve: number;
  sprints: number;
  perSprint: number;
  sleepSeconds: number;
};

export function allocate(nice: number, sessions: number, usedPct: number): Allocation {
  const mine = NICE_WEIGHTS[nice + 20];
  const total = mine + (sessions - 1) * 1000;
  const used = usedPct * 1000;
  const budget = Math.max(0, CEIL - used);
  const grant = Math.floor((budget * mine) / total);
  const others = Math.floor((budget * (sessions - 1) * 1000) / total);
  const sprints = Math.max(1, Math.floor(grant / MIN_SPRINT));
  const perSprint = Math.floor(grant / sprints);
  const sleepSeconds =
    grant === 0 ? MAX_SLEEP : Math.max(MIN_SLEEP, Math.min(MAX_SLEEP, Math.floor(RUNWAY / sprints)));
  const usedClamped = Math.min(used, 100000);
  return {
    used: usedClamped,
    grant,
    others,
    reserve: Math.max(0, 100000 - usedClamped - grant - others),
    sprints: grant === 0 ? 0 : sprints,
    perSprint,
    sleepSeconds,
  };
}

/** Sprint tick marks on the 5-hour timeline, as percentages. */
export function sprintTicks(a: Allocation): { left: number; width: number }[] {
  if (a.grant === 0) return [];
  const w = Math.max(0.4, (a.perSprint / MIN_SPRINT) * 0.6);
  return Array.from({ length: a.sprints }, (_, i) => ({
    left: ((i * RUNWAY) / a.sprints / RUNWAY) * 100,
    width: Math.min(w, 100 / a.sprints - 0.3),
  }));
}

export const pct = (m: number) => (m / 1000).toFixed(1) + "%";

export function duration(s: number): string {
  if (s >= 3600) return s / 3600 === 1 ? "1 hour" : `${s / 3600} hours`;
  if (s >= 60) return `${Math.round(s / 60)} minutes`;
  return `${s} seconds`;
}

// --- Artemis scope-adjusted pass rate --------------------------------------
// Same formula as artemis/src/scoring.ts (scopeAdjustedPassRate).
export function scopeAdjusted(
  passRate: number,
  scopeAdherence: number,
  diffLines: number,
  baselineLines = 300,
  penaltyWeight = 0.25,
): { penalty: number; adjusted: number } {
  const excessRatio = Math.max(0, diffLines - baselineLines) / Math.max(diffLines, 1);
  const scopeDeficit = (5 - scopeAdherence) / 5;
  const penalty = scopeDeficit * excessRatio * penaltyWeight;
  return { penalty, adjusted: Math.max(0, passRate - penalty) };
}

// --- Orbit tab positions ----------------------------------------------------
export type OrbitPos = { x: number; y: number; depth: number };

/** Position of body i (of n) on a tilted ellipse, rotated by `rot` radians. */
export function orbitPosition(
  i: number,
  n: number,
  rot: number,
  { cx = 220, cy = 160, rx = 165, ry = 88, tiltDeg = -10 } = {},
): OrbitPos {
  const step = (2 * Math.PI) / n;
  const th = Math.PI / 2 - i * step + rot;
  const x = rx * Math.cos(th);
  const y = ry * Math.sin(th);
  const phi = (tiltDeg * Math.PI) / 180;
  return {
    x: cx + x * Math.cos(phi) - y * Math.sin(phi),
    y: cy + x * Math.sin(phi) + y * Math.cos(phi),
    depth: Math.sin(th),
  };
}
