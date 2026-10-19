<!-- Transcribed verbatim from the full text the owner pasted on 2026-10-19. Source: Lovable project knowledge doc, project 5ff133d2-aab2-429c-9db2-a9e274753fd1 ("Syd Mead Schridde inspired"). Where any other file disagrees with this one, this one wins. -->

# Convergence System — Master Design & Technical Knowledge

## Section 1: Explicit Design Inputs & Experiential Directives

### 1.1 Core Aesthetic & Spatial Directives
- **Philosophical Basis:** Synthesis of the design philosophies of Syd Mead and Charles Schridde.
- **Form Principles:** Weird and unusual perspectives, pronounced asymmetry, and unexpected structural angles.
- **Experiential Target:** The interface must feel alien, mystical, foreign, and otherworldly. Every section and page must invoke the sensation of navigating an unknown, highly structured foreign complex.
- **The "Mansion" Metaphor:** Used strictly as a metaphor for distinct spatial atmospheres across sections and pages while maintaining a cohesive design substrate. It is not literal residential architecture or room labeling.

### 1.2 Inviolable Negative Constraints
- **Zero Text:** No headlines, body copy, navigation labels, or typography. Content hierarchy is represented solely through geometric wireframe abstractions (Lines, Box, Pill).
- **Zero Color:** Strict monochrome palette (carbon ink, drafting paper, graphite mid-tone). No accent colors, branding hues, or chromatic gradients.
- **Layout-Driven Communication:** Spatial placement of basic web anatomy (navigation, hero, content containers, gallery, CTA, footer) is the primary vehicle for mood and hierarchy.
- **Diagram Integration:** Infographic plates (Singularity, Oracle, Waves, Observer, World Orders, Fourth Turning) are embedded directly into the substrate as analytical artifacts to anchor the alien aesthetic.

## Section 2: The Architectural Translation Engine

Every new page or variation must be built by processing standard website anatomy through these four core translation rules:

### Rule 1: Invert the 2D Web Grid into 3D Architectural Space
- **Standard Web Thinking:** Vertical stacks or centered multi-column rows (`grid-cols-3`, flex containers centered on the screen).
- **Architectural Translation:** Treat the viewport as a physical drafting elevation or spatial floorplan:
  - **Navigation:** Never a top bar. Translate into a cantilevered structural beam anchored to one viewport edge, with observation pods suspended off unsupported ends.
  - **Feature Cards:** Never a 3-column row. Translate into terraced floorplates receding into depth via perspective transforms (e.g., `rotateY(-14deg)` in a `[perspective:1400px]` field), stepped progressively inward.
  - **Testimonial / Social Proof:** Never an avatar and quote card. Translate into a sunken circular conversation pit embedded into the floor plane.

### Rule 2: Abstract Content into Pure Structural Mass (No Wireframe Clichés)
- **Standard Web Thinking:** Dummy text lines of equal length, placeholder lorem ipsum, or standard button rectangles.
- **Architectural Translation:**
  - **Headlines:** Staggered, heavy solid black slabs (`h-10`) with stepped horizontal proportions (e.g., 100%, 82%, 50%) establishing visual weight without type.
  - **Body Copy:** Stepped horizontal hairline bars diminishing at a mathematical ratio (`100% - i * 14%`).
  - **Interactive Triggers / CTAs:** Solid high-contrast circular or capsule silhouettes (`Pill`, solid discs) positioned off-axis.

### Rule 3: Treat Images as Structural Apertures, Not Content Photos
- **Standard Web Thinking:** Standard rectangular image cards with uniform corner radii.
- **Architectural Translation:**
  - **Hero Viewports:** Floor-to-ceiling or panoramic picture windows with radical asymmetric curves (e.g., `rounded-tr-[12rem]`), pierced by floating structural beams.
  - **Galleries:** Pinned horizontal transit corridors where vertical slivers with alternating skews and curved bulkheads slide past across a fixed datum line as the user scrolls.
  - **Focal Observatories:** Sunken circular oculi with continuous slow rotation (`.slow-spin`).

