import { useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { FIELD_LEVELS, LOUPE_MAGNIFICATION } from "@/lib/field-geometry";

export function DiagramPlate({ src, pos = "center", className = "", depth = 1 }: { src: string; pos?: string; className?: string; depth?: number }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [inspection, setInspection] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const imageStyle = { objectPosition: pos, "--d": depth } as CSSProperties;
  const imageClass = `plate parallax absolute inset-0 h-full w-full object-cover ${className}`;
  return (
    <div ref={viewport} className="diagram-viewport absolute inset-0" onPointerMove={(event) => {
      if (event.pointerType === "touch") return;
      const element = viewport.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      setInspection({ x: (event.clientX - rect.left) * element.clientWidth / rect.width, y: (event.clientY - rect.top) * element.clientHeight / rect.height, width: element.clientWidth, height: element.clientHeight });
    }} onPointerLeave={() => setInspection(null)}>
      <img src={src} alt="" loading="lazy" className={imageClass} style={imageStyle} />
      <div aria-hidden="true" className="solar-louvers">
        {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ "--fin": i } as CSSProperties} />)}
      </div>
      {inspection && <div aria-hidden="true" className="diagram-loupe" data-magnification={LOUPE_MAGNIFICATION} style={{ left: inspection.x, top: inspection.y }}>
        <div className="loupe-optics" style={{ width: inspection.width, height: inspection.height, left: 64 - inspection.x, top: 64 - inspection.y, transform: `scale(${LOUPE_MAGNIFICATION})`, transformOrigin: `${inspection.x}px ${inspection.y}px` }}>
          <img src={src} alt="" className={imageClass} style={imageStyle} />
        </div>
        <span className="loupe-crosshair" />
      </div>}
    </div>
  );
}

export function ElevationRadar({ servo }: { servo: () => void }) {
  return <nav aria-label="Spatial elevation navigation" className="elevation-radar">
    <svg aria-hidden="true" className="elevation-section" viewBox="0 0 64 280" fill="none">
      <path d="M48 6V274M48 14H10V26H38V62H18V74H32V110H6V122H38V158H22V170H36V206H12V218H44V266H4" />
      <path className="radar-projection" d="M4 14H60M4 62H60M4 110H60M4 158H60M4 206H60M4 266H60" />
    </svg>
    <span aria-hidden="true" className="elevation-reticle" />
    {FIELD_LEVELS.map((level, i) => <Button key={level.id} variant="ghost" size="icon" className="radar-level" aria-label={`Navigate to ${level.label}`} style={{ top: `${5 + i * 18}%` }} onClick={() => {
      servo();
      document.getElementById(level.id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    }}><span aria-hidden="true" /></Button>)}
  </nav>;
}

export function DraftingOverlay() {
  return <div aria-hidden="true" className="drafting-overlay pointer-events-none fixed inset-0 z-20">
    <svg viewBox="0 0 1440 1000" preserveAspectRatio="none" fill="none">
      <g className="perspective-rays">
        {[0, 130, 280, 430, 610, 820, 1000].map((y) => <path key={y} d={`M-240 340L1560 ${y}`} />)}
        <path d="M-240 340L900 -120M-240 340L480 1120" />
      </g>
      <g className="dimension-guides">
        <path d="M86 110V850M78 110H94M78 850H94M350 870H1320M350 862V878M1320 862V878M1010 110V760M1002 110H1018M1002 760H1018" />
        <path d="M60 470H1380M370 70V930" strokeDasharray="3 11" />
        <circle cx="370" cy="470" r="12" /><path d="M348 470H392M370 448V492" />
      </g>
    </svg>
  </div>;
}