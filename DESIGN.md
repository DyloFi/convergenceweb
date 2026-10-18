# DESIGN.md: Convergence

Read this before changing anything. If a change breaks a rule here, don't make it.

## 1. Shared core (applies to every page, never changes)

### Intent
A site designed through the philosophy of Syd Mead and Charles Schridde: strange perspectives, asymmetry, structures that hang over edges, a horizon that is never level. The mood comes from layout and motion. It is quiet and alien, familiar but never decorative.

### Always
- Nothing is centred or level. Asymmetry and tilt are the structure.
- The positions of basic web parts (nav, hero, content, footer) carry the design.
- Artwork is the Convergence drawings, shown in pure black and white, printed into the paper with a thin outline and a faint floating border.
- Fonts are Michroma, Instrument Serif and IBM Plex Sans Condensed. A new font needs the owner's approval.
- Motion is CSS or the small existing animation loop. No heavy libraries without the owner's approval.
- Shared behaviours: horizon-line opening reveal, day/night negative from the menu pill, cursor drift, and the hidden 700ms hold-to-x-ray. Nothing hints that the hold exists. Reduced-motion users get no reveal, drift or tilt.

### Phase 1 (current baseline)
- No colour: off-white paper, black and grey.
- No words: Lines, Pill and Box bars stand in for text.
- Only the six existing drawings.
- /chromatic stays archived and separate.
- These restraints were a method for finding the feel. They are not the feel itself.

### When content arrives
- Real text goes into the same blocks. Bars become headlines and paragraphs at the same widths, offsets and angles. The layout dictates the type, and the copy never reflows the layout.
- New images and data visuals follow the drawings' treatment.
- Colour stays out unless the owner decides otherwise. If added, it is one deliberate accent, never a palette.
- Layout beats content. Never centre things or add card grids to make content "readable".

## 2. The reference: Cantilever
- The existing home page is the benchmark for how strange the site should feel. It is frozen at the tag baseline-2026-10-18.
- It is not declared the hub or the front door. Nothing links to it as a requirement.
- Anatomy: beam menu, terraced hero, stepped cards, sliding corridor, picture window and round lounge, off-centre pill, footer with a column jutting out.

## 3. Explorations (one page per subject, each with its own physical law)
Each gets its own route and is built on a branch. The home page is not touched.

- The Fourth Turning (/fourth-turning): centripetal compression. Nav is a perimeter frame. Content steps inward in concentric tiers toward a central pit. Concentric hexagons and polygonal rings. Scroll descends inward.
- Changing World Orders (/world-orders): tectonic shear. Nav is a heavy diagonal beam down the left flank. Two opposing masses lean toward each other across an off-centre hairline trench, and the dominant side swaps partway down. 30 and 60 degree Mead cuts, split viewports that don't line up.
- Kondratiev Waves (/kondratiev): undulating tidal momentum. Nav runs along the ceiling line as mullions. Sections alternate between cavernous crests and cramped troughs. Parabolic ribs and sine-wave spacing. Scroll pace speeds up and slows down with the layout.
- Law of Accelerating Returns (/loar): spatial warp. A one-point corridor. Nav is overhead rails. Rings and viewports are wide at the top and compress exponentially into hairline slits. Logarithmic spacing.
- Technological Singularity (/singularity): zero-G void. A vertical shaft with no top nav and no baseline. Frames hang tethered over the drop. Circles and a funnel. Pure vertical descent.

## 4. Must differ
Every exploration must differ from the others in horizon, nav and footer anatomy, geometric signature and scroll mechanic. Each must also feel as strange as Cantilever. Pages share only section 1.

## 5. Decided later
- Which page becomes the hub, or whether there is a hub at all.
- How the five subjects link to each other. If a hub is chosen, gateways are one per subject, each shaped like that page's law.
- Final navigation. Until then, each exploration only needs a way back to /. Don't build site structure.

## 6. Before merging any change
Recapture each page headless at 0, 25, 50, 75 and 100 percent scroll, plus night mode. Compare the reference against baseline-2026-10-18 and the explorations against it and each other. Work on a branch, never straight to main.
