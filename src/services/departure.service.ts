import { supabase } from "../lib/supabase";
import type { Bus, Departure, Destination } from "../types/departure";

interface DepartureFilters {
  destination?: string;
  search?: string;
}

const inFlightDepartures = new Map<string, Promise<Departure[]>>();
let inFlightDestinations: Promise<Destination[]> | undefined;
let inFlightBuses: Promise<Bus[]> | undefined;

function dedupeDepartures(departures: Departure[]) {
  const uniqueDepartures = new Map<string, Departure>();

  for (const departure of departures) {
    const signature = [
      departure.departure_time.slice(0, 5),
      departure.bus_name.trim().toLowerCase(),
      departure.destination.trim().toLowerCase(),
      departure.bus_type?.trim().toLowerCase() ?? "",
      departure.platform?.trim().toLowerCase() ?? "",
    ].join("|");

    if (!uniqueDepartures.has(signature)) {
      uniqueDepartures.set(signature, departure);
    }
  }

  return Array.from(uniqueDepartures.values());
}

function createDepartureQuery(destination?: string) {
  let query = supabase
    .from("departure_board")
    .select("id, bus_name, destination, departure_time, bus_type, platform")
    .order("departure_time");

  if (destination) {
    query = query.eq("destination", destination);
  }

  return query;
}

export async function getDepartures(filters: DepartureFilters = {}) {
  const destination = filters.destination?.trim() || undefined;
  const search = filters.search?.trim() || undefined;
  const cacheKey = `${destination ?? ""}|${search ?? ""}`;

  const existingRequest = inFlightDepartures.get(cacheKey);
  if (existingRequest) {
    return existingRequest;
  }

  const request = (async () => {
    if (search) {
      const [busNameResult, destinationResult] = await Promise.all([
        createDepartureQuery(destination).ilike("bus_name", `%${search}%`),
        createDepartureQuery(destination).ilike("destination", `%${search}%`),
      ]);

      if (busNameResult.error) throw busNameResult.error;
      if (destinationResult.error) throw destinationResult.error;

      const departuresById = new Map<number, Departure>();

      for (const departure of busNameResult.data ?? []) {
        departuresById.set(departure.id, departure);
      }

      for (const departure of destinationResult.data ?? []) {
        departuresById.set(departure.id, departure);
      }

      return dedupeDepartures(Array.from(departuresById.values())).sort((left, right) => {
        const timeComparison = left.departure_time.localeCompare(right.departure_time);

        if (timeComparison !== 0) {
          return timeComparison;
        }

        return left.id - right.id;
      });
    }

    const { data, error } = await createDepartureQuery(destination);

    if (error) throw error;

    console.log("Fetched departures:", data ?? []);

    return dedupeDepartures(data ?? []);
  })();

  inFlightDepartures.set(cacheKey, request);

  try {
    return await request;
  } finally {
    inFlightDepartures.delete(cacheKey);
  }
}

export async function getDestinations() {
  if (inFlightDestinations) {
    return inFlightDestinations;
  }

  const request = (async () => {
  const { data, error } = await supabase
    .from("destinations")
    .select("destination")
    .order("destination");

  if (error) throw error;

  return (data ?? []) as Destination[];
  })();

  inFlightDestinations = request;

  try {
    return await request;
  } finally {
    inFlightDestinations = undefined;
  }
}

export async function getBuses() {
  if (inFlightBuses) {
    return inFlightBuses;
  }

  const request = (async () => {
  const { data, error } = await supabase
    .from("buses")
    .select("bus_name")
    .order("bus_name");

  if (error) throw error;

  return (data ?? []) as Bus[];
  })();

  inFlightBuses = request;

  try {
    return await request;
  } finally {
    inFlightBuses = undefined;
  }
}