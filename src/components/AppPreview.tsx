import {
  ArrowRight,
  BusFront,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

const benefits = [
  "Know your next bus instantly",
  "Mobile-first experience",
  "Quick destination search",
  "Lightweight & fast",
];

const departures = [
  {
    time: "11:35",
    destination: "Kozhikode",
    active: true,
  },
  {
    time: "11:50",
    destination: "Malappuram",
  },
  {
    time: "12:05",
    destination: "Kottakkal",
  },
];

export default function AppPreview() {
  return (
    <section className="relative overflow-hidden py-28">

      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white via-emerald-50/30 to-white" />

      <div className="absolute left-20 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="absolute right-0 bottom-0 -z-10 h-96 w-96 rounded-full bg-emerald-100 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <span className="rounded-full bg-emerald-100 px-4 py-2 font-inter text-sm font-medium text-emerald-700">
            SIMPLE • FAST • USEFUL
          </span>

          <h2 className="mt-6 font-sora text-5xl font-bold leading-tight text-zinc-900">
            Built for
            <span className="text-emerald-600">
              {" "}students,
            </span>
            <br />
            every single day.
          </h2>

          <p className="mt-6 max-w-xl font-inter text-lg leading-8 text-zinc-600">
            Instead of checking the bus stop board every time,
            simply open the app and know exactly when your bus
            is leaving.
          </p>

          <div className="mt-10 space-y-5">

            {benefits.map((item) => (

              <div
                key={item}
                className="flex items-center gap-4"
              >

                <CheckCircle2 className="h-6 w-6 text-emerald-600" />

                <span className="font-inter text-lg text-zinc-700">
                  {item}
                </span>

              </div>

            ))}

          </div>

          <div className="mt-12 flex gap-4">

            <button className="group inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-sora font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-1 hover:bg-emerald-700">

              Open Timetable

              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1"/>

            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex justify-center">

          <div className="relative">

            <div className="absolute inset-0 rounded-[3rem] bg-emerald-300/30 blur-3xl" />

            <div className="relative w-[340px] rounded-[42px] border border-zinc-200 bg-white p-5 shadow-2xl">

              <div className="mx-auto mb-6 h-1.5 w-24 rounded-full bg-zinc-200" />

              <div className="rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="font-inter text-sm opacity-80">
                      NEXT BUS
                    </p>

                    <h3 className="mt-2 font-sora text-3xl font-bold">
                      11:35
                    </h3>

                  </div>

                  <BusFront className="h-12 w-12"/>

                </div>

                <div className="mt-6 flex items-center gap-2">

                  <MapPin className="h-4 w-4"/>

                  <span className="font-inter">
                    Kozhikode
                  </span>

                </div>

              </div>

              <div className="mt-8 space-y-4">

                {departures.map((bus) => (

                  <div
                    key={bus.time}
                    className={`flex items-center justify-between rounded-2xl border p-4 ${
                      bus.active
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-zinc-200"
                    }`}
                  >

                    <div>

                      <h4 className="font-sora text-lg font-semibold">
                        {bus.time}
                      </h4>

                      <p className="font-inter text-zinc-500">
                        {bus.destination}
                      </p>

                    </div>

                    {bus.active && (
                      <div className="rounded-full bg-emerald-600 px-3 py-1 font-inter text-xs text-white">
                        Next
                      </div>
                    )}

                  </div>

                ))}

              </div>

              <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-4 font-sora font-semibold text-white">

                <Clock3 className="h-5 w-5"/>

                View Full Schedule

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}