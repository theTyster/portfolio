"use client";

import { useState, type ReactNode } from "react";
import {
  NICE_WEIGHTS,
  allocate,
  duration,
  pct,
  scopeAdjusted,
  sprintTicks,
} from "./logic";

// The "show, don't tell" views inside each featured project. Text inside the
// diagrams is plain; prose mentions of other projects go in the captions,
// which are linked.

export function Caption({ children }: { children: ReactNode }) {
  return <p className="cap">{children}</p>;
}

export function CodeWindow({
  title,
  lang,
  children,
}: {
  title: string;
  lang: string;
  children: ReactNode;
}) {
  return (
    <div className="codewin">
      <div className="codebar">
        <span>{title}</span>
        <span>{lang}</span>
      </div>
      <pre>{children}</pre>
    </div>
  );
}

// --- Sagittarius ------------------------------------------------------------

const LEVELS = [
  { name: "Answer", note: "Most requests stop here.", h: 44, c: "var(--accent)" },
  { name: "Knowledge base", note: "Claims and open questions, in Prolog.", h: 88, c: "color-mix(in srgb, var(--accent) 60%, var(--amber))" },
  { name: "More questions", note: "Until the spec reads one way.", h: 132, c: "color-mix(in srgb, var(--accent) 30%, var(--amber))" },
  { name: "Lean proof", note: "For claims that must always hold.", h: 176, c: "var(--amber)" },
];

export function GradientBars() {
  return (
    <div className="levels">
      <svg className="levels-arrow" aria-hidden="true" viewBox="0 0 400 30" preserveAspectRatio="none" fill="none">
        <path d="M4 22 L392 6" stroke="var(--amber)" strokeWidth="1.6" strokeDasharray="4 5" />
        <path d="M384 3 L394 6 L386 12" stroke="var(--amber)" strokeWidth="1.6" />
      </svg>
      {LEVELS.map((l) => (
        <div className="lvl" key={l.name}>
          <div className="col" style={{ height: l.h, background: l.c }} />
          <b>{l.name}</b>
          <span>{l.note}</span>
        </div>
      ))}
    </div>
  );
}

const TICKET_EVENTS = [
  { x: 250, y: 180, c: "var(--accent)", what: "4+ questions", then: "shift up" },
  { x: 370, y: 120, c: "var(--accent)", what: "new question", then: "another round" },
  { x: 490, y: 120, c: "var(--good)", what: "answers settle", then: "lean back" },
  { x: 610, y: 90, c: "var(--accent)", what: "must always hold", then: "prove it" },
  { x: 730, y: 120, c: "var(--good)", what: "proved", then: "done" },
];

export function TicketChart() {
  const tick = [214, 154, 154, 34, 214];
  return (
    <div className="chart-scroll">
    <svg
      className="chart"
      viewBox="0 0 800 290"
      fill="none"
      role="img"
      aria-label="How rigour rises and falls over one ticket. More than three questions: shift up to a knowledge base. A new question: another round. The answers settle it: lean back. A claim must always hold: prove it in Lean. Proved: back to a plain answer, done."
    >
      <g stroke="var(--line)" strokeWidth="1" strokeDasharray="2 6">
        <path d="M150 30 H780" />
        <path d="M150 90 H780" />
        <path d="M150 150 H780" />
        <path d="M150 210 H780" />
      </g>
      <g fontFamily="var(--body)" fontSize="15" fill="var(--muted)" textAnchor="end">
        <text x="136" y="35">Lean proof</text>
        <text x="136" y="95">More questions</text>
        <text x="136" y="155">Knowledge base</text>
        <text x="136" y="215">Answer</text>
      </g>
      <path
        d="M150 210 H250 V150 H370 V90 H490 V150 H610 V30 H730 V210 H780"
        stroke="var(--amber)"
        strokeWidth="3"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--amber) 60%, transparent))" }}
      />
      <circle cx="150" cy="210" r="6" fill="var(--amber)" />
      {TICKET_EVENTS.map((e, i) => (
        <g key={e.what}>
          <path d={`M${e.x} ${tick[i]} V236`} stroke="var(--line)" strokeWidth="1" />
          <circle cx={e.x} cy={e.y} r="7" fill={e.c} />
          <text x={e.x} y="258" fontFamily="var(--body)" fontSize="14" fontWeight="700" fill="var(--fg)" textAnchor="middle">
            {e.what}
          </text>
          <text x={e.x} y="277" fontFamily="var(--body)" fontSize="14" fill={e.c} textAnchor="middle">
            {e.then}
          </text>
        </g>
      ))}
    </svg>
    </div>
  );
}

