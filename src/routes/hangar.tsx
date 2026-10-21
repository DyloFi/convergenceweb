import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import singularity from "@/assets/singularity.jpg.asset.json";
import oracle from "@/assets/oracle.webp.asset.json";
import waves from "@/assets/waves.webp.asset.json";
import observer from "@/assets/observer.png.asset.json";
import orders from "@/assets/orders.webp.asset.json";
import turning from "@/assets/turning.webp.asset.json";

export const Route = createFileRoute("/hangar")({
  head: () => ({
    meta: [
      { title: "Cantilever — The Hangar" },
      { name: "description", content: "A wordless wireframe: a vast vaulted hangar, docking bays and a streamlined craft, after Mead and Schridde." },
      { property: "og:title", content: "Cantilever — The Hangar" },
      { property: "og:description", content: "Vaulted hangar, docking bays and a streamlined craft — layout alone." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Hangar,
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

function Hangar() {
  const [night, setNight] = useState(false);
  const [xray, setXray] = useState(false);
  const hold = useRef<number | undefined>(undefined);

  return (
    <main
      aria-label="The Hangar layout study"
      className={`field min-h-screen overflow-x-clip bg-paper pb-24 ${night ? "night" : ""} ${xray ? "xray" : ""}`}
      onPointerDown={() => { hold.current = window.setTimeout(() => setXray(true), 700); }}
      onPointerUp={() => { clearTimeout(hold.current); setXray(false); }}
      onPointerLeave={() => { clearTimeout(hold.current); setXray(false); }}
    >
      {/* NAV — a gantry crane track across the top with a trolley carrying the toggle */}
      <header className="relative h-24">
        <div className="absolute inset-x-0 top-6 h-2 border-y border-ink" />
        {[8, 22, 36, 50, 64, 78, 92].map((l) => (
          <div key={l} className="absolute top-6 h-2 w-px bg-ink" style={{ left: `${l}%` }} />
        ))}
        <div className="absolute left-[62%] top-8 flex flex-col items-center">
          <div className="h-6 w-px bg-ink" />
          <button
            type="button"
            aria-label="Switch between day and night"
            aria-pressed={night}
            onClick={() => setNight((n) => !n)}
            className="relative h-7 w-20 rounded-full bg-ink"
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-paper transition-all duration-700 ${night ? "left-[3.5rem]" : "left-1"}`} />
          </button>
        </div>
        <div className="absolute left-[10%] top-12 h-2 w-14 rounded-full bg-graphite/50" />
        <div className="absolute left-[18%] top-12 h-2 w-8 rounded-full bg-graphite/50" />
      </header>

      {/* HERO — a giant parabolic vault opening; a streamlined craft noses out of it */}
      <section className="relative h-[90vh]">
        <div className="absolute bottom-0 left-[8%] h-[86%] w-[70%] overflow-hidden rounded-t-[50%] frame">
          <Plate src={singularity.url} pos="50% 55%" className="scale-[1.3] drift" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="absolute bottom-0 rounded-t-[50%] border border-ink/40" style={{ left: `${8 + i * 6}%`, width: `${70 - i * 12}%`, height: `${86 - i * 14}%` }} />
        ))}
        <div className="absolute bottom-[14%] left-[46%] h-16 w-[50%] rounded-l-full rounded-r-[30%] border border-ink bg-paper shadow-[0_30px_40px_-24px_var(--ink)]">
          <div className="absolute left-[12%] top-1/2 h-px w-[70%] bg-ink/60" />
          <div className="absolute right-[18%] top-3 h-4 w-16 rounded-full bg-ink" />
        </div>
        <div className="absolute right-[4%] top-[12%] w-[26%] space-y-3">
          <div className="h-8 w-full bg-ink" />
          <div className="ml-auto h-8 w-[60%] bg-ink" />
          <Lines n={3} className="mt-6" />
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-full bg-ink" />
      </section>

      {/* BAYS — a row of numbered docking bays, doors at different heights */}
      <section className="relative px-6 py-32">
        <div className="grid grid-cols-5 items-end gap-3">
          {[waves, oracle, observer, orders, turning].map((img, i) => (
            <div key={i} className="relative h-[46vh] border-x border-t border-ink">
              <div className="absolute inset-x-0 bottom-0 overflow-hidden frame" style={{ height: `${[70, 40, 85, 55, 30][i]}%` }}>
                <Plate src={img.url} pos={["35% 40%", "28% 40%", "50% 30%", "36% 45%", "45% 40%"][i]!} className="scale-[1.8]" />
              </div>
              <div className="absolute left-2 top-2 h-1.5 w-6 rounded-full bg-ink" />
            </div>
          ))}
        </div>
        <div className="mt-0 h-3 w-full bg-ink" />
        <Lines n={2} className="ml-auto mt-10 w-72" />
      </section>

      {/* RUNWAY — converging lines rushing to a horizon, a pill launches off it */}
      <section className="relative h-[70vh] overflow-hidden [perspective:600px]">
        <div className="absolute inset-x-[-30%] bottom-0 h-[80%] origin-bottom [transform:rotateX(68deg)] speed-lines opacity-40" />
        <div className="absolute left-1/2 top-[20%] h-px w-[60%] -translate-x-1/2 bg-ink" />
        <div className="absolute right-[18%] top-[12%] h-12 w-56 -rotate-[8deg] rounded-full bg-ink" />
      </section>

      {/* FOOTER — hangar floor slab with a sliding door left half-open */}
      <footer className="relative mt-10 h-48 bg-ink">
        <div className="absolute -top-16 left-[10%] h-16 w-[40%] border border-ink bg-paper" />
        <div className="absolute -top-16 left-[30%] h-16 w-[40%] border border-ink bg-graphite/30" />
        <div className="absolute bottom-10 right-10 flex gap-12">
          {[0, 1, 2].map((i) => <div key={i} className="w-20 space-y-2">{[1, 2, 3].map((j) => <div key={j} className="h-2 rounded-full bg-graphite/60" />)}</div>)}
        </div>
      </footer>
    </main>
  );
}
