import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import singularity from "@/assets/singularity.jpg.asset.json";
import oracle from "@/assets/oracle.webp.asset.json";
import waves from "@/assets/waves.webp.asset.json";
import observer from "@/assets/observer.png.asset.json";
import orders from "@/assets/orders.webp.asset.json";
import turning from "@/assets/turning.webp.asset.json";

/* Same plate language as the main study: multiply blend, desaturated, cropped */
const Plate = ({ src, pos = "center", className = "", depth = 1 }: { src: string; pos?: string; className?: string; depth?: number }) => (
  <img src={src} alt="" loading="lazy" className={`plate parallax absolute inset-0 h-full w-full object-cover ${className}`} style={{ objectPosition: pos, ["--d" as string]: depth }} />
);

/* Cursor (momentum) + scroll signals written to CSS vars — shared with the main study */
function useFieldSignals(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
    };
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--mx", x.toFixed(4));
      el.style.setProperty("--my", y.toFixed(4));
      el.style.setProperty("--sy", Math.min(scrollY / innerHeight, 1.5).toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move);
    raf = requestAnimationFrame(tick);
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [root]);
}

/* Scroll progress of one section, written to a CSS var (used by the gauge needle) */
function useSectionProgress(ref: RefObject<HTMLElement | null>, name: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max((innerHeight - r.top) / (innerHeight + r.height), 0), 1);
      el.style.setProperty(name, p.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref, name]);
}

