import { Clock3, BusFront, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="px-6 pt-12 pb-8">
      <div className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-medium font-inter text-zinc-600">
          <BusFront className="h-3.5 w-3.5" />
          Live Campus Bus Timetable
        </span>

        <h1 className="mt-5 font-sora text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Never miss your
          <span className="text-emerald-600"> next bus.</span>
        </h1>

        <p className="mt-4 max-w-xl font-inter text-base leading-7 text-zinc-600">
          Check the next departing bus from the campus stop, search
          destinations, and view today's timetable in seconds.
        </p>

        {/* Next Bus Card */}
        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-inter text-sm font-medium uppercase tracking-wide text-zinc-500">
                Next Departure
              </p>

              <h2 className="mt-2 font-sora text-3xl font-bold text-zinc-900">
                11:42 AM
              </h2>

              <div className="mt-3 flex items-center gap-2 font-inter text-zinc-600">
                <MapPin className="h-4 w-4" />
                <span>Kozhikode</span>
              </div>

              <div className="mt-1 flex items-center gap-2 font-inter text-zinc-600">
                <BusFront className="h-4 w-4" />
                <span>Malabar</span>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 px-5 py-4 text-center">
              <Clock3 className="mx-auto h-6 w-6 text-emerald-600" />

              <p className="mt-2 font-inter text-sm text-zinc-500">
                Leaves in
              </p>

              <p className="font-sora text-3xl font-bold text-emerald-600">
                12 min
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-xl bg-emerald-600 px-5 py-3 font-sora font-semibold text-white transition hover:bg-emerald-700">
            View Timetable
          </button>

          <button className="rounded-xl border border-zinc-200 bg-white px-5 py-3 font-sora font-semibold text-zinc-700 transition hover:bg-zinc-50">
            Search Destination
          </button>
        </div>
      </div>
    </section>
  );
}