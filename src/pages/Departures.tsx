import { useEffect, useState } from "react";
import {
  Bus,
  Search,
} from "lucide-react";
import DepartureCard from "../components/DepartureCard";

import {
  getDepartures,
  getDestinations,
} from "../services/departure.service";

import type {
  Departure,
  Destination,
} from "../types/departure";

const ALL_DESTINATIONS = "All";
const SEARCH_DEBOUNCE_MS = 350;

export default function Departures() {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const [search, setSearch] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(ALL_DESTINATIONS);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadDestinations(controller.signal);

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      loadDepartures(controller.signal);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search, selectedDestination]);

  async function loadDestinations(signal: AbortSignal) {
    try {
      const data = await getDestinations();
      if (signal.aborted) return;
      setDestinations(data);
    } catch (err) {
      if (signal.aborted) return;
      console.error(err);
    }
  }

  async function loadDepartures(signal: AbortSignal) {
    try {
      setLoading(true);
      setError("");

      const data = await getDepartures({
        search,
        destination:
          selectedDestination === ALL_DESTINATIONS
            ? undefined
            : selectedDestination,
      });

      if (signal.aborted) return;
      setDepartures(data);
    } catch (err) {
      if (signal.aborted) return;
      console.error(err);
      setError("Unable to load departures.");
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }

  function getCountdown(time: string) {
    const [hour, minute] = time.split(":").map(Number);

    const departure = new Date(now);
    departure.setHours(hour, minute, 0, 0);

    let diff = departure.getTime() - now.getTime();

    // Handle midnight rollover: if the departure time looks like it's
    // more than ~12h in the past, assume it's actually tomorrow.
    if (diff < -12 * 60 * 60 * 1000) {
      diff += 24 * 60 * 60 * 1000;
    }

    if (diff <= -60000) return "Departed";
    if (diff <= 60000) return "Now";

    return `${Math.floor(diff / 60000)} min`;
  }

  function retry() {
    loadDepartures(new AbortController().signal);
  }

  function formatTime(time: string) {
    const [hour, minute] = time.split(":").map(Number);
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-emerald-50/40 to-white" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Live Departure Board
            </p>

            <h1 className="font-sora mt-2 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
              Departures
            </h1>

            <p className="font-inter mt-4 max-w-2xl text-zinc-600">
              Search upcoming buses and view live departures from Kuttippuram Bus
              Stand.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-5 py-3 shadow-sm">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />

            <span className="font-inter text-sm font-medium text-zinc-700">
              Live •{" "}
              {now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="sticky top-20 z-20 mt-10 rounded-3xl border border-zinc-200 bg-white/90 p-5 shadow-xl backdrop-blur">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />

            <input
              type="text"
              placeholder="Search destination or bus..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="font-inter h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-14 pr-4 text-sm text-zinc-700 outline-none transition-all focus:border-emerald-500 focus:bg-white"
            />
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedDestination(ALL_DESTINATIONS)}
              className={`font-inter whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedDestination === ALL_DESTINATIONS
                  ? "bg-emerald-600 text-white shadow"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-600"
              }`}
            >
              All
            </button>

            {destinations.map((destination) => (
              <button
                key={destination.destination}
                onClick={() =>
                  setSelectedDestination(destination.destination)
                }
                className={`font-inter whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedDestination === destination.destination
                    ? "bg-emerald-600 text-white shadow"
                    : "border border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-600"
                }`}
              >
                {destination.destination}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-10">
          {/* Loading */}
          {loading && (
            <div className="space-y-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-5">
                      <div className="h-16 w-16 rounded-2xl bg-zinc-200" />

                      <div className="space-y-3">
                        <div className="h-8 w-28 rounded bg-zinc-200" />
                        <div className="h-6 w-52 rounded bg-zinc-200" />
                        <div className="flex gap-2">
                          <div className="h-8 w-24 rounded-full bg-zinc-200" />
                          <div className="h-8 w-20 rounded-full bg-zinc-200" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-right">
                      <div className="ml-auto h-8 w-20 rounded-full bg-zinc-200" />
                      <div className="ml-auto h-5 w-24 rounded bg-zinc-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
              <h3 className="font-sora text-2xl font-semibold text-red-700">
                Something went wrong
              </h3>

              <p className="font-inter mt-2 text-red-600">{error}</p>

              <button
                onClick={retry}
                className="font-inter mt-6 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && departures.length === 0 && (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-white py-16 text-center">
              <Bus className="mx-auto h-12 w-12 text-zinc-400" />

              <h3 className="font-sora mt-5 text-2xl font-semibold text-zinc-900">
                No departures found
              </h3>

              <p className="font-inter mt-2 text-zinc-500">
                Try searching for another destination or clear your filters.
              </p>
            </div>
          )}

          {/* Departure Cards */}
          {!loading &&
            !error &&
            departures.length > 0 && (
              <div className="space-y-5">
                {departures.map((departure) => {
                  const countdown = getCountdown(departure.departure_time);

                  return (
                    <DepartureCard
                      key={departure.id}
                      departure={departure}
                      formattedTime={formatTime(departure.departure_time)}
                      countdown={countdown}
                    />
                  );
                })}
              </div>
            )}
        </div>
      </div>
    </section>
  );
}