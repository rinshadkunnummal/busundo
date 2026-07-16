// src/pages/About.tsx

import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {/* Hero */}
      <div className="text-center">
        <span className="font-inter inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
          About BusUndo
        </span>

        <h1 className="font-sora mt-6 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Making Campus Travel
          <span className="text-emerald-600"> Simpler.</span>
        </h1>

        <p className="font-inter mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          BusUndo helps students quickly find bus timings without searching
          through printed schedules. Our goal is to make daily commuting easier,
          faster, and more convenient.
        </p>
      </div>

      {/* Features */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">
            🚌
          </div>

          <h2 className="font-sora text-lg font-semibold text-zinc-900">
            Bus Timings
          </h2>

          <p className="font-inter mt-3 text-sm leading-7 text-zinc-600">
            Instantly view bus schedules from your campus without waiting at the
            stop.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">
            ⚡
          </div>

          <h2 className="font-sora text-lg font-semibold text-zinc-900">
            Fast & Simple
          </h2>

          <p className="font-inter mt-3 text-sm leading-7 text-zinc-600">
            A clean interface that lets you find the information you need in
            seconds.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-300 hover:shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl">
            📱
          </div>

          <h2 className="font-sora text-lg font-semibold text-zinc-900">
            Mobile Friendly
          </h2>

          <p className="font-inter mt-3 text-sm leading-7 text-zinc-600">
            Designed to work beautifully on phones, tablets, and desktops.
          </p>
        </div>
      </div>

      {/* Developer */}
      <div className="mt-16 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8">
        <span className="font-inter text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Developer
        </span>

        <h2 className="font-sora mt-3 text-3xl font-bold text-zinc-900">
          Built with ❤️ by Rinshad
        </h2>

        <p className="font-inter mt-4 max-w-3xl leading-8 text-zinc-600">
          BusUndo was designed and developed by <strong>Rinshad</strong>, a
          Creative Technologist passionate about building digital products that
          solve everyday problems. The focus is on creating fast, accessible,
          and visually appealing experiences for students.
        </p>

        <Link
          to="/contact"
          className="font-inter mt-8 inline-flex rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          Contact the Developer
        </Link>
      </div>
    </section>
  );
}