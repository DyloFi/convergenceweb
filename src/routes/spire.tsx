import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import singularity from "@/assets/singularity.jpg.asset.json";
import oracle from "@/assets/oracle.webp.asset.json";
import waves from "@/assets/waves.webp.asset.json";
import observer from "@/assets/observer.png.asset.json";
import orders from "@/assets/orders.webp.asset.json";
import turning from "@/assets/turning.webp.asset.json";

export const Route = createFileRoute("/spire")({
  head: () => ({
    meta: [
      { title: "Cantilever — The Spire" },
      { name: "description", content: "A wordless wireframe: a needle tower with orbiting rings and spiralling floors, after Mead and Schridde." },
      { property: "og:title", content: "Cantilever — The Spire" },
      { property: "og:description", content: "A needle tower, orbiting rings and spiralling floors — layout alone." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Spire,
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

function Spire() {
  const [night, setNight] = useState(false);
  const [xray, setXray] = useState(false);
  const hold = useRef<number | undefined>(undefined);
  const floors = [observer, waves, oracle, orders, turning, singularity];

  return (
    <main
      aria-label="The Spire layout study"
      className={`field min-h-screen overflow-x-clip bg-paper pb-24 ${night ? "night" : ""} ${xray ? "xray" : ""}`}
      onPointerDown={() => { hold.current = window.setTimeout(() => setXray(true), 700); }}
      onPointerUp={() => { clearTimeout(hold.current); setXray(false); }}
      onPointerLeave={() => { clearTimeout(hold.current); setXray(false); }}
    >
      {/* NAV — a vertical mast on the right; menu bars hang off it like antenna arms */}
      <header className="pointer-events-none absolute right-6 top-0 z-30 flex h-72 w-px flex-col items-end gap-6 bg-ink pt-10">
        <div className="mr-px h-2 w-16 rounded-l-full bg-graphite/60" />
        <div className="mr-px h-2 w-10 rounded-l-full bg-graphite/60" />
        <button
          type="button"
          aria-label="Switch between day and night"
          aria-pressed={night}
          onClick={() => setNight((n) => !n)}
          className="pointer-events-auto relative -mr-3 h-16 w-7 rounded-full bg-ink"
        >
          <span className={`absolute left-1 h-5 w-5 rounded-full bg-paper transition-all duration-700 ${night ? "top-10" : "top-1"}`} />
        </button>
      </header>

      {/* HERO — a needle spire rising off-centre, pierced by a tilted orbital ring */}
      <section className="relative h-[110vh]">
        <div className="absolute bottom-0 left-[34%] h-[92%] w-[12%] overflow-hidden frame [clip-path:polygon(50%_0,100%_14%,100%_100%,0_100%,0_14%)]">
          <Plate src={turning.url} pos="45% 40%" className="scale-[1.6]" />
        </div>
        <div className="absolute left-[14%] top-[34%] h-[18%] w-[52%] -rotate-[12deg] rounded-[50%] border-2 border-ink" />
        <div className="absolute left-[20%] top-[38%] h-[10%] w-[40%] -rotate-[12deg] rounded-[50%] border border-graphite/70" />
        <div className="absolute left-[54%] top-[58%] w-[38%] space-y-3">
          <div className="h-9 w-full bg-ink" />
          <div className="h-9 w-[64%] bg-ink" />
          <Lines n={3} className="mt-6 w-[70%]" />
        </div>
        <div className="absolute bottom-0 left-0 h-px w-full bg-ink" />
      </section>

      {/* SPIRAL — floors corkscrew down the page, alternating sides and shrinking */}
      <section className="relative mx-auto max-w-6xl px-6 py-32">
        <div className="absolute bottom-0 left-1/2 top-0 w-px bg-ink/50" />
        {floors.map((img, i) => {
          const left = i % 2 === 0;
          return (
            <div key={i} className={`relative mb-16 flex items-center gap-6 ${left ? "" : "flex-row-reverse"}`} style={{ paddingInline: `${i * 3}%` }}>
              <div
                className="relative h-40 w-[46%] shrink-0 overflow-hidden frame"
                style={{ transform: `rotate(${left ? -3 : 3}deg)`, borderRadius: left ? "0 8rem 0 0" : "8rem 0 0 0" }}
              >
                <Plate src={img.url} pos={["50% 30%", "35% 40%", "28% 40%", "36% 45%", "45% 40%", "50% 60%"][i]!} className="scale-[1.8]" />
              </div>
              <div className="h-3 w-3 shrink-0 rotate-45 bg-ink" />
              <Lines n={2} className="min-w-0 flex-1" />
            </div>
          );
        })}
      </section>

      {/* ORBIT — concentric rings with satellites caught mid-path */}
      <section className="relative grid h-[90vh] place-items-center">
        {[90, 66, 42].map((s, i) => (
          <div key={s} className="absolute aspect-square rounded-full border border-ink/60" style={{ width: `min(${s}vw, ${s}vh)`, transform: `rotateX(62deg) rotateZ(${i * 18}deg)` }} />
        ))}
        <div className="relative aspect-square w-[min(28vw,28vh)] overflow-hidden rounded-full frame">
          <Plate src={observer.url} pos="50% 30%" className="scale-125 slow-spin" />
        </div>
        <div className="absolute left-[12%] top-[30%] h-6 w-6 rounded-full bg-ink" />
        <div className="absolute bottom-[26%] right-[16%] h-4 w-4 rounded-full bg-ink" />
      </section>

      {/* FOOTER — a cleft base: the slab splits and the spire's foot plunges through */}
      <footer className="relative mt-16 flex h-48">
        <div className="h-full w-[44%] bg-ink" />
        <div className="relative w-[12%]"><div className="absolute -top-24 inset-x-[30%] bottom-0 bg-ink" /></div>
        <div className="mt-10 h-[calc(100%-2.5rem)] flex-1 bg-ink" />
      </footer>
    </main>
  );
}
