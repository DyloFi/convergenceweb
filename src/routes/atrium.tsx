import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import singularity from "@/assets/singularity.jpg.asset.json";
import oracle from "@/assets/oracle.webp.asset.json";
import waves from "@/assets/waves.webp.asset.json";
import observer from "@/assets/observer.png.asset.json";
import orders from "@/assets/orders.webp.asset.json";
import turning from "@/assets/turning.webp.asset.json";

/* Same plate language as the other studies: multiply blend, desaturated, cropped */
const Plate = ({ src, pos = "center", className = "", depth = 1 }: { src: string; pos?: string; className?: string; depth?: number }) => (
  <img src={src} alt="" loading="lazy" className={`plate parallax absolute inset-0 h-full w-full object-cover ${className}`} style={{ objectPosition: pos, ["--d" as string]: depth }} />
);

/* Cursor (momentum) + scroll signals written to CSS vars — shared with the other studies */
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

/* Scroll progress of one section, written to a CSS var (used by the ramp marker) */
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

export const Route = createFileRoute("/atrium")({
  head: () => ({
    meta: [
      { title: "Cantilever — The Atrium" },
      { name: "description", content: "A third wordless wireframe: everything suspended, domed and balanced on slender pylons." },
      { property: "og:title", content: "Cantilever — The Atrium" },
      { property: "og:description", content: "Everything suspended, domed and balanced on slender pylons." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Atrium,
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

function Atrium() {
  const root = useRef<HTMLElement>(null);
  const ramp = useRef<HTMLElement>(null);
  const [night, setNight] = useState(false);
  const [xray, setXray] = useState(false);
  const hold = useRef<number | undefined>(undefined);
  useFieldSignals(root);
  useSectionProgress(ramp, "--rp");

  return (
    <main
      ref={root}
      aria-label="Atrium wireframe study"
      className={`field min-h-screen overflow-x-clip bg-paper pb-0 ${night ? "night" : ""} ${xray ? "xray" : ""}`}
      /* hidden gesture, as on the other pages: press and hold anywhere to see through the plates */
      onPointerDown={() => { hold.current = window.setTimeout(() => setXray(true), 700); }}
      onPointerUp={() => { clearTimeout(hold.current); setXray(false); }}
      onPointerLeave={() => { clearTimeout(hold.current); setXray(false); }}
    >
      {/* NAV — variation three: nothing cantilevers here. The beam is SUSPENDED on two slender cables, perfectly centred; the logo overhangs beneath its belly */}
      <header className="relative h-40">
        <div aria-hidden className="absolute left-[18%] top-0 h-9 w-px bg-ink" />
        <div aria-hidden className="absolute right-[18%] top-0 h-9 w-px bg-ink" />
        <div className="absolute left-1/2 top-9 flex h-12 w-[68%] -translate-x-1/2 items-center justify-between gap-8 rounded-full border border-graphite/60 bg-graphite/15 px-10">
          <Link to="/" aria-label="Back to the main layout study" className="h-2 w-20 rounded-full bg-ink transition-transform hover:-translate-y-1" />
          <Link to="/annex" aria-label="The Annex" className="h-2 w-14 rounded-full bg-graphite/50 transition-transform hover:-translate-y-1" />
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
        <div className="absolute left-1/2 top-[3.6rem] z-10 h-20 w-20 -translate-x-1/2 overflow-hidden rounded-full frame">
          <Plate src={observer.url} pos="50% 24%" className="scale-[2.2]" />
        </div>
      </header>

      {/* HERO — a hemispherical dome anchored on a CURVED horizon; the crest of an enormous circle rises through the floor while the headline climbs its flank */}
      <section className="relative h-[94vh] overflow-hidden">
        <div
          aria-hidden
          className="absolute left-1/2 top-[56%] aspect-square w-[220vh] -translate-x-1/2 rounded-full border border-ink bg-graphite/5"
          style={{ outline: "1px solid color-mix(in oklab, var(--ink) 25%, transparent)", outlineOffset: "26px" }}
        />
        <div className="absolute bottom-[18%] left-[28%] aspect-square w-[38vh] overflow-hidden rounded-t-full frame">
          <Plate src={turning.url} pos="36% 46%" className="scale-[2.2] drift" depth={2.2} />
        </div>
        <div className="absolute right-[8%] top-[20%] w-[38%] rotate-[3deg]">
          <div className="space-y-3">
            <div className="ml-auto h-10 w-full bg-ink" />
            <div className="ml-auto h-10 w-[74%] bg-ink" />
            <div className="ml-auto h-10 w-[48%] bg-ink" />
          </div>
          <Lines n={3} className="ml-auto mt-8 w-[46%]" />
        </div>
        <div className="absolute bottom-[26%] right-[12%] h-12 w-52 rotate-[3deg] rounded-full border border-graphite/60 bg-graphite/15" />
        {/* a probe leans off the dome toward the headline */}
        <div className="absolute bottom-[52%] left-[46%] h-px w-[18%] rotate-[14deg] bg-ink/60" />
      </section>

      {/* PYLONS — three slabs hover at staggered heights, each on a single slender column standing on a hairline plinth; Mead's elevated city, kept wordless */}
      <section className="relative mx-auto max-w-7xl px-6 pb-40 pt-16">
        <Lines n={2} className="mb-24 w-64" />
        <div className="grid h-[105vh] grid-cols-3 gap-[7%]">
          <div className="relative mt-[8vh]">
            <div className="relative h-72 overflow-hidden rounded-tr-[9rem] frame">
              <Plate src={waves.url} pos="30% 42%" className="scale-[1.5]" depth={1.4} />
            </div>
            <div className="mx-auto h-[30vh] w-px bg-ink" />
            <div className="mx-auto h-1.5 w-24 bg-ink" />
          </div>
          <div className="relative mt-[30vh]">
            <div className="relative h-56 overflow-hidden rounded-bl-[9rem] frame">
              <Plate src={orders.url} pos="45% 42%" className="scale-[1.8]" depth={1.9} />
            </div>
            <div className="mx-auto h-[18vh] w-px bg-ink" />
            <div className="mx-auto h-1.5 w-24 bg-ink" />
          </div>
          <div className="relative mt-[2vh]">
            <div className="relative h-80 overflow-hidden rounded-tl-[9rem] frame">
              <Plate src={observer.url} pos="50% 20%" className="scale-[1.4]" depth={2.3} />
            </div>
            <div className="mx-auto h-[24vh] w-px bg-ink" />
            <div className="mx-auto h-1.5 w-24 bg-ink" />
          </div>
        </div>
        <Box className="absolute bottom-[6vh] right-0 h-24 w-56" />
      </section>

      {/* RAMP — a service ramp zig-zags down the page; a marker rides its rail with scroll progress while plate landings step alongside */}
      <section ref={ramp} className="relative h-[180vh] overflow-hidden" style={{ ["--rp" as string]: 0 }}>
        <div className="absolute left-[8%] top-[10%] h-px w-[84%] origin-left rotate-[13deg] bg-ink/60">
          <div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-ink"
            style={{ left: "calc(var(--rp, 0) * 92%)" }}
          />
        </div>
        {[
          { img: oracle.url, left: "6%", top: "14%", w: "26%", ar: "aspect-[4/3]", r: "rounded-tr-[8rem]", pos: "30% 35%", s: "scale-[1.6]", d: 1.3 },
          { img: waves.url, left: "52%", top: "34%", w: "30%", ar: "aspect-[16/9]", r: "rounded-bl-[8rem]", pos: "28% 48%", s: "scale-[1.9]", d: 1.7 },
          { img: singularity.url, left: "18%", top: "58%", w: "34%", ar: "aspect-[3/4]", r: "rounded-tr-[10rem]", pos: "50% 55%", s: "scale-[1.5]", d: 2.1 },
        ].map((l, i) => (
          <div key={i} className={`absolute overflow-hidden frame ${l.r} ${l.ar}`} style={{ left: l.left, top: l.top, width: l.w }}>
            <Plate src={l.img} pos={l.pos} className={l.s} depth={l.d} />
          </div>
        ))}
        <Lines n={2} className="absolute right-[8%] top-[8%] w-56" />
      </section>

      {/* VAULT — a receding corridor of arches, each framing a drawing smaller than the last, running out to a vanishing-point tick */}
      <section className="relative px-[6vw] py-40">
        <div className="flex items-end gap-[4vw]">
          {[
            { img: orders.url, w: "w-[34vw]", h: "h-[54vh]", pos: "40% 45%", s: "scale-[1.7]", d: 1.5 },
            { img: turning.url, w: "w-[24vw]", h: "h-[40vh]", pos: "50% 42%", s: "scale-[1.5]", d: 1.9 },
            { img: observer.url, w: "w-[16vw]", h: "h-[28vh]", pos: "50% 10%", s: "scale-[2]", d: 2.3 },
          ].map((a, i) => (
            <div key={i} className={`relative shrink-0 overflow-hidden rounded-t-full frame ${a.w} ${a.h}`}>
              <Plate src={a.img} pos={a.pos} className={a.s} depth={a.d} />
            </div>
          ))}
          <div aria-hidden className="mb-1 h-2 w-14 rounded-full bg-ink" />
        </div>
      </section>

      {/* CTA — a pod hangs from a single cable; approach and it lifts to meet you */}
      <section className="relative h-[80vh]">
        <div aria-hidden className="absolute left-[55%] top-0 h-[24%] w-px bg-ink" />
        <button
          type="button"
          aria-label="Open the pod"
          className="group absolute left-[55%] top-[24%] -ml-36 flex h-24 w-72 items-center justify-between rounded-full border border-graphite/60 bg-graphite/15 pl-10 pr-3 transition-transform duration-700 hover:-translate-y-3"
        >
          <Lines n={2} className="w-1/2" />
          <span className="h-16 w-16 shrink-0 rounded-full bg-ink transition-transform duration-500 group-hover:scale-75" />
        </button>
        <Lines n={2} className="absolute left-[30%] top-[46%] w-44" />
        <Box className="absolute bottom-[8%] left-[14%] h-20 w-56" />
      </section>

      {/* FOOTER — a heavy dark slab from which slender ink pylons rise into the void, each carrying one small pale floating box */}
      <footer className="relative mt-32 h-64 bg-ink">
        {[
          { left: "12%", h: "h-40" },
          { left: "36%", h: "h-56" },
          { left: "60%", h: "h-32" },
          { left: "80%", h: "h-48" },
        ].map((p, i) => (
          <div key={i} className="absolute bottom-full flex flex-col items-center" style={{ left: p.left }}>
            <div className="mb-2 h-10 w-16 border border-ink bg-paper" />
            <div aria-hidden className={`w-px bg-ink ${p.h}`} />
          </div>
        ))}
        <div className="absolute bottom-10 left-8 flex gap-16">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-24 space-y-2">
              {[1, 2, 3].map((j) => <div key={j} className="h-2 rounded-full bg-paper/40" />)}
            </div>
          ))}
        </div>
        <Link to="/" aria-label="Back to the main layout study" className="absolute right-8 top-10 h-2 w-40 rounded-full bg-paper/60 transition-transform hover:-translate-x-2" />
      </footer>
    </main>
  );
}
