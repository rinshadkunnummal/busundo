import { ArrowRight } from "lucide-react";
import { features } from "../lib/features";

export default function Features() {
  return (
    <section className="relative overflow-hidden py-24">

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-emerald-50/30 to-white" />

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-emerald-100 px-4 py-2 font-inter text-sm font-medium text-emerald-700">
            FEATURES
          </span>

          <h2 className="mt-6 font-sora text-5xl font-bold tracking-tight text-zinc-900">
            Everything you need,
            <br />
            <span className="text-emerald-600">
              in one place.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-inter text-lg leading-8 text-zinc-600">
            Designed for students who want quick access to
            accurate bus timings without unnecessary complexity.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (

              <div
                key={feature.title}
                className="group rounded-3xl border border-zinc-200/70 bg-white/80 p-8 shadow-lg shadow-emerald-100/30 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 transition group-hover:bg-emerald-600">

                  <Icon className="h-8 w-8 text-emerald-600 transition group-hover:text-white" />

                </div>

                <h3 className="mt-8 font-sora text-2xl font-semibold text-zinc-900">
                  {feature.title}
                </h3>

                <p className="mt-4 font-inter leading-7 text-zinc-600">
                  {feature.description}
                </p>

                <button className="mt-8 inline-flex items-center gap-2 font-sora font-semibold text-emerald-600 transition hover:gap-3">

                  Learn More

                  <ArrowRight className="h-4 w-4"/>

                </button>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}