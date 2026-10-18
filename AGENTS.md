<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the spatial study's diagram, elevation, and drafting instruments in `src/components/field-instruments.tsx` so every diagram shares the same inspection and shading behavior.
- Keep browser audio lifecycle in `src/hooks/use-field-audio.ts`; instantiate audio only after a user gesture and close it on unmount to respect browser audio restrictions.
- Keep geometric interpolation and instrument constants in `src/lib/field-geometry.ts` with focused behavior tests so scrolling and instrument settings stay verifiable.
