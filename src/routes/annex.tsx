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
          <div className="h-2 w-10 rounded-full bg-graphite/50" />
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
                <Box className="flex items-center gap-6 p-5">
                  <div className="h-10 w-10 shrink-0 rounded-full border border-ink" style={{ background: i % 2 ? "transparent" : "var(--ink)" }} />
                  <Lines n={2} className="min-w-0 flex-1" />
                </Box>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLODED PLATE — one drawing stacked three times, drifting apart axonometrically; leader lines tie the layers together */}
      <section className="relative h-[120vh]">
        <div className="relative mx-auto mt-[10vh] aspect-[4/5] w-[min(46rem,80vw)]">
          {[
            { t: "translate(0,0)", d: 1, z: 30 },
            { t: "translate(9%,7%)", d: 1.8, z: 20 },
            { t: "translate(18%,14%)", d: 2.6, z: 10 },
          ].map((l, i) => (
            <div key={i} className="absolute inset-0 overflow-hidden frame" style={{ transform: l.t, zIndex: l.z }}>
              <Plate src={turning.url} pos="45% 40%" className="scale-[1.4]" depth={l.d} />
            </div>
          ))}
          {/* leader lines from layer corners */}
          <div className="absolute left-[8%] top-[6%] h-px w-[36%] rotate-[24deg] bg-ink/60" />
          <div className="absolute bottom-[10%] right-[4%] h-px w-[30%] -rotate-[18deg] bg-ink/60" />
        </div>
        <Lines n={2} className="absolute right-[10%] top-[6vh] w-56" />
        <Box className="absolute bottom-[6vh] left-[10%] h-24 w-64" />
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
          <div className="col-span-6 mt-16 aspect-[4/3] overflow-hidden frame">
            <Plate src={singularity.url} pos="50% 60%" className="scale-[1.5]" depth={1.2} />
          </div>
          <div className="col-span-4 aspect-[3/4] overflow-hidden rounded-tr-[8rem] frame">
            <Plate src={orders.url} pos="40% 40%" className="scale-[1.7]" depth={1.8} />
          </div>
          <div className="col-span-2">
            <Box className="aspect-square" />
            <Lines n={3} className="mt-6" />
          </div>
          <div className="col-span-3 aspect-square overflow-hidden rounded-bl-[8rem] frame">
            <Plate src={waves.url} pos="35% 45%" className="scale-[1.8]" depth={1.5} />
          </div>
          <div className="col-span-5 mt-24 aspect-[16/9] overflow-hidden frame">
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
