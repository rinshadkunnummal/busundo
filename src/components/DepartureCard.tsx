import { Bus, Clock3 } from "lucide-react";

import type { Departure } from "../types/departure";

type DepartureCardProps = {
  departure: Departure;
  formattedTime: string;
  countdown: string;
};

export default function DepartureCard({
  departure,
  formattedTime,
  countdown,
}: DepartureCardProps) {
  return (
    <div className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          <div className="rounded-2xl bg-emerald-50 p-4 transition group-hover:bg-emerald-100">
            <Bus className="h-7 w-7 text-emerald-600" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-zinc-400" />

              <span className="font-sora text-3xl font-bold tracking-tight text-zinc-900">
                {formattedTime}
              </span>
            </div>

            <h2 className="font-sora mt-3 text-2xl font-semibold text-zinc-900">
              {departure.destination}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="font-inter rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
                {departure.bus_name}
              </span>

              {departure.bus_type && (
                <span className="font-inter rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                  {departure.bus_type}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <span
            className={`font-inter rounded-full px-4 py-2 text-sm font-semibold ${
              countdown === "Departed"
                ? "bg-red-100 text-red-600"
                : countdown === "Now"
                ? "bg-emerald-600 text-white"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {countdown}
          </span>

          {/* <div className="font-inter flex items-center gap-2 text-sm text-zinc-500">
            <MapPin className="h-4 w-4" />
            Platform {departure.platform ?? "-"}
          </div> */}
        </div>
      </div>
    </div>
  );
}