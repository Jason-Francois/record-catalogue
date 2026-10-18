import { Link, NavLink } from "react-router";
import { Disc3 } from "lucide-react";
const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-semibold transition-colors ${
    isActive ? "text-primary" : "text-muted hover:text-fg"
  }`;

//TODO: Add responsive menu for smaller screens
export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-line bg-surface text-fg border-line ">
      <Link
        to="/"
        className="flex items-center gap-4 transition-colors hover:text-primary"
      >
        <Disc3 className="h-8 w-8 text-primary size-9" strokeWidth={2.5} />
        <span className="font-display font-bold text-2xl">Hathor</span>
      </Link>

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
    </header>
  );
}
