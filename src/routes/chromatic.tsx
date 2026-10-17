import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import interior from "@/assets/interior.jpg";

export const Route = createFileRoute("/chromatic")({
  head: () => ({
    meta: [
      { title: "Horizon Dynamics — Tomorrow, Cantilevered" },
      { name: "description", content: "A retro-futurist mockup inspired by Syd Mead and Charles Schridde." },
      { property: "og:title", content: "Horizon Dynamics — Tomorrow, Cantilevered" },
      { property: "og:description", content: "A retro-futurist mockup inspired by Syd Mead and Charles Schridde." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const specs: [string, string, string][] = [
  ["01", "Habitat", "Living rooms that hang over the void, held by a single beam of faith and steel."],
  ["02", "Transit", "Vehicles drawn as one continuous line — chrome skin, no seams, no apology."],
  ["03", "Signal", "The whole household, tuned to the same warm frequency at dusk."],
];

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Off-axis nav */}
      <header className="fixed left-0 top-0 z-30 flex w-full items-start justify-between px-6 py-5 mix-blend-difference">
        <span className="font-display text-xs tracking-[0.5em] text-chrome">HORIZON/DYN</span>
        <nav className="flex -rotate-90 origin-top-right translate-y-24 gap-8 font-display text-[10px] tracking-[0.4em] text-chrome">
          <a href="#habitat">HABITAT</a>
          <a href="#vision">VISION</a>
          <a href="#contact">ARRIVE</a>
        </nav>
      </header>

      {/* Hero: tilted horizon */}
      <section className="relative h-[110vh]">
        <div className="absolute -left-[5%] top-[8vh] h-[80vh] w-[95%] -rotate-[4deg] overflow-hidden shadow-glow clip-wedge">
          <img src={hero} alt="Cantilevered house above a desert at sunset" className="h-full w-full scale-110 rotate-[4deg] object-cover" />
          <div className="absolute inset-0 bg-sunset-veil" />
        </div>
        <div className="absolute bottom-[6vh] right-[4%] max-w-xl text-right">
          <p className="font-serif text-2xl italic text-sunset">a residence, a vehicle, a horizon —</p>
          <h1 className="font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.85] tracking-tight">
            TOMORROW<br /><span className="pl-[20%] text-chrome-grad">CANTI</span><br /><span className="text-sunset">LEVERED</span>
          </h1>
        </div>
        <div className="absolute left-[6%] bottom-[10vh] w-40 border-t border-sunset pt-3 font-display text-[10px] leading-relaxed tracking-[0.3em] text-muted-foreground">
          FIG. 1 — ELEV. 2,140 FT<br />LAT 33.8° / DUSK
        </div>
      </section>

      {/* Asymmetric spec grid */}
      <section id="habitat" className="relative mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-32">
        <div className="col-span-12 md:col-span-5 md:col-start-2 md:mt-40">
          <span className="font-display text-xs tracking-[0.5em] text-teal">PROGRAM</span>
          <h2 className="mt-4 font-serif text-5xl italic leading-tight md:text-6xl">
            Design is the art of imagining the <span className="text-sunset">probable</span>.
          </h2>
          <div className="mt-16 space-y-10">
            {specs.map(([n, t, d], i) => (
              <div key={n} className="flex gap-6 border-l-2 border-sunset/60 pl-6" style={{ marginLeft: `${i * 3}rem` }}>
                <span className="font-display text-3xl text-chrome-grad">{n}</span>
                <div>
                  <h3 className="font-display text-sm tracking-[0.3em]">{t.toUpperCase()}</h3>
                  <p className="mt-2 max-w-xs text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative col-span-12 md:col-span-5 md:col-start-8">
          <div className="skew-y-[-6deg] overflow-hidden rounded-tl-[8rem] shadow-glow">
            <img src={interior} alt="Sunken lounge overlooking a neon city" className="h-[80vh] w-full skew-y-[6deg] scale-110 object-cover" />
          </div>
          <div className="absolute -bottom-10 -left-16 rotate-[-8deg] bg-sunset px-6 py-4 font-display text-xs tracking-[0.3em] text-background">
            THE SUNKEN LOUNGE · MODEL 64
          </div>
        </div>
      </section>

      {/* Diagonal band */}
      <section id="vision" className="relative my-20 -rotate-3 bg-chrome-band py-16">
        <div className="flex animate-none gap-16 whitespace-nowrap font-display text-[clamp(2rem,6vw,5rem)] tracking-tight text-background">
          <span>STREAMLINE</span><span className="font-serif italic">✦</span><span>CANTILEVER</span><span className="font-serif italic">✦</span><span>HORIZON</span><span className="font-serif italic">✦</span><span>CHROME</span>
        </div>
      </section>

      {/* Off-center CTA */}
      <section id="contact" className="relative px-6 py-40">
        <div className="ml-auto mr-[8%] max-w-2xl md:translate-x-12">
          <span className="font-display text-xs tracking-[0.5em] text-teal">ARRIVAL</span>
          <h2 className="mt-4 font-display text-5xl leading-none md:text-7xl">
            Your house<br /><span className="font-serif italic text-sunset">already</span> lives<br />in the future.
          </h2>
          <a href="#" className="mt-12 inline-flex items-center gap-4 rounded-full border border-sunset px-10 py-5 font-display text-xs tracking-[0.4em] transition hover:bg-sunset hover:text-background">
            RESERVE A HORIZON →
          </a>
        </div>
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-sun opacity-70 blur-[2px]" />
      </section>

      <footer className="flex justify-between border-t border-border px-6 py-6 font-display text-[10px] tracking-[0.4em] text-muted-foreground">
        <span>© 1964 / 2026</span><span>AFTER MEAD & SCHRIDDE</span>
      </footer>
    </main>
  );
}
