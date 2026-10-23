import { Link, NavLink } from "react-router";
import { Disc3 } from "lucide-react";
import { useTheme } from "./ThemeProvider";
const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-semibold transition-colors ${
    isActive ? "text-primary" : "text-muted hover:text-fg"
  }`;

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-line bg-surface text-fg border-line ">
      <Link
        to="/"
        className="flex flex-4 items-center gap-4 transition-colors hover:text-primary"
      >
        <Disc3 className="h-8 w-8 text-primary size-9" strokeWidth={2.5} />
        <span className="font-display font-bold text-2xl">Hathor</span>
      </Link>

      <div className="flex-1 justify-between flex items-center">
        <nav aria-label="Main">
          <ul className="flex gap-4 items-center">
            <li>
              <NavLink to="/records" end className={linkClass}>
                View Collection
              </NavLink>
            </li>
            <li>
              <NavLink to="/records/new" className={linkClass}>
                Add Records
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="cursor-pointer"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
