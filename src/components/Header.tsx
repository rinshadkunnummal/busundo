import { NavLink } from "react-router-dom";
import NavList from "./NavList";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Logo />
        {/* Navigation */}
        <NavList />
        {/* CTA */}
        <NavLink
          to="/contact"
          className="font-inter rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Get in Touch
        </NavLink>
      </div>
    </header>
  );
}