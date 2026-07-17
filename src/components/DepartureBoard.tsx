import {  ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import type { Departure } from "../types/departure";
import { getDepartures } from "../services/departure.service";

export default function DepartureBoard() {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getScheduledDepartureDate(departureTime: string, baseDate = now) {
    const [hours, minutes] = departureTime.slice(0, 5).split(":").map(Number);

    const scheduled = new Date(baseDate);
    scheduled.setHours(hours, minutes, 0, 0);

    return scheduled;
  }

  const upcomingDepartures = useMemo(() => {
    return departures.filter((departure) => getScheduledDepartureDate(departure.departure_time) >= now);
  }, [departures, now]);

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
        <div className="flex items-center gap-2">
          <NavLink
            to="/departures"
            className="font-inter underline text-sm text-zinc-700"
          >
            See Full Departures
          </NavLink>
          <ArrowUpRight className="h-3 w-3 text-zinc-700" />
          {/* <Bus className="h-7 w-7 text-zinc-700" /> */}
        </div>
      </div>


      {/* Empty State */}
      {upcomingDepartures.length === 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center">
          <p className="font-inter text-sm text-zinc-500">
            No departures available
          </p>
        </div>
      )}


      {/* Departure List */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {upcomingDepartures.map((bus) => (
          <article
            key={bus.id}
            className="
              flex h-full flex-col gap-4 rounded-2xl border border-zinc-200
              bg-white p-5 shadow-sm transition
              hover:shadow-md
            "
          >

            <div className="flex items-start justify-between gap-4">

              <div
                className="
                  flex h-14 w-24 items-center justify-center
                  rounded-xl bg-zinc-100
                "
              >
                <span className="font-sora text-lg font-semibold">
                  {bus.departure_time.slice(0, 5)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-sora text-2xl pt-3 font-semibold text-zinc-900">
                  {bus.bus_name}
                </h3>
{/* 
                <div className="mt-3 flex flex-wrap gap-2 font-inter text-xs text-zinc-500">
                  {bus.bus_type ? (
                    <span className="rounded-full bg-zinc-100 px-3 py-1">
                      {bus.bus_type}
                    </span>
                  ) : null}
                  {bus.platform ? (
                    <span className="rounded-full bg-zinc-100 px-3 py-1">
                      Platform {bus.platform}
                    </span>
                  ) : null}
                </div> */}
              </div>
            </div>

            <div className="mt-auto flex items-end justify-between gap-4 pt-2">
              <div>
                {/* <p className="text-xs text-zinc-400">Destination</p> */}
                <p className="font-inter text-sm font-medium text-zinc-600">
                  {bus.destination}
                </p>
              </div>

              <div className="text-right">
                {/* <p className="text-xs text-zinc-400">Type</p> */}
                <span className="font-inter rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600">
                  {bus.bus_type ?? "-"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}