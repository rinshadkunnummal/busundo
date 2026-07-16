import { Clock3, Bus } from "lucide-react";
import { useEffect, useState } from "react";

import type { Departure } from "../types/departure";
import { getDepartures } from "../services/departure.service";

export default function DepartureBoard() {
  const [departures, setDepartures] = useState<Departure[]>([]);

  useEffect(() => {
    getDepartures()
      .then(setDepartures)
      .catch((error) => {
        console.error("Failed to load departures:", error);
      });
  }, []);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-sora text-2xl font-semibold text-zinc-900">
            Upcoming Departures
          </h2>

          <p className="mt-1 font-inter text-sm text-zinc-500">
            Live bus timings from your stop
          </p>
        </div>

        <Bus className="h-7 w-7 text-zinc-700" />
      </div>


      {/* Empty State */}
      {departures.length === 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center">
          <p className="font-inter text-sm text-zinc-500">
            No departures available
          </p>
        </div>
      )}


      {/* Departure List */}
      <div className="space-y-3">
        {departures.map((bus) => (
          <article
            key={bus.id}
            className="
              flex flex-col gap-4 rounded-2xl border border-zinc-200
              bg-white p-5 shadow-sm transition
              hover:shadow-md
              sm:flex-row sm:items-center sm:justify-between
            "
          >

            {/* Time + Details */}
            <div className="flex items-center gap-4">

              <div
                className="
                  flex h-14 w-24 items-center justify-center
                  rounded-xl bg-zinc-100
                "
              >
                <span className="font-sora text-lg font-semibold">
                  {bus.departure_time}
                </span>
              </div>


              <div>
                <h3 className="font-sora text-lg font-semibold text-zinc-900">
                  {bus.destination}
                </h3>

                <p className="mt-1 font-inter text-sm text-zinc-500">
                  {bus.bus_name}
                </p>

              </div>

            </div>


            {/* Status placeholder */}
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Clock3 size={16} />
              Scheduled
            </div>


          </article>
        ))}
      </div>

    </section>
  );
}