import Logo from "./Logo";
import NavList from "./NavList";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        <div>
          <Logo />
          <p className="font-inter mt-1 text-sm text-zinc-500">
            Building beautiful web experiences.
          </p>
        </div>

        <NavList />

        <p className="font-inter text-sm text-zinc-500">
          © {new Date().getFullYear()} Rinshad Kunnummal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}