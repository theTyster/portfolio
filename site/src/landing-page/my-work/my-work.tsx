"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import ProjectLink from "@components/project-link/project-link";
import { PROJECTS, type ProjectId } from "./projects";
import {
  Allocator,
  ArtemisArt,
  Caption,
  GradeFlow,
  GradientBars,
  HarnessSpec,
  KbExample,
  LocatorArt,
  NiceCurve,
  PipelineOrbits,
  SagittariusArt,
  ScopeScoring,
  SharleanArt,
  StratifyArt,
  TerminalOutput,
  TicketChart,
  useAllocator,
} from "./visuals";

type Tab = { label: string; body: ReactNode };

function ProjectLinks({ id }: { id: ProjectId }) {
  const p = PROJECTS[id];
  return (
    <div className="links">
      {p.site ? <a href={p.site.url}>{p.site.label}</a> : null}
      {p.repo ? <a href={p.repo}>Source on GitHub</a> : null}
    </div>
  );
}

function FeaturedProject({
  id,
  art,
  pitch,
  tabs,
  builtWith,
}: {
  id: ProjectId;
  art: ReactNode;
  pitch: ReactNode;
  tabs: Tab[];
  builtWith: string;
}) {
  const p = PROJECTS[id];
  const uid = useId();
  const [sel, setSel] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (i: number, focus = false) => {
    const j = ((i % tabs.length) + tabs.length) % tabs.length;
    setSel(j);
    if (focus) refs.current[j]?.focus();
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: sel + 1, ArrowLeft: sel - 1, Home: 0, End: tabs.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select(keys[e.key], true);
  };
  return (
    <article className="feat" id={`project-${id}`} style={{ "--tone": p.color } as React.CSSProperties}>
      <div className="feat-head">
        {art}
        <div>
          <h3>{p.name}</h3>
          <p className="pitch">{pitch}</p>
        </div>
      </div>
      <div className="text-tabs" role="tablist" aria-label={`${p.name} views`} onKeyDown={onKeyDown}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-t${i}`}
            aria-selected={i === sel}
            aria-controls={`${uid}-p${i}`}
            tabIndex={i === sel ? 0 : -1}
            onClick={() => select(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          className="feat-view"
          role="tabpanel"
          id={`${uid}-p${i}`}
          aria-labelledby={`${uid}-t${i}`}
          hidden={i !== sel}
        >
          {t.body}
        </div>
      ))}
      <p className="built">
        <b>Built with</b> {builtWith}
      </p>
      <ProjectLinks id={id} />
    </article>
  );
}

function Stratify() {
  const alloc = useAllocator();
  return (
    <FeaturedProject
      id="stratify"
      art={<StratifyArt />}
      pitch="Shares one Claude rate limit fairly between every session that's running."
      builtWith="Lean 4 (no Mathlib) and a Claude Code skill"
      tabs={[
        {
          label: "Try the allocator",
          body: (
            <>
              <Allocator s={alloc} />
              <Caption>
                The same arithmetic the Lean binary runs: whole numbers on a 1000-weight scale, a 90% ceiling, and
                sleeps between one minute and one hour.
              </Caption>
            </>
          ),
        },
        {
          label: "Terminal",
          body: (
            <>
              <TerminalOutput />
              <Caption>
                Every reading says where it came from: measured, estimated, or unknown. The sessions it is balancing
                here are mostly <ProjectLink id="sagittarius" /> work.
              </Caption>
            </>
          ),
        },
        {
          label: "Priority curve",
          body: (
            <>
              <NiceCurve nice={alloc.nice} />
              <Caption>
                weight = 1000 · 2<sup>−nice/10</sup>. That is a 14.9× spread instead of the roughly 5900× in Linux, so
                a session that yields still makes progress. Your setting from the allocator is in green.
              </Caption>
            </>
          ),
        },
      ]}
    />
  );
}

function Card({ id, art, children }: { id: ProjectId; art: ReactNode; children: ReactNode }) {
  const p = PROJECTS[id];
  return (
    <article className="card" id={`project-${id}`} style={{ "--tone": p.color } as React.CSSProperties}>
      {art}
      <h4>{p.name}</h4>
      <p>{children}</p>
      <ProjectLinks id={id} />
    </article>
  );
}

function Row({ id, children }: { id: ProjectId; children: ReactNode }) {
  const p = PROJECTS[id];
  return (
    <div className="row" id={`project-${id}`} style={{ "--tone": p.color } as React.CSSProperties}>
      <b>{p.name}</b>
      <span>{children}</span>
      {p.site ? <a href={p.site.url}>{p.site.label}</a> : null}
    </div>
  );
}

export default function MyWork() {
  return (
    <div className="work">
      <FeaturedProject
        id="sagittarius"
        art={<SagittariusArt />}
        pitch="How I get an AI coding agent and me to agree on the spec before it writes code."
        builtWith="Markdown, SWI-Prolog, Lean 4, Python and Bash"
        tabs={[
          {
            label: "The gradient",
            body: (
              <>
                <GradientBars />
                <Caption>
                  Shift up on a signal. Lean back when it is resolved. Each step costs more time, so the agent only
                  climbs when something tells it to.
                </Caption>
              </>
            ),
          },
          {
            label: "One ticket",
            body: (
              <>
                <TicketChart />
                <Caption>
                  One ticket, left to right. The agent only climbs when something signals a problem, and it comes back
                  down as soon as the problem is settled.
                </Caption>
              </>
            ),
          },
          {
            label: "A knowledge base",
            body: (
              <>
                <KbExample />
                <Caption>
                  A real test fixture. The two claims contradict each other, and the knowledge base is where that shows
                  up before any code is written.
                </Caption>
              </>
            ),
          },
        ]}
      />

      <FeaturedProject
        id="artemis"
        art={<ArtemisArt />}
        pitch="A harness that tests whether formal methods make AI-written code better on real tickets."
        builtWith="TypeScript on Bun, BAML and SWI-Prolog"
        tabs={[
          {
            label: "Two pipelines",
            body: (
              <>
                <PipelineOrbits />
                <GradeFlow />
                <Caption>
                  The treatment runs <ProjectLink id="sagittarius" />; the control runs one research and plan step. Same
                  ticket, two git worktrees, and neither pipeline can see the other&apos;s changes.
                </Caption>
              </>
            ),
          },
          { label: "Scoring", body: <ScopeScoring /> },
          {
            label: "The spec",
            body: (
              <>
                <HarnessSpec />
                <Caption>
                  I wrote the harness down in Prolog before writing it in TypeScript. The constraints run every time
                  the file loads.
                </Caption>
              </>
            ),
          },
        ]}
      />

      <Stratify />

      <h3 className="sec">More projects</h3>
      <div className="cards">
        <Card id="sharlean" art={<SharleanArt />}>
          A Lean 4 command-line tool that lets every Lean project share one installed copy of Mathlib, instead of each
          one downloading and building its own. I use it every day, and the <ProjectLink id="sagittarius" /> deck
          points to it for Lean proof work.
        </Card>
        <Card id="locator" art={<LocatorArt />}>
          Two compiled BAML agents, a locator and a summarizer, that find just the code context a task needs.
        </Card>
      </div>
      <div className="rows">
        <Row id="cherry-lane-farms">A full-stack Next.js app on Cloudflare for a dog breeder.</Row>
        <Row id="criptoe">A small wrapper for the browser's crypto.subtle API, focused on AES-GCM, published on npm.</Row>
      </div>
    </div>
  );
}