export function KbExample() {
  return (
    <CodeWindow title="kb/tests/fixtures/discovery-a/kb.pl" lang="Prolog">
      <span className="c">% --- SIGNAL ---</span>
      {"\n"}
      <span className="k">request</span>(r1, <span className="s">&apos;A customer used two discount codes and paid less than our minimum price.&apos;</span>).
      {"\n"}
      <span className="k">hypothesis</span>(h1, defect, <span className="s">&apos;Two discount codes can price an order below the floor price.&apos;</span>).
      {"\n"}
      <span className="k">budget</span>(laps, <span className="v">3</span>).
      {"\n\n"}
      <span className="c">% --- SPECTRUM ---</span>
      {"\n"}
      <span className="k">claim</span>(c1, introduce, <span className="s">&apos;No order is charged below its floor price.&apos;</span>).
      {"\n"}
      <span className="k">claim</span>(c2, preserve, <span className="s">&apos;Each code takes off its full amount.&apos;</span>).
      {"\n"}
      <span className="k">check</span>(t1, c1).
      {"\n"}
      <span className="k">example</span>(c1, <span className="s">&apos;Order 4417: list $40.00, floor $30.00, codes $5.00 and $10.00. Charge $30.00.&apos;</span>).
    </CodeWindow>
  );
}

// --- Artemis ----------------------------------------------------------------

export function PipelineOrbits() {
  return (
    <div className="chart-scroll">
    <svg
      className="chart"
      viewBox="0 0 800 320"
      fill="none"
      role="img"
      aria-label="Treatment runs Sagittarius as two orbits: a discovery orbit that laps until the problem is clear, a GO vote, then a build orbit. A clear request skips discovery. Control runs one research and plan step, then implements."
    >
      <defs>
        <marker id="art-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="var(--muted)" />
        </marker>
      </defs>
      <g fontFamily="var(--body)">
        <text x="0" y="20" fontSize="17" fontWeight="700" fill="var(--fg)">Treatment</text>
        <text x="92" y="20" fontSize="15" fill="var(--muted)">Sagittarius, two orbits</text>

        <path d="M40 128 C 110 44, 300 44, 372 118" stroke="var(--line)" strokeWidth="1.4" strokeDasharray="4 5" markerEnd="url(#art-ah)" />
        <text x="206" y="56" fontSize="13" fill="var(--muted)" textAnchor="middle">a clear request skips discovery</text>

        <ellipse cx="205" cy="135" rx="150" ry="50" stroke="var(--mid)" strokeWidth="1.8" />
        <circle cx="318" cy="102" r="6" fill="var(--mid)" />
        <text x="205" y="131" fontSize="16" fontWeight="700" fill="var(--fg)" textAnchor="middle">Discovery orbit</text>
        <text x="205" y="153" fontSize="13" fill="var(--muted)" textAnchor="middle">reproduce · claims · ask · vote</text>
        <text x="205" y="204" fontSize="13" fill="var(--mid)" textAnchor="middle">laps until the problem is clear</text>

        <path d="M356 135 H372" stroke="var(--muted)" strokeWidth="1.4" markerEnd="url(#art-ah)" />
        <rect x="376" y="117" width="48" height="36" rx="6" fill="var(--surface)" stroke="var(--good)" strokeWidth="1.6" />
        <text x="400" y="140" fontSize="14" fontWeight="700" fill="var(--good)" textAnchor="middle">GO</text>
        <path d="M426 135 H442" stroke="var(--muted)" strokeWidth="1.4" markerEnd="url(#art-ah)" />

        <ellipse cx="600" cy="135" rx="155" ry="50" stroke="var(--accent)" strokeWidth="1.8" />
        <circle cx="484" cy="168" r="6" fill="var(--accent)" />
        <text x="600" y="124" fontSize="16" fontWeight="700" fill="var(--fg)" textAnchor="middle">Build orbit</text>
        <text x="600" y="145" fontSize="13" fill="var(--muted)" textAnchor="middle">survey · decompose · build</text>
        <text x="600" y="162" fontSize="13" fill="var(--muted)" textAnchor="middle">fulfill · disprove · burn</text>
        <text x="600" y="204" fontSize="13" fill="var(--accent)" textAnchor="middle">laps until nothing is under, over, or open</text>

        <path d="M0 226 H800" stroke="var(--line)" strokeWidth="1" />

        <text x="0" y="256" fontSize="17" fontWeight="700" fill="var(--fg)">Control</text>
        <text x="72" y="256" fontSize="15" fill="var(--muted)">one research and plan step, then code</text>
        <rect x="55" y="272" width="300" height="40" rx="6" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.4" />
        <text x="205" y="297" fontSize="15" fontWeight="600" fill="var(--fg)" textAnchor="middle">Research + plan</text>
        <path d="M357 292 H440" stroke="var(--muted)" strokeWidth="1.4" markerEnd="url(#art-ah)" />
        <rect x="445" y="272" width="310" height="40" rx="6" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.4" />
        <text x="600" y="297" fontSize="15" fontWeight="600" fill="var(--fg)" textAnchor="middle">Implement</text>
      </g>
    </svg>
    </div>
  );
}

