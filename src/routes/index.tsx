import { createFileRoute } from "@tanstack/react-router";
import singularity from "@/assets/singularity.jpg.asset.json";
import oracle from "@/assets/oracle.webp.asset.json";
import waves from "@/assets/waves.webp.asset.json";
import observer from "@/assets/observer.png.asset.json";
import orders from "@/assets/orders.webp.asset.json";
import turning from "@/assets/turning.webp.asset.json";

/* Drawings sink into the paper: multiply blend, desaturated, cropped to their structures */
const Plate = ({ src, pos = "center", className = "" }: { src: string; pos?: string; className?: string }) => (
  <img src={src} alt="" loading="lazy" className={`plate absolute inset-0 h-full w-full object-cover ${className}`} style={{ objectPosition: pos }} />
);

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
  return (
    <main aria-label="Wireframe layout study" className="min-h-screen overflow-x-hidden bg-paper pb-0">
      {/* NAV — a long low beam cantilevered from the right edge; logo overhangs its free end */}
      <header className="relative h-28">
        <div className="absolute right-0 top-8 flex h-12 w-[72%] items-center justify-end gap-8 rounded-l-full border border-graphite/60 bg-graphite/15 pr-10">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-2 w-14 rounded-full bg-graphite/50" />)}
          <div className="h-8 w-28 rounded-full bg-ink" />
        </div>
        <div className="absolute left-[22%] top-4 h-20 w-20 overflow-hidden rounded-full border border-graphite/60">
          <Plate src={observer.url} pos="55% 28%" className="scale-[2.2]" />
        </div>
      </header>

      {/* HERO — panoramic slab sitting low on a tilted horizon; headline hangs off the top-left, CTA pierces the right edge */}
      <section className="relative h-[88vh]">
        <div className="absolute left-[6%] top-[14%] w-[44%] -rotate-[2deg]">
          <div className="space-y-3">
            <div className="h-10 w-full bg-ink" />
            <div className="ml-[18%] h-10 w-[82%] bg-ink" />
            <div className="ml-[36%] h-10 w-[50%] bg-ink" />
          </div>
          <Lines n={3} className="ml-[36%] mt-8 w-[50%]" />
        </div>
        <div className="absolute bottom-[10%] left-[-4%] h-[42%] w-[96%] -rotate-[2deg] overflow-hidden rounded-tr-[12rem] border border-graphite/60">
          <Plate src={singularity.url} pos="50% 62%" className="scale-110 drift" />
        </div>
        <Pill className="absolute bottom-[34%] right-[2%] w-56 -rotate-[2deg]" />
        <div className="absolute bottom-[4%] left-0 h-px w-full -rotate-[2deg] bg-ink" />
      </section>

      {/* FEATURES — three long, low cards stepped out like cantilevered floors */}
      <section className="relative mx-auto max-w-7xl px-6 py-28">
        <Lines n={2} className="mb-16 ml-auto w-64" />
        <div className="space-y-6 [perspective:1400px]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex h-44 items-center gap-8 overflow-hidden border border-graphite/60 bg-graphite/15 px-8 [transform:rotateY(-14deg)]"
              style={{ marginLeft: `${i * 14}%`, width: `${62 - i * 6}%` }}
            >
              <div className="relative h-full w-[45%] shrink-0 overflow-hidden border-x border-graphite/60">
                <Plate src={[waves.url, oracle.url, turning.url][i]} pos={["30% 35%", "25% 35%", "45% 40%"][i]} className="scale-150" />
              </div>
              <div className="h-16 w-16 shrink-0 rounded-full bg-ink" />
              <Lines n={3} className="min-w-0 flex-1" />
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE — sunken circular testimonial bowl beside a wide picture-window panel */}
      <section className="relative grid h-[90vh] grid-cols-12 gap-6 px-6">
        <div className="relative col-span-12 h-[55vh] self-start overflow-hidden border border-graphite/60 md:col-span-8 md:mt-10">
          <Plate src={orders.url} pos="40% 40%" className="scale-[1.6]" />
        </div>
        <div className="relative col-span-12 md:col-span-4">
          <div className="absolute -left-[45%] top-[40%] grid aspect-square w-[130%] place-items-center rounded-full border border-graphite/60 bg-graphite/10">
            <div className="relative grid aspect-square w-[72%] place-items-center overflow-hidden rounded-full border border-graphite/60 bg-graphite/15">
              <Plate src={observer.url} pos="50% 35%" className="scale-125 slow-spin" />
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
        <div className="absolute -top-24 left-[8%] h-40 w-[34%] overflow-hidden border border-graphite/60 bg-paper">
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