export const Route = createFileRoute("/annex")({
  head: () => ({
    meta: [
      { title: "Cantilever — The Annex" },
      { name: "description", content: "A second wordless wireframe: the underside of the layout study, mirrored and inverted." },
      { property: "og:title", content: "Cantilever — The Annex" },
      { property: "og:description", content: "The underside of the layout study, mirrored and inverted." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Annex,
});

/* Wireframe primitives, reused verbatim */
const Box = ({ className = "" }: { className?: string }) => (
  <div className={`border border-graphite/60 bg-graphite/15 ${className}`} />
);
const Lines = ({ n = 3, className = "" }: { n?: number; className?: string }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className="h-2 rounded-full bg-graphite/40" style={{ width: `${100 - i * 14}%` }} />
    ))}
  </div>
);

function Annex() {
  const root = useRef<HTMLElement>(null);
  const gauge = useRef<HTMLElement>(null);
  const [night, setNight] = useState(false);
  const [xray, setXray] = useState(false);
  const hold = useRef<number | undefined>(undefined);
  useFieldSignals(root);
  useSectionProgress(gauge, "--gp");

  return (
    <main
      ref={root}
      aria-label="Annex wireframe study"
      className={`field min-h-screen overflow-x-clip bg-paper pb-0 ${night ? "night" : ""} ${xray ? "xray" : ""}`}
      onPointerDown={() => { hold.current = window.setTimeout(() => setXray(true), 700); }}
      onPointerUp={() => { clearTimeout(hold.current); setXray(false); }}
      onPointerLeave={() => { clearTimeout(hold.current); setXray(false); }}
    >
      {/* NAV — the mirror of the main study: the beam cantilevers from the LEFT edge, logo overhangs its free end */}
      <header className="relative h-28">
        <div className="absolute left-0 top-8 flex h-12 w-[72%] items-center justify-start gap-8 rounded-r-full border border-graphite/60 bg-graphite/15 pl-10">
          <Link
            to="/"
            aria-label="Back to the main layout study"
            className="h-2 w-20 rounded-full bg-ink transition-transform hover:translate-x-2"
          />
          <div className="h-2 w-14 rounded-full bg-graphite/50" />
          <Link to="/atrium" aria-label="The Atrium" className="h-2 w-10 rounded-full bg-graphite/50 transition-transform hover:-translate-y-1" />
          <button
            type="button"
            aria-label="Switch between day and night"
            aria-pressed={night}
            onClick={() => setNight((n) => !n)}
            className="relative h-8 w-28 rounded-full bg-ink"
          >
            <span className={`absolute top-1 h-6 w-6 rounded-full bg-paper transition-all duration-700 ${night ? "left-[5.25rem]" : "left-1"}`} />
          </button>
        </div>
        <div className="absolute right-[22%] top-4 h-20 w-20 overflow-hidden rounded-full frame">
          <Plate src={orders.url} pos="40% 55%" className="scale-[2.4]" />
        </div>
      </header>

      {/* HERO — inverted gravity: a tall monolith column grows up out of the floor while the headline stacks step down to the RIGHT; horizon tilts the opposite way */}
      <section className="relative h-[96vh] overflow-visible">
        <div className="absolute left-[8%] top-0 h-[104%] w-[24%] rotate-[2deg] overflow-hidden rounded-b-[10rem] frame">
          <Plate src={observer.url} pos="50% 18%" className="scale-[1.9] drift" depth={2.2} />
        </div>
        <div className="absolute right-[6%] top-[16%] w-[40%] rotate-[2deg] text-right">
          <div className="space-y-3">
            <div className="ml-auto h-10 w-[60%] bg-ink" />
            <div className="ml-auto h-10 w-[82%] bg-ink" />
            <div className="ml-auto h-10 w-full bg-ink" />
          </div>
          <Lines n={3} className="ml-auto mt-8 w-[50%]" />
        </div>
        <div className="absolute bottom-[18%] right-[10%] h-12 w-56 rotate-[2deg] rounded-full border border-graphite/60 bg-graphite/15" />
        <div className="absolute bottom-[10%] left-0 h-px w-full rotate-[2deg] bg-ink" />
        {/* datum ticks rising off the horizon, tallest at the monolith */}
        <div className="absolute bottom-[10%] left-[4%] flex w-[30%] -rotate-[1deg] items-end gap-6">
          {[3, 5, 9, 6, 12, 7, 4].map((h, i) => (
            <div key={i} className="w-px bg-ink" style={{ height: `${h}rem`, opacity: 0.35 + i * 0.09 }} />
          ))}
        </div>
      </section>

      {/* DOSSIER — split screen with a skewed hairline: plate on the left, an exploded parts manifest stepping right on the other side */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-12 items-center gap-10 px-6 py-40">
        <div className="relative col-span-12 h-[60vh] -rotate-[1deg] overflow-hidden rounded-bl-[12rem] frame md:col-span-7">
          <Plate src={oracle.url} pos="30% 40%" className="scale-[1.7]" depth={1.6} />
        </div>
        <div className="relative col-span-12 md:col-span-5">
          {/* leader spine the manifest entries hang from */}
          <div className="absolute -left-8 top-0 h-full w-px bg-ink/70" />
          <div className="space-y-10">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="relative" style={{ marginLeft: `${i * 8}%` }}>
                <div className="absolute -left-8 top-1/2 h-px w-8 bg-ink/70" />
                <div className="flex items-center gap-6 border border-graphite/60 bg-graphite/15 p-5">
                  <div className="h-10 w-10 shrink-0 rounded-full border border-ink" style={{ background: i % 2 ? "transparent" : "var(--ink)" }} />
                  <Lines n={2} className="min-w-0 flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: THE SYNCHRONOUS CLIMAX HYPOTHESIS & EXPLODED PLATE */}
      <section className="relative min-h-screen border-b border-graphite/40 py-20">
        {/* Architectural Header Datum */}
        <div className="mx-auto flex w-[min(76rem,92vw)] items-baseline justify-between border-b border-ink/40 pb-3 font-mono text-[10px] tracking-[0.25em] text-ink/60">
          <span>SEC.04 // SYNCHRONOUS CLIMAX DOSSIER</span>
          <span className="hidden md:inline">WINDOW: 2026–2035 // CONVERGENCE EPOCH</span>
          <span>SYSTEM_INDEX: 4T-SAECULUM</span>
        </div>

        <div className="mx-auto mt-12 grid w-[min(76rem,92vw)] grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Axonometric Exploded Plate Stack */}
          <div className="relative aspect-[4/5] w-full lg:col-span-5">
            {[
              { t: "translate(0,0)", d: 1, z: 30, tag: "PHASE 04 // CRISIS CLIMAX (2028-2033)" },
              { t: "translate(8%,6%)", d: 1.8, z: 20, tag: "PHASE 03 // UNRAVELING (1984-2008)" },
              { t: "translate(16%,12%)", d: 2.6, z: 10, tag: "PHASE 02 // AWAKENING (1964-1984)" },
            ].map((l, i) => (
              <div key={i} className="absolute inset-0 overflow-hidden frame bg-paper" style={{ transform: l.t, zIndex: l.z }}>
                <Plate src={turning.url} pos="45% 40%" className="scale-[1.4]" depth={l.d} />
                <div className="absolute left-3 top-3 border border-ink/40 bg-paper/90 px-2 py-0.5 font-mono text-[8px] tracking-widest text-ink backdrop-blur-xs">
                  {l.tag}
                </div>
              </div>
            ))}
            <div className="pointer-events-none absolute -right-6 top-[20%] hidden h-px w-12 rotate-[12deg] bg-ink/50 lg:block" />
            <div className="pointer-events-none absolute -right-6 top-[50%] hidden h-px w-12 -rotate-[8deg] bg-ink/50 lg:block" />
          </div>

          {/* Master Thesis Ledger */}
          <div className="space-y-6 lg:col-span-7">
            <div className="border border-graphite/60 bg-graphite/10 p-6">
              <div className="flex items-center justify-between font-mono text-[9px] tracking-widest text-ink/60">
                <span>MONOGRAPH // CHAPTER I</span>
                <span>HARMONIC CONFLUENCE</span>
              </div>
              <h2 className="mt-2 font-mono text-2xl tracking-wider text-ink uppercase">The Synchronous Climax</h2>
              <p className="mt-3 font-sans text-xs leading-relaxed text-ink/80">
                Human history is governed by multiple overlapping periodicities operating across vastly different timescales—biological-generational (~80–100y), monetary-imperial (~100–250y), and techno-economic (~50–60y). The 2026–2035 decade represents the first time in modern history that the <strong>Fourth Turning Crisis Climax</strong>, the <strong>Hegemonic Cycle Inflection</strong>, and the <strong>6th Kondratiev Wave Installation</strong> reach their terminal boundaries concurrently.
              </p>
            </div>

            {/* Turning Cycle Progression Grid */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-[9px] tracking-[0.2em] text-ink/60 uppercase">
                <span>The Four Turnings of the Millennial Saeculum</span>
                <span>Duration: 1946 – 2033+</span>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  {
                    code: "1T: 1946–1964",
                    title: "THE HIGH",
                    char: "Institutions robust; individualism submerged. Collective rebuilding post-WWII.",
                    trust: "Maximum",
                    active: false,
                  },
                  {
                    code: "2T: 1964–1984",
                    title: "THE AWAKENING",
                    char: "Cultural passions ignite; spiritual revolt against institutional conformity.",
                    trust: "Eroding",
                    active: false,
                  },
                  {
                    code: "3T: 1984–2008",
                    title: "THE UNRAVELING",
                    char: "Cynicism rules; decay of civic fabric, ascendancy of hyper-individualism and debt.",
                    trust: "Decaying",
                    active: false,
                  },
                  {
                    code: "4T: 2008–2033",
                    title: "THE CRISIS",
                    char: "Catalyst (GFC), institutional collapse, geopolitical friction, synchronous re-founding.",
                    trust: "Depleted / Climax",
                    active: true,
                  },
                ].map((t, idx) => (
                  <div
                    key={idx}
                    className={`border p-4 transition-all ${
                      t.active
                        ? "border-ink bg-ink text-paper shadow-xs"
                        : "border-graphite/60 bg-graphite/10 text-ink"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[8px] tracking-widest opacity-75">
                      <span>{t.code}</span>
                      <span>TRUST: {t.trust}</span>
                    </div>
                    <div className="mt-1 font-mono text-sm font-semibold tracking-wider">{t.title}</div>
                    <p className="mt-2 font-sans text-[11px] leading-relaxed opacity-90">{t.char}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: GENERATIONAL CONSTELLATION & EMPIRICAL METRICS */}
        <div className="mx-auto mt-16 w-[min(76rem,92vw)] border-t border-graphite/40 pt-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Archetype Manifest Table */}
            <div className="lg:col-span-7">
              <div className="border border-graphite/60 bg-paper p-6">
                <div className="flex items-center justify-between border-b border-graphite/40 pb-3 font-mono text-[10px] tracking-widest text-ink">
                  <span>GENERATIONAL ARCHETYPES IN CRISIS CLIMAX</span>
                  <span>SAECULUM RECURRENCE</span>
                </div>
                <div className="mt-4 divide-y divide-graphite/30 font-mono text-[11px]">
                  {[
                    {
                      archetype: "PROPHET (Boomer Generation)",
                      role: "Senior Leadership / Moral Visionaries",
                      desc: "Entering elderhood; provide the uncompromising ideological principles that sharpen crisis stakes.",
                    },
                    {
                      archetype: "NOMAD (Generation X)",
                      role: "Midlife Pragmatists / Executioners",
                      desc: "Skeptical, self-reliant managers steering fragile systems through operational shocks.",
                    },
                    {
                      archetype: "HERO (Millennial Generation)",
                      role: "Young Civic Cohort / Collective Force",
                      desc: "Team-oriented, pressured, rising into leadership to physically resolve and rebuild civic institutions.",
                    },
                    {
                      archetype: "ARTIST (Gen Z / Generation Alpha)",
                      role: "Youth / Post-Crisis Consolidators",
                      desc: "Overprotected and sensitive in crisis; will craft the nuanced consensus of the next High.",
                    },
                  ].map((row, idx) => (
                    <div key={idx} className="py-3">
                      <div className="flex items-baseline justify-between text-ink font-semibold">
                        <span>{row.archetype}</span>
                        <span className="text-[9px] text-ink/60">{row.role}</span>
                      </div>
                      <p className="mt-1 font-sans text-[11px] text-ink/75 leading-relaxed">{row.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Empirical Audit & Catalysts Panel */}
            <div className="space-y-4 lg:col-span-5">
              <div className="border border-graphite/60 bg-graphite/15 p-6">
                <div className="font-mono text-[10px] tracking-widest text-ink/60 uppercase">Institutional Stress Indicators</div>
                <div className="mt-4 space-y-3 font-mono text-[11px]">
                  <div className="flex justify-between border-b border-graphite/30 pb-2">
                    <span className="text-ink/80">Sovereign Debt / GDP Ratio</span>
                    <span className="text-ink font-semibold">&gt; 125% (Dalio Stage 5)</span>
                  </div>
                  <div className="flex justify-between border-b border-graphite/30 pb-2">
                    <span className="text-ink/80">Institutional Trust Rating</span>
                    <span className="text-ink font-semibold">Historic Low (Pew 2024)</span>
                  </div>
                  <div className="flex justify-between border-b border-graphite/30 pb-2">
                    <span className="text-ink/80">K-Wave Techno-Regime</span>
                    <span className="text-ink font-semibold">6th Wave (AI / Bio)</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-ink/80">Crisis Climax Window</span>
                    <span className="text-ink font-semibold">2028 – 2033</span>
                  </div>
                </div>
              </div>

              <div className="border border-ink/40 bg-paper p-5">
                <div className="font-mono text-[9px] tracking-widest text-ink uppercase">Failure Mode Register</div>
                <p className="mt-2 font-sans text-[11px] leading-relaxed text-ink/80">
                  Critical vulnerability: Asymmetric escalation during an institutional vacuum. Historical turnings resolve only when public consensus delegates extraordinary authority to central institutions to navigate existential hazard.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-graphite/40 pt-2 font-mono text-[8px] tracking-widest text-ink/60">
                  <span>AUDIT STATUS: VERIFIED</span>
                  <span>CONVERGENCE_MONOGRAPH // SEC_04</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GAUGE — concentric rings with a needle that sweeps as you pass through the section */}
      <section ref={gauge} className="relative grid h-[90vh] place-items-center" style={{ ["--gp" as string]: 0 }}>
        <div className="relative aspect-square w-[min(70vh,80vw)] rounded-full rings opacity-70">
          <div className="absolute inset-[14%] rounded-full border border-graphite/60" />
          <div className="absolute inset-[30%] overflow-hidden rounded-full frame bg-graphite/10">
            <Plate src={waves.url} pos="50% 35%" className="scale-[1.5] slow-spin" depth={1.4} />
          </div>
          {/* needle: one long hairline sweeping 300deg across the section's scroll progress */}
          <div
            className="absolute left-1/2 top-1/2 h-[2px] w-[38%] origin-left bg-ink"
            style={{ transform: `translateY(-1px) rotate(calc(var(--gp, 0) * 300deg))` }}
          />
          {/* hub + counterweight */}
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
        </div>
      </section>

      {/* CONTACT SHEET — the remaining drawings laid out on a broken grid, nothing aligned twice */}
      <section className="px-[6vw] py-32">
        <div className="grid grid-cols-12 items-start gap-8">
          <div className="relative col-span-6 mt-16 aspect-[4/3] overflow-hidden frame">
            <Plate src={singularity.url} pos="50% 60%" className="scale-[1.5]" depth={1.2} />
          </div>
          <div className="relative col-span-4 aspect-[3/4] overflow-hidden rounded-tr-[8rem] frame">
            <Plate src={orders.url} pos="40% 40%" className="scale-[1.7]" depth={1.8} />
          </div>
          <div className="col-span-2">
            <Box className="aspect-square" />
            <Lines n={3} className="mt-6" />
          </div>
          <div className="relative col-span-3 aspect-square overflow-hidden rounded-bl-[8rem] frame">
            <Plate src={waves.url} pos="35% 45%" className="scale-[1.8]" depth={1.5} />
          </div>
          <div className="relative col-span-5 mt-24 aspect-[16/9] overflow-hidden frame">
            <Plate src={oracle.url} pos="55% 35%" className="scale-[1.6]" depth={2} />
          </div>
          <div className="col-span-4 mt-8 space-y-8">
            <Box className="h-32" />
            <Lines n={2} className="ml-[30%]" />
          </div>
        </div>
      </section>

      {/* CTA — a ring lowered on a line from above, hanging in the void off-centre */}
      <section className="relative h-[70vh]">
        <div className="absolute left-[58%] top-0 h-[38%] w-px bg-ink" />
        <button
          type="button"
          aria-label="Open the capsule"
          className="group absolute left-[50%] top-[38%] grid h-40 w-40 -translate-x-1/2 place-items-center rounded-full border-2 border-ink transition-transform hover:scale-105"
        >
          <span className="h-16 w-16 rounded-full bg-ink transition-transform group-hover:scale-75" />
        </button>
        <Lines n={2} className="absolute left-[38%] top-[52%] w-40" />
      </section>

      {/* FOOTER — the inversion of the main study: a light slab, with one column sinking BELOW the bottom edge into the void */}
      <footer className="relative mt-24 h-56 border-t border-ink bg-paper">
        <div className="absolute -bottom-20 left-[30%] h-40 w-[24%] overflow-hidden frame bg-paper">
          <Plate src={singularity.url} pos="60% 20%" className="scale-[1.8] origin-top" depth={1.3} />
        </div>
        <div className="absolute bottom-10 left-8 flex gap-16">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-24 space-y-2">
              {[1, 2, 3].map((j) => <div key={j} className="h-2 rounded-full bg-graphite/60" />)}
            </div>
          ))}
        </div>
        <div className="absolute right-8 top-10 h-2 w-40 rounded-full bg-graphite/50" />
      </footer>
    </main>
  );
}