### Rule 4: Enforce Asymmetry, Tilted Horizons & Physical Gravity
- Avoid bilateral symmetry across all sections.
- Tilt horizon lines (-2° to -5°) to disrupt flat-screen expectations.
- Ground sections with heavy bedrock slabs (`bg-ink`) where upper structures physically cantilever and pierce upward across the boundary line.

## Section 3: Code-Confirmed Specifications (`src/routes/index.tsx` & `src/styles.css`)

### 3.1 Design Tokens & Substrate
Defined in `:root` and registered in `@theme inline`:
- `--ink: oklch(0.15 0 0)` (carbon structural black)
- `--paper: oklch(0.97 0 0)` (technical drafting substrate)
- `--graphite: oklch(0.6 0 0)` (neutral mid-tone for secondary fills)

### 3.2 Wireframe Primitives
- `Box`: `<div className="border border-graphite/60 bg-graphite/15" />`
- `Lines`: `<div className="space-y-2"><div className="h-2 rounded-full bg-graphite/40" style={{ width: `${100 - i * 14}%` }} /></div>`
- `Pill`: `<div className="h-12 rounded-full bg-ink" />`
- `Plate`: `<img className="plate parallax absolute inset-0 h-full w-full object-cover" style={{ objectPosition: pos, ["--d"]: depth }} />`

### 3.3 Image & Framing Classes
- **`.plate` (Substrate Blending):** `mix-blend-mode: multiply; filter: grayscale(1) contrast(1.6) brightness(1.08);`
- **`.frame` (Primary Boundary):**
  - Border: `1px solid var(--ink)`
  - Ghost outline: `outline: 1px solid color-mix(in oklab, var(--ink) 25%, transparent); outline-offset: 7px;`
  - Drop shadow: `box-shadow: 0 30px 60px -30px color-mix(in oklab, var(--ink) 50%, transparent);`
  - Inset vignette: `&::after { box-shadow: inset 0 0 70px 14px color-mix(in oklab, var(--ink) 45%, transparent); }`
- **`.frame-x` (Axial Boundary):**
  - Border: `border-inline: 1px solid var(--ink);`
  - Inset vignette: `&::after { box-shadow: inset 0 0 40px 8px color-mix(in oklab, var(--ink) 45%, transparent); }`

### 3.4 Telemetry, Interaction & Accessibility
- **Field Signals (`useFieldSignals` hook):**
  - `--mx`, `--my`: Eased mouse position relative to center (lerp factor: 0.06).
  - `--sy`: Vertical scroll depth (`min(scrollY / innerHeight, 1.5)`).
  - `--hp`: Horizontal corridor progress normalized between `0` and `1`.
- **Preloader (`.veil`):** Split-horizon curtain opening on mount (1.4s line scale, 1.2s curtain separation).
- **Inversion Modes:**
  - Day/Night (`.night`): `filter: invert(1)` across `<main>`.
  - X-Ray Diagnostic (`.xray`): Pointer hold (>700ms) toggles `mix-blend-mode: difference; filter: grayscale(1) contrast(2.2) invert(1)` on all `.plate` images.
- **Reduced Motion:** `@media (prefers-reduced-motion: reduce)` disables `.veil`, sets `.parallax { translate: none; }`, and sets `.horizon { transform: none; }`.

## Section 4: Scope & Chamber Architecture

### 4.1 Routes to Build (1 by 1)
1. **Convergence (`/`) — The Hub / Nexus**
2. **The Fourth Turning**
3. **Changing World Orders**
4. **Kondratiev Waves**
5. **Law of Accelerating Returns (LoAR)**
6. **The Technological Singularity**

### 4.2 Multi-Variation Rule
When creating alternative variations of any subject:
- Preserve the subject's thematic tension and the shared monochrome drafting substrate.
- Swap the architectural archetype completely (e.g., sunken amphitheater vs. linear gallery corridor vs. vertical plunge shaft vs. cantilever overhang vs. radial oculus) rather than merely adjusting padding or borders.
