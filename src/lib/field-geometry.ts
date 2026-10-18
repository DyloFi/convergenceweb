export const LOUPE_MAGNIFICATION = 2.5;
export const DRONE_FREQUENCY = 55;
export const FIELD_LEVELS = [
  { id: "observation", label: "Observation deck" },
  { id: "terraces", label: "Stepped terraces" },
  { id: "corridor", label: "Sliding corridor" },
  { id: "bowl", label: "Sunken bowl" },
  { id: "arrival", label: "Lower cantilever" },
  { id: "void", label: "Footer void" },
] as const;

export function elevationPosition(scroll: number, tops: number[]) {
  if (tops.length < 2) return 0;
  const last = tops.at(-1);
  if (last !== undefined && scroll >= last) return 1;
  for (let i = 0; i < tops.length - 1; i++) {
    const start = tops[i];
    const end = tops[i + 1];
    if (start === undefined || end === undefined) continue;
    if (scroll <= end) {
      const distance = end - start;
      return (i + Math.max(0, Math.min(1, (scroll - start) / Math.max(1, distance)))) / (tops.length - 1);
    }
  }
  return 1;
}

export function louverProgress(top: number, height: number, viewport: number) {
  return Math.max(0, Math.min(1, (viewport - top) / (viewport * 0.65 + height * 0.35)));
}