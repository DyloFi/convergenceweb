import { Link } from "@tanstack/react-router";

/* Wordless page switcher: one geometric glyph per page, fixed bottom-left, large tap areas */
const pages = [
  { to: "/", label: "Main layout study", glyph: "h-1.5 w-6 rounded-full" },
  { to: "/annex", label: "The Annex", glyph: "h-6 w-1.5" },
  { to: "/atrium", label: "The Atrium", glyph: "h-3 w-6 rounded-t-full" },
  { to: "/causeway", label: "The Causeway", glyph: "h-4 w-4 rotate-45" },
  { to: "/spire", label: "The Spire", glyph: "h-6 w-0 border-x-[6px] border-b-[20px] border-x-transparent border-b-graphite group-data-[status=active]:border-b-ink bg-transparent" },
] as const;

export function PageSwitcher() {
  return (
    <nav
      aria-label="Pages"
      className="fixed bottom-4 left-4 z-40 flex items-center rounded-full border border-ink/70 bg-paper/85 px-1 backdrop-blur-sm"
    >
      {pages.map((p) => (
        <Link
          key={p.to}
          to={p.to}
          aria-label={p.label}
          activeOptions={{ exact: true }}
          className="group grid h-11 w-11 place-items-center"
        >
          <span className={`block bg-graphite transition-colors group-data-[status=active]:bg-ink ${p.glyph}`} />
        </Link>
      ))}
    </nav>
  );
}
