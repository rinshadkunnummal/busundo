import { Bus } from "lucide-react";
import type { Departure } from "../types/departure";
import type { CommunityPulseMetrics, ConfirmationStatus } from "../types/pulse";
import CommunityPulseCard from "./CommunityPulseCard";
import ConfirmationActions from "./ConfirmationActions";

type DepartureCardProps = {
  departure: Departure;
  formattedTime: string;
  countdown: string;
  pulseMetrics?: CommunityPulseMetrics;
  onConfirmStatus?: (status: ConfirmationStatus) => void;
};

export default function DepartureCard({
  departure,
  formattedTime,
  countdown,
  pulseMetrics,
  onConfirmStatus,
}: DepartureCardProps) {
  return (
    <div className="group flex flex-col rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
      {/* Top Main Section */}
      <div className="flex flex-col gap-5 p-5 sm:p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
            <Bus className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sora text-3xl font-bold tracking-tight text-zinc-900">
                {formattedTime}
              </span>
            </div>
            <h2 className="font-sora mt-1 text-xl font-semibold text-zinc-800">
              {departure.destination}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="font-inter text-sm font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-lg border border-emerald-200 shadow-sm">
                {departure.bus_name}
              </span>
              {departure.bus_type && (
                <span className="font-inter text-xs font-semibold text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md border border-zinc-200">
                  {departure.bus_type}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end gap-3">
          <span
            className={`font-inter rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide uppercase ${
              countdown === "Departed"
                ? "bg-red-50 text-red-600 border border-red-100"
                : countdown === "Now"
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-100"
            }`}
          >
            {countdown}
          </span>
        </div>
      </div>

      {/* Pulse & Verification Footer */}
      <div className="flex flex-col gap-4 border-t border-zinc-100 bg-zinc-50/50 rounded-b-3xl p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 max-w-xl">
          <CommunityPulseCard metrics={pulseMetrics} />
        </div>
        
        <div className="w-full shrink-0 lg:w-56">
          <ConfirmationActions 
            departureId={departure.id} 
            onConfirm={onConfirmStatus} 
          />
        </div>
      </div>
    </div>
  );
}