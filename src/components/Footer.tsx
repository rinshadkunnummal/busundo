import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        <div>
          <NavLink
          to="/"
          className="font-sora text-xl font-bold tracking-tight text-zinc-900"
        >
          Dh
          <span className="text-emerald-600">eBus</span>
        </NavLink>
          <p className="font-inter mt-1 text-sm text-zinc-500">
            Building beautiful web experiences.
          </p>
        </div>

        <nav className="font-inter flex gap-6 text-sm">
          <NavLink to="/" className="text-zinc-500 hover:text-zinc-900">
            Home
          </NavLink>
          <NavLink to="/about" className="text-zinc-500 hover:text-zinc-900">
            About
          </NavLink>
          <NavLink to="/projects" className="text-zinc-500 hover:text-zinc-900">
            Projects
          </NavLink>
          <NavLink to="/contact" className="text-zinc-500 hover:text-zinc-900">
            Contact
          </NavLink>
        </nav>

        <p className="font-inter text-sm text-zinc-500">
          © {new Date().getFullYear()} Brand. All rights reserved.
        </p>
      </div>
    </footer>
  );
}