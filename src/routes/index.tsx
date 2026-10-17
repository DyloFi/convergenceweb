import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import singularity from "@/assets/singularity.jpg.asset.json";
import oracle from "@/assets/oracle.webp.asset.json";
import waves from "@/assets/waves.webp.asset.json";
import observer from "@/assets/observer.png.asset.json";
import orders from "@/assets/orders.webp.asset.json";
import turning from "@/assets/turning.webp.asset.json";

/* Drawings sink into the paper: multiply blend, desaturated, cropped to their structures */
const Plate = ({ src, pos = "center", className = "", depth = 1 }: { src: string; pos?: string; className?: string; depth?: number }) => (
  <img src={src} alt="" loading="lazy" className={`plate parallax absolute inset-0 h-full w-full object-cover ${className}`} style={{ objectPosition: pos, ["--d" as string]: depth }} />
);

/* Cursor (momentum) + scroll signals written to CSS vars — feature 12 & 14 */
function useFieldSignals(root: RefObject<HTMLElement | null>, strip: RefObject<HTMLElement | null>) {
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
      const s = strip.current;
      if (s) {
        const r = s.getBoundingClientRect();
        const p = Math.min(Math.max(-r.top / (r.height - innerHeight), 0), 1);
        s.style.setProperty("--hp", p.toFixed(4));
      }
      raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move);
    raf = requestAnimationFrame(tick);
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [root, strip]);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cantilever — Wireframe Layout Study" },
      { name: "description", content: "A wordless wireframe: Syd Mead and Charles Schridde expressed through website layout alone." },
      { property: "og:title", content: "Cantilever — Wireframe Layout Study" },
      { property: "og:description", content: "Syd Mead and Charles Schridde expressed through website layout alone." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* Wireframe primitives: grey blocks stand in for content */
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
const Pill = ({ className = "" }: { className?: string }) => (
  <div className={`h-12 rounded-full bg-ink ${className}`} />
);

function Index() {
  const root = useRef<HTMLElement>(null);
  const strip = useRef<HTMLElement>(null);
  const [night, setNight] = useState(false);
  const [xray, setXray] = useState(false);
  const hold = useRef<number | undefined>(undefined);
  useFieldSignals(root, strip);

  return (
    <main
      ref={root}
      aria-label="Wireframe layout study"
      className={`field min-h-screen overflow-x-hidden bg-paper pb-0 ${night ? "night" : ""} ${xray ? "xray" : ""}`}
      /* hidden gesture (feature 8): press and hold anywhere to see through the plates */
      onPointerDown={() => { hold.current = window.setTimeout(() => setXray(true), 700); }}
      onPointerUp={() => { clearTimeout(hold.current); setXray(false); }}
      onPointerLeave={() => { clearTimeout(hold.current); setXray(false); }}
    >
      {/* preloader: a horizon line opens the world (feature 15) */}
      <div aria-hidden className="veil pointer-events-none fixed inset-0 z-50">
        <div className="veil-top absolute inset-x-0 top-0 h-1/2 bg-ink" />
        <div className="veil-bot absolute inset-x-0 bottom-0 h-1/2 bg-ink" />
        <div className="veil-line absolute left-0 top-1/2 h-px w-full bg-paper" />
      </div>
      {/* NAV — a long low beam cantilevered from the right edge; logo overhangs its free end */}
      <header className="relative h-28">
        <div className="absolute right-0 top-8 flex h-12 w-[72%] items-center justify-end gap-8 rounded-l-full border border-graphite/60 bg-graphite/15 pr-10">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-2 w-14 rounded-full bg-graphite/50" />)}
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
        <div className="absolute left-[22%] top-4 h-20 w-20 overflow-hidden rounded-full frame">
          <Plate src={observer.url} pos="55% 28%" className="scale-[2.2]" />
        </div>
      </header>

      {/* HERO — panoramic slab sitting low on a tilted horizon; headline hangs off the top-left, CTA pierces the right edge */}
      <section className="horizon relative h-[88vh]">
        <div className="absolute left-[6%] top-[14%] w-[44%] -rotate-[2deg]">
          <div className="space-y-3">
            <div className="h-10 w-full bg-ink" />
            <div className="ml-[18%] h-10 w-[82%] bg-ink" />
            <div className="ml-[36%] h-10 w-[50%] bg-ink" />
          </div>
          <Lines n={3} className="ml-[36%] mt-8 w-[50%]" />
        </div>
        <div className="absolute bottom-[10%] left-[-4%] h-[42%] w-[96%] -rotate-[2deg] overflow-hidden rounded-tr-[12rem] frame">
          <Plate src={singularity.url} pos="50% 62%" className="scale-110 drift" depth={2.5} />
        </div>
        <Pill className="absolute bottom-[34%] right-[2%] w-56 -rotate-[2deg]" />
        <div className="absolute bottom-[4%] left-0 h-px w-full -rotate-[2deg] bg-ink" />
      </section>

      {/* FEATURES — three long, low cards stepped out like cantilevered floors */}
      <section className="relative mx-auto max-w-7xl px-6 py-40">
        <Lines n={2} className="mb-16 ml-auto w-64" />
        <div className="space-y-14 [perspective:1400px]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex h-44 items-center gap-10 overflow-hidden border border-ink/80 bg-graphite/10 pl-0 pr-10 [transform:rotateY(-14deg)]"
              style={{ marginLeft: `${i * 14}%`, width: `${62 - i * 6}%` }}
            >
              <div className="relative h-full w-[45%] shrink-0 overflow-hidden frame-x">
                <Plate src={[waves.url, oracle.url, turning.url][i]!} pos={["30% 35%", "25% 35%", "45% 40%"][i]!} className="scale-150" />
              </div>
              <div className="h-16 w-16 shrink-0 rounded-full bg-ink" />
              <Lines n={3} className="min-w-0 flex-1" />
            </div>
          ))}
        </div>
      </section>

      {/* CORRIDOR — pinned while six cantilevered slivers slide past (feature 15) */}
      <section ref={strip} className="relative h-[320vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute left-0 top-[62%] h-px w-full bg-ink" />
          <div className="corridor absolute left-[10vw] top-0 flex h-full items-center gap-[8vw]">
            {[singularity, waves, oracle, observer, orders, turning].map((img, i) => (
              <div
                key={i}
                className="relative w-[26vw] shrink-0 overflow-hidden frame"
                style={{
                  height: `${[58, 34, 46, 70, 40, 52][i]}vh`,
                  transform: `translateY(${[-8, 10, -14, 0, 14, -4][i]}vh) skewY(${i % 2 ? 4 : -4}deg)`,
                  borderTopLeftRadius: i % 3 === 0 ? "10rem" : 0,
                  borderBottomRightRadius: i % 3 === 1 ? "10rem" : 0,
                }}
              >
                <Plate src={img.url} pos={["50% 60%", "35% 40%", "28% 40%", "50% 30%", "40% 45%", "45% 40%"][i]!} className="scale-[1.6]" depth={1 + i * 0.4} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE — sunken circular testimonial bowl beside a wide picture-window panel */}
      <section className="relative grid h-[100vh] grid-cols-12 gap-10 px-10">
        <div className="relative col-span-12 h-[55vh] self-start overflow-hidden frame md:col-span-8 md:mt-10">
          <Plate src={orders.url} pos="36% 45%" className="scale-[2]" />
        </div>
        <div className="relative col-span-12 md:col-span-4">
          <div className="absolute -left-[45%] top-[40%] grid aspect-square w-[130%] place-items-center rounded-full border border-graphite/60 bg-graphite/10">
            <div className="relative grid aspect-square w-[72%] place-items-center overflow-hidden rounded-full frame bg-graphite/15">
              <Plate src={observer.url} pos="50% 30%" className="scale-125 slow-spin" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA — a single streamlined capsule, deliberately off-axis */}
      <section className="relative h-[50vh]">
        <div className="absolute right-[12%] top-1/3 flex h-28 w-[48%] items-center justify-between rounded-full border border-graphite/60 bg-graphite/15 pl-12 pr-4">
          <Lines n={2} className="w-1/2" />
          <div className="h-20 w-20 shrink-0 rounded-full bg-ink" />
        </div>
      </section>

      {/* FOOTER — heavy ground slab; one column cantilevers up and out over the void */}
      <footer className="relative mt-24 h-64 bg-ink">
        <div className="absolute -top-24 left-[8%] h-40 w-[34%] overflow-hidden frame bg-paper">
          <Plate src={singularity.url} pos="0% 85%" className="scale-[1.8] origin-bottom-left" />
        </div>
        <div className="absolute bottom-10 right-8 flex gap-16">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-24 space-y-2">
              {[1, 2, 3].map((j) => <div key={j} className="h-2 rounded-full bg-graphite/60" />)}
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}
