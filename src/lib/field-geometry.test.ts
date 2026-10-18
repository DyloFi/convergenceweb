import { describe, expect, it } from "vitest";
import { DRONE_FREQUENCY, LOUPE_MAGNIFICATION, elevationPosition, louverProgress } from "./field-geometry";

describe("field instruments", () => {
  it("magnifies diagram linework by exactly 2.5x", () => expect(LOUPE_MAGNIFICATION).toBe(2.5));
  it("synthesizes the requested 55Hz drone", () => expect(DRONE_FREQUENCY).toBe(55));
  it("interpolates the reticle between actual section elevations", () => {
    expect(elevationPosition(750, [0, 500, 1000])).toBe(0.75);
    expect(elevationPosition(-100, [0, 500, 1000])).toBe(0);
    expect(elevationPosition(2000, [0, 500, 1000])).toBe(1);
  });
  it("opens louvers progressively as a viewport enters the screen", () => {
    expect(louverProgress(1000, 400, 1000)).toBe(0);
    expect(louverProgress(605, 400, 1000)).toBe(0.5);
    expect(louverProgress(0, 400, 1000)).toBe(1);
  });
});