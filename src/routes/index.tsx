import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Silent Horizon — Pure Layout Study" },
      { name: "description", content: "A wordless, colourless layout study after Syd Mead and Charles Schridde." },
      { property: "og:title", content: "Silent Horizon — Pure Layout Study" },
      { property: "og:description", content: "A wordless, colourless layout study after Syd Mead and Charles Schridde." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const towers = [38, 62, 48, 88, 54, 100, 70, 44, 80, 58, 34, 66];

function Index() {
  return (
    <main aria-label="Layout study" className="min-h-screen overflow-x-hidden bg-paper">
      {/* 1 — Tilted horizon: cantilever over the void, capsule gliding beneath */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-x-[-20%] bottom-[-30%] h-[75%] origin-top floor-grid opacity-30 [transform:perspective(600px)_rotateX(68deg)_rotate(-4deg)]" />
        <div className="absolute left-[-10%] top-[56%] h-px w-[130%] -rotate-[4deg] bg-ink" />
        {/* cliff */}
        <div className="absolute left-0 top-[18%] h-[90%] w-[26%] bg-ink [clip-path:polygon(0_0,70%_0,100%_18%,82%_45%,94%_70%,60%_100%,0_100%)]" />
        {/* cantilevered house */}
        <div className="absolute left-[14%] top-[20%] h-[13%] w-[58%] -rotate-[4deg] border-[3px] border-ink">
          <div className="grid h-full grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="border-r border-ink last:border-r-0" />)}
          </div>
          <div className="absolute -bottom-6 left-0 h-6 w-full bg-ink [clip-path:polygon(0_0,100%_0,96%_100%,0_100%)]" />
        </div>
        {/* single support strut */}
        <div className="absolute left-[24%] top-[36%] h-[24%] w-[3px] origin-top rotate-[22deg] bg-ink" />
        {/* streamlined vehicle */}
        <div className="absolute right-[6%] top-[64%] h-14 w-[38%] -rotate-[9deg]">
          <div className="h-full w-full rounded-[100%_40%_40%_100%/100%_60%_60%_100%] bg-ink" />
          <div className="absolute left-[30%] top-[-45%] h-[70%] w-[30%] rounded-t-full border-[3px] border-b-0 border-ink" />
          <div className="absolute right-[100%] top-1/2 h-[2px] w-[70%] bg-ink" />
          <div className="absolute right-[100%] top-[25%] h-px w-[40%] bg-ink" />
          <div className="absolute right-[100%] top-[75%] h-px w-[55%] bg-ink" />
        </div>
        {/* setting sun as an outline */}
        <div className="absolute right-[20%] top-[38%] h-40 w-40 rounded-full border-[3px] border-ink [clip-path:inset(0_0_50%_0)] -rotate-[4deg]" />
      </section>

      {/* 2 — Asymmetric cantilevered stair */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-40">
        <div className="col-span-12 space-y-8 md:col-span-6 md:col-start-2">
          {[70, 90, 55, 100, 40].map((w, i) => (
            <div key={i} className="relative h-10 bg-ink" style={{ width: `${w}%`, marginLeft: `${i * 9}%` }}>
              <div className="absolute -bottom-3 right-0 h-3 w-1/3 bg-graphite" />
            </div>
          ))}
        </div>
        <div className="relative col-span-12 mt-24 h-[60vh] md:col-span-4 md:col-start-9 md:mt-0">
          <div className="absolute inset-0 -skew-y-6 rounded-tl-[10rem] border-[3px] border-ink" />
          <div className="absolute inset-[15%] -skew-y-6 rounded-tl-[6rem] bg-ink" />
        </div>
      </section>

      {/* 3 — Sunken lounge seen from above, picture window beyond */}
      <section className="relative h-[110vh] overflow-hidden">
        <div className="absolute left-[8%] right-[30%] top-[6%] h-[34%] border-[3px] border-ink">
          <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-[2%] px-[4%]">
            {towers.map((h, i) => (
              <div key={i} className="flex-1 bg-ink [clip-path:polygon(15%_0,85%_0,100%_100%,0_100%)]" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="absolute inset-x-0 top-[55%] h-[2px] bg-paper" />
        </div>
        <div className="absolute left-1/2 top-[66%] h-[90vh] w-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-full rings [transform:translate(-50%,-50%)_perspective(900px)_rotateX(60deg)]" />
        <div className="absolute left-1/2 top-[66%] h-24 w-56 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-ink" />
      </section>

      {/* 4 — Diagonal speed band */}
      <section className="relative my-24 h-40 -rotate-3 speed-lines [mask-image:linear-gradient(90deg,transparent,black_30%,black_70%,transparent)]" />

      {/* 5 — Off-centre arrival: skyline + single capsule button shape */}
      <section className="relative h-[80vh]">
        <div className="absolute bottom-0 left-0 flex h-[70%] w-[55%] items-end gap-2 pl-6">
          {towers.slice().reverse().map((h, i) => (
            <div key={i} className="flex-1 bg-ink" style={{ height: `${h}%`, borderTopLeftRadius: i % 3 === 0 ? "999px" : 0 }} />
          ))}
        </div>
        <div className="absolute right-[10%] top-[30%] h-20 w-80 translate-x-8 rounded-full border-[3px] border-ink">
          <div className="absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-ink" />
        </div>
        <div className="absolute right-[10%] top-[30%] mt-32 h-[3px] w-[40%] bg-ink" />
      </section>
    </main>
  );
}
