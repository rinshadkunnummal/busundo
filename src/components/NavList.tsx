import { NavLink } from "react-router-dom";
import { links } from "../lib/links";

export default function NavList() {
  return (
    <nav className="hidden items-center gap-8 md:flex">
      {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive
                  ? "text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-900"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
  );
}