import { ArrowRight, BusFront, CalendarDays, Clock3, MapPin } from "lucide-react";

const buses = [
  {
    time: "11:35 AM",
    destination: "Kozhikode",
    via: "via Kottakkal",
    active: true,
  },
  {
    time: "11:50 AM",
    destination: "Malappuram",
    via: "",
  },
  {
    time: "12:05 PM",
    destination: "Kottakkal",
    via: "",
  },
  {
    time: "12:20 PM",
    destination: "Perinthalmanna",
    via: "",
  },
  {
    time: "12:40 PM",
    destination: "Calicut Airport",
    via: "",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.08),transparent_40%)]" />

      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center">

        {/* LEFT */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Live Bus Timings, For You
          </div>

          <h1 className="mt-8 font-sora text-6xl font-bold leading-tight text-zinc-900">
            Know Your
            <br />
            Next Bus,
            <br />
            <span className="text-emerald-600">
              Save Your Time.
            </span>
          </h1>

          <p className="mt-8 max-w-xl font-inter text-lg leading-8 text-zinc-600">
            Real-time bus timings from our campus nearby bus stop.
            See when your next bus is arriving and plan your journey better.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <button className="group inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-7 py-4 font-sora font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-1 hover:bg-emerald-700">

              Check Next Bus

              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1"/>

            </button>

            <button className="inline-flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-7 py-4 font-sora font-semibold text-zinc-700 transition hover:bg-zinc-50">

              View Timetable

              <CalendarDays className="h-5 w-5"/>

            </button>

          </div>

          <div className="mt-12 flex flex-wrap gap-8">

            <div className="flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-emerald-600"/>
              <span className="font-inter text-zinc-600">
                Accurate Timings
              </span>
            </div>

            <div className="flex items-center gap-2">
              <BusFront className="h-5 w-5 text-emerald-600"/>
              <span className="font-inter text-zinc-600">
                Easy to Use
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-emerald-600"/>
              <span className="font-inter text-zinc-600">
                Always Updated
              </span>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <div className="rounded-[34px] border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">

            {/* Next Bus */}

            <div className="rounded-3xl bg-gradient-to-r from-emerald-50 to-white p-6">

              <p className="font-inter text-sm font-semibold uppercase tracking-wider text-emerald-600">
                NEXT BUS
              </p>

              <div className="mt-4 flex items-start justify-between">

                <div>

                  <h2 className="font-sora text-4xl font-bold text-zinc-900">
                    Kozhikode
                  </h2>

                  <p className="mt-1 font-inter text-zinc-500">
                    via Kottakkal
                  </p>

                </div>

                <div className="text-right">

                  <h3 className="font-sora text-3xl font-bold">
                    11:35 AM
                  </h3>

                  <p className="mt-2 font-inter text-emerald-600">
                    in 12 min
                  </p>

                </div>

              </div>

            </div>

            {/* Timeline */}

            <div className="relative mt-10">

              <div className="absolute left-3 top-2 bottom-2 w-px bg-emerald-200"/>

              <div className="space-y-8">

                {buses.map((bus,index)=>(
                  <div
                    key={index}
                    className="relative flex items-start justify-between"
                  >

                    <div className="flex gap-5">

                      <div
                        className={`mt-2 h-3 w-3 rounded-full ${
                          bus.active
                            ? "bg-emerald-500"
                            : "bg-zinc-300"
                        }`}
                      />

                      <div>

                        <p
                          className={`font-sora font-semibold ${
                            bus.active
                              ? "text-emerald-600"
                              : "text-zinc-900"
                          }`}
                        >
                          {bus.time}
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <h4
                        className={`font-sora text-lg ${
                          bus.active
                            ? "text-emerald-600"
                            : "text-zinc-900"
                        }`}
                      >
                        {bus.destination}
                      </h4>

                      {bus.via && (
                        <p className="font-inter text-sm text-zinc-500">
                          {bus.via}
                        </p>
                      )}

                    </div>

                  </div>
                ))}

              </div>

            </div>

            <button className="mt-8 flex w-full items-center justify-between rounded-2xl bg-emerald-50 px-5 py-4 font-sora font-semibold text-emerald-700 transition hover:bg-emerald-100">

              <span>See Full Timetable</span>

              <ArrowRight className="h-5 w-5"/>

            </button>

          </div>

          {/* Glow */}

          <div className="absolute -right-12 -top-12 -z-10 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl"/>

          <div className="absolute -bottom-10 -left-10 -z-10 h-56 w-56 rounded-full bg-emerald-100 blur-3xl"/>

        </div>

      </div>
    </section>
  );
}