import { supabase } from "../lib/supabase";
import type { Bus, Departure, Destination } from "../types/departure";

interface DepartureFilters {
  destination?: string;
  search?: string;
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

    return Array.from(departuresById.values()).sort((left, right) => {
      const timeComparison = left.departure_time.localeCompare(right.departure_time);

      if (timeComparison !== 0) {
        return timeComparison;
      }

      return left.id - right.id;
    });
  }

  const { data, error } = await createDepartureQuery(destination);

  if (error) throw error;

  return data ?? [];
}

export async function getDestinations() {
  const { data, error } = await supabase
    .from("destinations")
    .select("destination")
    .order("destination");

  if (error) throw error;

  return (data ?? []) as Destination[];
}

export async function getBuses() {
  const { data, error } = await supabase
    .from("buses")
    .select("bus_name")
    .order("bus_name");

  if (error) throw error;

  return (data ?? []) as Bus[];
}