export function GradeFlow() {
  return (
    <div className="merge">
      <b>Grader</b>
      <i>checks each pass against Prolog facts about the ticket</i>
      <b>Blind judge × 3</b>
      <i>median score kept</i>
      <b>Report</b>
    </div>
  );
}

function Slider({
  label,
  value,
  display,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <label>
      <span>
        {label} <b>{display}</b>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

export function ScopeScoring() {
  const [pass, setPass] = useState(80);
  const [scope, setScope] = useState(3);
  const [diff, setDiff] = useState(900);
  const { penalty, adjusted } = scopeAdjusted(pass / 100, scope, diff);
  const adj = (adjusted * 100).toFixed(1);
  const sentence =
    penalty === 0
      ? diff <= 300
        ? "A diff of 300 lines or fewer is never penalised."
        : "Perfect scope adherence means no penalty, however large the diff."
      : `A ${diff}-line diff at scope ${scope} of 5 loses ${(penalty * 100).toFixed(1)} points.`;
  return (
    <>
      <div className="ctl">
        <Slider label="Tests passing" value={pass} display={`${pass}%`} min={0} max={100} onChange={setPass} />
        <Slider label="Scope adherence" value={scope} display={`${scope} of 5`} min={0} max={5} onChange={setScope} />
        <Slider label="Lines in the diff" value={diff} display={String(diff)} min={50} max={3000} step={50} onChange={setDiff} />
      </div>
      <div className="hrow">
        <span>Raw pass rate</span>
        <div className="hbar">
          <i style={{ width: `${pass}%`, background: "var(--accent)" }} />
        </div>
        <span>{pass}%</span>
      </div>
      <div className="hrow">
        <span>Scope-adjusted</span>
        <div className="hbar">
          <i style={{ width: `${adj}%`, background: "var(--mid)" }} />
        </div>
        <span>{adj}%</span>
      </div>
      <p className="cap" aria-live="polite">
        {sentence}
      </p>
      <CodeWindow title="src/scoring.ts" lang="formula">
        <span className="k">penalty</span> = (5 − scope) / 5 × max(0, diff − 300) / diff × 0.25
      </CodeWindow>
    </>
  );
}

export function HarnessSpec() {
  return (
    <CodeWindow title="thoughts/harness_facts.pl" lang="Prolog">
      <span className="k">step</span>(treatment, <span className="v">5</span>, <span className="s">&apos;realize-specification&apos;</span>).
      {"\n"}
      <span className="k">step</span>(control,   <span className="v">2</span>, implement).
      {"\n\n"}
      <span className="c">% --- C1: Every step has exactly one model ---</span>
      {"\n"}:- <span className="k">forall</span>({"\n"}
      {"    "}
      <span className="k">step</span>(P, _, S),{"\n"}
      {"    (   "}
      <span className="k">step_model</span>(P, S, _){"\n"}
      {"    ->  true\n    ;   "}
      <span className="k">format</span>(<span className="s">&quot;CONSTRAINT FAIL C1: no model for step ~w/~w~n&quot;</span>, [P, S]), fail
      {"\n    )\n).\n\n"}
      <span className="c">% --- C12: Treatment step 5 is the abstention gate ---</span>
      {"\n"}:- (   <span className="k">abstention_gate_step</span>(treatment, <span className="s">&apos;realize-specification&apos;</span>){"\n"}
      {"   ->  true\n   ;   "}
      <span className="k">format</span>(<span className="s">&quot;CONSTRAINT FAIL C12: ...&quot;</span>), fail
      {"\n   )."}
    </CodeWindow>
  );
}

// --- Stratify ---------------------------------------------------------------

export function useAllocator() {
  const [nice, setNice] = useState(0);
  const [sessions, setSessions] = useState(14);
  const [used, setUsed] = useState(37);
  return { nice, setNice, sessions, setSessions, used, setUsed };
}

type AllocState = ReturnType<typeof useAllocator>;

export function Allocator({ s }: { s: AllocState }) {
  const a = allocate(s.nice, s.sessions, s.used);
  const ticks = sprintTicks(a);
  const sentence =
    a.grant === 0
      ? "Your fair share rounds to nothing, so Stratify tells you to wait for the reset instead of inventing a grant."
      : `You get ${pct(a.grant)} of the window, in ${a.sprints} ${a.sprints === 1 ? "sprint" : "sprints"} of ${pct(a.perSprint)}, with ${duration(a.sleepSeconds)} between them.`;
  const others = "color-mix(in srgb, var(--accent) 35%, var(--surface))";
  const reserve = "color-mix(in srgb, var(--amber) 30%, var(--surface))";
  return (
    <>
      <div className="ctl">
        <Slider label="Your niceness" value={s.nice} display={String(s.nice)} min={-20} max={19} onChange={s.setNice} />
        <Slider label="Sessions sharing" value={s.sessions} display={String(s.sessions)} min={1} max={20} onChange={s.setSessions} />
        <Slider label="Window already used" value={s.used} display={`${s.used}%`} min={0} max={100} onChange={s.setUsed} />
      </div>
      <div
        className="stack"
        role="img"
        aria-label={`Window split: ${s.used}% used, ${pct(a.grant)} yours, ${pct(a.others)} for other sessions`}
      >
        <div style={{ width: `${a.used / 1000}%`, background: "var(--line)" }} />
        <div style={{ width: `${a.grant / 1000}%`, background: "var(--good)" }} />
        <div style={{ width: `${a.others / 1000}%`, background: others }} />
        <div style={{ width: `${a.reserve / 1000}%`, background: reserve }} />
      </div>
      <div className="legend">
        <span><i style={{ background: "var(--line)" }} />already used</span>
        <span><i style={{ background: "var(--good)" }} />your grant</span>
        <span><i style={{ background: others }} />other sessions</span>
        <span><i style={{ background: reserve }} />10% reserve</span>
      </div>
      <div className="tl" aria-hidden="true">
        {ticks.map((t, i) => (
          <div key={i} style={{ left: `${t.left}%`, width: `${t.width}%` }} />
        ))}
      </div>
      <div className="axis">
        <span>now</span>
        <span>window resets in 5 h</span>
      </div>
      <p className="readout" aria-live="polite">
        {sentence}
      </p>
    </>
  );
}

export function TerminalOutput() {
  return (
    <CodeWindow title="real output from the repo" lang="zsh">
      <span className="k">$ stratify status</span>
      {"\n"}
      <b>Rate-limit windows</b>  <span className="s">[measured]</span>
      {`
  5h   37.0%    resets in 4h 12m
  7d   55.0%    resets in 98h 52m

Claimants: 15  (15 cli, 0 cowork)
`}
      <span className="c">  SESSION              MODEL              STATUS   TOKENS/5h</span>
      {`
  sagittarius          claude-opus-5-5    idle     9.6M
  sagittarius-testing  claude-opus-5-5    idle     6.8M
  stratify-cb          claude-sonnet-5-5  busy     331.7k
`}
      <span className="c">  … 12 more</span>
      {"\n\n"}
      <span className="k">$ stratify plan</span>
      {`
  binding_window seven_day
  provenance     `}
      <span className="s">measured</span>
      {`
  claimants      14
  grant          2.5%
  sprint_budget  0.5%  × 5 sprints
  sleep_seconds  3600`}
    </CodeWindow>
  );
}

export function NiceCurve({ nice }: { nice: number }) {
  return (
    <>
      <div className="curve" role="img" aria-label={`Scheduling weight for each niceness from -20 to 19. Yours is ${nice}.`}>
        {NICE_WEIGHTS.map((w, i) => (
          <div
            key={i}
            className={i === nice + 20 ? "you" : i === 20 ? "zero" : undefined}
            style={{ height: `${(w / 4000) * 100}%` }}
          />
        ))}
      </div>
      <div className="axis">
        <span>nice −20</span>
        <span>0</span>
        <span>19</span>
      </div>
    </>
  );
}

// --- Card art -----------------------------------------------------------------

export function SagittariusArt() {
  return (
    <svg aria-hidden="true" width="84" height="84" viewBox="0 0 120 120" fill="none">
      <g transform="rotate(-24 60 60)" stroke="var(--accent)" strokeWidth="1.6">
        <ellipse cx="60" cy="60" rx="56" ry="22" />
        <ellipse cx="60" cy="60" rx="42" ry="16" strokeDasharray="2 5" />
        <ellipse cx="60" cy="60" rx="28" ry="10" />
      </g>
      <circle cx="60" cy="60" r="8" fill="var(--amber)" />
      <circle cx="108" cy="42" r="4" fill="var(--accent)" />
    </svg>
  );
}

export function ArtemisArt() {
  return (
    <svg aria-hidden="true" width="84" height="84" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="66" r="24" fill="var(--mid)" fillOpacity="0.25" stroke="var(--mid)" strokeWidth="1.6" />
      <path d="M14 82 C 30 20, 92 6, 108 40" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="3 6" />
      <circle cx="108" cy="40" r="5" fill="var(--amber)" />
    </svg>
  );
}

export function StratifyArt() {
  return (
    <svg aria-hidden="true" width="84" height="84" viewBox="0 0 120 120" fill="none">
      <path d="M14 100H106" stroke="var(--line)" strokeWidth="1.6" />
      <rect x="20" y="58" width="16" height="42" rx="2" fill="var(--good)" fillOpacity="0.85" />
      <rect x="44" y="40" width="16" height="60" rx="2" fill="var(--accent)" fillOpacity="0.85" />
      <rect x="68" y="70" width="16" height="30" rx="2" fill="var(--mid)" fillOpacity="0.85" />
      <rect x="92" y="50" width="16" height="50" rx="2" fill="var(--amber)" fillOpacity="0.85" />
      <path d="M14 30H106" stroke="var(--fg)" strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="4 5" />
    </svg>
  );
}

export function SharleanArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 110" fill="none" className="card-art">
      <g stroke="var(--line)" strokeWidth="1.4">
        <path d="M54 22 C 120 22, 150 55, 214 55" />
        <path d="M54 55 H214" />
        <path d="M54 88 C 120 88, 150 55, 214 55" />
      </g>
      <rect x="18" y="10" width="36" height="24" rx="4" stroke="var(--accent)" strokeWidth="1.4" fill="var(--surface)" />
      <rect x="18" y="43" width="36" height="24" rx="4" stroke="var(--good)" strokeWidth="1.4" fill="var(--surface)" />
      <rect x="18" y="76" width="36" height="24" rx="4" stroke="var(--mid)" strokeWidth="1.4" fill="var(--surface)" />
      <circle cx="246" cy="55" r="32" fill="var(--amber)" fillOpacity="0.18" stroke="var(--amber)" strokeWidth="1.6" />
      <circle cx="246" cy="55" r="14" fill="var(--amber)" />
      <text x="246" y="104" textAnchor="middle" fontSize="12" fill="var(--muted)" fontFamily="var(--mono)">
        Mathlib
      </text>
    </svg>
  );
}

export function LocatorArt() {
  const dots = [
    [24, 20], [46, 34], [20, 50], [30, 80], [60, 92], [74, 18], [80, 82], [106, 30], [120, 94],
  ];
  return (
    <svg aria-hidden="true" viewBox="0 0 300 110" fill="none" className="card-art">
      <g fill="var(--line)">
        {dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />
        ))}
      </g>
      <circle cx="84" cy="48" r="5" fill="var(--accent)" />
      <circle cx="104" cy="66" r="5" fill="var(--accent)" />
      <circle cx="52" cy="62" r="5" fill="var(--accent)" />
      <circle cx="80" cy="58" r="40" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 5" />
      <path d="M126 58 H186" stroke="var(--accent)" strokeWidth="1.4" />
      <path d="M180 53 L188 58 L180 63" stroke="var(--accent)" strokeWidth="1.4" />
      <rect x="196" y="26" width="84" height="64" rx="6" stroke="var(--amber)" strokeWidth="1.4" fill="var(--surface)" />
      <path d="M208 42 H266 M208 54 H256 M208 66 H262 M208 78 H244" stroke="var(--amber)" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
