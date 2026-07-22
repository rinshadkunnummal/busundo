// src/pages/About.tsx

import { Link } from "react-router-dom";
import { ShieldCheck, Users, Smartphone, Code2, ArrowRight, Heart } from "lucide-react";

export default function About() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f8faf9] py-20">
      {/* Background Blurs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-300/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-40 h-[400px] w-[400px] rounded-full bg-teal-300/10 blur-[100px]" />
        <div
          className="
          absolute
          inset-0
          opacity-[0.15]
          [background-image:radial-gradient(#d4d4d8_1px,transparent_1px)]
          [background-size:24px_24px]
        "
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Hero */}
        <div className="text-center">
          <span className="font-inter inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-5 py-2 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur">
            <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />
            About BusUndo
          </span>

          <h1 className="font-sora mt-8 text-5xl font-bold tracking-tight text-zinc-900 md:text-6xl lg:text-7xl">
            Making Campus Travel
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Simpler & Smarter.
            </span>
          </h1>

          <p className="font-inter mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600">
            BusUndo is a community-powered platform designed to help students quickly find,
            verify, and contribute to local bus timings. Our goal is to make daily commuting
            easier, more reliable, and completely collaborative.
          </p>
        </div>

        {/* Features */}
        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-zinc-200/60 bg-white/60 p-8 shadow-lg shadow-zinc-200/20 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white/80 hover:shadow-xl hover:shadow-emerald-100/40">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h2 className="font-sora text-xl font-bold text-zinc-900">
              Community Verified
            </h2>
            <p className="font-inter mt-3 text-sm leading-7 text-zinc-500">
              Check the real-world reliability of buses based on live reports from fellow students.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-zinc-200/60 bg-white/60 p-8 shadow-lg shadow-zinc-200/20 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white/80 hover:shadow-xl hover:shadow-emerald-100/40">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <Users className="h-7 w-7" />
            </div>
            <h2 className="font-sora text-xl font-bold text-zinc-900">
              Crowdsourced Data
            </h2>
            <p className="font-inter mt-3 text-sm leading-7 text-zinc-500">
              Can't find a bus? Help the community by easily submitting missing schedules to the live board.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-zinc-200/60 bg-white/60 p-8 shadow-lg shadow-zinc-200/20 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white/80 hover:shadow-xl hover:shadow-emerald-100/40">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <Smartphone className="h-7 w-7" />
            </div>
            <h2 className="font-sora text-xl font-bold text-zinc-900">
              Mobile Friendly
            </h2>
            <p className="font-inter mt-3 text-sm leading-7 text-zinc-500">
              Designed with a mobile-first approach to work beautifully on your phone while on the go.
            </p>
          </div>
        </div>

        {/* Developer Premium Card */}
        <div className="mt-24 relative overflow-hidden rounded-[3rem] border border-emerald-100 bg-white p-10 shadow-2xl shadow-emerald-100/50 md:p-16">
          {/* Decorative gradients inside the light card */}
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-50 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-teal-50 blur-[100px]" />
          <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="max-w-xl">
              <span className="font-inter inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-emerald-600 uppercase">
                <Code2 className="w-4 h-4" />
                The Developer
              </span>

              <h2 className="font-sora mt-4 text-3xl font-bold text-zinc-900 md:text-4xl">
                Built with ❤️ by Rinshad
              </h2>

              <p className="font-inter mt-6 text-lg leading-relaxed text-zinc-600">
                BusUndo was designed and developed by <strong>Rinshad</strong>, a
                Creative Technologist passionate about building digital products that
                solve everyday problems. Originally built as a simple timetable for Darul Huda,
                it has grown into a powerful, community-driven platform focused on creating fast, accessible,
                and highly reliable commuting experiences for all students.
              </p>

              <Link
                to="/contact"
                className="group font-inter mt-10 inline-flex items-center gap-3 rounded-2xl bg-zinc-900 text-white px-8 py-4 font-semibold shadow-xl shadow-zinc-900/20 transition-all hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-emerald-600/20"
              >
                Contact the Developer
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Avatar / Monogram representation */}
            <div className="hidden md:flex flex-shrink-0 items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 border-[6px] border-white shadow-2xl shadow-emerald-200/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-transparent" />
              <span className="font-sora text-6xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tighter relative z-10">Ri</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}