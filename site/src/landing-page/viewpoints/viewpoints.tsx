"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { orbitPosition } from "../my-work/logic";

export type Viewpoint = {
  id: string;
  label: string;
  /** Planet colour (a CSS colour or var()). */
  color: string;
  /** Planet decoration: "ring" | "bands" | "moon" | "". */
  kind: string;
  content: ReactNode;
};

const TAU = Math.PI * 2;

function reducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

// The home page's sections as planets orbiting the headshot. Selecting one
// turns the orbit so it sits in front. The selection lives in the URL hash
// (#work, #experience, ...); #work/<project> also scrolls to and highlights
// that project's card. Without JavaScript every panel renders, stacked.
export default function Viewpoints({
  views,
  headshot,
  children,
}: {
  views: Viewpoint[];
  headshot: ReactNode;
  /** The rest of the sun column, under the orbit (name, copy, contact). */
  children: ReactNode;
}) {
  const n = views.length;
  const [sel, setSel] = useState(0);
  const [rot, setRot] = useState(0);
  const rotRef = useRef(0);
  const raf = useRef<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const turnTo = useCallback(
    (idx: number) => {
      const from = rotRef.current;
      let target = (idx * TAU) / n;
      while (target - from > Math.PI) target -= TAU;
      while (from - target > Math.PI) target += TAU;
      if (raf.current) cancelAnimationFrame(raf.current);
      if (reducedMotion()) {
        rotRef.current = target;
        setRot(target);
        return;
      }
      const t0 = performance.now();
      const dur = 650;
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        rotRef.current = from + (target - from) * e;
        setRot(rotRef.current);
        if (p < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    },
    [n],
  );

  const select = useCallback(
    (idx: number, opts: { focus?: boolean; hash?: boolean } = {}) => {
      const i = ((idx % n) + n) % n;
      setSel(i);
      turnTo(i);
      if (opts.focus) tabRefs.current[i]?.focus();
      if (opts.hash !== false) history.replaceState(null, "", `#${views[i].id}`);
    },
    [n, turnTo, views],
  );

  // Hash routing: #<view> or #<view>/<card id>.
  useEffect(() => {
    const apply = () => {
      const [viewId, cardId] = decodeURIComponent(location.hash.slice(1)).split("/");
      const i = views.findIndex((v) => v.id === viewId);
      if (i < 0) return;
      select(i, { hash: false });
      if (!cardId) {
        requestAnimationFrame(() => {
          const panel = document.getElementById(`panel-${viewId}`);
          if (panel && panel.getBoundingClientRect().top < 0) panel.scrollIntoView({ block: "start" });
        });
        return;
      }
      requestAnimationFrame(() => {
        const card = document.getElementById(`project-${cardId}`);
        if (!card) return;
        card.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
        card.classList.remove("flash");
        void card.offsetWidth;
        card.classList.add("flash");
        window.setTimeout(() => card.classList.remove("flash"), 1800);
      });
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => {
      window.removeEventListener("hashchange", apply);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [views, select]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: sel + 1,
      ArrowDown: sel + 1,
      ArrowLeft: sel - 1,
      ArrowUp: sel - 1,
      Home: 0,
      End: n - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select(keys[e.key], { focus: true });
  };

  return (
    <div className="home">
      <aside className="sun" aria-label="About Ty Davis">
        <div className="orbit-stage">
          <svg className="orbit-rings" aria-hidden="true" viewBox="0 0 440 320" fill="none">
            <g transform="rotate(-10 220 160)">
              <ellipse cx="220" cy="160" rx="208" ry="118" stroke="var(--line)" strokeWidth="1" strokeDasharray="2 8" />
              <ellipse cx="220" cy="160" rx="165" ry="88" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1.4" />
            </g>
          </svg>
          <div className="headshot">{headshot}</div>
          <div className="planets" role="tablist" aria-label="Sections" onKeyDown={onKeyDown}>
            {views.map((v, i) => {
              const p = orbitPosition(i, n, rot);
              const k = (p.depth + 1) / 2;
              return (
                <button
                  key={v.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${v.id}`}
                  className="planet-tab"
                  aria-selected={i === sel}
                  aria-controls={`panel-${v.id}`}
                  tabIndex={i === sel ? 0 : -1}
                  onClick={() => select(i)}
                  style={
                    {
                      "--x": `${((p.x / 440) * 100).toFixed(2)}%`,
                      "--y": `${((p.y / 320) * 100).toFixed(2)}%`,
                      "--o": (0.6 + 0.4 * k).toFixed(2),
                      "--s": (0.85 + 0.15 * k).toFixed(3),
                      zIndex: p.depth > 0.05 ? 3 : 1,
                    } as React.CSSProperties
                  }
                >
                  <span className={`planet ${v.kind}`} aria-hidden="true" style={{ "--pc": v.color } as React.CSSProperties} />
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
        <p className="orbit-hint">Pick a planet, or use the arrow keys.</p>
        {children}
      </aside>

      <div className="panels">
        {views.map((v, i) => (
          <section
            key={v.id}
            id={`panel-${v.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${v.id}`}
            className={`panel${i === sel ? " is-active" : ""}`}
          >
            <h2 className="grad">{v.label}</h2>
            <div className="panel-body">{v.content}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
