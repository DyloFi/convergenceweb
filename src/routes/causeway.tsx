import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import singularity from "@/assets/singularity.jpg.asset.json";
import oracle from "@/assets/oracle.webp.asset.json";
import waves from "@/assets/waves.webp.asset.json";
import observer from "@/assets/observer.png.asset.json";
import orders from "@/assets/orders.webp.asset.json";
import turning from "@/assets/turning.webp.asset.json";

export const Route = createFileRoute("/causeway")({
  head: () => ({
    meta: [
      { title: "Cantilever — The Causeway" },
      { name: "description", content: "A wordless wireframe: a long elevated causeway of slabs, bridges and terraces in the spirit of Mead and Schridde." },
      { property: "og:title", content: "Cantilever — The Causeway" },
      { property: "og:description", content: "Elevated slabs, bridges and terraces — expressed through layout alone." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Causeway,
});

const Plate = ({ src, pos = "center", className = "" }: { src: string; pos?: string; className?: string }) => (
  <img src={src} alt="" loading="lazy" className={`plate absolute inset-0 h-full w-full object-cover ${className}`} style={{ objectPosition: pos }} />
);
const Lines = ({ n = 3, className = "" }: { n?: number; className?: string }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className="h-2 rounded-full bg-graphite/40" style={{ width: `${100 - i * 14}%` }} />
    ))}
  </div>
);

function Causeway() {
  const [night, setNight] = useState(false);
  const [xray, setXray] = useState(false);
  let hold: number | undefined;

  return (
    <main
      aria-label="The Causeway layout study"
      className={`field min-h-screen overflow-x-clip bg-paper pb-24 ${night ? "night" : ""} ${xray ? "xray" : ""}`}
      onPointerDown={() => { hold = window.setTimeout(() => setXray(true), 700); }}
      onPointerUp={() => { clearTimeout(hold); setXray(false); }}
      onPointerLeave={() => { clearTimeout(hold); setXray(false); }}
    >
      {/* NAV — a thin bridge spanning between two piers, dipping in the middle */}
      <header className="relative h-28">
        <div className="absolute left-[4%] top-4 h-20 w-3 bg-ink" />
        <div className="absolute right-[4%] top-4 h-20 w-3 bg-ink" />
        <div className="absolute left-[4%] right-[4%] top-10 flex h-10 items-center justify-center gap-6 border-y border-ink/70 bg-graphite/10 [clip-path:polygon(0_0,50%_30%,100%_0,100%_100%,50%_100%,0_100%)]">
          <div className="h-2 w-12 rounded-full bg-graphite/50" />
          <div className="h-2 w-8 rounded-full bg-graphite/50" />
          <button
            type="button"
            aria-label="Switch between day and night"
            aria-pressed={night}
            onClick={() => setNight((n) => !n)}
            className="relative h-6 w-20 rounded-full bg-ink"
          >
            <span className={`absolute top-1 h-4 w-4 rounded-full bg-paper transition-all duration-700 ${night ? "left-[3.75rem]" : "left-1"}`} />
          </button>
        </div>
      </header>

      {/* HERO — an ultra-wide letterbox slab on a low causeway; headline sits UNDER the deck */}
      <section className="relative h-[80vh]">
        <div className="absolute left-0 right-[-10%] top-[12%] h-[34%] overflow-hidden frame [clip-path:polygon(0_0,100%_0,100%_100%,6%_100%)]">
          <Plate src={waves.url} pos="40% 38%" className="scale-[1.4]" />
        </div>
        <div className="absolute left-0 right-0 top-[48%] h-3 bg-ink" />
        {[10, 30, 50, 70, 90].map((l) => (
          <div key={l} className="absolute top-[48%] h-[30%] w-px bg-ink" style={{ left: `${l}%` }} />
        ))}
        <div className="absolute right-[8%] top-[56%] w-[46%] space-y-3">
          <div className="h-8 w-full bg-ink" />
          <div className="h-8 w-[70%] bg-ink" />
          <Lines n={2} className="mt-6 w-[60%]" />
        </div>
        <div className="absolute bottom-[8%] left-[6%] h-12 w-48 rounded-full bg-ink" />
      </section>

      {/* TERRACES — slabs descend a hillside, each pushed further right */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        {[observer, orders, turning].map((img, i) => (
          <div key={i} className="relative mb-6 flex items-end" style={{ marginLeft: `${i * 16}%` }}>
            <div className="relative h-36 w-[56%] overflow-hidden frame rounded-tl-[6rem]">
              <Plate src={img.url} pos={["50% 30%", "36% 45%", "45% 40%"][i]!} className="scale-[1.8]" />
            </div>
            <div className="mb-4 ml-6 min-w-0 flex-1"><Lines n={3} /></div>
            <div className="absolute -bottom-6 left-0 h-6 w-[80%] border-b border-l border-ink/70" />
          </div>
        ))}
      </section>

      {/* SKYBRIDGE — two towers joined by a long glazed span */}
      <section className="relative h-[70vh]">
        <div className="absolute bottom-0 left-[6%] h-[90%] w-[18%] overflow-hidden frame">
          <Plate src={oracle.url} pos="25% 35%" className="scale-[1.6]" />
        </div>
        <div className="absolute bottom-0 right-[8%] h-[64%] w-[14%] overflow-hidden frame">
          <Plate src={singularity.url} pos="50% 60%" className="scale-[1.6]" />
        </div>
        <div className="absolute left-[24%] right-[22%] top-[38%] flex h-14 items-center justify-around border border-ink bg-graphite/15">
          {Array.from({ length: 9 }).map((_, i) => <div key={i} className="h-8 w-px bg-ink/60" />)}
        </div>
      </section>

      {/* FOOTER — a low quay; one slab juts out over the water */}
      <footer className="relative mt-16 h-40 border-t-4 border-ink">
        <div className="absolute -top-10 right-0 h-10 w-[40%] bg-ink" />
        <div className="absolute bottom-8 left-[30%] flex gap-12">
          {[0, 1, 2].map((i) => <Lines key={i} n={3} className="w-20" />)}
        </div>
      </footer>
    </main>
  );
}
